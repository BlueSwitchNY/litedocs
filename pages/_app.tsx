import React from "react"
import Head from "next/head"
import App from "next/app"

import "../styles/tailwind.css"
import "github-markdown-css/github-markdown.css"

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          {/* General tags */}
          <meta key="description" property="description" content="LiteDocs" />
          <title key="title">LiteDocs</title>
          {/* OpenGraph tags */}
          <meta key="og:url" property="og:url" content="http://litedocs.io" />
          <meta key="og:title" property="og:title" content="LiteDocs" />
          <meta
            key="og:description"
            property="og:description"
            content="minimalist documentation"
          />
          {/* <meta key="og:image" property="og:image" content="" /> */}
          <meta key="og:type" property="og:type" content="website" />
          {/* Twitter Card tags */}
          <meta
            key="twitter:title"
            property="twitter:title"
            content="LiteDocs"
          />
          <meta
            key="twitter:description"
            property="twitter:description"
            content="minimalist documentation"
          />
          {/* <meta key="twitter:image" property="twitter:image" content="" /> */}
          <meta key="twitter:card" property="twitter:card" content="summary" />
        </Head>
        <div className="bg-gray-100">
          {/* <Store>
            <Component {...pageProps} />
          </Store> */}
          <Component {...pageProps} />
        </div>
      </>
    )
  }
}

export default MyApp
