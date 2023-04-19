import Head from 'next/head'
import Board from "@/components/board/Board";
import React from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tic Tac Toe Game</title>
        <meta name="description" content="Freecodecamp's tic tac toe example"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Board/>
    </>
  )
}
