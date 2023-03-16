import React, { useRef, useEffect, useState } from 'react';
import { PixelEditor, Pencil } from '@curtishughes/pixel-editor';
import "react-color-palette/lib/css/styles.css";
import TopNav from './components/AppComponents/TopNav/TopNav';
import Footer from './components/AppComponents/Footer/Footer';
import Content from './components/AppComponents/BodyContent/Content';

// react-color
import { Sketch } from '@uiw/react-color';

function App() {
  const [data, setData] = useState(true);
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [colorPalette, setColorPalette] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000");

  function handleChange() {
    setColorPalette(!colorPalette);
  }

  useEffect(() => {
    if (editorRef.current) {
      setEditor(new PixelEditor(editorRef.current, 64, 64, new Pencil(selectedColor)));
    }
  }, []);

  useEffect(() => {
    if (editor) {
      editor.tool = new Pencil(selectedColor);
    }
  }, [selectedColor]);

  return (
    <>
      <TopNav />
      {data && (
        <Content>
          {colorPalette && (
            <div className="colorPicker">
              <button onClick={handleChange}>X</button>
              <Sketch style={{ marginLeft: 20 }} color={selectedColor} onChange={(color) => setSelectedColor(color.hex)} />
            </div>
          )}

          <canvas ref={editorRef} style={{ height: 500, borderStyle: "solid" }} />
          <button onClick={() => { if (editor) editor.tool = new Pencil() }}>Eraser</button>
          <button onClick={() => { if (editor) editor.tool = new Pencil(selectedColor) }}>Pencil</button>
          <button onClick={() => { if (editor) editor.undo() }}>Undo</button>
          <button onClick={() => { if (editor) editor.redo() }}>Redo</button>
          <button onClick={handleChange}>Palette</button>
        </Content>
      )}
      <Footer />
    </>
  );
}

export default App;
