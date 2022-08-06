import { useState } from 'react';
import useModal from './useModal';

export const useModalWithData = (initialMode = false, initialSelected = null) => {
  const [modalOpen, setModalOpen] = useModal(initialMode);
  const [selected, setSelected] = useState(initialSelected);
  const setModalState = (state) => {
    setModalOpen(state);
    if (state === false) {
      setSelected(null);
    }
  };
  return { modalOpen, setModalOpen, selected, setSelected, setModalState };
};
