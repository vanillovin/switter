import React, { useState } from 'react';

function useInput() {
  const [value, setValue] = useState('');
  const onChangeValue = (e) => setValue(e.target.value);
  const onClearValue = () => setValue('');
  return { value, onChangeValue, onClearValue };
}

export default useInput;
