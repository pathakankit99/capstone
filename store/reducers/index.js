import auth_reducer from './auth_reducer'
import app_reducer from './app_reducer'
// import menu from "./menu";
import { combineReducers } from 'redux'

export default combineReducers({
  auth_reducer,
  app_reducer,
})
