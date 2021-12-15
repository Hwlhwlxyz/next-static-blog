import { NextPage } from "next";
import React from "react";
import Intro from "./intro";
import PostPreview from "./post-preview";
import PostType from "../lib/models/post";



const MainPage = (props: any) => {
  console.log(props);

  let allPosts: PostType[] = props.allPosts;
  if (allPosts == undefined) {
    return (
      <div>
        <p>no posts</p>
      </div>
    );
  }
  return (
    <div>
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
