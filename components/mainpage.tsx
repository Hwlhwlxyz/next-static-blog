import { NextPage } from "next";
import React from "react";
import Intro from "./intro";
import PostPreview from "./post-preview";
import PostType from "../lib/models/post";

import blogConfig from "../blogConfig.json";
import Head from "next/head";


const MainPage = (props: any) => {
  console.log(props);

  let allPosts: PostType[] = props.allPosts;
  if (allPosts == undefined) {
    return (
      <div>
        <h1>{blogConfig["title"]}</h1>
        <p>no posts</p>
      </div>
    );
  }
  return (
    <div>
      
      <h1>{blogConfig["title"]}</h1>

      <div>
      {allPosts.map((p: PostType) => {
          return (
            <PostPreview key={p["slug"]}
              title={p.title}
              coverImage={""}
              date={p.date}
              excerpt={p.excerpt}
              slug={p.slug}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;

const showSettings = (event: any) => {
  console.log(event);
};
