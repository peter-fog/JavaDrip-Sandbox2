import { FC, ReactNode, createContext, useContext } from 'react';
import SegmentProvider from './SegmentProvider';

export const SegmentDataContext = createContext<Segment.SegmentData | undefined>(undefined);

interface Props {
  children: ReactNode;
  data?: Segment.SegmentData;
}

const SegmentDataContextProvider: FC<Props> = ({ children, data }) => (
  <SegmentDataContext.Provider value={data}>
    <SegmentProvider />
    {children}
  </SegmentDataContext.Provider>
);

export default SegmentDataContextProvider;

export const useSegmentDataContext = () => useContext(SegmentDataContext);
