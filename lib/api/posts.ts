import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { readdir } from 'fs/promises';
import PostType from '../models/post';
const path = require('path');

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  // let files = fs.readdirSync(postsDirectory, { withFileTypes: true })
  // return files.map(f=>f.name)
  return getFiles(postsDirectory)
}

export function getFiles(directory: string) : any[] {
  let files = fs.readdirSync(directory, { withFileTypes: true })
  let markdownFiles = [];
  for (let i=0; i<files.length; i++){
    if (files[i].isDirectory()) {
      markdownFiles.push(files[i].name+'/'+getFiles(join(postsDirectory, files[i].name)));
    }
    else if (path.extname(files[i].name) == ".md") {
      markdownFiles.push(files[i].name);
    }
  }
  return Array.prototype.concat(...markdownFiles);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  let realSlug = slug;
  if (slug.endsWith('.md')) {
    realSlug = slug.replace(/\.md$/, '')
  }
  const path = `${realSlug}.md`;
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  // const fullPath = join(postsDirectory, slug)
  console.log(fullPath)
  const fileContents = fs.readFileSync(fullPath, 'utf8').trimStart(); // gray-matter not parse data if the string begins with blank lines
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: any //: string|string[] // 'tags' is string[], other values are string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (field === 'excerpt') {
      items[field] = content.substr(0, 300) + '...'
    }

    if (field === 'path') {
      items[field] = path
    }

    if (field === 'date') {
      items[field] = new Date(items[field]);
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })
  // console.log("74", items)
  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  console.log("47", slugs)
  const posts = slugs
    .map((slug: any) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1: any, post2: any) => ((post1.date) > (post2.date) ? -1 : 1))
    console.log("51:", posts)
    // Promise.resolve(posts)
    return posts
}

export function getAllPostsByTag(tag: string, fields: string[] = []) {
  if (!fields.includes("tags")) {
    fields.push("tags");
  }
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug: any) => getPostBySlug(slug, fields))
    .sort((post1: any, post2: any) => (post1.date > post2.date ? -1 : 1))
    console.log("51:", posts)

  let postsByTag = [];
  for (let i=0; i<posts.length; i++) {
    if (posts[i]["tags"]!=null && posts[i]["tags"].includes(tag)) {
      postsByTag.push(posts[i]);
    }
  }
    return postsByTag;
}

export function getAllTags() {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug: any) => getPostBySlug(slug, ['tags']))
    .sort((post1: any, post2: any) => (post1.date > post2.date ? -1 : 1))
    console.log("51:", posts)

  let totalTagsArray: string[] = [];
  for (let i=0; i<posts.length; i++) {
    console.log("113:",posts[i])
    if (posts[i]["tags"]!=null) {
      totalTagsArray = [...totalTagsArray, ...posts[i]["tags"]];
    }
  }
  const dedupTags = Array.from(new Set(totalTagsArray));
  return dedupTags;
}

export async function getStaticPaths() {
  const posts =  getAllPosts(['slug'])
  console.log("56:", posts)
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
