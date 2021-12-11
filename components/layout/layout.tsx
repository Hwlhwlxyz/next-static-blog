import Head from 'next/head'
import styles from './layout.module.css'

export default function Layout({ children }: any) {
  console.log("layout:",children)
  if (children!=null) {
    for (let i=0; i<children.length; i++){
      console.log(children[i].props)
    }
  }
  
  return (
    <>
      <Head>
        <title>Layouts Example</title>
      </Head>
      <main className={styles.main}>
        {children}
        </main>
    </>
  )
}
