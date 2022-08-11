import { updateProfile } from 'firebase/auth';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { authService, dbService } from 'services/firebase/fbase';

export const updateCurUserProfile = (userObj) => {
  return updateProfile(authService.currentUser, userObj);
};

export const updateAllUsersProfilePhoto = (obj) => {
  const usersRef = collection(dbService, 'users');
  return updateDoc(doc(usersRef, 'profilePhoto'), obj);
};

export const fetchUsersProfilePhoto = (snapshot, error) => {
  return onSnapshot(doc(dbService, 'users', 'profilePhoto'), snapshot, error);
};

export const updateAllUsersProfileData = (obj) => {
  const usersRef = collection(dbService, 'users');
  return updateDoc(doc(usersRef, 'profileData'), obj);
};

export const fetchUsersProfileData = (snapshot, error) => {
  return onSnapshot(doc(dbService, 'users', 'profileData'), snapshot, error);
};

export const updateUsersProfilePhoto = (uid, url) => {
  const usersRef = collection(dbService, 'users');
  return updateDoc(doc(usersRef, 'profilePhoto'), {
    [uid]: url,
  });
};

export const updateUsersProfileData = (uid, userObj) => {
  const usersRef = collection(dbService, 'users');
  return updateDoc(doc(usersRef, 'profileData'), {
    [uid]: userObj,
  });
};