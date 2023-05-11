import type { ImageProps } from 'antd';
import { Image, Typography } from 'antd';
import type { AnchorHTMLAttributes } from 'react';
import { useEffect, useRef } from 'react';
import React, { useContext } from 'react';
import type { ProHelpDataSourceChildren } from './HelpProvide';
import { ProHelpProvide } from './HelpProvide';
import { SelectKeyProvide } from './ProHelpPanel';

// HTML渲染组件，接收一个字符串形式的html作为props
// 可选接收className作为组件的样式类名
const HTMLRender: React.FC<{
  children: string;
  className?: string;
}> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  // 当html发生变化时，将其渲染到ref.current的innerHTML中
  useEffect(() => {
    if (ref.current) ref.current.innerHTML = props.children;
  }, [props.children]);
  // 返回一个div元素作为容器，并传递ref和className作为props
  return <div ref={ref} className={props.className || 'inner-html'} />;
};

const NavigationSwitch: React.FC<{
  children: string;
  selectKey: string;
}> = (props) => {
  const context = useContext(SelectKeyProvide);
  return (
    <Typography.Text>
      <a
        data-testid="navigation-switch"
        onClick={() => {
          context.setSelectedKey(props.selectKey);
        }}
      >
        {props.children}
      </a>
    </Typography.Text>
  );
};

export const RenderContentPanel: React.FC<{
  dataSourceChildren: ProHelpDataSourceChildren<any>[];
  onInit?: (ref: HTMLDivElement) => void;
}> = ({ dataSourceChildren, onInit }) => {
  const { valueTypeMap } = useContext(ProHelpProvide);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onInit?.(divRef.current!);
  }, [dataSourceChildren]);

  /**
   * itemRender 的定义
   * @param {ProHelpDataSourceChildren} item
   * @param {number} index
   * @return {*}
   */
  const itemRender = (item: ProHelpDataSourceChildren, index: number) => {
    // 自定义的渲染，优先级最高
    if (valueTypeMap.has(item.valueType)) {
      return (
        <React.Fragment key={index}>
          {valueTypeMap.get(item.valueType)?.(item, index)}
        </React.Fragment>
      );
    }
    if (item.valueType === 'html') {
      return (
        <HTMLRender
          key={index}
          {...(item.children as {
            className: string;
            children: string;
          })}
        />
      );
    }

    if (item.valueType === 'h1') {
      return (
        <Typography.Title
          key={index}
          style={{
            marginTop: 0,
          }}
          level={3}
        >
          {item.children as string}
        </Typography.Title>
      );
    }

    if (item.valueType === 'h2') {
      return (
        <Typography.Title
          key={index}
          style={{
            marginTop: 20,
          }}
          level={5}
        >
          {item.children as string}
        </Typography.Title>
      );
    }
    if (item.valueType === 'image') {
      return (
        <div
          key={index}
          style={{
            marginBlock: 12,
          }}
        >
          <Image {...(item.children as ImageProps)} />
        </div>
      );
    }
    if (item.valueType === 'inlineLink') {
      return (
        <Typography.Text key={index}>
          <a {...(item.children as AnchorHTMLAttributes<HTMLAnchorElement>)} />
        </Typography.Text>
      );
    }
    if (item.valueType === 'link') {
      return (
        <div key={index}>
          <Typography.Text key={index}>
            <a
              {...(item.children as AnchorHTMLAttributes<HTMLAnchorElement>)}
            />
          </Typography.Text>
        </div>
      );
    }
    if (item.valueType === 'navigationSwitch') {
      return (
        <NavigationSwitch
          key={index}
          {...(item.children as {
            children: string;
            selectKey: string;
          })}
        />
      );
    }
    return (
      <Typography.Text key={index}>{item.children as string}</Typography.Text>
    );
  };

  return <div ref={divRef}>{dataSourceChildren?.map(itemRender)}</div>;
};
