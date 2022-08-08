import useInput from 'hooks/useInput';
import React, { useState } from 'react';

function ProfileEdit({ photoURL, displayName, onSubmit, onCloseEdit }) {
  const [attachment, setAttachment] = useState(photoURL);
  const { value: newDisplayName, onChangeValue } = useInput(displayName);

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader(); // fileReader API 파일 이름을 읽음
    reader.onloadend = (finishedEvent) => {
      // console.log('finishedEvent', finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <form
      onSubmit={onSubmit}
      // className={darkMode ? 'profileForm dark' : 'profileForm'}
    >
      <div className="editProfileImage">
        <img
          alt="profile"
          className="profileImage"
          src={attachment || `${process.env.PUBLIC_URL}/default-profile.png`}
        />
        <label htmlFor="attach-file" className="">
          <span>사진 선택하기</span>
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: 'none', opacity: 0 }}
        />
        {attachment !== photoURL && (
          <button className="profileImgclearBtn" onClick={() => setAttachment(photoURL)}>
            <span>제거하기</span>
          </button>
        )}
        {/* <button
                  className="profileImgclearBtn"
                >
                  <span>사진 삭제하기</span>
                </button> */}
      </div>

      <input
        onChange={onChangeValue}
        type="text"
        placeholder="Display name"
        value={newDisplayName || ''}
        className="formInput"
      />
      <input
        type="submit"
        className="formBtn updateProfileBtn"
        onClick={onSubmit}
        value="프로필 업데이트"
      />
      <input
        type="button"
        className="formBtn updateProfileBtn"
        onClick={onCloseEdit}
        style={{ background: 'rgba(177,151,252,0.6)' }}
        value="취소하기"
      />
    </form>
  );
}

export default ProfileEdit;
