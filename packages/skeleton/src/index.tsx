import React from 'react';
import ListPageSkeleton, {
  ListPageSkeletonProps,
  PageHeaderSkeleton,
  ListToolbarSkeleton,
  ListSkeleton,
  ListSkeletonItem,
} from './component/list';
import ResultPageSkeleton from './component/result';
import DescriptionsPageSkeleton, {
  TableItemSkeleton,
  DescriptionsSkeleton,
  TableSkeleton,
} from './component/descriptions';

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
  if (type === 'descriptions') {
    return <DescriptionsPageSkeleton {...rest} />;
  }
  return <ResultPageSkeleton {...rest} />;
};

export {
  ListPageSkeleton,
  ListSkeleton,
  ListSkeletonItem,
  PageHeaderSkeleton,
  ListToolbarSkeleton,
  DescriptionsSkeleton,
  TableSkeleton,
  TableItemSkeleton,
};

export default PageSkeleton;
