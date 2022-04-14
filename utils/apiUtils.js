/**
 * Utility methods to be used for invoking API methods
 */
import Axios from 'axios'
import queryString from 'querystring'
import { parse } from 'qs'
export const hostname = () => {
  let hostUrl = '/api'
  return hostUrl
}

const hostUrl = hostname()
export const makeUrl = ({ uri = '', pathParams, query, version }, host) =>
  `${host || hostUrl}${version}${uri
    .split('/')
    .map((param) =>
      param.charAt(0) === ':' ? encodeURI(pathParams[param.slice(1)]) : param
    )
    .join('/')}${query ? `?${queryString.stringify(query)}` : ''}`
export const getDefaultHeaders = () => {
  if (localStorage.accessToken) {
    return {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    }
  }
  return { 'Content-Type': 'application/json' }
}
function getPageQuery() {
  return parse(window.location.href && window.location.href.split('?')[1])
}
/**
 * Returns true if the input apiResponse has errors.
 * @param {*} apiResponse
 */
export const hasErrors = (apiResponse) => {
  const { error } = apiResponse
  if (error) {
    return true
  }
  return false
}
/**
 * Generic utility method that should be called when invoking any REST API
 *
 * This function streamlines the functionality to make api calls,
 * and carries easy management for controlling versions of the apis
 *
 * @since 1.0.0
 *
 * @todo all the incoming values for the APIParamaters.pathParams and APIParamaters.query
 * should be uri encoded.
 * @alias callAxios
 * @memberof apiUtils
 * @param {Object} APIParamaters - Set of objects required to make the api call.
 * @param {Object} APIParamaters.uriEndPoint - Endpoint object as described in apiEndPoints.js.
 * @param {String} APIParamaters.uriEndPoint.api - Path to your endpoint
 * @param {String} APIParamaters.uriEndPoint.method - POST/GET/PUT/DELETE etc.
 * @param {String} APIParamaters.uriEndPoint.version - Versioning of your api
 * @param {Object} APIParamaters.uriEndPoint.headerProps - Object of headers you want to pass.
 * @param {Object} APIParamaters.pathParams - Path parameters. Example :id in the path,
 * then pathParams object will be {id:value}.
 * @param {Object} APIParamaters.query - GET/POST/PUT/DELETE Endpoint.
 * @param {Object} APIParamaters.body - Body of the request.
 * @returns {Promise<object>} Body Data from the server.
 */
const callAxios = ({ uriEndPoint, pathParams, query, body, apiHostUrl }) =>
  Axios({
    method: uriEndPoint.method,
    url: makeUrl({ ...uriEndPoint, pathParams, query }, apiHostUrl),
    headers: {
      ...getDefaultHeaders(),
      ...uriEndPoint.headerProps,
    },
    data: body || {},
  })
/**
 * Extract the error messages from a failed API response.
 * @param {} apiResponse
 */
// const extractErrors = () => {};
/**
 * Generic utility method that should be called when invoking any REST API
 *
 * This function streamlines the functionality to make api calls,
 * and carries easy management for controlling versions of the apis
 *
 * @since 2.0.0
 *
 * @todo all the incoming values for the APIParamaters.pathParams and APIParamaters.query
 * should be uri encoded.
 * @alias callApi
 * @memberof apiUtils
 * @param {Object} APIParamaters - Set of objects required to make the api call.
 * @param {Object} APIParamaters.uriEndPoint - Endpoint object as described in apiEndPoints.js.
 * @param {String} APIParamaters.uriEndPoint.api - Path to your endpoint
 * @param {String} APIParamaters.uriEndPoint.method - POST/GET/PUT/DELETE etc.
 * @param {String} APIParamaters.uriEndPoint.version - Versioning of your api
 * @param {Object} APIParamaters.uriEndPoint.headerProps - Object of headers you want to pass.
 * @param {Object} APIParamaters.pathParams - Path parameters. Example :id in the path,
 * then pathParams object will be {id:value}.
 * @param {Object} APIParamaters.query - GET/POST/PUT/DELETE Endpoint.
 * @param {Object} APIParamaters.body - Body of the request.
 * @returns {Promise<object>} Body Data from the server.
 */
const clearLocalStorage = () => {
  localStorage.removeItem('apiToken')
  localStorage.removeItem('partyId')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('userId')
  localStorage.removeItem('apiToken')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('timer')
}
export const callApi = ({
  uriEndPoint = { uri: '', method: '', version: '', headerProps: {} },
  pathParams,
  query,
  body,
  apiHostUrl,
}) =>
  new Promise((resolve, reject) => {
    callAxios({
      uriEndPoint,
      pathParams,
      query,
      body,
      apiHostUrl,
    })
      .then((response) => {
        resolve(response.data)
        localStorage.setItem('timer', 1800)
      })
      .catch((err) => {
        if (!err.response) {
          if (!getPageQuery().redirect) {
            // history.push(
            //   `/server-unreachable?${stringify({
            //     redirect: window.location.href,
            //   })}`,
            // );
          }
          return
        }

        if (err?.response?.status === 401) {
          console.log(`err`, { err })
          // <Redirect push to="/user/login" />;
          // router.push("/login");
          window.location.replace('/login')
          clearLocalStorage()
          reject(err.response)
        }
        if (err?.response) {
          reject(err.response)
        }
      })
  })
/**
 * Utility methods to be used for invoking API methods
 */
