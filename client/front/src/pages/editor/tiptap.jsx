import React from "react";
import './tiptap.css'
import {BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike"; 
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Code from '@tiptap/extension-code';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Blockquote from '@tiptap/extension-blockquote';
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Gapcursor from "@tiptap/extension-gapcursor";
import  { useCallback } from 'react';
import Image from "@tiptap/extension-image";
//Get icons from font awsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faBold, 
    faItalic, 
    faStrikethrough, 
    faUnderline, 
    faListUl, 
    faListOl, 
    faAlignLeft, 
    faAlignCenter, 
    faAlignRight, 
    faAlignJustify,
    faUndo, 
    faRedo,
    faLink,
    faLinkSlash,
    faQuoteLeft,
    faImage,
    faTable,
    faCaretDown,
  } from "@fortawesome/free-solid-svg-icons";


const Tiptap = () => {
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

        Strike,
        BulletList,
        OrderedList,
        ListItem,
        Document,
        Paragraph,
        Text,
        Code,
        Image,
        Blockquote,
        Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
        Link.configure({
          openOnClick: true,
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

  
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url })
        .run()
    } catch (e) {
      alert(e.message)
    }
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("Enter image URL");
  
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-neutral-400 rounded-[12px]">
      <div className="toolbar border-b border-neutral-400 px-4 py-2.5 text-neutral-500 flex flex-wrap gap-y-2">
      <div className="inline-flex px-2 border-r ">
      <select
      className="main-text !font-medium cursor-pointer "
          onChange={(e) => {
            const value = e.target.value;
            if (value === "paragraph") {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level: parseInt(value) }).run();
            }
          }}
        >
          <option value="paragraph">Paragraphe</option>
          <option value="1">Titre 1</option>
          <option value="2">Titre 2</option>
          <option value="3">Titre 3</option>
        </select>
        </div>
<div className="inline-flex px-2 border-r ">
        <button className={`px-2 cursor-pointer ${editor.isActive('bold') ? 'text-black' : 'text-neutral-500'}`}
         onClick={() => editor.chain().focus().toggleBold().run()}>
        <FontAwesomeIcon icon={faBold} className=" w-5 h-5" />
        </button>
        <button className={`px-2 cursor-pointer ${editor.isActive('italic') ? 'text-black' : 'text-neutral-500'}`} 
        onClick={() => editor.chain().focus().toggleItalic().run()}>
        <FontAwesomeIcon icon={faItalic} className="w-5 h-5" />
        </button>
        <button className={`px-2 cursor-pointer ${editor.isActive('strike') ? 'text-black' : 'text-neutral-500'}`} 
        onClick={() => editor.chain().focus().toggleStrike().run()}>
        <FontAwesomeIcon icon={faStrikethrough} className="w-5 h-5" />
        </button>
        <button className={`px-2 cursor-pointer ${editor.isActive('underline') ? 'text-black' : 'text-neutral-500'}`}
        onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <FontAwesomeIcon icon={faUnderline} className="w-5 h-5" />
        </button>
</div>

<div className="inline-flex px-2  border-r">
        <button className={`px-2 cursor-pointer ${editor.isActive('bulletList') ? 'text-black' : 'text-neutral-500'}`}
         onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <FontAwesomeIcon icon={faListUl} className="w-5 h-5" />
        </button>
        <button className={`px-2 cursor-pointer ${editor.isActive('orderedList') ? 'text-black' : 'text-neutral-500'}`}
         onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <FontAwesomeIcon icon={faListOl} className="w-5 h-5" />
        </button>

        </div>

<div className="inline-flex px-2 border-r">
        <button className={`px-2 cursor-pointer ${editor.isActive({ textAlign: "left" }) ? 'text-black' : 'text-neutral-500'}`}
         onClick={() => editor.chain().focus().setTextAlign("left").run()}>
        <FontAwesomeIcon icon={faAlignLeft} className="w-5 h-5" />
        </button>
        <button className={`px-2 cursor-pointer ${editor.isActive({ textAlign: "center" }) ? 'text-black' : 'text-neutral-500'}`}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}>
        <FontAwesomeIcon icon={faAlignCenter} className="w-5 h-5" />
        </button>
        <button className={`px-2 cursor-pointer ${editor.isActive({ textAlign: "right" }) ? 'text-black' : 'text-neutral-500'}`}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}>
        <FontAwesomeIcon icon={faAlignRight} className="w-5 h-5" />
        </button>
        <button className={`px-2 cursor-pointer ${editor.isActive({ textAlign: "justify" }) ? 'text-black' : 'text-neutral-500'}`}
         onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
        <FontAwesomeIcon icon={faAlignJustify} className="w-5 h-5" />
        </button>
</div>
<div className="inline-flex px-2 border-r">

          <button  className={`px-2 cursor-pointer ${editor.isActive('blockquote') ? 'text-black' : 'text-neutral-500'}`}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
           
          >
           <FontAwesomeIcon icon={faQuoteLeft} className="w-5 h-5" />
          </button>
          <button   onClick={setLink}  className={`px-2 cursor-pointer text-neutral-500 ${editor.isActive('link') ? 'is-active' : ''}`}>
          <FontAwesomeIcon icon={faLink} className="w-5 h-5" />

          </button>
             
          <button className={`px-2 cursor-pointer text-neutral-500 ${!editor.isActive('link') ? 'opacity-50' : ''}`}
            onClick={() => {
              editor.chain().focus().extendMarkRange('link').unsetLink().run();
            }}
            disabled={!editor.isActive('link')}
          >
                  <FontAwesomeIcon icon={faLinkSlash} className="w-5 h-5" />

          </button>
</div>


<div className="inline-flex px-2  border-r">
<button
  className="px-2 cursor-pointer text-neutral-500"
  onClick={addImage}
>
<FontAwesomeIcon icon={faImage} className="w-5 h-5" />

</button>

<button    className="px-2 cursor-pointer text-neutral-500"

            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
          >
          <FontAwesomeIcon icon={faTable} className="w-5 h-5" />

          </button>
        </div>


<div className="inline-flex px-2">
<button className={`px-2 text-neutral-500 cursor-pointer ${
    !editor.can().undo() ? 'opacity-50' : ''
  }`}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
        <FontAwesomeIcon icon={faUndo} className="w-5 h-5" />
        </button>

        <button className={`px-2 text-neutral-500 cursor-pointer ${
    !editor.can().redo() ? 'opacity-50' : ''
  }`}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
        <FontAwesomeIcon icon={faRedo} className="w-5 h-5" />

        </button>

</div>



          {/* <div  className={`cursor-pointer ${editor.isActive('table') ? 'block' : 'hidden'}`}>
          <button   className="px-2 cursor-pointer text-neutral-500"
 onClick={() => editor.chain().focus().addColumnBefore().run()}>
            Ajouter colonne avant
          </button>
          <button   className="px-2 cursor-pointer text-neutral-500"
 onClick={() => editor.chain().focus().addColumnAfter().run()}>Ajouter colonne après</button>
        
          <button   className="px-2 cursor-pointer text-neutral-500"
 onClick={() => editor.chain().focus().deleteColumn().run()}>Supprimer colonne</button>
   <button   className="px-2 cursor-pointer text-neutral-500"
 onClick={() => editor.chain().focus().addRowBefore().run()}>Ajouter ligne avant</button>
          <button   className="px-2 cursor-pointer text-neutral-500"
 onClick={() => editor.chain().focus().addRowAfter().run()}>Ajouter ligne après</button>
          <button   className="px-2 cursor-pointer text-neutral-500"
 onClick={() => editor.chain().focus().deleteRow().run()}>Supprimer ligne</button>
          <button   className="px-2 cursor-pointer text-neutral-500"
 onClick={() => editor.chain().focus().deleteTable().run()}>Supprimer tableau</button>
          <button   className="px-2 cursor-pointer text-neutral-500"
 onClick={() => editor.chain().focus().mergeCells().run()}>Fusionner les cellules</button>
          <button   className="px-2 cursor-pointer text-neutral-500"
 onClick={() => editor.chain().focus().splitCell().run()}>Diviser les cellules</button>
          <button   className="px-2 cursor-pointer text-neutral-500"
 onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
            Basculer la colonne d'en-tête
          </button>
          <button   className="px-2 cursor-pointer text-neutral-500"
 onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
            Basculer la ligne d'en-tête
          </button>
          <button    className="px-2 cursor-pointer text-neutral-500"
onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
            Basculer la cellule d'en-tête
          </button>
          </div> */}


        
        </div>


        {editor && <BubbleMenu  editor={editor} tippyOptions={{ duration: 100 } }  
        shouldShow={({ editor }) => editor.isActive('table')} element={{editor}}>
        <div className="bg-white bubble-menu border rounded-[12px] border-neutral-400 flex items-center gap-0 px-2 py-1">

          
    

<div className="relative inline-block">
  <label className="px-2 cursor-pointer text-neutral-500">
    <FontAwesomeIcon icon={faTable} className="w-5 h-5" />
    <FontAwesomeIcon icon={faCaretDown} className="w-5 h-5 text-neutral-400" />
  </label>
  <select
    className="absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer"
    onChange={(e) => {
      const value = e.target.value;

      if (value === "1") {
        editor.chain().focus().addColumnBefore().run();
      } else if (value === "2") {
        editor.chain().focus().addColumnAfter().run();
      } else if (value === "3") {
        editor.chain().focus().deleteColumn().run();
      } else if (value === "4") {
        editor.chain().focus().toggleHeaderColumn().run();
      }

      // Reset selection so it always shows "Column"
      e.target.value = "";
    }}
  >
    <option value="" disabled selected hidden>Colonne</option>
    <option value="1">Ajouter avant</option>
    <option value="2">Ajouter après</option>
    <option value="3">Supprimer</option>
    <option value="4">Basculer en-tête</option>
  </select>
</div>


<div className="relative inline-block">
<label className="px-2 cursor-pointer text-neutral-500">
    <FontAwesomeIcon icon={faTable} className="w-5 h-5" />
    <FontAwesomeIcon icon={faCaretDown} className="w-5 h-5 text-neutral-400" />
  </label>  <select
    className="absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer"
    onChange={(e) => {
      const value = e.target.value;

      if (value === "1") {
        editor.chain().focus().addRowBefore().run();
      } else if (value === "2") {
        editor.chain().focus().addRowAfter().run();
      } else if (value === "3") {
        editor.chain().focus().deleteRow().run();
      } else if (value === "4") {
        editor.chain().focus().toggleHeaderRow().run();
      }

      // Reset selection so it always shows "Column"
      e.target.value = "";
    }}
  >
    <option value="" disabled selected hidden>Ligne</option>
    <option value="1">Ajouter avant</option>
    <option value="2">Ajouter après</option>
    <option value="3">Supprimer</option>
    <option value="4">Basculer en-tête</option>
  </select>
</div>


<div className="relative inline-block">
<label className="px-2 cursor-pointer text-neutral-500">
    <FontAwesomeIcon icon={faTable} className="w-5 h-5" />
    <FontAwesomeIcon icon={faCaretDown} className="w-5 h-5 text-neutral-400" />
  </label>  <select
    className="absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer"
    onChange={(e) => {
      const value = e.target.value;

      if (value === "1") {
        editor.chain().focus().mergeCells().run();
      } else if (value === "2") {
        editor.chain().focus().splitCell().run();
      } else if (value === "3") {
        editor.chain().focus().deleteCell().run();
      } else if (value === "4") {
        editor.chain().focus().toggleHeaderCell().run();
      }

      // Reset selection so it always shows "Column"
      e.target.value = "";
    }}
  >
    <option value="" disabled selected hidden>Cellule</option>
    <option value="1">Fusionner</option>
    <option value="2">Diviser</option>
    <option value="3">Supprimer</option>
    <option value="4">Basculer en-tête</option>
  </select>
</div>


      
          
          <button   className=" cursor-pointer text-neutral-500"
 onClick={() => editor.chain().focus().deleteTable().run()}>
 <label className="px-2 cursor-pointer text-neutral-500">
    <FontAwesomeIcon icon={faTable} className="w-5 h-5" />
  
  </label>  </button>
        
        </div>
      </BubbleMenu>}



      <EditorContent className="p-4 max-h-[400px] overflow-y-auto text-black" editor={editor} />
    </div>
  );
};


export default Tiptap;
