import mainReducer from "./mainReducer";
import loaderReducer from "./loaderReducer";
import gitReducer from "./gitReducer";

export default function rootReducer(state = {}, action) {
  // always return a new object for the root state
  return {
    // the value of `state.todos` is whatever the todos reducer returns
    main: mainReducer(state.main, action),
    // For both reducers, we only pass in their slice of the state
    loader: loaderReducer(state.loader, action),
    git: gitReducer(state.git, action),
  };
}
