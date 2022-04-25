import type { NextPage } from 'next'
import Cart from '../components/Cart'
import Head from 'next/head'
const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>EATOS | Cart</title>
      </Head>
      <Cart />
    </>
  )
}

export default Index
