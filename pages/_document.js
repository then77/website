import { Html, Head, Main, NextScript } from 'next/document';
import tw from 'twin.macro';
 
export default function Document() {
  return (
    <Html css={tw`scroll-smooth`}>
      <Head />
      <body css={tw`bg-default font-karla text-primary-light m-0 p-0 selection:bg-secondary-dark selection:text-primary-light`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}