
// personalized image figure in the tiptap editor
// contains a figure with an image in it, as well as a caption 

import { Node } from '@tiptap/core';

export const ImageFigure = Node.create({
  name: 'capturedImage',

  group: 'block',
  content: 'figure figcaption', // Allow figure and figcaption as content
  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'figure[data-type="capturedImage"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['figure', mergeAttributes(HTMLAttributes, { 'data-type': 'capturedImage' }), 0];
  },
});