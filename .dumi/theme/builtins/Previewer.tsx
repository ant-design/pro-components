import React from 'react';
import LazyLoad from 'react-lazyload';
import ProSkeleton from '@ant-design/pro-skeleton';
import PreView, { IPreviewerProps } from 'dumi-theme-default/src/builtins/Previewer';

export default ({ children, ...rest }: IPreviewerProps) => {
  return (
    <LazyLoad height={500} offset={300} placeholder={<ProSkeleton type="descriptions" />} once>
      <PreView {...rest}>{children}</PreView>
    </LazyLoad>
  );
};
