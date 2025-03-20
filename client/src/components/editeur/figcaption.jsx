import { mergeAttributes, Node } from '@tiptap/core';

export const Figcaption = Node.create({
  name: 'figcaption', // Unique name for the node
  content: 'inline*', // Allows inline content (text, links, etc.)
  selectable: false, // Makes the figcaption non-selectable
  draggable: false, // Makes the figcaption non-draggable

  parseHTML() {
    return [
      {
        tag: 'figcaption', // Matches the <figcaption> HTML tag
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['figcaption', mergeAttributes(HTMLAttributes, { style: 'font-style: italic;' }), 0]; // Renders a <figcaption> with italic style
  },
});