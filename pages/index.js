import Head from 'next/head'
import styles from '../styles/Home.module.css'
//import { Button } from 'bootstrap';


async function getStaticPaths() {
  console.log(process.env.HOST_ADD);
}
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Creatsess Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          YUP VERY WELCOME 
        </h1>
        <button type="button" style={{width:'100%',marginTop:'32px',height:'52px',fontSize:'32px'}}onClick={getStaticPaths}>Test Button</button>
      </main>
    </div>
  )
}
