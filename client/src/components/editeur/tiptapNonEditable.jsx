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
      AnnotationMark, // Ensure AnnotationMark is included
    ],
    //get content from data base instead
    content: `<h1>Lorem ipsum dolor sit amet,</h1><ol><li><p style="text-align: justify">Nunc sagittis enim nisl, eget suscipit velit imperdiet ut.</p></li><li><p style="text-align: justify">Vivamus feugiat hendrerit nisl, sed ullamcorper sapien condimentum ac. </p></li></ol><p style="text-align: justify">Nunc nec fermentum arcu. Suspendisse sit amet mauris fringilla, placerat tellus ut, aliquet leo. Quisque tincidunt, tortor ut porttitor rutrum, tortor lorem convallis dui, sed tincidunt augue massa quis lorem. Fusce maximus lacus mauris, eu ornare ante commodo sed. Vestibulum quis ullamcorper velit, sed rhoncus enim. Integer quis iaculis nibh. Integer vel urna ipsum. Maecenas tincidunt nibh eget sapien interdum, at tincidunt arcu lacinia. Aenean quis eros sollicitudin, tempor nunc eget, imperdiet augue.</p><p style="text-align: justify">Nulla tempus purus a lorem dignissim gravida. </p><blockquote><p style="text-align: justify">Morbi vitae nunc at quam porta congue sit amet ut nisl. Integer ornare, leo ac tempus luctus, urna ex dignissim mi, non pellentesque eros leo nec purus. Duis eget euismod velit, vel laoreet nulla. Nam a ipsum congue, congue sapien ut, vehicula tellus. Curabitur aliquet felis non odio bibendum, in auctor nulla gravida. Fusce aliquam ante eget ante pretium venenatis in non purus. Vestibulum odio massa, suscipit ut urna sit amet, tempus tincidunt velit. Aliquam feugiat consectetur fermentum. Donec vitae purus vel velit viverra efficitur. Morbi ac sollicitudin est.</p></blockquote><p style="text-align: justify">Nunc varius suscipit cursus. <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.lipsum.com/feed/html">Pellentesque tempus aliquam</a> sapien eget viverra. Duis justo dui, inte</p><p style="text-align: justify">rdum vitae ullamcorper sed, varius a leo. Aliquam bibendum scelerisque ex, sit amet iaculis ligula ullamcorper et. Cras pulvinar nunc sed consectetur semper. Donec ac ligula vel est bibendum tempor. Donec vel nibh sagittis, tempus velit vel, rutrum dolor. Maecenas eu finibus risus, et semper eros. Maecenas et quam eget velit rutrum luctus non sit amet urna. Nunc cursus commodo mi, in cursus nisi. Aenean vel pretium sem, quis scelerisque libero. Curabitur lacus neque, venenatis sit amet vestibulum eu, interdum sit amet nunc. Fusce egestas odio in ullamcorper tempus. Praesent malesuada tortor sed ornare pretium. Maecenas eu purus tellus. Fusce ultrices at purus ultricies iaculis.</p><table style="min-width: 75px"><colgroup><col style="min-width: 25px"><col style="min-width: 25px"><col style="min-width: 25px"></colgroup><tbody><tr><th colspan="1" rowspan="1"><p>this is aa table</p></th><th colspan="1" rowspan="1"><p></p></th><th colspan="1" rowspan="1"><p></p></th></tr><tr><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p></p></td></tr><tr><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p></p></td></tr></tbody></table><p style="text-align: justify">Mauris id commodo metus. Aenean enim risus, interdum vel nunc a, semper congue sem. Sed quis metus ac velit eleifend semper. Phasellus dignissim et magna at rhoncus. In finibus nibh eget lorem cursus, at vestibulum magna dictum. Nunc in nulla viverra, cursus dui ullamcorper, eleifend massa. Vestibulum et nulla ex. Sed felis ipsum, cursus ut commodo rutrum, aliquet quis eros. Maecenas id dictum arcu. Cras semper lacinia ipsum nec elementum. Vivamus ullamcorper, odio quis ornare volutpat, nisi massa egestas nisl, quis ullamcorper odio leo nec orci. Nullam sed est sed nulla aliquet dapibus. Sed rhoncus est ac maximus aliquam. Pellentesque vel mi diam.</p> Histoire`,
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