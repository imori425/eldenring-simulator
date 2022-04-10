import { AppProps } from "next/app";
import "github-markdown-css/github-markdown-light.css";
import "highlight.js/styles/github.css";
import "../styles/globals.css";
import React from "react";

function App({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default App;
