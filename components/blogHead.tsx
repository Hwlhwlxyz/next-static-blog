import blogConfig from "../blogConfig.json";


const BlogHead = () => {
  return (
    <h1>{blogConfig["title"]}</h1>
  )
}

export default BlogHead
