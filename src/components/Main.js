import React, { useRef, useEffect, useState } from 'react';
import { PixelEditor, Pencil } from '@curtishughes/pixel-editor';
import "react-color-palette/lib/css/styles.css";
import Content from './AppComponents/BodyContent/Content';

// react-color
import { Sketch } from '@uiw/react-color';

function Main() {
    const canvasRef = useRef(null);
    const [data, setData] = useState(true);
    const editorRef = useRef(null);
    const [editor, setEditor] = useState(null);
    const [colorPalette, setColorPalette] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#000");
    const [saveCanvasData, setSaveCanvasData] = useState(null);
    // const [gridSize, setGridSize] = useState(8); // Change the grid size here

    function handleChange() {
        setColorPalette(!colorPalette);
    }

    function saveCanvasDataToLocalStorage() {
        if (editorRef.current) {
            const canvas = editorRef.current;
            const canvasData = canvas.toDataURL();
            try {
                // create a temporary link and simulate a click to download the image
                const link = document.createElement('a');
                const fileName = prompt('Enter a filename for the image:', 'myImage.png');
                if (!fileName) return; // if the user cancels the prompt or doesn't enter a filename, do nothing
                link.download = fileName;
                link.href = canvasData;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                alert('Image saved to your device.');
                // set the saveCanvasData state to the canvas data URL
                setSaveCanvasData(canvasData);
            } catch (error) {
                alert('Error saving image to local storage.');
                console.error(error);
            }
        }
    }


    // function restoreCanvasData() {
    //   if (editorRef.current && saveCanvasData) {
    //     const canvas = editorRef.current;
    //     const ctx = canvas.getContext('2d');
    //     const img = new Image();
    //     img.onload = () => {
    //       ctx.clearRect(0, 0, canvas.width, canvas.height);
    //       ctx.drawImage(img, 0, 0);
    //     };
    //     img.src = saveCanvasData;
    //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //     ctx.putImageData(imageData, 0, 0);
    //   }
    // }

    // useEffect(() => {
    //   if (editorRef.current) {
    //     const canvas = editorRef.current;
    //     const ctx = canvas.getContext('2d');

    //     // Draw the grid lines
    //     ctx.lineWidth = 1;
    //     ctx.strokeStyle = '#ccc';
    //     for (let i = 0; i <= canvas.width; i += gridSize) {
    //       ctx.beginPath();
    //       ctx.moveTo(i, 0);
    //       ctx.lineTo(i, canvas.height);
    //       ctx.stroke();
    //     }
    //     for (let i = 0; i <= canvas.height; i += gridSize) {
    //       ctx.beginPath();
    //       ctx.moveTo(0, i);
    //       ctx.lineTo(canvas.width, i);
    //       ctx.stroke();
    //     }
    //   }
    // }, [gridSize]);

    useEffect(() => {
        if (editorRef.current) {
            setEditor(new PixelEditor(editorRef.current, 64, 64, new Pencil(selectedColor)));
        }
    }, []);

    useEffect(() => {
        if (editor) {
            editor.tool = new Pencil(selectedColor, 4);
        }
    }, [selectedColor]);

    return (
        <>
            {data && (
                <div className='toolBox'>
                    <Content>
                        {colorPalette && (
                            <div className="colorPicker">
                                <button onClick={handleChange}>X</button>
                                <Sketch style={{ marginLeft: 20 }} color={selectedColor} onChange={(color) => setSelectedColor(color.hex)} />
                            </div>
                        )}

                        <canvas ref={editorRef} style={{ height: 500, borderStyle: "solid" }} />
                        <div ref={canvasRef} />
                        <button onClick={() => { if (editor) editor.tool = new Pencil() }}>Eraser</button>
                        <button onClick={() => { if (editor) editor.tool = new Pencil(selectedColor) }}>Pencil</button>
                        <button onClick={() => { if (editor) editor.undo() }}>Undo</button>
                        <button onClick={() => { if (editor) editor.redo() }}>Redo</button>
                        <button onClick={handleChange}>Palette</button>
                        <button onClick={saveCanvasDataToLocalStorage}>Save</button>
                        {/* <button onClick={() => setGridSize(gridSize + 1)}>Increase Grid Size</button>
            <button onClick={() => setGridSize(gridSize - 1)}>Decrease Grid Size</button> */}
                        {/* <button onClick={restoreCanvasData}>Restore</button> */}
                    </Content>
                </div>
            )}
        </>
    );
}

export default Main;
