/** Uuid: 69aec291 title: 应用列表示例 */

import React from 'react';
import { CheckCard } from '@ant-design/pro-card';
import { Avatar } from 'antd';

const dataSource = [
  {
    title: '图像分类',
    avatar: (
      <Avatar
        size={32}
        shape="square"
        src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
      />
    ),
    description: '这是一段关于该算法的说明',
    value: 'A',
  },
  {
    title: '物体检测',
    avatar: (
      <Avatar
        size={32}
        shape="square"
        src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
      />
    ),
    description: '这是一段关于该算法的说明',
    value: 'B',
  },
  {
    title: 'OCR自定义',
    avatar: (
      <Avatar
        size={32}
        shape="square"
        src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
      />
    ),
    description: '这是一段关于该算法的说明',
    value: 'C',
  },
  {
    title: 'OCR',
    avatar: (
      <Avatar
        size={32}
        shape="square"
        src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
      />
    ),
    description: '这是一段关于该算法的说明',
    value: 'D',
  },
  {
    title: '视频分类',
    avatar: (
      <Avatar
        size={32}
        shape="square"
        src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
      />
    ),
    description: '这是一段关于该算法的说明',
    value: 'E',
  },
  {
    title: '关键点检测',
    avatar: (
      <Avatar
        size={32}
        shape="square"
        src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
      />
    ),
    description: '这是一段关于该算法的说明',
    value: 'F',
  },
];

export default () => (
  <div style={{ padding: 24, backgroundColor: '#F0F2F5' }}>
    <CheckCard.Group options={dataSource} />
  </div>
);
