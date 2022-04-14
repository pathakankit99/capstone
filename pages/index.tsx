import type { NextPage } from 'next'
import Home from "../components/Home"
import Head from "next/head"
const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>EATOS - Maa Ki Rasoi</title>
      </Head>
      <Home />
    </>
  )
}

export default Index
