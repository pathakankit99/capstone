import type { AppProps } from 'next/app'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import '../styles/globals.css'
import Nav from "../components/Nav"

import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '../store'
import { Provider } from 'react-redux'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <main className="">
          <Nav />
          <Component {...pageProps} />
        </main>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
