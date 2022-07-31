import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { dbService } from 'services/firebase/fbase';

// Action
export const GET_SWEETS = 'GET_SWEETS';
export const GET_SWEETS_SUCCESS = 'GET_SWEETS_SUCCESS';
export const GET_SWEETS_ERROR = 'GET_SWEETS_ERROR';
export const GET_SWEET = 'GET_SWEET';
export const GET_SWEET_SUCCESS = 'GET_SWEET_SUCCESS';
export const GET_SWEET_ERROR = 'GET_SWEET_ERROR';
export const CREATE_SWEET = 'CREATE_SWEET';

// Action Creators
export const getSweetsAction = (type, payload) => {
  return { type: GET_SWEETS, payload };
};
export const getSweetAction = (sweet) => {
  return { type: GET_SWEET, payload: { sweet } };
};
export const createSweetAction = () => {
  return { type: CREATE_SWEET };
};

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
        dispatch({ type: GET_SWEETS_SUCCESS, payload: { sweets } });
      });
    } catch (e) {
      console.log('getSweetsData error', e);
      dispatch({
        type: GET_SWEETS_ERROR,
        payload: { error: e },
      });
    }
  };
};

export const getSweetsById = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_SWEET });
    try {
      const q = query(collection(getFirestore(), 'sweets'), orderBy('createdAt', 'desc'));
      onSnapshot(q, (snapshot) => {
        const sweet = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            likes: doc.data().likes,
            comments: doc.data().comments,
            ...doc.data(),
          }))
          .filter((sweet) => sweet.id === id)[0];
        dispatch({ type: GET_SWEET_SUCCESS, payload: { sweet } });
      });
    } catch (e) {
      console.log('getSweetsData error', e);
      dispatch({
        type: GET_SWEET_ERROR,
        payload: { error: e },
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
