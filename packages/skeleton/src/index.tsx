import 'antd/lib/skeleton/style';
import React from 'react';
import type { DescriptionsPageSkeletonProps } from './components/Descriptions';
import DescriptionsPageSkeleton, {
  DescriptionsSkeleton,
  TableItemSkeleton,
  TableSkeleton,
} from './components/Descriptions';
import type { ListPageSkeletonProps } from './components/List';
import ListPageSkeleton, {
  ListSkeleton,
  ListSkeletonItem,
  ListToolbarSkeleton,
  PageHeaderSkeleton,
} from './components/List';
import ResultPageSkeleton from './components/Result';

const ProSkeleton: React.FC<
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
  DescriptionsSkeleton,
  ListPageSkeleton,
  ListSkeleton,
  ListSkeletonItem,
  ListToolbarSkeleton,
  PageHeaderSkeleton,
  ProSkeleton,
  TableItemSkeleton,
  TableSkeleton,
};

export default ProSkeleton;
