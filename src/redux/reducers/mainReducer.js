import {
  FETCH_ALL_USERS,
  FETCH_FEED,
  LOADING,
  TOKEN,
  LOGIN,
  SAVE_USERS_GROUPS,
  FETCH_NOTIFICATIONS,
  FETCH_HASHTAGS,
  CONNECTED_TO_SOCKET,
  GENERAL_CHAT_HISTORY,
  SOCKET_USERS_LIST,
  FETCH_BADGES,
  SAVE_MY_POSTS,
} from "../actions";
import { SAVE_MY_CHATS } from "../actions/loaderActions";
const initialState = {
  feed: [],
  token: [],
  AllUsers: [],
  loading: false,
  LoggedInUser: [],
  usersGroups: [],
  usersPosts: [],
  notifications: [],
  hashtags: [],
  socket_connected: false,
  general_chat_history: [],
  socket_users_list: [],
  badges: [],
  chats: [],
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case CONNECTED_TO_SOCKET:
      return {
        ...state,
        socket_connected: action.payload,
      };
    case GENERAL_CHAT_HISTORY:
      return {
        ...state,
        general_chat_history: action.payload,
      };
    case SAVE_MY_POSTS:
      return {
        ...state,
        usersPosts: action.payload,
      };
    case SOCKET_USERS_LIST:
      return {
        ...state,
        socket_users_list: action.payload,
      };
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case SAVE_USERS_GROUPS:
      return {
        ...state,
        usersGroups: action.payload,
      };
    case FETCH_HASHTAGS:
      return {
        ...state,
        hashtags: action.payload,
      };
    case FETCH_FEED:
      return {
        ...state,
        feed: action.payload,
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
    case FETCH_BADGES:
      return {
        ...state,
        badges: action.payload,
      };
    case SAVE_MY_CHATS:
      return {
        ...state,
        chats: action.payload,
      };

    default:
      return state;
  }
};

export default mainReducer;
