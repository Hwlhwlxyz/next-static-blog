import markdownStyles from '../styles/markdown-styles.module.css'
import markdownCodeStyles from '../styles/markdown-code-styles.module.css'

type Props = {
  content: string
}

export const CodeBlockStyle = () => {
  return (
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css"/>
  )
}

const PostBody = ({ content }: Props) => {
  
  return (
    <div>
       <CodeBlockStyle />
      <div
        className={[markdownStyles['markdown'], markdownCodeStyles['markdown']].join(' ')}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}



export default PostBody
