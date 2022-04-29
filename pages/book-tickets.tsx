import type { NextPage } from 'next'
import BookTickets from '../components/BookTickets'
import Head from "next/head"
const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>MovieMasalaMania</title>
      </Head>
      <BookTickets/>
      
    </>
  )
}

export default Index