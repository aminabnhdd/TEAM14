import { Mark } from "@tiptap/core";

const AnnotationMark = Mark.create({
  name: "annotation", // Unique name for the mark
  addAttributes() {
    return {
      id: {
        default: null, // Store the annotation ID
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "span[data-annotation]", // Parse HTML with a specific tag
        getAttrs: (dom) => ({
          id: dom.getAttribute("data-annotation-id"), // Extract the annotation ID
        }),
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      {
        ...HTMLAttributes,
        "data-annotation": true,
        "data-annotation-id": HTMLAttributes.id,
        class: "annotation-highlight", // Add a class for styling
      },
      0, // Render the content inside the mark
    ];
  },
});

export default AnnotationMark;