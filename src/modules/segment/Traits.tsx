import { FC } from 'react';
import TrackerItem from './TrackerItem';

interface TraitsProps {
  traits?: Segment.SegmentData['traits'];
}

const Traits: FC<TraitsProps> = ({ traits = {} }) => (
  <div className="flex flex-row flex-wrap gap-2 pt-2">
    {Object.keys(traits).length ? (
      Object.entries(traits).map(([key, value]) => <TrackerItem key={key} name={key} value={String(value)} />)
    ) : (
      <div className="rounded-2xl p-3 bg-gray-200 w-1/4 ">
        <span className="text-center block">No &quot;Traits&quot; for this profile </span>
      </div>
    )}
  </div>
);

export default Traits;
