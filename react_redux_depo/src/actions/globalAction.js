const initialState = {
  auth: {},
  loading: false,
};

export const SET_GLOBAL = "SET_GLOBAL";

export const setGlobal = (payload) => {
  return {
    type: SET_GLOBAL,
    payload,
  };
};

export const setAuth = (state = initialState, action) => {
  switch (action.type) {
    case SET_GLOBAL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
