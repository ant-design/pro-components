import { Helmet, useOutlet } from 'dumi';
import isEqual from 'fast-deep-equal';
import { memo, type FC } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import Content from 'dumi/theme/slots/Content';
import Footer from 'dumi/theme/slots/Footer';
import Header from 'dumi/theme/slots/Header';
import Sidebar from 'dumi/theme/slots/Sidebar';

import { ApiHeader } from '../../components/ApiHeader';

import { useResponsive } from 'antd-style';
import { isApiPageSel, useSiteStore } from '../../store/useSiteStore';
import { useStyles } from './styles';

const Docs: FC = memo(() => {
  const outlet = useOutlet();
  const { mobile } = useResponsive();
  const fm = useSiteStore((s) => s.routeMeta.frontmatter, isEqual);
  const isApiPage = useSiteStore(isApiPageSel);

  const { styles, theme } = useStyles();

  return (
    <div className={styles.layout}>
      <Header />
      {mobile ? null : <Sidebar />}
      {isApiPage ? (
        <Flexbox style={{ gridArea: 'title' }}>
          <Center>
            <Flexbox style={{ maxWidth: theme.contentMaxWidth, width: '100%' }}>
              <Flexbox padding={'0 48px'}>
                <ApiHeader title={fm.title} description={fm.description} />
              </Flexbox>
            </Flexbox>
          </Center>
        </Flexbox>
      ) : null}
      <Flexbox
        style={{
          zIndex: 10,
          gridArea: 'main',
          width: 0,
          margin: mobile ? 0 : 24,
          marginBottom: mobile ? 0 : 48,
        }}
      >
        <Center width={'100%'}>
          <Flexbox className={styles.content}>
            <Flexbox horizontal>
              <Content>{outlet}</Content>
            </Flexbox>
          </Flexbox>
        </Center>
      </Flexbox>
      <Footer />
    </div>
  );
});

export default Docs;
