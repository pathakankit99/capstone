//@ts-nocheck
import rootReducer from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
  key: 'eatos',
  timeout: 0,
  storage,
  //   whitelist: ["download_list"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose
let store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
)
let persistor = persistStore(store)
export { store, persistor }
