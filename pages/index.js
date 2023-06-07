import tw, { styled } from 'twin.macro';
import Link from "next/link";
import Image from "next/image";
import Typewriter from 'typewriter-effect';
import Particles from 'react-tsparticles';
import { Parallax } from 'react-scroll-parallax';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import GithubRepos from "../components/githubrepos.js";
import DiscordActivity from "../components/discord.js";
import Navigation from "../components/navigation.js";
import SkillContainer from "../components/skill.js";
import Footer from "../components/footer.js";
import PtConf from "../components/particles.json";
import MyImage from "../assets/me.jpg";

const ProfileImage = styled(Image)`
  ${tw`w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full md:rounded-5xl bg-nav shadow-lg transition-all`}
  backdrop-filter: blur(2px);
  :hover {
    transform: scale(1.03);
  }
`;

const ButtonSocial = styled(motion.div)`
  ${tw`py-2 px-2.5 bg-transparent text-secondary-light shadow rounded transition-all duration-300 cursor-pointer`}
  :hover {
    ${tw`bg-btnhover text-primary-light`}
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

export default function Home(props) {
  const birthDate = new Date(process.env.BIRTHDAY);
  const todayDate = new Date();

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
      <Navigation />
      <div css={tw`fixed top-0 left-0 z-[-1] w-full h-screen`}>
        <Particles id="tsparticles" options={PtConf} />
      </div>

      <section css={tw`px-12 md:px-20 lg:px-32 mt-28 flex justify-center items-center flex-col-reverse md:flex-row relative z-[1]`}>
        <Parallax opacity={[1.5, 0.6]} css={tw`w-full md:w-1/2 lg:pl-12 flex justify-center items-center md:items-start flex-col text-center md:text-left`}>
          <TitleHeading initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} css={tw`text-5xl md:text-7xl`}>Realzzy</TitleHeading>
          <Typewriter
            options={{
              strings: "I'm a <strong>Junior Full Stack Developer</strong> from Indonesia. <br \>Also, welcome to my personal website! 👋",
              autoStart: true, delay: 30,
            }}
            css={tw`text-primary-light text-center shadow md:text-left md:text-lg m-0 md:mr-3 p-0 md:pl-1`}
          />
          <div css={tw`flex justify-center items-start flex-row text-2xl mt-4`}>
            <Link href="https://github.com/then77"><ButtonSocial initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0 }} css={tw`mr-1`} data-tooltip-id="tippy" data-tooltip-content="@then77"><FontAwesomeIcon icon={faGithub} fixedWidth  /></ButtonSocial></Link>
            <Link href="https://discord.com/users/962658658070704148"><ButtonSocial initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} css={tw`mx-1`} data-tooltip-id="tippy" data-tooltip-content="The Realzy#1963"><FontAwesomeIcon icon={faDiscord} fixedWidth /></ButtonSocial></Link>
            <Link href="mailto:hello@therealzzy.xyz"><ButtonSocial initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} css={tw`ml-1`} data-tooltip-id="tippy" data-tooltip-content="hello@therealzzy.xyz"><FontAwesomeIcon icon={faEnvelope} fixedWidth /></ButtonSocial></Link>
          </div>
        </Parallax>
        <div css={tw`w-full md:w-1/2 flex justify-center items-center flex-col`}>
          <Parallax speed={25} css={tw`hidden md:block`}>
            <ProfileImage src={MyImage} alt="My profile image" />
          </Parallax>
          <div css={tw`md:hidden`}>
            <ProfileImage src={MyImage} alt="My profile image" />
          </div>
        </div>
      </section>


      <section id="about" css={tw`px-12 md:px-20 lg:px-32 pt-28 flex justify-center items-center flex-col md:flex-row relative z-[1]`}>
        <Parallax scale={[1, 0.8]} css={tw`hidden md:block w-1/2 flex justify-center items-center flex-col`}>
          <DiscordActivity />
        </Parallax>
        <div css={tw`md:hidden w-full flex justify-center items-center`}>
          <DiscordActivity />
        </div>
        <Parallax opacity={[1.5, 0.6]} css={tw`w-full md:w-1/2 lg:pl-12 flex justify-center items-center md:items-start flex-col text-center md:text-left`}>
          <TitleHeading initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} css={tw`text-3xl md:text-5xl`}>About me</TitleHeading>
          <Typewriter
            options={{
              strings: "Hello there! My name is Nevan, but you might knew me in online world with my nickname, <strong>Realzzy</strong> :D<br /><br />I'm a " + myAge() + " year old Junior Full Stack Developer from Indonesia. My passion as a developer has started from 2018, and taken in seriously in it. On 2020, i started jumped to learn <strong>Python</strong>, <strong>Java</strong> and <strong>Typescript</strong> and learned about application program, back-end and front-end with React like this one. Right now, i currently mastered on <strong>HTML, CSS, Javascript,</strong> and the most loved one, <strong>Python</strong> ❤️.",
              autoStart: true, delay: 1,
            }}
            css={tw`text-primary-light text-center shadow md:text-left md:text-xl m-0 md:mr-3 p-0 min-h-[300px]`}
          />
        </Parallax>
      </section>


      <section id="skills" css={tw`px-12 md:px-20 lg:px-32 pt-28 flex justify-center items-center flex-col relative z-[1]`}>
        <div css={tw`w-full flex justify-center items-center flex-col text-center`}>
          <TitleHeading initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} css={tw`text-3xl md:text-5xl`}>My Skills</TitleHeading>
          <SkillContainer />
        </div>
      </section>


      <section id="projects" css={tw`px-8 md:px-20 pt-28 flex justify-center items-center flex-col relative z-[1]`}>
        <TitleHeading initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} css={tw`text-3xl md:text-5xl`}>My Projects</TitleHeading>
        <div><GithubRepos /></div>
      </section>

      <Footer />
      <Tooltip id="tippy" css={tw`z-[10] transition-all`} style={{ backgroundColor: "#383c4d" }} />
    </>
  )
}