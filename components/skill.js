import tw, { styled } from 'twin.macro';
import {
  SiPython, SiJavascript, SiTypescript, SiHtml5,
  SiNodedotjs, SiTailwindcss, SiNextdotjs, SiReact,
  SiSqlite, SiDocker, SiGit, SiVisualstudiocode
} from '@icons-pack/react-simple-icons';

const PyIcon = styled(SiPython)`
  ${tw`py-3 px-3.5 2xl:py-4 2xl:px-5 bg-secondary-dark text-secondary-light shadow rounded-md transition-all cursor-pointer`}

  :hover {
    ${tw`bg-cyan-600 text-primary-light glow-primary-dark`}
    transform:scale(1.1);
  }
`;

const JsIcon = styled(SiJavascript)`
  ${tw`py-3 px-3.5 2xl:py-4 2xl:px-5 bg-secondary-dark text-secondary-light shadow rounded-md transition-all cursor-pointer`}
  :hover {
    ${tw`bg-yellow-500 text-gray-800 glow-primary-dark`}
    transform:scale(1.1);
  }
`;

const TsIcon = styled(SiTypescript)`
  ${tw`py-3 px-3.5 2xl:py-4 2xl:px-5 bg-secondary-dark text-secondary-light shadow rounded-md transition-all cursor-pointer`}

  :hover {
    ${tw`bg-blue-700 text-primary-light glow-primary-dark`}
    transform:scale(1.1);
  }
`;

const HtmlIcon = styled(SiHtml5)`
  ${tw`py-3 px-3.5 2xl:py-4 2xl:px-5 bg-secondary-dark text-secondary-light shadow rounded-md transition-all cursor-pointer`}

  :hover {
    ${tw`bg-orange-600 text-primary-light glow-primary-dark`}
    transform:scale(1.1);
  }
`;

const NodeIcon = styled(SiNodedotjs)`
  ${tw`py-3 px-3.5 2xl:py-4 2xl:px-5 bg-secondary-dark text-secondary-light shadow rounded-md transition-all cursor-pointer`}

  :hover {
    ${tw`bg-green-600 text-primary-light glow-primary-dark`}
    transform:scale(1.1);
  }
`;

const TwIcon = styled(SiTailwindcss)`
  ${tw`py-3 px-3.5 2xl:py-4 2xl:px-5 bg-secondary-dark text-secondary-light shadow rounded-md transition-all cursor-pointer`}

  :hover {
    ${tw`bg-sky-600 text-primary-light glow-primary-dark`}
    transform:scale(1.1);
  }
`;

const NextIcon = styled(SiNextdotjs)`
  ${tw`py-3 px-3.5 2xl:py-4 2xl:px-5 bg-secondary-dark text-secondary-light shadow rounded-md transition-all cursor-pointer`}

  :hover {
    ${tw`bg-zinc-300 text-black glow-primary-dark`}
    transform:scale(1.1);
  }
`;

const ReactIcon = styled(SiReact)`
  ${tw`py-3 px-3.5 2xl:py-4 2xl:px-5 bg-secondary-dark text-secondary-light shadow rounded-md transition-all cursor-pointer`}

  :hover {
    ${tw`bg-sky-500 text-gray-800 glow-primary-dark`}
    transform:scale(1.1);
  }
`;

const SqlIcon = styled(SiSqlite)`
  ${tw`py-3 px-3.5 2xl:py-4 2xl:px-5 bg-secondary-dark text-secondary-light shadow rounded-md transition-all cursor-pointer`}

  :hover {
    ${tw`bg-cyan-800 text-primary-light glow-primary-dark`}
    transform:scale(1.1);
  }
`;

const DockIcon = styled(SiDocker)`
  ${tw`py-3 px-3.5 2xl:py-4 2xl:px-5 bg-secondary-dark text-secondary-light shadow rounded-md transition-all cursor-pointer`}

  :hover {
    ${tw`bg-sky-500 text-gray-800 glow-primary-dark`}
    transform:scale(1.1);
  }
`;

const GitIcon = styled(SiGit)`
  ${tw`py-3 px-3.5 2xl:py-4 2xl:px-5 bg-secondary-dark text-secondary-light shadow rounded-md transition-all cursor-pointer`}

  :hover {
    ${tw`bg-orange-600 text-primary-light glow-primary-dark`}
    transform:scale(1.1);
  }
`;

const VSIcon = styled(SiVisualstudiocode)`
  ${tw`py-3 px-3.5 2xl:py-4 2xl:px-5 bg-secondary-dark text-secondary-light shadow rounded-md transition-all cursor-pointer`}

  :hover {
    ${tw`bg-sky-600 text-primary-light glow-primary-dark`}
    transform:scale(1.1);
  }
`;

export default function SkillContainer() {
  return (
    <>
      <div css={tw`mt-8 grid grid-cols-4 sm:grid-cols-6 gap-3`}>
        <PyIcon size={28} data-tooltip-id="tippy" data-tooltip-content="Python" />
        <JsIcon size={28} data-tooltip-id="tippy" data-tooltip-content="Javascript" />
        <TsIcon size={28} data-tooltip-id="tippy" data-tooltip-content="Typescript" />
        <HtmlIcon size={28} data-tooltip-id="tippy" data-tooltip-content="HTML" />
        <NodeIcon size={28} data-tooltip-id="tippy" data-tooltip-content="Node.js" />
        <TwIcon size={28} data-tooltip-id="tippy" data-tooltip-content="Tailwind CSS" />
        <NextIcon size={28} data-tooltip-id="tippy" data-tooltip-content="Next.js" />
        <ReactIcon size={28} data-tooltip-id="tippy" data-tooltip-content="React" />
        <SqlIcon size={28} data-tooltip-id="tippy" data-tooltip-content="SQL" />
        <DockIcon size={28} data-tooltip-id="tippy" data-tooltip-content="Docker" />
        <GitIcon size={28} data-tooltip-id="tippy" data-tooltip-content="Git" />
        <VSIcon size={28} data-tooltip-id="tippy" data-tooltip-content="VS Code" />
      </div>
    </>
  )
}