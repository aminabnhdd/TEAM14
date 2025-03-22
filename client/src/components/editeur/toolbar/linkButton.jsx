import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";
import PopLink from "../popupLink";

export default function LinkButton(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [url, setUrl] = useState("");

  // Handle URL submission from PopLink
  const handleUrlSubmit = useCallback(
    (url) => {
      setShowPopup(false); // Close the popup

      // Empty URL: Remove the link
      if (url === "") {
        props.editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }

      // Update link
      try {
        props.editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
      } catch (e) {
        alert(e.message);
      }
    },
    [props.editor]
  );

  // Open the popup and get the previous URL
  const setLink = useCallback(() => {
    const previousUrl = props.editor.getAttributes("link").href;
    setUrl(previousUrl || ""); // Set the previous URL (if any)
    setShowPopup(true); // Open the popup
  }, [props.editor]);

  return (
    <>
      {/* Link Button */}
      <button
        onClick={setLink}
        className={`px-2 cursor-pointer text-neutral-500 ${
          props.editor.isActive("link") ? "is-active" : ""
        }`}
      >
        <FontAwesomeIcon icon={faLink} className="w-5 h-5" />
      </button>

      {/* Custom Popup */}
      {showPopup && (
        <PopLink
          initialUrl={url}
          onClose={() => setShowPopup(false)}
          onSubmit={handleUrlSubmit}
        />
      )}
    </>
  );
}