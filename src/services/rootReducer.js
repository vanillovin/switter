import { combineReducers } from 'redux';
import sweetsReducer from './reducers/sweetsReducer';

const rootReducer = combineReducers({
  sweetsReducer,
});

export default rootReducer;
