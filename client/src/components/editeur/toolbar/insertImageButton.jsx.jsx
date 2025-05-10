
// button to insert an image in the tiptap editor

import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

export default function InsertImageButton({ editor }) {
  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader(); // Create a FileReader to read the file

      reader.onload = (e) => {
        const dataURL = e.target.result; // Get the data URL of the image

        // Prompt the user for a caption
        const caption = window.prompt('Enter a caption for the image:');

        // Insert the image and caption into the editor
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'figure', // Use the 'figure' node
            content: [
              {
                type: 'image',
                attrs: {
                  src: dataURL, // Use the uploaded image's data URL
                },
              },
              {
                type: 'figcaption',
                content: [
                  {
                    type: 'text',
                    text: caption || 'Image caption', // Use the provided caption or a default
                  },
                ],
              },
            ],
          })
          .run();
      };

      reader.onerror = (error) => {
        console.error('Error reading the file:', error);
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }, [editor]);

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*" // Accept only image files
        onChange={handleImageUpload}
        style={{ display: 'none' }} // Hide the file input
        id="image-upload-input"
      />
      {/* Button to trigger file input */}
      <label htmlFor="image-upload-input" className="px-2 cursor-pointer text-neutral-500">
        <FontAwesomeIcon icon={faImage} className="w-5 h-5" />
      </label>
    </>
  );
}