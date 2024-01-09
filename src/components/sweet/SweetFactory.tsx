import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

import useInput from '../../hooks/useInput';
import { useTheme } from '../../contexts/ThemeProvider';
import useSweetService from '../../hooks/useSweetService';

function SweetFactory() {
  const { darkMode } = useTheme();
  const { onCreateSweet } = useSweetService();

  const { value: content, onChangeValue, onClearValue } = useInput('');
  const {
    value: attachment,
    setValue: setAttachment,
    onClearValue: onClearAttachment,
  } = useInput('');

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateSweet(attachment, content, () => {
      onClearValue();
      onClearAttachment();
    });
  };

  const handleFileChange = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!files) return;
    const theFile = files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      setAttachment(e.target?.result as string);
    };
    fileReader.readAsDataURL(theFile);
  };

  return (
    <form onSubmit={handleSubmit} className={`factoryForm ${darkMode ? darkMode : ''}`}>
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={content}
          onChange={onChangeValue}
          type="text"
          placeholder="무슨 달콤한 생각을 하고 있나요?"
          maxLength={120}
          required
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>사진 선택하기</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            alt="img"
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>제거하기</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
}

export default SweetFactory;

// const readFileAsDataURL = (file: File): Promise<string | ArrayBuffer | null> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// };
