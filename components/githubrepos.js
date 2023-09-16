import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import tw, { styled } from 'twin.macro';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import Loading from "./loading.js";

import MyImage from "../assets/me.jpg";
import 'react-loading-skeleton/dist/skeleton.css';

const ProfileImageSmall = styled(Image)`
  ${tw`w-4 h-4 rounded-full border border-secondary-light border-solid mr-2`}
`;

const Repo = styled.div`
  ${tw`border border-primary-dark border-solid rounded-2xl bg-nav m-0 relative p-5 transition-all no-underline`}
  backdrop-filter: blur(2px);
  :hover {
    ${tw`bg-zinc-950 glow-secondary-dark`}
    margin-top: -3px;
    margin-bottom: 3px;
  }
`;

const RepoLoading = styled.div`
  ${tw`col-span-2 w-60 h-24 md:w-96`}
`;

const limitCharacters = (text, limit) => {
  if (text.length <= limit) {
    return text;
  }

  return text.slice(0, limit) + '...';
};

const GithubRepos = () => {
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://gh-pinned-repos.egoist.dev/?username=then77');
        if (response.ok) {
          const data = await response.json();
          if (data.length >= 1) {
            console.log(
              `%cGithub%c ~ %cFetched ${data.length} pinned repos!`,
              "background-color:rgb(82,82,91);color:#fff;padding:3px;",
              "background-color:transparent;color:rgb(115,115,115);",
              "background-color:transparent;color:rgb(101,163,13);"
            );
            setRepos(data);
          } else {
            console.warn(
              `%cGithub%c ~ %cPinned repo's are empty!`,
              "background-color:rgb(82,82,91);color:#fff;padding:3px;",
              "background-color:transparent;color:rgb(115,115,115);",
              "background-color:transparent;color:rgb(217,119,6);"
            );
          }
        } else throw new Error(`Server response code: ${response.status}`)
      } catch (error) {
        console.error(
          `%cGithub%c ~ %cError occured: %o`,
          "background-color:rgb(239,68,68);color:#fff;padding:3px;",
          "background-color:transparent;color:rgb(115,115,115);",
          "background-color:transparent;color:rgb(239,68,68);", error
        );
      }
    };

    fetchRepos();
  }, []);

  return (
    <div css={tw`grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-4xl mt-8`}>
      {repos.length >= 1 ? repos.map(repo => (
        <Link href={repo.link} key={repo.id} style={{ textDecoration: 'none' }}>
          <Repo>
            <div css={tw`flex justify-center items-start flex-row mb-1 w-full`}>
              <ProfileImageSmall src={MyImage} alt="My profile image" />
              <p css={tw`text-secondary-light m-0 p-0 text-sm w-full`}>then77</p>
              <ArrowTopRightOnSquareIcon css={tw`text-primary-light w-6 h-6`} />
            </div>
            <h1 css={tw`text-primary-light text-xl md:text-2xl font-semibold m-0 p-0`}>{repo.repo}</h1>
            <p css={tw`text-secondary-light text-sm md:text-base m-0 mb-2 p-0`}>{limitCharacters(repo.description, 40) || 'No description provided'}</p>
            <p css={tw`text-secondary-light m-0 p-0 text-sm`}>
              <span
                css={tw`w-2.5 h-2.5 mr-2 rounded-full inline-block`}
                style={{ backgroundColor: repo.languageColor }}
              />
              {repo.language}
            </p>
          </Repo>
        </Link>
      )) : (
        <RepoLoading>
          <Loading count={3} />
        </RepoLoading>
      )}
    </div>
  );
};

export default GithubRepos;
