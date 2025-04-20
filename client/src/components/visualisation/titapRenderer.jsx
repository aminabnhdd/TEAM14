import React, { useMemo } from 'react';
import { generateHTML } from '@tiptap/html';
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Image from "@tiptap/extension-image";
import Placeholder from '@tiptap/extension-placeholder';
import { Figure } from          '../editeur/nodes/figure';
import { Figcaption } from      '../editeur/nodes/figcaption';
import { ImageFigure } from     '../editeur/nodes/imageFigure';
import { Video } from           "../editeur/nodes/video";
import { VideoFigure } from     "../editeur/nodes/videoFigure";
import AnnotationMark from      "../editeur/nodes/annotationMark";
import { ReferenceNode } from   "../editeur/nodes/referencesNode"; 
import '../../componentsStyles/editeur/tiptap.css';

const TiptapRenderer = ({ content }) => {
  const html = useMemo(() => {
    // First validate the content
    if (!content || typeof content !== 'object' || !content.type) {
      return `<p>La section n’est pas encore renseignée.</p>`
    }

    try {
      // Prepare all extensions used in the editor
      const extensions = [
        StarterKit.configure({
          // Disable any unused default extensions
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
      console.error('Error generating HTML:', {
        error,
        content: JSON.stringify(content, null, 2)
      });
      return '<p class="error-message">Could not render this content</p>';
    }
  }, [content]);

  return (
    <div 
      className="tiptap rendered ProseMirror"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default TiptapRenderer;