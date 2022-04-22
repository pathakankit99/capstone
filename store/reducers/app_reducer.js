const INITIAL_STATE = {
  loading: false,
  cart: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
