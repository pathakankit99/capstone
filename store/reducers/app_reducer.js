const INITIAL_STATE = {
    loading: false,
    seats: []
  }
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'LOADING':
        return {
          ...state,
          loading: action.payload,
        }
      case 'SET_SEATS':
        return {
          ...state,
          seats: action.payload,
          loading: false,
        }
      default:
        return state
    }
  }
  