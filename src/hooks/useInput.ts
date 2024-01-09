import { useState } from 'react';

function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const onChangeValue = (e) => setValue(e.target.value);
  const onClearValue = () => setValue('');
  return { value, setValue: (val) => setValue(val), onChangeValue, onClearValue };
}

export default useInput;
