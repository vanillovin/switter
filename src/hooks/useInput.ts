import { useState, ChangeEvent } from 'react';

function useInput(initialValue: string = '') {
  const [value, setValue] = useState<string>(initialValue);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValue(e.target.value);
  const onClearValue = () => setValue('');

  return { value, setValue, onChangeValue, onClearValue };
}

export default useInput;
