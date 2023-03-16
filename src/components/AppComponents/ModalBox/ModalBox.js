import React, { useState, createContext } from 'react';
import Modal from './Modal';
import './ModalBox.css'

function ModalBox() {
    const [isOpen, setIsOpen] = useState(false);
    const MyContext = createContext();

    const handleOpenModal = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseModal = () => {
        setIsOpen(!isOpen);
    };

    const MyProvider = ({ isOpen }) => {
        return (
            <MyContext.Provider value={{ isOpen }}>
                <Modal />
            </MyContext.Provider>
        )
    }

    return (
        <div>
            <button onClick={handleOpenModal}>Open Modal</button>
            {isOpen && (
                <Modal onClose={handleCloseModal}>
                    <h2>Modal Title</h2>
                    <p>Modal content goes here.</p>
                </Modal>
            )}
        </div>
    );
}

export default ModalBox;
