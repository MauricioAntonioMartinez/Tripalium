import React from "react";
import { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import "../styles/main.css";
interface Props {}

const _app = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default _app;
