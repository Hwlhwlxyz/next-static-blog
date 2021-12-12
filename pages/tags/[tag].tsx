import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import BlogHead from "../../components/blogHead";
import Layout from "../../components/layout/layout";
import { LayoutSidebar } from "../../components/layout/sidebar";
import MainPage from "../../components/mainpage";
import { getAllPosts, getAllPostsByTag, getAllTags } from "../../lib/api/posts";
import PostType from "../../lib/models/post";
import styles from "../../styles/Home.module.css";

type Props = {
  allPostsByTag: PostType[];
  tags: string[];
  currentTag: string;
};

const Tags = ({ allPostsByTag, currentTag, tags }: Props) => {
  console.log("18:", allPostsByTag);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <BlogHead />
        <h2>标签 {currentTag}</h2>
        <MainPage allPosts={allPostsByTag} />
      </main>
    </div>
  );
};

Tags.getLayout = function getLayout(page: ReactElement) {
  console.log(page)
  let tags = page.props.tags;
  return (
    <Layout>
      <LayoutSidebar tags={tags} />
      {page}
    </Layout>
  );
};

export default Tags;

type Params = {
  params: {
    tag: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  let allPostsByTag: any = null;
  allPostsByTag = getAllPostsByTag(params.tag, [
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
  ]);
  console.log(allPostsByTag);
  const tags = getAllTags();
  const currentTag = params.tag;
  return {
    props: { allPostsByTag, currentTag, tags },
  };
};

export async function getStaticPaths() {
  const tags = getAllTags();
  return {
    paths: tags.map((tag: string) => {
      return {
        params: {
          tag: tag,
        },
      };
    }),
    fallback: false,
  };
}
