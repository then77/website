import { useState, useEffect } from "react";
import tw, { styled } from 'twin.macro';
import Image from "next/image";
import Typewriter from 'typewriter-effect';
import Particles from 'react-tsparticles';
import { motion } from 'framer-motion';
import Footer from "../components/footer.js";
import PtConf from "../components/particles.json";

import Sakuta1 from "../assets/sakuta-1.jpg";
import Sakuta2 from "../assets/sakuta-1.jpg";
import Sakuta3 from "../assets/sakuta-1.jpg";

const ProfileImage = styled(Image)`
  ${tw`w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full md:rounded-5xl bg-nav shadow-lg transition-all`}
  backdrop-filter: blur(2px);
  :hover {
    transform: scale(1.03);
  }
`;

const NoneImage = styled.div`
  ${tw`w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full md:rounded-5xl bg-nav shadow-lg transition-all`}
  backdrop-filter: blur(2px);
  :hover {
    transform: scale(1.03);
  }
`;

const TitleHeading = styled(motion.h1)`
  ${tw`text-primary-light font-bold m-0 my-6 md:mt-0 p-0 pb-1 shadow select-none`}
  background: linear-gradient(0deg, rgba(236,236,236,1) 0%, rgba(202,200,217,1) 100%);
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function Sakuta(props) {
  const [ selected, setImage ] = useState(null);
  
  useEffect(() => {
    const Images = new Array(Sakuta1, Sakuta2, Sakuta3);
    setImage(Images.at(Math.floor(Math.random() * Images.length)));
  }, []);
  
  return (
    <>
      <div css={tw`fixed top-0 left-0 z-[-1] w-full h-screen`}>
        <Particles id="tsparticles" options={PtConf} />
      </div>

      <section css={tw`px-12 md:px-20 lg:px-32 mt-28 flex justify-center items-center flex-col-reverse md:flex-row relative z-[1]`}>
        <div css={tw`w-full md:w-1/2 lg:pl-12 flex justify-center items-center md:items-start flex-col text-center md:text-left`}>
          <TitleHeading initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} css={tw`text-5xl md:text-7xl`}>Well...</TitleHeading>
          <Typewriter
            options={{
              strings: "Seems you tried to find this hidden page<br>Well, this is <strong>Sakuta Azusagawa</strong> 👋",
              autoStart: true, delay: 20,
            }}
            css={tw`text-primary-light text-center shadow md:text-left md:text-lg m-0 md:mr-3 p-0 md:pl-1`}
          />
        </div>
        <div css={tw`w-full md:w-1/2 flex justify-center items-center flex-col`}>
          <div>
            {selected ? (<ProfileImage src={selected} alt="My profile image" />) : (<NoneImage />)}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}