import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { dbService, storageService } from './firebase/fbase';
import { v4 as uuidv4 } from 'uuid';

export const fetchSweets = (snapshot, error) => {
  // console.log('into fetch sweets');
  return onSnapshot(
    query(collection(getFirestore(), 'sweets'), orderBy('createdAt', 'desc')),
    snapshot,
    error
  );
};

export const fetchSweet = (id, snapshot, error) => {
  return onSnapshot(doc(dbService, `sweets/${id}`), snapshot, error);
};

export const createSweet = (sweetObj) => {
  return addDoc(collection(dbService, 'sweets'), sweetObj);
};

export const imageFileUploadAndDownload = async (uid, attachment) => {
  try {
    const fileRef = ref(storageService, `${uid}/${uuidv4()}`);
    const uploadFile = await uploadString(fileRef, attachment, 'data_url');
    return getDownloadURL(uploadFile.ref);
  } catch (err) {
    console.log('imageFileUploadAndDownload err', err);
  }
};

export const profileImageFileUploadAndDownload = async (uid, fileDataUrl) => {
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

export const deleteStorageFile = (fileUrl) => {
  return deleteObject(ref(storageService, fileUrl));
};

export const deleteSweet = (sid) => {
  return deleteDoc(doc(dbService, `sweets/${sid}`));
};

export const likeSweet = (liked, sid, uid) => {
  if (!liked) {
    return updateDoc(doc(dbService, `sweets/${sid}`), {
      likes: arrayUnion(uid),
    });
  } else {
    return updateDoc(doc(dbService, `sweets/${sid}`), {
      likes: arrayRemove(uid),
    });
  }
};

export const updateSweet = (sid, text) => {
  return updateDoc(doc(dbService, `sweets/${sid}`), { text });
};

export const addSweetComment = (sid, commentObj) => {
  return updateDoc(doc(dbService, `sweets/${sid}`), {
    comments: arrayUnion(commentObj),
  });
};

export const updateSweetNestedComment = (sid, comments) => {
  return updateDoc(doc(dbService, `sweets/${sid}`), {
    comments,
  });
};

export const deleteSweetComment = (sweetObj, cid) => {
  return updateDoc(doc(dbService, `sweets/${sweetObj.id}`), {
    comments: sweetObj.comments.filter((comment) => comment.createdAt !== cid),
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
