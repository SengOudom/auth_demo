import axios from "axios";

const tinitialState = {
  loading: false,
  data: [],
  error: "",
};

export const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS";
export const PRODUCTS_FAILURE = "PRODUCTS_FAILURE";
export const PRODUCTS_REQUEST = "PRODUCTS_REQUEST";

export const setProducts = (state = tinitialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCTS_SUCCESS:
      return {
        loading: false,
        data: payload,
      };
    case PRODUCTS_FAILURE:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const requestProducts = () => {
  return {
    type: PRODUCTS_REQUEST,
  };
};

export const failureProducts = (error) => {
  return {
    type: PRODUCTS_FAILURE,
    payload: error,
  };
};

export const successProducts = (data) => {
  return {
    type: PRODUCTS_SUCCESS,
    payload: data,
  };
};

export const getProducts = () => async (dispatch) => {
  dispatch(requestProducts());
  try {
    const res = await axios.get(window.env.PRODUCTS_API, {});
    dispatch(successProducts(res.data));
  } catch (error) {
    dispatch(failureProducts(error));
  }
};
