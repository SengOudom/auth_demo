import { combineReducers } from "redux";
import { setCake } from "../actions/cakeActions";
import { setProducts } from "../actions/productActions";
import { setAuth } from "../actions/globalAction";

const rootReducer = combineReducers({
  cake: setCake,
  products: setProducts,
  global: setAuth,
});

export default rootReducer;
