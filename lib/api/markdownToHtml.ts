import {remark} from 'remark';
import html from 'remark-html';
import {unified} from 'unified'
import remarkRehype from 'remark-rehype'
import remarkParse from 'remark-parse'
import rehypeHighlight from 'rehype-highlight'
import rehypeDocument from 'rehype-document'
import rehypeStringify from 'rehype-stringify'
import blogConfig from "../../blogConfig.json";

export default async function markdownToHtml(markdown: string) {
  // const result = await remark()
  // .use(require('remark-prism'), {
  //   transformInlineCode: true,
  // })
  // .use(html)
  // .process(markdown)
  let ignoreMissing;
  if (blogConfig["ignoreMissing"]==true) {
    ignoreMissing = true;
  }
  else {
    ignoreMissing = false;
  }
  const result = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeHighlight, {ignoreMissing: ignoreMissing})
  .use(rehypeStringify)
  .process(markdown)
  return result.toString()
}
