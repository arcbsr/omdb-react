import React from 'react';
import Modal from 'react-modal';
import './basicmodal.css'; // Import the CSS file

Modal.setAppElement('#root'); // Required for accessibility

const LoginModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Login Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        {children}
        <button onClick={onClose} className="close-modal">Close</button>
      </div>
    </Modal>
  );
};

export default LoginModal;
