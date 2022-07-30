import { reducerUtils, createPromiseThunk, handleAsyncActions } from 'lib/asyncUtils';
import * as sweetsApi from '../api/sweets';

const GET_SWEETS = 'GET_SWEETS';
const GET_SWEETS_SUCCESS = 'GET_SWEETS_SUCCESS';
const GET_SWEETS_ERROR = 'GET_SWEETS_ERROR';

const GET_SWEET = 'GET_SWEET';
const GET_SWEET_SUCCESS = 'GET_SWEET_SUCCESS';
const GET_SWEET_ERROR = 'GET_SWEET_ERROR';

export const getSweets = createPromiseThunk(GET_SWEETS, sweetsApi.getSweets);
export const getSweet = createPromiseThunk(GET_SWEET, sweetsApi.getSweetById);

const initialState = {
  sweets: reducerUtils.initial(),
  sweet: reducerUtils.initial(),
};

const getSweetsReducer = handleAsyncActions(GET_SWEETS, 'sweets');
const getSweetReducer = handleAsyncActions(GET_SWEET, 'sweet');

// reducer
export default function sweets(state = initialState, action) {
  switch (action.type) {
    case GET_SWEETS:
    case GET_SWEETS_SUCCESS:
    case GET_SWEETS_ERROR:
      return getSweetsReducer(state, action);
    case GET_SWEET:
    case GET_SWEET_SUCCESS:
    case GET_SWEET_ERROR:
      return getSweetReducer(state, action);
    default:
      return state;
  }
}
