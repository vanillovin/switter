import React, { useState } from 'react';

function SweetEdit({ text, onSubmit, closeEdit }) {
  const [newText, setNewText] = useState(text);

  const onChange = (e) => setNewText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newText);
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
          value={newText}
          onChange={onChange}
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
