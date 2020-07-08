import React from 'react';
import { Skeleton, Card, Space, Divider } from 'antd';

const StatisticSkeleton: React.FC<{
  size: number;
}> = ({ size }) => (
  <Card
    bordered={false}
    style={{
      marginBottom: 16,
    }}
  >
    <Space
      style={{
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      {new Array(size).fill(null).map((_, index) => (
        <>
          <div>
            <div
              key={index}
              style={{
                borderLeft: index === 1 ? '1px solid #ddd' : undefined,
                paddingLeft: 42,
              }}
            >
              <Skeleton
                paragraph={false}
                title={{
                  width: 100,
                  style: { marginTop: 0 },
                }}
              />
              <Skeleton.Button active size="small" />
            </div>
          </div>
        </>
      ))}
    </Space>
  </Card>
);

const ListSkeleton: React.FC<{
  size: number;
}> = ({ size }) => (
  <Card
    bordered={false}
    bodyStyle={{
      padding: 0,
    }}
  >
    {new Array(size).fill(null).map((_, index) => (
      <>
        <Card
          bordered={false}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{
            borderRadius: 0,
          }}
          bodyStyle={{
            padding: 16,
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
                active
                title={{
                  width: 120,
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
            <Skeleton.Button
              active
              size="small"
              style={{ width: 120, marginTop: 12 }}
            />
          </div>
        </Card>
        <div
          style={{
            padding: '0 16px',
          }}
        >
          <Divider style={{ margin: 0 }} />
        </div>
      </>
    ))}
  </Card>
);

const List = () => (
  <div
    style={{
      width: '100%',
    }}
  >
    <div
      style={{
        marginBottom: 16,
      }}
    >
      <Skeleton
        paragraph={false}
        title={{
          width: 120,
        }}
      />
      <Skeleton.Button active size="small" />
    </div>
    <StatisticSkeleton size={5} />
    <Card
      bordered={false}
      bodyStyle={{
        padding: 0,
      }}
    >
      <Card
        bordered={false}
        style={{
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <Space
          style={{
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Skeleton.Button active style={{ width: 200 }} size="small" />
          <Space>
            <Skeleton.Button active size="small" style={{ width: 120 }} />
            <Skeleton.Button active size="small" style={{ width: 80 }} />
          </Space>
        </Space>
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
              active
              title={{
                width: 120,
              }}
              paragraph={{
                rows: 1,
                style: {
                  margin: 0,
                },
              }}
            />
          </div>
          <Skeleton.Button
            active
            size="small"
            style={{ width: 120, marginTop: 12 }}
          />
        </div>
      </Card>
      <div
        style={{
          padding: '0 16px',
        }}
      >
        <Divider style={{ margin: 0 }} />
      </div>
      <ListSkeleton size={5} />
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
            width: 100,
          }}
          active
          size="small"
        />
      </Card>
    </Card>
  </div>
);

export default List;
