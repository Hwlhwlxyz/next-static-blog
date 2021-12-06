import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import React from 'react'
import styles from '../../styles/Home.module.css'
import markdownToHtml from '../../lib/api/markdownToHtml'
import PostBody from '../../components/post-body'
import { getAllPosts, getPostBySlug } from '../../lib/api/posts'


type Props = {
  post: any
  morePosts: any[]
  preview?: boolean
}

const Post = ({ post, morePosts, preview }: Props) => {
  console.log({ post, morePosts, preview })
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  
  return (
    <div className={styles.container}>
      preview={preview}
      <div>
      
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
      </div>
    </div>
  )
}

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
    'author',
    'content',
    'ogImage',
    'coverImage',
    'path'
  ])
  const content = await markdownToHtml(post.content || '')
  let morePosts: any[] = [];
  let preview = 'this is preview';
  return {
    props: {
      post: {
        ...post,
        content
      },
      morePosts: morePosts, 
      preview: preview
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
