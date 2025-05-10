
// drop down button to align the text in the tiptap editor
// allows to align the text to the left, right, and center, and also to justify it

import { useState, useRef, useEffect } from "react"; // Import useEffect and useRef
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";

export default function AlignmentDropdown({ editor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAlignment, setSelectedAlignment] = useState("left");
  const dropdownRef = useRef(null); // Ref for the dropdown container

  const alignments = [
    { value: "left", icon: faAlignLeft },
    { value: "center", icon: faAlignCenter },
    { value: "right", icon: faAlignRight },
    { value: "justify", icon: faAlignJustify },
  ];

  const handleAlignmentChange = (alignment) => {
    setSelectedAlignment(alignment.value);
    setIsOpen(false);

    // Apply the alignment to the editor
    switch (alignment.value) {
      case "left":
        editor.chain().focus().setTextAlign("left").run();
        break;
      case "center":
        editor.chain().focus().setTextAlign("center").run();
        break;
      case "right":
        editor.chain().focus().setTextAlign("right").run();
        break;
      case "justify":
        editor.chain().focus().setTextAlign("justify").run();
        break;
      default:
        break;
    }
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}> {/* Attach ref to the container */}
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-white cursor-pointer p-1 rounded-md"
      >
        <FontAwesomeIcon
          icon={alignments.find((a) => a.value === selectedAlignment)?.icon}
          className="w-5 h-5 text-neutral-500"
        />
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-1002 bg-white border border-neutral-400 rounded-md shadow-lg cursor-pointer">
          <div className="flex flex-col">
            {alignments.map((alignment) => (
              <button
                key={alignment.value}
                onClick={() => handleAlignmentChange(alignment)}
                 className="mx-1 px-3 my-1 rounded-md hover:bg-neutral-200 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={alignment.icon}
                  className="w-5 h-5 text-neutral-500"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}