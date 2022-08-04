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
    console.log('imageFileUploadAndDown err', err);
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

/*
export const createGroceryList = (userName) => {
  const groceriesColRef = collection(db, 'groceryLists');
  return addDoc(groceriesColRef, {
    created: serverTimestamp(),
    users: [{ name: userName }],
  });
};

export const createSweetComment = (sweetObj, userObj, comment) => (dispatch) => {
  updateDoc(doc(dbService, `sweets/${sweetObj.id}`), {
    comments: [
      ...sweetObj.comments,
      {
        uid: userObj.uid,
        createdAt: Date.now(),
        name: userObj.displayName,
        text: comment,
        likes: [],
        nestedComments: [],
        //   {
        //     uid: userObj.uid,
        //     createdAt: Date.now(),
        //     name: userObj.displayName,
        //     text,
        //   },
      },
    ],
  })
    .then((res) => {
      dispatch(createSweetCommentAction());
    })
    .catch((err) => {
      console.log('createSweetComment error', err);
    });
};

export const deleteSweetComment = (sweetObj, cid) => (dispatch) => {
  updateDoc(doc(dbService, `sweets/${sweetObj.id}`), {
    comments: sweetObj.comments.filter((comment) => comment.createdAt !== cid),
  })
    .then((res) => {
      dispatch(deleteSweetCommentAction());
    })
    .catch((err) => {
      console.log('deleteSweetComment error', err);
    });
};
 */
