import useInput from 'hooks/useInput';
import React from 'react';

function ProfileEdit({ photoURL, displayName, aboutMe, onSubmit, onCloseEdit }) {
  const { value: fileDataUrl, setValue: setFileDataUrl } = useInput(photoURL);
  const { value: newDisplayName, onChangeValue } = useInput(displayName);
  const { value: newAboutMe, onChangeValue: onChangeAboutMe } = useInput(aboutMe);

  const handelSubmit = (e) => {
    e.preventDefault();
    onSubmit(fileDataUrl, newDisplayName, newAboutMe);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const uploadFile = files[0];
    // const uploadFileName = uploadFile?.name;
    const fileReader = new FileReader();
    if (fileReader && uploadFile !== undefined && uploadFile !== null) {
      fileReader.onload = (event) => {
        const {
          target: { result },
        } = event;

        setFileDataUrl(result);
      };
      fileReader.readAsDataURL(uploadFile);
      // setFileName(`${uploadFileName}_${Date.now()}`);
    }
  };

  return (
    <form
      onSubmit={handelSubmit}
      // className={darkMode ? 'profileForm dark' : 'profileForm'}
    >
      <div className="editProfileImage">
        <img
          alt="profile"
          className="profileImage"
          src={fileDataUrl || `${process.env.PUBLIC_URL}/default-profile.png`}
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
        {fileDataUrl !== photoURL && (
          <button className="profileImgclearBtn" onClick={() => setFileDataUrl(photoURL)}>
            <span>제거하기</span>
          </button>
        )}
        {/* {attachment !== defaultProfileURL && (
          <button
            className="profileImgclearBtn"
            onClick={() => setAttachment(defaultProfileURL)}
          >
            <span>사진 삭제하기</span>
          </button>
        )} */}
      </div>

      <input
        onChange={onChangeValue}
        type="text"
        placeholder="Display name"
        value={newDisplayName || ''}
        className="formInput"
      />
      <input
        onChange={onChangeAboutMe}
        type="text"
        placeholder="About Me"
        value={newAboutMe || ''}
        className="formInput aboutMeInput"
      />
      <input
        type="submit"
        className="formBtn updateProfileBtn"
        onClick={handelSubmit}
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
