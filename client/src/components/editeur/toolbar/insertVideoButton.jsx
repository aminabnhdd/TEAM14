import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

export default function InsertVideoButton({ editor }) {
  const handleVideoUpload = useCallback((event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader(); // Create a FileReader to read the file

      reader.onload = (e) => {
        const dataURL = e.target.result; // Get the data URL of the video

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
      };

      reader.readAsDataURL(file); // Read the file as a data URL
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