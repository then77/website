import { useState, useEffect } from "react";
import tw, { styled, css } from 'twin.macro';
import { motion } from 'framer-motion';
import Link from "next/link";

const NavbarBase = styled.div`
  ${tw`fixed top-0 left-0 z-[99] w-full flex justify-center items-center`}
`;

const Navbar = css`
  ${tw`py-5 px-12 md:px-24 bg-transparent mt-3 rounded-xl border-0 border-solid border-transparent shadow-none flex justify-center flex-row items-center transition-all duration-700`}
  backdrop-filter: blur(0px);
`;

const NavbarScrolled = css`
  ${tw`py-3 px-8 md:px-16 bg-nav mt-5 border border-solid border-primary-dark shadow-lg rounded-xl flex justify-center items-center flex-row transition-all duration-700`}
  backdrop-filter: blur(8px);
`;

const Linked = styled(Link)`
  ${tw`text-primary-light no-underline font-medium md:text-lg m-0 mx-2 md:mx-5 p-0 transition-all`}
  :hover {
    ${tw`text-secondary-light`}
  }
`;

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    handleScroll(); // Call once to load navbar
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarStyle = isScrolled ? NavbarScrolled : Navbar;
  return (
    <>
      <NavbarBase>
        <motion.div css={navbarStyle} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Linked href="#about" scroll={false}>About</Linked>
          <Linked href="#skills" scroll={false}>Skill</Linked>
          <Linked href="#projects" scroll={false}>Project</Linked>
        </motion.div>
      </NavbarBase>
    </>
  )
}
