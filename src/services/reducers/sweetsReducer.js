const initialState = [];

const sweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SWEETS':
      const sweets = action.payload;
      return sweets;
    default:
      return state;
  }
};

export default sweetsReducer;
