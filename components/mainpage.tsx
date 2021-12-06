import { NextPage } from "next"
import React from "react"
import Intro from "./intro";
import PostPreview from "./post-preview";
import PostType from "../lib/models/post";



const MainPage = (props: any) => {
  console.log(props)
  let allPosts: PostType[] = props.allPosts;
  if (allPosts == undefined) {
    return (
      <div>
        <Intro></Intro>
          <h1>Main Page</h1>
        <hr></hr>
        <p>no posts</p>
        <hr></hr>
      </div>
  )
  }
    return (
        <div>
          <Intro></Intro>
            <h1>Main Page</h1>
          <hr></hr>
          {allPosts.map((p: PostType)=>{
            return <PostPreview key={p['title']} title={p.title} coverImage={""} date={p.date} excerpt={p.excerpt} slug={p.slug} />
          })}
          <hr></hr>
        </div>
    )
}

export default MainPage

