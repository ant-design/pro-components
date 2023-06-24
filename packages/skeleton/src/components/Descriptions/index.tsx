import { Card, Skeleton } from 'antd';
import React from 'react';
import useMediaQuery from 'use-media-antd-query';
import { Line, PageHeaderSkeleton } from '../List';

export type DescriptionsPageSkeletonProps = {
  active?: boolean;
  pageHeader?: false;
  list?: false | number;
};

const MediaQueryKeyEnum = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 3,
  xxl: 4,
};

const DescriptionsLargeItemSkeleton: React.FC<{
  active?: boolean;
}> = ({ active }) => (
  <div
    style={{
      marginBlockStart: 32,
    }}
  >
    <Skeleton.Button
      active={active}
      size="small"
      style={{ width: 100, marginBlockEnd: 16 }}
    />
    <div
      style={{
        width: '100%',
        justifyContent: 'space-between',
        display: 'flex',
      }}
    >
      <div
        style={{
          flex: 1,
          marginInlineEnd: 24,
          maxWidth: 300,
        }}
      >
        <Skeleton
          active={active}
          paragraph={false}
          title={{
            style: { marginBlockStart: 0 },
          }}
        />
        <Skeleton
          active={active}
          paragraph={false}
          title={{
            style: { marginBlockStart: 8 },
          }}
        />
        <Skeleton
          active={active}
          paragraph={false}
          title={{
            style: { marginBlockStart: 8 },
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 300,
            margin: 'auto',
          }}
        >
          <Skeleton
            active={active}
            paragraph={false}
            title={{
              style: { marginBlockStart: 0 },
            }}
          />
          <Skeleton
            active={active}
            paragraph={false}
            title={{
              style: { marginBlockStart: 8 },
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

const DescriptionsItemSkeleton: React.FC<{
  size?: number;
  active?: boolean;
}> = ({ size, active }) => {
  const colSize = useMediaQuery();
  const arraySize = size === undefined ? MediaQueryKeyEnum[colSize] || 3 : size;
  return (
    <div
      style={{
        width: '100%',
        justifyContent: 'space-between',
        display: 'flex',
      }}
    >
      {new Array(arraySize).fill(null).map((_, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{
            flex: 1,
            paddingInlineStart: index === 0 ? 0 : 24,
            paddingInlineEnd: index === arraySize - 1 ? 0 : 24,
          }}
        >
          <Skeleton
            active={active}
            paragraph={false}
            title={{
              style: { marginBlockStart: 0 },
            }}
          />
          <Skeleton
            active={active}
            paragraph={false}
            title={{
              style: { marginBlockStart: 8 },
            }}
          />
          <Skeleton
            active={active}
            paragraph={false}
            title={{
              style: { marginBlockStart: 8 },
            }}
          />
        </div>
      ))}
    </div>
  );
};

/**
 * Table 的子项目骨架屏
 *
 * @param param0
 */
export const TableItemSkeleton = ({
  active,
  header = false,
}: {
  active: boolean;
  header?: boolean;
}) => {
  const colSize = useMediaQuery();
  const arraySize = MediaQueryKeyEnum[colSize] || 3;
  return (
    <>
      <div
        style={{
          display: 'flex',
          background: header ? 'rgba(0,0,0,0.02)' : 'none',
          padding: '24px 8px',
        }}
      >
        {new Array(arraySize).fill(null).map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            style={{
              flex: 1,
              paddingInlineStart: header && index === 0 ? 0 : 20,
              paddingInlineEnd: 32,
            }}
          >
            <Skeleton
              active={active}
              paragraph={false}
              title={{
                style: {
                  margin: 0,
                  height: 24,
                  width: header ? '75px' : '100%',
                },
              }}
            />
          </div>
        ))}
        <div
          style={{
            flex: 3,
            paddingInlineStart: 32,
          }}
        >
          <Skeleton
            active={active}
            paragraph={false}
            title={{
              style: { margin: 0, height: 24, width: header ? '75px' : '100%' },
            }}
          />
        </div>
      </div>
      <Line padding="0px 0px" />
    </>
  );
};

/**
 * Table 骨架屏
 *
 * @param param0
 */
export const TableSkeleton: React.FC<{
  active: boolean;
  size?: number;
}> = ({ active, size = 4 }) => (
  <Card bordered={false}>
    <Skeleton.Button
      active={active}
      size="small"
      style={{ width: 100, marginBlockEnd: 16 }}
    />
    <TableItemSkeleton header active={active} />
    {new Array(size).fill(null).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <TableItemSkeleton key={index} active={active} />
    ))}
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingBlockStart: 16,
      }}
    >
      <Skeleton
        active={active}
        paragraph={false}
        title={{
          style: {
            margin: 0,
            height: 32,
            float: 'right',
            maxWidth: '630px',
          },
        }}
      />
    </div>
  </Card>
);
export const DescriptionsSkeleton = ({ active }: { active: boolean }) => (
  <Card
    bordered={false}
    style={{
      borderStartEndRadius: 0,
      borderTopLeftRadius: 0,
    }}
  >
    <Skeleton.Button
      active={active}
      size="small"
      style={{ width: 100, marginBlockEnd: 16 }}
    />
    <DescriptionsItemSkeleton active={active} />
    <DescriptionsLargeItemSkeleton active={active} />
  </Card>
);

const DescriptionsPageSkeleton: React.FC<DescriptionsPageSkeletonProps> = ({
  active = true,
  pageHeader,
  list,
}) => (
  <div
    style={{
      width: '100%',
    }}
  >
    {pageHeader !== false && <PageHeaderSkeleton active={active} />}
    <DescriptionsSkeleton active={active} />
    {list !== false && <Line />}
    {list !== false && <TableSkeleton active={active} size={list} />}
  </div>
);

export default DescriptionsPageSkeleton;
