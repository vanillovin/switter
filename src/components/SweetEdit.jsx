import React from 'react';
import useInput from 'hooks/useInput';

function SweetEdit({ text, onSubmit, closeEdit }) {
  const { value, onChangeValue } = useInput(text);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <>
      <form className="container sweetEdit" onSubmit={handleSubmit}>
        <textarea
          className="formInput"
          type="text"
          placeholder="스윗 수정하기"
          name="sweet"
          required
          autoFocus
          value={value}
          onChange={onChangeValue}
          maxLength={500}
        />
        <input type="submit" value="스윗 업데이트" className="formBtn" />
      </form>
      <button onClick={closeEdit} className="formBtn cancelBtn">
        취소
      </button>
    </>
  );
}

export default SweetEdit;
