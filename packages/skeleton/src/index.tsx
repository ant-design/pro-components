import React from 'react';
import ListPageSkeleton, {
  ListPageSkeletonProps,
  PageHeaderSkeleton,
  ListToolbarSkeleton,
  ListSkeleton,
  ListSkeletonItem,
} from './component/list';
import ResultPageSkeleton from './component/result';

const PageSkeleton: React.FC<
  ListPageSkeletonProps & {
    type?: 'list';
    active?: boolean;
  }
> = ({ type = 'list', ...rest }) => {
  if (type === 'list') {
    return <ListPageSkeleton {...rest} />;
  }
  if (type === 'result') {
    return <ResultPageSkeleton {...rest} />;
  }
  return null;
};

export {
  ListPageSkeleton,
  ListSkeleton,
  ListSkeletonItem,
  PageHeaderSkeleton,
  ListToolbarSkeleton,
};

export default PageSkeleton;
