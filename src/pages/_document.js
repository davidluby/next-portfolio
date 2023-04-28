import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="scrollbar-hide bg-gradient-to-br from-slate-600 to-slate-700 text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}