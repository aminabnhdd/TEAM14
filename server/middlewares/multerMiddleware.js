const fs = require('fs').promises;
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const sectionModel = require("../model/Section");



const storage = multer.diskStorage({
  destination: "/tmp", 
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

const handleImages = async (req, res, next) => {
  console.log("Files received:", req.files);
  console.log("Raw req.body.images:", req.body.images);

  try {
    const uploadedImages = [];
    const sectionId = req.params.sectionId;

    const section = await sectionModel.findById(sectionId);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    const clientImages = Array.isArray(req.body.images) 
      ? req.body.images 
      : req.body.images ? [req.body.images] : [];

    console.log("Client Images:", clientImages);

    // Find which old images must be deleted
    const imagesToDelete = section.images.filter(img => !clientImages.includes(img));
    console.log("Images to delete:", imagesToDelete);

    for (const image of imagesToDelete) {
      try {
        const publicId = image.split('/').pop().split('.')[0]; 
        await cloudinary.uploader.destroy(`uploads/${publicId}`);
        console.log(`Deleted from Cloudinary: ${publicId}`);
      } catch (error) {
        console.error(`Error deleting image ${image}:`, error);
      }
    }

    // Upload new images
    for (const file of req.files) {
      const fileBuffer = await fs.readFile(file.path);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "uploads" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(fileBuffer);
      });

      uploadedImages.push(result.secure_url);
    }

    req.uploadedImages = [...clientImages, ...uploadedImages];

    console.log("New Images list:", req.uploadedImages);

    next();
  } catch (error) {
    console.error("Image Handling Error:", error);
    res.status(500).json({ message: "Image processing failed" });
  }
};

const handleSingleFileUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileBuffer = await fs.readFile(req.file.path);
    const isImage = req.file.mimetype.startsWith("image/");
    const resourceType = isImage ? "image" : "raw";

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "uploads",
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(fileBuffer);
    });

    req.uploadedFileUrl = result.secure_url; 
    next();
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
};

module.exports = { upload, handleImages ,handleSingleFileUpload};
