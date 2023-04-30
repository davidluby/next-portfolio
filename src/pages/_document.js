import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="scrollbar-hide bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}