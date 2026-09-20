import { Html, Head, Main, NextScript } from "next/document";
import { getSiteMetaData } from "@utils/helpers";

export default function Document() {
  const { language } = getSiteMetaData();
  return (
    <Html lang={language}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
