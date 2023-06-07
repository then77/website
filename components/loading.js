import Skeleton from 'react-loading-skeleton';
import tw, { styled } from 'twin.macro';

const CustomSkeleton = styled(Skeleton)`
  ${tw`w-full`}
  background-color: rgba(111,116,135,0.4);
  backdrop-filter: blur(4px);
`;

export default function Loading({children, ...props}) {
  return (
    <>
      <CustomSkeleton baseColor={'#00000000'} highlightColor={'#848799'} {...props}>{children}</CustomSkeleton>
    </>
  )
}