import { GIT_TOKEN } from "../actions/gitActions";
const initialState = {
  git_token: null,
};
const gitReducer = (state = initialState, action) => {
  switch (action.type) {
    case GIT_TOKEN:
      return {
        ...state,
        git_token: action.payload,
      };
    default:
      return state;
  }
};
export default gitReducer;
