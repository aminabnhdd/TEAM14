import React, { useEffect, useRef, useState } from "react";
import '../../componentsStyles/editeur/tiptap.css';
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Image from "@tiptap/extension-image";
import { Figure } from './nodes/figure';
import { Figcaption } from './nodes/figcaption';
import { ImageFigure } from './nodes/imageFigure';
import { Video } from "./nodes/video";
import { VideoFigure } from "./nodes/videoFigure";
import AnnotationButton from "./annotationButton";
import AnnotationMark from "./nodes/annotationMark";
import { ReferenceNode } from "./nodes/referencesNode";

export default function TiptapNonEditable({ setEditor, section, annotations, setAnnotations, user, projet, annotVisible, setAnnotVisible }) {
  const editorRef = useRef(null);
  const [clickedAnnotationId, setClickedAnnotationId] = useState(null); // Track the clicked annotation ID

  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: false,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({
        inline: false,
        draggable: false,
      }),
      Figure,
      Figcaption,
      Video,
      VideoFigure,
      ImageFigure.configure({
        inline: false,
        draggable: false,
      }),
      ReferenceNode,
      AnnotationMark, // Ensure AnnotationMark is included
    ],
    //get content from data base instead
    content: section.contenu
  });

  useEffect(() => {
    if (editor) {
      setEditor(editor);

      // Add a click event listener to the editor's root DOM element
      const editorElement = editorRef.current;
      if (editorElement) {
        const handleClick = (event) => {
          // Check if the clicked element has the `data-annotation` attribute
          const annotationElement = event.target.closest('[data-annotation]');
          if (annotationElement) {
            // If an annotation is clicked, set annotVisible to true
            setAnnotVisible(true);

            // Extract the annotation ID from the clicked element
            const annotationId = annotationElement.getAttribute('data-annotation-id');
            setClickedAnnotationId(annotationId); // Store the clicked annotation ID
          }
        };

        editorElement.addEventListener('click', handleClick);

        // Cleanup the event listener on unmount
        return () => {
          editorElement.removeEventListener('click', handleClick);
        };
      }
    }
  }, [editor, setEditor, setAnnotVisible]);

  // Scroll to the annotation card after the annotations section becomes visible
  useEffect(() => {
    if (annotVisible && clickedAnnotationId) {
      // Use a timeout to wait for the annotations section to be fully rendered
      setTimeout(() => {
        const annotationCard = document.querySelector(`[data-annotation-card-id="${clickedAnnotationId}"]`);
        if (annotationCard) {
          annotationCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100); // Adjust the delay if needed (100ms is usually enough)
    }
  }, [annotVisible, clickedAnnotationId]);

  if (!editor) return null;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="buttons text-black">Contenu</p>
        <AnnotationButton
          editor={editor}
          annotations={annotations}
          setAnnotations={setAnnotations}
          user={user}
          projet={projet}
          section={section}
        />
      </div>
      <div className="border border-neutral-400 rounded-[12px] w-full">
        <EditorContent
          className="p-4 max-h-[400px] break-words whitespace-pre-wrap overflow-y-auto text-black w-full"
          editor={editor}
          ref={editorRef} // Attach the ref to the EditorContent
        />
      </div>
    </>
  );
}