import '@styles/globals.css'
import Nav from "@components/nav/Nav";
import ScrollProgress from '@components/ScrollProgress';

export default function App({ Component, pageProps }) {
  return <>
    <Nav />
    <ScrollProgress />
    <Component {...pageProps} />
  </>
}