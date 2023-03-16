
function Modal({ onClose, children }) {
    return (
        <div className="modal-overlay" >
            <div className="modal" >
                <button onClick={onClose} className="close-button">
                    X
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
