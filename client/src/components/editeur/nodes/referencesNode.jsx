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
      parseHTML: (element) => {
        console.log("Parsing ID:", element.getAttribute("data-reference-id")); // Debugging
        return element.getAttribute("data-reference-id") || "";
      },
      renderHTML: (attributes) => {
        console.log("Rendering ID:", attributes.id); // Debugging
        return {
          "data-reference-id": attributes.id,
        };
      },
    },
      number: {
        default: 1,
      },

    };
  },

  parseHTML() {

    return [{
      tag: 'span[data-reference]',
      getAttrs: dom => ({
        id: dom.getAttribute('data-reference-id')||'the problew is here',
        number: parseInt(dom.getAttribute('data-reference-number'), 10),
       
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
         "class": "reference",
      },
      `[${HTMLAttributes.number}]`,
    ];
  },
});