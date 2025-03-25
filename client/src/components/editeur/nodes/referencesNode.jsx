// extensions/reference.js
import { Node } from "@tiptap/core";

export const ReferenceNode = Node.create({
    
  name: "reference",
  inline: true,
  group: "inline",
  atom: true,

  addAttributes() {
    return {
      id: {
        default: "",
      },
      number: {
        default: 1,
      },
      usageCount: {
        default: 1, // Tracks how many times this reference is used
      },
    };
  },

  parseHTML() {
    return [{
      tag: 'span[data-reference]',
      getAttrs: dom => ({
        id: dom.getAttribute('data-reference-id'),
        number: parseInt(dom.getAttribute('data-reference-number'), 10),
        usageCount: parseInt(dom.getAttribute('data-usage-count'), 10) || 1,
      }),
    }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      {
        "data-reference": "",
        "data-reference-id": HTMLAttributes.id,
        "data-reference-number": HTMLAttributes.number,
        "data-usage-count": HTMLAttributes.usageCount,
        "class": "reference",
      },
      `[${HTMLAttributes.number}]`,
    ];
  },
});