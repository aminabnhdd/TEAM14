// customExtensions.js
const { Node, Mark, mergeAttributes } = require('@tiptap/core');

const pastelColors = ["#FFD1DC", "#CDEED9", "#C7CEEA", "#FAD8A6", "#F7F29B"];

// Remove window references and make Node-compatible
const AnnotationMark = Mark.create({
    name: "annotation",
    addAttributes() {
        return {
            id: { default: null },
            color: { default: null }
        };
    },
    parseHTML() {
        return [{
            tag: "span[data-annotation]",
            getAttrs: (dom) => ({
                id: dom.getAttribute("data-annotation-id"),
                color: dom.getAttribute("data-annotation-color")
            })
        }];
    },
    renderHTML({ HTMLAttributes }) {
        return [
            "span",
            {
                "data-annotation": true,
                "data-annotation-id": HTMLAttributes.id,
                "data-annotation-color": HTMLAttributes.color,
                style: `background-color: ${HTMLAttributes.color || pastelColors[0]}`,
                class: "annotation-highlight"
            },
            0
        ];
    }
});

const Figcaption = Node.create({
    name: 'figcaption',
    content: 'inline*',
    selectable: false,
    draggable: false,
    parseHTML() { return [{ tag: 'figcaption' }]; },
    renderHTML({ HTMLAttributes }) {
        return ['figcaption', mergeAttributes(HTMLAttributes, { 
            style: 'font-style: italic;' 
        }), 0];
    }
});

const Figure = Node.create({
    name: "figure",
    group: "block",
    content: "image figcaption",
    addAttributes() {
        return { align: { default: "right" } };
    },
    parseHTML() {
        return [{
            tag: "figure",
            getAttrs: (node) => ({
                align: node.getAttribute("data-align") || "right"
            })
        }];
    },
    renderHTML({ node, HTMLAttributes }) {
        return [
            "div",
            { class: `image-card align-${node.attrs.align}` },
            ["figure", mergeAttributes(HTMLAttributes), 0]
        ];
    }
});





// Export all extensions at once
module.exports = {
    AnnotationMark,
    Figcaption,
    Figure,
    ImageFigure: Node.create({
        name: 'capturedImage',
        group: 'block',
        content: 'figure figcaption',
        parseHTML() { return [{ tag: 'figure[data-type="capturedImage"]' }]; },
        renderHTML({ HTMLAttributes }) {
            return ['figure', mergeAttributes(HTMLAttributes, { 
                'data-type': 'capturedImage' 
            }), 0];
        }
    }),
    ReferenceNode: Node.create({
        name: "reference",
        inline: true,
        group: "inline",
        atom: true,
        addAttributes() {
            return {
                id: { default: "" },
                number: { default: 1 }
            };
        },
        parseHTML() {
            return [{
                tag: 'span[data-reference]',
                getAttrs: dom => ({
                    id: dom.getAttribute('data-reference-id'),
                    number: parseInt(dom.getAttribute('data-reference-number'), 10)
                })
            }];
        },
        renderHTML({ HTMLAttributes }) {
            return [
                "span",
                {
                    "data-reference": "",
                    "data-reference-id": HTMLAttributes.id,
                    "data-reference-number": HTMLAttributes.number,
                    "class": "reference"
                },
                `[${HTMLAttributes.number}]`
            ];
        }
    }),
    Video: Node.create({
        name: "video",
        group: "block",
        atom: true, // Void node that can't have content
        draggable: false,
        addAttributes() {
          return {
            src: { default: null }
          };
        },
        renderHTML() {
            return ['span'] // Completely hidden
        }
      }),
      
      VideoFigure : Node.create({
        name: "videoFigure",
        group: "block",
        content: "video figcaption", // Optional video+figcaption
        
        renderHTML({ node }) {
            return ['span']
          }
        })
};

