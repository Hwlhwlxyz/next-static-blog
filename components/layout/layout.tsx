import styles from './layout.module.css'
import blogConfig from "../../blogConfig.json";

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
        <title>{blogConfig.title}</title>
      </div>
      <main className={styles.main} >
        {children}
        </main>
    </div>
  )
}
