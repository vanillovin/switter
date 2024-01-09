import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  QuerySnapshot,
  FirestoreError,
  DocumentSnapshot,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';

import { dbService, storageService } from './firebaseConfig';
import type { Comment, Like, SweetT } from '../../types/Sweet';

export const fetchSweets = (
  snapshot: (snapshot: QuerySnapshot) => void,
  error: (error: FirestoreError) => void
) => {
  const q = query(collection(dbService, 'sweets'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, snapshot, error);
};

export const fetchSweet = (
  id: string,
  snapshot: (snapshot: DocumentSnapshot) => void,
  error: (error: FirestoreError) => void
) => {
  const docRef = doc(dbService, `sweets/${id}`);
  return onSnapshot(docRef, snapshot, error);
};

export function toggleLikeSweet(isLiked: boolean, sweetId: string, data: Like) {
  // console.log('toggleLikeSweet isLiked', isLiked, sweetId, data);
  if (!isLiked) {
    return updateDoc(doc(dbService, `sweets/${sweetId}`), {
      likes: arrayUnion(data),
    });
  } else {
    return updateDoc(doc(dbService, `sweets/${sweetId}`), {
      likes: arrayRemove(data),
    });
  }
}

export const createSweet = (data: SweetT) => {
  return addDoc(collection(dbService, 'sweets'), data);
};

export const addSweetComment = (sweetId: string, data: Comment) => {
  return updateDoc(doc(dbService, `sweets/${sweetId}`), {
    comments: arrayUnion(data),
  });
};

export const deleteSweetComment = (sweetId: string, comments: Comment[]) => {
  return updateDoc(doc(dbService, `sweets/${sweetId}`), {
    comments,
  });
};

export const getUploadImageURL = async (uid: string, attachment: string) => {
  try {
    const fileRef = ref(storageService, `${uid}/${uuidv4()}`);
    const uploadFile = await uploadString(fileRef, attachment, 'data_url');
    return getDownloadURL(uploadFile.ref);
  } catch (err) {
    console.log('imageFileUploadAndDownload err', err);
  }
};

export const getProfileImageURL = async (uid: string, fileDataUrl: string) => {
  try {
    // 1. 파일이 업로드되서 저장될 버킷 내부의 래퍼런스 경로를 생성
    const fileReference = ref(storageService, `${uid}/profileImage`);
    // 2. 파일 데이터를 버킷 내부의 래퍼런스 경로로 전달 (파일을 버킷에 업로드)
    const uploadTask = await uploadString(fileReference, fileDataUrl, 'data_url');
    // 3. 버킷 내부의 래퍼런스에 있는 파일에 대한 DownloadURL을 받음
    return await getDownloadURL(uploadTask.ref);
  } catch (err) {
    console.log('sweets - profileImageFileUploadAndDownload err', err);
  }
};

export const deleteStorageFile = (fileUrl: string) => {
  return deleteObject(ref(storageService, fileUrl));
};

export const deleteSweet = (sweetId: string) => {
  return deleteDoc(doc(dbService, `sweets/${sweetId}`));
};

export const updateSweetContent = (sweetId: string, content: string) => {
  return updateDoc(doc(dbService, `sweets/${sweetId}`), { content });
};

export const updateSweetNestedComment = (sweetId: string, comments: Comment[]) => {
  return updateDoc(doc(dbService, `sweets/${sweetId}`), {
    comments,
  });
};

/*
export const createGroceryList = (userName) => {
  const groceriesColRef = collection(db, 'groceryLists');
  return addDoc(groceriesColRef, {
    created: serverTimestamp(),
    users: [{ name: userName }],
  });
};
 */
