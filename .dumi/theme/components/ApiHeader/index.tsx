import { EditOutlined, GithubFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import { styled } from 'antd-style';
import { FC, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import Code from '../CodeSnippet';
import NpmFilled from './NpmFilled';

import { useStyles } from './style';

const Label = styled(Typography.Text)`
  width: 100px;
`;

interface ApiTitleProps {
  title: string;
  description?: string;
}
const REPO_BASE = `https://github.com/arvinxx/antd-style`;

export const ApiHeader: FC<ApiTitleProps> = memo(({ title, description }) => {
  const { styles, theme } = useStyles();

  const items = [
    {
      label: '引入方法',
      import: true,
      children: `import { ${title} } from "antd-style";`,
    },
    {
      label: '源码',
      icon: <GithubFilled />,
      children: '查看源码',
      url: `${REPO_BASE}/tree/master/src/${title}`,
    },
    {
      label: '文档',
      icon: <EditOutlined />,
      children: '编辑文档',
      url: `${REPO_BASE}/tree/master/docs/api/${title}`,
    },
    {
      label: '产物',
      icon: <NpmFilled />,
      children: 'antd-style',
      url: 'https://www.npmjs.com/package/antd-style?activeTab=explore',
    },
  ];

  return (
    <Flexbox>
      <Typography.Title className={styles.title}>{title}</Typography.Title>
      {description && (
        <div>
          <Typography.Text type={'secondary'} className={styles.desc}>
            {description}
          </Typography.Text>
        </div>
      )}
      <Flexbox style={{ marginTop: 24 }} gap={12}>
        {items.map((item) => (
          <Flexbox horizontal key={item.label}>
            <Label type={'secondary'}>{item.label}</Label>
            {item.import ? (
              <Code>{item.children}</Code>
            ) : (
              <a href={item.url} target={'_blank'}>
                <Flexbox horizontal align={'center'} gap={8} className={styles.text}>
                  <>{item.icon}</>
                  <>{item.children}</>
                </Flexbox>
              </a>
            )}
          </Flexbox>
        ))}
      </Flexbox>
    </Flexbox>
  );
});
