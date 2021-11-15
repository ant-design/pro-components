/** Uuid: 15886807 title: 自定义描述 */

import React from 'react';
import { CheckCard } from '@ant-design/pro-card';
import { Typography } from 'antd';

const { Paragraph } = Typography;

export default () => (
  <>
    <CheckCard
      avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      title="默认描述区域不会进行折行"
      description={
        <span>
          选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。
          <a
            href=""
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            查看详情
          </a>
        </span>
      }
    />
    <CheckCard
      avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      title="你可以通过排版组件进行省略"
      description={
        <Paragraph ellipsis={{ rows: 2 }}>
          选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。
        </Paragraph>
      }
    />
  </>
);
