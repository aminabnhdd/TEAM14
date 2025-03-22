import { mergeAttributes, Node } from "@tiptap/core";

export const Figure = Node.create({
  name: "figure", // Unique name for the node
  group: "block", // Belongs to the 'block' group
  content: "image figcaption", // Allows an image and a figcaption as content
  draggable: true, // Makes the figure draggable

  // Add an align attribute
  addAttributes() {
    return {
      align: {
        default: "right", // Default alignment
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure",
        getAttrs: (node) => ({
          align: node.getAttribute("data-align") || "right",
        }),
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const align = node.attrs.align || "right";
    return [
      "div",
      { class: `image-card align-${align}`, draggable: "true" }, // Add alignment class to the container
      ["figure", mergeAttributes(HTMLAttributes), 0], // Render the figure inside the div
    ];
  },
});