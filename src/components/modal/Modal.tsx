import React, { useContext, useRef } from 'react';

import ModalPortal from './ModalPortal';
import { ModalContext } from '../../contexts/ModalContext';

function Modal() {
  const el = useRef();
  const { modal, modalContent, closeModal } = useContext(ModalContext);

  return modal ? (
    <ModalPortal>
      <div
        className="modal-container"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
        ref={el}
      >
        <div className="modal">
          <h1>Ooops</h1>
          <p>{modalContent}</p>
          <button className="closeBtn" onClick={() => closeModal()}>
            닫기
          </button>
        </div>
      </div>
    </ModalPortal>
  ) : null;
}

export default Modal;
