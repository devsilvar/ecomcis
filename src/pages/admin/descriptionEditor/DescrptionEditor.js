// components/DescriptionEditor.js
import React, { useEffect , useState } from 'react';
import {
  Bold,
  Italic,
  Heading1,
  List,
  ListOrdered,
  Table as TableIcon,
  Columns3,
  Rows3,
  GripVertical,
  Trash2,
  Plus,
  Minus,
} from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import "./editor.css"

const DescriptionEditor = ({ desc, setDesc }) => {
  const [editState, seteditState] = useState(true)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
        lastColumnResizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],

    content: desc || '<p>Your content here...</p>',
    onUpdate({ editor }) {
      setDesc(editor.getHTML());
    },
  });

 
  useEffect(() => {
    if (editor && desc && editor.getHTML() !== desc) {
      editor.commands.setContent(desc);
    }
  }, [editor, desc]);
  
  

  if (!editor) {
    return <p>Loading editor...</p>;
  }

  return (
<div className="border rounded-[10px] border-[#e5e5e5] p-4">
  <p className="text-[0.875rem] mb-[10px]">Description</p>
  <div className="flex flex-wrap gap-2 mb-2">
    <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}>
      <Bold size={18} />
    </button>
    <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>
      <Italic size={18} />
    </button>
    <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
      <Heading1 size={18} />
    </button>
    <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>
      <List size={18} />
    </button>
    <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
      <ListOrdered size={18} />
    </button>
    <button type="button" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
      <TableIcon size={18} />
    </button>
    <button type="button" onClick={() => editor.chain().focus().addColumnBefore().run()}>
      <Columns3 size={18} className="rotate-180" />
    </button>
    <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()}>
      <Columns3 size={18} />
    </button>
    <button type="button" onClick={() => editor.chain().focus().addRowBefore().run()}>
      <Rows3 size={18} className="rotate-180" />
    </button>
    <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()}>
      <Rows3 size={18} />
    </button>
    <button
  type="button"
  onClick={() => editor.chain().focus().deleteColumn().run()}
  className="w-[2px] h-4 bg-black"
  aria-label="Delete Column"
/>
    <button type="button" onClick={() => editor.chain().focus().deleteRow().run()}>
      <Minus size={18} />
    </button>
    <button type="button" onClick={() => editor.chain().focus().deleteTable().run()}>
      <Trash2 size={18} />
    </button>
  </div>

  <EditorContent editor={editor} className="editor-content"/>
</div>
  );
};

export default DescriptionEditor;
