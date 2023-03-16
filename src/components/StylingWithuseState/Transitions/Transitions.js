import React, { useState } from 'react';

function Transitions() {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div
            className="box"
            onClick={handleClick}
            style={{ background: isClicked ? 'red' : 'blue', transition: 'background 1s' }}
        >
            Click me!
        </div>
    );
}

export default Transitions;