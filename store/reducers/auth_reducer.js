const INITIAL_STATE = {
  loading: false,
  user: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    case 'USERLOGIN':
      return {
        ...state,
        user: action.payload,
        loading: false,
      }
    case 'UPDATEUSER':
      return {
        ...state,
        user: action.payload,
      }
    case 'SIGINWITHFACEBOOK':
      return {
        ...state,
        user: action.payload,
      }
    case 'SIGINWITHGOOGLE':
      return {
        ...state,
        user: action.payload,
      }
    case 'USERSIGNUP':
      return {
        ...state,
        user: action.payload,
        loading: !state.loading,
      }
    case 'GETUSER':
      return {
        ...state,
        user: action.payload,
      }
    case 'FORGOTPASS':
      return {
        ...state,
        loading: !state.loading,
      }
    case 'LOGOUTUSER':
      return {
        ...state,
        user: null,
      }
    case 'PROFILE_PIC_UPLOADED':
      return {
        ...state,
        user: {
          ...state.user,
          profile_url: action.payload.url,
        },
      }
    default:
      return state
  }
}
