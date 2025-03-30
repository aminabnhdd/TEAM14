import React from "react";
import { useEffect,useState } from 'react';
import '../../componentsStyles/editeur/tiptap.css'
import {BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
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




export default function TiptapEditable({ setEditor,section,saved , setSaved ,references,setReferences})  {

  

  const newLocal = `Éditer le contenu de la section ${section}...`;
  const editor = useEditor({
    editable: true,
    extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: newLocal,
        }),
        Underline,
        BubbleMenu,
        Figure,
        Figcaption,
        Video,
    VideoFigure,
  
        ImageFigure.configure({
          inline: false, // Ensure the image is a block element
          draggable: false, // Ensure the image itself is not draggable
        }),

        Image.configure({
          inline: false, // Ensure the image is a block element
          draggable: false, // Ensure the image itself is not draggable
        
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
          autolink:false,
          defaultProtocol: 'https',
          protocols: ['http', 'https'],
          isAllowedUri: (url, ctx) => {
            try {
              // construct URL
              const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)
  
              // use default validation
              if (!ctx.defaultValidate(parsedUrl.href)) {
                return false
              }
  
              // disallowed protocols
              const disallowedProtocols = ['ftp', 'file', 'mailto']
              const protocol = parsedUrl.protocol.replace(':', '')
  
              if (disallowedProtocols.includes(protocol)) {
                return false
              }
  
              // only allow protocols specified in ctx.protocols
              const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))
  
              if (!allowedProtocols.includes(protocol)) {
                return false
              }
  
              // disallowed domains
              const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
              const domain = parsedUrl.hostname
  
              if (disallowedDomains.includes(domain)) {
                return false
              }
  
              // all checks have passed
              return true
            } catch {
              return false
            }
          },
          shouldAutoLink: url => {
            try {
              // construct URL
              const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)
  
              // only auto-link if the domain is not in the disallowed list
              const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
              const domain = parsedUrl.hostname
  
              return !disallowedDomains.includes(domain)
            } catch {
              return false
            }
          },
  
        }),
        TextAlign.configure({
            types: ["heading", "paragraph"], // Enables alignment for headings & paragraphs
          }),
    ], 
    content: saved ? JSON.parse(localStorage.getItem('editorContent')) :{
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "hey there"
            }
          ]
        }
      ]
    }
    ,    
    onCreate: ({ editor }) => {
      // Save immediately when editor is created
      const jsonContent = editor.getJSON();
      localStorage.setItem('editorContent', JSON.stringify(jsonContent));
      setSaved(false);
    },
    onUpdate: ({ editor }) => {
      // Continue saving on updates
      const jsonContent = editor.getJSON();
      localStorage.setItem('editorContent', JSON.stringify(jsonContent));
      setSaved(false);
    },
  });

  useEffect(() => {
    if (editor) {
      setEditor(editor);
    }
  }, [editor, setEditor]);

  
 
  if (!editor) return null;

  return (
    <>
    <p className="buttons text-black mb-4">Contenu</p>
    
    
    <div className=" border border-neutral-400  rounded-[12px] w-full">
      <Toolbar editor={editor} references={references} setReferences={setReferences} /> 
      <BubbleMenuTable editor={editor}  />

      <BubbleMenuLink editor={editor}  />

      <BubbleMenuImage editor={editor}  />
      <BubbleMenuVideo editor={editor}  />

      <EditorContent className="p-4 main-text max-h-[400px] break-words whitespace-pre-wrap  overflow-y-auto text-black w-full " editor={editor} />
    </div>
    </>
  );
};
