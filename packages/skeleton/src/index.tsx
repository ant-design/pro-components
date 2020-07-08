import React from 'react';
import ListPageSkeleton from './component/list';

const PageSkeleton: React.FC<{
  type?: 'list';
  active?: boolean;
}> = ({ type = 'list', active }) => {
  if (type === 'list') {
    return <ListPageSkeleton active={active} />;
  }
  return null;
};

export { ListPageSkeleton };

export default PageSkeleton;
