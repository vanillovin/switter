import { reducerUtils } from 'lib/asyncUtils';
import {
  GET_SWEET,
  GET_SWEETS,
  GET_SWEETS_ERROR,
  GET_SWEETS_SUCCESS,
  GET_SWEET_ERROR,
  GET_SWEET_SUCCESS,
  CREATE_SWEET,
  CLEAR_SWEETS,
  CLEAR_SWEET,
} from 'services/actions/sweetsAction';

const initialState = {
  sweets: {
    loading: false,
    data: null,
    error: null,
  },
  sweet: {
    loading: false,
    data: null,
    error: null,
  },
};

const sweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SWEETS:
      return {
        ...state,
        // 만약 여기에 기존 상태 값을 유지하고 싶다면 (state.sweets.data)
        sweets: reducerUtils.loading(),
      };
    case GET_SWEETS_SUCCESS:
      return {
        ...state,
        sweets: reducerUtils.success(action.payload),
      };
    case GET_SWEETS_ERROR:
      return {
        ...state,
        sweets: reducerUtils.error(action.payload),
      };
    case CLEAR_SWEETS:
      return {
        ...state,
        sweets: reducerUtils.initial(),
      };
    case GET_SWEET:
      return {
        ...state,
        sweet: reducerUtils.loading(),
      };
    case GET_SWEET_SUCCESS:
      return {
        ...state,
        sweet: reducerUtils.success(action.payload),
      };
    case GET_SWEET_ERROR:
      return {
        ...state,
        sweet: reducerUtils.error(action.payload),
      };
    case CLEAR_SWEET:
      return {
        ...state,
        sweet: reducerUtils.initial(),
      };
    case CREATE_SWEET:
      return state;
    default:
      return state;
  }
};

export default sweetsReducer;
