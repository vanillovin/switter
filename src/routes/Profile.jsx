import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { authService } from 'services/firebase/fbase';
import { signOut } from '@firebase/auth';
import { fetchUsersProfileData } from 'services/users';
import Loading from 'components/Loading';
import ProfileEdit from 'components/profile/ProfileEdit';
import NotFoundPage from 'components/NotFoundPage';

const Profile = ({ refreshUser, userObj, darkMode }) => {
  const params = useParams();
  const history = useHistory();
  const [userProfileData, setUserProfileData] = useState({
    lodaing: true,
    data: null,
    error: null,
  });
  const { loading, data, error } = userProfileData;
  const [editProfile, setEditProfile] = useState(false);
  const isOwner = userObj.uid === params.uid;

  const handleLogOut = () => {
    signOut(authService); // auth.signOut();
    history.push('/');
  };

  // updateProfile 2 update - displayName, photoURL
  const onSubmit = async (event) => {
    event.preventDefault();

    // if (userObj.displayName === newDisplayName && userObj.photoURL === attachment) {
    //   // setError('');
    //   return;
    // }
    // let attachmentUrl = '';

    // if (attachment !== userObj.photoURL) {
    //   // 파일 경로 참조 만들기
    //   const fileRef = ref(storageService, `${userObj.uid}/profileImage`);
    //   // storage 참조 경로로 파일 업로드 하기
    //   const uploadFile = await uploadString(fileRef, attachment, 'data_url');
    //   // storage에 있는 파일 URL로 다운로드 받기
    //   attachmentUrl = await getDownloadURL(uploadFile.ref);
    // }

    // await updateProfile(authService.currentUser, {
    //   displayName: newDisplayName,
    //   photoURL: attachmentUrl,
    // })
    //   .then((res) => {
    //     console.log('Profile updated!', res);
    //     refreshUser();

    //     const usersRef = collection(dbService, 'users');

    //     // users/profilePhoto
    //     setDoc(doc(usersRef, 'profilePhoto'), {
    //       [userObj?.uid]: attachmentUrl,
    //     })
    //       .then((res) => {
    //         console.log('users/profilePhoto 업데이트 res', res);
    //       })
    //       .catch((err) => {
    //         console.log('users/profilePhoto 업데이트 err', err);
    //       });

    //     // users/sweetData/${user.uid}/photoURL
    //     setDoc(doc(usersRef, 'profileData'), {
    //       [userObj?.uid]: {
    //         displayName: newDisplayName,
    //         photoURL: attachmentUrl,
    //       },
    //     })
    //       .then((res) => {
    //         console.log('users/profilePhoto/photoURL 업데이트 res', res);
    //       })
    //       .catch((err) => {
    //         console.log('users/profilePhoto/photoURL 업데이트 err', err);
    //       });
    //   })
    //   .catch((error) => {
    //     console.log('Profile update An error occurred', error);
    //     // setError('프로필 사진 업데이트를 실패했습니다');
    //   });

    setEditProfile(false);
  };

  useEffect(() => {
    fetchUsersProfileData(
      (snapshot) => {
        setUserProfileData((prev) => ({
          ...prev,
          loading: false,
          data: snapshot.data()[params.uid || userObj.uid],
        }));
      },
      (err) => {
        setUserProfileData((prev) => ({
          ...prev,
          loading: false,
          error: err,
        }));
      }
    );

    return () => {
      fetchUsersProfileData();
    };
  }, [params.uid, userObj.uid]);

  if (!data) return <NotFoundPage message="존재하지 않는 사용자입니다" />;

  return !loading ? (
    <div className={darkMode ? 'profileContainer dark' : 'profileContainer'}>
      <div className="profileInfoContainer">
        {!editProfile ? (
          <div className="profileInfo">
            <div>
              <img
                alt="profile"
                className="profileImage"
                src={data?.photoURL || `${process.env.PUBLIC_URL}/default-profile.png`}
              />
              <div>
                <h2 className="dname">{data?.displayName}</h2>
                <p className="email">@{data?.email.split('@')[0]}</p>
              </div>
              <p className="aboutMe">aboutMe: {data?.aboutMe}</p>
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
            photoURL={userObj.photoURL}
            displayName={userObj.displayName}
            onSubmit={onSubmit}
            onCloseEdit={() => setEditProfile(false)}
          />
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Profile;
