import { ArrowRightOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { Link } from 'dumi';
import { type FC } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { useStyles } from './Item.style';

export type IFeature = {
  title: string;
  description?: string;
  avatar?: string;
  link?: string;
  imageStyle?: React.CSSProperties;
  row?: number;
  column?: number;
  center?: boolean;
};

const FeatureItem: FC<IFeature> = ({
  imageStyle,
  row,
  column,
  center,
  description,
  avatar,
  title,
  link,
}) => {
  const rowNum = row || 7;
  const { styles, theme } = useStyles(rowNum);

  return (
    <div
      className={styles.container}
      style={{
        gridRow: `span ${rowNum}`,
        gridColumn: `span ${column || 1}`,
        cursor: link ? 'pointer' : 'default',
      }}
      onClick={() => {
        if (!link) return;

        window.open(link);
      }}
    >
      <div className={styles.cell}>
        {avatar && (
          <Center image-style={imageStyle} className={styles.imgContainer}>
            <img className={styles.img} src={avatar} alt={title} />
          </Center>
        )}
        {title && (
          <Flexbox as={'h3'} horizontal gap={8} align={'center'} className={styles.title}>
            {title}
            {imageStyle === 'soon' ? (
              <Tag
                color={theme.isDarkMode ? 'pink-inverse' : 'cyan-inverse'}
                // style={{ border: 'none' }}
              >
                SOON
              </Tag>
            ) : null}
          </Flexbox>
        )}
        {description && (
          <p dangerouslySetInnerHTML={{ __html: description }} className={styles.desc} />
        )}
        {link && (
          <div className={styles.link}>
            <Link to={link}>
              立即了解 <ArrowRightOutlined />
            </Link>
          </div>
        )}
      </div>
      {center && <div className={styles.blur} />}
    </div>
  );
};

export default FeatureItem;
