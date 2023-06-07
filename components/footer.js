import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import Link from "next/link";

const Linked = styled(Link)`
  ${tw`text-primary-dark transition-all`}
  text-decoration: none;
  :hover {
    ${tw`text-secondary-light`}
    transform:scale(1.02);
  }
`;

export default function Footer() {
  const [rickroll, setRickroll] = useState();
  const [rrop, setRROP] = useState(0);
  const gotoOther = (e) => {
    e.preventDefault();
    setRickroll(true);
    setTimeout(() => setRROP(1), 1000);
  };
  const hateIt = (e) => e.preventDefault();
  
  return (
    <>
      {rickroll && (
        <>
          <div css={tw`fixed top-0 left-0 z-[-2] w-full h-screen flex justify-center items-center select-none`} style={{opacity: rrop}}>
            <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" type="text/html" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0" css={tw`w-full h-full select-none`}></iframe>
          </div>
          <div css={tw`fixed top-0 left-0 z-[-1] w-full h-screen`} />
        </>
      )}
      <p css={tw`m-0 mt-20 md:mt-32 mb-4 p-0 text-center font-medium text-sm text-secondary-light`}>
        &copy; 2023 by Realzzy, All Right Reserved.
        <br /><Linked href={'https://site.therealzzy.xyz'}>Old Site</Linked> • <Linked href={'/other'} onClick={gotoOther} onContextMenu={hateIt}>Other?</Linked>
      </p>
    </>
  )
}