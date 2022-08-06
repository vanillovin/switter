import Modal from 'components/modal/Modal';
import useModal from 'hooks/useModal';
import React, { createContext } from 'react';

const ModalContext = createContext();

let ModalProvider = ({ children }) => {
  const { modal, handleModal, openModal, closeModal, modalContent } = useModal();
  return (
    <ModalContext.Provider
      value={{ modal, handleModal, openModal, closeModal, modalContent }}
    >
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
