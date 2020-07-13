import React from 'react';
import ListPageSkeleton, { ListPageSkeletonProps } from './component/list';

const PageSkeleton: React.FC<
  ListPageSkeletonProps & {
    type?: 'list';
    active?: boolean;
  }
> = ({ type = 'list', ...rest }) => {
  if (type === 'list') {
    return <ListPageSkeleton {...rest} />;
  }
  return null;
};

export { ListPageSkeleton };

export default PageSkeleton;
