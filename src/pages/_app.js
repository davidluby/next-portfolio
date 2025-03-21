import '@styles/globals.css'
import Background from '@src/components/Background'
import Nav from "@components/nav/Nav";
import ScrollProgress from '@components/ScrollProgress';

export default function App({ Component, pageProps }) {
  return <>
    <Nav />
    <ScrollProgress />
    <Background />
    <Component {...pageProps} />
  </>
}