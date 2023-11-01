import { FC } from 'react';
import dynamic from 'next/dynamic';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import { useSegmentDataContext } from './SegmentDataProvider';

const Profile = dynamic(() => import('./Profile').then(mod => mod.default), { ssr: false });

const ProfileContent: FC = props => {
  const data = useSegmentDataContext();
  return <Profile {...props} segmentData={data} />;
};

registerUniformComponent({
  type: 'profileContent',
  component: ProfileContent,
});

export default ProfileContent;
