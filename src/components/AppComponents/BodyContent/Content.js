import React from 'react'

const Content = (props) => {
    return (
        <div
            className="Content"
            style={{ height: 550 }}
        >
            {props.children}
        </div>
    )
}

export default Content
