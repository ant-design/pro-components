import { Card, Divider, Skeleton, Space } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import React, { useMemo } from 'react';

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
  const defaultCol = useMemo(
    () => ({
      lg: true,
      md: true,
      sm: false,
      xl: false,
      xs: false,
      xxl: false,
    }),
    [],
  );
  const col = useBreakpoint() || defaultCol;

  const colSize = Object.keys(col).filter((key) => col[key as 'md'] === true)[0] || 'md';

  const arraySize = size === undefined ? MediaQueryKeyEnum[colSize as 'md'] || 6 : size;
  const firstWidth = (index: number) => {
    if (index === 0) {
      return 0;
    }
    if (arraySize > 2) {
      return 42;
    }
    return 16;
  };

  return (
    <Card
      style={{
        marginBlockEnd: 16,
      }}
      variant="borderless"
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
            key={index}
            style={{
              borderInlineStart: arraySize > 2 && index === 1 ? '1px solid rgba(0,0,0,0.06)' : undefined,
              paddingInlineStart: firstWidth(index),
              flex: 1,
              marginInlineEnd: index === 0 ? 16 : 0,
            }}
          >
            <Skeleton
              active={active}
              paragraph={false}
              title={{
                width: 100,
                style: { marginBlockStart: 0 },
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
      style={{
        borderRadius: 0,
      }}
      styles={{
        body: {
          padding: 24,
        },
      }}
      variant="borderless"
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
            paragraph={{
              rows: 1,
              style: {
                margin: 0,
              },
            }}
            title={{
              width: 100,
              style: {
                marginBlockStart: 0,
              },
            }}
          />
        </div>
        <Skeleton.Button active={active} size="small" style={{ width: 165, marginBlockStart: 12 }} />
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
    styles={{
      body: {
        padding: 0,
      },
    }}
    variant="borderless"
  >
    {new Array(size).fill(null).map((_, index) => (
      <ListSkeletonItem key={index} active={!!active} />
    ))}

    {actionButton !== false && (
      <Card
        style={{
          borderStartEndRadius: 0,
          borderTopLeftRadius: 0,
        }}
        styles={{
          body: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
        variant="borderless"
      >
        <Skeleton.Button
          active={active}
          size="small"
          style={{
            width: 102,
          }}
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
      marginBlockEnd: 16,
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
    style={{
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    }}
    styles={{
      body: {
        paddingBlockEnd: 8,
      },
    }}
    variant="borderless"
  >
    <Space
      style={{
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Skeleton.Button active={active} size="small" style={{ width: 200 }} />
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
    {statistic !== false && <StatisticSkeleton active={active} size={statistic as number} />}
    {(toolbar !== false || list !== false) && (
      <Card
        styles={{
          body: {
            padding: 0,
          },
        }}
        variant="borderless"
      >
        {toolbar !== false && <ListToolbarSkeleton active={active} />}
        {list !== false && <ListSkeleton actionButton={actionButton} active={active} size={list as number} />}
      </Card>
    )}
  </div>
);

export default ListPageSkeleton;
