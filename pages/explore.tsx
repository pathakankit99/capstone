import type { NextPage } from 'next'
import Explore from '../components/Explore'
import Head from 'next/head'
const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>EATOS - Explore</title>
      </Head>
      <Explore />
    </>
  )
}

export default Index
