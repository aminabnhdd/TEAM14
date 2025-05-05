import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

export default function InsertVideoButton({ editor }) {
  const handleVideoUpload = useCallback((event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      // First check if the file is a video and its duration
      const videoElement = document.createElement("video");
      const videoURL = URL.createObjectURL(file);

      videoElement.src = videoURL;
      
      videoElement.onloadedmetadata = () => {
        if (videoElement.duration > 30) {
          URL.revokeObjectURL(videoURL); // Clean up
          alert("La vidéo ne doit pas dépasser 30 secondes. Vous pouvez insérer un lien d'une vidéo hébergée sur le web à la place.");
          return;
        }

        // Proceed with reading the file since duration is acceptable
        const reader = new FileReader();

        reader.onload = (e) => {
          const dataURL = e.target.result; // Get the data URL of the video
          URL.revokeObjectURL(videoURL); // Clean up

          // Prompt the user for a caption
          const caption = window.prompt("Enter a caption for the video:");

          // Insert the video and caption into the editor
          editor
            .chain()
            .focus()
            .insertContent({
              type: "videoFigure", // Use the 'videoFigure' node
              attrs: {
                align: "right", // Default alignment
              },
              content: [
                {
                  type: "video",
                  attrs: {
                    src: dataURL, // Use the uploaded video's data URL
                    controls: true, // Show video controls
                  },
                },
                {
                  type: "figcaption",
                  content: [
                    {
                      type: "text",
                      text: caption || "Video caption", // Use the provided caption or a default
                    },
                  ],
                },
              ],
            })
            .run();
        };

        reader.onerror = (error) => {
          console.error("Error reading the file:", error);
          URL.revokeObjectURL(videoURL); // Clean up on error
        };

        reader.readAsDataURL(file); // Read the file as a data URL
      };

      videoElement.onerror = () => {
        alert("Error loading video metadata");
        URL.revokeObjectURL(videoURL); // Clean up on error
      };
    }
  }, [editor]);

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        accept="video/*" // Accept only video files
        onChange={handleVideoUpload}
        style={{ display: "none" }} // Hide the file input
        id="video-upload-input"
      />
      {/* Button to trigger file input */}
      <label htmlFor="video-upload-input" className="px-2 cursor-pointer text-neutral-500">
        <FontAwesomeIcon icon={faVideo} className="w-5 h-5" />
      </label>
    </>
  );
}