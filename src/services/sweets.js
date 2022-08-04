import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
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

/*
export const createGroceryList = (userName) => {
  const groceriesColRef = collection(db, 'groceryLists');
  return addDoc(groceriesColRef, {
    created: serverTimestamp(),
    users: [{ name: userName }],
  });
};

export const deleteSweet = (id, attachmentUrl) => (dispatch, getState) => {
  const sweetData = getState().sweetsReducer.sweets.data.find((sweet) => sweet.id === id);
  if (!sweetData) return;
  if (attachmentUrl !== '') {
    deleteObject(ref(storageService, attachmentUrl));
  }
  deleteDoc(doc(dbService, `sweets/${id}`))
    .then((res) => {
      dispatch(deleteSweetAction());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const likeSweet = (sweetObj, liked, uid) => (dispatch) => {
  if (!liked) {
    updateDoc(doc(dbService, `sweets/${sweetObj.id}`), {
      likes: [...sweetObj.likes, uid],
    })
      .then((res) => {
        dispatch(likeSweetAction());
      })
      .catch((err) => {
        console.log('likeSweet err', err);
      });
  } else {
    updateDoc(doc(dbService, `sweets/${sweetObj.id}`), {
      likes: sweetObj.likes.filter((user) => user !== uid),
    })
      .then((res) => {
        dispatch(likeSweetAction());
      })
      .catch((err) => {
        console.log('likeSweet err', err);
      });
  }
};

export const updateSweet = (id, text) => (dispatch, getState) => {
  const sweetData = getState().sweetsReducer.sweets.data.find((sweet) => sweet.id === id);
  if (!sweetData.id) return;
  updateDoc(doc(dbService, `sweets/${id}`), { text })
    .then((res) => {
      dispatch(updateSweetAction());
    })
    .catch((err) => {
      console.log('err', err);
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
