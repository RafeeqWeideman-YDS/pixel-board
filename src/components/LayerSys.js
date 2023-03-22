import React, { useState } from 'react'
import Canvas from './Canvas'

const LayerSys = () => {
    const [layer, setLayer] = useState([
        { canvas: <Canvas /> }
    ])
    const [selected, setSelected] = useState(-1)

    // ADD LAYER
    function handleAddFunction() {
        setLayer([...layer, { canvas: <Canvas /> }])
    }

    // SELECT LAYER
    function handleSelectedLayer(index) {
        setSelected(index)
    }

    return (
        <div>
            <div style={{ display: "flex" }}>
                <button onClick={handleAddFunction}>ADD</button>
                <div style={{
                    display: "flex",
                    width: 1300,
                    backgroundColor: "grey",
                    overflow: "auto"
                }}>
                    {layer.map((data, index) => (
                        <div
                            key={index}
                            style={{ margin: 10, backgroundColor: selected === index ? "lightblue" : "white" }}
                            onClick={() => handleSelectedLayer(index)}
                        >
                            {data.canvas}
                        </div>
                    ))}
                </div>
            </div>
            {/*RENDER SELECTED LAYER */}
            {selected !== -1 && layer[selected].canvas}
        </div>
    )
}

export default LayerSys
