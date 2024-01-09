import { updateProfile } from 'firebase/auth';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { User } from '../../types/User';
import { authService, dbService } from './firebaseConfig';
import { Profile, TimelineSweet } from '../../types/Profile';

// 현재 사용자 프로필 업데이트
export const updateCurUserProfile = (user: User) => {
  return updateProfile(authService.currentUser!, user);
};

// 사용자 프로필 사진 가져오기
// export const fetchUsersProfilePhoto = (
//   snapshot: (snapshot: DocumentSnapshot) => void,
//   error: (error: FirebaseError) => void
// ) => {
//   return onSnapshot(doc(dbService, 'users', 'profilePhoto'), snapshot, error);
// };

// 사용자 프로필 데이터 가져오기
export const fetchProfileData = async (uid: string) => {
  try {
    const docRef = doc(dbService, 'profile', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Profile;
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error getting document:', error);
  }
};

export const setProfileData = async (uid: string, data: Profile) => {
  const profileRef = doc(dbService, 'profile', uid);

  try {
    await setDoc(profileRef, data, { merge: true });
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const updateProfileData = (uid: string, data: Profile) => {
  const profileRef = collection(dbService, 'profile');
  return updateDoc(doc(profileRef, uid), data);
};

export const updateProfileInfo = (
  uid: string,
  infoData: { profileImageURL: string; displayName: string; about: string }
) => {
  fetchProfileData(uid).then((data) => {
    updateProfileData(uid, {
      ...data,
      ...infoData,
    } as Profile);
  });
};

export const updateProfileTimeline = (
  type: 'sweets' | 'likes' | 'comments',
  uid: string,
  action: 'create' | 'delete' | 'update',
  sweet: TimelineSweet
) => {
  fetchProfileData(uid).then((data) => {
    let newTimelineSweet;

    if (action === 'create') {
      newTimelineSweet = [...(data?.[type] ?? []), sweet];
    } else if (action === 'delete') {
      // console.log(data?.[type]);
      newTimelineSweet = (data?.[type] ?? []).filter((old) => {
        if (type === 'sweets') return old.sweetId !== sweet.id;
        return old.id !== sweet.id;
      });
      // console.log(newTimelineSweet);
    } else if (action === 'update') {
      newTimelineSweet = (data?.[type] ?? []).map((old) =>
        old.id === sweet.id ? { ...old, content: sweet.content } : old
      );
    }

    updateProfileField(uid, type, newTimelineSweet as TimelineSweet[]);
  });
};

export const updateProfileField = async <K extends keyof Profile>(
  uid: string,
  field: K,
  value: Profile[K]
) => {
  const docRef = doc(dbService, 'profile', uid);
  await updateDoc(docRef, {
    [field]: value,
  });
};

// export const updateProfilePhoto = (uid:string, url: string) => {
//   const usersRef = collection(dbService, 'users');
//   return updateDoc(doc(usersRef, 'profilePhoto'), {
//     [uid]: url,
//   });
// };

// export const updateAllUsersProfilePhoto = (obj) => {
//   const usersRef = collection(dbService, 'users');
//   return updateDoc(doc(usersRef, 'profilePhoto'), obj);
// };

// export const updateAllUsersProfileData = (obj) => {
//   const usersRef = collection(dbService, 'users');
//   return updateDoc(doc(usersRef, 'profileData'), obj);
// };
