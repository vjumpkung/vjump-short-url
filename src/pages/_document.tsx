import {
  DocumentHeadTags,
  documentGetInitialProps,
} from "@mui/material-nextjs/v13-pagesRouter";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props: any) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
        <meta
          name="description"
          content="A simple URL shortener with Github Auth or username, password auth."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="vjump URL shortener" />
        <meta
          property="og:description"
          content="A simple URL shortener with Github Auth or username, password auth."
        />
        <meta property="og:url" content="https://vjump-short-url.vercel.app/" />

        <meta
          property="og:image"
          content="https://res.cloudinary.com/dtyymlemv/image/upload/v1715096784/x9epcvlfzzcbbtbtv9js.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="vjump URL shortener" />
        <meta
          name="twitter:description"
          content="A simple URL shortener with Github Auth or username, password auth."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dtyymlemv/image/upload/v1715096784/x9epcvlfzzcbbtbtv9js.png"
        />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: any) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
