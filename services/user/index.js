import userEndpoints from '../apiEndPoints/user'
import { callApi } from '../../utils/apiUtils'

export const logInUserService = ({ body }) =>
  callApi({ uriEndPoint: userEndpoints.logInUser.v1, body })

export const signUpService = ({ body }) =>
  callApi({ uriEndPoint: userEndpoints.signUp.v1, body })

export const updateAccountInformationService = (body) =>
  callApi({
    uriEndPoint: userEndpoints.updateAccountInformationApiEndPoints.v1,
    body,
  })

export const updateAccountPasswordService = ({ body }) =>
  callApi({
    uriEndPoint: userEndpoints.updateAccountPasswordApiEndPoints.v1,
    body,
  })

export const getRefeTokenService = ({ pathParams }) => {
  return callApi({
    uriEndPoint: userEndpoints.getRefeToken.v1,
    pathParams,
  })
    .then((res) => res)
    .catch(() => {})
}
export const forgetUserPasswordService = ({ body }) =>
  callApi({
    body,
    uriEndPoint: userEndpoints.forgotPassword.v1,
  })
export const resetAccountPasswordService = ({ body }) =>
  callApi({
    uriEndPoint: userEndpoints.resetAccountPasswordApiEndPoints.v1,
    body,
  })

export const currentUser = () =>
  callApi({ uriEndPoint: userEndpoints.currentUser.v1 })
