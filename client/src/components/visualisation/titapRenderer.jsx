import React, { useMemo } from 'react';
import { generateHTML } from '@tiptap/html';
// Core extensions
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Blockquote from '@tiptap/extension-blockquote';

// List extensions
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';

// Table extensions
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

// Formatting extensions
import TextAlign from '@tiptap/extension-text-align';

// Custom extensions
import { Figure } from '../editeur/nodes/figure';
import { Figcaption } from '../editeur/nodes/figcaption';
import { ImageFigure } from '../editeur/nodes/imageFigure';
import { Video } from '../editeur/nodes/video';
import { VideoFigure } from '../editeur/nodes/videoFigure';
import { ReferenceNode } from '../editeur/nodes/referencesNode';
import AnnotationMark from '../editeur/nodes/annotationMark';

import '../../componentsStyles/editeur/tiptap.css'

const TiptapRenderer = ({ content }) => {
  const html = useMemo(() => {
    try {
      return generateHTML(content, [
        // Document configuration
        Document.extend({
          content: '(block|figure|table)+',
        }),
        
        // Basic text extensions
        Paragraph,
        Text,
        Bold,
        Italic,
        Underline,
        Heading,
        Blockquote,
        
        // List extensions
        BulletList.configure({
          HTMLAttributes: {
            class: 'bullet-list',
          },
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: 'ordered-list',
          },
        }),
        ListItem.configure({
          HTMLAttributes: {
            class: 'list-item',
          },
        }),
        
        // Media extensions
        Image.configure({
          inline: false,
         
        }),
        
        // Link extension
        Link.configure({
          openOnClick: false,
          autolink: false,
          HTMLAttributes: {
            class: 'custom-link',
          },
        }),
        
        // Table extensions
        Table.configure({
          resizable: false,
         
          HTMLAttributes: {
            class: 'table',
          },
        }),
        TableRow,
        TableHeader,
        TableCell,
        
        // Text alignment
        TextAlign.configure({
          types: ['heading', 'paragraph', 'blockquote', 'figure'],
        }),
        
        // Custom nodes


        Figure.configure({
            draggable: false,
        }),

        Figcaption.configure({
            draggable: false,
            HTMLAttributes: {
              class: 'figcaption',
            },
          }),
        ImageFigure.configure({
            draggable: false,
        }),
        Video,
        VideoFigure.configure({
            draggable: false,
            
        }),,


        ReferenceNode.configure({
          HTMLAttributes: {
            class: 'reference',
          },
        }),
        AnnotationMark.configure({
          HTMLAttributes: {
            class: 'annotation-highlight',
          },
        }),
        
        // Placeholder
        Placeholder.configure({
          placeholder: 'Empty content...',
        }),
      ]);
    } catch (error) {
      console.error('Error generating HTML:', error);
      return '<p>Error rendering content</p>';
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