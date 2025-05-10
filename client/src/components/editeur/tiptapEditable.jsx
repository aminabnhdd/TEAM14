import React from "react";
import { useEffect, useState } from 'react';
import '../../componentsStyles/editeur/tiptap.css';
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Image from "@tiptap/extension-image";
import './tooltip';
import Toolbar from "./toolbar/toolbar";
import { Figure } from './nodes/figure';
import { Figcaption } from './nodes/figcaption';
import { ImageFigure } from './nodes/imageFigure';
import { Video } from "./nodes/video";
import { VideoFigure } from "./nodes/videoFigure";
import BubbleMenuTable from "./bubbleMenu/table/bubbleMenuTable";
import BubbleMenuLink from "./bubbleMenu/link/bubbleMenuLink";
import BubbleMenuImage from "./bubbleMenu/image/bubbleMenuImage";
import BubbleMenuVideo from "./bubbleMenu/video/bubbluMenuVideo";
import AnnotationMark from "./nodes/annotationMark";
import { ReferenceNode } from "./nodes/referencesNode"; 

export default function TiptapEditable({ setEditor, section, projet, references, setReferences }) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // placeholder if the content of the editor is empty
  const placeholderText = `Éditer le contenu de la section ${section.type}...`;
  
  const editor = useEditor({
    // enable the user to edit the content
    editable: true,

    // get all of the extentions needed for both existing and personalized nodes and marks
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholderText,
      }),
      Underline,
      BubbleMenu,
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
        resizable: false,
      }),
      TableRow,
      TableHeader,
      TableCell,
      AnnotationMark,
      ReferenceNode,
      Link.configure({
        openOnClick: false,
        autolink: false,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }
            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');
            if (disallowedProtocols.includes(protocol)) {
              return false;
            }
            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme));
            if (!allowedProtocols.includes(protocol)) {
              return false;
            }
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net'];
            const domain = parsedUrl.hostname;
            if (disallowedDomains.includes(domain)) {
              return false;
            }
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: url => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`);
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com'];
            const domain = parsedUrl.hostname;
            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ], 
    
    // initialize the content of the editor
    content: section.contenu,
    
    onUpdate: () => {
      setHasUnsavedChanges(true);
    },
  });

  useEffect(() => {
    if (editor) {
      setEditor(editor);
    }
  }, [editor, setEditor]);

  // Handle beforeunload event to warn about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  if (!editor) return null;

  return (
    <>
      <p className="buttons text-black mb-4">Contenu</p>
      <div className="border border-neutral-400 rounded-[12px] w-full">
        <Toolbar 
          editor={editor} 
          projet={projet} 
          references={references} 
          setReferences={setReferences} 
        /> 
        <BubbleMenuTable editor={editor} />
        <BubbleMenuLink editor={editor} />
        <BubbleMenuImage editor={editor} />
        <BubbleMenuVideo editor={editor} />

        <EditorContent 
          className="p-4 main-text editable max-h-[400px] break-words whitespace-pre-wrap overflow-y-auto text-black w-full" 
          editor={editor} 
        />
      </div>
    </>
  );
}