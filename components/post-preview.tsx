import Link from 'next/link'
import React from 'react'
import postStyles from '../styles/post.module.css'
import dateFormat from '../lib/util/util'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  // author: string
  slug: string,
  // path: string
}

const PostPreview = ({
  title,
  date,
  excerpt,
  slug,
}: Props) => {
  
  return (
    <div>
      <h2>
        <Link as={`/posts/${(slug)}`} href="/posts/*">
          <a className="hover:underline">{title} 2</a>
        </Link>
      </h2>
      <div className={postStyles.dateStyle}>{dateFormat(new Date(date))}</div>
      <p >{excerpt}</p>
      
      {/* <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        {date}
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p> */}
    </div>
  )
}

export default PostPreview
