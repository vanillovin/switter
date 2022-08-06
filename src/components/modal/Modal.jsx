import { ModalContext } from 'contexts/ModalContext';
import React, { useContext } from 'react';
import ModalPortal from './ModalPortal';

function Modal() {
  const { modalContent, handleModal, modal } = useContext(ModalContext);
  return modal ? (
    <ModalPortal>
      <div className="modal">
        <p>{modalContent}</p>
        <button onClick={() => handleModal()}>닫기</button>
      </div>
    </ModalPortal>
  ) : null;
}

export default Modal;
