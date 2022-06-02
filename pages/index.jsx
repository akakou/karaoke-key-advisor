import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button } from "@chakra-ui/react"
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import Script from 'next/script'


const Home = () => {

  return (
    <div className={styles.container}>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js" type="text/javascript" ></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js" type="text/javascript"  ></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.sound.min.js" type="text/javascript" ></script>
      <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js" type="text/javascript" ></script>
      <script src="/script/sketch.js" type="text/javascript" ></script>
      <script src="/script/songle.js" type="text/javascript" ></script>


      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p id='status'>Loading Model...</p>
      <p id='result'>No pitch detected</p>

      <div id="songle-yt"></div>
      <div id="songle-sw"></div>

      <Button onClick={() => run(recorder1)}>One</Button>
      <Button onClick={() => run(recorder2)}>Second</Button>
      <Button onClick={() => alert(calcAvarageDiff())}>Result</Button>
    </div >
  )
}

export default Home
