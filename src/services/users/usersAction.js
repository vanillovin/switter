import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { dbService } from 'services/firebase/fbase';

/* Action */
export const GET_USERS_PROFILE_PHOTO = 'GET_USERS_PROFILE_PHOTO';
export const GET_USERS_PROFILE_PHOTO_SUCCESS = 'GET_USERS_PROFILE_PHOTO_SUCCESS';
export const GET_USERS_PROFILE_PHOTO_ERROR = 'GET_USERS_PROFILE_PHOTO_ERROR';
export const UPDATE_USERS_PROFILE_PHOTO = 'UPDATE_USERS_PROFILE_PHOTO';
export const GET_USERS_PROFILE_DATA = 'GET_USERS_PROFILE_DATA';
export const GET_USERS_PROFILE_DATA_SUCCESS = 'GET_USERS_PROFILE_DATA_SUCCESS';
export const GET_USERS_PROFILE_DATA_ERROR = 'GET_USERS_PROFILE_DATA_ERROR';

/* Action Creators */

/* */
export const getUsersProfilePhoto = () => {
  return (dispatch) => {
    dispatch({ type: GET_USERS_PROFILE_PHOTO });
    try {
      const docRef = collection(dbService, 'users');
      getDoc(doc(docRef, 'profilePhoto')).then((docSnap) => {
        if (docSnap.exists()) {
          // console.log('users/profile Photo Document data:', docSnap.data());
          dispatch({ type: GET_USERS_PROFILE_PHOTO_SUCCESS, payload: docSnap.data() });
        } else {
          // doc.data() will be undefined in this case
          console.log('No such users/profilePhoto document!');
        }
      });
    } catch (e) {
      console.log('getUsers error', e);
      dispatch({ type: GET_USERS_PROFILE_PHOTO_ERROR, payload: e });
    }
  };
};

export const updateUserProfilePhoto = (uid, newDisplayName, photoURL) => {
  return (dispatch) => {
    try {
      const usersRef = collection(dbService, 'users');
      setDoc(doc(usersRef, 'profilePhoto'), {
        [uid]: {
          displayName: newDisplayName,
          photoURL,
        },
      })
        .then((res) => {
          console.log('users/profilePhoto 업데이트 res', res);
          dispatch({
            type: UPDATE_USERS_PROFILE_PHOTO,
            payload: { uid, newDisplayName, photoURL },
          });
        })
        .catch((err) => {
          console.log('users/profilePhoto 업데이트 err', err);
        });
    } catch (e) {
      console.log(e);
    }
  };
};

// storage 파일 업로드 & 다운
export const imgAjjigu = () => {};

export const updateUsersProfilePhoto = (uid, attachmentUrl) => (dispatch, getState) => {
  const usersRef = collection(dbService, 'users');
  setDoc(doc(usersRef, 'profilePhoto'), {
    [uid]: attachmentUrl,
  })
    .then((res) => {
      console.log('users/profilePhoto 업데이트 res', res);
    })
    .catch((err) => {
      console.log('users/profilePhoto 업데이트 err', err);
    });
};
