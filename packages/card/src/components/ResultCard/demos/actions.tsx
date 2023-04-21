import { ResultCard } from '@ant-design/pro-components';
import { Button, Card, Space, Typography } from 'antd';

export default () => {
  return (
    <ResultCard
      style={{
        margin: '20px',
      }}
      result={{
        status: 'success',
        title: '应用引擎创建成功',
        subTitle: '可根据你的任务目标继续完成后续操作',
        extra: (
          <Space
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Card
              style={{
                backgroundColor: 'rgba(0,0,0,0.02)',
                border: 'none',
              }}
            >
              <Space
                style={{
                  width: 360,
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <Typography.Title level={5} style={{ marginTop: 0, fontSize: '14px' }}>
                    部署引擎服务
                  </Typography.Title>
                  <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                    将应用引擎部署成上线服务以用于业务场景
                  </Typography.Text>
                </div>
                <Button type="link" style={{ border: '1px solid #1890ff' }}>
                  立即部署
                </Button>
              </Space>
            </Card>
            <Card
              style={{
                backgroundColor: 'rgba(0,0,0,0.02)',
                border: 'none',
              }}
            >
              <Space
                style={{
                  width: 360,
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <Typography.Title level={5} style={{ marginTop: 0, fontSize: '14px' }}>
                    创建实验项目
                  </Typography.Title>
                  <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                    创建多方协作实验项目以完成应用计算
                  </Typography.Text>
                </div>
                <Button type="link" style={{ border: '1px solid #1890ff' }}>
                  立即创建
                </Button>
              </Space>
            </Card>
          </Space>
        ),
      }}
    />
  );
};
