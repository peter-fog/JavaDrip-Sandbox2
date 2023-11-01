import { FC } from 'react';

interface TrackerItemProps {
  name: string;
  value: string;
}

const TrackerItem: FC<TrackerItemProps> = ({ name, value }) => (
  <div className="flex flex-row gap-1 rounded-2xl p-3 bg-gray-200">
    <span className="capitalize">{name}</span>:<span>{value}</span>
  </div>
);

export default TrackerItem;
