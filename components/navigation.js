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

const Linked1 = styled(Link)`
  ${tw`text-secondary-light no-underline font-medium md:text-lg m-0 mx-2 md:mx-5 p-0 transition-all`}
  :hover {
    ${tw`text-emerald-300 font-semibold`}
  }
`;

const Linked2 = styled(Link)`
  ${tw`text-secondary-light no-underline font-medium md:text-lg m-0 mx-2 md:mx-5 p-0 transition-all`}
  :hover {
    ${tw`text-orange-300 font-semibold`}
  }
`;

const Linked3 = styled(Link)`
  ${tw`text-secondary-light no-underline font-medium md:text-lg m-0 mx-2 md:mx-5 p-0 transition-all`}
  :hover {
    ${tw`text-sky-300 font-semibold`}
  }
`;

export default function Navigation({ section }) {
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
          <Linked1 href="#about" scroll={false} css={ section == 1 ? tw`text-emerald-300 font-semibold` : null }>About</Linked1>
          <Linked2 href="#skills" scroll={false} css={ section == 2 ? tw`text-orange-300 font-semibold` : null }>Skill</Linked2>
          <Linked3 href="#projects" scroll={false} css={ section == 3 ? tw`text-sky-300 font-semibold` : null }>Project</Linked3>
        </motion.div>
      </NavbarBase>
    </>
  )
}
