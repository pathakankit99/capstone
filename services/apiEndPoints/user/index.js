import defaults from '../methods'

const userEndpoints = {
  currentUser: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/currentUser',
    },
  },
  logInUser: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/user/login',
    },
  },
  signUp: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/user/register',
    },
  },
  updateAccountInformationApiEndPoints: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/user/update',
    },
  },
  updateAccountPasswordApiEndPoints: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/user/update-password',
    },
  },
  getRefeToken: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/:id/refreshToken',
    },
  },
  forgotPassword: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/user/forgotpassword',
    },
  },
  resetAccountPasswordApiEndPoints: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/user/resetpassword',
    },
  },
}

export default userEndpoints
