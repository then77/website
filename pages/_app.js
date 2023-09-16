import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/karla';
import Head from "next/head";
import { AnimatePresence } from 'framer-motion';
import { ParallaxProvider } from 'react-scroll-parallax';

const metadata = {
  title: {
    template: '%s - Realzzy',
    default: 'Realzzy Website',
  },
  description: 'Welcome to Realzzy.dev site!',
  themeColor: '#40e9b8',
  bannerOg: 'https://therealzzy.xyz/me.jpg',
};

export default function AppWrapper({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{pageProps.title ? metadata.title.template.replace('%s', pageProps.title) : metadata.title.default}</title>
        <meta name="description" content={metadata.description} />
        <meta name="theme-color" content={metadata.themeColor} />
        <meta property="og:image" content={metadata.bannerOg} />
      </Head>
      <AnimatePresence mode='wait'>
        <ParallaxProvider>
          <Component {...pageProps} />
        </ParallaxProvider>
      </AnimatePresence>
    </>
  )
};
