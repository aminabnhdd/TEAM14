const { generateHTML } = require('@tiptap/html');
const StarterKit = require('@tiptap/starter-kit').default;
const Underline = require('@tiptap/extension-underline').default;
const TextAlign = require('@tiptap/extension-text-align').default;
const Link = require('@tiptap/extension-link').default;
const Table = require('@tiptap/extension-table').default;
const TableCell = require('@tiptap/extension-table-cell').default;
const TableHeader = require('@tiptap/extension-table-header').default;
const TableRow = require('@tiptap/extension-table-row').default;
const Image = require('@tiptap/extension-image').default;
const Placeholder = require('@tiptap/extension-placeholder').default;

const {
    Figure,
    Figcaption,
    ImageFigure,
    Video,
    VideoFigure,
    ReferenceNode,
    AnnotationMark
  } = require('./customExtensions');
  

function renderTiptap(content) {
  if (!content || typeof content !== 'object' || !content.type) {
    return '<p>Cette section n\'est pas encore renseignée.</p>';
  }

  try {
    const extensions = [
      StarterKit.configure({
        code: false,
        codeBlock: false,
        dropcursor: false,
        gapcursor: false,
        history: false
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph", "figure"]
      }),
      Link.configure({
        openOnClick: false,
        autolink: false,
        HTMLAttributes: {
          class: 'custom-link',
        },
      }),
      Table.configure({
        resizable: false,
        HTMLAttributes: {
          class: 'custom-table',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({
        inline: false,
        draggable: false,
        HTMLAttributes: {
          class: 'custom-image',
        },
      }),
      ImageFigure.configure({
        inline: false,
        draggable: false,
      }),
      Figure,
      Figcaption,
      Video,
      VideoFigure,
      AnnotationMark.configure({
        HTMLAttributes: {
          class: 'annotation-mark',
        },
      }),
      ReferenceNode.configure({
        HTMLAttributes: {
          class: 'reference-node',
        },
      }),
      Placeholder
    ];

    return generateHTML(content, extensions);
  } catch (error) {
    console.error('Error generating HTML:', error);
    return '<p class="error-message">Could not render this content</p>';
  }
}

module.exports = { renderTiptap };