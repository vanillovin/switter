import useInput from '../../hooks/useInput';
import { Profile } from '../../types/Profile';
import { updateProfile } from 'firebase/auth';

import { useTheme } from '../../contexts/ThemeProvider';
import { authService } from '../../services/firebase/firebaseConfig';
import { getUploadImageURL } from '../../services/firebase/sweetService';
import { updateProfileInfo } from '../../services/firebase/userService';

type ProfileEditProps = {
  profile: Profile;
  onCloseEdit: () => void;
};

function ProfileEdit({
  onCloseEdit,
  profile: { profileImageURL, displayName, about },
}: ProfileEditProps) {
  const { darkMode } = useTheme();
  const { value: fileData, setValue: setFileData } = useInput(profileImageURL);
  const { value: newDisplayName, onChangeValue } = useInput(displayName);
  const { value: newAboutMe, onChangeValue: onChangeAboutMe } = useInput(about);

  const handelUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = authService.currentUser;
    if (!user) return;

    let fileDataURL = '';
    if (fileData !== '') {
      fileDataURL =
        (await getUploadImageURL(user?.uid as string, fileData)) ??
        (user?.photoURL as string);
    }
    updateProfile(user, {
      displayName: newDisplayName,
      photoURL: fileDataURL,
    });
    updateProfileInfo(user.uid, {
      about: newAboutMe,
      displayName: newDisplayName,
      profileImageURL: fileDataURL,
    });
  };

  const onFileChange = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    if (!files) return;
    const theFile = files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      setFileData(e.target?.result as string);
    };
    fileReader.readAsDataURL(theFile);
  };

  return (
    <form
      onSubmit={handelUpdateProfile}
      className={darkMode ? 'profileForm dark' : 'profileForm'}
    >
      <div className="editProfileImage">
        <img
          alt="profile"
          className="profileImage"
          src={fileData || `${process.env.PUBLIC_URL}/default-profile.png`}
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
        {fileData !== profileImageURL && (
          <button
            className="profileImgclearBtn"
            onClick={() => setFileData(profileImageURL)}
          >
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
      <input type="submit" className="formBtn updateProfileBtn" value="프로필 업데이트" />
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
