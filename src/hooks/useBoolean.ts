import { useState } from 'react';

type UseBoolean = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
};

export const useBoolean = (initialValue: boolean = false): UseBoolean => {
  const [value, setValue] = useState<boolean>(initialValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((prev) => !prev);

  return { value, setTrue, setFalse, toggle };
};
