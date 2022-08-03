import type from './typeActions';

const sweets = (
  state = {
    loading: false,
    data: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case type.FETCH_SWEETS_STARTED:
      return { ...state, loading: true };
    case type.FETCH_SWEETS_FULFILLED:
      return { ...state, ...action.payload };
    case type.FETCH_SWEETS_REJECTED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default sweets;
