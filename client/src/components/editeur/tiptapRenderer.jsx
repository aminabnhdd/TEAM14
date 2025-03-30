import { generateHTML } from '@tiptap/core'
import { videoContainer } from './nodes/videoContainer'
const extensions = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Link.configure({
    openOnClick: false,
    autolink: false,
  }),
  Image.configure({
    inline: false,
    draggable: false,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Placeholder,
  Figure,
  Figcaption,

  ImageFigure.configure({
    inline: false,
    draggable: false,
  }),
  Video,
  VideoFigure,
  videoContainer.configure({
    inline:false,
    draggable:false,
  }),
  AnnotationMark,
  ReferenceNode,
]
const TiptapRenderer = ({ content }) => {
  // Define the same extensions used in your editor
  const extensions = [
    StarterKit,
    Placeholder,
    Underline,
    Figure,
    Figcaption,
    Video,
    VideoFigure,
    ImageFigure.configure({
      inline: false,
      draggable: false,
    }),
    Image.configure({
      inline: false,
      draggable: false,
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    AnnotationMark,
    ReferenceNode,
    Link.configure({
      openOnClick: false,
      autolink: false,
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
  ]

  // Generate HTML from the JSON content
  const html = generateHTML(content, extensions)

  return (
    <div 
      className="tiptap-rendered-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default TiptapRenderer