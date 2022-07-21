import React from 'react';
import type { DescriptionsPageSkeletonProps } from './component/Descriptions';
import DescriptionsPageSkeleton, {
  DescriptionsSkeleton,
  TableItemSkeleton,
  TableSkeleton,
} from './component/Descriptions';
import type { ListPageSkeletonProps } from './component/List';
import ListPageSkeleton, {
  ListSkeleton,
  ListSkeletonItem,
  ListToolbarSkeleton,
  PageHeaderSkeleton,
} from './component/List';
import ResultPageSkeleton from './component/Result';

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
