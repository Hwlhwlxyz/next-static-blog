/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    // path: "/",
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/page/1',
  //       permanent: true,
  //     },
  //   ]
  // }
}
