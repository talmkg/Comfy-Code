import {
  FETCH_ALL_USERS,
  FETCH_GROUPS,
  LOADING,
  TOKEN,
  LOGIN,
  SAVE_USERS_POSTS,
  FETCH_NOTIFICATIONS,
  FETCH_HASHTAGS,
} from "../actions";

const initialState = {
  groups: [],
  token: [],
  AllUsers: [],
  loading: false,
  LoggedInUser: [],
  usersGroups: [],
  notifications: [],
  hashtags: [],
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case SAVE_USERS_POSTS:
      return {
        ...state,
        usersGroups: action.payload,
      };
    case FETCH_HASHTAGS:
      return {
        ...state,
        hashtags: action.payload,
      };
    case FETCH_GROUPS:
      return {
        ...state,
        groups: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        LoggedInUser: action.payload,
      };

    case FETCH_ALL_USERS:
      return {
        ...state,
        AllUsers: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default mainReducer;
