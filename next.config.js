/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: false,
  reactStrictMode: true,
  images: {
    loader: "custom",
    // path: "/",
  },
  webpack5: true,
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
