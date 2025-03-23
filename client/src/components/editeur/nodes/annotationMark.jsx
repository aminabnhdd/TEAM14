import { Mark } from "@tiptap/core";

const pastelColors = [
    "#FFD1DC", // Pastel Pink
  "#CDEED9", // Darker Pastel Mint
  "#C7CEEA", // Pastel Blue
  "#FAD8A6", // Lighter Pastel Orange
  "#F7F29B"  // Pastel Yellow
];

let colorIndex = 0;

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
                    id: dom.getAttribute("data-annotation-id"),
                    color: dom.getAttribute("data-annotation-color"),
                }),
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        const color = HTMLAttributes.color || pastelColors[colorIndex % pastelColors.length];
        colorIndex++;

        return [
            "span",
            {
                ...HTMLAttributes,
                "data-annotation": true,
                "data-annotation-id": HTMLAttributes.id,
                "data-annotation-color": color,
                style: `background-color: ${color}; cursor: pointer;`,
                class: "annotation-highlight",
                onclick: `window.scrollToAnnotation('${HTMLAttributes.id}')`, // Call the global function
            },
            0,
        ];
    },
});

export default AnnotationMark;