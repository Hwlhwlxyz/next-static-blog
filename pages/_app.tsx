import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Layout from '../components/layout/layout'
import { LayoutSidebar } from '../components/layout/sidebar'
import { getAllTags } from '../lib/api/posts'

function MyApp({ Component, pageProps }: AppProps| any) {
  const getLayout = Component.getLayout || ((page: any) => page)

  return getLayout(<Component {...pageProps} />)
  // return <Component {...pageProps} />
}

export default MyApp
