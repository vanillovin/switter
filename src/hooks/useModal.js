import { useState } from 'react';

const useModal = () => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState('im modal content');
  const handleModal = (content = false) => {
    setModal((prev) => !prev);
    if (content) setModalContent(content);
  };
  const closeModal = (content = false) => {
    setModal(false);
    if (content) setModalContent(content);
  };
  const openModal = (content = false) => {
    setModal(true);
    if (content) setModalContent(content);
  };
  return { modal, handleModal, openModal, closeModal, modalContent };
};

export default useModal;
