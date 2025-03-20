import React from "react";
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
import Toolbar from "./toolbar";
import { Figure } from './figure';
import { Figcaption } from './figcaption';
import { ImageFigure } from './imageFigure';
import BubbleMenuTable from "./bubbleMenuTable";
import BubbleMenuLink from "./bubbleMenuLink";
import BubbleMenuImage from "./bubbleMenuImage";
import { Video } from "./video";
import { VideoFigure } from "./videoFigure";
import BubbleMenuVideo from "./bubbluMenuVideo";
export default function Tiptap()  {
  const newLocal = 'Éditer le contenu de la section architecture...';
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
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
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
  });

  if (!editor) return null;

  return (
    <div className="border border-neutral-400 rounded-[12px]">
      <Toolbar editor={editor}  />
      <BubbleMenuTable editor={editor}  />

      <BubbleMenuLink editor={editor}  />

      <BubbleMenuImage editor={editor}  />
      <BubbleMenuVideo editor={editor}  />

      <EditorContent className="p-4 max-h-[400px] overflow-y-auto text-black" editor={editor} />
    </div>
  );
};
