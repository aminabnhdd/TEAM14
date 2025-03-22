import { mergeAttributes, Node } from "@tiptap/core";

export const Video = Node.create({
  name: "video",
  group: "block",
  content: "text*",
  draggable: false, // Video itself should not be draggable

  addAttributes() {
    return {
      src: {
        default: null,
      },
      controls: {
        default: true,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "video",
        getAttrs: (node) => ({
          src: node.getAttribute("src"),
          controls: node.hasAttribute("controls"),
        }),
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "video",
      mergeAttributes(HTMLAttributes, {
        controls: node.attrs.controls ? "controls" : null,
      }),
      0,
    ];
  },
});