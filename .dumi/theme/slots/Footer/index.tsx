import { Divider, Typography } from 'antd';
import { createStyles, useResponsive } from 'antd-style';
import { useSiteData } from 'dumi';
import { type FC } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

const useStyles = createStyles(
  ({ css, responsive, token }) => css`
    grid-area: footer;
    border-top: 1px solid ${token.colorSplit};
    color: ${token.colorTextDescription};
    font-size: 14px;
    line-height: 26px;
    text-align: center;
    padding: 24px 0;
    align-self: stretch;

    ${responsive.mobile} {
      border: none;
      flex-direction: column;
    }
  `,
);

const Footer: FC = () => {
  const { themeConfig } = useSiteData();
  const { styles } = useStyles();
  const { mobile } = useResponsive();
  if (!themeConfig.footer) return null;

  return mobile ? (
    <Center horizontal className={styles}>
      <Flexbox align={'center'} horizontal>
        Powered by
        <Typography.Link href="https://d.umijs.org/" style={{ marginLeft: 8 }}>
          Dumi
        </Typography.Link>
        <Divider type={'vertical'} style={{ margin: '0 8px' }} />
        <Typography.Link href="https://ant.design/">Ant Design</Typography.Link>
        <Divider type={'vertical'} style={{ margin: '0 8px' }} />
        <Typography.Link href="https://kitchen.alipay.com/">kitchen</Typography.Link>
      </Flexbox>
    </Center>
  ) : (
    <Center horizontal className={styles}>
      Powered by
      <Flexbox align={'center'} horizontal style={{ marginLeft: 8 }}>
        <Typography.Link href="https://d.umijs.org/">Dumi</Typography.Link>
        <Divider type={'vertical'} style={{ margin: '0 8px' }} />
        <Typography.Link href="https://ant.design/">Ant Design</Typography.Link>
        <Divider type={'vertical'} style={{ margin: '0 8px' }} />
        <Typography.Link href="https://kitchen.alipay.com/">kitchen</Typography.Link>
      </Flexbox>
    </Center>
  );
};

export default Footer;
