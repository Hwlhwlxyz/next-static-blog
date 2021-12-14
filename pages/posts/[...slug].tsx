import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import React, { ReactElement } from 'react'
import styles from '../../styles/Home.module.css'
import markdownToHtml from '../../lib/api/markdownToHtml'
import PostBody from '../../components/post-body'
import { getAllPosts, getAllTags, getPostBySlug } from '../../lib/api/posts'
import Layout from '../../components/layout/layout'
import { LayoutSidebar } from '../../components/layout/sidebar'
import { Tagcloud } from '../../components/widgets/tagcloud'
import BlogHead from '../../components/blogHead'


type Props = {
  post: any
  morePosts: any[]
  preview?: boolean,
  tags: string[]
}

const Post = ({ post, morePosts, preview, tags }: Props) => {
  console.log({ post, morePosts, preview })
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  console.log("[...slug] post: ",post)
  
  return (
    <div className={styles.container}>

      <div className={styles.main}>
      <BlogHead/>
        {router.isFallback ? (
          <title>Loading…</title>
        ) : (
          <div>
            <title>
                  {post.title}
                </title>
            <article>

              <h1>
                  {post.title}
                </h1>
                <PostBody content={post.content} />
            </article>

            
            <hr></hr>
            
          </div>
        )}
        <Tagcloud tags={post.tags} />
      </div>
      
    </div>
  )
}

Post.getLayout = function getLayout(page: ReactElement) {
  console.log(page)
  let tags = page.props.tags;
  return (
    <Layout>
      <LayoutSidebar tags={tags} />
      {page}
    </Layout>
  );
};


export default Post

type Params = {
  params: {
    slug: string[],
  }
}

export async function getStaticProps({ params }: Params) {
  console.log("slug.tsx 63: ",params)
  let slug = "";
  for (let s of params.slug) {
    slug = slug+s+"/";
  }
  slug = slug.substr(0, slug.length-1);
  console.log("68",slug)
  const post = getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'content',
    'tags'
  ])
  console.log("96:", post)
  const content = await markdownToHtml(post.content || '')
  let morePosts: any[] = [];
  return {
    props: {
      post: {
        ...post,
        content,
      },
      morePosts: morePosts, 
      preview: false,
      tags: getAllTags()
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug', 'path'])
  console.log("posts:",posts)
  return {
    paths: posts.map((post: any) => {
      return {
        params: {
          // slug: post.slug,
          slug: post.slug.split("/")
        },
      }
    }),
    fallback: false,
  }
}

