import tw, { styled } from 'twin.macro';
import Link from "next/link";

const Linked = styled(Link)`
  ${tw`text-primary-dark transition-all`}
  text-decoration: none;
  :hover {
    ${tw`text-gray-400 text-glow-primary-dark`}
    transform:scale(1.02);
  }
`;

export default function Footer() {
  const gotoOther = (e) => {
    e.preventDefault();
    alert("Sorry, this v3 version is not publicily available yet.\nThere is some updates that i need to fix before i publish them.");
  };
  const hateIt = (e) => e.preventDefault();
  
  return (
    <>
      <p css={tw`m-0 mt-20 md:mt-32 mb-4 p-0 text-center font-medium text-sm text-secondary-light`}>
        &copy; 2023 by Realzzy, All Right Reserved.
        <br /><Linked href={'https://v1.therealzzy.xyz'}>Old Site</Linked> • <Linked href={'/source'} onClick={gotoOther} onContextMenu={hateIt}>Source</Linked>
      </p>
    </>
  )
}
