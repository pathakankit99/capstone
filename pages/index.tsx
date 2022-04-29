import type { NextPage } from 'next'
import Homepage from '../components/Hompage'
import Head from "next/head"
import Nav from '../components/Nav'

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>MovieMasalaMania</title>
      </Head>
      <Nav/>
      <Homepage />
      
    </>
  )
}

export default Index
