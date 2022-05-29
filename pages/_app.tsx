import React from "react";
import "../styles/global.css";
import "../public/fonts/font.css";

function MyApp(props: { Component: any; pageProps: any }) {
  const { Component, pageProps } = props;

  return (
      <Component {...pageProps} />
  );
}

export default MyApp;
