import {remark} from 'remark';
import html from 'remark-html';
import {unified} from 'unified'
import remarkRehype from 'remark-rehype'
import remarkParse from 'remark-parse'
import rehypeHighlight from 'rehype-highlight'
import rehypeDocument from 'rehype-document'
import rehypeStringify from 'rehype-stringify'

export default async function markdownToHtml(markdown: string) {
  // const result = await remark()
  // .use(require('remark-prism'), {
  //   transformInlineCode: true,
  // })
  // .use(html)
  // .process(markdown)

  const result = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  // .use(rehypeDocument)
  // .use(html)

  .use(rehypeHighlight)
  .use(rehypeStringify)
  .process(markdown)
  return result.toString()
}
