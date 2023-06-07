import tw from 'twin.macro';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useGlitch } from 'react-powerglitch';
import Typewriter from 'typewriter-effect';

export default function Custom404() {
  const glitch = useGlitch();
  return (
    <>
      <div css={tw`h-full min-h-screen flex justify-center items-center flex-col px-4`}>
        <ExclamationTriangleIcon css={tw`w-32 h-32 mb-8 text-primary-light`} />
        <h1 css={tw`text-8xl font-bold my-0 px-2`} ref={glitch.ref}>404</h1>
        <Typewriter
          options={{
            strings: ['Page Not Found', 'Still Here?'],
            autoStart: true, deleteSpeed: 20,
            loop: false, delay: 80, pauseFor: 1e5,
          }}
          css={tw`text-xl mt-3 text-secondary-light`}
        />
      </div>
    </>
  );
}