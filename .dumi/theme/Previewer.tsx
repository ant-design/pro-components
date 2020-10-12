import React from 'react';
import LazyLoad from 'react-lazyload';
import PreView from 'dumi-theme-default/src/builtins/Previewer';

export default ({ children, ...rest }) => {
  console.log(rest);
  return (
    <LazyLoad height={300} offset={100}>
      <PreView {...rest}>{children}</PreView>
    </LazyLoad>
  );
};
