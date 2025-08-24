import { CheckCard } from '@ant-design/pro-components';
import { ConfigProvider, Flex } from 'antd';

export default () => (
  <>
    <Flex gap={24} vertical>
      <CheckCard.Group
        multiple
        onChange={(value) => {
          console.log('value', value);
        }}
        defaultValue={['A']}
      >
        <CheckCard
          title="Card A"
          description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
          value="A"
        />
        <CheckCard
          title="Card B"
          description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
          value="B"
        />
      </CheckCard.Group>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'red',
          },
        }}
      >
        <CheckCard.Group
          multiple
          onChange={(value) => {
            console.log('value', value);
          }}
          defaultValue={['A']}
        >
          <CheckCard
            title="Card A"
            description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
            value="A"
          />
          <CheckCard
            title="Card B"
            description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
            value="B"
          />
        </CheckCard.Group>
      </ConfigProvider>
    </Flex>

    <div
      style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
      }}
    >
      <h4>CheckCard.Group 多选模式 Props 说明：</h4>
      <ul>
        <li>
          <strong>multiple</strong>: 设置为 true 启用多选模式，默认为
          false（单选）
        </li>
        <li>
          <strong>onChange</strong>:
          选中值改变时的回调函数，多选模式下参数为数组
        </li>
        <li>
          <strong>defaultValue</strong>: 默认选中的值，多选模式下为数组格式
        </li>
        <li>
          <strong>value</strong>: 受控的选中值，多选模式下为数组格式
        </li>
        <li>
          <strong>children</strong>: CheckCard 子组件
        </li>
      </ul>
      <h4>多选模式特点：</h4>
      <ul>
        <li>
          <strong>返回值</strong>: onChange 回调返回选中值的数组
        </li>
        <li>
          <strong>默认值</strong>: defaultValue 需要传入数组格式
        </li>
        <li>
          <strong>样式</strong>: 可以通过 ConfigProvider 自定义主题色
        </li>
      </ul>
    </div>
  </>
);
