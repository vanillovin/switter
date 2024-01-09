import { useState } from 'react';
import useBoolean from './useBoolean';

export const useModalWithData = (initialMode = false, initialSelected = null) => {
  const [modalOpen, setModalOpen] = useBoolean(initialMode);
  const [selected, setSelected] = useState(initialSelected);

  const setModalState = (state) => {
    setModalOpen(state);
    if (state === false) {
      setSelected(null);
    }
  };

  return { modalOpen, setModalOpen, selected, setSelected, setModalState };
};
