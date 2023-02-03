import { Button, ConfigProvider } from 'antd';
import { Link } from 'dumi';
import isEqual from 'fast-deep-equal';
import { type FC } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import HeroButton from './HeroButton';

import { useSiteStore } from '../../store/useSiteStore';
import { useStyles } from './style';

const Hero: FC = () => {
  const frontmatter = useSiteStore((s) => s.routeMeta.frontmatter, isEqual);

  const { styles, cx } = useStyles();

  if (!('hero' in frontmatter)) return null;

  const hero = frontmatter.hero!;
  return (
    <Flexbox horizontal distribution={'center'} className={styles.container}>
      <div className={styles.canvas}></div>
      <Center>
        {frontmatter.hero!.title && (
          <div className={styles.titleContainer}>
            <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: hero.title! }} />
            <div
              className={cx(styles.titleShadow)}
              dangerouslySetInnerHTML={{ __html: hero.title! }}
            ></div>
          </div>
        )}
        {hero.description && (
          <p className={styles.desc} dangerouslySetInnerHTML={{ __html: hero.description }} />
        )}
        {Boolean(frontmatter.hero!.actions?.length) && (
          <ConfigProvider theme={{ token: { fontSize: 16, controlHeight: 40 } }}>
            <Flexbox horizontal gap={24} className={styles.actions}>
              {frontmatter.hero!.actions!.map(({ text, link }, index) => (
                <Link key={text} to={link}>
                  {index === 0 ? (
                    <HeroButton>{text}</HeroButton>
                  ) : (
                    <Button size={'large'} shape={'round'} type={'default'}>
                      {text}
                    </Button>
                  )}
                </Link>
              ))}
            </Flexbox>
          </ConfigProvider>
        )}
      </Center>
    </Flexbox>
  );
};

export default Hero;
