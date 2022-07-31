import {
  GET_SWEET,
  GET_SWEETS,
  GET_SWEETS_ERROR,
  GET_SWEETS_SUCCESS,
  GET_SWEET_ERROR,
  GET_SWEET_SUCCESS,
  CREATE_SWEET,
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

export const reducerUtils = {
  initial: (data = null) => ({
    loading: false,
    data,
    error: null,
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  success: (data) => ({
    loading: false,
    data,
    error: null,
  }),
  error: (error) => ({
    loading: false,
    data: null,
    error,
  }),
};

const sweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SWEETS:
      return {
        ...state,
        sweets: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_SWEETS_SUCCESS:
      return {
        ...state,
        sweets: {
          loading: false,
          data: action.payload.sweets,
          error: null,
        },
      };
    case GET_SWEETS_ERROR:
      return {
        ...state,
        sweets: {
          loading: false,
          data: null,
          error: action.payload.error,
        },
      };
    case GET_SWEET:
      return {
        ...state,
        sweet: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_SWEET_SUCCESS:
      return {
        ...state,
        sweet: {
          loading: false,
          data: action.payload.sweet,
          error: null,
        },
      };
    case GET_SWEET_ERROR:
      return {
        ...state,
        sweet: {
          loading: false,
          data: null,
          error: action.payload.error,
        },
      };
    case CREATE_SWEET:
      // return {
      //   ...state,
      //   sweets: {
      //     ...state.sweets,
      //     data: [...state.sweets.data, action.payload.sweet],
      //   },
      // };
      return state;
    default:
      return state;
  }
};

export default sweetsReducer;
