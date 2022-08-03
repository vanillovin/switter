import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { dbService, storageService } from 'services/firebase/fbase';
import type from './typeActions';

export const fetchSweets = () => (dispatch) => {
  console.log('into fetch sweets');
  dispatch({ type: type.FETCH_SWEETS_STARTED });
  try {
    const q = query(collection(getFirestore(), 'sweets'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      const sweets = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          likes: doc.data().likes,
          comments: doc.data().comments,
          ...doc.data(),
        };
      });
      dispatch({ type: type.FETCH_SWEETS_FULFILLED, payload: { data: sweets } });
    });
  } catch (e) {
    console.log('getSweetsData error', e);
    dispatch({ type: type.FETCH_SWEETS_REJECTED, payload: { error: e } });
  }
};

export const fetchSweet = (id) => (dispatch) => {};

export const clearSweets = () => ({ type: type.CLEAR_SWEETS });

/*
export const createSweet = (sweetObj) => {
  return function (dispatch) {
    addDoc(collection(dbService, 'sweets'), sweetObj)
      .then((docRef) => {
        dispatch({ type: CREATE_SWEET });
      })
      .catch((err) => {
        console.log('createSweet err', err);
      });
  };
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
