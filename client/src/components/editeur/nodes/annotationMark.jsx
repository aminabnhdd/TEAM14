

// personalized annotation mark in the tiptap editor
// it contains the id of an annotation
// it sends us to the annotation when clicked
// each annotation mark is highligthed with a color

import { Mark } from "@tiptap/core";


// colors of the selected text that will contain the annotation
const pastelColors = [
  "#FFD1DC", // Pastel Pink
  "#CDEED9", // Darker Pastel Mint
  "#C7CEEA", // Pastel Blue
  "#FAD8A6", // Lighter Pastel Orange
  "#F7F29B"  // Pastel Yellow
];

let colorIndex = 0;

// create the annotation mark
const AnnotationMark = Mark.create({
    name: "annotation",
    addAttributes() {
        return {
            id: {
                default: null,
            },
            color: {
                default: null,
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: "span[data-annotation]",
                getAttrs: (dom) => ({
                    id: dom.getAttribute("data-annotation-id"),        // contains the annotation id
                    color: dom.getAttribute("data-annotation-color"),  // the color of the annotation mark
                }),
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        const color = HTMLAttributes.color || pastelColors[colorIndex % pastelColors.length]; // loop through the colors array 
        colorIndex++;

        return [
            "span",
            {
                ...HTMLAttributes,
                "data-annotation": true,
                "data-annotation-id": HTMLAttributes.id,
                "data-annotation-color": color,
                style: `background-color: ${color}; cursor: pointer;`,        
                class: "annotation-highlight",                                // for styling the annotation mark
                onclick: `window.scrollToAnnotation('${HTMLAttributes.id}')`, // Call the global function
            },
            0,
        ];
    },
});

export default AnnotationMark;