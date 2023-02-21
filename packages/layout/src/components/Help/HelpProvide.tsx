import { ImageProps } from 'antd';
import React, { AnchorHTMLAttributes } from 'react';

type ProHelpDataSourceContentType = {
  h1: string;
  h2: string;
  link: {
    children: string;
  } & AnchorHTMLAttributes<HTMLAnchorElement>;
  inlineLink: {
    children: string;
  } & AnchorHTMLAttributes<HTMLAnchorElement>;
  text: string;
  image: ImageProps;
};

type ProHelpDataSourceChildrenType = Extract<keyof ProHelpDataSourceContentType, any>;

type ProHelpDataSourceContentProps<ValueType = 'text'> =
  ValueType extends ProHelpDataSourceChildrenType
    ? ProHelpDataSourceContentType[ValueType]
    : ProHelpDataSourceContentType[ProHelpDataSourceChildrenType];

export type ProHelpDataSourceChildren<ValueType = 'text'> = {
  valueType: ValueType | ProHelpDataSourceChildrenType;
  children: ProHelpDataSourceContentProps<ValueType>;
};

export type ProHelpDataSource<ValueType = 'text'> = {
  key: string;
  title: string;
  children: {
    key: string;
    title: string;
    children: ProHelpDataSourceChildren<ValueType>[];
  }[];
};

export const ProHelpProvide = React.createContext<{
  dataSource: ProHelpDataSource<any>[];
}>({ dataSource: [] });
