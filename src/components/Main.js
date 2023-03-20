import React, { useRef, useEffect, useState } from 'react';
import { PixelEditor, Pencil } from '@curtishughes/pixel-editor';
import "react-color-palette/lib/css/styles.css";
import Content from './AppComponents/BodyContent/Content';

// react-color
import { Sketch } from '@uiw/react-color';

function Main() {
    const canvasRef = useRef(null);
    const layerRef = useRef(null);
    const [data, setData] = useState(true);
    const editorRef = useRef(null);
    const [editor, setEditor] = useState(null);
    const [colorPalette, setColorPalette] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#000");
    const [saveCanvasData, setSaveCanvasData] = useState(null);

    const [layers, setLayers] = useState([
        { name: 'Layer 1', visible: true },
        // { name: 'Layer 2', visible: true },
    ]);

    const addLayer = () => {
        const newLayerName = `Layer ${layers.length + 1}`;
        const newLayer = { name: newLayerName, visible: true };
        setLayers([...layers, newLayer]);
    };

    const deleteLayer = (index) => {
        const newLayers = [...layers];
        newLayers.splice(index, 1);
        setLayers(newLayers);
    };

    const toggleLayerVisibility = (index) => {
        const newLayers = [...layers];
        newLayers[index].visible = !newLayers[index].visible;
        setLayers(newLayers);
    };

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

    useEffect(() => {
        if (editorRef.current && !editor) {
            const newEditor = new PixelEditor(editorRef.current, 64, 64, new Pencil(selectedColor));
            setEditor(newEditor);
            editorRef.current.editor = editor;
        }
    }, [editorRef, editor, selectedColor]);

    // useEffect(() => {
    //     if (editor) {
    //         editor.setLayers(layers);
    //     }
    // }, [editor, layers]);

    useEffect(() => {
        if (editorRef.current && editorRef.current.editor) {
            editorRef.current.editor.setLayers(layers);
        }
    }, [editorRef, layers]);

    useEffect(() => {
        if (editor) {
            editor.tool = new Pencil(selectedColor, 4);
        }
    }, [editor, selectedColor]);

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


                        {layers.map((layer, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    checked={layer.visible}
                                    onChange={() => toggleLayerVisibility(index)}
                                />
                                <span>{layer.name}</span>
                                <button onClick={() => deleteLayer(index)}>Delete</button>
                            </div>
                        ))}

                        {layers.map((layer, index) => (
                            <div key={index} style={{ display: layer.visible ? 'block' : 'none' }}>
                                {layer.canvas}
                                <canvas ref={editorRef} style={{ height: 500, borderStyle: "solid" }} />
                            </div>
                        ))}

                        <div ref={canvasRef} />
                        <button onClick={() => { if (editor) editor.tool = new Pencil() }}>Eraser</button>
                        <button onClick={() => { if (editor) editor.tool = new Pencil(selectedColor) }}>Pencil</button>
                        <button onClick={() => { if (editor) editor.undo() }}>Undo</button>
                        <button onClick={() => { if (editor) editor.redo() }}>Redo</button>
                        <button onClick={handleChange}>Palette</button>
                        <button onClick={saveCanvasDataToLocalStorage}>Save</button>
                        <button onClick={addLayer}>Add Layer</button>

                    </Content>
                </div>
            )}
        </>
    );
}

export default Main;
