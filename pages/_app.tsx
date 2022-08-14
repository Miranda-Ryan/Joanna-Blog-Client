import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Head>
        <title>Joanna's Blog</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Blog page of Joanna Dias" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
