import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

import useInput from 'hooks/useInput';
import { updateUsersProfileData } from 'services/users';
import { createSweet, imageFileUploadAndDownload } from 'services/sweets';
import { UsersProfileContext } from 'contexts/UsersProfileContext';

const SweetFactory = ({ userObj, darkMode }) => {
  const { usersProfileData } = useContext(UsersProfileContext);
  const profileData = usersProfileData?.[userObj.uid];
  const { value: text, onChangeValue, onClearValue } = useInput('');
  const {
    value: attachment,
    setValue: setAttachment,
    onClearValue: onClearAttachment,
  } = useInput('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (text === '') return;
    let attachmentUrl = '';
    if (attachment !== '') {
      attachmentUrl = await imageFileUploadAndDownload(userObj.uid, attachment);
    }

    const sweetObj = {
      text,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
      dName: userObj.displayName,
      email: userObj.email,
      likes: [],
      comments: [],
    };

    createSweet(sweetObj)
      .then((res) => {
        // console.log('createSweet res', res.id);
        onClearValue();
        onClearAttachment();
        updateUsersProfileData(userObj.uid, {
          ...profileData,
          writtenSweets: [...profileData.writtenSweets, { id: res.id, ...sweetObj }],
        })
          .then((res) => {
            console.log('updateUserProfileArrData writtenSweets res', res);
          })
          .catch((err) => {
            console.log('updateUserProfileArrData writtenSweets err', err);
          });
      })
      .catch((err) => {
        console.log('createSweet err', err);
      });
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader(); // fileReader API 파일 이름을 읽음
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <form onSubmit={onSubmit} className={darkMode ? 'factoryForm dark' : 'factoryForm'}>
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={text}
          onChange={onChangeValue}
          type="text"
          placeholder="무슨 달콤한 생각을 하고 있나요?"
          maxLength={120}
        />
        <input
          type="submit"
          value="&rarr;"
          className="factoryInput__arrow"
          onSubmit={onsubmit}
        />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>사진 선택하기</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
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
};

export default SweetFactory;
