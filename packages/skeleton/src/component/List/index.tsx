import React from 'react';
import useMediaQuery from 'use-media-antd-query';
import { Skeleton, Card, Space, Divider } from 'antd';

/** 一条分割线 */
export const Line = ({ padding }: { padding?: string | number }) => (
  <div
    style={{
      padding: padding || '0 24px',
    }}
  >
    <Divider style={{ margin: 0 }} />
  </div>
);

export const MediaQueryKeyEnum = {
  xs: 2,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 6,
  xxl: 6,
};

const StatisticSkeleton: React.FC<{
  size?: number;
  active?: boolean;
}> = ({ size, active }) => {
  const colSize = useMediaQuery();
  const arraySize = size === undefined ? MediaQueryKeyEnum[colSize] || 6 : size;
  const firstWidth = (index: number) => {
    if (arraySize > 2 && index !== 0) {
      return 42;
    }
    if (index === 0) {
      return 0;
    }
    return 16;
  };
  return (
    <Card
      bordered={false}
      style={{
        marginBottom: 16,
      }}
    >
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
              borderLeft: arraySize > 2 && index === 1 ? '1px solid rgba(0,0,0,0.06)' : undefined,
              paddingLeft: firstWidth(index),
              flex: 1,
              marginRight: index === 0 ? 16 : 0,
            }}
          >
            <Skeleton
              active={active}
              paragraph={false}
              title={{
                width: 100,
                style: { marginTop: 0 },
              }}
            />
            <Skeleton.Button
              active={active}
              style={{
                height: 48,
              }}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

/** 列表子项目骨架屏 */
export const ListSkeletonItem: React.FC<{ active: boolean }> = ({ active }) => (
  <>
    <Card
      bordered={false}
      // eslint-disable-next-line react/no-array-index-key
      style={{
        borderRadius: 0,
      }}
      bodyStyle={{
        padding: 24,
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            maxWidth: '100%',
            flex: 1,
          }}
        >
          <Skeleton
            active={active}
            title={{
              width: 100,
              style: {
                marginTop: 0,
              },
            }}
            paragraph={{
              rows: 1,
              style: {
                margin: 0,
              },
            }}
          />
        </div>
        <Skeleton.Button active={active} size="small" style={{ width: 165, marginTop: 12 }} />
      </div>
    </Card>
    <Line />
  </>
);

/** 列表骨架屏 */
export const ListSkeleton: React.FC<{
  size: number;
  active?: boolean;
  actionButton?: boolean;
}> = ({ size, active = true, actionButton }) => (
  <Card
    bordered={false}
    bodyStyle={{
      padding: 0,
    }}
  >
    {new Array(size).fill(null).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <ListSkeletonItem key={index} active={!!active} />
    ))}

    {actionButton !== false && (
      <Card
        bordered={false}
        style={{
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
        }}
        bodyStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Skeleton.Button
          style={{
            width: 102,
          }}
          active={active}
          size="small"
        />
      </Card>
    )}
  </Card>
);

/**
 * 面包屑的 骨架屏
 *
 * @param param0
 */
export const PageHeaderSkeleton = ({ active }: { active: boolean }) => (
  <div
    style={{
      marginBottom: 16,
    }}
  >
    <Skeleton
      paragraph={false}
      title={{
        width: 185,
      }}
    />
    <Skeleton.Button active={active} size="small" />
  </div>
);

export type ListPageSkeletonProps = {
  active?: boolean;
  pageHeader?: false;
  statistic?: number | false;
  actionButton?: false;
  toolbar?: false;
  list?: number | false;
};

/**
 * 列表操作栏的骨架屏
 *
 * @param param0
 */
export const ListToolbarSkeleton = ({ active }: { active: boolean }) => (
  <Card
    bordered={false}
    style={{
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    }}
    bodyStyle={{
      paddingBottom: 8,
    }}
  >
    <Space
      style={{
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Skeleton.Button active={active} style={{ width: 200 }} size="small" />
      <Space>
        <Skeleton.Button active={active} size="small" style={{ width: 120 }} />
        <Skeleton.Button active={active} size="small" style={{ width: 80 }} />
      </Space>
    </Space>
  </Card>
);

const ListPageSkeleton: React.FC<ListPageSkeletonProps> = ({
  active = true,
  statistic,
  actionButton,
  toolbar,
  pageHeader,
  list = 5,
}) => (
  <div
    style={{
      width: '100%',
    }}
  >
    {pageHeader !== false && <PageHeaderSkeleton active={active} />}
    {statistic !== false && <StatisticSkeleton size={statistic as number} active={active} />}
    {(toolbar !== false || list !== false) && (
      <Card
        bordered={false}
        bodyStyle={{
          padding: 0,
        }}
      >
        {toolbar !== false && <ListToolbarSkeleton active={active} />}
        {list !== false && (
          <ListSkeleton size={list as number} active={active} actionButton={actionButton} />
        )}
      </Card>
    )}
  </div>
);

export default ListPageSkeleton;
