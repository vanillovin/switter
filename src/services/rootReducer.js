import { combineReducers } from 'redux';
import sweets from './sweets/reducers';

const rootReducer = combineReducers({
  sweets,
});

export default rootReducer;
