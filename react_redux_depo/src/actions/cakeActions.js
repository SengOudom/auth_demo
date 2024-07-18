export const PLUS_CAKE = 'PLUS_CAKE'
export const MIN_CAKE = 'MIN_CAKE'

const initialState = {
  numOfCakes: 10,
}

export const setCake = (state = initialState, action) => {
  switch (action.type) {
    case PLUS_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes + 1,
      }
    case MIN_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      }
    default:
      return state
  }
}

export const buyCake = (number) => {
  return {
    type: PLUS_CAKE,
    payload: number,
  }
}
export const deleteCake = (number) => {
  return {
    type: MIN_CAKE,
    payload: number,
  }
}
