import { useStyle } from '@ant-design/pro-provider';
import { ConfigProvider, Select } from 'antd';
import React, { useState } from 'react';
import { useContext } from 'react';
import { ProHelpProvide } from './HelpProvide';

/**
 * 在一段文本中高亮显示指定的关键词，将文本和匹配项分别处理并放入数组中，最终返回包含高亮文本的组件。
 * 在组件中使用了正则表达式来匹配关键词。
 * 在渲染文本时，使用了React.createElement来创建元素。
 */
export const Highlight: React.FC<{
  /**
   * 要高亮的文本
   */
  label: string;
  /**
   * 高亮的关键词数组
   */
  words: string[];
}> = ({ label, words }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const lightCls = getPrefixCls('pro-help-search-list-item-content-light');
  const optionCls = getPrefixCls('pro-help-search-list-item-content');

  // css
  const { wrapSSR } = useStyle('Highlight', (token) => {
    return {
      [`.${lightCls}`]: {
        color: token.colorPrimary,
      },
      [`.${optionCls}`]: {
        flex: 'auto',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    };
  });

  if (words.length === 0) return <>{label}</>;

  // 创建正则表达式匹配关键词
  const matchKeywordsRE = new RegExp(
    words.map((word) => word.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')).join('|'),
    'gi',
  );

  let matchText = label;

  const elements: React.ReactNode[] = [];

  // 遍历匹配的文本，将匹配项和非匹配项分别处理并放入elements数组中
  while (matchText.length) {
    const match = matchKeywordsRE.exec(matchText);
    if (!match) {
      elements.push(matchText);
      break;
    }

    const start = match.index;
    const matchLength = match[0].length + start;

    elements.push(
      matchText.slice(0, start),
      React.createElement(
        'span',
        {
          className: lightCls,
        },
        matchText.slice(start, matchLength),
      ),
    );
    matchText = matchText.slice(matchLength);
  }
  return wrapSSR(
    React.createElement(
      'div',
      {
        title: label,
        className: optionCls,
      },
      ...elements,
    ),
  );
};

export const ProHelpSelect: React.FC = () => {
  const { dataSource } = useContext(ProHelpProvide);
  const [keyWord, setKeyWork] = useState<string>('');
  console.log(
    dataSource.map((item) => {
      return {
        title: item.title,
        key: item.key,
      };
    }),
  );
  return (
    <Select
      onSearch={(value) => {
        setKeyWork(value);
      }}
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option?.title ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={dataSource.map((item) => {
        return {
          label: <Highlight label={item.title} words={[keyWord].filter(Boolean)} />,
          title: item.title,
          key: item.key,
        };
      })}
    />
  );
};
