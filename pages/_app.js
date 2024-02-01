import Head from 'next/head'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import '../styles/globals.css'
const { AnimatePresence } = require("framer-motion");
import { useRouter } from 'next/dist/client/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Kyllox</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <AnimatePresence exitBeforeEnter initial={false}>
        <Component {...pageProps} key={router.route}/>
      </AnimatePresence>
    </>
  );
}