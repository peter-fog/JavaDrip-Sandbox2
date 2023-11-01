import { FC, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import Image from '../../components/Image';
import classNames from 'classnames';
import { useScores, useQuirks } from '@uniformdev/context-react';
import Traits from './Traits';
import TrackerItem from './TrackerItem';
import OverrideAnonymousId from './OverrideAnonymousId';
import InformationContent from '../../components/InformationContent';

type Styles = {
  container?: string;
};

export type ProfileProps = {
  segmentData?: Segment.SegmentData;
  styles?: Styles;
};

const NEXT_PUBLIC_ANALYTICS_WRITE_KEY = process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY;

const Profile: FC<ProfileProps> = ({ segmentData, styles }) => {
  const scores = useScores();
  const quirks = useQuirks();
  const [cookies] = useCookies();

  const scoresForDisplay = useMemo(() => Object.entries(scores), [scores]);
  const quirksForDisplay = useMemo(() => Object.entries(quirks), [quirks]);

  if (!NEXT_PUBLIC_ANALYTICS_WRITE_KEY) {
    return (
      <InformationContent
        title="Segment is not configured"
        text="Please provide correct env variables"
        className="text-secondary-content"
      />
    );
  }

  return (
    <div className={classNames('flex flex-col gap-6 text-secondary-content', styles?.container)}>
      <div className="flex flex-col gap-8">
        <p className="font-bold text-3xl">Identities:</p>
        <div className="flex flex-row gap-4">
          <Image
            src="https://res.cloudinary.com/uniform-demos/image/upload/v1692282972/csk-icons/icon-profile_kdp16b_stik6h.svg"
            width={50}
            height={50}
            alt="profile icon"
            unoptimized
          />
          <div>
            <p className="font-bold text-1xl">anonymous_id</p>
            <p className="font-bold text-gray-600">{cookies['ajs_anonymous_id']}</p>
          </div>
        </div>
        <OverrideAnonymousId />
      </div>
      <hr />
      <div>
        <p className="font-bold text-3xl">Current visitor scores from Uniform Tracker:</p>
        <div className="flex flex-row flex-wrap gap-2 pt-2">
          {scoresForDisplay.length ? (
            scoresForDisplay.map(([key, value]) => <TrackerItem key={key} name={key} value={String(value)} />)
          ) : (
            <div className="rounded-2xl p-3 bg-gray-200 w-1/4 ">
              <span className="text-center block">No &quot;Scores&quot; for this profile </span>
            </div>
          )}
        </div>
      </div>
      <hr />
      <div>
        <p className="font-bold text-3xl">Current visitor quirks from Uniform Tracker:</p>
        <div className="flex flex-row flex-wrap gap-2 pt-2">
          {quirksForDisplay.length ? (
            quirksForDisplay.map(([key, value]) => <TrackerItem key={key} name={key} value={String(value)} />)
          ) : (
            <div className="rounded-2xl p-3 bg-gray-200 w-1/4 ">
              <span className="text-center block">No &quot;Quirks&quot; for this profile </span>
            </div>
          )}
        </div>
      </div>
      <hr />
      <div>
        <p className="font-bold text-3xl">Segment traits:</p>
        <Traits traits={segmentData?.traits} />
      </div>
    </div>
  );
};

export default Profile;
