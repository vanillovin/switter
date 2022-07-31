import { reducerUtils } from 'lib/asyncUtils';
import {
  GET_SWEETS,
  GET_SWEETS_ERROR,
  GET_SWEETS_SUCCESS,
  CREATE_SWEET,
  CLEAR_SWEETS,
  DELETE_SWEET,
  LIKE_SWEET,
  UPDATE_SWEET,
  CREATE_SWEET_COMMENT,
  DELETE_SWEET_COMMENT,
} from 'services/actions/sweetsAction';

const initialState = {
  sweets: {
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
    case CREATE_SWEET:
      return state;
    case DELETE_SWEET:
      return state;
    case LIKE_SWEET:
      return state;
    case UPDATE_SWEET:
      return state;
    case CREATE_SWEET_COMMENT:
      return state;
    case DELETE_SWEET_COMMENT:
      return state;
    default:
      return state;
  }
};

export default sweetsReducer;
