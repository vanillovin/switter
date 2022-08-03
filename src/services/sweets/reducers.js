import type from './typeActions';

const sweets = (
  state = {
    loading: false,
    data: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case type.FETCH_SWEETS_STARTED:
      return { ...state, loading: true };
    case type.FETCH_SWEETS_FULFILLED:
      return { ...state, loading: false, ...action.payload };
    case type.FETCH_SWEETS_REJECTED:
      return { ...state, loading: false, ...action.payload };
    case type.CLEAR_SWEETS:
      return { ...state, data: null };
    default:
      return state;
  }
};

export default sweets;
