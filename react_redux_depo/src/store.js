import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from "redux-thunk";
// import logger from "redux-logger";

// watch console for rootReducer => //^applyMiddleware(logger)

const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(logger, thunk))
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
