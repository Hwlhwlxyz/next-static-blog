使用Next.js编写的博客

在_posts中添加markdown文件，有嵌套目录也会识别。
`npm run export` 或者 `yarn export` 导出静态文件到out目录。

markdown文件中插入代码要用lowlight已经注册过的语言，不然会报错。Error: Unknown language: `xxx` is not registered。可以通过设置ignoreMissing忽略这个错误。

遇到特殊情况（比如文件名字有空格，路径中带有"."的话在开发环境运行正常，但是导出成静态文件后返回404），build之后虽然html文件存在，但是通过路由过去会返回404，在路径后面加上.html可以访问。可以在blogConfig.json中设置addHtml为true。
> https://stackoverflow.com/a/58098322

如果内存不够，可以设置内存使用限制`NODE_OPTIONS=--max-old-space-size=512`


拷贝文件到目录下，同时也把图片拷贝过去
```
rsync -av  out/ /var/www/html/

rsync -av  --include="*.jpg" --include="*.png" --include="/*" --exclude="*"  _posts/ /var/www/html/out/posts/

```
---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
