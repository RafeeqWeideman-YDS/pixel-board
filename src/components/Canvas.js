import React, { useRef, useEffect, useState } from 'react'
import { PixelEditor, Pencil } from '@curtishughes/pixel-editor'

const Canvas = () => {
    const editorRef = useRef(null);
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        if (editorRef.current && !editor) {
            const newEditor = new PixelEditor(editorRef.current, 64, 64, new Pencil("black"));
            setEditor(newEditor);
            editorRef.current.editor = editor;
        }
    }, [editorRef, editor]);

    return (
        <div>
            <canvas ref={editorRef} style={{ height: 200, width: 200, borderStyle: "solid" }} />
        </div>
    )
}

export default Canvas
