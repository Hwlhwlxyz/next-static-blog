import styles from './layout.module.css'

export default function Layout({ children }: any) {
  console.log("layout:",children)
  if (children!=null) {
    for (let i=0; i<children.length; i++){
      console.log(children[i].props)
    }
  }
  
  return (
    <div>
      <div>
        <title>Layouts Example</title>
      </div>
      <main className={styles.main}>
        {children}
        </main>
    </div>
  )
}
