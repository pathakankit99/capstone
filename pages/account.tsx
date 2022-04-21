import type { NextPage } from 'next'
import Account from '../components/Account'
import Head from 'next/head'
const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>EATOS | Account</title>
      </Head>
      <Account />
    </>
  )
}

export default Index
