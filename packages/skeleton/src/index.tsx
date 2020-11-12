import React from 'react';
import ListPageSkeleton, {
  ListPageSkeletonProps,
  PageHeaderSkeleton,
  ListToolbarSkeleton,
  ListSkeleton,
  ListSkeletonItem,
} from './component/List';
import ResultPageSkeleton from './component/Result';
import DescriptionsPageSkeleton, {
  TableItemSkeleton,
  DescriptionsSkeleton,
  DescriptionsPageSkeletonProps,
  TableSkeleton,
} from './component/Descriptions';

const PageSkeleton: React.FC<
  ListPageSkeletonProps &
    DescriptionsPageSkeletonProps & {
      type?: 'list' | 'result' | 'descriptions';
      active?: boolean;
    }
> = ({ type = 'list', ...rest }) => {
  if (type === 'result') {
    return <ResultPageSkeleton {...rest} />;
  }
  if (type === 'descriptions') {
    return <DescriptionsPageSkeleton {...rest} />;
  }
  return <ListPageSkeleton {...rest} />;
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
