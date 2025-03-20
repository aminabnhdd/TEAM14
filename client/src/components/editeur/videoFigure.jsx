import { mergeAttributes, Node } from "@tiptap/core";

export const VideoFigure = Node.create({
  name: "videoFigure",
  group: "block",
  content: "video figcaption",
  draggable: true, // Ensure the figure is draggable

  addAttributes() {
    return {
      align: {
        default: "right",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure[data-type='videoFigure']",
        getAttrs: (node) => ({
          align: node.getAttribute("data-align") || "right",
        }),
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const align = node.attrs.align || "right";
    return [
      "figure",
      mergeAttributes(HTMLAttributes, {
        class: `video-card align-${align}`,
        "data-type": "videoFigure",
        "data-align": align,
        draggable: "true", // Make the figure draggable
      }),
      0, // Render the content (video and figcaption)
    ];
  },
});