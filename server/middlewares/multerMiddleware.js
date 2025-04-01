const fs = require('fs').promises; // Import fs with promises
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const sectionModel = require("../model/section");


// Define the storage configuration for multer
const storage = multer.diskStorage({
  destination: "/tmp", // Change this path as needed
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Handle image upload and deletion
const handleImages = async (req, res, next) => {
  console.log("Files received:", req.files);
  console.log("Raw req.body:", req.body);

  try {
    const uploadedImages = [];
    const sectionId = req.params.sectionId;

    // Find the section by ID
    const section = await sectionModel.findById(sectionId);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    // 🔥 Delete all existing images from Cloudinary
    for (const image of section.images) {
      try {
        await cloudinary.uploader.destroy(image);
      } catch (error) {
        console.error(`Error deleting image: ${image}`, error);
      }
    }

    // 🔥 Upload new images
    for (const file of req.files) {
      const fileBuffer = await fs.readFile(file.path); // Read file into buffer

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

if (uploadedImages.length === 0) {
  req.uploadedImages = req.body.images;
} else {

  req.uploadedImages = [...req.body.images, ...uploadedImages];
}

    console.log("in back end here are images ",uploadedImages);

    // Continue with the next middleware
    next();
  } catch (error) {
    console.error("Image Handling Error:", error);
    res.status(500).json({ message: "Image processing failed" });
  }
};

module.exports = { upload, handleImages };