import {
  GET_USERS_PROFILE_PHOTO,
  GET_USERS_PROFILE_PHOTO_SUCCESS,
  UPDATE_USERS_PROFILE_PHOTO,
} from 'services/actions/usersAction';

const initialState = {
  profilePhoto: {
    loading: false,
    data: null,
    error: null,
  },
  profileData: {
    loading: false,
    data: null,
    error: null,
  },
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_PROFILE_PHOTO:
      return {
        ...state,
        profilePhoto: {
          ...state.profilePhoto,
          loading: true,
        },
      };
    case GET_USERS_PROFILE_PHOTO_SUCCESS:
      return {
        ...state,
        profilePhoto: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    // case UPDATE_USERS_PROFILE_PHOTO:
    //   return {
    //     ...state,
    //     profilePhoto: {
    //       ...state.profileData,
    //       data: {
    //         ...state.profilePhoto.data,
    //         [action.payload.uid]: action.payload.photoURL,
    //       },
    //     },
    //     profileData: {
    //       ...state.profileData.data,
    //       [action.payload.uid]: {
    //         ...state.profileData.data[action.payload.uid],
    //         displayName: action.payload.newDisplayName,
    //         photoURL: action.payload.photoURL,
    //       },
    //     },
    //   };

    default:
      return state;
  }
};

export default usersReducer;
