import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, dbService, storageService } from 'services/firebase/fbase';
import { signOut, updateProfile } from '@firebase/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { collection, doc, setDoc } from 'firebase/firestore';

const Profile = ({ refreshUser, userObj, darkMode }) => {
  // console.log('Profile userObj', userObj);

  const history = useHistory();
  const [attachment, setAttachment] = useState(userObj.photoURL);
  const [editProfile, setEditProfile] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [error, setError] = useState(null);
  console.log('Profile errorState', error);

  const handleLogOut = () => {
    signOut(authService); // auth.signOut();
    history.push('/');
  };

  const onChange = ({ target: { value } }) => {
    setNewDisplayName(value);
  };

  // updateProfile 2 update - displayName, photoURL
  const onSubmit = async (event) => {
    event.preventDefault();

    if (userObj.displayName === newDisplayName && userObj.photoURL === attachment) {
      // setError('')
      return;
    }
    let attachmentUrl = '';

    if (attachment !== userObj.photoURL) {
      // 파일 경로 참조 만들기
      const fileRef = ref(storageService, `${userObj.uid}/profileImage`);
      // storage 참조 경로로 파일 업로드 하기
      const uploadFile = await uploadString(fileRef, attachment, 'data_url');
      // storage에 있는 파일 URL로 다운로드 받기
      attachmentUrl = await getDownloadURL(uploadFile.ref);
    }

    await updateProfile(authService.currentUser, {
      displayName: newDisplayName,
      photoURL: attachmentUrl,
    })
      .then((res) => {
        console.log('Profile updated!', res);
        refreshUser();

        const usersRef = collection(dbService, 'users');

        // users/profilePhoto
        setDoc(doc(usersRef, 'profilePhoto'), {
          [userObj?.uid]: attachmentUrl,
        })
          .then((res) => {
            console.log('users/profilePhoto 업데이트 res', res);
          })
          .catch((err) => {
            console.log('users/profilePhoto 업데이트 err', err);
          });

        // users/sweetData/${user.uid}/photoURL
        setDoc(doc(usersRef, 'profileData'), {
          [userObj?.uid]: {
            displayName: newDisplayName,
            photoURL: attachmentUrl,
          },
        })
          .then((res) => {
            console.log('users/profilePhoto/photoURL 업데이트 res', res);
          })
          .catch((err) => {
            console.log('users/profilePhoto/photoURL 업데이트 err', err);
          });
      })
      .catch((error) => {
        console.log('Profile update An error occurred', error);
        setError('프로필 사진 업데이트를 실패했습니다');
      });

    setEditProfile(false);
  };

  // const onClearAttachment = () => setAttachment('');

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
    // <div className="container">
    <div className={darkMode ? 'profileContainer dark' : 'profileContainer'}>
      <div className="profileInfoContainer">
        {!editProfile ? (
          <div className="profileInfo">
            <div>
              <img
                alt="profile"
                className="profileImage"
                src={userObj.photoURL || `${process.env.PUBLIC_URL}/default-profile.png`}
              />
              <div>
                <h2 className="dname">{userObj.displayName}</h2>
                <p className="email">@{userObj.email.split('@')[0]}</p>
              </div>
            </div>

            <div className="profileBtns">
              <button className="profileEditButton" onClick={() => setEditProfile(true)}>
                프로필 수정
              </button>
              <button className="logoutBtn" onClick={handleLogOut}>
                로그아웃
              </button>
            </div>
          </div>
        ) : (
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
              {attachment !== userObj.photoURL && (
                <button
                  className="profileImgclearBtn"
                  onClick={() => setAttachment(userObj.photoURL)}
                >
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
              onChange={onChange}
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
              onClick={() => setEditProfile(false)}
              style={{ background: 'rgba(177,151,252,0.6)' }}
              value="취소하기"
            />
          </form>
        )}
      </div>

      <hr />
      <div>조아요 댓글 리트윗</div>
    </div>
    // </div>
  );
};

export default Profile;
