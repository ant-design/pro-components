import React from 'react';
import LazyLoad from 'react-lazyload';
import PreView, { IPreviewerProps } from 'dumi-theme-default/src/builtins/Previewer';

export default ({ children, ...rest }: IPreviewerProps) => {
  return (
    <LazyLoad height={500} offset={300} once>
      <PreView {...rest}>{children}</PreView>
    </LazyLoad>
  );
};
