import tw, { styled } from 'twin.macro';
import Link from "next/link";
import Image from "next/image";
import Typewriter from 'typewriter-effect';
import Particles from 'react-tsparticles';

import { renderToStaticMarkup } from 'react-dom/server';
import { useState, useEffect, useRef } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

import GithubRepos from "../components/githubrepos";
import DiscordActivity from "../components/discord.js";
import Navigation from "../components/navigation.js";
import SkillContainer from "../components/skill.js";
import Footer from "../components/footer.js";
import Loading from "../components/loading.js";

import PtConf from "../components/particles.json";
import PtConf2 from "../components/particles2.json";
import 'react-loading-skeleton/dist/skeleton.css';

// Create Styled element for Profile Image
const ProfileImage = styled(Image)`
  ${tw`w-48 h-48 md:w-72 md:h-72 lg:w-[352px] lg:h-[352px] 2xl:w-[470px] 2xl:h-[470px] rounded-full md:rounded-5xl bg-nav shadow-lg transition-all glow-primary-light md:drop-shadow-none`}
  backdrop-filter: blur(2px);
  :hover {
    transform: scale(1.03);
  }
`;

// Create Styled element for Social Button Icons
const Fab = styled(FontAwesomeIcon)`
  ${tw`py-2 px-2.5 text-secondary-light transition-all duration-300 cursor-pointer`}
  :hover {
    ${tw`text-primary-light glow-primary-light`}
  }
}
`;

// Create styled element for first Section Title
const TitleHeading1 = styled(motion.h1)`
  ${tw`text-primary-light font-space font-bold m-0 my-6 md:mt-0 p-0 pb-1 shadow select-none`}
  background: linear-gradient(0deg, rgba(95,155,232,1) 0%, rgba(91,212,255,1) 100%);
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// Create styled element for second Section Title
const TitleHeading2 = styled(motion.h1)`
  ${tw`text-primary-light font-space font-bold m-0 my-6 md:mt-0 p-0 pb-1 shadow select-none`}
  background: linear-gradient(0deg, rgba(59,209,137,1) 0%, rgba(108,255,173,1) 100%);
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// Create styled element for third Section Title
const TitleHeading3 = styled(motion.h1)`
  ${tw`text-primary-light font-space font-bold m-0 my-6 md:mt-0 p-0 pb-1 shadow select-none`}
  background: linear-gradient(0deg, rgba(221,129,57,1) 0%, rgba(255,170,108,1) 100%);
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function Home(props) {
    
  // Make state for check if loaded
  const [loaded, setLoaded] = useState(false);
    
  // Make state for scrolled section
  const [sectionScrolled, setScrolledSection] = useState(0);
    
  // Set date and my birthday for old counter (also some secret)
  const birthDate = new Date(process.env.bday);
  const todayDate = new Date();
  const [birthday, setBirthday] = useState(false);
    
  // Add element reference for sections
  const sec1 = useRef(null);
  const sec2 = useRef(null);
  const sec3 = useRef(null);

  useEffect(() => {
    // useEffect is runned when everything is loaded, so it is good to set loaded to true
    setLoaded(true);
      
    // Make scroll listener function and check for scrolled section
    const scrollDetect = () => {
      if (sec1.current && sec1.current.getBoundingClientRect().top-40 <= 0) {
        if (sec2.current && sec2.current.getBoundingClientRect().top-40 <= 0) {
          if (sec3.current && sec3.current.getBoundingClientRect().top-40 <= 0) {
            setScrolledSection(3); 
          } else { setScrolledSection(2); }
        } else { setScrolledSection(1); }
      } else { setScrolledSection(0); }
    };
      
    // Make that function as a listener
    window.addEventListener("scroll", scrollDetect);
      
    // Check if it today is my birthday (and run some secrets)
    if (birthDate.getMonth() == todayDate.getMonth() && birthDate.getDate() == todayDate.getDate()) {
      // Ah damn it is my birthday! Trigger birthday state
      setBirthday(true);
    }
    
    // Remove everything when unused
    return () => {
      window.removeEventListener("scroll", scrollDetect);
    }
  }, [birthDate]);
  
  // Make function to check for my age
  const myAge = () => {
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    const currentYear = todayDate.getFullYear();
    const currentMonth = todayDate.getMonth();
    const currentDay = todayDate.getDate();
    let age = currentYear - birthYear;
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) age++;
    return age.toString();
  };
  
  return (
    <>
      <Navigation section={sectionScrolled} />
      <div css={tw`fixed top-0 left-0 z-[-1] w-full h-screen overflow-hidden`}>
        <Particles id="tsparticles" options={ birthday ? PtConf2 : PtConf } />
      </div>

      <section css={tw`px-8 md:px-20 lg:px-32  mt-28 flex justify-center items-center flex-col-reverse md:flex-row relative z-[1]`}>
        <Parallax opacity={[1.5, 0.6]} css={tw`w-full md:w-1/2 lg:pl-12 flex justify-center items-center md:items-start flex-col text-center md:text-left`}>
          {loaded ? (
            <>
              <TitleHeading1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} css={tw`text-5xl md:text-7xl 2xl:text-8xl`}>Realzzy</TitleHeading1>
              <Typewriter
                options={{
                  strings: `I'm a <strong>Junior Full Stack Developer</strong>  from Indonesia. <br>Also, welcome to my personal website! ${birthday ? "🥳" : "👋"}`
                 , autoStart: true, delay: 30,
                }}
               css={tw`text-primary-light text-center shadow md:text-left md:text-lg 2xl:text-2xl m-0 md:mr-3 p-0 md:pl-1`}
              />
            </>
          ) : (      
            <>
              <div css={tw`w-40 sm:w-full max-w-xs mt-6 md:mt-0 mb-3`}><Loading css={tw`h-10 md:h-12`} /></div>
           	  <div css={tw`w-60 sm:w-full max-w-xs md:max-w-sm`}><Loading count={2} /></div>
            </>
          )}
          
          <div css={tw`flex justify-center items-start flex-row text-2xl mt-4`}>
            <Link href="https://github.com/then77"><Fab icon={faGithub} css={tw`mr-1`} fixedWidth data-tooltip-id="tippy" data-tooltip-content="@then77" /></Link>
            <Link href="https://discord.com/users/962658658070704148"><Fab icon={faDiscord} fixedWidth  css={tw`mx-1`} data-tooltip-id="tippy" data-tooltip-content="@realzzy" /></Link>
            <Link href="mailto:code@therealzzy.xyz"><Fab icon={faEnvelope} fixedWidth css={tw`ml-1`} data-tooltip-id="tippy" data-tooltip-content="code@therealzzy.xyz" /></Link>
          </div>
        </Parallax>

        <div css={tw`w-full md:w-1/2 flex justify-center items-center flex-col`}>
          <Parallax speed={25} css={tw`hidden md:block relative`}>
            <ProfileImage src={birthday ? process.env.bdaypfp : "/me.jpg"} width={400} height={400} alt="My profile image" />
          </Parallax>

          <div css={tw`md:hidden relative`}>
            <ProfileImage src={birthday ? process.env.bdaypfp : "/me.jpg"} width={400} height={400} alt="My profile image" />
          </div>
        </div>
      </section>


      <section id="about" ref={sec1} css={tw`px-12 md:px-20 lg:px-32 pt-28 flex justify-center items-center flex-col md:flex-row relative z-[1]`}>
        <Parallax scale={[1, 0.8]} css={tw`hidden md:block w-1/2 flex justify-center items-center flex-col`}>
          <DiscordActivity />
        </Parallax>

        <div css={tw`md:hidden w-full flex justify-center items-center`}>
          <DiscordActivity />
        </div>

        <Parallax opacity={[1.5, 0.6]} css={tw`w-full md:w-1/2 lg:pl-12 flex justify-center items-center md:items-start flex-col text-center md:text-left`}>
          {loaded ? (
            <>
              <TitleHeading2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} css={tw`text-3xl md:text-5xl 2xl:text-8xl`}>About me</TitleHeading2>
              <Typewriter
                options={{
                  strings: `Hello there! My name is Nevan, but you might knew me in online world with my nickname, <strong>Realzzy</strong> :D<br /><br />I'm a ${myAge()} year old ${birthday ? "(today is my birthday 🎉) " : ""}Junior Full Stack Developer from Indonesia. My passion as a developer has started from 2018 when i first created my own website, and since then i taken in seriously in it. On 2020, i started jumped from web to learn about application program, back-end and front-end with React like this one. Right now, i currently learning on <strong>HTML, CSS, Javascript, Typescript, Java, C++, C#</strong> and the most loved one, <strong>Python</strong> ❤️.`, autoStart: true, delay: 1,
                }}
                css={tw`text-primary-light text-center shadow md:text-left md:text-xl 2xl:text-2xl m-0 md:mr-3 p-0 min-h-[300px]`}
              />
            </>
          ) : (
            <>
              <div css={tw`w-40 sm:w-full max-w-xs mb-3`}><Loading css={tw`h-10 md:h-12`} /></div>
           	  <div css={tw`w-60 sm:w-full max-w-xs md:max-w-sm`}><Loading count={4} /></div>
            </>
          )}
        </Parallax>
      </section>


      <section id="skills" ref={sec2} css={tw`px-12 md:px-20 lg:px-32 pt-28 flex justify-center items-center flex-col relative z-[1]`}>
        <Parallax opacity={[1.5, 0.6]} css={tw`w-full flex justify-center items-center flex-col text-center`}>    
          {loaded ? (
            <TitleHeading3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} css={tw`text-3xl md:text-5xl 2xl:text-8xl`}>My Skills</TitleHeading3>
          ) : ( <div css={tw`w-40 sm:w-full max-w-xs mb-3`}><Loading css={tw`h-10 md:h-12`} /></div> )}
          <SkillContainer />
        </Parallax>
      </section>


      <section id="projects" ref={sec3} css={tw`px-8 md:px-20 pt-28 flex justify-center items-center flex-col relative z-[1]`}>
        
        {loaded ? (
          <TitleHeading1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} css={tw`text-3xl md:text-5xl 2xl:text-8xl`}>My Projects</TitleHeading1>
        ) : ( <div css={tw`w-40 sm:w-full max-w-xs mb-3`}><Loading css={tw`h-10 md:h-12`} /></div> )}
        <div><GithubRepos /></div>
      </section>

      <Footer />
      <Tooltip id="tippy" css={tw`z-[10] transition-all`} style={{ backgroundColor: "#383c4d" }} />
    </>
  )
}
