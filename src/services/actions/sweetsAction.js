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

// Action
export const GET_SWEETS = 'GET_SWEETS';
export const GET_SWEETS_SUCCESS = 'GET_SWEETS_SUCCESS';
export const GET_SWEETS_ERROR = 'GET_SWEETS_ERROR';
export const CLEAR_SWEETS = 'CLEAR_SWEETS';
export const CLEAR_SWEET = 'CLEAR_SWEET';
export const CREATE_SWEET = 'CREATE_SWEET';
export const DELETE_SWEET = 'DELETE_SWEET';
export const LIKE_SWEET = 'LIKE_SWEET';
export const UPDATE_SWEET = 'UPDATE_SWEET';
export const CREATE_SWEET_COMMENT = 'CREATE_SWEET_COMMENT';
export const DELETE_SWEET_COMMENT = 'DELETE_SWEET_COMMENT';

// Action Creators
export const clearSweets = () => ({ type: CLEAR_SWEETS });
export const clearSweet = () => ({ type: CLEAR_SWEET });
export const getSweetsAction = (type, payload) => {
  return { type: GET_SWEETS, payload };
};
export const createSweetAction = () => ({ type: CREATE_SWEET });
export const deleteSweetAction = () => ({ type: DELETE_SWEET });
export const likeSweetAction = () => ({ type: LIKE_SWEET });
export const updateSweetAction = () => ({ type: UPDATE_SWEET });
export const createSweetCommentAction = () => ({ type: CREATE_SWEET_COMMENT });
export const deleteSweetCommentAction = () => ({ type: DELETE_SWEET_COMMENT });

export const getSweets = () => {
  return (dispatch) => {
    dispatch({ type: GET_SWEETS });
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
        dispatch({ type: GET_SWEETS_SUCCESS, payload: sweets });
      });
    } catch (e) {
      console.log('getSweetsData error', e);
      dispatch({
        type: GET_SWEETS_ERROR,
        payload: e,
      });
    }
  };
};

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
