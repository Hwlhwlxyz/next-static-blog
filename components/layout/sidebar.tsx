import Link from "next/link";
import React from "react";
import { Tagcloud } from "../widgets/tagcloud";
import styles from './sidebar.module.css'
import { Searchbar } from "./subcomponents/layoutsearchbar";

export const LayoutSidebar = (props: any) => {
  const tags = props.tags;
    return (
      <nav className={styles.nav}>
        <Searchbar />

        <Link href="/">
          <a>Home</a>
        </Link>
        
        <hr></hr>
        <div>
          <Tagcloud tags={tags} />
        </div>
      </nav>
    )
  }
  