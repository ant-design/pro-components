import { CSSProperties, type FC } from 'react';

import FeatureItem, { IFeature } from './Item';
import { useStyles } from './style';

export interface FeaturesProps {
  items: IFeature[];
  style?: CSSProperties;
}

const Features: FC<FeaturesProps> = ({ items, style }) => {
  const { styles } = useStyles();

  if (!Boolean(items?.length)) return null;

  return (
    <div className={styles.container} style={style}>
      {items!.map((item) => {
        return <FeatureItem key={item.title} {...item} />;
      })}
    </div>
  );
};

export default Features;
