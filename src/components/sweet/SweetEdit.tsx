import useInput from '../../hooks/useInput';

type SweetEditProps = {
  oldContent: string;
  onSubmit: (newContent: string) => void;
  closeEdit: () => void;
};

function SweetEdit({ oldContent, onSubmit, closeEdit }: SweetEditProps) {
  const { value: newContent, onChangeValue } = useInput(oldContent);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit(newContent);
    closeEdit();
  };

  return (
    <div className="sweetEditContainer">
      <form className="container sweetEdit">
        <textarea
          className="formInput"
          placeholder="스윗 수정하기"
          name="sweet"
          required
          autoFocus
          value={newContent}
          onChange={onChangeValue}
          maxLength={500}
        />
      </form>
      <button onClick={handleSubmit} className="formBtn">
        스윗 업데이트
      </button>
      <button onClick={closeEdit} className="formBtn cancelBtn">
        취소
      </button>
    </div>
  );
}

export default SweetEdit;
