import { CheckCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';

export default () => (
  <>
    <CheckCard.Group style={{ width: '100%' }} size="small">
      <Row>
        <Col span={8}>
          <CheckCard
            title="Card A"
            description="This is the description"
            value="A"
          />
        </Col>
        <Col span={8}>
          <CheckCard
            title="Card B"
            description="This is the description"
            value="B"
          />
        </Col>
        <Col span={8}>
          <CheckCard
            title="Card C"
            description="This is the description"
            value="C"
          />
        </Col>
      </Row>
    </CheckCard.Group>

    <div
      style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
      }}
    >
      <h4>CheckCard 与栅格系统集成说明：</h4>
      <ul>
        <li>
          <strong>Row</strong>: 行容器，用于包裹 Col 组件
        </li>
        <li>
          <strong>Col</strong>: 列容器，用于控制 CheckCard 的布局
        </li>
        <li>
          <strong>span</strong>: 列宽度，24 栅格系统中的宽度值
        </li>
      </ul>
      <h4>CheckCard.Group Props：</h4>
      <ul>
        <li>
          <strong>style</strong>: 样式对象，设置容器宽度为 100%
        </li>
        <li>
          <strong>size</strong>: 卡片尺寸，'small' 表示小尺寸
        </li>
      </ul>
      <h4>Row 组件 Props：</h4>
      <ul>
        <li>
          <strong>gutter</strong>: 栅格间隔，可以是数字或数组
        </li>
        <li>
          <strong>justify</strong>: 水平排列方式，如 'start' | 'end' | 'center'
        </li>
        <li>
          <strong>align</strong>: 垂直排列方式，如 'top' | 'middle' | 'bottom'
        </li>
      </ul>
      <h4>Col 组件 Props：</h4>
      <ul>
        <li>
          <strong>span</strong>: 列宽度，24 栅格系统中的宽度值（1-24）
        </li>
        <li>
          <strong>offset</strong>: 列偏移量，用于调整列位置
        </li>
        <li>
          <strong>xs/sm/md/lg/xl</strong>: 响应式断点，不同屏幕尺寸下的宽度
        </li>
      </ul>
      <h4>栅格布局特点：</h4>
      <ul>
        <li>
          <strong>24 栅格</strong>: 一行分为 24 列，span={8} 表示占 8/24 = 1/3
        </li>
        <li>
          <strong>响应式</strong>: 支持不同屏幕尺寸的响应式布局
        </li>
        <li>
          <strong>自动换行</strong>: 超出 24 栅格的列会自动换行
        </li>
        <li>
          <strong>间距控制</strong>: 通过 gutter 属性控制列间距
        </li>
      </ul>
    </div>
  </>
);
