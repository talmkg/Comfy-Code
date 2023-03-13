import { LOADING_RESULT, LOADING_PROGRESS } from "../actions/loaderActions";
const initialState = {
  result: false,
  loadingProgress: null,
};
const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_RESULT:
      return {
        ...state,
        result: action.payload,
      };
    case LOADING_PROGRESS:
      return {
        ...state,
        loadingProgress: action.payload,
      };
    default:
      return state;
  }
};
export default loaderReducer;
