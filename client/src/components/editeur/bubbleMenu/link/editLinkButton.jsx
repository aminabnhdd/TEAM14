import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import PopLink from "../../popupLink";


// button that opens a popup to allow the user to change the link, appears in the link bubble menu

export default function EditLinkButton(props) {
  const [showPopup, setShowPopup] = useState(false);

  const handleUrlSubmit = (url) => {
    if (url) {
      props.editor
        .chain()
        .focus()
        .setLink({ href: url })
        .run();
    }
    setShowPopup(false); // Close the popup
  };

  return (
    <>
      {/* Edit Link Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="p-1 hover:bg-neutral-100 rounded"
      >
        <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5" />
      </button>

      {/* Reuse the PopLink Component */}
      {showPopup && (
        <PopLink
          initialUrl={props.editor.getAttributes("link").href || ""}
          onClose={() => setShowPopup(false)}
          onSubmit={handleUrlSubmit}
        />
      )}
    </>
  );
}