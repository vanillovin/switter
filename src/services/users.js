import { doc, onSnapshot } from 'firebase/firestore';
import { dbService } from 'services/firebase/fbase';

export const fetchUsersProfilePhoto = (snapshot, error) => {
  return onSnapshot(doc(dbService, 'users', 'profilePhoto'), snapshot, error);
};

// export const updateUserProfilePhoto = (uid, newDisplayName, photoURL) => {
//   return (dispatch) => {
//     try {
//       const usersRef = collection(dbService, 'users');
//       setDoc(doc(usersRef, 'profilePhoto'), {
//         [uid]: {
//           displayName: newDisplayName,
//           photoURL,
//         },
//       })
//         .then((res) => {
//           console.log('users/profilePhoto 업데이트 res', res);
//           dispatch({
//             type: UPDATE_USERS_PROFILE_PHOTO,
//             payload: { uid, newDisplayName, photoURL },
//           });
//         })
//         .catch((err) => {
//           console.log('users/profilePhoto 업데이트 err', err);
//         });
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// // storage 파일 업로드 & 다운
// export const imgAjjigu = () => {};

// export const updateUsersProfilePhoto = (uid, attachmentUrl) => (dispatch, getState) => {
//   const usersRef = collection(dbService, 'users');
//   setDoc(doc(usersRef, 'profilePhoto'), {
//     [uid]: attachmentUrl,
//   })
//     .then((res) => {
//       console.log('users/profilePhoto 업데이트 res', res);
//     })
//     .catch((err) => {
//       console.log('users/profilePhoto 업데이트 err', err);
//     });
// };
