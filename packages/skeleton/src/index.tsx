import React from 'react';
import type { ListPageSkeletonProps } from './component/List';
import ListPageSkeleton, {
  PageHeaderSkeleton,
  ListToolbarSkeleton,
  ListSkeleton,
  ListSkeletonItem,
} from './component/List';
import ResultPageSkeleton from './component/Result';
import type { DescriptionsPageSkeletonProps } from './component/Descriptions';
import DescriptionsPageSkeleton, {
  TableItemSkeleton,
  DescriptionsSkeleton,
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
