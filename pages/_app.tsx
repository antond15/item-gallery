import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Item Gallery</title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="Gallery of images suitable for game inventories with intended use mainly for FiveM."
        />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
