import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function DecoModal(isOpen, onClose) {
  const [issue, setIssue] = useState({
    roomCode: "",
  });

  const customModalStyles = {
    content: {
      backgroundColor: "#646cffaa", // Dark background color
      color: "#fff", // Light text color
      border: "none",
      borderRadius: "8px",
      maxWidth: "400px",
      maxHeight: "350px",
      margin: "auto",
      padding: "20px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
    },
  };

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customModalStyles}>
        <div>
          <h2>Room Code</h2>
        </div>
        <button onClick={onClose}>닫기</button>
      </Modal>
    </>
  );
}
function PopUp() {
  const [isOpen, setIsOpen] = useState(false);

  const hModalOpen = () => {
    setIsOpen(true);
  };

  const hModalClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button onClick={hModalOpen}>열기</button>
      <DecoModal isOpen={isOpen} onClose={hModalClose} />
    </>
  );
}

export default PopUp;
