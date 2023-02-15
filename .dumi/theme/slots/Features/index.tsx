import Features from '../../components/Features';
import { type FC } from 'react';
import { shallow } from 'zustand/shallow';

import { featuresSel, useSiteStore } from '../../store/useSiteStore';

const FeaturesSlot: FC = () => {
  const features = useSiteStore(featuresSel, shallow);

  if (!Boolean(features?.length)) return null;

  return <Features items={features || []} />;
};

export default FeaturesSlot;
