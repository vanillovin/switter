// create root reducer
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
// import sweets from './sweets';

const rootReducer = combineReducers({ firebase: firebaseReducer });

export default rootReducer;
