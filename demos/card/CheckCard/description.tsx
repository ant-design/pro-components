import { CheckCard } from '@ant-design/pro-components';
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

    <div
      style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
      }}
    >
      <h4>CheckCard Description Props 说明：</h4>
      <ul>
        <li>
          <strong>description</strong>: 卡片描述信息，可以是字符串或 React 节点
        </li>
        <li>
          <strong>title</strong>: 卡片标题
        </li>
        <li>
          <strong>avatar</strong>: 卡片头像
        </li>
      </ul>
      <h4>Description 使用方式：</h4>
      <ul>
        <li>
          <strong>字符串</strong>: 直接传入字符串，默认不会折行
        </li>
        <li>
          <strong>组件</strong>: 传入 React 节点，可以包含链接、排版组件等
        </li>
      </ul>
      <h4>复杂 Description 示例：</h4>
      <ul>
        <li>
          <strong>链接</strong>: 在描述中添加可点击的链接，使用 stopPropagation
          阻止事件冒泡
        </li>
        <li>
          <strong>排版组件</strong>: 使用 Typography.Paragraph 组件控制文本显示
        </li>
        <li>
          <strong>省略处理</strong>: 使用 ellipsis 属性控制文本省略行数
        </li>
      </ul>
      <h4>Typography.Paragraph Props：</h4>
      <ul>
        <li>
          <strong>ellipsis</strong>: 省略配置，可以设置 rows（行数）等属性
        </li>
        <li>
          <strong>rows</strong>: 显示的行数，超出部分会省略
        </li>
        <li>
          <strong>expandable</strong>: 是否可展开，布尔值
        </li>
      </ul>
      <h4>事件处理：</h4>
      <ul>
        <li>
          <strong>stopPropagation</strong>: 阻止事件冒泡，避免触发卡片的点击事件
        </li>
        <li>
          <strong>preventDefault</strong>: 阻止默认行为，如链接跳转
        </li>
      </ul>
    </div>
  </>
);
