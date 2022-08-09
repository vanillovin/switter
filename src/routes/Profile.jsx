import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { authService } from 'services/firebase/fbase';
import { signOut } from '@firebase/auth';
import Loading from 'components/Loading';
import ProfileEdit from 'components/profile/ProfileEdit';
import NotFoundPage from 'components/NotFoundPage';
import { UsersProfileContext } from 'contexts/UsersProfileContext';
import { profileImageFileUploadAndDownload } from 'services/sweets';
import {
  updateCurUserProfile,
  updateUsersProfileData,
  updateUsersProfilePhoto,
} from 'services/users';
import { ModalContext } from 'contexts/ModalContext';

const Profile = ({ refreshUser, userObj, darkMode }) => {
  const params = useParams();
  const history = useHistory();
  const {
    usersProfileData: { loading, data, error },
  } = useContext(UsersProfileContext);
  const profileData = data?.[params.uid || userObj.uid];
  const [editProfile, setEditProfile] = useState(false);
  const isOwner = userObj.uid === params.uid;
  const { handleModal } = useContext(ModalContext);

  const handleLogOut = () => {
    signOut(authService); // auth.signOut();
    history.push('/');
  };

  const onSubmit = async (fileDataUrl, newDisplayName, newAboutMe) => {
    if (
      userObj.displayName === newDisplayName &&
      userObj.photoURL === fileDataUrl &&
      profileData.aboutMe === newAboutMe
    ) {
      setEditProfile(false);
      return;
    }

    let fileDownloadUrl = '';
    if (fileDataUrl !== '') {
      fileDownloadUrl = await profileImageFileUploadAndDownload(userObj.uid, fileDataUrl);
    }

    updateCurUserProfile({
      displayName: newDisplayName,
      photoURL: fileDownloadUrl,
    })
      .then((res) => {
        console.log('Profile update!', res);
        setEditProfile(false);
        refreshUser();
        updateUsersProfilePhoto(userObj?.uid, fileDownloadUrl).catch((err) => {
          console.log('Profile - updateUsersProfilePhoto err', err);
        });
        updateUsersProfileData(userObj?.uid, {
          ...profileData,
          displayName: newDisplayName,
          aboutMe: newAboutMe,
          photoURL: fileDownloadUrl,
        }).catch((err) => {
          console.log('Profile - updateUsersProfileData err', err);
        });
      })
      .catch((error) => {
        console.log('Profile update An error occurred', error);
        handleModal('회원님의 프로필을 업데이트할 수 없습니다. 다시 시도해주세요');
      });
  };

  if (loading) return <Loading />;

  if (!profileData) return <NotFoundPage message="존재하지 않는 사용자입니다" />;

  if (error) return <NotFoundPage message="사용자를 조회할 수 없습니다" />;

  return (
    <div className={darkMode ? 'profileContainer dark' : 'profileContainer'}>
      <div className="profileInfoContainer">
        {!editProfile ? (
          <div className="profileInfo">
            <div>
              <img
                alt="profile"
                className="profileImage"
                src={
                  profileData?.photoURL || `${process.env.PUBLIC_URL}/default-profile.png`
                }
              />
              <div>
                <h2 className="dname">{profileData?.displayName}</h2>
                <p className="email">@{profileData?.email.split('@')[0]}</p>
              </div>
              <p className="aboutMe">{profileData?.aboutMe}</p>
            </div>

            {isOwner && (
              <div className="profileBtns">
                <button
                  className="profileEditButton"
                  onClick={() => setEditProfile(true)}
                >
                  프로필 수정
                </button>
                <button className="logoutBtn" onClick={handleLogOut}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <ProfileEdit
            photoURL={profileData?.photoURL}
            displayName={userObj.displayName}
            aboutMe={profileData?.aboutMe}
            onSubmit={onSubmit}
            onCloseEdit={() => setEditProfile(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
