"use strict";(self.webpackChunkpro_components=self.webpackChunkpro_components||[]).push([[3965],{34219:function(e,n,t){t.r(n),n.default=[{path:"/home",name:"\u9996\u9875",locale:"menu.home",routes:[{path:"/home/overview",name:"\u6982\u8FF0",hideInMenu:!0,locale:"menu.home.overview"},{path:"/home/search",name:"\u641C\u7D22",hideInMenu:!0,locale:"menu.home.search"}]},{path:"/data_hui",name:"\u6C47\u603B\u6570\u636E",locale:"menu.data_hui",routes:[{collapsed:!0,menuName:"\u57DF\u4E70\u5BB6\u7EF4\u5EA6\u4EA4\u6613",name:"\u57DF\u4E70\u5BB6\u7EF4\u5EA6\u4EA4\u6613",path:"/xx",routes:[{id:2,name:"\u6708\u8868",path:"/data_hui2"},{name:"\u65E5\u8868",path:"/data_hui3?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk"}]},{name:"\u7EF4\u5EA6\u4EA4\u6613",path:"/",routes:[{name:"\u6708\u8868",path:"/data_hui4"},{name:"\u65E5\u8868",key:"tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk",path:"/data_hui5"}]}]},{path:"/data_ming",name:"\u660E\u7EC6\u6570\u636E",locale:"menu.data_ming",routes:[{path:"/other/outLoadMenu",name:"\u83DC\u5355\u5BFC\u51FA",locale:"menu.other.outLoadMenu",hideInMenu:!0},{path:"/other/homeEdit",name:"\u6982\u8FF0\u5BFC\u51FA",locale:"menu.other.outHomeEdit"}]},{path:"/other",name:"\u5176\u4ED6",locale:"menu.other",routes:[{path:"/other/upLoad",name:"odps\u540C\u6B65\u5BFC\u5165",locale:"menu.other.upLoad"},{path:"/other/upLoadMenu",name:"\u83DC\u5355\u5BFC\u5165",locale:"menu.other.upLoadMenu"},{path:"/other/homeEdit",name:"\u6982\u8FF0\u7F16\u8F91",locale:"menu.other.homeEdit",hideInMenu:!0}]}]},80144:function(e,n,t){t.r(n),n.default=[{path:"/",name:"\u6B22\u8FCE",routes:[{path:"/welcome",name:"one",routes:[{path:"/welcome/welcome",name:"two",exact:!0}]}]},{path:"/demo",name:"\u4F8B\u5B50"}]},38943:function(e,n){n.Z=`import { UserOutlined } from '@ant-design/icons';
import { CheckCard } from '@ant-design/pro-components';
import { Avatar } from 'antd';

export default () => (
  <CheckCard
    title="\u793A\u4F8B\u6807\u9898"
    avatar={
      <Avatar
        style={{ backgroundColor: '#7265e6' }}
        icon={<UserOutlined />}
        size="large"
      />
    }
  />
);
`},37445:function(e,n){n.Z=`/** Title: \u57FA\u672C\u4F7F\u7528 */

import { CheckCard } from '@ant-design/pro-components';

export default () => (
  <CheckCard
    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    title="\u793A\u4F8B\u4E00"
    description="\u9009\u62E9\u4E00\u4E2A\u7531\u6D41\u7A0B\u7F16\u6392\u63D0\u4F9B\u7684\u5178\u578B\u7528\u6237\u6848\u4F8B\uFF0C\u53EF\u4EE5\u4ECE\u4E2D\u5B66\u4E60\u5230\u6D41\u7A0B\u7F16\u6392\u5F88\u591A\u8BBE\u8BA1\u7406\u5FF5\u3002"
    onChange={(checked) => {
      console.log('checked', checked);
    }}
    defaultChecked
    onClick={() => {
      console.log('clicked');
    }}
  />
);
`},85834:function(e,n){n.Z=`import { CheckCard } from '@ant-design/pro-components';

export default () => (
  <>
    <h3>\u53EA\u6709\u56FE\u7247\u65F6</h3>
    <CheckCard avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg" />

    <h3>\u53EA\u6709\u56FE\u7247\u548C\u63CF\u8FF0\u65F6</h3>
    <CheckCard
      avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      description="\u9009\u62E9\u4E00\u4E2A\u7531\u6D41\u7A0B\u7F16\u6392\u63D0\u4F9B\u7684\u5178\u578B\u7528\u6237\u6848\u4F8B\uFF0C\u53EF\u4EE5\u4ECE\u4E2D\u5B66\u4E60\u5230\u6D41\u7A0B\u7F16\u6392\u5F88\u591A\u8BBE\u8BA1\u7406\u5FF5\u3002"
    />
    <h3>\u53EA\u6709\u6807\u9898\u548C\u63CF\u8FF0\u65F6</h3>
    <CheckCard
      title="\u793A\u4F8B"
      description="\u9009\u62E9\u4E00\u4E2A\u7531\u6D41\u7A0B\u7F16\u6392\u63D0\u4F9B\u7684\u5178\u578B\u7528\u6237\u6848\u4F8B\uFF0C\u53EF\u4EE5\u4ECE\u4E2D\u5B66\u4E60\u5230\u6D41\u7A0B\u7F16\u6392\u5F88\u591A\u8BBE\u8BA1\u7406\u5FF5\u3002"
    />
    <h3>\u53EA\u6709\u6807\u9898\u548C\u56FE\u7247</h3>
    <CheckCard
      title="\u793A\u4F8B"
      avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    />
    <h3>\u53EA\u6709\u6807\u9898</h3>
    <CheckCard title="\u793A\u4F8B" />
    <h3>\u53EA\u6709\u63CF\u8FF0\u65F6</h3>
    <CheckCard description="\u9009\u62E9\u4E00\u4E2A\u7531\u6D41\u7A0B\u7F16\u6392\u63D0\u4F9B\u7684\u5178\u578B\u7528\u6237\u6848\u4F8B\uFF0C\u53EF\u4EE5\u4ECE\u4E2D\u5B66\u4E60\u5230\u6D41\u7A0B\u7F16\u6392\u5F88\u591A\u8BBE\u8BA1\u7406\u5FF5\u3002" />
  </>
);
`},17246:function(e,n){n.Z=`import { CheckCard } from '@ant-design/pro-components';

export default () => (
  <CheckCard
    title="Card title"
    description="This is the description"
    style={{ width: 200, height: 200 }}
  />
);
`},84499:function(e,n){n.Z=`import { CheckCard } from '@ant-design/pro-components';

export default () => (
  <CheckCard
    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    title="\u793A\u4F8B\u4E8C"
    defaultChecked
    onChange={(checked) => {
      console.log('checked', checked);
    }}
  />
);
`},20737:function(e,n){n.Z=`import { CheckCard } from '@ant-design/pro-components';
import { Typography } from 'antd';

const { Paragraph } = Typography;

export default () => (
  <>
    <CheckCard
      avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      title="\u9ED8\u8BA4\u63CF\u8FF0\u533A\u57DF\u4E0D\u4F1A\u8FDB\u884C\u6298\u884C"
      description={
        <span>
          \u9009\u62E9\u4E00\u4E2A\u7531\u6D41\u7A0B\u7F16\u6392\u63D0\u4F9B\u7684\u5178\u578B\u7528\u6237\u6848\u4F8B\uFF0C\u53EF\u4EE5\u4ECE\u4E2D\u5B66\u4E60\u5230\u6D41\u7A0B\u7F16\u6392\u5F88\u591A\u8BBE\u8BA1\u7406\u5FF5\u3002
          <a
            href=""
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            \u67E5\u770B\u8BE6\u60C5
          </a>
        </span>
      }
    />
    <CheckCard
      avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      title="\u4F60\u53EF\u4EE5\u901A\u8FC7\u6392\u7248\u7EC4\u4EF6\u8FDB\u884C\u7701\u7565"
      description={
        <Paragraph ellipsis={{ rows: 2 }}>
          \u9009\u62E9\u4E00\u4E2A\u7531\u6D41\u7A0B\u7F16\u6392\u63D0\u4F9B\u7684\u5178\u578B\u7528\u6237\u6848\u4F8B\uFF0C\u53EF\u4EE5\u4ECE\u4E2D\u5B66\u4E60\u5230\u6D41\u7A0B\u7F16\u6392\u5F88\u591A\u8BBE\u8BA1\u7406\u5FF5\u3002
        </Paragraph>
      }
    />
  </>
);
`},63068:function(e,n){n.Z=`import { CheckCard } from '@ant-design/pro-components';

export default () => (
  <>
    <div>
      <h3>\u90E8\u5206\u4E0D\u53EF\u7528</h3>
      <CheckCard
        title="Card title"
        description="This is the description"
        avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      />
      <CheckCard
        title="Card title"
        description="This is the description"
        disabled
        avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      />
      <CheckCard
        title="Card title"
        description="This is the description"
        disabled
        defaultChecked
        avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      />
    </div>
    <div>
      <h3>\u6574\u4F53\u4E0D\u53EF\u7528</h3>
      <CheckCard.Group disabled defaultValue="A">
        <CheckCard title="Card A" description="\u9009\u9879\u4E00" value="A" />
        <CheckCard title="Card B" description="\u9009\u9879\u4E8C" value="B" />
      </CheckCard.Group>
    </div>
  </>
);
`},7987:function(e,n){n.Z=`import { EllipsisOutlined } from '@ant-design/icons';
import { CheckCard } from '@ant-design/pro-components';
import { Dropdown, message } from 'antd';

export default () => (
  <CheckCard
    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    title="\u793A\u4F8B\u4E00"
    description="\u9009\u62E9\u4E00\u4E2A\u7531\u6D41\u7A0B\u7F16\u6392\u63D0\u4F9B\u7684\u5178\u578B\u7528\u6237\u6848\u4F8B\uFF0C\u53EF\u4EE5\u4ECE\u4E2D\u5B66\u4E60\u5230\u6D41\u7A0B\u7F16\u6392\u5F88\u591A\u8BBE\u8BA1\u7406\u5FF5\u3002"
    extra={
      <Dropdown
        placement="topCenter"
        menu={{
          onClick: ({ domEvent }) => {
            domEvent.stopPropagation();
            message.info('menu click');
          },
          items: [
            {
              label: '\u83DC\u5355',
              key: '1',
            },
            {
              label: '\u5217\u8868',
              key: '2',
            },
            {
              label: '\u8868\u5355',
              key: '3',
            },
          ],
        }}
      >
        <EllipsisOutlined
          style={{ fontSize: 22, color: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => e.stopPropagation()}
        />
      </Dropdown>
    }
  />
);
`},59578:function(e,n){n.Z=`import { CheckCard } from '@ant-design/pro-components';
import { Avatar, Button, Form } from 'antd';

export default () => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    console.log('values', values);
  };

  return (
    <div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="checkbox-group" label="\u6280\u672F\u6808">
          <CheckCard.Group style={{ width: '100%' }}>
            <CheckCard
              title="Spring Boot"
              avatar={
                <Avatar
                  src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                  size="large"
                />
              }
              description="\u901A\u8FC7\u4E1A\u754C\u6D41\u884C\u7684\u6280\u672F\u6808\u6765\u5FEB\u901F\u6784\u5EFA Java \u540E\u7AEF\u5E94\u7528"
              value="SpringBoot"
            />
            <CheckCard
              title="SOFA Boot"
              avatar={
                <Avatar
                  src="https://gw.alipayobjects.com/zos/bmw-prod/6935b98e-96f6-464f-9d4f-215b917c6548.svg"
                  size="large"
                />
              }
              description="\u4F7F\u7528 SOFAStack \u4E2D\u95F4\u4EF6\u6765\u5FEB\u901F\u6784\u5EFA\u5206\u5E03\u5F0F\u540E\u7AEF\u5E94\u7528"
              value="SOFABoot"
            />
            <CheckCard
              title="Node JS"
              avatar={
                <Avatar
                  src="https://gw.alipayobjects.com/zos/bmw-prod/d12c3392-61fa-489e-a82c-71de0f888a8e.svg"
                  size="large"
                />
              }
              description="\u4F7F\u7528\u524D\u540E\u7AEF\u7EDF\u4E00\u7684\u8BED\u8A00\u65B9\u6848\u5FEB\u901F\u6784\u5EFA\u540E\u7AEF\u5E94\u7528"
              value="NodeJS"
            />
          </CheckCard.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
`},95640:function(e,n){n.Z=`import { CheckCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';

export default () => (
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
);
`},92310:function(e,n){n.Z=`import { CheckCard } from '@ant-design/pro-components';
import { Divider } from 'antd';

export default () => (
  <div style={{ padding: 24 }}>
    <CheckCard.Group
      size="small"
      options={['\u{1F34E} Apple', '\u{1F350} Pear', '\u{1F34A} Orange']}
    />
    <br />
    <CheckCard.Group
      size="small"
      loading
      options={['\u{1F34E} Apple', '\u{1F350} Pear', '\u{1F34A} Orange']}
    />
    <br />
    <Divider />
    <CheckCard.Group
      size="small"
      options={[
        {
          title: 'Fruit',
          value: 'Fruit',
          children: [
            {
              title: '\u{1F34E} Apple',
              value: 'apple',
            },
            {
              title: '\u{1F350} Pear',
              value: 'pear',
            },
            {
              title: '\u{1F34A} Orange',
              value: 'orange',
            },
          ],
        },
      ]}
    />
    <Divider />
    <br />
    <CheckCard.Group defaultValue="A">
      <CheckCard title="\u{1F34A} Orange" value="\u{1F34A} Orange" />
      <CheckCard title="\u{1F350} Pear" value="\u{1F350} Pear" />
      <CheckCard title="\u{1F34E} Apple" value="\u{1F34E} Apple" />
    </CheckCard.Group>
    <br />
    <Divider />
    <CheckCard.Group defaultValue="A" loading>
      <CheckCard title="\u{1F34A} Orange" value="\u{1F34A} Orange" />
      <CheckCard title="\u{1F350} Pear" value="\u{1F350} Pear" />
      <CheckCard title="\u{1F34E} Apple" value="\u{1F34E} Apple" />
    </CheckCard.Group>
  </div>
);
`},91032:function(e,n){n.Z=`import { CheckCard } from '@ant-design/pro-components';

export default () => (
  <>
    <CheckCard
      cover={
        <img
          alt="example"
          height={240}
          src="https://gw.alipayobjects.com/mdn/rms_66ee3f/afts/img/A*FyH5TY53zSwAAAAAAAAAAABkARQnAQ"
        />
      }
    />
    <CheckCard
      cover={
        'https://gw.alipayobjects.com/mdn/rms_66ee3f/afts/img/A*FyH5TY53zSwAAAAAAAAAAABkARQnAQ'
      }
    />
  </>
);
`},82916:function(e,n){n.Z=`import { CheckCard } from '@ant-design/pro-components';
import { Avatar } from 'antd';

const dataSource = [
  {
    title: '\u56FE\u50CF\u5206\u7C7B',
    avatar: (
      <Avatar
        size={32}
        shape="square"
        src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
      />
    ),
    description: '\u8FD9\u662F\u4E00\u6BB5\u5173\u4E8E\u8BE5\u7B97\u6CD5\u7684\u8BF4\u660E',
    value: 'A',
  },
  {
    title: '\u7269\u4F53\u68C0\u6D4B',
    avatar: (
      <Avatar
        size={32}
        shape="square"
        src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
      />
    ),
    description: '\u8FD9\u662F\u4E00\u6BB5\u5173\u4E8E\u8BE5\u7B97\u6CD5\u7684\u8BF4\u660E',
    value: 'B',
  },
  {
    title: 'OCR\u81EA\u5B9A\u4E49',
    avatar: (
      <Avatar
        size={32}
        shape="square"
        src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
      />
    ),
    description: '\u8FD9\u662F\u4E00\u6BB5\u5173\u4E8E\u8BE5\u7B97\u6CD5\u7684\u8BF4\u660E',
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
    description: '\u8FD9\u662F\u4E00\u6BB5\u5173\u4E8E\u8BE5\u7B97\u6CD5\u7684\u8BF4\u660E',
    value: 'D',
  },
  {
    title: '\u89C6\u9891\u5206\u7C7B',
    avatar: (
      <Avatar
        size={32}
        shape="square"
        src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
      />
    ),
    description: '\u8FD9\u662F\u4E00\u6BB5\u5173\u4E8E\u8BE5\u7B97\u6CD5\u7684\u8BF4\u660E',
    value: 'E',
  },
  {
    title: '\u5173\u952E\u70B9\u68C0\u6D4B',
    avatar: (
      <Avatar
        size={32}
        shape="square"
        src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
      />
    ),
    description: '\u8FD9\u662F\u4E00\u6BB5\u5173\u4E8E\u8BE5\u7B97\u6CD5\u7684\u8BF4\u660E',
    value: 'F',
  },
];

export default () => (
  <div style={{ padding: 24, backgroundColor: '#f7f8fa' }}>
    <CheckCard.Group options={dataSource} />
  </div>
);
`},58041:function(e,n){n.Z=`import { CheckCard } from '@ant-design/pro-components';

export default () => <CheckCard loading />;
`},62770:function(e,n){n.Z=`import { CheckCard } from '@ant-design/pro-components';

export default () => (
  <CheckCard.Group
    multiple
    onChange={(value) => {
      console.log('value', value);
    }}
    defaultValue={['A']}
  >
    <CheckCard
      title="Card A"
      description="\u9009\u62E9\u4E00\u4E2A\u7531\u6D41\u7A0B\u7F16\u6392\u63D0\u4F9B\u7684\u5178\u578B\u7528\u6237\u6848\u4F8B\uFF0C\u53EF\u4EE5\u4ECE\u4E2D\u5B66\u4E60\u5230\u6D41\u7A0B\u7F16\u6392\u5F88\u591A\u8BBE\u8BA1\u7406\u5FF5"
      value="A"
    />
    <CheckCard
      title="Card B"
      description="\u9009\u62E9\u4E00\u4E2A\u7531\u6D41\u7A0B\u7F16\u6392\u63D0\u4F9B\u7684\u5178\u578B\u7528\u6237\u6848\u4F8B\uFF0C\u53EF\u4EE5\u4ECE\u4E2D\u5B66\u4E60\u5230\u6D41\u7A0B\u7F16\u6392\u5F88\u591A\u8BBE\u8BA1\u7406\u5FF5"
      value="B"
    />
  </CheckCard.Group>
);
`},46014:function(e,n){n.Z=`import { CheckCard } from '@ant-design/pro-components';

export default () => (
  <CheckCard.Group
    onChange={(value) => {
      console.log('value', value);
    }}
    defaultValue="A"
  >
    <CheckCard title="Card A" description="\u9009\u9879\u4E00" value="A" />
    <CheckCard title="Card B" description="\u9009\u9879\u4E8C" value="B" />
    <CheckCard
      title="Card C"
      disabled
      description="\u9009\u9879\u4E09\uFF0C\u8FD9\u662F\u4E00\u4E2A\u4E0D\u53EF\u9009\u9879"
      value="C"
    />
  </CheckCard.Group>
);
`},93274:function(e,n){n.Z=`import { CheckCard } from '@ant-design/pro-components';
import { Radio } from 'antd';
import { useState } from 'react';

export default () => {
  const [size, setSize] = useState('default' as 'default');
  return (
    <>
      <div style={{ marginBlockEnd: 16 }}>
        <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
      </div>
      <CheckCard
        title="Card title"
        description="This is the description"
        size={size}
      />
    </>
  );
};
`},62164:function(e,n){n.Z=`import { AppstoreOutlined } from '@ant-design/icons';
import { CheckCard } from '@ant-design/pro-components';
import { Tag } from 'antd';

export default () => (
  <>
    <CheckCard
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AppstoreOutlined />
          <span style={{ marginInlineEnd: 8, marginInlineStart: 8 }}>\u793A\u4F8B</span>
          <Tag color="blue">blue</Tag>
        </div>
      }
      description="\u9009\u62E9\u4E00\u4E2A\u7531\u6D41\u7A0B\u7F16\u6392\u63D0\u4F9B\u7684\u5178\u578B\u7528\u6237\u6848\u4F8B\uFF0C\u53EF\u4EE5\u4ECE\u4E2D\u5B66\u4E60\u5230\u6D41\u7A0B\u7F16\u6392\u5F88\u591A\u8BBE\u8BA1\u7406\u5FF5"
    />
    <CheckCard
      title="\u6807\u9898\u5185\u5BB9\u8FC7\u957F\u4F1A\u81EA\u52A8\u8FDB\u884C\u7701\u7565\uFF0C\u6807\u9898\u5185\u5BB9\u8FC7\u957F\u4F1A\u81EA\u52A8\u8FDB\u884C\u7701\u7565"
      description="\u9009\u62E9\u4E00\u4E2A\u7531\u6D41\u7A0B\u7F16\u6392\u63D0\u4F9B\u7684\u5178\u578B\u7528\u6237\u6848\u4F8B\uFF0C\u53EF\u4EE5\u4ECE\u4E2D\u5B66\u4E60\u5230\u6D41\u7A0B\u7F16\u6392\u5F88\u591A\u8BBE\u8BA1\u7406\u5FF5"
    />
  </>
);
`},23850:function(e,n){n.Z=`import { EllipsisOutlined, RightOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';
import { Space, theme } from 'antd';

const { Statistic } = StatisticCard;

export default () => {
  const { token } = theme.useToken();
  return (
    <StatisticCard
      title={
        <Space>
          <span>\u90E8\u95E8\u4E00</span>
          <RightOutlined style={{ color: token.colorTextHeading }} />
        </Space>
      }
      extra={<EllipsisOutlined />}
      statistic={{
        value: 1102893,
        prefix: '\xA5',
        description: (
          <Space>
            <Statistic title="\u5B9E\u9645\u5B8C\u6210\u5EA6" value="82.3%" />
            <Statistic title="\u5F53\u524D\u76EE\u6807" value="\xA56000" />
          </Space>
        ),
      }}
      chart={
        <>
          <img
            src="https://gw.alipayobjects.com/zos/alicdn/BA_R9SIAV/charts.svg"
            alt="chart"
            width="100%"
          />
        </>
      }
      style={{ width: 268 }}
    />
  );
};
`},57646:function(e,n){n.Z=`import { EllipsisOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';

export default () => {
  return (
    <StatisticCard
      title="\u5927\u76D8\u8D8B\u52BF"
      tooltip="\u5927\u76D8\u8BF4\u660E"
      style={{ maxWidth: 480 }}
      extra={<EllipsisOutlined />}
      chart={
        <img
          src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
          alt="\u67F1\u72B6\u56FE"
          width="100%"
        />
      }
    />
  );
};
`},83875:function(e,n){n.Z=`import { StatisticCard } from '@ant-design/pro-components';

const { Operation } = StatisticCard;

export default () => {
  return (
    <StatisticCard.Group>
      <StatisticCard
        statistic={{
          title: '\u670D\u52A1\u7F51\u683C\u6570',
          value: 500,
        }}
      />
      <Operation>=</Operation>
      <StatisticCard
        statistic={{
          title: '\u672A\u53D1\u5E03',
          value: 234,
        }}
      />
      <Operation>+</Operation>
      <StatisticCard
        statistic={{
          title: '\u53D1\u5E03\u4E2D',
          value: 112,
        }}
      />
      <Operation>+</Operation>
      <StatisticCard
        statistic={{
          title: '\u5DF2\u53D1\u5E03',
          value: 255,
        }}
      />
    </StatisticCard.Group>
  );
};
`},10115:function(e,n){n.Z=`import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Divider } = StatisticCard;

export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
        <StatisticCard
          statistic={{
            title: '\u51BB\u7ED3\u91D1\u989D',
            value: 20190102,
            precision: 2,
            suffix: '\u5143',
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
              alt="\u76F4\u65B9\u56FE"
              width="100%"
            />
          }
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '\u8BBE\u8BA1\u8D44\u6E90\u6570',
            value: 234,
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
              alt="\u76F4\u65B9\u56FE"
              width="100%"
            />
          }
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '\u4FE1\u606F\u5B8C\u6210\u5EA6',
            value: 5,
            suffix: '/ 100',
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
              alt="\u76F4\u65B9\u56FE"
              width="100%"
            />
          }
        />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
};
`},28549:function(e,n){n.Z=`import { StatisticCard } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

export default () => {
  return (
    <StatisticCard
      chartPlacement="left"
      statistic={{
        title: '\u51BB\u7ED3\u91D1\u989D',
        value: 112893,
        precision: 2,
        suffix: '\u5143',
        description: (
          <>
            <Statistic title="\u5468\u540C\u6BD4" value="6.47%" trend="up" />
            <Statistic title="\u6708\u540C\u6BD4" value="6.47%" trend="down" />
          </>
        ),
      }}
      style={{ maxWidth: 584 }}
      chart={
        <img
          src="https://gw.alipayobjects.com/zos/alicdn/snEBTn9ax/zhexiantuchang.svg"
          alt="\u6298\u7EBF\u56FE"
          width="100%"
        />
      }
    />
  );
};
`},39089:function(e,n){n.Z=`import { StatisticCard } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

export default () => {
  return (
    <StatisticCard
      chartPlacement="right"
      statistic={{
        title: '\u51BB\u7ED3\u91D1\u989D',
        value: 112893,
        precision: 2,
        suffix: '\u5143',
        description: (
          <>
            <Statistic title="\u5468\u540C\u6BD4" value="6.47%" trend="up" />
            <Statistic title="\u6708\u540C\u6BD4" value="6.47%" trend="down" />
          </>
        ),
      }}
      style={{ width: 584 }}
      chart={
        <img
          src="https://gw.alipayobjects.com/zos/alicdn/snEBTn9ax/zhexiantuchang.svg"
          alt="\u6298\u7EBF\u56FE"
          width="100%"
        />
      }
    />
  );
};
`},79748:function(e,n){n.Z=`import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const imgStyle = {
  display: 'block',
  width: 42,
  height: 42,
};

export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
        <StatisticCard
          statistic={{
            title: '\u652F\u4ED8\u91D1\u989D',
            value: 2176,
            icon: (
              <img
                style={imgStyle}
                src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*dr_0RKvVzVwAAAAAAAAAAABkARQnAQ"
                alt="icon"
              />
            ),
          }}
        />
        <StatisticCard
          statistic={{
            title: '\u8BBF\u5BA2\u6570',
            value: 475,
            icon: (
              <img
                style={imgStyle}
                src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*-jVKQJgA1UgAAAAAAAAAAABkARQnAQ"
                alt="icon"
              />
            ),
          }}
        />
        <StatisticCard
          statistic={{
            title: '\u6210\u529F\u8BA2\u5355\u6570',
            value: 87,
            icon: (
              <img
                style={imgStyle}
                src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*FPlYQoTNlBEAAAAAAAAAAABkARQnAQ"
                alt="icon"
              />
            ),
          }}
        />
        <StatisticCard
          statistic={{
            title: '\u6D4F\u89C8\u91CF',
            value: 1754,
            icon: (
              <img
                style={imgStyle}
                src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*pUkAQpefcx8AAAAAAAAAAABkARQnAQ"
                alt="icon"
              />
            ),
          }}
        />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
};
`},57238:function(e,n){n.Z=`import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Statistic } = StatisticCard;

export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="\u6570\u636E\u6982\u89C8"
        extra="2019\u5E749\u670828\u65E5 \u661F\u671F\u4E94"
        split={responsive ? 'horizontal' : 'vertical'}
        headerBordered
        bordered
      >
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '\u6628\u65E5\u5168\u90E8\u6D41\u91CF',
                  value: 234,
                  description: (
                    <Statistic
                      title="\u8F83\u672C\u6708\u5E73\u5747\u6D41\u91CF"
                      value="8.04%"
                      trend="down"
                    />
                  ),
                }}
              />
              <StatisticCard
                statistic={{
                  title: '\u672C\u6708\u7D2F\u8BA1\u6D41\u91CF',
                  value: 234,
                  description: (
                    <Statistic title="\u6708\u540C\u6BD4" value="8.04%" trend="up" />
                  ),
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '\u8FD0\u884C\u4E2D\u5B9E\u9A8C',
                  value: '12/56',
                  suffix: '\u4E2A',
                }}
              />
              <StatisticCard
                statistic={{
                  title: '\u5386\u53F2\u5B9E\u9A8C\u603B\u6570',
                  value: '134',
                  suffix: '\u4E2A',
                }}
              />
            </ProCard>
          </ProCard>
          <StatisticCard
            title="\u6D41\u91CF\u8D70\u52BF"
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/_dZIob2NB/zhuzhuangtu.svg"
                width="100%"
              />
            }
          />
        </ProCard>
        <StatisticCard
          title="\u6D41\u91CF\u5360\u7528\u60C5\u51B5"
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/qoYmFMxWY/jieping2021-03-29%252520xiawu4.32.34.png"
              alt="\u5927\u76D8"
              width="100%"
            />
          }
        />
      </ProCard>
    </RcResizeObserver>
  );
};
`},6637:function(e,n){n.Z=`import { StatisticCard } from '@ant-design/pro-components';

const { Divider } = StatisticCard;

export default () => {
  return (
    <StatisticCard.Group>
      <StatisticCard
        statistic={{
          title: '\u5168\u90E8',
          tip: '\u5E2E\u52A9\u6587\u5B57',
          value: 10,
        }}
      />
      <Divider />
      <StatisticCard
        statistic={{
          title: '\u672A\u53D1\u5E03',
          value: 5,
          status: 'default',
        }}
      />
      <StatisticCard
        statistic={{
          title: '\u53D1\u5E03\u4E2D',
          value: 3,
          status: 'processing',
        }}
      />
      <StatisticCard
        statistic={{
          title: '\u53D1\u5E03\u5F02\u5E38',
          value: 2,
          status: 'error',
        }}
      />
      <StatisticCard
        statistic={{
          title: '\u53D1\u5E03\u6210\u529F',
          value: '-',
          status: 'success',
        }}
      />
    </StatisticCard.Group>
  );
};
`},79201:function(e,n){n.Z=`import type { StatisticProps } from '@ant-design/pro-components';
import { ProCard, StatisticCard } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

const items = [
  { key: '1', title: '\u5168\u90E8', value: 10, total: true },
  { key: '2', status: 'default', title: '\u672A\u53D1\u5E03', value: 5 },
  { key: '3', status: 'processing', title: '\u53D1\u5E03\u4E2D', value: 3 },
  { key: '4', status: 'error', title: '\u53D1\u5E03\u5F02\u5E38', value: 1 },
  { key: '5', status: 'success', title: '\u53D1\u5E03\u6210\u529F', value: 1 },
];

export default () => {
  return (
    <ProCard
      tabs={{
        onChange: (key) => {
          console.log('key', key);
        },
        items: items.map((item) => {
          return {
            key: item.key,
            style: { width: '100%' },
            label: (
              <Statistic
                layout="vertical"
                title={item.title}
                value={item.value}
                status={item.status as StatisticProps['status']}
                style={{
                  width: 120,
                  borderInlineEnd: item.total ? '1px solid #f0f0f0' : undefined,
                }}
              />
            ),
            children: (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fafafa',
                  height: 100,
                }}
              >
                \u5173\u8054\u5C55\u793A\u5185\u5BB9 {item.title}
              </div>
            ),
          };
        }),
      }}
    />
  );
};
`},37350:function(e,n){n.Z=`import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Statistic } = StatisticCard;

export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard split={responsive ? 'horizontal' : 'vertical'}>
        <StatisticCard
          colSpan={responsive ? 24 : 6}
          title="\u8D22\u5E74\u4E1A\u7EE9\u76EE\u6807"
          statistic={{
            value: 82.6,
            suffix: '\u4EBF',
            description: <Statistic title="\u65E5\u540C\u6BD4" value="6.47%" trend="up" />,
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/PmKfn4qvD/mubiaowancheng-lan.svg"
              alt="\u8FDB\u5EA6\u6761"
              width="100%"
            />
          }
          footer={
            <>
              <Statistic
                value="70.98%"
                title="\u8D22\u5E74\u4E1A\u7EE9\u5B8C\u6210\u7387"
                layout="horizontal"
              />
              <Statistic
                value="86.98%"
                title="\u53BB\u5E74\u540C\u671F\u4E1A\u7EE9\u5B8C\u6210\u7387"
                layout="horizontal"
              />
              <Statistic
                value="88.98%"
                title="\u524D\u5E74\u540C\u671F\u4E1A\u7EE9\u5B8C\u6210\u7387"
                layout="horizontal"
              />
            </>
          }
        />
        <StatisticCard.Group
          colSpan={responsive ? 24 : 18}
          direction={responsive ? 'column' : undefined}
        >
          <StatisticCard
            statistic={{
              title: '\u8D22\u5E74\u603B\u6536\u5165',
              value: 601987768,
              description: (
                <Statistic title="\u65E5\u540C\u6BD4" value="6.15%" trend="up" />
              ),
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                alt="\u6298\u7EBF\u56FE"
                width="100%"
              />
            }
          >
            <Statistic
              title="\u5927\u76D8\u603B\u6536\u5165"
              value={1982312}
              layout="vertical"
              description={
                <Statistic title="\u65E5\u540C\u6BD4" value="6.15%" trend="down" />
              }
            />
          </StatisticCard>
          <StatisticCard
            statistic={{
              title: '\u5F53\u65E5\u6392\u540D',
              value: 6,
              description: (
                <Statistic title="\u65E5\u540C\u6BD4" value="3.85%" trend="down" />
              ),
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                alt="\u6298\u7EBF\u56FE"
                width="100%"
              />
            }
          >
            <Statistic
              title="\u8FD17\u65E5\u6536\u5165"
              value={17458}
              layout="vertical"
              description={
                <Statistic title="\u65E5\u540C\u6BD4" value="6.47%" trend="up" />
              }
            />
          </StatisticCard>
          <StatisticCard
            statistic={{
              title: '\u8D22\u5E74\u4E1A\u7EE9\u6536\u5165\u6392\u540D',
              value: 2,
              description: (
                <Statistic title="\u65E5\u540C\u6BD4" value="6.47%" trend="up" />
              ),
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                alt="\u6298\u7EBF\u56FE"
                width="100%"
              />
            }
          >
            <Statistic
              title="\u6708\u4ED8\u8D39\u4E2A\u6570"
              value={601}
              layout="vertical"
              description={
                <Statistic title="\u65E5\u540C\u6BD4" value="6.47%" trend="down" />
              }
            />
          </StatisticCard>
        </StatisticCard.Group>
      </ProCard>
    </RcResizeObserver>
  );
};
`},12169:function(e,n){n.Z=`import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Statistic, Divider } = StatisticCard;

export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
        <StatisticCard
          statistic={{
            title: '\u603B\u6D41\u91CF(\u4EBA\u6B21)',
            value: 601986875,
          }}
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '\u4ED8\u8D39\u6D41\u91CF',
            value: 3701928,
            description: <Statistic title="\u5360\u6BD4" value="61.5%" />,
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
              alt="\u767E\u5206\u6BD4"
              width="100%"
            />
          }
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: '\u514D\u8D39\u6D41\u91CF',
            value: 1806062,
            description: <Statistic title="\u5360\u6BD4" value="38.5%" />,
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
              alt="\u767E\u5206\u6BD4"
              width="100%"
            />
          }
          chartPlacement="left"
        />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
};
`},60395:function(e,n){n.Z=`import { StatisticCard } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

export default () => {
  return (
    <>
      <StatisticCard style={{ width: 160 }}>
        <Statistic title="\u65E5\u73AF\u6BD4" value="7.60%" trend="up" />
        <Statistic title="\u5468\u73AF\u6BD4" value="7.60%" trend="down" />
        <Statistic title="\u5468\u73AF\u6BD4" value="0.00%" />
      </StatisticCard>
    </>
  );
};
`},96386:function(e,n){n.Z=`import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Space } from 'antd';

export default () => {
  return (
    <Space>
      <ProCard
        title="Actions \u64CD\u4F5C\u9879"
        style={{ maxWidth: 300 }}
        bordered
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>

      <ProCard
        title="\u5355\u72EC\u7684 Actions \u64CD\u4F5C\u9879"
        style={{ maxWidth: 300 }}
        bordered
        actions={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              flex: 1,
              gap: 8,
            }}
          >
            <SettingOutlined key="setting" />
            \u8BBE\u7F6E
          </div>
        }
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>

      <ProCard bordered title="\u65E0 Actions \u64CD\u4F5C\u9879" style={{ maxWidth: 300 }}>
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>
    </Space>
  );
};
`},3e3:function(e,n){n.Z=`import {
  ProCard,
  ProFormGroup,
  ProFormSwitch,
} from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard
        title="\u9ED8\u8BA4\u5C3A\u5BF8"
        bordered
        extra={
          <ProFormGroup>
            <ProFormSwitch
              name="Enable"
              noStyle
              checkedChildren={'\u542F\u7528'}
              unCheckedChildren={'\u7981\u7528'}
            />
          </ProFormGroup>
        }
        tooltip="\u8FD9\u662F\u63D0\u793A"
        style={{ maxWidth: 300 }}
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>
      <ProCard
        title="\u5E26\u5361\u7247\u9634\u5F71"
        extra="extra"
        tooltip="\u8FD9\u662F\u63D0\u793A"
        style={{ maxWidth: 300 }}
        boxShadow
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>
      <ProCard
        title="\u5C0F\u5C3A\u5BF8\u5361\u7247"
        extra="extra"
        tooltip="\u8FD9\u662F\u63D0\u793A"
        style={{ maxWidth: 300, marginBlockStart: 24 }}
        size="small"
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>
    </>
  );
};
`},93542:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <ProCard
      title="\u6807\u9898"
      extra="extra"
      tooltip="\u8FD9\u662F\u63D0\u793A"
      style={{ maxWidth: 300 }}
      bordered
    >
      \u5185\u5BB9
    </ProCard>
  );
};
`},62910:function(e,n){n.Z=`import { RightOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
        gap: 12,
      }}
    >
      <ProCard
        title="\u53EF\u6298\u53E0"
        headerBordered
        collapsible
        defaultCollapsed
        onCollapse={(collapse) => console.log(collapse)}
        extra={
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            \u63D0\u4EA4
          </Button>
        }
      >
        \u5185\u5BB9
      </ProCard>
      <ProCard
        title="\u53EF\u6298\u53E0"
        bordered
        headerBordered
        collapsible
        defaultCollapsed
        onCollapse={(collapse) => console.log(collapse)}
        extra={
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            \u63D0\u4EA4
          </Button>
        }
      >
        \u5185\u5BB9
      </ProCard>
      <ProCard
        bordered
        size="small"
        title="\u53EF\u6298\u53E0"
        headerBordered
        collapsible
        defaultCollapsed
        onCollapse={(collapse) => console.log(collapse)}
        extra={
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            \u63D0\u4EA4
          </Button>
        }
      >
        \u5185\u5BB9
      </ProCard>
      <ProCard
        title="\u53EF\u6298\u53E0-\u53D7\u63A7\u81EA\u5B9A\u4E49"
        extra={
          <RightOutlined
            rotate={!collapsed ? 90 : undefined}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        }
        style={{ marginBlockStart: 16 }}
        headerBordered
        collapsed={collapsed}
      >
        \u5185\u5BB9
      </ProCard>
      <ProCard
        title="\u53EF\u6298\u53E0-\u56FE\u6807\u81EA\u5B9A\u4E49"
        collapsibleIconRender={({
          collapsed: buildInCollapsed,
        }: {
          collapsed: boolean;
        }) => (buildInCollapsed ? <span>\u6536\u8D77 - </span> : <span>\u5C55\u5F00 - </span>)}
        style={{ marginBlockStart: 16 }}
        headerBordered
        collapsible
        defaultCollapsed
      >
        \u5185\u5BB9
      </ProCard>
    </div>
  );
};
`},84311:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard
        direction="column"
        ghost
        gutter={{
          xs: 8,
          sm: 8,
          md: 8,
          lg: 8,
          xl: 8,
          xxl: 8,
        }}
      >
        <ProCard layout="center" bordered>
          colSpan - 24
        </ProCard>
        <ProCard
          colSpan={{
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            xxl: 24,
          }}
          layout="center"
          bordered
        >
          colSpan - 12
        </ProCard>
        <ProCard
          colSpan={{
            xs: 24,
            sm: 12,
            md: 8,
            lg: 6,
          }}
          layout="center"
          bordered
        >
          colSpan - 8
        </ProCard>
        <ProCard colSpan={0} layout="center" bordered>
          colSpan - 0
        </ProCard>
      </ProCard>
      <ProCard gutter={8} title="24\u6805\u683C" style={{ marginBlockStart: 8 }}>
        <ProCard colSpan={12} layout="center" bordered>
          colSpan-12
        </ProCard>
        <ProCard colSpan={6} layout="center" bordered>
          colSpan-6
        </ProCard>
        <ProCard colSpan={6} layout="center" bordered>
          colSpan-6
        </ProCard>
      </ProCard>
      <ProCard style={{ marginBlockStart: 8 }} gutter={8} ghost>
        <ProCard colSpan="200px" layout="center" bordered>
          colSpan - 200px
        </ProCard>
        <ProCard layout="center" bordered>
          Auto
        </ProCard>
      </ProCard>
      <ProCard style={{ marginBlockStart: 8 }} gutter={8} ghost>
        <ProCard bordered layout="center">
          Auto
        </ProCard>
        <ProCard colSpan="30%" bordered>
          colSpan - 30%
        </ProCard>
      </ProCard>
    </>
  );
};
`},49838:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';
import { Statistic } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Divider } = ProCard;

export default () => {
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard.Group title="\u6838\u5FC3\u6307\u6807" direction={responsive ? 'column' : 'row'}>
        <ProCard>
          <Statistic title="\u4ECA\u65E5UV" value={79.0} precision={2} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="\u51BB\u7ED3\u91D1\u989D" value={112893.0} precision={2} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="\u4FE1\u606F\u5B8C\u6574\u5EA6" value={93} suffix="/ 100" />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="\u51BB\u7ED3\u91D1\u989D" value={112893.0} />
        </ProCard>
      </ProCard.Group>
    </RcResizeObserver>
  );
};
`},42766:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard title="\u5361\u7247\u7EC4\u5C55\u5F00" ghost gutter={8} collapsible>
        <ProCard layout="center" bordered>
          \u5361\u7247\u5185\u5BB9
        </ProCard>
        <ProCard layout="center" bordered>
          \u5361\u7247\u5185\u5BB9
        </ProCard>
        <ProCard layout="center" bordered>
          \u5361\u7247\u5185\u5BB9
        </ProCard>
      </ProCard>
    </>
  );
};
`},76471:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard gutter={[16, 16]}>
        <ProCard colSpan="30%" title="title" headerBordered bordered>
          300px
        </ProCard>
        <ProCard bordered>Auto</ProCard>
      </ProCard>

      <ProCard
        gutter={[{ xs: 8, sm: 8, md: 16, lg: 24, xl: 32 }, 16]}
        style={{ marginBlockStart: 16 }}
      >
        <ProCard bordered>Responsive</ProCard>
        <ProCard bordered>Responsive</ProCard>
        <ProCard bordered>Responsive</ProCard>
      </ProCard>

      <ProCard gutter={16} style={{ marginBlockStart: 16 }}>
        <ProCard bordered>Auto</ProCard>
        <ProCard bordered>Auto</ProCard>
        <ProCard bordered>Auto</ProCard>
      </ProCard>
    </>
  );
};
`},24891:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <ProCard
      title="\u6807\u9898"
      extra="extra"
      tooltip="\u8FD9\u662F\u63D0\u793A"
      style={{ maxWidth: 300 }}
      headerBordered
    >
      \u5185\u5BB9
    </ProCard>
  );
};
`},74442:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';

export default () => {
  return <ProCard style={{ maxWidth: 300 }}>\u5185\u5BB9</ProCard>;
};
`},68521:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard style={{ maxWidth: 300 }} hoverable bordered>
        \u5185\u5BB9
      </ProCard>
    </>
  );
};
`},44180:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard title="\u6A2A\u5411\u5185\u90E8\u5361\u7247" bordered headerBordered gutter={16}>
        <ProCard title="\u5185\u90E8\u5361\u7247\u6807\u9898" type="inner" bordered>
          \u5185\u90E8\u5361\u7247\u5185\u5BB9
        </ProCard>
        <ProCard title="\u5185\u90E8\u5361\u7247\u6807\u9898" type="inner" bordered>
          \u5185\u90E8\u5361\u7247\u5185\u5BB9
        </ProCard>
      </ProCard>

      <ProCard
        title="\u7AD6\u5411\u5185\u90E8\u5361\u7247"
        bordered
        headerBordered
        direction="column"
        gutter={[0, 16]}
        style={{ marginBlockStart: 8 }}
      >
        <ProCard title="\u5185\u90E8\u5361\u7247\u6807\u9898" type="inner" bordered>
          \u5185\u90E8\u5361\u7247\u5185\u5BB9
        </ProCard>
        <ProCard title="\u5185\u90E8\u5361\u7247\u6807\u9898" type="inner" bordered>
          \u5185\u90E8\u5361\u7247\u5185\u5BB9
        </ProCard>
      </ProCard>
    </>
  );
};
`},71529:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard
        title="\u6807\u9898"
        extra="extra"
        layout="center"
        direction="column"
        style={{ maxWidth: 300, height: 200 }}
      >
        <div>123</div>
        <div>456</div>
      </ProCard>
    </>
  );
};
`},85782:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard loading style={{ maxWidth: 300 }}>
        \u5185\u5BB9
      </ProCard>

      <ProCard
        loading
        style={{ maxWidth: 300, marginBlockStart: 16 }}
        layout="center"
      >
        \u5185\u5BB9
      </ProCard>

      <ProCard
        title="\u81EA\u5B9A\u4E49 Loading"
        extra="extra"
        loading={<div>\u52A0\u8F7D\u4E2D</div>}
        style={{ maxWidth: 300, marginBlockStart: 16 }}
      >
        \u5185\u5BB9
      </ProCard>
    </>
  );
};
`},59380:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard
        style={{ marginBlockStart: 8 }}
        gutter={[16, 16]}
        wrap
        title="\u6362\u884C"
      >
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          layout="center"
          bordered
        >
          Col
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          layout="center"
          bordered
        >
          Col
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          layout="center"
          bordered
        >
          Col
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          layout="center"
          bordered
        >
          Col
        </ProCard>
      </ProCard>
    </>
  );
};
`},97673:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard style={{ marginBlockStart: 8 }} gutter={8} title="24\u6805\u683C">
        <ProCard
          colSpan={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }}
          layout="center"
          bordered
        >
          Col
        </ProCard>
        <ProCard
          colSpan={{ xs: 20, sm: 16, md: 12, lg: 8, xl: 4 }}
          layout="center"
          bordered
        >
          Col
        </ProCard>
        <ProCard
          colSpan={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }}
          layout="center"
          bordered
        >
          Col
        </ProCard>
      </ProCard>
      <ProCard style={{ marginBlockStart: 8 }} gutter={8} title="\u6307\u5B9A\u5BBD\u5EA6px">
        <ProCard
          colSpan={{
            xs: '50px',
            sm: '100px',
            md: '200px',
            lg: '300px',
            xl: '400px',
          }}
          layout="center"
          bordered
        >
          Col
        </ProCard>
        <ProCard layout="center" bordered>
          Auto
        </ProCard>
      </ProCard>

      <ProCard
        style={{ marginBlockStart: 8 }}
        gutter={8}
        title="\u6307\u5B9A\u5BBD\u5EA6\u767E\u5206\u6BD4"
      >
        <ProCard layout="center" bordered>
          Auto
        </ProCard>
        <ProCard
          layout="center"
          colSpan={{
            xs: '10%',
            sm: '20%',
            md: '30%',
            lg: '40%',
            xl: '50%',
          }}
          bordered
        >
          Col - \u767E\u5206\u6BD4
        </ProCard>
      </ProCard>
    </>
  );
};
`},89575:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="\u590D\u6742\u5207\u5206"
        extra="2019\u5E749\u670828\u65E5"
        bordered
        headerBordered
        split={responsive ? 'horizontal' : 'vertical'}
      >
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split={responsive ? 'horizontal' : 'vertical'}>
              <ProCard title="\u6628\u65E5\u5168\u90E8\u6D41\u91CF">123</ProCard>
              <ProCard title="\u672C\u6708\u7D2F\u8BA1\u6D41\u91CF">234</ProCard>
              <ProCard title="\u4ECA\u5E74\u7D2F\u8BA1\u6D41\u91CF">345</ProCard>
            </ProCard>
            <ProCard split="vertical">
              <ProCard title="\u8FD0\u884C\u4E2D\u8BD5\u9A8C">12/56</ProCard>
              <ProCard title="\u5386\u53F2\u8BD5\u9A8C\u603B\u6570">134 \u4E2A</ProCard>
            </ProCard>
          </ProCard>
          <ProCard title="\u6D41\u91CF\u8D8B\u52BF">
            <div>\u56FE\u8868</div>
            <div>\u56FE\u8868</div>
            <div>\u56FE\u8868</div>
            <div>\u56FE\u8868</div>
            <div>\u56FE\u8868</div>
          </ProCard>
        </ProCard>
        <ProCard title="\u6D41\u91CF\u5360\u7528\u60C5\u51B5">\u53F3\u4FA7\u5185\u5BB9</ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};
`},12765:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

export default () => {
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="\u5DE6\u53F3\u5206\u680F\u5E26\u6807\u9898"
        extra="2019\u5E749\u670828\u65E5"
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
      >
        <ProCard title="\u5DE6\u4FA7\u8BE6\u60C5" colSpan="50%">
          <div style={{ height: 360 }}>\u5DE6\u4FA7\u5185\u5BB9</div>
        </ProCard>
        <ProCard title="\u6D41\u91CF\u5360\u7528\u60C5\u51B5">
          <div style={{ height: 360 }}>\u53F3\u4FA7\u5185\u5BB9</div>
        </ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};
`},9240:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <ProCard split="vertical">
      <ProCard title="\u5DE6\u4FA7\u8BE6\u60C5" colSpan="30%">
        \u5DE6\u4FA7\u5185\u5BB9
      </ProCard>
      <ProCard title="\u5DE6\u53F3\u5206\u680F\u5B50\u5361\u7247\u5E26\u6807\u9898" headerBordered>
        <div style={{ height: 360 }}>\u53F3\u4FA7\u5185\u5BB9</div>
      </ProCard>
    </ProCard>
  );
};
`},90697:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';
import { Button, Space, Steps } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Step } = Steps;

export default () => {
  const [current, setCurrent] = useState(0);
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        style={{ height: 320 }}
      >
        <ProCard colSpan={responsive ? 24 : 6}>
          <Steps
            direction={responsive ? 'horizontal' : 'vertical'}
            size="small"
            current={current}
            style={{ height: '100%' }}
          >
            <Step title="\u586B\u5199\u57FA\u672C\u4FE1\u606F" />
            <Step title="\u914D\u7F6E\u6A21\u677F" />
            <Step title="\u914D\u7F6E\u8BBF\u95EE" />
            <Step title="\u914D\u7F6E\u90E8\u7F72\u548C\u8C03\u5EA6" />
            <Step title="\u9884\u89C8" />
          </Steps>
        </ProCard>
        <ProCard title="\u6D41\u91CF\u5360\u7528\u60C5\u51B5" colSpan={responsive ? 24 : 18}>
          <Space>
            <Button
              key="primary"
              type="primary"
              onClick={() => setCurrent(current + 1)}
              disabled={current === 5}
            >
              \u4E0B\u4E00\u6B65
            </Button>
            <Button
              key="pre"
              onClick={() => setCurrent(current - 1)}
              disabled={current === 0}
            >
              \u4E0A\u4E00\u6B65
            </Button>
          </Space>
        </ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};
`},64757:function(e,n){n.Z=`import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <ProCard
      tabs={{
        type: 'card',
      }}
    >
      <ProCard.TabPane key="tab1" tab="\u4EA7\u54C1\u4E00">
        \u5185\u5BB9\u4E00
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="\u4EA7\u54C1\u4E8C">
        \u5185\u5BB9\u4E8C
      </ProCard.TabPane>
    </ProCard>
  );
};
`},48185:function(e,n){n.Z=`import type { ProCardTabsProps } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import { Select, Space } from 'antd';
import { useState } from 'react';

const { Option } = Select;

export default () => {
  const [tab, setTab] = useState('tab2');
  const [tabPosition, setTabPosition] =
    useState<ProCardTabsProps['tabPosition']>('top');

  return (
    <div>
      <Space style={{ marginBlockEnd: 16 }}>
        Tab position\uFF1A
        <Select
          value={tabPosition}
          onChange={(value) => setTabPosition(value)}
          popupMatchSelectWidth={false}
        >
          <Option value="top">top</Option>
          <Option value="bottom">bottom</Option>
          <Option value="left">left</Option>
          <Option value="right">right</Option>
        </Select>
      </Space>
      <ProCard
        tabs={{
          tabPosition,
          activeKey: tab,
          items: [
            {
              label: \`\u4EA7\u54C1\u4E00\`,
              key: 'tab1',
              children: \`\u5185\u5BB9\u4E00\`,
            },
            {
              label: \`\u4EA7\u54C1\u4E8C\`,
              key: 'tab2',
              children: \`\u5185\u5BB9\u4E8C\`,
            },
            {
              label: \`\u4EA7\u54C1\u4E09\`,
              key: 'tab3',
              children: \`\u5185\u5BB9\u4E09\`,
            },
          ],
          onChange: (key) => {
            setTab(key);
          },
        }}
      />
    </div>
  );
};
`},88739:function(e,n){n.Z=`import { ProDescriptions } from '@ant-design/pro-components';
import { Button } from 'antd';
import dayjs from 'dayjs';

export default () => {
  return (
    <ProDescriptions
      column={2}
      title="\u9AD8\u7EA7\u5B9A\u4E49\u5217\u8868"
      tooltip="\u5305\u542B\u4E86\u4ECE\u670D\u52A1\u5668\u8BF7\u6C42\uFF0Ccolumns\u7B49\u529F\u80FD"
    >
      <ProDescriptions.Item valueType="option">
        <Button key="primary" type="primary">
          \u63D0\u4EA4
        </Button>
      </ProDescriptions.Item>
      <ProDescriptions.Item
        span={2}
        valueType="text"
        contentStyle={{
          maxWidth: '80%',
        }}
        renderText={(_) => {
          return _ + _;
        }}
        ellipsis
        label="\u6587\u672C"
      >
        \u8FD9\u662F\u4E00\u6BB5\u5F88\u957F\u5F88\u957F\u8D85\u7EA7\u8D85\u7EA7\u957F\u7684\u65E0\u610F\u4E49\u8BF4\u660E\u6587\u672C\u5E76\u4E14\u91CD\u590D\u4E86\u5F88\u591A\u6CA1\u6709\u610F\u4E49\u7684\u8BCD\u8BED\uFF0C\u5C31\u662F\u4E3A\u4E86\u8BA9\u5B83\u53D8\u5F97\u5F88\u957F\u5F88\u957F\u8D85\u7EA7\u8D85\u7EA7\u957F
      </ProDescriptions.Item>
      <ProDescriptions.Item
        label="\u91D1\u989D"
        tooltip="\u4EC5\u4F9B\u53C2\u8003\uFF0C\u4EE5\u5B9E\u9645\u4E3A\u51C6"
        valueType="money"
      >
        100
      </ProDescriptions.Item>
      <ProDescriptions.Item label="\u767E\u5206\u6BD4" valueType="percent">
        100
      </ProDescriptions.Item>
      <ProDescriptions.Item
        label="\u9009\u62E9\u6846"
        valueEnum={{
          all: { text: '\u5168\u90E8', status: 'Default' },
          open: {
            text: '\u672A\u89E3\u51B3',
            status: 'Error',
          },
          closed: {
            text: '\u5DF2\u89E3\u51B3',
            status: 'Success',
          },
          processing: {
            text: '\u89E3\u51B3\u4E2D',
            status: 'Processing',
          },
        }}
      >
        open
      </ProDescriptions.Item>
      <ProDescriptions.Item
        label="\u8FDC\u7A0B\u9009\u62E9\u6846"
        request={async () => [
          { label: '\u5168\u90E8', value: 'all' },
          { label: '\u672A\u89E3\u51B3', value: 'open' },
          { label: '\u5DF2\u89E3\u51B3', value: 'closed' },
          { label: '\u89E3\u51B3\u4E2D', value: 'processing' },
        ]}
      >
        closed
      </ProDescriptions.Item>
      <ProDescriptions.Item label="\u8FDB\u5EA6\u6761" valueType="progress">
        40
      </ProDescriptions.Item>
      <ProDescriptions.Item label="\u65E5\u671F\u65F6\u95F4" valueType="dateTime">
        {dayjs().valueOf()}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="\u65E5\u671F" valueType="date">
        {dayjs().valueOf()}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="\u65E5\u671F\u533A\u95F4" valueType="dateTimeRange">
        {[dayjs().add(-1, 'd').valueOf(), dayjs().valueOf()]}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="\u65F6\u95F4" valueType="time">
        {dayjs().valueOf()}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="\u4EE3\u7801\u5757" valueType="code">
        {\`
yarn run v1.22.0
$ eslint --format=pretty ./packages
Done in 9.70s.
          \`}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="JSON \u4EE3\u7801\u5757" valueType="jsonCode">
        {\`{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,

    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["**/src", "**/docs", "scripts", "**/demo", ".eslintrc.js"]
}
\`}
      </ProDescriptions.Item>
    </ProDescriptions>
  );
};
`},13278:function(e,n){n.Z=`import { ProDescriptions } from '@ant-design/pro-components';

export default () => {
  return (
    <ProDescriptions
      title="\u9AD8\u7EA7\u5B9A\u4E49\u5217\u8868request columns"
      request={async () => {
        return Promise.resolve({
          success: true,
          data: {
            date: '20200809',
            money: '1212100',
            money2: -12345.33,
            state: 'all',
            switch: true,
            state2: 'open',
          },
        });
      }}
      emptyText={'\u7A7A'}
      columns={[
        {
          title: '\u6587\u672C',
          key: 'text',
          dataIndex: 'id',
        },
        {
          title: '\u72B6\u6001',
          key: 'state',
          dataIndex: 'state',
          valueType: 'select',
          valueEnum: {
            all: { text: '\u5168\u90E8', status: 'Default' },
            open: {
              text: '\u672A\u89E3\u51B3',
              status: 'Error',
            },
            closed: {
              text: '\u5DF2\u89E3\u51B3',
              status: 'Success',
            },
          },
        },
        {
          title: '\u72B6\u60012',
          key: 'state2',
          dataIndex: 'state2',
        },
        {
          title: '\u65F6\u95F4',
          key: 'date',
          dataIndex: 'date',
          valueType: 'date',
        },
        {
          title: '\u65F6\u95F4',
          key: 'date',
          dataIndex: 'date',
          valueType: 'date',
          fieldProps: {
            format: 'DD.MM.YYYY',
          },
        },
        {
          title: '\u5F00\u5173',
          key: 'switch',
          dataIndex: 'switch',
          valueType: 'switch',
        },
        {
          title: 'money',
          key: 'money',
          dataIndex: 'money',
          valueType: 'money',
          fieldProps: {
            moneySymbol: '$',
          },
        },
        {
          title: 'money\u65E0\u7B26\u53F7',
          key: 'money',
          dataIndex: 'money',
          valueType: 'money',
          fieldProps: {
            moneySymbol: false,
          },
        },
        {
          title: 'money\u8D1F\u6570\u65E0\u7B26\u53F7',
          key: 'money2',
          dataIndex: 'money2',
          valueType: 'money',
          fieldProps: {
            moneySymbol: false,
          },
        },
        {
          title: '\u64CD\u4F5C',
          valueType: 'option',
          render: () => [
            <a target="_blank" rel="noopener noreferrer" key="link">
              \u94FE\u8DEF
            </a>,
            <a target="_blank" rel="noopener noreferrer" key="warning">
              \u62A5\u8B66
            </a>,
            <a target="_blank" rel="noopener noreferrer" key="view">
              \u67E5\u770B
            </a>,
          ],
        },
      ]}
    >
      <ProDescriptions.Item
        dataIndex="percent"
        label="\u767E\u5206\u6BD4"
        valueType="percent"
      >
        100
      </ProDescriptions.Item>
      <div>\u591A\u4F59\u7684dom</div>
      <ProDescriptions.Item label="\u8D85\u94FE\u63A5">
        <a href="alipay.com">\u8D85\u94FE\u63A5</a>
      </ProDescriptions.Item>
    </ProDescriptions>
  );
};
`},37771:function(e,n){n.Z=`import { ProDescriptions } from '@ant-design/pro-components';
import { Input, Tooltip } from 'antd';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef();
  return (
    <ProDescriptions
      actionRef={actionRef}
      // bordered
      formProps={{
        onValuesChange: (e, f) => console.log(f),
      }}
      title="\u53EF\u7F16\u8F91\u7684\u5B9A\u4E49\u5217\u8868"
      request={async () => {
        return Promise.resolve({
          success: true,
          data: {
            rate: 5,
            id: '\u8FD9\u662F\u4E00\u6BB5\u6587\u672Ccolumns',
            date: '20200809',
            money: '1212100',
            state: 'all',
            state2: 'open',
          },
        });
      }}
      editable={{}}
      columns={[
        {
          title: '\u6587\u672C',
          key: 'text',
          dataIndex: 'id',
          copyable: true,
          ellipsis: true,
        },
        {
          title: '\u72B6\u6001',
          key: 'state',
          dataIndex: 'state',
          valueType: 'select',
          editable: false,
          valueEnum: {
            all: { text: '\u5168\u90E8', status: 'Default' },
            open: {
              text: '\u672A\u89E3\u51B3',
              status: 'Error',
            },
            closed: {
              text: '\u5DF2\u89E3\u51B3',
              status: 'Success',
            },
          },
        },
        {
          title: '\u72B6\u60012',
          key: 'state2',
          dataIndex: 'state2',
          renderFormItem: () => {
            return <Input placeholder="\u8F93\u5165 Success \u5207\u6362\u5206\u503C" />;
          },
        },
        {
          title: '\u5206\u503C',
          dataIndex: 'fraction',
          valueType: (record) => {
            const scoringMethod = record?.state2;
            if (scoringMethod === 'Success') return 'select';
            return 'digit';
          },
          fieldProps: {
            mode: 'multiple',
          },
          request: async () =>
            ['A', 'B', 'D', 'E', 'F'].map((item, index) => ({
              label: item,
              value: index,
            })),
        },

        {
          title: '\u65F6\u95F4',
          key: 'date',
          dataIndex: 'date',
          valueType: 'date',
        },
        {
          title: 'Rate',
          key: 'rate',
          dataIndex: 'rate',
          valueType: 'rate',
        },
        {
          title: 'money',
          key: 'money',
          dataIndex: 'money',
          valueType: 'money',
          render: (dom, entity, index, action) => {
            return (
              <Tooltip title="\u70B9\u51FB\u8FDB\u5165\u7F16\u8F91\u72B6\u6001">
                <div
                  onClick={() => {
                    action?.startEditable('money');
                  }}
                >
                  {dom}
                </div>
              </Tooltip>
            );
          },
        },
        {
          title: '\u64CD\u4F5C',
          valueType: 'option',
          render: () => [
            <a target="_blank" rel="noopener noreferrer" key="link">
              \u94FE\u8DEF
            </a>,
            <a target="_blank" rel="noopener noreferrer" key="warning">
              \u62A5\u8B66
            </a>,
            <a target="_blank" rel="noopener noreferrer" key="view">
              \u67E5\u770B
            </a>,
          ],
        },
      ]}
    >
      <ProDescriptions.Item
        dataIndex="percent"
        label="\u767E\u5206\u6BD4"
        valueType="percent"
      >
        100
      </ProDescriptions.Item>
    </ProDescriptions>
  );
};
`},72758:function(e,n){n.Z=`import { ProDescriptions } from '@ant-design/pro-components';
import dayjs from 'dayjs';

export default () => {
  return (
    <>
      <ProDescriptions
        column={2}
        title="\u9AD8\u7EA7\u5B9A\u4E49\u5217\u8868"
        tooltip="\u5305\u542B\u4E86\u4ECE\u670D\u52A1\u5668\u8BF7\u6C42\uFF0Ccolumns\u7B49\u529F\u80FD"
      >
        <ProDescriptions.Item
          label="\u65E5\u671F"
          fieldProps={{
            format: 'YYYY.MM.DD',
          }}
          valueType="date"
        >
          {dayjs().valueOf()}
        </ProDescriptions.Item>
        <ProDescriptions.Item
          label="\u65E5\u671F\u533A\u95F4"
          fieldProps={{
            format: 'YYYY.MM.DD HH:mm:ss',
          }}
          valueType="dateTimeRange"
        >
          {[dayjs().add(-1, 'd').valueOf(), dayjs().valueOf()]}
        </ProDescriptions.Item>
        <ProDescriptions.Item
          label="\u65F6\u95F4"
          fieldProps={{
            format: 'YYYY.MM.DD',
          }}
          valueType="time"
        >
          {dayjs().valueOf()}
        </ProDescriptions.Item>

        <ProDescriptions.Item
          label="\u65F6\u95F4\u65E5\u671F"
          fieldProps={{
            format: 'YYYY.MM.DD HH:mm:ss',
          }}
          valueType="dateTime"
        >
          {dayjs().valueOf()}
        </ProDescriptions.Item>

        <ProDescriptions.Item
          label="\u66F4\u65B0\u65F6\u95F4"
          fieldProps={{
            format: 'YYYY.MM.DD',
          }}
          valueType="fromNow"
        >
          {dayjs().add(-1, 'month').valueOf()}
        </ProDescriptions.Item>
      </ProDescriptions>
    </>
  );
};
`},87373:function(e,n){n.Z=`import type { ProDescriptionsActionType } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef<ProDescriptionsActionType>();
  return (
    <ProDescriptions
      actionRef={actionRef}
      title="\u9AD8\u7EA7\u5B9A\u4E49\u5217\u8868 request"
      request={async () => {
        return Promise.resolve({
          success: true,
          data: { id: '\u8FD9\u662F\u4E00\u6BB5\u6587\u672C', date: '20200730', money: '12121' },
        });
      }}
      extra={<Button type="link">\u4FEE\u6539</Button>}
    >
      <ProDescriptions.Item dataIndex="id" />
      <ProDescriptions.Item dataIndex="date" label="\u65E5\u671F" valueType="date" />
      <ProDescriptions.Item label="money" dataIndex="money" valueType="money" />
      <ProDescriptions.Item label="\u6587\u672C" valueType="option">
        <Button
          type="primary"
          onClick={() => {
            actionRef.current?.reload();
          }}
          key="reload"
        >
          \u5237\u65B0
        </Button>
        <Button key="rest">\u91CD\u7F6E</Button>
      </ProDescriptions.Item>
    </ProDescriptions>
  );
};
`},46498:function(e,n){n.Z=`import { ProDescriptions } from '@ant-design/pro-components';

export default () => {
  return (
    <ProDescriptions
      title="dataSource and columns"
      dataSource={{
        id: '\u8FD9\u662F\u4E00\u6BB5\u6587\u672Ccolumns',
        date: '20200809',
        money: '1212100',
        state: 'all',
        state2: 'open',
      }}
      columns={[
        {
          title: '\u6587\u672C',
          key: 'text',
          dataIndex: 'id',
          ellipsis: true,
          copyable: true,
        },
        {
          title: '\u72B6\u6001',
          key: 'state',
          dataIndex: 'state',
          valueType: 'select',
          valueEnum: {
            all: { text: '\u5168\u90E8', status: 'Default' },
            open: {
              text: '\u672A\u89E3\u51B3',
              status: 'Error',
            },
            closed: {
              text: '\u5DF2\u89E3\u51B3',
              status: 'Success',
            },
          },
        },
        {
          title: '\u72B6\u60012',
          key: 'state2',
          dataIndex: 'state2',
        },
        {
          title: '\u65F6\u95F4',
          key: 'date',
          dataIndex: 'date',
          valueType: 'date',
        },
        {
          title: 'money',
          key: 'money',
          dataIndex: 'money',
          valueType: 'money',
        },
        {
          title: '\u64CD\u4F5C',
          valueType: 'option',
          render: () => [
            <a target="_blank" rel="noopener noreferrer" key="link">
              \u94FE\u8DEF
            </a>,
            <a target="_blank" rel="noopener noreferrer" key="warning">
              \u62A5\u8B66
            </a>,
            <a target="_blank" rel="noopener noreferrer" key="view">
              \u67E5\u770B
            </a>,
          ],
        },
      ]}
    >
      <ProDescriptions.Item label="\u767E\u5206\u6BD4" valueType="percent">
        100
      </ProDescriptions.Item>
    </ProDescriptions>
  );
};
`},90790:function(e,n){n.Z=`import {
  ProForm,
  ProFormDependency,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';

const Demo = () => {
  return (
    <ProForm>
      <ProFormSelect
        options={[
          {
            value: 'select',
            label: '\u9009\u62E9\u6846',
          },
          {
            value: 'input',
            label: '\u8F93\u5165\u6846',
          },
        ]}
        width="xs"
        name="globalUseMode"
        label="\u5168\u5C40\u751F\u6548\u65B9\u5F0F\u7EC4\u4EF6\u7684\u7C7B\u578B"
      />
      <ProFormList
        name={['default', 'users']}
        label="\u7528\u6237\u4FE1\u606F"
        initialValue={[
          {
            name: '1111',
          },
        ]}
        alwaysShowItemLabel
      >
        <ProForm.Group key="group">
          <ProFormSelect
            options={[
              {
                value: 'select',
                label: '\u9009\u62E9\u6846',
              },
              {
                value: 'input',
                label: '\u8F93\u5165\u6846',
              },
            ]}
            width="xs"
            name="useMode"
            label="\u751F\u6548\u65B9\u5F0F\u7EC4\u4EF6\u7684\u7C7B\u578B"
          />
          <ProFormDependency name={['useMode']}>
            {({ useMode }) => {
              if (useMode === 'select') {
                return (
                  <ProFormSelect
                    options={[
                      {
                        value: 'chapter',
                        label: '\u76D6\u7AE0\u540E\u751F\u6548',
                      },
                    ]}
                    width="md"
                    name="function"
                    label="\u751F\u6548\u65B9\u5F0F"
                  />
                );
              }
              return (
                <ProFormText width="md" name="function" label="\u751F\u6548\u65B9\u5F0F" />
              );
            }}
          </ProFormDependency>

          <ProFormDependency
            key="globalUseMode"
            name={['globalUseMode']}
            ignoreFormListField
          >
            {({ globalUseMode }) => {
              if (globalUseMode === 'select') {
                return (
                  <ProFormSelect
                    options={[
                      {
                        value: 'chapter',
                        label: '\u76D6\u7AE0\u540E\u751F\u6548',
                      },
                    ]}
                    width="md"
                    name="gfunction"
                    label="\u5916\u5C42\u8054\u52A8\u751F\u6548\u65B9\u5F0F"
                  />
                );
              }
              return (
                <ProFormText
                  width="md"
                  name="gfunction"
                  label="\u5916\u5C42\u8054\u52A8\u751F\u6548\u65B9\u5F0F"
                />
              );
            }}
          </ProFormDependency>
        </ProForm.Group>
      </ProFormList>
    </ProForm>
  );
};

export default Demo;
`},12144:function(e,n){n.Z=`import {
  ProForm,
  ProFormDependency,
  ProFormGroup,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';

const Demo = () => {
  const initialValues = {
    a: 1,
    b: 2,
    c: {
      a: 3,
      b: 4,
      c: {
        a: 5,
      },
      d: [{ a: 6, b: 7 }],
      e: [{ a: 8, b: 9 }],
    },
  };
  const depName1: NamePath[] = [
    'a',
    'b',
    ['c', 'a'],
    ['c', 'b'],
    ['c', 'c', 'a'],
    ['c', 'd'],
    ['c', 'e'],
  ];
  const depName2: NamePath[] = ['a', 'b', ['c', 'a']];
  const depName3: NamePath[] = ['a', 'b', ['c', 'a']];
  return (
    <ProForm initialValues={initialValues}>
      <ProFormGroup>
        <ProFormText name="a" label="a" />
        <ProFormText name="b" label="b" />
        <ProFormText name={['c', 'a']} label="c.a" />
        <ProFormText name={['c', 'b']} label="c.b" />
        <ProFormText name={['c', 'c', 'a']} label="c.c.a" />
        <ProFormGroup title="c.d">
          <ProFormList name={['c', 'd']}>
            <ProFormGroup key="group">
              <ProFormText name="a" label="a" />
              <ProFormText name="b" label="b" />
              <ProFormDependency name={depName3}>
                {(depValues) => (
                  <Form.Item
                    label={\`\u641C\u96C6\u4F9D\u8D56\u503C\uFF08\u60C5\u5F623\uFF09 <ProFormDependency name={\${JSON.stringify(
                      depName3,
                    )}}>\`}
                    extra="a, b, c.a\u53D6\u81EA\u5C40\u90E8"
                  >
                    <pre>
                      <code>{JSON.stringify(depValues, null, 2)}</code>
                    </pre>
                  </Form.Item>
                )}
              </ProFormDependency>
            </ProFormGroup>
          </ProFormList>
        </ProFormGroup>
        <ProFormGroup title="c.e">
          <ProFormList name={['c', 'e']}>
            <ProFormGroup key="group">
              <ProFormText name="a" label="a" />
              <ProFormText name="b" label="b" />
              <ProFormDependency name={depName2} ignoreFormListField>
                {(depValues) => (
                  <Form.Item
                    label={\`\u641C\u96C6\u4F9D\u8D56\u503C\uFF08\u60C5\u5F622) <ProFormDependency name={\${JSON.stringify(
                      depName2,
                    )}} ignoreFormListField>\`}
                    extra="a, b, c.a\u53D6\u81EA\u5168\u5C40"
                  >
                    <pre>
                      <code>{JSON.stringify(depValues)}</code>
                    </pre>
                  </Form.Item>
                )}
              </ProFormDependency>
            </ProFormGroup>
          </ProFormList>
        </ProFormGroup>
      </ProFormGroup>
      <ProFormGroup
        title={\`\u6536\u96C6\u4F9D\u8D56\u503C\uFF08\u60C5\u5F621) <ProFormDependency name={\${JSON.stringify(
          depName1,
        )}}>\`}
      >
        <ProFormDependency name={depName1}>
          {(depValues) => (
            <pre>
              <code>{JSON.stringify(depValues)}</code>
            </pre>
          )}
        </ProFormDependency>
      </ProFormGroup>
    </ProForm>
  );
};

export default Demo;
`},66897:function(e,n){n.Z=`import {
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormFieldSet,
  ProFormList,
  ProFormRadio,
  ProFormRate,
  ProFormSelect,
  ProFormSlider,
  ProFormSwitch,
  ProFormText,
  ProFormTimePicker,
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@ant-design/pro-components';

const options = [
  {
    id: 1,
    label: '\u6D4B\u8BD5\u6D4B\u8BD51',
    value: 1,
  },
  {
    id: 2,
    label: '\u6D4B\u8BD5\u6D4B\u8BD52',
    value: 2,
  },
  {
    id: 3,
    label: '\u6D4B\u8BD5\u6D4B\u8BD53',
    value: 3,
  },
  {
    id: 4,
    label: '\u6D4B\u8BD5\u6D4B\u8BD54',
    value: 4,
  },
  {
    id: 5,
    label: '\u6D4B\u8BD5\u6D4B\u8BD55',
    value: 5,
  },
  {
    id: 6,
    label: '\u6D4B\u8BD5\u6D4B\u8BD56',
    value: 6,
  },
  {
    id: 7,
    label: '\u6D4B\u8BD5\u6D4B\u8BD57',
    value: 7,
  },
  {
    id: 8,
    label: '\u6D4B\u8BD5\u6D4B\u8BD58',
    value: 8,
  },
  {
    id: 9,
    label: '\u6D4B\u8BD5\u6D4B\u8BD59',
    value: 9,
  },
  {
    id: 10,
    label: '\u6D4B\u8BD5\u6D4B\u8BD510',
    value: 10,
  },
  {
    id: 11,
    label: '\u6D4B\u8BD5\u6D4B\u8BD511',
    value: 11,
  },
  {
    id: 12,
    label: '\u6D4B\u8BD5\u6D4B\u8BD512',
    value: 12,
  },
];

const Demo = () => (
  <div
    style={{
      padding: 24,
    }}
  >
    <ProForm
      readonly
      name="validate_other"
      initialValues={{
        'select-multiple': ['red', 'green'],
        'select-multiple2': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        useMode: 'all',
        switch: true,
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
        name: '\u8682\u8681\u91D1\u670D\u6709\u9650\u516C\u53F8',
        radio: 'a',
        list: ['1', '2', '3'],
        list2: ['1', '2', '5', '5'],
        select: 'china',
        'radio-button': 'a',
        dragger: [
          {
            uid: '1',
            name: 'xxx.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'https://gw.alipayobjects.com/zos/antfincdn/7%24YOiS6YIm/huaban.png',
          },
          {
            uid: '2',
            name: 'yyy.png',
            status: 'done',
            url: 'https://gw.alipayobjects.com/zos/antfincdn/7%24YOiS6YIm/huaban.png',
          },
          {
            uid: '3',
            name: 'zzz.png',
            status: 'error',
            response: 'Server Error 500', // custom error message to show
            url: 'https://gw.alipayobjects.com/zos/antfincdn/7%24YOiS6YIm/huaban.png',
          },
        ],
        upload: [
          {
            uid: '1',
            name: 'xxx.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'https://gw.alipayobjects.com/zos/antfincdn/7%24YOiS6YIm/huaban.png',
          },
          {
            uid: '2',
            name: 'yyy.png',
            status: 'done',
            url: 'https://gw.alipayobjects.com/zos/antfincdn/7%24YOiS6YIm/huaban.png',
          },
          {
            uid: '3',
            name: 'zzz.png',
            status: 'error',
            response: 'Server Error 500', // custom error message to show
            url: 'https://gw.alipayobjects.com/zos/antfincdn/7%24YOiS6YIm/huaban.png',
          },
        ],
        date: Date.now(),
        dateWeek: Date.now(),
        dateMonth: Date.now(),
        dateQuarter: Date.now(),
        dateYear: Date.now(),
        dateTime: Date.now(),
        time: '00:01:05',
        timeRange: ['05:00:00', '11:00:00'],
        dateTimeRange: [Date.now(), Date.now() - 1000 * 60 * 60 * 24],
        dateRange: [Date.now(), Date.now() - 1000 * 60 * 60 * 24],
      }}
      onValuesChange={(_, values) => {
        console.log(values);
      }}
      onFinish={async (value) => console.log(value)}
    >
      <ProForm.Group title="\u57FA\u7840\u6570\u636E">
        <ProFormText
          width="md"
          name="name"
          label="name"
          fieldProps={{
            prefix: 'prefix',
            suffix: 'suffix',
          }}
        />
        <ProFormSelect
          name="select"
          label="Select"
          valueEnum={{
            china: 'China',
            usa: 'U.S.A',
          }}
          placeholder="Please select a country"
          rules={[{ required: true, message: 'Please select your country!' }]}
        />
        <ProFormSelect
          width="md"
          request={async () => [
            { label: '\u5168\u90E8', value: 'all' },
            { label: '\u672A\u89E3\u51B3', value: 'open' },
            { label: '\u5DF2\u89E3\u51B3', value: 'closed' },
            { label: '\u89E3\u51B3\u4E2D', value: 'processing' },
          ]}
          name="useMode"
          label="\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F"
        />
        <ProFormSelect
          name="select-multiple"
          label="Select[multiple]"
          valueEnum={{
            red: 'Red',
            green: 'Green',
            blue: 'Blue',
          }}
          fieldProps={{
            mode: 'multiple',
          }}
          placeholder="Please select favorite colors"
          rules={[
            {
              required: true,
              message: 'Please select your favorite colors!',
              type: 'array',
            },
          ]}
        />
        <ProFormSelect
          name="select-multiple2"
          label="Select[multiple]"
          options={options}
          fieldProps={{
            mode: 'multiple',
          }}
          placeholder="Please select favorite colors"
          rules={[
            {
              required: true,
              message: 'Please select your favorite colors!',
              type: 'array',
            },
          ]}
        />
        <ProFormDigit
          label="InputNumber"
          name="input-number"
          min={1}
          max={10}
        />
        <ProFormSwitch
          name="switch"
          label="Switch"
          unCheckedChildren="\u4E0D\u540C\u610F"
          checkedChildren="\u540C\u610F"
        />
        <ProFormSlider
          name="slider"
          label="Slider"
          marks={{
            0: 'A',
            20: 'B',
            40: 'C',
            60: 'D',
            80: 'E',
            100: 'F',
          }}
        />
      </ProForm.Group>
      <ProFormRadio.Group
        name="radio"
        label="Radio.Group"
        options={[
          {
            label: 'item 1',
            value: 'a',
          },
          {
            label: 'item 2',
            value: 'b',
          },
          {
            label: 'item 3',
            value: 'c',
          },
        ]}
      />
      <ProForm.Group>
        <ProFormText hidden label="text1" />
        <ProFormText label="text2" />
      </ProForm.Group>
      <ProFormRadio.Group
        name="radio-button"
        label="Radio.Button"
        radioType="button"
        options={[
          {
            label: 'item 1',
            value: 'a',
          },
          {
            label: 'item 2',
            value: 'b',
          },
          {
            label: 'item 3',
            value: 'c',
          },
        ]}
      />
      <ProFormCheckbox.Group
        name="checkbox-group"
        label="Checkbox.Group"
        options={['A', 'B', 'C', 'D', 'E', 'F']}
      />
      <ProFormRate name="rate" label="Rate" />
      <ProFormUploadButton
        name="upload"
        label="Upload"
        max={2}
        action="/upload.do"
        extra="longgggggggggggggggggggggggggggggggggg"
      />
      <ProFormList
        name="textList"
        label="\u5730\u5740\u5217\u8868"
        initialValue={[
          {
            name: '\u5F20\u4E09',
            addr: '\u5730\u57401',
          },
          {
            name: '\u674E\u56DB',
            addr: '\u5730\u57402',
          },
        ]}
      >
        <ProFormText name="name" label="\u59D3\u540D" />
        <ProFormText name="addr" label="\u5730\u5740" />
      </ProFormList>
      <ProFormFieldSet
        name="list"
        label="\u7EC4\u4EF6\u5217\u8868"
        transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
      >
        <ProFormText width="md" />
        -
        <ProFormText width="md" />
        -
        <ProFormText width="md" />
      </ProFormFieldSet>

      <ProFormFieldSet
        name="list2"
        label="\u7EC4\u4EF6\u5217\u8868\u81EA\u52A8\u589E\u52A0"
        transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
      >
        {(value) => {
          return value?.map((e, index) => {
            return (
              <ProFormText
                key={index}
                width="md"
                fieldProps={{
                  value: e,
                }}
              />
            );
          });
        }}
      </ProFormFieldSet>
      <ProFormUploadDragger max={4} label="Dragger" name="dragger" />

      <ProForm.Group title="\u65E5\u671F\u76F8\u5173\u5206\u7EC4">
        <ProFormDatePicker name="date" label="\u65E5\u671F" />
        <ProFormDatePicker
          name="date"
          fieldProps={{
            format: 'YY-MM',
          }}
          label="\u5E74\u6708"
        />
        <ProFormTimePicker name="time" label="\u65F6\u95F4" />
        <ProFormTimePicker.RangePicker name="timeRange" label="\u65F6\u95F4\u533A\u95F4" />
        <ProFormDatePicker.Week name="dateWeek" label="\u5468" />
        <ProFormDatePicker.Month name="dateMonth" label="\u6708" />
        <ProFormDatePicker.Quarter name="dateQuarter" label="\u5B63\u5EA6" />
        <ProFormDatePicker.Year name="dateYear" label="\u5E74" />
        <ProFormDateTimePicker
          name="dateTime"
          label="\u65E5\u671F\u65F6\u95F4"
          fieldProps={{
            format: (value) => value.format('YYYY-MM-DD'),
          }}
        />
        <ProFormDateRangePicker name="dateRange" label="\u65E5\u671F\u533A\u95F4" />
        <ProFormDateTimeRangePicker name="dateTimeRange" label="\u65E5\u671F\u65F6\u95F4\u533A\u95F4" />
      </ProForm.Group>
      <ProForm.Group title="\u5176\u4ED6\u76F8\u5173\u5206\u7EC4">
        <ProForm.Item label="\u4E92\u76F8\u4F9D\u8D56\u7684\u8868\u5355">
          <ProFormDependency name={['list']}>
            {({ list }) => {
              return <div>{JSON.stringify(list, null, 2)}</div>;
            }}
          </ProFormDependency>
        </ProForm.Item>
        <ProFormFieldSet name="list" label="\u7EC4\u4EF6\u5217\u8868">
          <ProFormText width="md" />
          <ProFormSelect
            width="md"
            request={async () => [
              { label: '\u5168\u90E8', value: 'all' },
              { label: '\u672A\u89E3\u51B3', value: 'open' },
              { label: '\u5DF2\u89E3\u51B3', value: 'closed' },
              { label: '\u89E3\u51B3\u4E2D', value: 'processing' },
            ]}
            name="useMode"
            label="\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F"
          />
          <ProFormText width="md" />
        </ProFormFieldSet>

        <ProFormFieldSet
          name="list"
          label="\u7EC4\u4EF6\u5217\u8868- Input.Group"
          type="group"
          rules={[
            {
              validator: (_, value) => {
                const [name, name1, name2] = value || [];
                if (!name) {
                  throw new Error('\u7B2C\u4E00\u4E2A\u503C\u4E0D\u80FD\u4E3A\u7A7A');
                }
                if (!name1) {
                  throw new Error('\u7B2C\u4E8C\u4E2A\u503C\u4E0D\u80FD\u4E3A\u7A7A');
                }
                if (!name2) {
                  throw new Error('\u7B2C\u4E09\u4E2A\u503C\u4E0D\u80FD\u4E3A\u7A7A');
                }
              },
            },
          ]}
          transform={(value: any) => ({
            list: value,
            startTime: value[0],
            endTime: value[1],
          })}
        >
          <ProFormText width="md" />
          <ProFormText width="md" />
          <ProFormText width="md" />
        </ProFormFieldSet>

        <ProFormFieldSet
          name="list"
          label="\u7EC4\u4EF6\u5217\u8868"
          transform={(value: any) => ({
            list: value,
            startTime: value[0],
            endTime: value[1],
          })}
        >
          <ProFormText width="md" />
          -
          <ProFormText width="md" />
          -
          <ProFormText width="md" />
        </ProFormFieldSet>
      </ProForm.Group>
    </ProForm>
  </div>
);

export default Demo;
`},43749:function(e,n){n.Z=`import {
  ProForm,
  ProFormCheckbox,
  ProFormColorPicker,
  ProFormDigit,
  ProFormDigitRange,
  ProFormGroup,
  ProFormRadio,
  ProFormRate,
  ProFormSegmented,
  ProFormSelect,
  ProFormSlider,
  ProFormSwitch,
  ProFormText,
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { Switch } from 'antd';
import Mock from 'mockjs';
import { useState } from 'react';

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Demo = () => {
  const [readonly, setReadonly] = useState(false);
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Switch
        style={{
          marginBlockEnd: 16,
        }}
        checked={readonly}
        checkedChildren="\u7F16\u8F91"
        unCheckedChildren="\u53EA\u8BFB"
        onChange={setReadonly}
      />
      <ProForm
        readonly={readonly}
        name="validate_other"
        initialValues={{
          name: 'qixian',
          password: '1ixian',
          select: 'china',
          select2: '520000201604258831',
          useMode: { label: '\u672A\u89E3\u51B3', value: 'open', key: 'open' },
          'select-multiple': ['green', 'blue'],
          radio: 'a',
          'radio-vertical': 'b',
          'radio-button': 'b',
          'checkbox-group': ['A', 'B', 'C'],
          'input-number-range': [2, 4],
          'input-number': 3,
          switch: true,
          slider: 66,
          rate: 3.5,
          segmented: 'open',
          segmented2: 'open',
        }}
        onValuesChange={(_, values) => {
          console.log(values);
        }}
        onFinish={async (value) => console.log(value)}
      >
        <ProFormGroup title="\u6587\u672C\u7C7B">
          <ProFormText width="md" name="name" label="name" />
          <ProFormText.Password width="md" name="password" label="password" />
        </ProFormGroup>
        <ProFormGroup
          title="\u9009\u62E9\u7C7B"
          collapsible
          style={{
            gap: '0 32px',
          }}
        >
          <ProFormSelect
            name="select"
            label="Select"
            valueEnum={{
              china: 'China',
              usa: 'U.S.A',
            }}
            placeholder="Please select a country"
            rules={[{ required: true, message: 'Please select your country!' }]}
          />
          <ProFormSelect
            name="select2"
            label="\u652F\u6301\u641C\u7D22\u67E5\u8BE2\u7684 Select"
            showSearch
            debounceTime={300}
            request={async ({ keyWords }) => {
              await waitTime(100);
              console.log(
                Mock.mock({
                  'data|1-10': [
                    {
                      value: '@id',
                      label: '@name',
                    },
                  ],
                }).data.concat({
                  value: keyWords,
                  label: '\u76EE\u6807_target',
                }),
              );
              return Mock.mock({
                'data|1-10': [
                  {
                    value: '@id',
                    label: '@name',
                  },
                ],
              }).data.concat([
                {
                  value: keyWords,
                  label: '\u76EE\u6807_target',
                },
                { value: '520000201604258831', label: 'Patricia Lopez' },
                { value: '520000198509222123', label: 'Jose Martinez' },
                { value: '210000200811194757', label: 'Elizabeth Thomas' },
                { value: '530000198808222758', label: 'Scott Anderson' },
                { value: '500000198703236285', label: 'George Jackson' },
                { value: '610000199906148074', label: 'Linda Hernandez' },
                { value: '150000197210168659', label: 'Sandra Hall' },
                { label: '\u76EE\u6807_target' },
              ]);
            }}
            placeholder="Please select a country"
            rules={[{ required: true, message: 'Please select your country!' }]}
          />
          <ProFormSelect
            width="md"
            fieldProps={{
              labelInValue: true,
            }}
            request={async () => [
              { label: '\u5168\u90E8', value: 'all' },
              { label: '\u672A\u89E3\u51B3', value: 'open' },
              { label: '\u5DF2\u89E3\u51B3', value: 'closed' },
              { label: '\u89E3\u51B3\u4E2D', value: 'processing' },
            ]}
            name="useMode"
            label="\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F"
          />
          <ProFormSelect
            name="select-multiple"
            label="Select[multiple]"
            valueEnum={{
              red: 'Red',
              green: 'Green',
              blue: 'Blue',
            }}
            fieldProps={{
              mode: 'multiple',
            }}
            placeholder="Please select favorite colors"
            rules={[
              {
                required: true,
                message: 'Please select your favorite colors!',
                type: 'array',
              },
            ]}
          />

          <ProFormRadio.Group
            name="radio"
            label="Radio.Group"
            options={[
              {
                label: 'item 1',
                value: 'a',
              },
              {
                label: 'item 2',
                value: 'b',
              },
              {
                label: 'item 3',
                value: 'c',
              },
            ]}
          />
          <ProFormRadio.Group
            name="radio-vertical"
            layout="vertical"
            label="Radio.Group"
            options={[
              {
                label: 'item 1',
                value: 'a',
              },
              {
                label: 'item 2',
                value: 'b',
              },
              {
                label: 'item 3',
                value: 'c',
              },
            ]}
          />
          <ProFormRadio.Group
            name="radio-button"
            label="Radio.Button"
            radioType="button"
            options={[
              {
                label: 'item 1',
                value: 'a',
              },
              {
                label: 'item 2',
                value: 'b',
              },
              {
                label: 'item 3',
                value: 'c',
              },
            ]}
          />
          <ProFormCheckbox.Group
            name="checkbox-group"
            label="Checkbox.Group"
            options={['A', 'B', 'C', 'D', 'E', 'F']}
          />
          <ProFormColorPicker label="\u989C\u8272\u9009\u62E9" name="color" />
        </ProFormGroup>
        <ProFormGroup label="\u6570\u5B57\u7C7B">
          <ProFormDigitRange
            label="InputNumberRange"
            name="input-number-range"
            separator="-"
            placeholder={['\u6700\u5C0F\u503C', '\u6700\u5927\u503C']}
            separatorWidth={60}
          />
          <ProFormDigit
            label="InputNumber"
            name="input-number"
            width="sm"
            min={1}
            max={10}
          />
          <ProFormSwitch name="switch" label="Switch" />
          <ProFormSlider
            name="slider"
            label="Slider"
            width="lg"
            marks={{
              0: 'A',
              20: 'B',
              40: 'C',
              60: 'D',
              80: 'E',
              100: 'F',
            }}
          />
          <ProFormRate name="rate" label="Rate" />
          <ProFormUploadButton name="pic" label="\u4E0A\u4F20" />
          <ProFormUploadDragger name="drag-pic" label="\u62D6\u62FD\u4E0A\u4F20" />
          <ProFormSegmented
            name="segmented"
            label="\u5206\u6BB5\u63A7\u5236\u5668"
            valueEnum={{
              open: '\u672A\u89E3\u51B3',
              closed: '\u5DF2\u89E3\u51B3',
            }}
          />
          <ProFormSegmented
            name="segmented2"
            label="\u5206\u6BB5\u63A7\u5236\u5668-\u8FDC\u7A0B\u6570\u636E"
            request={async () => [
              { label: '\u5168\u90E8', value: 'all' },
              { label: '\u672A\u89E3\u51B3', value: 'open' },
              { label: '\u5DF2\u89E3\u51B3', value: 'closed' },
              { label: '\u89E3\u51B3\u4E2D', value: 'processing' },
            ]}
          />
        </ProFormGroup>
      </ProForm>
    </div>
  );
};

export default Demo;
`},84145:function(e,n){n.Z=`import {
  ProForm,
  ProFormDateMonthRangePicker,
  ProFormDatePicker,
  ProFormDateQuarterRangePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDateWeekRangePicker,
  ProFormDateYearRangePicker,
  ProFormTimePicker,
} from '@ant-design/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';

export default () => {
  const [readonly, setReadonly] = useState(false);
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Switch
        style={{
          marginBlockEnd: 16,
        }}
        checked={readonly}
        checkedChildren="\u7F16\u8F91"
        unCheckedChildren="\u53EA\u8BFB"
        onChange={setReadonly}
      />
      <ProForm
        readonly={readonly}
        initialValues={{
          date: Date.now(),
          dateWeek: Date.now(),
          dateMonth: Date.now(),
          dateQuarter: Date.now(),
          dateYear: Date.now(),
          dateTime: Date.now(),
          time: '00:01:05',
          timeRange: ['05:00:00', '11:00:00'],
          dateTimeRange: [Date.now(), Date.now() - 1000 * 60 * 60 * 24],
          dateRange: [Date.now(), Date.now() - 1000 * 60 * 60 * 24],
        }}
        onFinish={async (values) => {
          console.log(values);
        }}
      >
        <ProForm.Group title="\u65E5\u671F\u76F8\u5173\u5206\u7EC4">
          <ProFormDatePicker name="date" label="\u65E5\u671F" />
          <ProFormDatePicker
            name="date"
            fieldProps={{
              format: 'YY-MM',
            }}
            label="\u5E74\u6708"
          />
          <ProFormTimePicker name="time" label="\u65F6\u95F4" />
          <ProFormTimePicker.RangePicker name="timeRange" label="\u65F6\u95F4\u533A\u95F4" />
          <ProFormDatePicker.Week name="dateWeek" label="\u5468" />
          <ProFormDateWeekRangePicker name="dateWeekRange" label="\u5468\u533A\u95F4" />
          <ProFormDatePicker.Month name="dateMonth" label="\u6708" />
          <ProFormDateMonthRangePicker name="dateMonthRange" label="\u6708\u533A\u95F4" />
          <ProFormDatePicker.Quarter name="dateQuarter" label="\u5B63\u5EA6" />
          <ProFormDateQuarterRangePicker
            name="dateQuarterRange"
            label="\u5B63\u5EA6\u533A\u95F4"
          />
          <ProFormDatePicker.Year name="dateYear" label="\u5E74" />
          <ProFormDateYearRangePicker name="dateYearRange" label="\u5E74\u533A\u95F4" />
          <ProFormDateTimePicker
            name="dateTime"
            label="\u65E5\u671F\u65F6\u95F4"
            fieldProps={{
              format: (value) => value.format('YYYY-MM-DD'),
            }}
          />
          <ProFormDateRangePicker name="dateRange" label="\u65E5\u671F\u533A\u95F4" />
          <ProFormDateTimeRangePicker
            name="dateTimeRange"
            label="\u65E5\u671F\u65F6\u95F4\u533A\u95F4"
          />
        </ProForm.Group>
      </ProForm>
    </div>
  );
};
`},72469:function(e,n){n.Z=`import {
  ProForm,
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';

export default () => {
  const [readonly, setReadonly] = useState(false);
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Switch
        style={{
          marginBlockEnd: 16,
        }}
        checked={readonly}
        checkedChildren="\u7F16\u8F91"
        unCheckedChildren="\u53EA\u8BFB"
        onChange={setReadonly}
      />
      <ProForm
        readonly={readonly}
        initialValues={{
          list: ['1', '2', '3'],
        }}
      >
        <ProForm.Item label="\u4E92\u76F8\u4F9D\u8D56\u7684\u8868\u5355">
          <ProFormDependency name={['list']}>
            {({ list }) => {
              return <div>{JSON.stringify(list, null, 2)}</div>;
            }}
          </ProFormDependency>
        </ProForm.Item>
        <ProFormFieldSet name="list" label="\u7EC4\u4EF6\u5217\u8868">
          <ProFormText width="md" />
          <ProFormSelect
            width="md"
            request={async () => [
              { label: '\u5168\u90E8', value: 'all' },
              { label: '\u672A\u89E3\u51B3', value: 'open' },
              { label: '\u5DF2\u89E3\u51B3', value: 'closed' },
              { label: '\u89E3\u51B3\u4E2D', value: 'processing' },
            ]}
            name="useMode"
            label="\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F"
          />
          <ProFormText width="md" />
        </ProFormFieldSet>

        <ProFormFieldSet
          name="list"
          label="\u7EC4\u4EF6\u5217\u8868- Input.Group"
          type="group"
          rules={[
            {
              validator: (_, value) => {
                const [name, name1, name2] = value || [];
                if (!name) {
                  throw new Error('\u7B2C\u4E00\u4E2A\u503C\u4E0D\u80FD\u4E3A\u7A7A');
                }
                if (!name1) {
                  throw new Error('\u7B2C\u4E8C\u4E2A\u503C\u4E0D\u80FD\u4E3A\u7A7A');
                }
                if (!name2) {
                  throw new Error('\u7B2C\u4E09\u4E2A\u503C\u4E0D\u80FD\u4E3A\u7A7A');
                }
              },
            },
          ]}
          transform={(value: any) => ({
            list: value,
            startTime: value[0],
            endTime: value[1],
          })}
        >
          <ProFormText width="md" />
          <ProFormText width="md" />
          <ProFormText width="md" />
        </ProFormFieldSet>

        <ProFormFieldSet
          name="list"
          label="\u7EC4\u4EF6\u5217\u8868"
          transform={(value: any) => ({
            list: value,
            startTime: value[0],
            endTime: value[1],
          })}
        >
          <ProFormText width="md" readonly />
          -
          <ProFormText width="md" readonly />
          -
          <ProFormText width="md" readonly />
        </ProFormFieldSet>
      </ProForm>
    </div>
  );
};
`},74918:function(e,n){n.Z=`import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';

export default () => {
  const [readonly, setReadonly] = useState(false);
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Switch
        style={{
          marginBlockEnd: 16,
        }}
        checked={readonly}
        checkedChildren="\u7F16\u8F91"
        unCheckedChildren="\u53EA\u8BFB"
        onChange={setReadonly}
      />
      <ProForm readonly={readonly}>
        <ProForm.Group>
          <ProFormSelect.SearchSelect
            name="userQuery"
            label="\u67E5\u8BE2\u9009\u62E9\u5668 - request"
            fieldProps={{
              labelInValue: true,
              style: {
                minWidth: 140,
              },
            }}
            debounceTime={300}
            request={async ({ keyWords = '' }) => {
              return [
                { label: '\u5168\u90E8', value: 'all' },
                { label: '\u672A\u89E3\u51B3', value: 'open' },
                { label: '\u672A\u89E3\u51B3(\u5DF2\u5206\u914D)', value: 'assignees' },
                { label: '\u5DF2\u89E3\u51B3', value: 'closed' },
                { label: '\u89E3\u51B3\u4E2D', value: 'processing' },
              ].filter(({ value, label }) => {
                return value.includes(keyWords) || label.includes(keyWords);
              });
            }}
          />
          <ProFormSelect.SearchSelect
            name="userQuery2"
            label="\u67E5\u8BE2\u9009\u62E9\u5668 - valueEnum"
            fieldProps={{
              style: {
                minWidth: 140,
              },
            }}
            valueEnum={{
              all: { text: '\u5168\u90E8', status: 'Default' },
              open: {
                text: '\u672A\u89E3\u51B3',
                status: 'Error',
              },
              closed: {
                text: '\u5DF2\u89E3\u51B3',
                status: 'Success',
              },
              processing: {
                text: '\u89E3\u51B3\u4E2D',
                status: 'Processing',
              },
            }}
          />
          <ProFormSelect.SearchSelect
            name="userQuery3"
            label="\u67E5\u8BE2\u9009\u62E9\u5668 - options"
            fieldProps={{
              labelInValue: false,
              style: {
                minWidth: 140,
              },
            }}
            options={[
              { label: '\u5168\u90E8', value: 'all' },
              { label: '\u672A\u89E3\u51B3', value: 'open' },
              { label: '\u5DF2\u89E3\u51B3', value: 'closed' },
              { label: '\u89E3\u51B3\u4E2D', value: 'processing' },
            ]}
          />
        </ProForm.Group>
      </ProForm>
    </div>
  );
};
`},39370:function(e,n){n.Z=`import {
  ProForm,
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@ant-design/pro-components';

export default () => {
  return (
    <ProForm>
      <ProFormUploadButton
        title="\u4E0A\u4F20\u6309\u94AE\u7684\u6587\u672C\u53D8\u5566"
        name="upload"
        label="Upload"
        max={2}
        fieldProps={{
          name: 'file',
        }}
        action="/upload.do"
        extra="longgggggggggggggggggggggggggggggggggg"
      />
      <ProFormUploadButton
        name="upload"
        label="Upload"
        max={2}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
        }}
        action="/upload.do"
        extra="longgggggggggggggggggggggggggggggggggg"
      />
      <ProFormUploadDragger max={4} label="Dragger" name="dragger" />
    </ProForm>
  );
};
`},57089:function(e,n){n.Z=`import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, message, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const Page = () => {
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const { token } = theme.useToken();
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://github.githubassets.com/favicons/favicon.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="Github"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        subTitle="\u5168\u7403\u6700\u5927\u7684\u4EE3\u7801\u6258\u7BA1\u5E73\u53F0"
        activityConfig={{
          style: {
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
            color: token.colorTextHeading,
            borderRadius: 8,
            backgroundColor: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(4px)',
          },
          title: '\u6D3B\u52A8\u6807\u9898\uFF0C\u53EF\u914D\u7F6E\u56FE\u7247',
          subTitle: '\u6D3B\u52A8\u4ECB\u7ECD\u8BF4\u660E\u6587\u5B57',
          action: (
            <Button
              size="large"
              style={{
                borderRadius: 20,
                background: token.colorBgElevated,
                color: token.colorPrimary,
                width: 120,
              }}
            >
              \u53BB\u770B\u770B
            </Button>
          ),
        }}
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Divider plain>
              <span
                style={{
                  color: token.colorTextPlaceholder,
                  fontWeight: 'normal',
                  fontSize: 14,
                }}
              >
                \u5176\u4ED6\u767B\u5F55\u65B9\u5F0F
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <WeiboOutlined style={{ ...iconStyles, color: '#1890ff' }} />
              </div>
            </Space>
          </div>
        }
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'account'} tab={'\u8D26\u53F7\u5BC6\u7801\u767B\u5F55'} />
          <Tabs.TabPane key={'phone'} tab={'\u624B\u673A\u53F7\u767B\u5F55'} />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'\u7528\u6237\u540D: admin or user'}
              rules={[
                {
                  required: true,
                  message: '\u8BF7\u8F93\u5165\u7528\u6237\u540D!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'\u5BC6\u7801: ant.design'}
              rules={[
                {
                  required: true,
                  message: '\u8BF7\u8F93\u5165\u5BC6\u7801\uFF01',
                },
              ]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: (
                  <MobileOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              name="mobile"
              placeholder={'\u624B\u673A\u53F7'}
              rules={[
                {
                  required: true,
                  message: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7\uFF01',
                },
                {
                  pattern: /^1\\d{10}$/,
                  message: '\u624B\u673A\u53F7\u683C\u5F0F\u9519\u8BEF\uFF01',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return \`\${count} \${'\u83B7\u53D6\u9A8C\u8BC1\u7801'}\`;
                }
                return '\u83B7\u53D6\u9A8C\u8BC1\u7801';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801\uFF01',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('\u83B7\u53D6\u9A8C\u8BC1\u7801\u6210\u529F\uFF01\u9A8C\u8BC1\u7801\u4E3A\uFF1A1234');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            \u81EA\u52A8\u767B\u5F55
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            \u5FD8\u8BB0\u5BC6\u7801
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};
`},99882:function(e,n){n.Z=`import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from '@ant-design/pro-components';
import { Space, Tabs, message, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';

type LoginType = 'phone' | 'account';

export default () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>('phone');

  const iconStyles: CSSProperties = {
    marginInlineStart: '16px',
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          logo="https://github.githubassets.com/favicons/favicon.png"
          title="Github"
          subTitle="\u5168\u7403\u6700\u5927\u7684\u4EE3\u7801\u6258\u7BA1\u5E73\u53F0"
          actions={
            <Space>
              \u5176\u4ED6\u767B\u5F55\u65B9\u5F0F
              <AlipayCircleOutlined style={iconStyles} />
              <TaobaoCircleOutlined style={iconStyles} />
              <WeiboCircleOutlined style={iconStyles} />
            </Space>
          }
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'account'} tab={'\u8D26\u53F7\u5BC6\u7801\u767B\u5F55'} />
            <Tabs.TabPane key={'phone'} tab={'\u624B\u673A\u53F7\u767B\u5F55'} />
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'\u7528\u6237\u540D: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '\u8BF7\u8F93\u5165\u7528\u6237\u540D!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                  strengthText:
                    'Password should contain numbers, letters and special characters, at least 8 characters long.',
                  statusRender: (value) => {
                    const getStatus = () => {
                      if (value && value.length > 12) {
                        return 'ok';
                      }
                      if (value && value.length > 6) {
                        return 'pass';
                      }
                      return 'poor';
                    };
                    const status = getStatus();
                    if (status === 'pass') {
                      return (
                        <div style={{ color: token.colorWarning }}>
                          \u5F3A\u5EA6\uFF1A\u4E2D
                        </div>
                      );
                    }
                    if (status === 'ok') {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          \u5F3A\u5EA6\uFF1A\u5F3A
                        </div>
                      );
                    }
                    return (
                      <div style={{ color: token.colorError }}>\u5F3A\u5EA6\uFF1A\u5F31</div>
                    );
                  },
                }}
                placeholder={'\u5BC6\u7801: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '\u8BF7\u8F93\u5165\u5BC6\u7801\uFF01',
                  },
                ]}
              />
            </>
          )}
          {loginType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="mobile"
                placeholder={'\u624B\u673A\u53F7'}
                rules={[
                  {
                    required: true,
                    message: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7\uFF01',
                  },
                  {
                    pattern: /^1\\d{10}$/,
                    message: '\u624B\u673A\u53F7\u683C\u5F0F\u9519\u8BEF\uFF01',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return \`\${count} \${'\u83B7\u53D6\u9A8C\u8BC1\u7801'}\`;
                  }
                  return '\u83B7\u53D6\u9A8C\u8BC1\u7801';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801\uFF01',
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success('\u83B7\u53D6\u9A8C\u8BC1\u7801\u6210\u529F\uFF01\u9A8C\u8BC1\u7801\u4E3A\uFF1A1234');
                }}
              />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              \u81EA\u52A8\u767B\u5F55
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              \u5FD8\u8BB0\u5BC6\u7801
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
`},1261:function(e,n){n.Z=`import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import { useRef } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef();
  return (
    <div
      style={{
        height: '325px',
      }}
    >
      <Space>
        <DrawerForm<{
          name: string;
          company: string;
        }>
          title="\u65B0\u5EFA\u8868\u5355"
          formRef={formRef}
          width={600}
          trigger={
            <Button type="primary">
              <PlusOutlined />
              \u65B0\u5EFA Drawer \u8868\u5355
            </Button>
          }
          drawerProps={{
            forceRender: true,
            destroyOnClose: true,
          }}
          onFinish={async (values) => {
            await waitTime(2000);
            console.log(values.name);
            message.success('\u63D0\u4EA4\u6210\u529F');
            // \u4E0D\u8FD4\u56DE\u4E0D\u4F1A\u5173\u95ED\u5F39\u6846
            return true;
          }}
        >
          <DrawerForm<{
            name: string;
            company: string;
          }>
            title="\u65B0\u5EFA\u8868\u5355"
            formRef={formRef}
            trigger={
              <Button type="primary">
                <PlusOutlined />
                \u65B0\u5EFA Drawer \u8868\u5355
              </Button>
            }
            drawerProps={{
              forceRender: true,
              destroyOnClose: true,
            }}
            onFinish={async (values) => {
              await waitTime(2000);
              console.log(values.name);
              message.success('\u63D0\u4EA4\u6210\u529F');
              // \u4E0D\u8FD4\u56DE\u4E0D\u4F1A\u5173\u95ED\u5F39\u6846
              return true;
            }}
          >
            <ProForm.Group>
              <ProFormText
                name="name"
                width="md"
                label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
                tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
                placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
              />
              <ProFormText
                width="md"
                name="company"
                label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
                placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                width="md"
                name="contract"
                label="\u5408\u540C\u540D\u79F0"
                placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
              />
              <ProFormDateRangePicker
                name="contractTime"
                label="\u5408\u540C\u751F\u6548\u65F6\u95F4"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                options={[
                  {
                    value: 'chapter',
                    label: '\u76D6\u7AE0\u540E\u751F\u6548',
                  },
                ]}
                width="xs"
                name="useMode"
                label="\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F"
              />
              <ProFormSelect
                width="xs"
                options={[
                  {
                    value: 'time',
                    label: '\u5C65\u884C\u5B8C\u7EC8\u6B62',
                  },
                ]}
                name="unusedMode"
                label="\u5408\u540C\u7EA6\u5B9A\u5931\u6548\u6548\u65B9\u5F0F"
              />
            </ProForm.Group>
            <ProFormText width="sm" name="id" label="\u4E3B\u5408\u540C\u7F16\u53F7" />
            <ProFormText
              name="project"
              disabled
              label="\u9879\u76EE\u540D\u79F0"
              initialValue="xxxx\u9879\u76EE"
            />
            <ProFormText
              width="xs"
              name="mangerName"
              disabled
              label="\u5546\u52A1\u7ECF\u7406"
              initialValue="\u542F\u9014"
            />
          </DrawerForm>
        </DrawerForm>

        <ModalForm<{
          name: string;
          company: string;
        }>
          title="\u65B0\u5EFA\u8868\u5355"
          formRef={formRef}
          trigger={
            <Button type="primary">
              <PlusOutlined />
              \u65B0\u5EFA Model \u8868\u5355
            </Button>
          }
          modalProps={{
            forceRender: true,
            destroyOnClose: true,
          }}
          onFinish={async (values) => {
            await waitTime(2000);
            console.log(values.name);
            message.success('\u63D0\u4EA4\u6210\u529F');
            // \u4E0D\u8FD4\u56DE\u4E0D\u4F1A\u5173\u95ED\u5F39\u6846
            return true;
          }}
        >
          <ModalForm<{
            name: string;
            company: string;
          }>
            title="\u65B0\u5EFA\u8868\u5355"
            formRef={formRef}
            trigger={
              <Button type="primary">
                <PlusOutlined />
                \u65B0\u5EFA Model \u8868\u5355
              </Button>
            }
            modalProps={{
              forceRender: true,
              destroyOnClose: true,
            }}
            onFinish={async (values) => {
              await waitTime(2000);
              console.log(values.name);
              message.success('\u63D0\u4EA4\u6210\u529F');
              // \u4E0D\u8FD4\u56DE\u4E0D\u4F1A\u5173\u95ED\u5F39\u6846
              return true;
            }}
          >
            <ProForm.Group>
              <ProFormText
                name="name"
                width="md"
                label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
                tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
                placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
              />
              <ProFormText
                width="md"
                name="company"
                label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
                placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                width="md"
                name="contract"
                label="\u5408\u540C\u540D\u79F0"
                placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
              />
              <ProFormDateRangePicker
                name="contractTime"
                label="\u5408\u540C\u751F\u6548\u65F6\u95F4"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                options={[
                  {
                    value: 'chapter',
                    label: '\u76D6\u7AE0\u540E\u751F\u6548',
                  },
                ]}
                width="xs"
                name="useMode"
                label="\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F"
              />
              <ProFormSelect
                width="xs"
                options={[
                  {
                    value: 'time',
                    label: '\u5C65\u884C\u5B8C\u7EC8\u6B62',
                  },
                ]}
                name="unusedMode"
                label="\u5408\u540C\u7EA6\u5B9A\u5931\u6548\u6548\u65B9\u5F0F"
              />
            </ProForm.Group>
            <ProFormText width="sm" name="id" label="\u4E3B\u5408\u540C\u7F16\u53F7" />
            <ProFormText
              name="project"
              disabled
              label="\u9879\u76EE\u540D\u79F0"
              initialValue="xxxx\u9879\u76EE"
            />
            <ProFormText
              width="xs"
              name="mangerName"
              disabled
              label="\u5546\u52A1\u7ECF\u7406"
              initialValue="\u542F\u9014"
            />
          </ModalForm>
        </ModalForm>
      </Space>
    </div>
  );
};
`},79643:function(e,n){n.Z=`import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [form] = Form.useForm<{ name: string; company: string }>();

  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      title="\u65B0\u5EFA\u8868\u5355"
      resize={{
        onResize() {
          console.log('resize!');
        },
        maxWidth: window.innerWidth * 0.8,
        minWidth: 300,
      }}
      form={form}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          \u65B0\u5EFA\u8868\u5355
        </Button>
      }
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('\u63D0\u4EA4\u6210\u529F');
        // \u4E0D\u8FD4\u56DE\u4E0D\u4F1A\u5173\u95ED\u5F39\u6846
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          name="name"
          width="md"
          label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
          tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="company"
          label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="contract"
          label="\u5408\u540C\u540D\u79F0"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />
        <ProFormDateRangePicker name="contractTime" label="\u5408\u540C\u751F\u6548\u65F6\u95F4" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: '\u76D6\u7AE0\u540E\u751F\u6548',
            },
          ]}
          width="xs"
          name="useMode"
          label="\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F"
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: '\u5C65\u884C\u5B8C\u7EC8\u6B62',
            },
          ]}
          formItemProps={{
            style: {
              margin: 0,
            },
          }}
          name="unusedMode"
          label="\u5408\u540C\u7EA6\u5B9A\u5931\u6548\u6548\u65B9\u5F0F"
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="\u4E3B\u5408\u540C\u7F16\u53F7" />
      <ProFormText
        name="project"
        disabled
        label="\u9879\u76EE\u540D\u79F0"
        initialValue="xxxx\u9879\u76EE"
      />
      <ProFormText
        width="xs"
        name="mangerName"
        disabled
        label="\u5546\u52A1\u7ECF\u7406"
        initialValue="\u542F\u9014"
      />
    </DrawerForm>
  );
};
`},80218:function(e,n){n.Z=`import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import { useRef, useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const restFormRef = useRef<ProFormInstance>();
  const formRef = useRef<ProFormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <Space>
      <ModalForm
        title="\u65B0\u5EFA\u8868\u5355"
        formRef={restFormRef}
        open={modalVisible}
        trigger={
          <Button
            type="primary"
            onClick={() => {
              setModalVisible(true);
            }}
          >
            \u901A\u8FC7 formRef \u91CD\u7F6E
          </Button>
        }
        onOpenChange={setModalVisible}
        submitter={{
          searchConfig: {
            resetText: '\u91CD\u7F6E',
          },
          resetButtonProps: {
            onClick: () => {
              restFormRef.current?.resetFields();
              //   setModalVisible(false);
            },
          },
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('\u63D0\u4EA4\u6210\u529F');
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
          tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />

        <ProFormText
          width="md"
          name="company"
          label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />
      </ModalForm>
      <ModalForm
        title="\u65B0\u5EFA\u8868\u5355"
        formRef={formRef}
        trigger={<Button type="primary">\u901A\u8FC7\u81EA\u5B9A\u4E49 footer \u6309\u94AE\u91CD\u7F6E</Button>}
        submitter={{
          render: (props, defaultDoms) => {
            return [
              ...defaultDoms,
              <Button
                key="extra-reset"
                onClick={() => {
                  props.reset();
                }}
              >
                \u91CD\u7F6E
              </Button>,
            ];
          },
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('\u63D0\u4EA4\u6210\u529F');
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
          tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />

        <ProFormText
          width="md"
          name="company"
          label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />
      </ModalForm>
    </Space>
  );
};
`},52394:function(e,n){n.Z=`import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <Space>
      <ModalForm
        title="\u65B0\u5EFA\u8868\u5355"
        trigger={<Button type="primary">\u81EA\u5DF1\u5B9A\u4E49 footer \u7684\u6309\u94AE</Button>}
        submitter={{
          render: (props, defaultDoms) => {
            return [
              ...defaultDoms,
              <Button
                key="ok"
                onClick={() => {
                  props.submit();
                }}
              >
                ok
              </Button>,
            ];
          },
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('\u63D0\u4EA4\u6210\u529F');
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
          tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />

        <ProFormText
          width="md"
          name="company"
          label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />
      </ModalForm>
      <ModalForm
        title="\u65B0\u5EFA\u8868\u5355"
        trigger={<Button type="primary">\u81EA\u5B9A\u4E49\u6587\u5B57</Button>}
        submitter={{
          searchConfig: {
            submitText: '\u786E\u8BA4',
            resetText: '\u53D6\u6D88',
          },
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('\u63D0\u4EA4\u6210\u529F');
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
          tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />

        <ProFormText
          width="md"
          name="company"
          label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />
      </ModalForm>
      <ModalForm
        title="\u65B0\u5EFA\u8868\u5355"
        trigger={<Button type="primary">\u9690\u85CF\u6216\u4FEE\u6539\u6309\u94AE\u6837\u5F0F</Button>}
        submitter={{
          resetButtonProps: {
            type: 'dashed',
          },
          submitButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('\u63D0\u4EA4\u6210\u529F');
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
          tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />

        <ProFormText
          width="md"
          name="company"
          label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />
      </ModalForm>
      <ModalForm
        title="\u9690\u85CFfooter"
        trigger={<Button type="primary">\u9690\u85CFfooter</Button>}
        submitter={false}
      >
        <ProFormText
          width="md"
          name="name"
          label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
          tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />

        <ProFormText
          width="md"
          name="company"
          label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />
      </ModalForm>
    </Space>
  );
};
`},4816:function(e,n){n.Z=`import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="\u65B0\u5EFA\u8868\u5355"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          \u65B0\u5EFA\u8868\u5355
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('\u63D0\u4EA4\u6210\u529F');
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
          tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />

        <ProFormText
          width="md"
          name="company"
          label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="contract"
          label="\u5408\u540C\u540D\u79F0"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />
        <ProFormDateRangePicker name="contractTime" label="\u5408\u540C\u751F\u6548\u65F6\u95F4" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: 'chapter',
              label: '\u76D6\u7AE0\u540E\u751F\u6548',
            },
          ]}
          width="xs"
          name="useMode"
          label="\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F"
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: '\u5C65\u884C\u5B8C\u7EC8\u6B62',
            },
          ]}
          name="unusedMode"
          label="\u5408\u540C\u7EA6\u5B9A\u5931\u6548\u6548\u65B9\u5F0F"
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="\u4E3B\u5408\u540C\u7F16\u53F7" />
      <ProFormText
        name="project"
        disabled
        label="\u9879\u76EE\u540D\u79F0"
        initialValue="xxxx\u9879\u76EE"
      />
      <ProFormText
        width="xs"
        name="mangerName"
        disabled
        label="\u5546\u52A1\u7ECF\u7406"
        initialValue="\u542F\u9014"
      />
    </ModalForm>
  );
};
`},92584:function(e,n){n.Z=`import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import { useState } from 'react';

export default () => {
  const [modalVisit, setModalVisit] = useState(false);
  const [drawerVisit, setDrawerVisit] = useState(false);

  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setModalVisit(true);
          }}
        >
          <PlusOutlined />
          Modal \u5C55\u793A
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setDrawerVisit(true);
          }}
        >
          <PlusOutlined />
          Drawer \u5C55\u793A
        </Button>
      </Space>
      <ModalForm
        title="\u65B0\u5EFA\u8868\u5355"
        open={modalVisit}
        onFinish={async () => {
          message.success('\u63D0\u4EA4\u6210\u529F');
          return true;
        }}
        onOpenChange={setModalVisit}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
            tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
            placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
          />

          <ProFormText
            width="md"
            name="company"
            label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
            placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="contract"
            label="\u5408\u540C\u540D\u79F0"
            placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
          />
          <ProFormDateRangePicker name="contractTime" label="\u5408\u540C\u751F\u6548\u65F6\u95F4" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            options={[
              {
                value: 'chapter',
                label: '\u76D6\u7AE0\u540E\u751F\u6548',
              },
            ]}
            width="xs"
            name="useMode"
            label="\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F"
          />
          <ProFormSelect
            width="xs"
            options={[
              {
                value: 'time',
                label: '\u5C65\u884C\u5B8C\u7EC8\u6B62',
              },
            ]}
            name="unusedMode"
            label="\u5408\u540C\u7EA6\u5B9A\u5931\u6548\u6548\u65B9\u5F0F"
          />
        </ProForm.Group>
        <ProFormText width="sm" name="id" label="\u4E3B\u5408\u540C\u7F16\u53F7" />
        <ProFormText
          name="project"
          disabled
          label="\u9879\u76EE\u540D\u79F0"
          initialValue="xxxx\u9879\u76EE"
        />
        <ProFormText
          width="xs"
          name="mangerName"
          disabled
          label="\u5546\u52A1\u7ECF\u7406"
          initialValue="\u542F\u9014"
        />
      </ModalForm>
      <DrawerForm
        onOpenChange={setDrawerVisit}
        title="\u65B0\u5EFA\u8868\u5355"
        open={drawerVisit}
        onFinish={async () => {
          message.success('\u63D0\u4EA4\u6210\u529F');
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
            tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
            placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
          />

          <ProFormText
            width="md"
            name="company"
            label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
            placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="contract"
            label="\u5408\u540C\u540D\u79F0"
            placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
          />
          <ProFormDateRangePicker name="contractTime" label="\u5408\u540C\u751F\u6548\u65F6\u95F4" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            options={[
              {
                value: 'chapter',
                label: '\u76D6\u7AE0\u540E\u751F\u6548',
              },
            ]}
            width="xs"
            name="useMode"
            label="\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F"
          />
          <ProFormSelect
            width="xs"
            options={[
              {
                value: 'time',
                label: '\u5C65\u884C\u5B8C\u7EC8\u6B62',
              },
            ]}
            name="unusedMode"
            label="\u5408\u540C\u7EA6\u5B9A\u5931\u6548\u6548\u65B9\u5F0F"
          />
        </ProForm.Group>
        <ProFormText width="sm" name="id" label="\u4E3B\u5408\u540C\u7F16\u53F7" />
        <ProFormText
          name="project"
          disabled
          label="\u9879\u76EE\u540D\u79F0"
          initialValue="xxxx\u9879\u76EE"
        />
        <ProFormText
          width="xs"
          name="mangerName"
          disabled
          label="\u5546\u52A1\u7ECF\u7406"
          initialValue="\u542F\u9014"
        />
      </DrawerForm>
    </>
  );
};
`},51020:function(e,n){n.Z=`import { FilterOutlined } from '@ant-design/icons';
import {
  LightFilter,
  ProFormCascader,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { TreeSelect } from 'antd';

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

export default () => {
  return (
    <LightFilter
      initialValues={{
        sex: 'man',
      }}
      bordered
      collapseLabel={<FilterOutlined />}
      onFinish={async (values) => console.log(values)}
    >
      <ProFormSelect
        name="sex"
        showSearch
        valueEnum={{
          man: '\u7537',
          woman: '\u5973',
        }}
        placeholder="\u6027\u522B"
      />
      <ProFormRadio.Group
        name="radio"
        radioType="button"
        options={[
          {
            value: 'weekly',
            label: '\u6BCF\u5468',
          },
          {
            value: 'quarterly',
            label: '\u6BCF\u5B63\u5EA6',
          },
          {
            value: 'monthly',
            label: '\u6BCF\u6708',
          },
          {
            value: 'yearly',
            label: '\u6BCF\u5E74',
          },
        ]}
      />
      <ProFormDatePicker name="time" placeholder="\u65E5\u671F" />
      <ProFormTreeSelect
        request={async () => treeData}
        fieldProps={{
          fieldNames: {
            label: 'title',
          },
          treeCheckable: true,
          showCheckedStrategy: TreeSelect.SHOW_PARENT,
          placeholder: 'Please select',
        }}
        name="treeSelect"
      />
      <ProFormCheckbox.Group
        name="checkbox"
        label="\u8FC1\u79FB\u7C7B\u578B"
        width="lg"
        options={['\u7ED3\u6784\u8FC1\u79FB', '\u5168\u91CF\u8FC1\u79FB', '\u589E\u91CF\u8FC1\u79FB', '\u5168\u91CF\u6821\u9A8C']}
      />
      <ProFormCascader
        request={async () => [
          {
            value: 'zhejiang',
            label: '\u6D59\u6C5F',
            children: [
              {
                value: 'hangzhou',
                label: '\u676D\u5DDE',
                children: [
                  {
                    value: 'xihu',
                    label: '\u897F\u6E56',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ]}
        name="area"
      />
    </LightFilter>
  );
};
`},33266:function(e,n){n.Z=`import {
  LightFilter,
  ProFormDateTimePicker,
  ProFormSelect,
} from '@ant-design/pro-components';

export default () => {
  return (
    <LightFilter
      initialValues={{
        sex: 'man',
      }}
      collapse
      onFinish={async (values) => console.log(values)}
    >
      <ProFormSelect
        name="sex"
        label="\u6027\u522B"
        showSearch
        valueEnum={{
          man: '\u7537',
          woman: '\u5973',
        }}
      />
      <ProFormDateTimePicker name="time" label="\u65F6\u95F4" />
    </LightFilter>
  );
};
`},85062:function(e,n){n.Z=`import {
  LightFilter,
  ProFormCascader,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDigit,
  ProFormFieldSet,
  ProFormSelect,
  ProFormSlider,
  ProFormSwitch,
  ProFormText,
  ProFormTimePicker,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Radio, TreeSelect } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import dayjs from 'dayjs';
import React from 'react';

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

export default () => {
  const [size, setSize] = React.useState<SizeType>('middle');
  return (
    <div>
      <Radio.Group
        value={size}
        onChange={(e) => {
          setSize(e.target.value);
        }}
      >
        <Radio.Button value="middle">Middle</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <LightFilter<{
        sex: string;
      }>
        initialValues={{
          name1: 'yutingzhao1991',
          name3: '2020-08-19',
          range: [20, 80],
          slider: 20,
          sex: [
            {
              value: 'open1',
              label: '\u6253\u5F00',
            },
            {
              value: 'closed2',
              label: '\u5173\u95ED',
            },
          ],
          datetimeRanger: [
            dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(),
            dayjs('2019-11-16 12:50:26').valueOf(),
          ],
          timeRanger: [
            dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(),
            dayjs('2019-11-16 12:50:26').valueOf(),
          ],
        }}
        size={size}
        onFinish={async (values) => console.log(values.sex)}
      >
        <ProFormSelect
          name="sex"
          label="\u6027\u522B"
          showSearch
          allowClear={false}
          fieldProps={{
            labelInValue: true,
          }}
          valueEnum={{
            man: '\u7537',
            woman: '\u5973',
          }}
        />
        <ProFormSelect
          name="area"
          label="\u5730\u533A"
          mode="multiple"
          valueEnum={{
            beijing: '\u5317\u4EAC',
            shanghai: '\u4E0A\u6D77',
            hangzhou: '\u676D\u5DDE',
            long: '\u8FD9\u662F\u4E00\u4E2A\u5F88\u957F\u7684\u7528\u6765\u6D4B\u8BD5\u6EA2\u51FA\u7684\u9879\u76EE',
          }}
        />
        <ProFormCheckbox.Group
          name="checkbox-group"
          label="Checkbox.Group"
          options={['A', 'B', 'C', 'D', 'E', 'F']}
        />
        <ProFormTreeSelect
          initialValue={['0-0', '0-1']}
          label="\u6811\u5F62\u4E0B\u62C9\u9009\u62E9\u5668"
          fieldProps={{
            fieldNames: {
              label: 'title',
            },
            treeData,
            treeCheckable: true,
            showCheckedStrategy: TreeSelect.SHOW_PARENT,
            placeholder: 'Please select',
          }}
          name="treeSelect"
        />
        <ProFormCascader
          width="md"
          request={async () => [
            {
              value: 'zhejiang',
              label: '\u6D59\u6C5F',
              children: [
                {
                  value: 'hangzhou',
                  label: '\u676D\u5DDE',
                  children: [
                    {
                      value: 'xihu',
                      label: '\u897F\u6E56',
                    },
                  ],
                },
              ],
            },
            {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [
                {
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [
                    {
                      value: 'zhonghuamen',
                      label: 'Zhong Hua Men',
                    },
                  ],
                },
              ],
            },
          ]}
          name="area"
          label="\u533A\u57DF"
          initialValue={['zhejiang', 'hangzhou', 'xihu']}
        />
        <ProFormSwitch name="open" label="\u5F00\u5173" />
        <ProFormDigit name="count" label="\u6570\u91CF" />
        <ProFormSlider name="range" label="\u8303\u56F4" range />
        <ProFormSlider name="slider" label="\u8303\u56F4" />
        <ProFormText name="name1" label="\u540D\u79F0" />
        <ProFormSwitch name="open" label="\u5F00\u5173" secondary />
        <ProFormText name="name2" label="\u5730\u5740" secondary />
        <ProFormDatePicker
          name="name3"
          label="\u4E0D\u80FD\u6E05\u7A7A\u7684\u65E5\u671F"
          allowClear={false}
        />
        <ProFormDateRangePicker name="date" label="\u65E5\u671F\u8303\u56F4" />
        <ProFormDateTimePicker name="datetime" label="\u65E5\u671F\u65F6\u95F4" />
        <ProFormDateTimeRangePicker
          name="datetimeRanger"
          label="\u65E5\u671F\u65F6\u95F4\u8303\u56F4"
        />
        <ProFormTimePicker name="time" label="\u65F6\u95F4" />
        <ProFormTimePicker.RangePicker name="timeRanger" label="\u65F6\u95F4\u8303\u56F4" />
        <ProFormFieldSet name="name" label="\u59D3\u540D">
          <ProFormText />
          <ProFormText />
        </ProFormFieldSet>
      </LightFilter>
    </div>
  );
};
`},58125:function(e,n){n.Z=`import {
  ProFormDatePicker,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';

export default () => {
  return (
    <QueryFilter defaultCollapsed split>
      <ProFormText name="name" label="\u5E94\u7528\u540D\u79F0" />
      <ProFormDatePicker name="createDate" label="\u521B\u5EFA\u65F6\u95F4" />
      <ProFormText name="status" label="\u5E94\u7528\u72B6\u6001" />
      <ProFormDatePicker name="replyDate" label="\u54CD\u5E94\u65E5\u671F" />
      <ProFormDatePicker name="startDate" label="\u521B\u5EFA\u65F6\u95F4" />
      <ProFormDatePicker name="endDate" label="\u7ED3\u675F\u65F6\u95F4" />
    </QueryFilter>
  );
};
`},14502:function(e,n){n.Z=`import {
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';

export default () => {
  return (
    <QueryFilter layout="vertical">
      <ProFormText name="name" label="\u8FD9\u662F\u4E00\u4E2A\u8D85\u7EA7\u8D85\u7EA7\u957F\u7684\u540D\u79F0" />
      <ProFormDatePicker name="birth" label="\u521B\u5EFA\u65F6\u95F4" />
      <ProFormText name="sex" label="\u5E94\u7528\u72B6\u6001" />
      <ProFormRadio.Group
        name="freq"
        label="\u67E5\u8BE2\u9891\u5EA6"
        options={[
          {
            value: 'weekly',
            label: '\u6BCF\u5468',
          },
          {
            value: 'quarterly',
            label: '\u6BCF\u5B63\u5EA6',
          },
          {
            value: 'monthly',
            label: '\u6BCF\u6708',
          },
          {
            value: 'yearly',
            label: '\u6BCF\u5E74',
          },
        ]}
      />
      <ProFormCheckbox.Group
        name="checkbox"
        label="\u884C\u4E1A\u5206\u5E03"
        options={['\u519C\u4E1A', '\u5236\u9020\u4E1A', '\u4E92\u8054\u7F51']}
      />
    </QueryFilter>
  );
};
`},79788:function(e,n){n.Z=`import {
  ProForm,
  ProFormDateTimePicker,
  ProFormText,
} from '@ant-design/pro-components';

export default () => {
  return (
    <ProForm grid={true}>
      <ProForm.Group>
        <ProFormDateTimePicker
          label="\u4E0B\u5355\u65F6\u95F4"
          colProps={{ xl: 12 }}
          name="orderTime"
          required
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
        />
        <ProFormText
          disabled
          colProps={{ xl: 12 }}
          name="pay"
          label="\u652F\u4ED8\u65B9\u5F0F"
        />
      </ProForm.Group>
    </ProForm>
  );
};
`},82950:function(e,n){n.Z=`import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormDatePicker,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import { Input, Tabs } from 'antd';
import React, { useState } from 'react';

type AdvancedSearchProps = {
  onFilterChange?: (allValues: any) => void;
  onSearch?: (text: string) => void;
  onTypeChange?: (type: string) => void;
  defaultType?: string;
};

const AdvancedSearch: React.FC<AdvancedSearchProps> = (props) => {
  const {
    onSearch,
    onTypeChange,
    defaultType = 'articles',
    onFilterChange,
  } = props;
  const [searchText, setSearchText] = useState<string>();
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const quickSearch = ['\u5C0F\u7A0B\u5E8F\u5F00\u53D1', '\u5165\u9A7B', 'ISV \u6743\u9650'];
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <Input.Search
          placeholder="\u8BF7\u8F93\u5165"
          enterButton="\u641C\u7D22"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onSearch={onSearch}
          style={{ maxWidth: 522, width: '100%' }}
        />
        <div
          style={{
            display: 'flex',
            gap: 12,
          }}
        >
          {quickSearch.map((text) => (
            <a
              key={text}
              onClick={() => {
                setSearchText(text);
                if (onSearch) {
                  onSearch(text);
                }
              }}
            >
              {text}
            </a>
          ))}
        </div>
      </div>

      <Tabs
        defaultActiveKey={defaultType}
        onChange={onTypeChange}
        tabBarExtraContent={
          <a
            style={{
              display: 'flex',
              gap: 4,
            }}
            onClick={() => {
              setShowFilter(!showFilter);
            }}
          >
            \u9AD8\u7EA7\u7B5B\u9009 {showFilter ? <UpOutlined /> : <DownOutlined />}
          </a>
        }
        items={[
          {
            key: 'articles',
            label: '\u6587\u7AE0',
          },
          {
            key: 'projects',
            label: '\u9879\u76EE',
          },
          {
            key: 'applications',
            label: '\u5E94\u7528',
          },
        ]}
      />

      {showFilter ? (
        <QueryFilter
          submitter={false}
          span={24}
          labelWidth="auto"
          split
          onChange={onFilterChange}
        >
          <ProForm.Group title="\u59D3\u540D">
            <ProFormText name="name" />
          </ProForm.Group>
          <ProForm.Group title="\u8BE6\u60C5">
            <ProFormText name="age" label="\u5E74\u9F84" />
            <ProFormDatePicker name="birth" label="\u751F\u65E5" />
          </ProForm.Group>
        </QueryFilter>
      ) : null}
    </div>
  );
};

export default AdvancedSearch;
`},3379:function(e,n){n.Z=`import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { Input } from 'antd';

const valueEnum = {
  all: { text: '\u5168\u90E8', status: 'Default' },
  open: {
    text: '\u672A\u89E3\u51B3',
    status: 'Error',
  },
  closed: {
    text: '\u5DF2\u89E3\u51B3',
    status: 'Success',
    disabled: true,
  },
  processing: {
    text: '\u89E3\u51B3\u4E2D',
    status: 'Processing',
  },
};

type DataItem = {
  name: string;
  state: string;
};

const columns: ProFormColumnsType<DataItem>[] = [
  {
    title: '\u6807\u9898',
    dataIndex: 'title',
    initialValue: '\u5FC5\u586B',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
        },
      ],
    },
    width: 'm',
  },
  {
    title: '\u72B6\u6001',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum,
    width: 'm',
    tooltip: '\u5F53title\u4E3Adisabled\u65F6\u72B6\u6001\u65E0\u6CD5\u9009\u62E9',
    dependencies: ['title'],
    fieldProps: (form) => {
      if (form.getFieldValue('title') === 'disabled') {
        return {
          disabled: true,
          placeholder: 'disabled',
        };
      } else {
        return {
          placeholder: 'normal',
        };
      }
    },
  },
  {
    title: '\u6807\u7B7E',
    dataIndex: 'labels',
    width: 'm',
    tooltip: '\u5F53title\u4E3A\u5FC5\u586B\u65F6\u6B64\u9879\u5C06\u4E3A\u5FC5\u586B',
    dependencies: ['title'],
    formItemProps(form) {
      if (form.getFieldValue('title') === '\u5FC5\u586B') {
        return {
          rules: [
            {
              required: true,
            },
          ],
        };
      } else {
        return {};
      }
    },
  },
  {
    valueType: 'dependency',
    name: ['title'],
    columns: ({ title }) => {
      return title !== 'hidden'
        ? [
            {
              title: 'title\u4E3Ahidden\u65F6\u9690\u85CF',
              dataIndex: 'hidden',
              valueType: 'date',
              renderFormItem: () => {
                return <Input />;
              },
            },
          ]
        : [];
    },
  },
  {
    title: '\u521B\u5EFA\u65F6\u95F4',
    key: 'showTime',
    dataIndex: 'createName',
    valueType: 'date',
  },
  {
    valueType: 'divider',
  },
];

export default () => {
  return (
    <>
      <BetaSchemaForm<DataItem>
        shouldUpdate={false}
        layoutType="Form"
        onFinish={async (values) => {
          console.log(values);
        }}
        columns={columns}
      />
    </>
  );
};
`},78840:function(e,n){n.Z=`import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm, ProForm } from '@ant-design/pro-components';

const valueEnum = {
  money: { text: '\u6309\u91D1\u989D' },
  discount: { text: '\u6309\u6298\u6263' },
};

type DataItem = {
  name: string;
  state: string;
};

const columns: ProFormColumnsType<DataItem>[] = [
  {
    title: '\u4F18\u60E0\u65B9\u5F0F',
    dataIndex: 'type',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
        },
      ],
    },
    valueType: 'select',
    valueEnum,
    width: 'm',
  },
  {
    valueType: 'dependency',
    name: ['type'],
    columns: ({ type }) => {
      if (type === 'money') {
        return [
          {
            dataIndex: 'money',
            title: '\u4F18\u60E0\u91D1\u989D',
            width: 'm',
            valueType: 'money',
          },
        ];
      }

      if (type === 'discount') {
        return [
          {
            dataIndex: 'discount',
            title: '\u6298\u6263',
            valueType: 'digit',
            width: 'm',
            fieldProps: {
              precision: 2,
            },
          },
        ];
      }

      return [];
    },
  },
];

export default () => {
  return (
    <>
      <h1>\u666E\u901Ajson\u8868\u5355</h1>
      <BetaSchemaForm<DataItem>
        onFinish={async (values) => {
          console.log(values);
        }}
        columns={columns}
      />
      <h1>\u5D4C\u5957json\u8868\u5355</h1>
      <ProForm
        initialValues={{
          type: 'money',
        }}
      >
        <BetaSchemaForm<DataItem>
          layoutType="Embed"
          onFinish={async (values) => {
            console.log(values);
          }}
          columns={columns}
        />
      </ProForm>
    </>
  );
};
`},65005:function(e,n){n.Z=`import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { Input } from 'antd';

const valueEnum = {
  all: { text: '\u5168\u90E8', status: 'Default' },
  open: {
    text: '\u672A\u89E3\u51B3',
    status: 'Error',
  },
  closed: {
    text: '\u5DF2\u89E3\u51B3',
    status: 'Success',
    disabled: true,
  },
  processing: {
    text: '\u89E3\u51B3\u4E2D',
    status: 'Processing',
  },
};

type DataItem = {
  name: string;
  state: string;
  title: string;
};

const columns: ProFormColumnsType<DataItem>[] = [
  {
    title: '\u6807\u9898',
    dataIndex: 'title',
    initialValue: '\u5FC5\u586B',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
        },
      ],
    },
    width: 'm',
  },
  {
    title: '\u72B6\u6001',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum,
    width: 'm',
    tooltip: '\u5F53title\u4E3Adisabled\u65F6\u72B6\u6001\u65E0\u6CD5\u9009\u62E9',
    fieldProps: (form) => {
      if (form.getFieldValue('title') === 'disabled') {
        return {
          disabled: true,
          placeholder: 'disabled',
        };
      } else {
        return {
          placeholder: 'normal',
        };
      }
    },
  },
  {
    title: '\u6807\u7B7E',
    dataIndex: 'labels',
    width: 'm',
    tooltip: '\u5F53title\u4E3A\u5FC5\u586B\u65F6\u6B64\u9879\u5C06\u4E3A\u5FC5\u586B',
    dependencies: ['title'],
    formItemProps(form) {
      if (form.getFieldValue('title') === '\u5FC5\u586B') {
        return {
          rules: [
            {
              required: true,
            },
          ],
        };
      } else {
        return {};
      }
    },
  },
  {
    valueType: 'dependency',
    name: ['title'],
    columns: ({ title }) => {
      return title !== 'hidden'
        ? [
            {
              title: 'title\u4E3Ahidden\u65F6\u9690\u85CF',
              dataIndex: 'hidden',
              valueType: 'date',
              renderFormItem: () => {
                return <Input />;
              },
            },
          ]
        : [];
    },
  },
  {
    title: '\u521B\u5EFA\u65F6\u95F4',
    key: 'showTime',
    dataIndex: 'createName',
    valueType: 'date',
  },
];

export default () => {
  return (
    <>
      <BetaSchemaForm<DataItem>
        shouldUpdate={(newValues, oldValues) => {
          if (newValues.title !== oldValues?.title) {
            return true;
          }
          return false;
        }}
        layoutType="Form"
        onFinish={async (values) => {
          console.log(values);
        }}
        columns={columns}
      />
    </>
  );
};
`},9387:function(e,n){n.Z=`import type { ProFormColumnsType } from '@ant-design/pro-components';
import {
  BetaSchemaForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';

const valueEnum = {
  all: { text: '\u5168\u90E8', status: 'Default' },
  open: {
    text: '\u672A\u89E3\u51B3',
    status: 'Error',
  },
  closed: {
    text: '\u5DF2\u89E3\u51B3',
    status: 'Success',
    disabled: true,
  },
  processing: {
    text: '\u89E3\u51B3\u4E2D',
    status: 'Processing',
  },
};

type DataItem = {
  name: string;
  state: string;
};

const columns: ProFormColumnsType<DataItem>[] = [
  {
    title: '\u6807\u9898',
    dataIndex: 'title',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
        },
      ],
    },
    width: 'm',
  },
  {
    title: '\u72B6\u6001',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum,
    width: 'm',
  },
];

export default () => {
  return (
    <ProForm>
      <h1>ProForm </h1>
      <ProFormText name="username" />
      <ProFormSelect
        name="select-multiple"
        label="\u591A\u9009"
        valueEnum={{
          red: 'Red',
          green: 'Green',
          blue: 'Blue',
        }}
        fieldProps={{
          mode: 'multiple',
        }}
        placeholder="Please select favorite colors"
        rules={[
          {
            required: true,
            message: 'Please select your favorite colors!',
            type: 'array',
          },
        ]}
      />
      <h1>\u8868\u53551 </h1>
      <BetaSchemaForm<DataItem> layoutType="Embed" columns={columns} />
      <h1>\u8868\u53552</h1>
      <BetaSchemaForm<DataItem>
        layoutType="Embed"
        columns={[
          {
            title: '\u521B\u5EFA\u65F6\u95F4',
            key: 'showTime',
            dataIndex: 'createName',
            valueType: 'date',
          },
          {
            title: '\u5206\u7EC4',
            valueType: 'group',
            columns: [
              {
                title: '\u72B6\u6001',
                dataIndex: 'groupState',
                valueType: 'select',
                width: 'xs',
                valueEnum,
              },
              {
                title: '\u6807\u9898',
                width: 'md',
                dataIndex: 'groupTitle',
                formItemProps: {
                  rules: [
                    {
                      required: true,
                      message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
                    },
                  ],
                },
              },
            ],
          },
        ]}
      />
    </ProForm>
  );
};
`},45506:function(e,n){n.Z=`import type {
  ProFormColumnsType,
  ProFormLayoutType,
} from '@ant-design/pro-components';
import { BetaSchemaForm, ProFormSelect } from '@ant-design/pro-components';
import { Alert, DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const valueEnum = {
  all: { text: '\u5168\u90E8', status: 'Default' },
  open: {
    text: '\u672A\u89E3\u51B3',
    status: 'Error',
  },
  closed: {
    text: '\u5DF2\u89E3\u51B3',
    status: 'Success',
    disabled: true,
  },
  processing: {
    text: '\u89E3\u51B3\u4E2D',
    status: 'Processing',
  },
};

type DataItem = {
  name: string;
  state: string;
};

const columns: ProFormColumnsType<DataItem>[] = [
  {
    title: '\u6807\u9898',
    dataIndex: 'title',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
        },
      ],
    },
    width: 'md',
    colProps: {
      xs: 24,
      md: 12,
    },
    initialValue: '\u9ED8\u8BA4\u503C',
    convertValue: (value) => {
      return \`\u6807\u9898\uFF1A\${value}\`;
    },
    transform: (value) => {
      return {
        title: \`\${value}-\u8F6C\u6362\`,
      };
    },
  },
  {
    title: '\u72B6\u6001',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum,
    width: 'md',
    colProps: {
      xs: 24,
      md: 12,
    },
  },
  {
    title: '\u6807\u7B7E',
    dataIndex: 'labels',
    width: 'md',
    colProps: {
      xs: 12,
      md: 4,
    },
  },
  {
    valueType: 'switch',
    title: '\u5F00\u5173',
    dataIndex: 'Switch',
    fieldProps: {
      style: {
        width: '200px',
      },
    },
    width: 'md',
    colProps: {
      xs: 12,
      md: 20,
    },
  },
  {
    title: '\u521B\u5EFA\u65F6\u95F4',
    key: 'showTime',
    dataIndex: 'createName',
    initialValue: [dayjs().add(-1, 'm'), dayjs()],
    renderFormItem: () => <DatePicker.RangePicker />,
    width: 'md',
    colProps: {
      xs: 24,
      md: 12,
    },
  },
  {
    title: '\u66F4\u65B0\u65F6\u95F4',
    dataIndex: 'updateName',
    initialValue: [dayjs().add(-1, 'm'), dayjs()],
    renderFormItem: () => <DatePicker.RangePicker />,
    width: 'md',
    colProps: {
      xs: 24,
      md: 12,
    },
  },
  {
    title: '\u5206\u7EC4',
    valueType: 'group',
    columns: [
      {
        title: '\u72B6\u6001',
        dataIndex: 'groupState',
        valueType: 'select',
        width: 'xs',
        colProps: {
          xs: 12,
        },
        valueEnum,
      },
      {
        title: '\u6807\u9898',
        width: 'md',
        dataIndex: 'groupTitle',
        colProps: {
          xs: 12,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
            },
          ],
        },
      },
    ],
  },
  {
    title: '\u5217\u8868',
    valueType: 'formList',
    dataIndex: 'list',
    initialValue: [{ state: 'all', title: '\u6807\u9898' }],
    colProps: {
      xs: 24,
      sm: 12,
    },
    columns: [
      {
        valueType: 'group',
        columns: [
          {
            title: '\u72B6\u6001',
            dataIndex: 'state',
            valueType: 'select',
            colProps: {
              xs: 24,
              sm: 12,
            },
            width: 'xs',
            valueEnum,
          },
          {
            title: '\u6807\u9898',
            dataIndex: 'title',
            width: 'md',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
                },
              ],
            },
            colProps: {
              xs: 24,
              sm: 12,
            },
          },
        ],
      },
      {
        valueType: 'dateTime',
        initialValue: new Date(),
        dataIndex: 'currentTime',
        width: 'md',
      },
    ],
  },
  {
    title: 'FormSet',
    valueType: 'formSet',
    dataIndex: 'formSet',
    colProps: {
      xs: 24,
      sm: 12,
    },
    rowProps: {
      gutter: [16, 0],
    },
    columns: [
      {
        title: '\u72B6\u6001',
        dataIndex: 'groupState',
        valueType: 'select',
        width: 'md',
        valueEnum,
      },
      {
        width: 'xs',
        title: '\u6807\u9898',
        dataIndex: 'groupTitle',
        tooltip: '\u6807\u9898\u8FC7\u957F\u4F1A\u81EA\u52A8\u6536\u7F29',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
            },
          ],
        },
      },
    ],
  },
  {
    title: '\u521B\u5EFA\u65F6\u95F4',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    width: 'md',
    colProps: {
      span: 24,
    },
    transform: (value) => {
      return {
        startTime: value[0],
        endTime: value[1],
      };
    },
  },
];

export default () => {
  const [layoutType, setLayoutType] = useState<ProFormLayoutType>('Form');
  return (
    <>
      <Space
        style={{
          width: '100%',
        }}
        direction="vertical"
      >
        <Alert
          type="warning"
          message="QueryFilter \u548C lightFilter \u6682\u4E0D\u652F\u6301grid\u6A21\u5F0F"
          style={{
            marginBlockEnd: 24,
          }}
        />
        <ProFormSelect
          label="\u5E03\u5C40\u65B9\u5F0F"
          options={[
            'Form',
            'ModalForm',
            'DrawerForm',
            'LightFilter',
            'QueryFilter',
            'StepsForm',
            'StepForm',
            'Embed',
          ]}
          fieldProps={{
            value: layoutType,
            onChange: (e) => setLayoutType(e),
          }}
        />
      </Space>
      <BetaSchemaForm<DataItem>
        trigger={<a>\u70B9\u51FB\u6211</a>}
        layoutType={layoutType}
        steps={[
          {
            title: 'ProComponent',
          },
        ]}
        rowProps={{
          gutter: [16, 16],
        }}
        colProps={{
          span: 12,
        }}
        grid={layoutType !== 'LightFilter' && layoutType !== 'QueryFilter'}
        onFinish={async (values) => {
          console.log(values);
        }}
        columns={(layoutType === 'StepsForm' ? [columns] : columns) as any}
      />
    </>
  );
};
`},55754:function(e,n){n.Z=`import type {
  FormInstance,
  ProFormColumnsType,
} from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef } from 'react';

const valueEnum = {
  all: { text: '\u5168\u90E8', status: 'Default' },
  open: {
    text: '\u672A\u89E3\u51B3',
    status: 'Error',
  },
  closed: {
    text: '\u5DF2\u89E3\u51B3',
    status: 'Success',
    disabled: true,
  },
  processing: {
    text: '\u89E3\u51B3\u4E2D',
    status: 'Processing',
  },
};

type DataItem = {
  name: string;
  state: string;
};

const columns: ProFormColumnsType<DataItem>[][] = [
  [
    {
      title: '\u6807\u9898',
      dataIndex: 'title',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
          },
        ],
      },
      width: 'm',
    },
    {
      title: '\u72B6\u6001',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum,
      width: 'm',
    },
  ],
  [
    {
      title: '\u6807\u7B7E',
      dataIndex: 'labels',
      width: 'm',
    },
    {
      title: '\u521B\u5EFA\u65F6\u95F4',
      key: 'showTime',
      dataIndex: 'createName',
      valueType: 'date',
    },
    {
      title: '\u5206\u7EC4',
      valueType: 'group',
      columns: [
        {
          title: '\u72B6\u6001',
          dataIndex: 'groupState',
          valueType: 'select',
          width: 'xs',
          valueEnum,
        },
        {
          title: '\u6807\u9898',
          width: 'md',
          dataIndex: 'groupTitle',
          formItemProps: {
            rules: [
              {
                required: true,
                message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
              },
            ],
          },
        },
      ],
    },
  ],
  [
    {
      title: '\u5217\u8868',
      valueType: 'formList',
      dataIndex: 'list',
      initialValue: [{ state: 'all', title: '\u6807\u9898' }],
      columns: [
        {
          valueType: 'group',
          columns: [
            {
              title: '\u72B6\u6001',
              dataIndex: 'state',
              valueType: 'select',
              width: 'xs',
              valueEnum,
            },
            {
              title: '\u6807\u9898',
              dataIndex: 'title',
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
                  },
                ],
              },
              width: 'm',
            },
          ],
        },
      ],
    },
    {
      title: 'FormSet',
      valueType: 'formSet',
      dataIndex: 'formSet',
      columns: [
        {
          title: '\u72B6\u6001',
          dataIndex: 'groupState',
          valueType: 'select',
          width: 'xs',
          valueEnum,
        },
        {
          title: '\u6807\u9898',
          dataIndex: 'groupTitle',
          tooltip: '\u6807\u9898\u8FC7\u957F\u4F1A\u81EA\u52A8\u6536\u7F29',
          formItemProps: {
            rules: [
              {
                required: true,
                message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
              },
            ],
          },
          width: 'm',
        },
      ],
    },
    {
      title: '\u521B\u5EFA\u65F6\u95F4',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  ],
];

export default () => {
  const formRef = useRef<FormInstance>();

  return (
    <BetaSchemaForm<DataItem>
      layoutType="StepsForm"
      steps={[
        {
          title: '\u7B2C\u4E00\u6B65',
        },
        {
          title: '\u7B2C\u4E8C\u6B65',
        },
        {
          title: '\u7B2C\u4E09\u6B65',
        },
      ]}
      onCurrentChange={(current) => {
        console.log('current: ', current);
      }}
      formRef={formRef}
      onFinish={async (values) => {
        return new Promise((resolve) => {
          console.log(values);
          message.success('\u63D0\u4EA4\u6210\u529F');
          setTimeout(() => {
            resolve(true);
            formRef.current?.resetFields();
          }, 2000);
        });
      }}
      columns={columns}
    />
  );
};
`},39920:function(e,n){n.Z=`// \u4E3B\u8981\u5904\u7406\u65B0\u5EFA\u548C\u7F16\u8F91\u7684\u573A\u666F

import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React, { useEffect, useRef } from 'react';

type FormValue = {
  jobInfo: {
    name: string;
    type: number;
  };
  syncTableInfo: {
    timeRange: [Dayjs, Dayjs];
    title: string;
  };
};
const formValue: FormValue = {
  jobInfo: {
    name: 'normal job',
    type: 1,
  },
  syncTableInfo: {
    timeRange: [dayjs().subtract(1, 'm'), dayjs()],
    title: 'example table title',
  },
};
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(formValue);
    }, time);
  });
};
const jobType = [
  {
    value: 1,
    label: '\u56FD\u4F01',
  },
  {
    value: 2,
    label: '\u79C1\u4F01',
  },
];
const EditExample = () => {
  const formMapRef = useRef<
    React.MutableRefObject<ProFormInstance<any> | undefined>[]
  >([]);
  useEffect(() => {
    waitTime(1000).then(() => {
      // \u7F16\u8F91\u573A\u666F\u4E0B\u9700\u8981\u4F7F\u7528formMapRef\u5FAA\u73AF\u8BBE\u7F6EformData
      formMapRef?.current?.forEach((formInstanceRef) => {
        formInstanceRef?.current?.setFieldsValue(formValue);
      });
    });
  }, []);

  return (
    <StepsForm
      formMapRef={formMapRef}
      onFinish={(values) => {
        console.log(values);
        return Promise.resolve(true);
      }}
    >
      <StepsForm.StepForm name="step1" title="\u5DE5\u4F5C\u4FE1\u606F">
        <ProFormText label="\u59D3\u540D" name={['jobInfo', 'name']} />
        <ProFormSelect
          label="\u5DE5\u4F5C\u7C7B\u578B"
          name={['jobInfo', 'type']}
          options={jobType}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm name="step2" title={'\u540C\u6B65\u8868\u5355\u4FE1\u606F'}>
        <ProFormDateRangePicker
          label="\u65F6\u95F4\u533A\u95F4"
          name={['syncTableInfo', 'timeRange']}
        />
        <ProFormText label="\u6807\u9898" name={['syncTableInfo', 'title']} />
      </StepsForm.StepForm>
    </StepsForm>
  );
};
export default EditExample;
`},85879:function(e,n){n.Z=`import { PlusOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { Button, Modal, message } from 'antd';
import { useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        <PlusOutlined />
        \u5206\u6B65\u8868\u5355\u65B0\u5EFA
      </Button>
      <StepsForm
        onFinish={async (values) => {
          console.log(values);
          await waitTime(1000);
          setVisible(false);
          message.success('\u63D0\u4EA4\u6210\u529F');
        }}
        formProps={{
          validateMessages: {
            required: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="\u5206\u6B65\u8868\u5355"
              width={800}
              onCancel={() => setVisible(false)}
              open={visible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="\u521B\u5EFA\u5B9E\u9A8C"
          onFinish={async () => {
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText
            name="name"
            width="md"
            label="\u5B9E\u9A8C\u540D\u79F0"
            tooltip="\u6700\u957F\u4E3A 24 \u4F4D\uFF0C\u7528\u4E8E\u6807\u5B9A\u7684\u552F\u4E00 id"
            placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
            rules={[{ required: true }]}
          />
          <ProFormDatePicker name="date" label="\u65E5\u671F" />
          <ProForm.Group title="\u65F6\u95F4\u9009\u62E9">
            <ProFormDateTimePicker name="dateTime" label="\u5F00\u59CB\u65F6\u95F4" />
            <ProFormDatePicker name="date" label="\u7ED3\u675F\u65F6\u95F4" />
          </ProForm.Group>
          <ProFormTextArea
            name="remark"
            label="\u5907\u6CE8"
            width="lg"
            placeholder="\u8BF7\u8F93\u5165\u5907\u6CE8"
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="\u8BBE\u7F6E\u53C2\u6570">
          <ProFormCheckbox.Group
            name="checkbox"
            label="\u8FC1\u79FB\u7C7B\u578B"
            width="lg"
            options={['\u7ED3\u6784\u8FC1\u79FB', '\u5168\u91CF\u8FC1\u79FB', '\u589E\u91CF\u8FC1\u79FB', '\u5168\u91CF\u6821\u9A8C']}
          />
          <ProForm.Group>
            <ProFormText width="md" name="dbname" label="\u4E1A\u52A1 DB \u7528\u6237\u540D" />
            <ProFormDatePicker
              name="datetime"
              label="\u8BB0\u5F55\u4FDD\u5B58\u65F6\u95F4"
              width="sm"
            />
            <ProFormCheckbox.Group
              name="checkbox"
              label="\u8FC1\u79FB\u7C7B\u578B"
              options={['\u5B8C\u6574 LOB', '\u4E0D\u540C\u6B65 LOB', '\u53D7\u9650\u5236 LOB']}
            />
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="\u53D1\u5E03\u5B9E\u9A8C">
          <ProFormCheckbox.Group
            name="checkbox"
            label="\u90E8\u7F72\u5355\u5143"
            rules={[
              {
                required: true,
              },
            ]}
            options={['\u90E8\u7F72\u5355\u51431', '\u90E8\u7F72\u5355\u51432', '\u90E8\u7F72\u5355\u51433']}
          />
          <ProFormSelect
            label="\u90E8\u7F72\u5206\u7EC4\u7B56\u7565"
            name="remark"
            rules={[
              {
                required: true,
              },
            ]}
            width="md"
            initialValue="1"
            options={[
              {
                value: '1',
                label: '\u7B56\u7565\u4E00',
              },
              { value: '2', label: '\u7B56\u7565\u4E8C' },
            ]}
          />
          <ProFormSelect
            label="Pod \u8C03\u5EA6\u7B56\u7565"
            name="remark2"
            width="md"
            initialValue="2"
            options={[
              {
                value: '1',
                label: '\u7B56\u7565\u4E00',
              },
              { value: '2', label: '\u7B56\u7565\u4E8C' },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};
`},76263:function(e,n){n.Z=`import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import { message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <>
      <StepsForm
        onFinish={async (values) => {
          console.log(values);
          await waitTime(1000);
          message.success('\u63D0\u4EA4\u6210\u529F');
        }}
        formProps={{
          validateMessages: {
            required: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
          },
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="\u7B2C\u4E00\u6B65\u9AA4"
          onFinish={async () => {
            await waitTime(2000);
            return true;
          }}
        >
          <ProCard
            title="\u6E90\u548C\u76EE\u6807"
            bordered
            headerBordered
            collapsible
            style={{
              marginBlockEnd: 16,
              minWidth: 800,
              maxWidth: '100%',
            }}
          >
            <ProFormText
              name="name"
              width="md"
              label="\u8FC1\u79FB\u4EFB\u52A1\u540D\u79F0"
              tooltip="\u6700\u957F\u4E3A 24 \u4F4D\uFF0C\u7528\u4E8E\u6807\u5B9A\u7684\u552F\u4E00 id"
              placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
              rules={[{ required: true }]}
            />
            <ProForm.Group title="\u8282\u70B9" size={8}>
              <ProFormSelect
                width="sm"
                name="source"
                placeholder="\u9009\u62E9\u6765\u6E90\u8282\u70B9"
              />
              <ProFormSelect
                width="sm"
                name="target"
                placeholder="\u9009\u62E9\u76EE\u6807\u8282\u70B9"
              />
            </ProForm.Group>
          </ProCard>

          <ProCard
            title="\u9876\u90E8\u5BF9\u9F50"
            bordered
            headerBordered
            collapsible
            style={{
              minWidth: 800,
              marginBlockEnd: 16,
            }}
          >
            <ProFormDigit
              name="xs"
              label="XS\u53F7\u8868\u5355"
              initialValue={9999}
              tooltip="\u60AC\u6D6E\u51FA\u73B0\u7684\u6C14\u6CE1\u3002"
              placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
              width="xs"
            />
            <ProFormText
              name="s"
              label="S\u53F7\u8868\u5355"
              placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
              width="sm"
            />
            <ProFormDateRangePicker name="m" label="M \u53F7\u8868\u5355" />
            <ProFormSelect
              name="l"
              label="L \u53F7\u8868\u5355"
              fieldProps={{
                mode: 'tags',
              }}
              width="lg"
              initialValue={['\u5434\u5BB6\u8C6A', '\u5468\u661F\u661F']}
              options={['\u5434\u5BB6\u8C6A', '\u5468\u661F\u661F', '\u9648\u62C9\u98CE'].map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </ProCard>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="\u7B2C\u4E8C\u6B65\u9AA4">
          <ProCard
            style={{
              minWidth: 800,
              marginBlockEnd: 16,
              maxWidth: '100%',
            }}
          >
            <ProFormCheckbox.Group
              name="checkbox"
              label="\u8FC1\u79FB\u7C7B\u578B"
              width="lg"
              options={['\u7ED3\u6784\u8FC1\u79FB', '\u5168\u91CF\u8FC1\u79FB', '\u589E\u91CF\u8FC1\u79FB', '\u5168\u91CF\u6821\u9A8C']}
            />
            <ProForm.Group>
              <ProFormText name="dbname" label="\u4E1A\u52A1 DB \u7528\u6237\u540D" />
              <ProFormDatePicker
                name="datetime"
                label="\u8BB0\u5F55\u4FDD\u5B58\u65F6\u95F4"
                width="sm"
              />
            </ProForm.Group>
            <ProFormCheckbox.Group
              name="checkbox"
              label="\u8FC1\u79FB\u7C7B\u578B"
              options={['\u5B8C\u6574 LOB', '\u4E0D\u540C\u6B65 LOB', '\u53D7\u9650\u5236 LOB']}
            />
          </ProCard>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="\u7B2C\u4E09\u6B65\u9AA4">
          <ProCard
            style={{
              marginBlockEnd: 16,
              minWidth: 800,
              maxWidth: '100%',
            }}
          >
            <ProFormCheckbox.Group
              name="checkbox"
              label="\u90E8\u7F72\u5355\u5143"
              rules={[
                {
                  required: true,
                },
              ]}
              options={['\u90E8\u7F72\u5355\u51431', '\u90E8\u7F72\u5355\u51432', '\u90E8\u7F72\u5355\u51433']}
            />
            <ProFormSelect
              label="\u90E8\u7F72\u5206\u7EC4\u7B56\u7565"
              name="remark"
              rules={[
                {
                  required: true,
                },
              ]}
              width="md"
              initialValue="1"
              options={[
                {
                  value: '1',
                  label: '\u7B56\u7565\u4E00',
                },
                { value: '2', label: '\u7B56\u7565\u4E8C' },
              ]}
            />
            <ProFormSelect
              label="Pod \u8C03\u5EA6\u7B56\u7565"
              name="remark2"
              width="md"
              initialValue="2"
              options={[
                {
                  value: '1',
                  label: '\u7B56\u7565\u4E00',
                },
                { value: '2', label: '\u7B56\u7565\u4E8C' },
              ]}
            />
          </ProCard>
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};
`},74957:function(e,n){n.Z=`import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<ProFormInstance>();

  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async () => {
          await waitTime(1000);
          message.success('\u63D0\u4EA4\u6210\u529F');
        }}
        formProps={{
          validateMessages: {
            required: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          title="\u521B\u5EFA\u5B9E\u9A8C"
          stepProps={{
            description: '\u8FD9\u91CC\u586B\u5165\u7684\u90FD\u662F\u57FA\u672C\u4FE1\u606F',
          }}
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText
            name="name"
            label="\u5B9E\u9A8C\u540D\u79F0"
            width="md"
            tooltip="\u6700\u957F\u4E3A 24 \u4F4D\uFF0C\u7528\u4E8E\u6807\u5B9A\u7684\u552F\u4E00 id"
            placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
            rules={[{ required: true }]}
          />
          <ProFormDatePicker name="date" label="\u65E5\u671F" />
          <ProFormDateRangePicker name="dateTime" label="\u65F6\u95F4\u533A\u95F4" />
          <ProFormTextArea
            name="remark"
            label="\u5907\u6CE8"
            width="lg"
            placeholder="\u8BF7\u8F93\u5165\u5907\u6CE8"
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="checkbox"
          title="\u8BBE\u7F6E\u53C2\u6570"
          stepProps={{
            description: '\u8FD9\u91CC\u586B\u5165\u8FD0\u7EF4\u53C2\u6570',
          }}
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            return true;
          }}
        >
          <ProFormCheckbox.Group
            name="checkbox"
            label="\u8FC1\u79FB\u7C7B\u578B"
            width="lg"
            options={['\u7ED3\u6784\u8FC1\u79FB', '\u5168\u91CF\u8FC1\u79FB', '\u589E\u91CF\u8FC1\u79FB', '\u5168\u91CF\u6821\u9A8C']}
          />
          <ProForm.Group>
            <ProFormText name="dbname" label="\u4E1A\u52A1 DB \u7528\u6237\u540D" />
            <ProFormDatePicker
              name="datetime"
              label="\u8BB0\u5F55\u4FDD\u5B58\u65F6\u95F4"
              width="sm"
            />
            <ProFormCheckbox.Group
              name="checkbox"
              label="\u8FC1\u79FB\u7C7B\u578B"
              options={['\u5B8C\u6574 LOB', '\u4E0D\u540C\u6B65 LOB', '\u53D7\u9650\u5236 LOB']}
            />
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="time"
          title="\u53D1\u5E03\u5B9E\u9A8C"
          stepProps={{
            description: '\u8FD9\u91CC\u586B\u5165\u53D1\u5E03\u5224\u65AD',
          }}
        >
          <ProFormCheckbox.Group
            name="checkbox"
            label="\u90E8\u7F72\u5355\u5143"
            rules={[
              {
                required: true,
              },
            ]}
            options={['\u90E8\u7F72\u5355\u51431', '\u90E8\u7F72\u5355\u51432', '\u90E8\u7F72\u5355\u51433']}
          />
          <ProFormSelect
            label="\u90E8\u7F72\u5206\u7EC4\u7B56\u7565"
            name="remark"
            rules={[
              {
                required: true,
              },
            ]}
            initialValue="1"
            options={[
              {
                value: '1',
                label: '\u7B56\u7565\u4E00',
              },
              { value: '2', label: '\u7B56\u7565\u4E8C' },
            ]}
          />
          <ProFormSelect
            label="Pod \u8C03\u5EA6\u7B56\u7565"
            name="remark2"
            initialValue="2"
            options={[
              {
                value: '1',
                label: '\u7B56\u7565\u4E00',
              },
              { value: '2', label: '\u7B56\u7565\u4E8C' },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};
`},27749:function(e,n){n.Z=`import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormCascader,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormList,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { TreeSelect, message } from 'antd';
import moment from 'dayjs';
import { useRef } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

export default () => {
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();
  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        const val1 = await formRef.current?.validateFields();
        console.log('validateFields:', val1);
        const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
        console.log('validateFieldsReturnFormatValue:', val2);
        message.success('\u63D0\u4EA4\u6210\u529F');
      }}
      formRef={formRef}
      params={{ id: '100' }}
      formKey="base-form-use-demo"
      dateFormatter={(value, valueType) => {
        console.log('---->', value, valueType);
        return value.format('YYYY/MM/DD HH:mm:ss');
      }}
      request={async () => {
        await waitTime(1500);
        return {
          name: '\u8682\u8681\u8BBE\u8BA1\u6709\u9650\u516C\u53F8',
          useMode: 'chapter',
        };
      }}
      autoFocusFirstInput
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          required
          dependencies={[['contract', 'name']]}
          addonBefore={<a>\u5BA2\u6237\u540D\u79F0\u5E94\u8BE5\u600E\u4E48\u83B7\u5F97\uFF1F</a>}
          addonAfter={<a>\u70B9\u51FB\u67E5\u770B\u66F4\u591A</a>}
          label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
          tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
          rules={[{ required: true, message: '\u8FD9\u662F\u5FC5\u586B\u9879' }]}
        />
        <ProFormText
          width="md"
          name="company"
          label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit name="count" label="\u4EBA\u6570" width="lg" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name={['contract', 'name']}
          width="md"
          label="\u5408\u540C\u540D\u79F0"
          placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
        />
        <ProFormDateRangePicker
          width="md"
          name={['contract', 'createTime']}
          label="\u5408\u540C\u751F\u6548\u65F6\u95F4"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: '\u76D6\u7AE0\u540E\u751F\u6548',
            },
          ]}
          readonly
          width="xs"
          cacheForSwr
          name="useMode"
          label="\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F"
        />
        <ProFormSelect.SearchSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: '\u5C65\u884C\u5B8C\u7EC8\u6B62',
              type: 'time',
              options: [
                {
                  value: 'time1',
                  label: '\u5C65\u884C\u5B8C\u7EC8\u6B621',
                },
                {
                  value: 'time2',
                  label: '\u5C65\u884C\u5B8C\u7EC8\u6B622',
                },
              ],
            },
          ]}
          name="unusedMode"
          label="\u5408\u540C\u7EA6\u5B9A\u5931\u6548\u65B9\u5F0F"
        />
        <ProFormMoney
          width="md"
          name="money"
          label="\u5408\u540C\u7EA6\u5B9A\u91D1\u989D"
          fieldProps={{
            numberPopoverRender: true,
          }}
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="\u4E3B\u5408\u540C\u7F16\u53F7" />
      <ProFormText
        name="project"
        width="md"
        disabled
        label="\u9879\u76EE\u540D\u79F0"
        initialValue="xxxx\u9879\u76EE"
      />
      <ProFormTextArea
        colProps={{ span: 24 }}
        name="address"
        label="\u8BE6\u7EC6\u7684\u5DE5\u4F5C\u5730\u5740\u6216\u5BB6\u5EAD\u4F4F\u5740"
      />
      <ProFormText
        width="xs"
        name="mangerName"
        disabled
        label="\u5546\u52A1\u7ECF\u7406"
        initialValue="\u542F\u9014"
      />
      <ProFormCascader
        width="md"
        request={async () => [
          {
            value: 'zhejiang',
            label: '\u6D59\u6C5F',
            children: [
              {
                value: 'hangzhou',
                label: '\u676D\u5DDE',
                children: [
                  {
                    value: 'xihu',
                    label: '\u897F\u6E56',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ]}
        name="areaList"
        label="\u533A\u57DF"
        initialValue={['zhejiang', 'hangzhou', 'xihu']}
        addonAfter={'qixian'}
      />
      <ProFormTreeSelect
        initialValue={['0-0-0']}
        label="\u6811\u5F62\u4E0B\u62C9\u9009\u62E9\u5668"
        width={600}
        fieldProps={{
          fieldNames: {
            label: 'title',
          },
          treeData,
          treeCheckable: true,
          showCheckedStrategy: TreeSelect.SHOW_PARENT,
          placeholder: 'Please select',
        }}
      />
      <ProFormDatePicker
        name="date"
        transform={(value) => {
          return {
            date: moment(value).unix(),
          };
        }}
      />
      <ProFormList name="datas">
        {() => {
          return (
            <>
              <ProFormDatePicker
                name="date"
                transform={(value) => {
                  return {
                    date: moment(value).unix(),
                  };
                }}
              />

              <ProFormList name="innerDatas">
                {() => {
                  return (
                    <>
                      <ProFormDatePicker
                        name="date"
                        transform={(value) => {
                          return {
                            date: moment(value).unix(),
                          };
                        }}
                      />
                      <ProFormList name="innerDatas">
                        {() => {
                          return (
                            <>
                              <ProFormDatePicker
                                name="date"
                                transform={(value) => {
                                  return {
                                    date: moment(value).unix(),
                                  };
                                }}
                              />
                              <ProFormList name="innerDatas">
                                {() => {
                                  return (
                                    <>
                                      <ProFormDatePicker
                                        name="date"
                                        transform={(value) => {
                                          return {
                                            date: moment(value).unix(),
                                          };
                                        }}
                                      />
                                    </>
                                  );
                                }}
                              </ProFormList>
                            </>
                          );
                        }}
                      </ProFormList>
                    </>
                  );
                }}
              </ProFormList>
            </>
          );
        }}
      </ProFormList>
    </ProForm>
  );
};
`},6653:function(e,n){n.Z=`import {
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <ProForm
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('\u63D0\u4EA4\u6210\u529F');
      }}
      initialValues={{
        name: '\u8682\u8681\u8BBE\u8BA1\u6709\u9650\u516C\u53F8',
        name2: '\u8682\u8681\u8BBE\u8BA1\u96C6\u56E2',
        useMode: 'chapter',
      }}
    >
      <ProFormText
        width="md"
        name="name"
        label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
        tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
        placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
      />
      <ProFormText
        width="md"
        name={['name2', 'text']}
        label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
        tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
        placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
      />
      {/*  ProFormDependency \u4F1A\u81EA\u52A8\u6CE8\u5165\u5E76\u4E14 \u8FDB\u884C shouldUpdate \u7684\u6BD4\u5BF9  */}
      <ProFormDependency name={['name', ['name2', 'text']]}>
        {({ name, name2 }) => {
          return (
            <ProFormSelect
              options={[
                {
                  value: 'chapter',
                  label: '\u76D6\u7AE0\u540E\u751F\u6548',
                },
              ]}
              width="md"
              name="useMode"
              label={\`\u4E0E\u300A\${name || ''}\u300B \u4E0E \u300A\${
                name2?.text || ''
              }\u300B\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F\`}
            />
          );
        }}
      </ProFormDependency>
      {/* noStyle shouldUpdate \u662F\u5FC5\u9009\u7684\uFF0C\u5199\u4E86 name \u5C31\u4F1A\u5931\u6548 */}
      <ProForm.Item noStyle shouldUpdate>
        {(form) => {
          return (
            <ProFormSelect
              options={[
                {
                  value: 'chapter',
                  label: '\u76D6\u7AE0\u540E\u751F\u6548',
                },
              ]}
              width="md"
              name="useMode"
              label={\`\u4E0E\u300A\${form.getFieldValue('name')}\u300B\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F\`}
            />
          );
        }}
      </ProForm.Item>
    </ProForm>
  );
};
`},70858:function(e,n){n.Z=`import {
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Col, Row, Space, message } from 'antd';
import type { FormLayout } from 'antd/lib/form/Form';
import { useState } from 'react';

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [formLayoutType, setFormLayoutType] = useState<FormLayout>(
    LAYOUT_TYPE_HORIZONTAL,
  );

  const [grid, setGrid] = useState(true);

  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      layout={formLayoutType}
      grid={grid}
      rowProps={{
        gutter: [16, formLayoutType === 'inline' ? 16 : 0],
      }}
      submitter={{
        render: (props, doms) => {
          return formLayoutType === LAYOUT_TYPE_HORIZONTAL ? (
            <Row>
              <Col span={14} offset={4}>
                <Space>{doms}</Space>
              </Col>
            </Row>
          ) : (
            doms
          );
        },
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('\u63D0\u4EA4\u6210\u529F');
      }}
      params={{}}
      request={async () => {
        await waitTime(100);
        return {
          name: '\u8682\u8681\u8BBE\u8BA1\u6709\u9650\u516C\u53F8',
          useMode: 'chapter',
        };
      }}
    >
      <ProFormRadio.Group
        label="\u6807\u7B7E\u5E03\u5C40"
        radioType="button"
        fieldProps={{
          value: formLayoutType,
          onChange: (e) => setFormLayoutType(e.target.value),
        }}
        colProps={{
          span: 20,
        }}
        options={['horizontal', 'vertical', 'inline']}
      />
      <ProFormSwitch
        colProps={{
          span: 4,
        }}
        fieldProps={{
          onChange: setGrid,
        }}
        initialValue={true}
        label="grid\u5F00\u5173"
        name="grid"
      />
      <ProFormText
        name="name"
        label="\u6807\u9898"
        tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
        placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
      />
      <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="\u59D3\u540D" />
      <ProFormDigit colProps={{ md: 12, xl: 8 }} name="phone" label="\u7535\u8BDD" />
      <ProFormText colProps={{ md: 12, xl: 8 }} name="email" label="\u90AE\u7BB1" />
      <ProFormTextArea
        colProps={{ span: 24 }}
        name="address"
        label="\u8BE6\u7EC6\u7684\u5DE5\u4F5C\u5730\u5740\u6216\u5BB6\u5EAD\u4F4F\u5740"
      />
      <ProFormDatePicker
        colProps={{ xl: 8, md: 12 }}
        label="\u5165\u804C\u65E5\u671F"
        name="date"
      />
      <ProFormDateRangePicker
        colProps={{ xl: 8, md: 12 }}
        label="\u5DE5\u4F5C\u5468\u671F"
        name="dateRange"
      />
      <ProFormSelect
        colProps={{ xl: 8, md: 12 }}
        label="\u804C\u4F4D"
        name="level"
        valueEnum={{
          1: 'front end',
          2: 'back end',
          3: 'full stack',
        }}
      />
    </ProForm>
  );
};
`},10058:function(e,n){n.Z=`import { SmileOutlined } from '@ant-design/icons';
import {
  FooterToolbar,
  PageContainer,
  ProForm,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProLayout,
} from '@ant-design/pro-components';
import { Card } from 'antd';

export default () => {
  return (
    <ProLayout
      fixSiderbar
      fixedHeader
      breakpoint={false}
      defaultCollapsed
      pageTitleRender={false}
      menuDataRender={() => [
        {
          path: '/one',
          icon: <SmileOutlined />,
          name: '\u4E00\u7EA7\u540D\u79F0',
          children: [
            {
              path: 'two',
              name: '\u4E8C\u7EA7\u540D\u79F0',
            },
          ],
        },
      ]}
      layout="mix"
      location={{
        pathname: '/one/two',
      }}
    >
      <PageContainer title="\u8F93\u5165\u8868\u5355">
        <Card>
          <ProForm
            submitter={{
              render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            }}
            onFinish={async (values) => console.log(values)}
          >
            <ProForm.Group>
              <ProFormText
                name="name"
                label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
                tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
                placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
              />
              <ProFormText
                width="md"
                name="company"
                label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
                placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                name={['contract', 'name']}
                label="\u5408\u540C\u540D\u79F0"
                placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
              />
              <ProFormDateRangePicker
                name={['contract', 'createTime']}
                label="\u5408\u540C\u751F\u6548\u65F6\u95F4"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                options={[
                  {
                    value: 'chapter',
                    label: '\u76D6\u7AE0\u540E\u751F\u6548',
                  },
                ]}
                width="xs"
                name="chapter"
                label="\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F"
              />
              <ProFormSelect
                width="xs"
                options={[
                  {
                    value: 'time',
                    label: '\u5C65\u884C\u5B8C\u7EC8\u6B62',
                  },
                ]}
                name="unusedMode"
                label="\u5408\u540C\u7EA6\u5B9A\u5931\u6548\u6548\u65B9\u5F0F"
              />
            </ProForm.Group>
            <ProFormText width="sm" name="id" label="\u4E3B\u5408\u540C\u7F16\u53F7" />
            <ProFormText
              name="project"
              disabled
              label="\u9879\u76EE\u540D\u79F0"
              initialValue="xxxx\u9879\u76EE"
            />
            <ProFormText
              width="xs"
              name="mangerName"
              disabled
              label="\u5546\u52A1\u7ECF\u7406"
              initialValue="\u542F\u9014"
            />
            <ProForm.Group>
              <ProFormSelect
                initialValue="money"
                options={[
                  {
                    value: 'money',
                    label: '\u786E\u8BA4\u91D1\u989D',
                  },
                ]}
                width="xs"
                name="useMode"
                label="\u91D1\u989D\u7C7B\u578B"
              />
              <ProFormSelect
                options={[
                  {
                    value: '6',
                    label: '6%',
                  },
                  {
                    value: '12',
                    label: '12%',
                  },
                ]}
                initialValue="6"
                width="xs"
                name="taxRate"
                label="\u7A0E\u7387"
              />
              <ProFormRadio.Group
                label="\u53D1\u7968\u7C7B\u578B"
                name="invoiceType"
                initialValue="\u53D1\u7968"
                options={['\u53D1\u7968', '\u666E\u7968', '\u65E0\u7968']}
              />
            </ProForm.Group>
            <ProFormUploadButton
              extra="\u652F\u6301\u6269\u5C55\u540D\uFF1A.jpg .zip .doc .wps"
              label="\u5012\u7B7E\u62A5\u5907\u9644\u4EF6"
              name="file"
              title="\u4E0A\u4F20\u6587\u4EF6"
            />
            <ProFormDigit
              width="xs"
              name="num"
              label="\u5408\u540C\u4EFD\u6570"
              initialValue={5}
            />
            <ProFormTextArea width="xl" label="\u5408\u540C\u5907\u6CE8\u8BF4\u660E" name="remark" />
          </ProForm>
        </Card>
      </PageContainer>
    </ProLayout>
  );
};
`},67549:function(e,n){n.Z=`import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [loading, setLoading] = useState(false);
  return (
    <ProCard>
      <StepsForm
        onFinish={async () => {
          setLoading(true);
          await waitTime(1000);
          message.success('\u63D0\u4EA4\u6210\u529F');
          setLoading(false);
        }}
        submitter={{
          render: ({ form, onSubmit, step, onPre }) => {
            return [
              <Button
                key="rest"
                onClick={() => {
                  form?.resetFields();
                }}
              >
                \u91CD\u7F6E
              </Button>,
              step > 0 && (
                <Button
                  key="pre"
                  onClick={() => {
                    onPre?.();
                  }}
                >
                  \u4E0A\u4E00\u6B65
                </Button>
              ),
              <Button
                key="next"
                loading={loading}
                type="primary"
                onClick={() => {
                  onSubmit?.();
                }}
              >
                \u4E0B\u4E00\u6B65
              </Button>,
            ];
          },
        }}
        formProps={{
          validateMessages: {
            required: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
          },
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="\u521B\u5EFA\u5B9E\u9A8C"
          onFinish={async () => {
            setLoading(true);
            await waitTime(2000);
            setLoading(false);
            return true;
          }}
        >
          <ProFormText
            name="name"
            label="\u5B9E\u9A8C\u540D\u79F0"
            width="md"
            tooltip="\u6700\u957F\u4E3A 24 \u4F4D\uFF0C\u7528\u4E8E\u6807\u5B9A\u7684\u552F\u4E00 id"
            placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
            rules={[{ required: true }]}
          />
          <ProFormDatePicker name="date" label="\u65E5\u671F" />
          <ProFormDateRangePicker name="dateTime" label="\u65F6\u95F4\u533A\u95F4" />
          <ProFormTextArea
            name="remark"
            label="\u5907\u6CE8"
            width="lg"
            placeholder="\u8BF7\u8F93\u5165\u5907\u6CE8"
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="\u8BBE\u7F6E\u53C2\u6570">
          <ProFormCheckbox.Group
            name="checkbox"
            label="\u8FC1\u79FB\u7C7B\u578B"
            width="lg"
            options={['\u7ED3\u6784\u8FC1\u79FB', '\u5168\u91CF\u8FC1\u79FB', '\u589E\u91CF\u8FC1\u79FB', '\u5168\u91CF\u6821\u9A8C']}
          />
          <ProForm.Group>
            <ProFormText name="dbName" label="\u4E1A\u52A1 DB \u7528\u6237\u540D" />
            <ProFormDatePicker
              name="datetime"
              label="\u8BB0\u5F55\u4FDD\u5B58\u65F6\u95F4"
              width="sm"
            />
          </ProForm.Group>
          <ProFormDependency name={['dbName']}>
            {({ dbName }) => {
              return (
                <ProFormCheckbox.Group
                  name="checkbox"
                  label="\u8FC1\u79FB\u7C7B\u578B"
                  options={
                    dbName
                      ? ['\u5B8C\u6574 LOB', '\u4E0D\u540C\u6B65 LOB', '\u53D7\u9650\u5236 LOB']
                      : ['\u5B8C\u6574 LOB']
                  }
                />
              );
            }}
          </ProFormDependency>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="\u53D1\u5E03\u5B9E\u9A8C">
          <ProFormCheckbox.Group
            name="checkbox"
            label="\u90E8\u7F72\u5355\u5143"
            rules={[
              {
                required: true,
              },
            ]}
            options={['\u90E8\u7F72\u5355\u51431', '\u90E8\u7F72\u5355\u51432', '\u90E8\u7F72\u5355\u51433']}
          />
          <ProFormSelect
            label="\u90E8\u7F72\u5206\u7EC4\u7B56\u7565"
            name="remark"
            rules={[
              {
                required: true,
              },
            ]}
            initialValue="1"
            width="md"
            options={[
              {
                value: '1',
                label: '\u7B56\u7565\u4E00',
              },
              { value: '2', label: '\u7B56\u7565\u4E8C' },
            ]}
          />
          <ProFormSelect
            label="Pod \u8C03\u5EA6\u7B56\u7565"
            name="remark2"
            initialValue="2"
            width="md"
            options={[
              {
                value: '1',
                label: '\u7B56\u7565\u4E00',
              },
              { value: '2', label: '\u7B56\u7565\u4E8C' },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};
`},896:function(e,n){n.Z=`import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormMoney,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();

  const [readonly, setReadonly] = useState(false);
  return (
    <>
      <ProFormSwitch
        checkedChildren="\u5F00\u542F"
        unCheckedChildren="\u5173\u95ED"
        label="\u662F\u5426\u53EA\u8BFB"
        fieldProps={{
          onChange: setReadonly,
        }}
      />
      <ProForm<{
        name: string;
        company?: string;
        useMode?: string;
      }>
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          const val1 = await formRef.current?.validateFields();
          console.log('validateFields:', val1);
          const val2 =
            await formRef.current?.validateFieldsReturnFormatValue?.();
          console.log('validateFieldsReturnFormatValue:', val2);
          message.success('\u63D0\u4EA4\u6210\u529F');
        }}
        formRef={formRef}
        params={{ id: '100' }}
        formKey="base-form-use-demo"
        readonly={readonly}
        request={async () => {
          await waitTime(100);
          return {
            name: '\u8682\u8681\u8BBE\u8BA1\u6709\u9650\u516C\u53F8',
            useMode: 'chapter',
          };
        }}
        autoFocusFirstInput
      >
        <ProFormMoney
          label="\u4E0D\u663E\u793A\u7B26\u53F7"
          name="amount0"
          fieldProps={{
            moneySymbol: false,
          }}
          locale="en-US"
          initialValue={22.22}
          min={0}
          width="lg"
        />
        <ProFormMoney
          label="\u5BBD\u5EA6"
          name="amount1"
          locale="en-US"
          initialValue={22.22}
          min={0}
          width="lg"
        />
        <ProFormMoney
          label="\u9650\u5236\u91D1\u989D\u6700\u5C0F\u4E3A0"
          name="amount2"
          locale="en-US"
          initialValue={22.22}
          min={0}
          trigger="onBlur"
        />
        <ProFormMoney
          label="\u4E0D\u9650\u5236\u91D1\u989D\u5927\u5C0F"
          name="amount3"
          locale="en-GB"
          initialValue={22.22}
        />
        <ProFormMoney
          label="\u8D27\u5E01\u7B26\u53F7\u8DDF\u968F\u5168\u5C40\u56FD\u9645\u5316"
          name="amount4"
          initialValue={22.22}
        />
        <ProFormMoney
          label="\u8D27\u5E01\u7B26\u53F7\u6307\u5B9A\u4E3A ms-MY"
          name="amount-ms-My"
          locale="ms-MY"
          initialValue={-22.22}
        />
        <ProFormMoney
          label="\u8D27\u5E01\u7B26\u53F7\u6307\u5B9A\u4E3A zh-TW"
          name="amount-zh-TW"
          locale="zh-TW"
          initialValue={22.22}
        />
        <ProFormMoney
          label="\u81EA\u5B9A\u4E49\u8D27\u5E01\u7B26\u53F7"
          name="amount5"
          initialValue={22.22}
          customSymbol="\u{1F4B0}"
        />
        <ProFormMoney
          label="\u5C0F\u6570\u70B9\u7CBE\u5EA6"
          name="amount6"
          initialValue={2222222222.222222}
          fieldProps={{ precision: 2 }}
          customSymbol="\u{1F4B0}"
        />
        <ProFormMoney
          label="\u5C0F\u6570\u70B9\u7CBE\u5EA6-0"
          name="amount6"
          initialValue={2222222222.222222}
          fieldProps={{ precision: 0 }}
          customSymbol="\u{1F4B0}"
        />
      </ProForm>
    </>
  );
};
`},80111:function(e,n){n.Z=`import {
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-components';
import { message } from 'antd';

export default () => {
  return (
    <ProForm
      onFinish={async () => {
        message.success('\u63D0\u4EA4\u6210\u529F');
      }}
      syncToUrl={(values, type) => {
        if (type === 'get') {
          // \u4E3A\u4E86\u914D\u5408 transform
          // startTime \u548C endTime \u62FC\u6210 createTimeRanger
          return {
            ...values,
            createTimeRanger:
              values.startTime || values.endTime
                ? [values.startTime, values.endTime]
                : undefined,
          };
        }
        // expirationTime \u4E0D\u540C\u6B65\u5230 url
        return {
          ...values,
          expirationTime: undefined,
        };
      }}
      initialValues={{
        name: '\u8682\u8681\u8BBE\u8BA1\u6709\u9650\u516C\u53F8',
        useMode: 'chapter',
      }}
      autoFocusFirstInput
    >
      <ProFormSelect
        options={[
          {
            value: 'chapter',
            label: '\u76D6\u7AE0\u540E\u751F\u6548',
          },
        ]}
        width="sm"
        name="useMode"
        label="\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F"
      />
      <ProFormDateRangePicker
        transform={(values) => {
          return {
            startTime: values ? values[0] : undefined,
            endTime: values ? values[1] : undefined,
          };
        }}
        width="md"
        name="createTimeRanger"
        label="\u5408\u540C\u751F\u6548\u65F6\u95F4"
      />
      <ProFormDatePicker
        width="md"
        name="expirationTime"
        label="\u5408\u540C\u5931\u6548\u65F6\u95F4"
      />
    </ProForm>
  );
};
`},50321:function(e,n){n.Z=`import { EllipsisOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Dropdown } from 'antd';

export default () => (
  <div
    style={{
      background: '#F5F7FA',
    }}
  >
    <PageContainer
      header={{
        title: '\u9875\u9762\u6807\u9898',
        ghost: true,
        breadcrumb: {
          items: [
            {
              path: '',
              title: '\u4E00\u7EA7\u9875\u9762',
            },
            {
              path: '',
              title: '\u4E8C\u7EA7\u9875\u9762',
            },
            {
              path: '',
              title: '\u5F53\u524D\u9875\u9762',
            },
          ],
        },
        extra: [
          <Button key="1">\u6B21\u8981\u6309\u94AE</Button>,
          <Button key="2">\u6B21\u8981\u6309\u94AE</Button>,
          <Button key="3" type="primary">
            \u4E3B\u8981\u6309\u94AE
          </Button>,
          <Dropdown
            key="dropdown"
            trigger={['click']}
            menu={{
              items: [
                {
                  label: '\u4E0B\u62C9\u83DC\u5355',
                  key: '1',
                },
                {
                  label: '\u4E0B\u62C9\u83DC\u53552',
                  key: '2',
                },
                {
                  label: '\u4E0B\u62C9\u83DC\u53553',
                  key: '3',
                },
              ],
            }}
          >
            <Button key="4" style={{ padding: '0 8px' }}>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ],
      }}
      tabBarExtraContent="\u6D4B\u8BD5tabBarExtraContent"
      tabList={[
        {
          tab: '\u57FA\u672C\u4FE1\u606F',
          key: 'base',
          closable: false,
        },
        {
          tab: '\u8BE6\u7EC6\u4FE1\u606F',
          key: 'info',
        },
      ]}
      tabProps={{
        type: 'editable-card',
        hideAdd: true,
        onEdit: (e, action) => console.log(e, action),
      }}
      footer={[
        <Button key="3">\u91CD\u7F6E</Button>,
        <Button key="2" type="primary">
          \u63D0\u4EA4
        </Button>,
      ]}
    >
      <ProCard direction="column" ghost gutter={[0, 16]}>
        <ProCard style={{ height: 200 }} />
        <ProCard gutter={16} ghost style={{ height: 200 }}>
          <ProCard colSpan={16} />
          <ProCard colSpan={8} />
        </ProCard>
      </ProCard>
    </PageContainer>
  </div>
);
`},82282:function(e,n){n.Z=`import { PageContainer, ProCard } from '@ant-design/pro-components';

export default () => (
  <div
    style={{
      background: '#F5F7FA',
    }}
  >
    <PageContainer
      fixedHeader
      header={{
        title: '\u9875\u9762\u6807\u9898',
        breadcrumb: {
          items: [
            {
              path: '',
              title: '\u4E00\u7EA7\u9875\u9762',
            },
            {
              path: '',
              title: '\u4E8C\u7EA7\u9875\u9762',
            },
            {
              path: '',
              title: '\u5F53\u524D\u9875\u9762',
            },
          ],
        },
      }}
      tabList={[
        {
          tab: '\u5DF2\u9009\u62E9',
          key: '1',
        },
        {
          tab: '\u53EF\u70B9\u51FB',
          key: '2',
        },
        {
          tab: '\u7981\u7528',
          key: '3',
          disabled: true,
        },
      ]}
    >
      <ProCard direction="column" ghost gutter={[0, 16]}>
        <ProCard style={{ height: 200 }} />
        <ProCard gutter={16} ghost>
          <ProCard colSpan={16} style={{ height: 200 }} />
          <ProCard colSpan={8} style={{ height: 200 }} />
        </ProCard>
        <ProCard gutter={16} ghost>
          <ProCard colSpan={8} style={{ height: 200 }} />
          <ProCard colSpan={16} style={{ height: 200 }} />
        </ProCard>
      </ProCard>
    </PageContainer>
  </div>
);
`},60442:function(e,n){n.Z=`import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

export default () => {
  const customLoadingDom = useMemo(
    () => (
      <div style={{ color: 'red', padding: '30px', textAlign: 'center' }}>
        \u81EA\u5B9A\u4E49\u52A0\u8F7D...
      </div>
    ),
    [],
  );
  const [customLoading, setCustomLoading] = useState<React.ReactNode | boolean>(
    customLoadingDom,
  );

  useEffect(() => {
    if (process.env.NODE_ENV?.toLocaleLowerCase() === 'test') {
      return;
    }
    setTimeout(() => {
      setCustomLoading(false);
    }, 3000);
  }, []);

  return (
    <div
      style={{
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
        minHeight: '100vh',
        background: '#F5F7FA',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 24,
      }}
    >
      <Card>
        <PageContainer
          ghost
          loading
          header={{
            title: '\u9ED8\u8BA4loading',
            breadcrumb: {
              items: [
                {
                  path: '',
                  title: '\u4E00\u7EA7\u9875\u9762',
                },
                {
                  path: '',
                  title: '\u4E8C\u7EA7\u9875\u9762',
                },
                {
                  path: '',
                  title: '\u5F53\u524D\u9875\u9762',
                },
              ],
            },
          }}
        >
          <div
            style={{
              height: '100vh',
            }}
          >
            \u52A0\u8F7D\u4E2D\u8FD9\u91CC\u4E0D\u663E\u793A
          </div>
        </PageContainer>
      </Card>
      <Card>
        <PageContainer
          ghost
          loading={{
            spinning: true,
            className: 'customClassName',
            tip: '\u62FC\u547D\u52A0\u8F7D\u4E2D...',
          }}
          header={{
            title: '\u81EA\u5B9A\u4E49loading\u5C5E\u6027',
            breadcrumb: {
              items: [
                {
                  path: '',
                  title: '\u4E00\u7EA7\u9875\u9762',
                },
                {
                  path: '',
                  title: '\u4E8C\u7EA7\u9875\u9762',
                },
                {
                  path: '',
                  title: '\u5F53\u524D\u9875\u9762',
                },
              ],
            },
          }}
        >
          <div
            style={{
              height: '100vh',
            }}
          >
            \u52A0\u8F7D\u4E2D\u8FD9\u91CC\u4E0D\u663E\u793A
          </div>
        </PageContainer>
      </Card>
      <Card>
        <PageContainer
          ghost
          loading={customLoading}
          header={{
            title: '\u81EA\u5B9A\u4E49loading\uFF0C3s\u540E\u663E\u793A\u5185\u5BB9',
            breadcrumb: {
              items: [
                {
                  path: '',
                  title: '\u4E00\u7EA7\u9875\u9762',
                },
                {
                  path: '',
                  title: '\u4E8C\u7EA7\u9875\u9762',
                },
                {
                  path: '',
                  title: '\u5F53\u524D\u9875\u9762',
                },
              ],
            },
          }}
        >
          <div
            style={{
              height: '100vh',
            }}
          >
            \u52A0\u8F7D\u4E2D\u8FD9\u91CC\u4E0D\u663E\u793A
          </div>
        </PageContainer>
      </Card>
    </div>
  );
};
`},76695:function(e,n){n.Z=`/** Title: \u524D\u7F6E\u6C34\u5370 */
import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
  TableDropdown,
  WaterMark,
} from '@ant-design/pro-components';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export interface TableListItem {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
}
const tableListDataSource: TableListItem[] = [];

const creators = ['\u4ED8\u5C0F\u5C0F', '\u66F2\u4E3D\u4E3D', '\u6797\u4E1C\u4E1C', '\u9648\u5E05\u5E05', '\u517C\u67D0\u67D0'];

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u7684\u6587\u5B57\u8981\u5C55\u793A\u4F46\u662F\u8981\u7559\u4E0B\u5C3E\u5DF4'
        : '\u7B80\u77ED\u5907\u6CE8\u6587\u6848',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u5E94\u7528\u540D\u79F0',
    width: 80,
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '\u5BB9\u5668\u6570\u91CF',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '\u72B6\u6001',
    width: 80,
    dataIndex: 'status',
    initialValue: 'all',
    valueEnum: {
      all: { text: '\u5168\u90E8', status: 'Default' },
      close: { text: '\u5173\u95ED', status: 'Default' },
      running: { text: '\u8FD0\u884C\u4E2D', status: 'Processing' },
      online: { text: '\u5DF2\u4E0A\u7EBF', status: 'Success' },
      error: { text: '\u5F02\u5E38', status: 'Error' },
    },
  },
  {
    title: '\u521B\u5EFA\u8005',
    width: 80,
    dataIndex: 'creator',
    valueEnum: {
      all: { text: '\u5168\u90E8' },
      \u4ED8\u5C0F\u5C0F: { text: '\u4ED8\u5C0F\u5C0F' },
      \u66F2\u4E3D\u4E3D: { text: '\u66F2\u4E3D\u4E3D' },
      \u6797\u4E1C\u4E1C: { text: '\u6797\u4E1C\u4E1C' },
      \u9648\u5E05\u5E05: { text: '\u9648\u5E05\u5E05' },
      \u517C\u67D0\u67D0: { text: '\u517C\u67D0\u67D0' },
    },
  },
  {
    title: '\u5907\u6CE8',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '\u64CD\u4F5C',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="link">\u94FE\u8DEF</a>,
      <a key="link2">\u62A5\u8B66</a>,
      <a key="link3">\u76D1\u63A7</a>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'copy', name: '\u590D\u5236' },
          { key: 'delete', name: '\u5220\u9664' },
        ]}
      />,
    ],
  },
];

export default () => (
  <>
    <WaterMark content="\u8682\u8681\u96C6\u56E2">
      <ProTable<TableListItem>
        columns={columns}
        dataSource={tableListDataSource}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        toolbar={{
          title: '\u6807\u7B7E',
          multipleLine: true,
          filter: (
            <LightFilter>
              <ProFormDatePicker name="startdate" label="\u54CD\u5E94\u65E5\u671F" />
            </LightFilter>
          ),
        }}
        search={false}
        dateFormatter="string"
      />
    </WaterMark>
  </>
);
`},13188:function(e,n){n.Z=`/** Title: \u56FE\u7247\u6C34\u5370 */
import { WaterMark } from '@ant-design/pro-components';

export default () => {
  return (
    <WaterMark
      height={36}
      width={115}
      content="qixian.cs"
      image="https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-4fc5-93a0-2645f64a3aca.svg"
    >
      <div style={{ height: 500 }}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
          aliquid perferendis, adipisci dolorum officia odio natus facere cumque
          iusto libero repellendus praesentium ipsa cupiditate iure autem eos
          repudiandae delectus totam?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
          praesentium, aperiam numquam voluptatibus asperiores odio? Doloribus
          saepe, eligendi facere inventore culpa, exercitationem explicabo earum
          laborum deleniti reiciendis deserunt accusantium ullam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          voluptas numquam impedit architecto facilis aliquam at assumenda,
          nostrum explicabo accusantium ipsam error provident voluptate
          molestias magnam quisquam excepturi illum sit!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
          accusantium quo corporis fugit possimus quaerat ad consequatur veniam
          voluptatum ut cumque illo beatae. Magni assumenda eligendi itaque eum
          voluptate non!
        </p>
      </div>
    </WaterMark>
  );
};
`},40240:function(e,n){n.Z=`/** Title: \u6587\u5B57\u6C34\u5370 */
import { WaterMark } from '@ant-design/pro-components';

export default () => (
  <WaterMark content="\u8682\u8681\u96C6\u56E2">
    <div style={{ height: 500 }} />
  </WaterMark>
);
`},24759:function(e,n){n.Z=`/** Title: \u591A\u884C\u6587\u5B57\u6C34\u5370 */
import { WaterMark } from '@ant-design/pro-components';

export default () => (
  <WaterMark content={['\u8682\u8681\u96C6\u56E2', '\u591A\u884C\u6587\u5B57']}>
    <div style={{ height: 500 }} />
  </WaterMark>
);
`},41935:function(e,n){n.Z=`import { PageContainer, ProLayout } from '@ant-design/pro-components';
import complexMenu from './complexMenu';

export default () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      location={{
        pathname: '/data_hui/data_hui2',
      }}
      collapsed={false}
      collapsedButtonRender={false}
      route={{
        routes: complexMenu,
      }}
      menu={{ defaultOpenAll: true, hideMenuWhenCollapsed: true }}
    >
      <PageContainer content="\u6B22\u8FCE\u4F7F\u7528">
        <div>Hello World</div>
      </PageContainer>
    </ProLayout>
  </div>
);
`},2729:function(e,n){n.Z=`import { PageContainer, ProLayout } from '@ant-design/pro-components';

export default () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      location={{
        pathname: '/articles/new',
      }}
      iconfontUrl="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
      route={{
        routes: [
          {
            path: '/home',
            name: '\u6536\u85CF',
            icon: 'icon-shoucang1',
          },
          {
            path: '/home/overview',
            name: 'FaceBook',
            icon: 'icon-facebook',
          },
          {
            path: '/home/search',
            name: 'Twitter',
            icon: 'icon-twitter',
          },
        ],
      }}
    >
      <PageContainer content="\u6B22\u8FCE\u4F7F\u7528">
        <div>Hello World</div>
      </PageContainer>
    </ProLayout>
  </div>
);
`},15979:function(e,n){n.Z=`import { PageContainer, ProLayout } from '@ant-design/pro-components';

export default () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      location={{
        pathname: '/config/template/new',
      }}
      menu={{
        hideMenuWhenCollapsed: true,
      }}
      route={{
        routes: [
          {
            path: '/config',
            name: '\u914D\u7F6E\u4E2D\u5FC3',
            routes: [
              {
                path: 'product',
                name: '\u4EA7\u54C1\u914D\u7F6E',
                indexRoute: {
                  component: 'ConfigProduct/index',
                },
                routes: [
                  {
                    path: 'new',
                    component: 'ConfigProduct/NewConfig',
                  },
                  {
                    path: 'edit/:productKey',
                    component: 'ConfigProduct/NewConfig',
                  },
                  {
                    path: 'detail/:productKey',
                    component: 'ConfigProduct/Detail',
                  },
                ],
              },
              {
                path: 'productManage',
                name: '\u4EA7\u54C1\u7BA1\u7406',
                indexRoute: {
                  component: 'ConfigProductAll/index',
                },
                routes: [
                  {
                    path: 'detail/:productKey',
                    component: 'ConfigProductAll/Detail',
                  },
                ],
              },
              {
                path: 'template',
                name: '\u4EA7\u54C1\u6A21\u677F\u7BA1\u7406',
                indexRoute: {
                  component: 'ConfigTemplate/index',
                },
                routes: [
                  {
                    path: 'new',
                    component: 'ConfigTemplate/NewConfig',
                  },
                  {
                    path: 'edit/:templateKey',
                    component: 'ConfigTemplate/NewConfig',
                  },
                  {
                    path: 'detail/:templateKey',
                    component: 'ConfigTemplate/Detail',
                  },
                ],
              },
              {
                path: 'configItem',
                name: '\u914D\u7F6E\u9879\u6A21\u677F\u7BA1\u7406',
                indexRoute: {
                  component: 'ConfigItem/index',
                },
                routes: [
                  {
                    path: 'new',
                    component: 'ConfigItem/NewConfig',
                  },
                  {
                    path: 'edit/:productKey',
                    component: 'ConfigItem/NewConfig',
                  },
                  {
                    path: 'detail/:productKey',
                    component: 'ConfigItem/Detail',
                  },
                ],
              },
              {
                path: 'meta',
                name: '\u5143\u6570\u636E\u7BA1\u7406',
                component: 'ConfigMeta',
              },
            ],
          },
          {
            path: 'asset',
            name: '\u8D44\u4EA7',
            routes: [
              {
                path: 'query',
                name: '\u8D44\u4EA7\u67E5\u8BE2',
                component: 'Asset',
              },
              {
                path: 'collateral',
                name: '\u62B5\u62BC\u67E5\u8BE2',
                component: 'Collateral',
              },
            ],
          },
          {
            path: 'bill',
            name: '\u8D26\u5355',
            routes: [
              {
                path: 'billNo',
                name: '\u8D26\u5355\u7F16\u53F7',
                component: 'BillNo',
              },
              {
                path: 'bill',
                name: '\u8D26\u5355\u67E5\u8BE2',
                component: 'Bill',
              },
              {
                path: 'billItem',
                name: '\u8D26\u5355\u6761\u76EE',
                component: 'BillItem',
              },
            ],
          },
          {
            path: 'cif',
            name: 'CIF',
            routes: [
              {
                path: 'bankAccount',
                name: '\u7ED1\u5361\u4FE1\u606F',
                component: 'CifBankAccount',
              },
              {
                path: 'userGroup',
                name: '\u67E5\u8BE2 Group',
                component: 'CifUserGroup',
              },
              {
                path: 'userId',
                name: '\u67E5\u8BE2 ID',
                component: 'CifUserId',
              },
              {
                path: 'newInstitution',
                name: '\u65B0\u589E\u673A\u6784',
                indexRoute: {
                  component: 'CifNewInstitution/index',
                },
                routes: [
                  {
                    path: 'new',
                    component: 'CifNewInstitution/ApplyNew',
                  },
                  {
                    path: 'bind/:id',
                    component: 'CifNewInstitution/BindAccount',
                  },
                ],
              },
            ],
          },
          {
            path: 'tools',
            name: '\u5C0F\u5DE5\u5177',
            routes: [
              {
                path: 'ttsql',
                name: 'MySQL\u8F6CBlinkTT\u6D41\u8868',
                component: 'ToolTT',
              },
            ],
          },
        ],
      }}
    >
      <PageContainer content="\u6B22\u8FCE\u4F7F\u7528">
        <div>Hello World</div>
      </PageContainer>
    </ProLayout>
  </div>
);
`},32050:function(e,n){n.Z=`import { UserOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import complexMenu from './complexMenu';

export default () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      location={{
        pathname: '/home',
      }}
      fixSiderbar={false}
      collapsedButtonRender={false}
      collapsed={false}
      iconfontUrl="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
      route={{
        routes: [
          {
            path: '/home',
            name: '\u6536\u85CF',
            icon: 'icon-shoucang1',
          },
          {
            path: '/home/overview',
            name: 'FaceBook',
            icon: 'icon-facebook',
          },
          {
            path: '/home/search',
            name: 'Twitter',
            icon: 'icon-twitter',
          },
        ],
      }}
      headerRender={false}
    >
      <ProLayout
        location={{
          pathname: '/home/overview',
        }}
        fixSiderbar={false}
        route={{
          routes: complexMenu,
        }}
        style={{
          height: '400px',
        }}
        menu={{
          hideMenuWhenCollapsed: true,
        }}
        avatarProps={{
          icon: <UserOutlined />,
        }}
        menuHeaderRender={false}
      >
        <PageContainer content="\u6B22\u8FCE\u4F7F\u7528">
          <div>Hello World</div>
        </PageContainer>
      </ProLayout>
    </ProLayout>
  </div>
);
`},98594:function(e,n){n.Z=`import { HeartOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-components';
import { PageContainer, ProLayout } from '@ant-design/pro-components';

const IconMap = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
};

const defaultMenus = [
  {
    path: '/',
    name: 'welcome',
    icon: 'smile',
    routes: [
      {
        path: '/welcome',
        name: 'one',
        icon: 'smile',
        routes: [
          {
            path: '/welcome/welcome',
            name: 'two',
            icon: 'smile',
            exact: true,
          },
        ],
      },
    ],
  },
  {
    path: '/demo',
    name: 'demo',
    icon: 'heart',
  },
];

const loopMenuItem = (menus: any[]): MenuDataItem[] =>
  menus.map(({ icon, routes, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as 'smile'],
    children: routes && loopMenuItem(routes),
  }));

export default () => (
  <ProLayout
    style={{
      minHeight: 500,
    }}
    fixSiderbar
    location={{
      pathname: '/welcome/welcome',
    }}
    menu={{ request: async () => loopMenuItem(defaultMenus) }}
  >
    <PageContainer content="\u6B22\u8FCE\u4F7F\u7528">
      <div
        style={{
          height: '120vh',
          minHeight: 600,
        }}
      >
        Hello World
      </div>
    </PageContainer>
  </ProLayout>
);
`},71031:function(e,n){n.Z=`import {
  CaretDownFilled,
  DoubleRightOutlined,
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';
import { css } from '@emotion/css';
import {
  Button,
  ConfigProvider,
  Divider,
  Dropdown,
  Input,
  Popover,
  theme,
} from 'antd';
import React, { useState } from 'react';
import defaultProps from './_defaultProps';

const Item: React.FC<{ children: React.ReactNode }> = (props) => {
  const { token } = theme.useToken();
  return (
    <div
      className={css\`
        color: \${token.colorTextSecondary};
        font-size: 14px;
        cursor: pointer;
        line-height: 22px;
        margin-bottom: 8px;
        &:hover {
          color: \${token.colorPrimary};
        }
      \`}
      style={{
        width: '33.33%',
      }}
    >
      {props.children}
      <DoubleRightOutlined
        style={{
          marginInlineStart: 4,
        }}
      />
    </div>
  );
};

const List: React.FC<{ title: string; style?: React.CSSProperties }> = (
  props,
) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        width: '100%',
        ...props.style,
      }}
    >
      <div
        style={{
          fontSize: 16,
          color: token.colorTextHeading,
          lineHeight: '24px',
          fontWeight: 500,
          marginBlockEnd: 16,
        }}
      >
        {props.title}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {new Array(6).fill(1).map((_, index) => {
          return <Item key={index}>\u5177\u4F53\u7684\u89E3\u51B3\u65B9\u6848-{index}</Item>;
        })}
      </div>
    </div>
  );
};

const MenuCard = () => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Divider
        style={{
          height: '1.5em',
        }}
        type="vertical"
      />
      <Popover
        placement="bottom"
        overlayStyle={{
          width: 'calc(100vw - 24px)',
          padding: '24px',
          paddingTop: 8,
          height: '307px',
          borderRadius: '0 0 6px 6px',
        }}
        content={
          <div style={{ display: 'flex', padding: '32px 40px' }}>
            <div style={{ flex: 1 }}>
              <List title="\u91D1\u878D\u89E3\u51B3\u65B9\u6848" />
              <List
                title="\u5176\u4ED6\u89E3\u51B3\u65B9\u6848"
                style={{
                  marginBlockStart: 32,
                }}
              />
            </div>

            <div
              style={{
                width: '308px',
                borderInlineStart: '1px solid ' + token.colorBorder,
                paddingInlineStart: 16,
              }}
            >
              <div
                className={css\`
                  font-size: 14px;
                  color: \${token.colorText};
                  line-height: 22px;
                \`}
              >
                \u70ED\u95E8\u4EA7\u54C1
              </div>
              {new Array(3).fill(1).map((name, index) => {
                return (
                  <div
                    key={index}
                    className={css\`
                      border-radius: 4px;
                      padding: 16px;
                      margin-top: 4px;
                      display: flex;
                      cursor: pointer;
                      &:hover {
                        background-color: \${token.colorBgTextHover};
                      }
                    \`}
                  >
                    <img src="https://gw.alipayobjects.com/zos/antfincdn/6FTGmLLmN/bianzu%25252013.svg" />
                    <div
                      style={{
                        marginInlineStart: 14,
                      }}
                    >
                      <div
                        className={css\`
                          font-size: 14px;
                          color: \${token.colorText};
                          line-height: 22px;
                        \`}
                      >
                        Ant Design
                      </div>
                      <div
                        className={css\`
                          font-size: 12px;
                          color: \${token.colorTextSecondary};
                          line-height: 20px;
                        \`}
                      >
                        \u676D\u5DDE\u5E02\u8F83\u77E5\u540D\u7684 UI \u8BBE\u8BA1\u8BED\u8A00
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        }
      >
        <div
          style={{
            color: token.colorTextHeading,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            gap: 4,
            paddingInlineStart: 8,
            paddingInlineEnd: 12,
            alignItems: 'center',
          }}
          className={css\`
            &:hover {
              background-color: \${token.colorBgTextHover};
            }
          \`}
        >
          <span> \u4F01\u4E1A\u7EA7\u8D44\u4EA7\u4E2D\u5FC3</span>
          <CaretDownFilled />
        </div>
      </Popover>
    </div>
  );
};

const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="\u641C\u7D22\u65B9\u6848"
        variant="borderless"
      />
      <PlusCircleFilled
        style={{
          color: token.colorPrimary,
          fontSize: 24,
        }}
      />
    </div>
  );
};

export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true,
  });

  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');
  const [num, setNum] = useState(40);
  if (typeof document === 'undefined') {
    return <div />;
  }
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById('test-pro-layout') || document.body;
          }}
        >
          <ProLayout
            prefixCls="my-prefix"
            bgLayoutImgList={[
              {
                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                left: 85,
                bottom: 100,
                height: '303px',
              },
              {
                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                bottom: -68,
                right: -45,
                height: '303px',
              },
              {
                src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                bottom: 0,
                left: 0,
                width: '331px',
              },
            ]}
            {...defaultProps}
            location={{
              pathname,
            }}
            token={{
              header: {
                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
              },
            }}
            siderMenuType="group"
            menu={{
              collapsedShowGroupTitle: true,
            }}
            avatarProps={{
              src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
              size: 'small',
              title: '\u4E03\u59AE\u59AE',
              render: (props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'logout',
                          icon: <LogoutOutlined />,
                          label: '\u9000\u51FA\u767B\u5F55',
                        },
                      ],
                    }}
                  >
                    {dom}
                  </Dropdown>
                );
              },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              if (typeof window === 'undefined') return [];
              return [
                props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                  <SearchInput />
                ) : undefined,
                <InfoCircleFilled key="InfoCircleFilled" />,
                <QuestionCircleFilled key="QuestionCircleFilled" />,
                <GithubFilled key="GithubFilled" />,
              ];
            }}
            headerTitleRender={(logo, title, _) => {
              const defaultDom = (
                <a>
                  {logo}
                  {title}
                </a>
              );
              if (typeof window === 'undefined') return defaultDom;
              if (document.body.clientWidth < 1400) {
                return defaultDom;
              }
              if (_.isMobile) return defaultDom;
              return (
                <>
                  {defaultDom}
                  <MenuCard />
                </>
              );
            }}
            menuFooterRender={(props) => {
              if (props?.collapsed) return undefined;
              return (
                <div
                  style={{
                    textAlign: 'center',
                    paddingBlockStart: 12,
                  }}
                >
                  <div>\xA9 2021 Made with love</div>
                  <div>by Ant Design</div>
                </div>
              );
            }}
            onMenuHeaderClick={(e) => console.log(e)}
            menuItemRender={(item, dom) => (
              <div
                onClick={() => {
                  setPathname(item.path || '/welcome');
                }}
              >
                {dom}
              </div>
            )}
            {...settings}
          >
            <PageContainer
              token={{
                paddingInlinePageContainerContent: num,
              }}
              extra={[
                <Button key="3">\u64CD\u4F5C</Button>,
                <Button key="2">\u64CD\u4F5C</Button>,
                <Button
                  key="1"
                  type="primary"
                  onClick={() => {
                    setNum(num > 0 ? 0 : 40);
                  }}
                >
                  \u4E3B\u64CD\u4F5C
                </Button>,
              ]}
              subTitle="\u7B80\u5355\u7684\u63CF\u8FF0"
              footer={[
                <Button key="3">\u91CD\u7F6E</Button>,
                <Button key="2" type="primary">
                  \u63D0\u4EA4
                </Button>,
              ]}
            >
              <ProCard
                style={{
                  height: '200vh',
                  minHeight: 800,
                }}
              >
                <div />
              </ProCard>
            </PageContainer>

            <SettingDrawer
              pathname={pathname}
              enableDarkTheme
              getContainer={(e: any) => {
                if (typeof window === 'undefined') return e;
                return document.getElementById('test-pro-layout');
              }}
              settings={settings}
              onSettingChange={(changeSetting) => {
                setSetting(changeSetting);
              }}
              disableUrlParams={false}
            />
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};
`},42237:function(e,n){n.Z=`export default [
  {
    path: '/home',
    name: '\u9996\u9875',
    locale: 'menu.home',
    routes: [
      {
        path: '/home/overview',
        name: '\u6982\u8FF0',
        hideInMenu: true,
        locale: 'menu.home.overview',
      },
      {
        path: '/home/search',
        name: '\u641C\u7D22',
        hideInMenu: true,
        locale: 'menu.home.search',
      },
    ],
  },
  {
    path: '/data_hui',
    name: '\u6C47\u603B\u6570\u636E',
    locale: 'menu.data_hui',
    routes: [
      {
        collapsed: true,
        menuName: '\u57DF\u4E70\u5BB6\u7EF4\u5EA6\u4EA4\u6613',
        name: '\u57DF\u4E70\u5BB6\u7EF4\u5EA6\u4EA4\u6613',
        path: '/xx',
        routes: [
          {
            id: 2,
            name: '\u6708\u8868',
            path: '/data_hui2',
          },
          {
            name: '\u65E5\u8868',
            path: '/data_hui3?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
          },
        ],
      },
      {
        name: '\u7EF4\u5EA6\u4EA4\u6613',
        path: '/',
        routes: [
          {
            name: '\u6708\u8868',
            path: '/data_hui4',
          },
          {
            name: '\u65E5\u8868',
            key: 'tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
            path: '/data_hui5',
          },
        ],
      },
    ],
  },
  {
    path: '/data_ming',
    name: '\u660E\u7EC6\u6570\u636E',
    locale: 'menu.data_ming',
    routes: [
      {
        path: '/other/outLoadMenu',
        name: '\u83DC\u5355\u5BFC\u51FA',
        locale: 'menu.other.outLoadMenu',
        hideInMenu: true,
      },
      {
        path: '/other/homeEdit',
        name: '\u6982\u8FF0\u5BFC\u51FA',
        locale: 'menu.other.outHomeEdit',
      },
    ],
  },
  {
    path: '/other',
    name: '\u5176\u4ED6',
    locale: 'menu.other',
    routes: [
      {
        path: '/other/upLoad',
        name: 'odps\u540C\u6B65\u5BFC\u5165',
        locale: 'menu.other.upLoad',
      },
      {
        path: '/other/upLoadMenu',
        name: '\u83DC\u5355\u5BFC\u5165',
        locale: 'menu.other.upLoadMenu',
      },
      {
        path: '/other/homeEdit',
        name: '\u6982\u8FF0\u7F16\u8F91',
        locale: 'menu.other.homeEdit',
        hideInMenu: true,
      },
    ],
  },
];
`},7778:function(e,n){n.Z=`export default [
  {
    path: '/',
    name: '\u6B22\u8FCE',
    routes: [
      {
        path: '/welcome',
        name: 'one',
        routes: [
          {
            path: '/welcome/welcome',
            name: 'two',
            exact: true,
          },
        ],
      },
    ],
  },
  {
    path: '/demo',
    name: '\u4F8B\u5B50',
  },
];
`},84715:function(e,n){n.Z=`import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { ProLayoutProps } from '@ant-design/pro-components';
import {
  PageContainer,
  ProFormRadio,
  ProLayout,
} from '@ant-design/pro-components';
import { useState } from 'react';
import defaultProps from './_defaultProps';

export default () => {
  const [pathname, setPathname] = useState('/welcome');
  const [collapsed, setCollapsed] = useState(true);
  const [position, setPosition] = useState<'header' | 'menu'>('header');
  const children = (
    <PageContainer>
      <div
        style={{
          height: '120vh',
          minHeight: 600,
        }}
      >
        <ProFormRadio.Group
          label="\u6309\u94AE\u7684\u4F4D\u7F6E"
          options={['header', 'menu'].map((value) => ({
            label: value,
            value,
          }))}
          fieldProps={{
            value: position,
            onChange: (e) => setPosition(e.target.value),
          }}
        />
      </div>
    </PageContainer>
  );
  const props: ProLayoutProps = {
    ...defaultProps,
    location: {
      pathname,
    },
    collapsed,
    fixSiderbar: true,
    collapsedButtonRender: false,
    menuItemRender: (item, dom) => (
      <a
        onClick={() => {
          setPathname(item.path || '/welcome');
        }}
      >
        {dom}
      </a>
    ),
  };
  if (position === 'menu') {
    return (
      <ProLayout
        {...props}
        layout="mix"
        onCollapse={setCollapsed}
        postMenuData={(menuData) => {
          return [
            {
              icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
              name: ' ',
              onTitleClick: () => setCollapsed(!collapsed),
            },
            ...(menuData || []),
          ];
        }}
      >
        {children}
      </ProLayout>
    );
  }
  return (
    <ProLayout
      {...props}
      layout="mix"
      onCollapse={setCollapsed}
      headerContentRender={() => {
        return (
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        );
      }}
    >
      {children}
    </ProLayout>
  );
};
`},11642:function(e,n){n.Z=`import { PageContainer, ProLayout } from '@ant-design/pro-components';
import defaultProps from './_defaultProps';

export default () => {
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        menuItemRender={(item, dom) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            pre {dom}
          </div>
        )}
        subMenuItemRender={(_, dom) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            pre {dom}
          </div>
        )}
        title="Remax"
        logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
        menuHeaderRender={(logo, title) => (
          <div
            id="customize_menu_header"
            style={{
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
            onClick={() => {
              window.open('https://remaxjs.org/');
            }}
          >
            {logo}
            {title}
          </div>
        )}
        {...defaultProps}
        location={{
          pathname: '/welcome',
        }}
      >
        <PageContainer content="\u6B22\u8FCE\u4F7F\u7528">Hello World</PageContainer>
      </ProLayout>
    </div>
  );
};
`},84994:function(e,n){n.Z=`import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Button, Switch } from 'antd';
import { useRef, useState } from 'react';
import customMenuDate from './customMenu';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

let serviceData: any[] = customMenuDate;

export default () => {
  const actionRef = useRef<{
    reload: () => void;
  }>();
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <ProLayout
        style={{
          height: '100vh',
        }}
        actionRef={actionRef}
        suppressSiderWhenMenuEmpty={toggle}
        menu={{
          request: async () => {
            await waitTime(2000);
            return serviceData;
          },
        }}
        location={{
          pathname: '/welcome/welcome',
        }}
      >
        <PageContainer content="\u6B22\u8FCE\u4F7F\u7528">
          <div>
            \u5F53\u4ECE\u670D\u52A1\u5668\u83B7\u53D6\u7684\u83DC\u5355\u4E3A\u7A7A\u65F6\u9690\u85CFSider\uFF1A
            <Switch checked={toggle} onChange={setToggle} />
          </div>
          Hello World
          <Button
            style={{
              margin: 8,
            }}
            onClick={() => {
              serviceData = customMenuDate;
              actionRef.current?.reload();
            }}
          >
            \u5237\u65B0\u83DC\u5355
          </Button>
          <Button
            style={{
              margin: 8,
            }}
            onClick={() => {
              serviceData = [];
              actionRef.current?.reload();
            }}
          >
            \u5237\u65B0\u83DC\u5355\uFF08\u7A7A\u6570\u636E\uFF09
          </Button>
        </PageContainer>
      </ProLayout>
    </>
  );
};
`},74434:function(e,n){n.Z=`import {
  DefaultFooter,
  PageContainer,
  ProLayout,
} from '@ant-design/pro-components';
import defaultProps from './_defaultProps';

export default () => (
  <ProLayout
    {...defaultProps}
    style={{
      height: '100vh',
    }}
    breakpoint={false}
    collapsed
    location={{
      pathname: '/welcome',
    }}
    footerRender={() => (
      <DefaultFooter
        links={[
          { key: 'test', title: 'layout', href: 'www.alipay.com' },
          { key: 'test2', title: 'layout2', href: 'www.alipay.com' },
        ]}
        copyright="\u8FD9\u662F\u4E00\u6761\u6D4B\u8BD5\u6587\u6848"
      />
    )}
  >
    <PageContainer content="\u6B22\u8FCE\u4F7F\u7528">Hello World</PageContainer>
  </ProLayout>
);
`},35567:function(e,n){n.Z=`import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Descriptions } from 'antd';
import defaultProps from './_defaultProps';

const content = (
  <Descriptions size="small" column={2}>
    <Descriptions.Item label="\u521B\u5EFA\u4EBA">\u5F20\u4E09</Descriptions.Item>
    <Descriptions.Item label="\u8054\u7CFB\u65B9\u5F0F">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="\u521B\u5EFA\u65F6\u95F4">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="\u66F4\u65B0\u65F6\u95F4">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="\u5907\u6CE8">
      \u4E2D\u56FD\u6D59\u6C5F\u7701\u676D\u5DDE\u5E02\u897F\u6E56\u533A\u53E4\u7FE0\u8DEF
    </Descriptions.Item>
  </Descriptions>
);

export default () => {
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        location={{
          pathname: '/welcome',
        }}
      >
        <PageContainer fixedHeader content={content}>
          <ProCard
            direction="column"
            ghost
            gutter={[0, 16]}
            style={{
              height: '200vh',
            }}
          >
            <ProCard style={{ height: 200 }} />
            <ProCard gutter={16} ghost style={{ height: 200 }}>
              <ProCard colSpan={16} />
              <ProCard colSpan={8} />
            </ProCard>
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
`},63655:function(e,n){n.Z=`import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-components';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Input, Space } from 'antd';
import { useState } from 'react';
import complexMenu from './complexMenu';

const filterByMenuData = (
  data: MenuDataItem[],
  keyWord: string,
): MenuDataItem[] =>
  data
    .map((item) => {
      if (item.name?.includes(keyWord)) {
        return { ...item };
      }
      const children = filterByMenuData(item.children || [], keyWord);
      if (children.length > 0) {
        return { ...item, children };
      }
      return undefined;
    })
    .filter((item) => item) as MenuDataItem[];

const loopMenuItem = (menus: any[]): MenuDataItem[] =>
  menus.map(({ icon, routes, ...item }) => ({
    ...item,
    children: routes && loopMenuItem(routes),
  }));

export default () => {
  const [keyWord, setKeyWord] = useState('');
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        location={{
          pathname: '/home/overview',
        }}
        menu={{
          hideMenuWhenCollapsed: true,
        }}
        menuExtraRender={({ collapsed }) =>
          !collapsed && (
            <Space
              style={{
                marginBlockStart: 16,
              }}
              align="center"
            >
              <Input
                style={{
                  borderRadius: 4,
                  backgroundColor: 'rgba(0,0,0,0.03)',
                }}
                prefix={
                  <SearchOutlined
                    style={{
                      color: 'rgba(0, 0, 0, 0.15)',
                    }}
                  />
                }
                placeholder="\u641C\u7D22\u65B9\u6848"
                variant="borderless"
                onPressEnter={(e) => {
                  setKeyWord((e.target as HTMLInputElement).value);
                }}
              />
              <PlusCircleFilled
                style={{
                  color: 'var(--ant-primary-color)',
                  fontSize: 24,
                }}
              />
            </Space>
          )
        }
        menuDataRender={() => loopMenuItem(complexMenu)}
        postMenuData={(menus) => filterByMenuData(menus || [], keyWord)}
      >
        <PageContainer content="\u6B22\u8FCE\u4F7F\u7528">
          <div>Hello World</div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
`},95850:function(e,n){n.Z=`import {
  ProCard,
  ProForm,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';

const Demo = () => {
  return (
    <ProForm
      layout="horizontal"
      onFinish={async (values) => {
        console.log(values);
        return true;
      }}
    >
      <ProFormText
        style={{ padding: 0 }}
        width="md"
        name="name"
        label="\u89C4\u683C\u540D"
      />
      <ProFormList
        name="attributes"
        label="\u89C4\u683C"
        creatorButtonProps={{
          creatorButtonText: '\u6DFB\u52A0\u89C4\u683C\u9879',
        }}
        min={1}
        copyIconProps={false}
        itemRender={({ listDom, action }, { index }) => (
          <ProCard
            bordered
            style={{ marginBlockEnd: 8 }}
            title={\`\u89C4\u683C\${index + 1}\`}
            extra={action}
            bodyStyle={{ paddingBlockEnd: 0 }}
          >
            {listDom}
          </ProCard>
        )}
        creatorRecord={{ name: '', items: [{ name: '' }] }}
        initialValue={[
          { name: '\u989C\u8272', items: [{ name: '\u7EA2' }, { name: '\u9EC4' }] },
        ]}
      >
        <ProFormText
          style={{ padding: 0 }}
          width="md"
          name="name"
          label="\u89C4\u683C\u540D"
        />
        <ProForm.Item isListField style={{ marginBlockEnd: 0 }} label="\u89C4\u683C\u503C">
          <ProFormList
            name="items"
            creatorButtonProps={{
              creatorButtonText: '\u65B0\u5EFA',
              icon: false,
              type: 'link',
              style: { width: 'unset' },
            }}
            min={1}
            copyIconProps={false}
            deleteIconProps={{ tooltipText: '\u5220\u9664' }}
            itemRender={({ listDom, action }) => (
              <div
                style={{
                  display: 'inline-flex',
                  marginInlineEnd: 25,
                }}
              >
                {listDom}
                {action}
              </div>
            )}
          >
            <ProFormText allowClear={false} width="xs" name={['name']} />
          </ProFormList>
        </ProForm.Item>
      </ProFormList>
    </ProForm>
  );
};

export default Demo;
`},44899:function(e,n){n.Z=`import {
  ProFormRadio,
  ProFormSwitch,
  ProList,
} from '@ant-design/pro-components';
import { Progress, Tag } from 'antd';
import { useState } from 'react';

const data = [
  '\u8BED\u96C0\u7684\u5929\u7A7A',
  'Ant Design',
  '\u8682\u8681\u91D1\u670D\u4F53\u9A8C\u79D1\u6280',
  'TechUI',
  'TechUI 2.0',
  'Bigfish',
  'Umi',
  'Ant Design Pro',
].map((item) => ({
  title: item,
  subTitle: <Tag color="#5BD8A6">\u8BED\u96C0\u4E13\u680F</Tag>,
  actions: [<a key="run">\u9080\u8BF7</a>, <a key="delete">\u5220\u9664</a>],
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div
      style={{
        flex: 1,
      }}
    >
      <div
        style={{
          width: 200,
        }}
      >
        <div>\u53D1\u5E03\u4E2D</div>
        <Progress percent={80} />
      </div>
    </div>
  ),
}));

export default () => {
  const [cardActionProps, setCardActionProps] = useState<'actions' | 'extra'>(
    'extra',
  );

  const [ghost, setGhost] = useState<boolean>(false);
  return (
    <div
      style={{
        backgroundColor: '#eee',
        margin: -24,
        padding: 24,
      }}
    >
      <ProFormRadio.Group
        label="actions \u653E\u7F6E\u7684\u5730\u65B9"
        options={[
          {
            label: '\u8BBE\u7F6E\u4E3A action',
            value: 'actions',
          },
          {
            label: '\u8BBE\u7F6E\u4E3A extra',
            value: 'extra',
          },
        ]}
        fieldProps={{
          value: cardActionProps,
          onChange: (e) => setCardActionProps(e.target.value),
        }}
      />
      <ProFormSwitch
        label="\u5E7D\u7075\u6A21\u5F0F"
        fieldProps={{
          checked: ghost,
          onChange: (e) => setGhost(e),
        }}
      />
      <ProList<any>
        ghost={ghost}
        itemCardProps={{
          ghost,
        }}
        pagination={{
          defaultPageSize: 8,
          showSizeChanger: false,
        }}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 16, column: 2 }}
        onItem={(record: any) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              console.log(record);
            },
          };
        }}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},
          actions: {
            cardActionProps,
          },
        }}
        headerTitle="\u5361\u7247\u5217\u8868\u5C55\u793A"
        dataSource={data}
      />
    </div>
  );
};
`},11497:function(e,n){n.Z=`import { ProList } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import { useState } from 'react';

const defaultData = [
  {
    id: '1',
    name: '\u8BED\u96C0\u7684\u5929\u7A7A',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '\u6211\u662F\u4E00\u6761\u6D4B\u8BD5\u7684\u63CF\u8FF0',
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '\u6211\u662F\u4E00\u6761\u6D4B\u8BD5\u7684\u63CF\u8FF0',
  },
  {
    id: '3',
    name: '\u8682\u8681\u91D1\u670D\u4F53\u9A8C\u79D1\u6280',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '\u6211\u662F\u4E00\u6761\u6D4B\u8BD5\u7684\u63CF\u8FF0',
  },
  {
    id: '4',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '\u6211\u662F\u4E00\u6761\u6D4B\u8BD5\u7684\u63CF\u8FF0',
  },
];

type DataItem = (typeof defaultData)[number];

export default () => {
  const [dataSource, setDataSource] = useState<DataItem[]>(defaultData);
  return (
    <ProList<DataItem>
      rowKey="id"
      headerTitle="\u57FA\u7840\u5217\u8868"
      dataSource={dataSource}
      showActions="hover"
      editable={{
        onSave: async (key, record, originRow) => {
          console.log(key, record, originRow);
          return true;
        },
      }}
      onDataSourceChange={setDataSource}
      metas={{
        title: {
          dataIndex: 'name',
        },
        avatar: {
          dataIndex: 'image',
          editable: false,
        },
        description: {
          dataIndex: 'desc',
        },
        subTitle: {
          render: () => {
            return (
              <Space size={0}>
                <Tag color="blue">Ant Design</Tag>
                <Tag color="#5BD8A6">TechUI</Tag>
              </Space>
            );
          },
        },
        actions: {
          render: (text, row, index, action) => [
            <a
              onClick={() => {
                action?.startEditable(row.id);
              }}
              key="link"
            >
              \u7F16\u8F91
            </a>,
          ],
        },
      }}
    />
  );
};
`},58352:function(e,n){n.Z=`import { ProList } from '@ant-design/pro-components';
import { Button, Progress, Space, Tag } from 'antd';
import type { Key } from 'react';
import { useState } from 'react';

const dataSource = [
  {
    title: '\u8BED\u96C0\u7684\u5929\u7A7A',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Ant Design',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: '\u8682\u8681\u91D1\u670D\u4F53\u9A8C\u79D1\u6280',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'TechUI',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
];

export default () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);

  return (
    <ProList<{ title: string }>
      rowKey="title"
      headerTitle="\u652F\u6301\u5C55\u5F00\u7684\u5217\u8868"
      toolBarRender={() => {
        return [
          <Button key="3" type="primary">
            \u65B0\u5EFA
          </Button>,
        ];
      }}
      expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
      dataSource={dataSource}
      metas={{
        title: {},
        subTitle: {
          render: () => {
            return (
              <Space size={0}>
                <Tag color="blue">Ant Design</Tag>
                <Tag color="#5BD8A6">TechUI</Tag>
              </Space>
            );
          },
        },
        description: {
          render: () => {
            return 'Ant Design, a design language for background applications, is refined by Ant UED Team';
          },
        },
        avatar: {},
        content: {
          render: () => (
            <div
              style={{
                minWidth: 200,
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  width: '200px',
                }}
              >
                <div>\u53D1\u5E03\u4E2D</div>
                <Progress percent={80} />
              </div>
            </div>
          ),
        },
        actions: {
          render: () => {
            return <a key="invite">\u9080\u8BF7</a>;
          },
        },
      }}
    />
  );
};
`},8607:function(e,n){n.Z=`import { ProList } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import request from 'umi-request';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

export default () => (
  <ProList<GithubIssueItem>
    toolBarRender={() => {
      return [
        <Button key="3" type="primary">
          \u65B0\u5EFA
        </Button>,
      ];
    }}
    search={{
      filterType: 'light',
    }}
    rowKey="name"
    headerTitle="\u57FA\u7840\u5217\u8868"
    request={async (params = {} as Record<string, any>) =>
      request<{
        data: GithubIssueItem[];
      }>('https://proapi.azurewebsites.net/github/issues', {
        params,
      })
    }
    pagination={{
      pageSize: 5,
    }}
    showActions="hover"
    metas={{
      title: {
        dataIndex: 'user',
        title: '\u7528\u6237',
      },
      avatar: {
        dataIndex: 'avatar',
        search: false,
      },
      description: {
        dataIndex: 'title',
        search: false,
      },
      subTitle: {
        dataIndex: 'labels',
        render: (_, row) => {
          return (
            <Space size={0}>
              {row.labels?.map((label: { name: string }) => (
                <Tag color="blue" key={label.name}>
                  {label.name}
                </Tag>
              ))}
            </Space>
          );
        },
        search: false,
      },
      actions: {
        render: (text, row) => [
          <a
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
            key="link"
          >
            \u94FE\u8DEF
          </a>,
          <a
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
            key="warning"
          >
            \u62A5\u8B66
          </a>,
          <a
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
            key="view"
          >
            \u67E5\u770B
          </a>,
        ],
        search: false,
      },
      status: {
        // \u81EA\u5DF1\u6269\u5C55\u7684\u5B57\u6BB5\uFF0C\u4E3B\u8981\u7528\u4E8E\u7B5B\u9009\uFF0C\u4E0D\u5728\u5217\u8868\u4E2D\u663E\u793A
        title: '\u72B6\u6001',
        valueType: 'select',
        valueEnum: {
          all: { text: '\u5168\u90E8', status: 'Default' },
          open: {
            text: '\u672A\u89E3\u51B3',
            status: 'Error',
          },
          closed: {
            text: '\u5DF2\u89E3\u51B3',
            status: 'Success',
          },
          processing: {
            text: '\u89E3\u51B3\u4E2D',
            status: 'Processing',
          },
        },
      },
    }}
  />
);
`},38830:function(e,n){n.Z=`import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import React from 'react';

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
    {text}
  </span>
);

const dataSource = [
  {
    title: '\u8BED\u96C0\u7684\u5929\u7A7A',
  },
  {
    title: 'Ant Design',
  },
  {
    title: '\u8682\u8681\u91D1\u670D\u4F53\u9A8C\u79D1\u6280',
  },
  {
    title: 'TechUI',
  },
];

export default () => {
  return (
    <ProList<{ title: string }>
      toolBarRender={() => {
        return [
          <Button key="3" type="primary">
            \u65B0\u5EFA
          </Button>,
        ];
      }}
      itemLayout="vertical"
      rowKey="id"
      headerTitle="\u7AD6\u6392\u6837\u5F0F"
      dataSource={dataSource}
      metas={{
        title: {},
        description: {
          render: () => (
            <>
              <Tag>\u8BED\u96C0\u4E13\u680F</Tag>
              <Tag>\u8BBE\u8BA1\u8BED\u8A00</Tag>
              <Tag>\u8682\u8681\u91D1\u670D</Tag>
            </>
          ),
        },
        actions: {
          render: () => [
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,
          ],
        },
        extra: {
          render: () => (
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          ),
        },
        content: {
          render: () => {
            return (
              <div>
                \u6BB5\u843D\u793A\u610F\uFF1A\u8682\u8681\u91D1\u670D\u8BBE\u8BA1\u5E73\u53F0
                design.alipay.com\uFF0C\u7528\u6700\u5C0F\u7684\u5DE5\u4F5C\u91CF\uFF0C\u65E0\u7F1D\u63A5\u5165\u8682\u8681\u91D1\u670D\u751F\u6001\uFF0C\u63D0\u4F9B\u8DE8\u8D8A\u8BBE\u8BA1\u4E0E\u5F00\u53D1\u7684\u4F53\u9A8C\u89E3\u51B3\u65B9\u6848\u3002\u8682\u8681\u91D1\u670D\u8BBE\u8BA1\u5E73\u53F0
                design.alipay.com\uFF0C\u7528\u6700\u5C0F\u7684\u5DE5\u4F5C\u91CF\uFF0C\u65E0\u7F1D\u63A5\u5165\u8682\u8681\u91D1\u670D\u751F\u6001\u63D0\u4F9B\u8DE8\u8D8A\u8BBE\u8BA1\u4E0E\u5F00\u53D1\u7684\u4F53\u9A8C\u89E3\u51B3\u65B9\u6848\u3002
              </div>
            );
          },
        },
      }}
    />
  );
};
`},27441:function(e,n){n.Z=`import { EllipsisOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Progress, Tag } from 'antd';

const data = [
  '\u8BED\u96C0\u7684\u5929\u7A7A',
  'Ant Design',
  '\u8682\u8681\u91D1\u670D\u4F53\u9A8C\u79D1\u6280',
  'TechUI',
  'TechUI 2.0',
  'Bigfish',
  'Umi',
].map((item) => ({
  title: item,
  subTitle: <Tag color="#5BD8A6">\u8BED\u96C0\u4E13\u680F</Tag>,
  actions: [
    <a key="invite">\u9080\u8BF7</a>,
    <a key="operate">\u64CD\u4F5C</a>,
    <a key="rest">
      <EllipsisOutlined />
    </a>,
  ],
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          width: 200,
        }}
      >
        <div>\u53D1\u5E03\u4E2D</div>
        <Progress percent={80} />
      </div>
    </div>
  ),
}));

export default () => {
  return (
    <ProList<any>
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: true,
      }}
      metas={{
        title: {},
        subTitle: {},
        type: {},
        avatar: {},
        content: {},
        actions: {},
      }}
      headerTitle="\u7FFB\u9875"
      dataSource={data}
    />
  );
};
`},47848:function(e,n){n.Z=`import { ProList } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import request from 'umi-request';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

export default () => (
  <ProList<GithubIssueItem>
    toolBarRender={() => {
      return [
        <Button key="3" type="primary">
          \u65B0\u5EFA
        </Button>,
      ];
    }}
    search={{}}
    rowKey="name"
    headerTitle="\u57FA\u7840\u5217\u8868"
    request={async (params = {} as Record<string, any>) =>
      request<{
        data: GithubIssueItem[];
      }>('https://proapi.azurewebsites.net/github/issues', {
        params,
      })
    }
    pagination={{
      pageSize: 5,
    }}
    showActions="hover"
    metas={{
      title: {
        dataIndex: 'user',
        title: '\u7528\u6237',
      },
      avatar: {
        dataIndex: 'avatar',
        search: false,
      },
      description: {
        dataIndex: 'title',
        search: false,
      },
      subTitle: {
        dataIndex: 'labels',
        render: (_, row) => {
          return (
            <Space size={0}>
              {row.labels?.map((label: { name: string }) => (
                <Tag color="blue" key={label.name}>
                  {label.name}
                </Tag>
              ))}
            </Space>
          );
        },
        search: false,
      },
      actions: {
        render: (text, row) => [
          <a
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
            key="link"
          >
            \u94FE\u8DEF
          </a>,
          <a
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
            key="warning"
          >
            \u62A5\u8B66
          </a>,
          <a
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
            key="view"
          >
            \u67E5\u770B
          </a>,
        ],
        search: false,
      },
      status: {
        // \u81EA\u5DF1\u6269\u5C55\u7684\u5B57\u6BB5\uFF0C\u4E3B\u8981\u7528\u4E8E\u7B5B\u9009\uFF0C\u4E0D\u5728\u5217\u8868\u4E2D\u663E\u793A
        title: '\u72B6\u6001',
        valueType: 'select',
        valueEnum: {
          all: { text: '\u5168\u90E8', status: 'Default' },
          open: {
            text: '\u672A\u89E3\u51B3',
            status: 'Error',
          },
          closed: {
            text: '\u5DF2\u89E3\u51B3',
            status: 'Success',
          },
          processing: {
            text: '\u89E3\u51B3\u4E2D',
            status: 'Processing',
          },
        },
      },
    }}
  />
);
`},61190:function(e,n){n.Z=`import { ProList } from '@ant-design/pro-components';
import { Button, Progress } from 'antd';
import type { Key } from 'react';
import { useState } from 'react';

const dataSource = [
  {
    title: '\u8BED\u96C0\u7684\u5929\u7A7A',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Ant Design',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: '\u8682\u8681\u91D1\u670D\u4F53\u9A8C\u79D1\u6280',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'TechUI',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
];

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };

  return (
    <ProList<{ title: string }>
      toolBarRender={() => {
        return [
          <Button key="3" type="primary">
            \u65B0\u5EFA
          </Button>,
        ];
      }}
      metas={{
        title: {},
        description: {
          render: () => {
            return 'Ant Design, a design language for background applications, is refined by Ant UED Team';
          },
        },
        avatar: {},
        extra: {
          render: () => (
            <div
              style={{
                minWidth: 200,
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  width: '200px',
                }}
              >
                <div>\u53D1\u5E03\u4E2D</div>
                <Progress percent={80} />
              </div>
            </div>
          ),
        },
        actions: {
          render: () => {
            return [<a key="init">\u9080\u8BF7</a>, '\u53D1\u5E03'];
          },
        },
      }}
      rowKey="title"
      headerTitle="\u652F\u6301\u9009\u4E2D\u7684\u5217\u8868"
      rowSelection={rowSelection}
      dataSource={dataSource}
    />
  );
};
`},47073:function(e,n){n.Z=`import { ProList } from '@ant-design/pro-components';
import { Button, Progress, Select } from 'antd';
import type { Key } from 'react';
import { useState } from 'react';

const dataSource = [
  {
    title: '\u8BED\u96C0\u7684\u5929\u7A7A',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Ant Design',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: '\u8682\u8681\u91D1\u670D\u4F53\u9A8C\u79D1\u6280',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'TechUI',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
];

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);
  const [size, setSize] = useState<'small' | 'default' | 'large' | undefined>(
    'default',
  );
  const [split, setSplit] = useState<0 | 1>(1);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };

  return (
    <>
      \u5927\u5C0F\uFF1A
      <Select<string>
        value={size}
        onChange={(value) => setSize(value as any)}
        options={['small', 'default', 'large'].map((selectSize) => ({
          value: selectSize,
          label: selectSize,
        }))}
      />{' '}
      \u5206\u5272\u7EBF\uFF1A
      <Select<0 | 1>
        value={split}
        onChange={(value) => setSplit(value)}
        options={[
          {
            value: 1,
            label: '\u6709',
          },
          {
            value: 0,
            label: '\u65E0',
          },
        ]}
      />{' '}
      <br />
      <br />
      <ProList<{ title: string }>
        size={size}
        split={split === 1}
        toolBarRender={() => {
          return [
            <Button key="3" type="primary">
              \u65B0\u5EFA
            </Button>,
          ];
        }}
        metas={{
          title: {},
          description: {
            render: () => {
              return 'Ant Design, a design language for background applications, is refined by Ant UED Team';
            },
          },
          avatar: {},
          content: {
            render: () => (
              <div
                style={{
                  minWidth: 200,
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  style={{
                    width: '200px',
                  }}
                >
                  <div>\u53D1\u5E03\u4E2D</div>
                  <Progress percent={80} />
                </div>
              </div>
            ),
          },
          actions: {
            render: () => {
              return [<a key="init">\u9080\u8BF7</a>];
            },
          },
        }}
        expandable={{
          expandedRowKeys,
          defaultExpandAllRows: false,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
        rowKey="title"
        headerTitle="\u5927\u5C0F\u548C\u5206\u5272\u7EBF"
        rowSelection={rowSelection}
        dataSource={dataSource}
      />
    </>
  );
};
`},91109:function(e,n){n.Z=`import { EllipsisOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Button, Progress, Tag } from 'antd';
import type { Key } from 'react';
import { useState } from 'react';

const types = ['top', 'inline', 'new'];
const data = [
  '\u8BED\u96C0\u7684\u5929\u7A7A\uFF08top\uFF09',
  'Ant Design\uFF08inline\uFF09',
  '\u8682\u8681\u91D1\u670D\u4F53\u9A8C\u79D1\u6280\uFF08new\uFF09',
  'TechUI',
].map((item, index) => ({
  title: item,
  subTitle: <Tag color="#5BD8A6">\u8BED\u96C0\u4E13\u680F</Tag>,
  actions: [
    <a key="invite">\u9080\u8BF7</a>,
    <a key="operate">\u64CD\u4F5C</a>,
    <a key="rest">
      <EllipsisOutlined />
    </a>,
  ],
  description: (
    <div>
      <div>top \u4F1A\u6709\u5C0F\u89D2\u6807</div>
      <div>inline \u6807\u9898\u5B57\u4F53\u662F normal</div>
      <div>new \u4F1A\u6709\u4E00\u4E2A\u5165\u573A\u52A8\u753B</div>
    </div>
  ),
  type: types[index],
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          width: 200,
        }}
      >
        <div>\u53D1\u5E03\u4E2D</div>
        <Progress percent={80} />
      </div>
    </div>
  ),
}));

export default () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };
  const [dataSource, setDataSource] = useState<any[]>([...data] as any[]);

  return (
    <>
      <ProList<{
        title: string;
        subTitle: JSX.Element;
        actions: JSX.Element[];
        description: JSX.Element;
        type?: 'top' | 'inline' | 'new';
        avatar: string;
        children: JSX.Element;
      }>
        metas={{
          title: {},
          subTitle: {},
          type: {},
          description: {},
          avatar: {},
          content: {},
          actions: {},
        }}
        toolBarRender={() => [
          <Button
            key="3"
            type="primary"
            onClick={() => {
              setDataSource([...data.map((item) => ({ ...item }))]);
              setTimeout(() => {
                const list = [...data.map((item) => ({ ...item }))];
                list[1].type = 'new';
                setDataSource(list);
              }, 0);
            }}
          >
            \u5237\u65B0
          </Button>,
        ]}
        rowKey="id"
        headerTitle="\u9884\u8BBE\u7684\u5217\u72B6\u6001"
        rowSelection={rowSelection}
        dataSource={dataSource}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
      />
    </>
  );
};
`},19926:function(e,n){n.Z=`import ProSkeleton from '@ant-design/pro-skeleton';

export default () => {
  return (
    <div
      style={{
        background: '#fafafa',
        padding: 24,
      }}
    >
      <ProSkeleton type="descriptions" />
    </div>
  );
};
`},4072:function(e,n){n.Z=`import ProSkeleton from '@ant-design/pro-skeleton';

export default () => (
  <div
    style={{
      background: '#fafafa',
      padding: 24,
    }}
  >
    <ProSkeleton statistic={2} type="list" />
  </div>
);
`},1078:function(e,n){n.Z=`import ProSkeleton from '@ant-design/pro-skeleton';

export default () => (
  <div
    style={{
      background: '#fafafa',
      padding: 24,
    }}
  >
    <ProSkeleton type="list" />
  </div>
);
`},16922:function(e,n){n.Z=`import ProSkeleton from '@ant-design/pro-skeleton';

export default () => (
  <div
    style={{
      background: '#fafafa',
      padding: 24,
    }}
  >
    <ProSkeleton type="result" />
  </div>
);
`},9831:function(e,n){n.Z=`import { MenuOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';

const data = [
  {
    key: 'key1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: 'key2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: 'key3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
const wait = async (delay = 1000) =>
  new Promise((resolve) => setTimeout(() => resolve(void 0), delay));

let remoteData = data.map((item) => ({
  ...item,
  name: \`[remote data] \${item.name}\`,
}));
const request = async () => {
  await wait(3000);
  return {
    data: remoteData,
    total: remoteData.length,
    success: true,
  };
};

export default () => {
  const columns: ProColumns[] = [
    {
      title: '\u6392\u5E8F',
      dataIndex: 'sort',
      render: (dom, rowData, index) => {
        return (
          <span className="customRender">{\`\u81EA\u5B9A\u4E49Render[\${rowData.name}-\${index}]\`}</span>
        );
      },
    },
    {
      title: '\u59D3\u540D',
      dataIndex: 'name',
      className: 'drag-visible',
    },
    {
      title: '\u5E74\u9F84',
      dataIndex: 'age',
    },
    {
      title: '\u5730\u5740',
      dataIndex: 'address',
    },
  ];
  const columns2: ProColumns[] = [
    {
      title: '\u6392\u5E8F',
      dataIndex: 'sort',
    },
    {
      title: '\u59D3\u540D',
      dataIndex: 'name',
      className: 'drag-visible',
    },
    {
      title: '\u5E74\u9F84',
      dataIndex: 'age',
    },
    {
      title: '\u5730\u5740',
      dataIndex: 'address',
    },
  ];
  const actionRef = useRef<ActionType>();
  const [dataSource1, setDatasource1] = useState(data);
  const [dataSource2, setDatasource2] = useState(data);
  const handleDragSortEnd1 = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    console.log('\u6392\u5E8F\u540E\u7684\u6570\u636E', newDataSource);
    setDatasource1(newDataSource);
    message.success('\u4FEE\u6539\u5217\u8868\u6392\u5E8F\u6210\u529F');
  };
  const handleDragSortEnd2 = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    console.log('\u6392\u5E8F\u540E\u7684\u6570\u636E', newDataSource);
    setDatasource2(newDataSource);
    message.success('\u4FEE\u6539\u5217\u8868\u6392\u5E8F\u6210\u529F');
  };
  const handleDragSortEnd3 = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    console.log('\u6392\u5E8F\u540E\u7684\u6570\u636E', newDataSource);
    // \u6A21\u62DF\u5C06\u6392\u5E8F\u540E\u6570\u636E\u53D1\u9001\u5230\u670D\u52A1\u5668\u7684\u573A\u666F
    remoteData = newDataSource;
    // \u8BF7\u6C42\u6210\u529F\u4E4B\u540E\u5237\u65B0\u5217\u8868
    actionRef.current?.reload();
    message.success('\u4FEE\u6539\u5217\u8868\u6392\u5E8F\u6210\u529F');
  };

  const dragHandleRender = (rowData: any, idx: any) => (
    <>
      <MenuOutlined style={{ cursor: 'grab', color: 'gold' }} />
      &nbsp;{idx + 1} - {rowData.name}
    </>
  );

  return (
    <>
      <DragSortTable
        headerTitle="\u62D6\u62FD\u6392\u5E8F(\u9ED8\u8BA4\u628A\u624B)"
        columns={columns}
        rowKey="key"
        search={false}
        pagination={false}
        dataSource={dataSource1}
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd1}
      />
      <DragSortTable
        headerTitle="\u62D6\u62FD\u6392\u5E8F(\u81EA\u5B9A\u4E49\u628A\u624B)"
        columns={columns2}
        rowKey="key"
        search={false}
        pagination={false}
        dataSource={dataSource2}
        dragSortKey="sort"
        dragSortHandlerRender={dragHandleRender}
        onDragSortEnd={handleDragSortEnd2}
      />
      <DragSortTable
        actionRef={actionRef}
        headerTitle="\u4F7F\u7528 request \u83B7\u53D6\u6570\u636E\u6E90"
        columns={columns2}
        rowKey="key"
        search={false}
        pagination={false}
        request={request}
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd3}
      />
    </>
  );
};
`},37718:function(e,n){n.Z=`import type { ProColumns } from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useState } from 'react';

const columns: ProColumns[] = [
  {
    title: '\u6392\u5E8F',
    dataIndex: 'sort',
    width: 60,
    className: 'drag-visible',
  },
  {
    title: '\u59D3\u540D',
    dataIndex: 'name',
    className: 'drag-visible',
  },
  {
    title: '\u5E74\u9F84',
    dataIndex: 'age',
  },
  {
    title: '\u5730\u5740',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

export default () => {
  const [dataSource, setDataSource] = useState(data);

  const handleDragSortEnd = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    console.log('\u6392\u5E8F\u540E\u7684\u6570\u636E', newDataSource);
    setDataSource(newDataSource);
    message.success('\u4FEE\u6539\u5217\u8868\u6392\u5E8F\u6210\u529F');
  };

  return (
    <DragSortTable
      headerTitle="\u62D6\u62FD\u6392\u5E8F(\u9ED8\u8BA4\u628A\u624B)"
      columns={columns}
      rowKey="key"
      search={false}
      pagination={false}
      dataSource={dataSource}
      dragSortKey="sort"
      onDragSortEnd={handleDragSortEnd}
    />
  );
};
`},12861:function(e,n){n.Z=`import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from '@ant-design/pro-components';
import React, { useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  update_at?: number;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '\u6D3B\u52A8\u540D\u79F0\u4E00',
    readonly: '\u6D3B\u52A8\u540D\u79F0\u4E00',
    decs: '\u8FD9\u4E2A\u6D3B\u52A8\u771F\u597D\u73A9',
    state: 'open',
    created_at: 1590486176000,
    update_at: 1590486176000,
  },
  {
    id: 624691229,
    title: '\u6D3B\u52A8\u540D\u79F0\u4E8C',
    readonly: '\u6D3B\u52A8\u540D\u79F0\u4E8C',
    decs: '\u8FD9\u4E2A\u6D3B\u52A8\u771F\u597D\u73A9',
    state: 'closed',
    created_at: 1590481162000,
    update_at: 1590481162000,
  },
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>(
    'bottom',
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '\u6D3B\u52A8\u540D\u79F0',
      dataIndex: 'title',
      tooltip: '\u53EA\u8BFB\uFF0C\u4F7F\u7528form.getFieldValue\u83B7\u53D6\u4E0D\u5230\u503C',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879' }] : [],
        };
      },
      // \u7B2C\u4E00\u884C\u4E0D\u5141\u8BB8\u7F16\u8F91
      editable: (text, record, index) => {
        return index !== 0;
      },
      width: '15%',
    },
    {
      title: '\u6D3B\u52A8\u540D\u79F0\u4E8C',
      dataIndex: 'readonly',
      tooltip: '\u53EA\u8BFB\uFF0C\u4F7F\u7528form.getFieldValue\u53EF\u4EE5\u83B7\u53D6\u5230\u503C',
      readonly: true,
      width: '15%',
    },
    {
      title: '\u72B6\u6001',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '\u5168\u90E8', status: 'Default' },
        open: {
          text: '\u672A\u89E3\u51B3',
          status: 'Error',
        },
        closed: {
          text: '\u5DF2\u89E3\u51B3',
          status: 'Success',
        },
      },
    },
    {
      title: '\u63CF\u8FF0',
      dataIndex: 'decs',
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || '', 'title']) === '\u4E0D\u597D\u73A9') {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: '\u6D3B\u52A8\u65F6\u95F4',
      dataIndex: 'created_at',
      valueType: 'date',
    },
    {
      title: '\u64CD\u4F5C',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          \u7F16\u8F91
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          \u5220\u9664
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="\u53EF\u7F16\u8F91\u8868\u683C"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position as 'top',
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: '\u6DFB\u52A0\u5230\u9876\u90E8',
                value: 'top',
              },
              {
                label: '\u6DFB\u52A0\u5230\u5E95\u90E8',
                value: 'bottom',
              },
              {
                label: '\u9690\u85CF',
                value: 'hidden',
              },
            ]}
          />,
        ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="\u8868\u683C\u6570\u636E" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};
`},46197:function(e,n){n.Z=`import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
} from '@ant-design/pro-components';
import type { InputRef } from 'antd';
import { Button, Form, Input, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const TagList: React.FC<{
  value?: {
    key: string;
    label: string;
  }[];
  onChange?: (
    value: {
      key: string;
      label: string;
    }[],
  ) => void;
}> = ({ value, onChange }) => {
  const ref = useRef<InputRef | null>(null);
  const [newTags, setNewTags] = useState<
    {
      key: string;
      label: string;
    }[]
  >([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...(value || [])];
    if (
      inputValue &&
      tempsTags.filter((tag) => tag.label === inputValue).length === 0
    ) {
      tempsTags = [
        ...tempsTags,
        { key: \`new-\${tempsTags.length}\`, label: inputValue },
      ];
    }
    onChange?.(tempsTags);
    setNewTags([]);
    setInputValue('');
  };

  return (
    <Space>
      {(value || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      <Input
        ref={ref}
        type="text"
        size="small"
        style={{ width: 78 }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    </Space>
  );
};

type DataSourceType = {
  id: React.Key;
  title?: string;
  labels?: {
    key: string;
    label: string;
  }[];
  state?: string;
  created_at?: number;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '\u6D3B\u52A8\u540D\u79F0\u4E00',
    labels: [{ key: 'woman', label: '\u5DDD\u59B9\u5B50' }],
    state: 'open',
    created_at: 1590486176000,
  },
  {
    id: 624691229,
    title: '\u6D3B\u52A8\u540D\u79F0\u4E8C',
    labels: [{ key: 'man', label: '\u897F\u5317\u6C49\u5B50' }],
    state: 'closed',
    created_at: 1590481162000,
  },
];

const columns: ProColumns<DataSourceType>[] = [
  {
    title: '\u6D3B\u52A8\u540D\u79F0',
    dataIndex: 'title',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
        },
      ],
    },
    width: '30%',
  },
  {
    title: '\u72B6\u6001',
    key: 'state',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum: {
      all: { text: '\u5168\u90E8', status: 'Default' },
      open: {
        text: '\u672A\u89E3\u51B3',
        status: 'Error',
      },
      closed: {
        text: '\u5DF2\u89E3\u51B3',
        status: 'Success',
      },
    },
  },
  {
    title: '\u6807\u7B7E',
    dataIndex: 'labels',
    width: '20%',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
        },
      ],
    },
    renderFormItem: (_, { isEditable }) => {
      return isEditable ? <TagList /> : <Input />;
    },
    render: (_, row) =>
      row?.labels?.map((item) => <Tag key={item.key}>{item.label}</Tag>),
  },
  {
    title: '\u64CD\u4F5C',
    valueType: 'option',
    width: 250,
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        \u7F16\u8F91
      </a>,
      <EditableProTable.RecordCreator
        key="copy"
        record={{
          ...record,
          id: (Math.random() * 1000000).toFixed(0),
        }}
      >
        <a>\u590D\u5236\u6B64\u9879\u5230\u672B\u5C3E</a>
      </EditableProTable.RecordCreator>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [form] = Form.useForm();
  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            actionRef.current?.addEditRecord?.({
              id: (Math.random() * 1000000).toFixed(0),
              title: '\u65B0\u7684\u4E00\u884C',
            });
          }}
          icon={<PlusOutlined />}
        >
          \u65B0\u5EFA\u4E00\u884C
        </Button>
        <Button
          key="rest"
          onClick={() => {
            form.resetFields();
          }}
        >
          \u91CD\u7F6E\u8868\u5355
        </Button>
      </Space>

      <EditableProTable<DataSourceType>
        rowKey="id"
        scroll={{
          x: 960,
        }}
        actionRef={actionRef}
        headerTitle="\u53EF\u7F16\u8F91\u8868\u683C"
        maxLength={5}
        // \u5173\u95ED\u9ED8\u8BA4\u7684\u65B0\u5EFA\u6309\u94AE
        recordCreatorProps={false}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          form,
          editableKeys,
          onSave: async () => {
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
      />
      <ProCard title="\u8868\u683C\u6570\u636E" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};
`},52453:function(e,n){n.Z=`import type {
  ActionType,
  EditableFormInstance,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormDigit,
} from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';

type DataSourceType = {
  id: React.Key;
  associate?: string;
  questionsNum?: number;
  type?: string;
  fraction?: number;
  scoringMethod?: string;
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    associate: '\u9898\u5E93\u540D\u79F0\u4E00',
    questionsNum: 10,
    type: 'multiple',
    scoringMethod: 'continuous',
    fraction: 20,
  },
  {
    id: 624691229,
    associate: '\u9898\u5E93\u540D\u79F0\u4E8C',
    questionsNum: 10,
    scoringMethod: 'continuous',
    type: 'radio',
    fraction: 20,
  },
  {
    id: 624748503,
    associate: '\u9898\u5E93\u540D\u79F0\u4E09',
    questionsNum: 10,
    type: 'judge',
    scoringMethod: 'continuous',
    fraction: 20,
  },
  {
    id: 624691220,
    associate: '\u9898\u5E93\u540D\u79F0\u56DB',
    questionsNum: 10,
    scoringMethod: 'continuous',
    type: 'vacant',
    fraction: 20,
  },
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const formRef = useRef<ProFormInstance<any>>();
  const actionRef = useRef<ActionType>();
  const editableFormRef = useRef<EditableFormInstance>();
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '\u5173\u8054\u9898\u5E93',
      dataIndex: 'associate',
      valueType: 'text',
      ellipsis: true,
    },
    {
      title: '\u9898\u578B',
      key: 'type',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        multiple: { text: '\u591A\u9009\u9898', status: 'Default' },
        radio: { text: '\u5355\u9009\u9898', status: 'Warning' },
        vacant: {
          text: '\u586B\u7A7A\u9898',
          status: 'Error',
        },
        judge: {
          text: '\u5224\u65AD\u9898',
          status: 'Success',
        },
      },
    },
    {
      title: '\u9898\u6570',
      dataIndex: 'questionsNum',
      valueType: 'digit',
    },
    {
      title: '\u8BA1\u5206\u65B9\u5F0F',
      dataIndex: 'scoringMethod',
      valueType: 'select',
      request: async () => [
        {
          value: 'discrete',
          label: '\u79BB\u6563\u578B',
        },
        {
          value: 'continuous',
          label: '\u8FDE\u7EED\u578B',
        },
      ],
      fieldProps: (_, { rowIndex }) => {
        return {
          onSelect: () => {
            // \u6BCF\u6B21\u9009\u4E2D\u91CD\u7F6E\u53C2\u6570
            editableFormRef.current?.setRowData?.(rowIndex, { fraction: [] });
          },
        };
      },
    },
    {
      title: '\u5206\u503C',
      width: 150,
      dataIndex: 'fraction',
      valueType: (record) => {
        const scoringMethod = record?.scoringMethod;
        if (scoringMethod === 'discrete') return 'select';
        return 'digit';
      },
      fieldProps: {
        mode: 'multiple',
      },
      request: async () =>
        ['A', 'B', 'D', 'E', 'F'].map((item, index) => ({
          label: item,
          value: index,
        })),
    },
    {
      title: '\u64CD\u4F5C',
      valueType: 'option',
      render: (_, row) => [
        <a
          key="delete"
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue(
              'table',
            ) as DataSourceType[];
            formRef.current?.setFieldsValue({
              table: tableDataSource.filter((item) => item.id !== row?.id),
            });
          }}
        >
          \u79FB\u9664
        </a>,
        <a
          key="edit"
          onClick={() => {
            actionRef.current?.startEditable(row.id);
          }}
        >
          \u7F16\u8F91
        </a>,
      ],
    },
  ];

  return (
    <ProCard>
      <div
        style={{
          maxWidth: 800,
          margin: 'auto',
        }}
      >
        <ProForm<{
          table: DataSourceType[];
        }>
          formRef={formRef}
          initialValues={{
            table: defaultData,
          }}
        >
          <ProFormDependency name={['table']}>
            {({ table }) => {
              const info = (table as DataSourceType[]).reduce(
                (pre, item) => {
                  return {
                    totalScore:
                      pre.totalScore +
                      parseInt((item?.fraction || 0).toString(), 10),
                    questions:
                      pre.questions +
                      parseInt((item?.questionsNum || 0).toString(), 10),
                  };
                },
                { totalScore: 0, questions: 0 },
              );
              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    paddingBlockEnd: 16,
                  }}
                >
                  <div style={{ flex: 1 }}>\u603B\u5206\uFF1A{info.totalScore}</div>
                  <div style={{ flex: 1 }}>\u9898\u6570\uFF1A{info.questions}</div>
                  <div style={{ flex: 2 }}>
                    <ProFormDigit label="\u53CA\u683C\u5206" />
                  </div>
                  <div style={{ flex: 2 }}>
                    <ProFormDigit label="\u8003\u8BD5\u65F6\u95F4(\u5206\u949F)" />
                  </div>
                </div>
              );
            }}
          </ProFormDependency>
          <EditableProTable<DataSourceType>
            rowKey="id"
            scroll={{
              x: true,
            }}
            editableFormRef={editableFormRef}
            controlled
            actionRef={actionRef}
            formItemProps={{
              label: '\u9898\u5E93\u7F16\u8F91',
              rules: [
                {
                  validator: async (_, value) => {
                    if (value.length < 1) {
                      throw new Error('\u8BF7\u81F3\u5C11\u6DFB\u52A0\u4E00\u4E2A\u9898\u5E93');
                    }

                    if (value.length > 5) {
                      throw new Error('\u6700\u591A\u53EF\u4EE5\u8BBE\u7F6E\u4E94\u4E2A\u9898\u5E93');
                    }
                  },
                },
              ],
            }}
            maxLength={10}
            name="table"
            columns={columns}
            recordCreatorProps={{
              record: (index) => {
                return { id: index + 1 };
              },
            }}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
            }}
          />
        </ProForm>
      </div>
    </ProCard>
  );
};
`},56380:function(e,n){n.Z=`import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useState } from 'react';

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = new Array(20).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: \`\u6D3B\u52A8\u540D\u79F0\${index}\`,
    decs: '\u8FD9\u4E2A\u6D3B\u52A8\u771F\u597D\u73A9',
    state: 'open',
    created_at: 1590486176000,
  };
});

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(
    () => defaultData,
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '\u6D3B\u52A8\u540D\u79F0',
      dataIndex: 'title',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '\u6B64\u9879\u662F\u5FC5\u586B\u9879',
          },
          {
            message: '\u5FC5\u987B\u5305\u542B\u6570\u5B57',
            pattern: /[0-9]/,
          },
          {
            max: 16,
            whitespace: true,
            message: '\u6700\u957F\u4E3A 16 \u4F4D',
          },
          {
            min: 6,
            whitespace: true,
            message: '\u6700\u5C0F\u4E3A 6 \u4F4D',
          },
        ],
      },
    },
    {
      title: '\u72B6\u6001',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '\u5168\u90E8', status: 'Default' },
        open: {
          text: '\u672A\u89E3\u51B3',
          status: 'Error',
        },
        closed: {
          text: '\u5DF2\u89E3\u51B3',
          status: 'Success',
        },
      },
    },
    {
      title: '\u63CF\u8FF0',
      dataIndex: 'decs',
    },
    {
      title: '\u64CD\u4F5C',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        headerTitle="\u53EF\u7F16\u8F91\u8868\u683C"
        columns={columns}
        rowKey="id"
        scroll={{
          x: 960,
        }}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="save"
              onClick={() => {
                // dataSource \u5C31\u662F\u5F53\u524D\u6570\u636E\uFF0C\u53EF\u4EE5\u8C03\u7528 api \u5C06\u5176\u4FDD\u5B58
                console.log(dataSource);
              }}
            >
              \u4FDD\u5B58\u6570\u636E
            </Button>,
          ];
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="\u8868\u683C\u6570\u636E" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};
`},28242:function(e,n){n.Z=`import {
  EllipsisOutlined,
  FullscreenOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['\u4ED8\u5C0F\u5C0F', '\u66F2\u4E3D\u4E3D', '\u6797\u4E1C\u4E1C', '\u9648\u5E05\u5E05', '\u517C\u67D0\u67D0'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u5E94\u7528\u540D\u79F0',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '\u5BB9\u5668\u6570\u91CF',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '\u521B\u5EFA\u8005',
    dataIndex: 'creator',
    valueEnum: {
      all: { text: '\u5168\u90E8' },
      \u4ED8\u5C0F\u5C0F: { text: '\u4ED8\u5C0F\u5C0F' },
      \u66F2\u4E3D\u4E3D: { text: '\u66F2\u4E3D\u4E3D' },
      \u6797\u4E1C\u4E1C: { text: '\u6797\u4E1C\u4E1C' },
      \u9648\u5E05\u5E05: { text: '\u9648\u5E05\u5E05' },
      \u517C\u67D0\u67D0: { text: '\u517C\u67D0\u67D0' },
    },
  },
  {
    title: '\u64CD\u4F5C',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: () => [
      <a key="link">\u94FE\u8DEF</a>,
      <a key="warn">\u62A5\u8B66</a>,
      <a key="more">
        <EllipsisOutlined />
      </a>,
    ],
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // \u8868\u5355\u641C\u7D22\u9879\u4F1A\u4ECE params \u4F20\u5165\uFF0C\u4F20\u9012\u7ED9\u540E\u7AEF\u63A5\u53E3\u3002
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      toolbar={{
        title: '\u8FD9\u91CC\u662F\u6807\u9898',
        subTitle: '\u8FD9\u91CC\u662F\u5B50\u6807\u9898',
        tooltip: '\u8FD9\u662F\u4E00\u4E2A\u6BB5\u63CF\u8FF0',
        search: {
          onSearch: (value: string) => {
            alert(value);
          },
        },
        filter: (
          <LightFilter>
            <ProFormDatePicker name="startdate" label="\u54CD\u5E94\u65E5\u671F" />
          </LightFilter>
        ),
        actions: [
          <Button
            key="key"
            type="primary"
            onClick={() => {
              alert('add');
            }}
          >
            \u6DFB\u52A0
          </Button>,
        ],
        settings: [
          {
            icon: <SettingOutlined />,
            tooltip: '\u8BBE\u7F6E',
          },
          {
            icon: <FullscreenOutlined />,
            tooltip: '\u5168\u5C4F',
          },
        ],
      }}
      rowKey="key"
      search={false}
    />
  );
};
`},75193:function(e,n){n.Z=`import { EllipsisOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['\u4ED8\u5C0F\u5C0F', '\u66F2\u4E3D\u4E3D', '\u6797\u4E1C\u4E1C', '\u9648\u5E05\u5E05', '\u517C\u67D0\u67D0'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u5E94\u7528\u540D\u79F0',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '\u5BB9\u5668\u6570\u91CF',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '\u521B\u5EFA\u8005',
    dataIndex: 'creator',
    valueType: 'select',
    valueEnum: {
      all: { text: '\u5168\u90E8' },
      \u4ED8\u5C0F\u5C0F: { text: '\u4ED8\u5C0F\u5C0F' },
      \u66F2\u4E3D\u4E3D: { text: '\u66F2\u4E3D\u4E3D' },
      \u6797\u4E1C\u4E1C: { text: '\u6797\u4E1C\u4E1C' },
      \u9648\u5E05\u5E05: { text: '\u9648\u5E05\u5E05' },
      \u517C\u67D0\u67D0: { text: '\u517C\u67D0\u67D0' },
    },
  },
  {
    title: '\u64CD\u4F5C',
    key: 'option',
    valueType: 'option',
    width: 120,
    render: () => [
      <a key="link">\u94FE\u8DEF</a>,
      <a key="warn">\u62A5\u8B66</a>,
      <a key="more">
        <EllipsisOutlined />
      </a>,
    ],
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // \u8868\u5355\u641C\u7D22\u9879\u4F1A\u4ECE params \u4F20\u5165\uFF0C\u4F20\u9012\u7ED9\u540E\u7AEF\u63A5\u53E3\u3002
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      toolbar={{
        search: {
          onSearch: (value) => {
            alert(value);
          },
        },
        filter: (
          <LightFilter>
            <ProFormDatePicker name="startdate" label="\u54CD\u5E94\u65E5\u671F" />
          </LightFilter>
        ),
        actions: [
          <Button
            key="primary"
            type="primary"
            onClick={() => {
              alert('add');
            }}
          >
            \u6DFB\u52A0
          </Button>,
        ],
        menu: {
          type: 'tab',
          items: [
            {
              label: '\u5168\u90E8\u4E8B\u9879',
              key: 'all',
            },
            {
              label: '\u5DF2\u529E\u4E8B\u9879',
              key: 'done',
            },
            {
              key: 'tab1',
              label: <span>\u5E94\u7528</span>,
            },
            {
              key: 'tab2',
              label: <span>\u9879\u76EE</span>,
            },
            {
              key: 'tab3',
              label: <span>\u6587\u7AE0</span>,
            },
            {
              key: 'tab4',
              label: <span>\u6587\u7AE01</span>,
            },
            {
              key: 'tab5',
              label: <span>\u6587\u7AE02</span>,
            },
            {
              key: 'tab6',
              label: <span>\u6587\u7AE03</span>,
            },
          ],
          onChange: (activeKey) => {
            console.log('activeKey', activeKey);
          },
        },
      }}
      rowKey="key"
      search={false}
    />
  );
};
`},20466:function(e,n){n.Z=`import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Dropdown } from 'antd';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['\u4ED8\u5C0F\u5C0F', '\u66F2\u4E3D\u4E3D', '\u6797\u4E1C\u4E1C', '\u9648\u5E05\u5E05', '\u517C\u67D0\u67D0'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u5E94\u7528\u540D\u79F0',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '\u5BB9\u5668\u6570\u91CF',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '\u521B\u5EFA\u8005',
    dataIndex: 'creator',
    valueType: 'select',
    valueEnum: {
      all: { text: '\u5168\u90E8' },
      \u4ED8\u5C0F\u5C0F: { text: '\u4ED8\u5C0F\u5C0F' },
      \u66F2\u4E3D\u4E3D: { text: '\u66F2\u4E3D\u4E3D' },
      \u6797\u4E1C\u4E1C: { text: '\u6797\u4E1C\u4E1C' },
      \u9648\u5E05\u5E05: { text: '\u9648\u5E05\u5E05' },
      \u517C\u67D0\u67D0: { text: '\u517C\u67D0\u67D0' },
    },
  },
  {
    title: '\u64CD\u4F5C',
    key: 'option',
    valueType: 'option',
    width: 120,
    render: () => [
      <a key="link">\u94FE\u8DEF</a>,
      <a key="warn">\u62A5\u8B66</a>,
      <a key="more">
        <EllipsisOutlined />
      </a>,
    ],
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // \u8868\u5355\u641C\u7D22\u9879\u4F1A\u4ECE params \u4F20\u5165\uFF0C\u4F20\u9012\u7ED9\u540E\u7AEF\u63A5\u53E3\u3002
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      headerTitle="\u4E24\u884C\u7684\u60C5\u51B5"
      toolbar={{
        multipleLine: true,
        search: {
          onSearch: (value: string) => {
            alert(value);
          },
        },
        filter: (
          <LightFilter>
            <ProFormDatePicker name="startdate" label="\u54CD\u5E94\u65E5\u671F" />
          </LightFilter>
        ),
        actions: [
          <Dropdown
            key="overlay"
            menu={{
              items: [
                {
                  label: '\u83DC\u5355',
                  key: '1',
                },
                {
                  label: '\u5217\u8868',
                  key: '2',
                },
                {
                  label: '\u8868\u5355',
                  key: '3',
                },
              ],
              onClick: () => alert('menu click'),
            }}
          >
            <Button>
              \u79FB\u52A8\u81EA
              <DownOutlined
                style={{
                  marginInlineStart: 8,
                }}
              />
            </Button>
          </Dropdown>,
          <Button
            key="add"
            type="primary"
            onClick={() => {
              alert('add');
            }}
          >
            \u6DFB\u52A0
          </Button>,
        ],
      }}
      rowKey="key"
      search={false}
    />
  );
};
`},24198:function(e,n){n.Z=`import { EllipsisOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['\u4ED8\u5C0F\u5C0F', '\u66F2\u4E3D\u4E3D', '\u6797\u4E1C\u4E1C', '\u9648\u5E05\u5E05', '\u517C\u67D0\u67D0'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u5E94\u7528\u540D\u79F0',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '\u5BB9\u5668\u6570\u91CF',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '\u521B\u5EFA\u8005',
    dataIndex: 'creator',
    valueType: 'select',
    valueEnum: {
      all: { text: '\u5168\u90E8' },
      \u4ED8\u5C0F\u5C0F: { text: '\u4ED8\u5C0F\u5C0F' },
      \u66F2\u4E3D\u4E3D: { text: '\u66F2\u4E3D\u4E3D' },
      \u6797\u4E1C\u4E1C: { text: '\u6797\u4E1C\u4E1C' },
      \u9648\u5E05\u5E05: { text: '\u9648\u5E05\u5E05' },
      \u517C\u67D0\u67D0: { text: '\u517C\u67D0\u67D0' },
    },
  },
  {
    title: '\u64CD\u4F5C',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: () => [
      <a key="link">\u94FE\u8DEF</a>,
      <a key="warn">\u62A5\u8B66</a>,
      <a key="more">
        <EllipsisOutlined />
      </a>,
    ],
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // \u8868\u5355\u641C\u7D22\u9879\u4F1A\u4ECE params \u4F20\u5165\uFF0C\u4F20\u9012\u7ED9\u540E\u7AEF\u63A5\u53E3\u3002
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      toolbar={{
        search: {
          onSearch: (value: string) => {
            alert(value);
          },
        },
        filter: (
          <LightFilter>
            <ProFormDatePicker name="startdate" label="\u54CD\u5E94\u65E5\u671F" />
          </LightFilter>
        ),
        actions: [
          <Button
            key="primary"
            type="primary"
            onClick={() => {
              alert('add');
            }}
          >
            \u6DFB\u52A0
          </Button>,
        ],
      }}
      rowKey="key"
      search={false}
    />
  );
};
`},17613:function(e,n){n.Z=`import { EllipsisOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { useState } from 'react';

export type TableListItem = {
  key: number;
  name: string;
  status: number;
  containers: number;
  creator: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['\u4ED8\u5C0F\u5C0F', '\u66F2\u4E3D\u4E3D', '\u6797\u4E1C\u4E1C', '\u9648\u5E05\u5E05', '\u517C\u67D0\u67D0'];

const valueEnum = {
  all: { text: '\u5168\u90E8' },
  \u4ED8\u5C0F\u5C0F: { text: '\u4ED8\u5C0F\u5C0F' },
  \u66F2\u4E3D\u4E3D: { text: '\u66F2\u4E3D\u4E3D' },
  \u6797\u4E1C\u4E1C: { text: '\u6797\u4E1C\u4E1C' },
  \u9648\u5E05\u5E05: { text: '\u9648\u5E05\u5E05' },
  \u517C\u67D0\u67D0: { text: '\u517C\u67D0\u67D0' },
};

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    status: Math.floor(Math.random() * 2),
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columnsMap: Record<string, ProColumns<TableListItem>[]> = {
  tab1: [
    {
      title: '\u540D\u79F0',
      dataIndex: 'name',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '\u72B6\u6001',
      key: 'status1',
      dataIndex: 'status',
      valueType: 'select',
      request: () =>
        Promise.resolve([
          {
            label: '\u6210\u529F',
            value: 1,
          },
          {
            label: '\u5931\u8D25',
            value: 0,
          },
        ]),
    },
    {
      title: '\u5BB9\u5668\u6570\u91CF',
      dataIndex: 'containers',
      align: 'right',
      sorter: (a, b) => a.containers - b.containers,
    },
    {
      title: '\u521B\u5EFA\u4EBA',
      dataIndex: 'creator',
      valueType: 'select',
      valueEnum,
    },
    {
      title: '\u64CD\u4F5C',
      key: 'option',
      valueType: 'option',
      width: 120,
      render: () => [
        <a key="link">\u94FE\u8DEF</a>,
        <a key="warn">\u62A5\u8B66</a>,
        <a key="more">
          <EllipsisOutlined />
        </a>,
      ],
    },
  ],
  tab2: [
    {
      title: '\u5E94\u7528\u540D\u79F0',
      dataIndex: 'name',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '\u72B6\u6001',
      key: 'status2',
      dataIndex: 'status',
      valueType: 'select',
      request: () =>
        Promise.resolve([
          {
            label: '\u542F\u7528',
            value: 1,
          },
          {
            label: '\u505C\u7528',
            value: 0,
          },
        ]),
    },
    {
      title: '\u521B\u5EFA\u8005',
      dataIndex: 'creator',
      valueType: 'select',
      valueEnum,
    },
    {
      title: '\u64CD\u4F5C',
      key: 'option',
      valueType: 'option',
      width: 120,
      render: () => [
        <a key="link">\u94FE\u8DEF</a>,
        <a key="warn">\u62A5\u8B66</a>,
        <a key="more">
          <EllipsisOutlined />
        </a>,
      ],
    },
  ],
};

export default () => {
  const [activeKey, setActiveKey] = useState<string>('tab1');

  return (
    <ProTable<TableListItem>
      columns={columnsMap[activeKey]}
      request={(params, sorter, filter) => {
        // \u8868\u5355\u641C\u7D22\u9879\u4F1A\u4ECE params \u4F20\u5165\uFF0C\u4F20\u9012\u7ED9\u540E\u7AEF\u63A5\u53E3\u3002
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      toolbar={{
        title: '\u6807\u7B7E',
        multipleLine: true,
        filter: (
          <LightFilter>
            <ProFormDatePicker name="startdate" label="\u54CD\u5E94\u65E5\u671F" />
          </LightFilter>
        ),
        tabs: {
          activeKey,
          onChange: (key) => setActiveKey(key as string),
          items: [
            {
              key: 'tab1',
              tab: '\u6807\u7B7E\u4E00',
            },
            {
              key: 'tab2',
              tab: '\u6807\u7B7E\u4E8C',
            },
          ],
        },
      }}
      rowKey="key"
      search={false}
    />
  );
};
`},6388:function(e,n){n.Z=`import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Space, Table } from 'antd';

const { RangePicker } = DatePicker;

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
} as const;

export type TableListItem = {
  key: number;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['\u4ED8\u5C0F\u5C0F', '\u66F2\u4E3D\u4E3D', '\u6797\u4E1C\u4E1C', '\u9648\u5E05\u5E05', '\u517C\u67D0\u67D0'];

for (let i = 0; i < 50; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName-' + i,
    containers: Math.floor(Math.random() * 20),
    callNumber: Math.floor(Math.random() * 2000),
    progress: Math.ceil(Math.random() * 100) + 1,
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u7684\u6587\u5B57\u8981\u5C55\u793A\u4F46\u662F\u8981\u7559\u4E0B\u5C3E\u5DF4'
        : '\u7B80\u77ED\u5907\u6CE8\u6587\u6848',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u5E94\u7528\u540D\u79F0',
    width: 120,
    dataIndex: 'name',
    fixed: 'left',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '\u5BB9\u5668\u6570\u91CF',
    width: 120,
    dataIndex: 'containers',
    align: 'right',
    search: false,
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '\u8C03\u7528\u6B21\u6570',
    width: 120,
    align: 'right',
    dataIndex: 'callNumber',
  },
  {
    title: '\u6267\u884C\u8FDB\u5EA6',
    dataIndex: 'progress',
    valueType: (item) => ({
      type: 'progress',
      status: ProcessMap[item.status as 'close'],
    }),
  },
  {
    title: '\u521B\u5EFA\u8005',
    width: 120,
    dataIndex: 'creator',
    valueType: 'select',
    valueEnum: {
      all: { text: '\u5168\u90E8' },
      \u4ED8\u5C0F\u5C0F: { text: '\u4ED8\u5C0F\u5C0F' },
      \u66F2\u4E3D\u4E3D: { text: '\u66F2\u4E3D\u4E3D' },
      \u6797\u4E1C\u4E1C: { text: '\u6797\u4E1C\u4E1C' },
      \u9648\u5E05\u5E05: { text: '\u9648\u5E05\u5E05' },
      \u517C\u67D0\u67D0: { text: '\u517C\u67D0\u67D0' },
    },
  },
  {
    title: '\u521B\u5EFA\u65F6\u95F4',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
    renderFormItem: () => {
      return <RangePicker />;
    },
  },
  {
    title: '\u5907\u6CE8',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
    search: false,
  },
  {
    title: '\u64CD\u4F5C',
    width: 80,
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    render: () => [<a key="link">\u94FE\u8DEF</a>],
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      rowSelection={{
        // \u81EA\u5B9A\u4E49\u9009\u62E9\u9879\u53C2\u8003: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
        // \u6CE8\u91CA\u8BE5\u884C\u5219\u9ED8\u8BA4\u4E0D\u663E\u793A\u4E0B\u62C9\u9009\u9879
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        defaultSelectedRowKeys: [1],
      }}
      tableAlertRender={({
        selectedRowKeys,
        selectedRows,
        onCleanSelected,
      }) => {
        console.log(selectedRowKeys, selectedRows);
        return (
          <Space size={24}>
            <span>
              \u5DF2\u9009 {selectedRowKeys.length} \u9879
              <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                \u53D6\u6D88\u9009\u62E9
              </a>
            </span>
            <span>{\`\u5BB9\u5668\u6570\u91CF: \${selectedRows.reduce(
              (pre, item) => pre + item.containers,
              0,
            )} \u4E2A\`}</span>
            <span>{\`\u8C03\u7528\u91CF: \${selectedRows.reduce(
              (pre, item) => pre + item.callNumber,
              0,
            )} \u6B21\`}</span>
          </Space>
        );
      }}
      tableAlertOptionRender={() => {
        return (
          <Space size={16}>
            <a>\u6279\u91CF\u5220\u9664</a>
            <a>\u5BFC\u51FA\u6570\u636E</a>
          </Space>
        );
      }}
      dataSource={tableListDataSource}
      scroll={{ x: 1300 }}
      options={false}
      search={false}
      pagination={{
        pageSize: 5,
      }}
      rowKey="key"
      headerTitle="\u6279\u91CF\u64CD\u4F5C"
      toolBarRender={() => [<Button key="show">\u67E5\u770B\u65E5\u5FD7</Button>]}
    />
  );
};
`},93225:function(e,n){n.Z=`import type { ColumnsState, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useState } from 'react';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  updatedAt: number;
  createdAt: number;
  money: number;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    name: \`TradeCode \${i}\`,
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    updatedAt: Date.now() - Math.floor(Math.random() * 1000),
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    money: Math.floor(Math.random() * 2000) * i,
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u6807\u9898',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '\u72B6\u6001',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '\u5168\u90E8', status: 'Default' },
      close: { text: '\u5173\u95ED', status: 'Default' },
      running: { text: '\u8FD0\u884C\u4E2D', status: 'Processing' },
      online: { text: '\u5DF2\u4E0A\u7EBF', status: 'Success' },
      error: { text: '\u5F02\u5E38', status: 'Error' },
    },
  },
  {
    title: '\u66F4\u65B0\u65F6\u95F4',
    key: 'since2',
    dataIndex: 'createdAt',
    valueType: 'date',
    hideInSetting: true,
  },

  {
    title: '\u64CD\u4F5C',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: () => [<a key="1">\u64CD\u4F5C</a>, <a key="2">\u5220\u9664</a>],
  },
];

export default () => {
  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >({
    name: {
      show: false,
      order: 2,
    },
  });
  return (
    <ProTable<TableListItem, { keyWord?: string }>
      columns={columns}
      request={(params) =>
        Promise.resolve({
          data: tableListDataSource.filter((item) => {
            if (!params?.keyWord) {
              return true;
            }
            if (
              item.name.includes(params?.keyWord) ||
              item.status.includes(params?.keyWord)
            ) {
              return true;
            }
            return false;
          }),
          success: true,
        })
      }
      options={{
        search: true,
      }}
      rowKey="key"
      columnsState={{
        value: columnsStateMap,
        onChange: setColumnsStateMap,
      }}
      search={false}
      dateFormatter="string"
      headerTitle="\u53D7\u63A7\u6A21\u5F0F"
    />
  );
};
`},73835:function(e,n){n.Z=`import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, ConfigProvider, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '\u5E8F\u53F7',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: '\u6807\u9898',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tooltip: '\u6807\u9898\u8FC7\u957F\u4F1A\u81EA\u52A8\u6536\u7F29',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
        },
      ],
    },
    width: '30%',
    search: false,
  },
  {
    title: '\u72B6\u6001',
    dataIndex: 'state',
    initialValue: 'open',
    filters: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '\u5168\u90E8', status: 'Default' },
      open: {
        text: '\u672A\u89E3\u51B3',
        status: 'Error',
      },
      closed: {
        text: '\u5DF2\u89E3\u51B3',
        status: 'Success',
      },
      processing: {
        text: '\u89E3\u51B3\u4E2D',
        status: 'Processing',
      },
    },
    width: '10%',
  },
  {
    title: '\u6807\u7B7E',
    dataIndex: 'labels',
    width: '10%',
    render: (_, row) => (
      <Space>
        {row.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '\u64CD\u4F5C',
    valueType: 'option',
    render: (text, row, _, action) => [
      <a href={row.url} target="_blank" rel="noopener noreferrer" key="link">
        \u94FE\u8DEF
      </a>,
      <a href={row.url} target="_blank" rel="noopener noreferrer" key="warning">
        \u62A5\u8B66
      </a>,
      <a href={row.url} target="_blank" rel="noopener noreferrer" key="view">
        \u67E5\u770B
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '\u590D\u5236' },
          { key: 'delete', name: '\u5220\u9664' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();

  return (
    <ConfigProvider prefixCls="qixian">
      <ProTable<GithubIssueItem>
        columns={columns}
        pagination={{
          showQuickJumper: true,
        }}
        actionRef={actionRef}
        request={async (params = {} as Record<string, any>) =>
          request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          })
        }
        rowKey="id"
        dateFormatter="string"
        headerTitle="\u9AD8\u7EA7\u8868\u683C"
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            \u65B0\u5EFA
          </Button>,
        ]}
      />
    </ConfigProvider>
  );
};
`},94474:function(e,n){n.Z=`import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Input } from 'antd';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  progress: number;
  money: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['\u4ED8\u5C0F\u5C0F', '\u66F2\u4E3D\u4E3D', '\u6797\u4E1C\u4E1C', '\u9648\u5E05\u5E05', '\u517C\u67D0\u67D0'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    memo:
      i % 2 === 1
        ? '\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u7684\u6587\u5B57\u8981\u5C55\u793A\u4F46\u662F\u8981\u7559\u4E0B\u5C3E\u5DF4'
        : '\u7B80\u77ED\u5907\u6CE8\u6587\u6848',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u6392\u5E8F',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '\u5E94\u7528\u540D\u79F0',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
    // \u81EA\u5B9A\u4E49\u7B5B\u9009\u9879\u529F\u80FD\u5177\u4F53\u5B9E\u73B0\u8BF7\u53C2\u8003 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input style={{ width: 188, marginBlockEnd: 8, display: 'block' }} />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: '\u521B\u5EFA\u8005',
    dataIndex: 'creator',
    valueEnum: {
      all: { text: '\u5168\u90E8' },
      \u4ED8\u5C0F\u5C0F: { text: '\u4ED8\u5C0F\u5C0F' },
      \u66F2\u4E3D\u4E3D: { text: '\u66F2\u4E3D\u4E3D' },
      \u6797\u4E1C\u4E1C: { text: '\u6797\u4E1C\u4E1C' },
      \u9648\u5E05\u5E05: { text: '\u9648\u5E05\u5E05' },
      \u517C\u67D0\u67D0: { text: '\u517C\u67D0\u67D0' },
    },
  },
  {
    title: '\u72B6\u6001',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: '\u5168\u90E8', status: 'Default' },
      close: { text: '\u5173\u95ED', status: 'Default' },
      running: { text: '\u8FD0\u884C\u4E2D', status: 'Processing' },
      online: { text: '\u5DF2\u4E0A\u7EBF', status: 'Success' },
      error: { text: '\u5F02\u5E38', status: 'Error' },
    },
  },
  {
    title: '\u5907\u6CE8',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '\u64CD\u4F5C',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="link">\u94FE\u8DEF</a>,
      <a key="link2">\u62A5\u8B66</a>,
      <a key="link3">\u76D1\u63A7</a>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'copy', name: '\u590D\u5236' },
          { key: 'delete', name: '\u5220\u9664' },
        ]}
      />,
    ],
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // \u8868\u5355\u641C\u7D22\u9879\u4F1A\u4ECE params \u4F20\u5165\uFF0C\u4F20\u9012\u7ED9\u540E\u7AEF\u63A5\u53E3\u3002
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      search={{
        layout: 'vertical',
        defaultCollapsed: false,
      }}
      dateFormatter="string"
      toolbar={{
        title: '\u9AD8\u7EA7\u8868\u683C',
        tooltip: '\u8FD9\u662F\u4E00\u4E2A\u6807\u9898\u63D0\u793A',
      }}
      toolBarRender={() => [
        <Button key="danger" danger>
          \u5371\u9669\u6309\u94AE
        </Button>,
        <Button key="show">\u67E5\u770B\u65E5\u5FD7</Button>,
        <Button type="primary" key="primary">
          \u521B\u5EFA\u5E94\u7528
        </Button>,

        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '2',
              },
              {
                label: '3rd item',
                key: '3',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};
`},82087:function(e,n){n.Z=`import type {
  ActionType,
  EditableFormInstance,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import { EditableProTable, ProCard, ProForm } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';

type DataSourceType = {
  id: React.Key;
  associate?: string;
};

const defaultData: DataSourceType[] = [];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const formRef = useRef<ProFormInstance<any>>();
  const actionRef = useRef<ActionType>();
  const editableFormRef = useRef<EditableFormInstance>();
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '\u5173\u8054\u9898\u5E93',
      dataIndex: 'associate',
      valueType: 'text',
      ellipsis: true,
      formItemProps: {
        rules: [{ required: true, message: 'Required' }],
      },
    },
    {
      title: '\u64CD\u4F5C',
      valueType: 'option',
      render: (_, row) => [
        <a
          key="delete"
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue(
              'table',
            ) as DataSourceType[];
            formRef.current?.setFieldsValue({
              table: tableDataSource.filter((item) => item.id !== row?.id),
            });
          }}
        >
          \u79FB\u9664
        </a>,
        <a
          key="edit"
          onClick={() => {
            actionRef.current?.startEditable(row.id);
          }}
        >
          \u7F16\u8F91
        </a>,
      ],
    },
  ];

  return (
    <ProCard>
      <div
        style={{
          maxWidth: 800,
          margin: 'auto',
        }}
      >
        <ProForm<{
          table: DataSourceType[];
        }>
          formRef={formRef}
          initialValues={{
            table: defaultData,
          }}
        >
          <EditableProTable<DataSourceType>
            rowKey="id"
            scroll={{
              x: true,
            }}
            editableFormRef={editableFormRef}
            controlled
            actionRef={actionRef}
            formItemProps={{
              label: '\u9898\u5E93\u7F16\u8F91',
            }}
            maxLength={10}
            name="table"
            columns={columns}
            recordCreatorProps={{
              record: (index) => {
                return { id: index + 1 };
              },
            }}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
            }}
          />
        </ProForm>
      </div>
    </ProCard>
  );
};
`},56474:function(e,n){n.Z=`import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';

export type TableListItem = {
  key: number;
  name: string;
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u6807\u9898',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '\u521B\u5EFA\u65F6\u95F4',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
];

export default () => {
  const ref = useRef<ProFormInstance>();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ProTable<TableListItem>
      columns={columns}
      request={() =>
        Promise.resolve({
          data: [
            {
              key: 1,
              name: \`TradeCode \${1}\`,
              createdAt: 1602572994055,
            },
          ],
          success: true,
        })
      }
      rowKey="key"
      pagination={{
        showSizeChanger: true,
      }}
      search={{
        collapsed,
        onCollapse: setCollapsed,
      }}
      formRef={ref}
      toolBarRender={() => [
        <Button
          key="set"
          onClick={() => {
            if (ref.current) {
              ref.current.setFieldsValue({
                name: 'test-xxx',
              });
            }
          }}
        >
          \u8D4B\u503C
        </Button>,
        <Button
          key="submit"
          onClick={() => {
            if (ref.current) {
              ref.current.submit();
            }
          }}
        >
          \u63D0\u4EA4
        </Button>,
      ]}
      options={false}
      dateFormatter="string"
      headerTitle="\u8868\u5355\u8D4B\u503C"
    />
  );
};
`},19873:function(e,n){n.Z=`import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, ConfigProvider, Select, Space } from 'antd';
import caESIntl from 'antd/lib/locale/ca_ES';
import enGBIntl from 'antd/lib/locale/en_GB';
import enUSIntl from 'antd/lib/locale/en_US';
import esESIntl from 'antd/lib/locale/es_ES';
import frFRIntl from 'antd/lib/locale/fr_FR';
import itITIntl from 'antd/lib/locale/it_IT';
import jaJPIntl from 'antd/lib/locale/ja_JP';
import msMYIntl from 'antd/lib/locale/ms_MY';
import ptBRIntl from 'antd/lib/locale/pt_BR';
import ruRUIntl from 'antd/lib/locale/ru_RU';
import srRSIntl from 'antd/lib/locale/sr_RS';
import thTHIntl from 'antd/lib/locale/th_TH';
import viVNIntl from 'antd/lib/locale/vi_VN';
import zhCNIntl from 'antd/lib/locale/zh_CN';
import zhTWIntl from 'antd/lib/locale/zh_TW';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

const intlMap = {
  zhCNIntl,
  enUSIntl,
  enGBIntl,
  viVNIntl,
  itITIntl,
  jaJPIntl,
  esESIntl,
  caESIntl,
  ruRUIntl,
  srRSIntl,
  msMYIntl,
  zhTWIntl,
  frFRIntl,
  ptBRIntl,
  thTHIntl,
};

type GithubIssueItem = {
  key: number;
  name: string;
  createdAt: number;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: 'index',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: 'Title',
    dataIndex: 'name',
  },
  {
    title: 'Money',
    dataIndex: 'title',
    width: 100,
    order: 1,
    valueType: 'money',
    renderText: () => (Math.random() * 100).toFixed(2),
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [intl, setIntl] = useState('zhCNIntl');
  return (
    <ConfigProvider locale={intlMap[intl as 'zhCNIntl']}>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: \`TradeCode \${1}\`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
        rowSelection={{}}
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        headerTitle={
          <Space>
            <span>Basic Table</span>
            <Select<string>
              variant="borderless"
              value={intl}
              onChange={(value) => {
                dayjs.locale(intlMap[value as 'zhCNIntl'].locale);
                setIntl(value);
              }}
              options={Object.keys(intlMap).map((value) => ({
                value,
                label: value,
              }))}
            />
          </Space>
        }
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            New
          </Button>,
        ]}
      />
    </ConfigProvider>
  );
};
`},63879:function(e,n){n.Z=`import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import dayjs from 'dayjs';

export type TableListItem = {
  key: number;
  name: string;
  creator: string;
  createdAt: number;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['\u4ED8\u5C0F\u5C0F', '\u66F2\u4E3D\u4E3D', '\u6797\u4E1C\u4E1C', '\u9648\u5E05\u5E05', '\u517C\u67D0\u67D0'];

for (let i = 0; i < 1; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    creator: creators[Math.floor(Math.random() * creators.length)],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u5E94\u7528\u540D\u79F0',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
    formItemProps: {
      lightProps: {
        labelFormatter: (value) => \`app-\${value}\`,
      },
    },
  },
  {
    title: '\u65E5\u671F\u8303\u56F4',
    dataIndex: 'startTime',
    valueType: 'dateRange',
    hideInTable: true,
    initialValue: [dayjs(), dayjs().add(1, 'day')],
  },
  {
    title: '\u521B\u5EFA\u8005',
    dataIndex: 'creator',
    valueType: 'select',
    valueEnum: {
      all: { text: '\u5168\u90E8' },
      \u4ED8\u5C0F\u5C0F: { text: '\u4ED8\u5C0F\u5C0F' },
      \u66F2\u4E3D\u4E3D: { text: '\u66F2\u4E3D\u4E3D' },
      \u6797\u4E1C\u4E1C: { text: '\u6797\u4E1C\u4E1C' },
      \u9648\u5E05\u5E05: { text: '\u9648\u5E05\u5E05' },
      \u517C\u67D0\u67D0: { text: '\u517C\u67D0\u67D0' },
    },
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // \u8868\u5355\u641C\u7D22\u9879\u4F1A\u4ECE params \u4F20\u5165\uFF0C\u4F20\u9012\u7ED9\u540E\u7AEF\u63A5\u53E3\u3002
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      headerTitle="Light Filter"
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      options={false}
      search={{
        filterType: 'light',
      }}
      dateFormatter="string"
    />
  );
};
`},66832:function(e,n){n.Z=`/* eslint-disable no-console */
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';

type GithubIssueItem = {
  key: number;
  name: string;
  createdAt: number;
};

const MySelect: React.FC<{
  state: {
    type: number;
  };
  /** Value \u548C onChange \u4F1A\u88AB\u81EA\u52A8\u6CE8\u5165 */
  value?: string;
  onChange?: (value: string) => void;
}> = (props) => {
  const { state } = props;

  const [innerOptions, setOptions] = useState<
    {
      label: React.ReactNode;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    const { type } = state || {};
    if (type === 2) {
      setOptions([
        {
          label: '\u661F\u671F\u4E00',
          value: 1,
        },
        {
          label: '\u661F\u671F\u4E8C',
          value: 2,
        },
      ]);
    } else {
      setOptions([
        {
          label: '\u4E00\u6708',
          value: 1,
        },
        {
          label: '\u4E8C\u6708',
          value: 2,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(state)]);

  return (
    <Select
      options={innerOptions}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default () => {
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '\u5E8F\u53F7',
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: '\u6807\u9898',
      dataIndex: 'name',
    },
    {
      title: '\u52A8\u6001\u8868\u5355',
      key: 'direction',
      hideInTable: true,
      dataIndex: 'direction',
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        const stateType = form.getFieldValue('state');
        if (stateType === 3) {
          return <Input />;
        }
        if (stateType === 4) {
          return null;
        }
        return (
          <MySelect
            {...rest}
            state={{
              type: stateType,
            }}
          />
        );
      },
    },
    {
      title: '\u72B6\u6001',
      dataIndex: 'state',
      initialValue: 1,
      valueType: 'select',
      request: async () => [
        {
          label: '\u6708\u4EFD',
          value: 1,
        },
        {
          label: '\u5468',
          value: 2,
        },
        {
          label: '\u81EA\u5B9A\u4E49',
          value: 3,
        },
        {
          label: '\u4E0D\u5C55\u793A',
          value: 4,
        },
      ],
    },
  ];

  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      request={async (params) => {
        console.log(\`request params:\`, params);
        return {
          data: [
            {
              key: 1,
              name: \`TradeCode \${1}\`,
              createdAt: 1602572994055,
              state: 'closed',
            },
          ],
          success: true,
        };
      }}
      rowKey="key"
      tableLayout="fixed"
      dateFormatter="string"
      headerTitle="\u52A8\u6001\u81EA\u5B9A\u4E49\u641C\u7D22\u680F"
      search={{
        defaultCollapsed: false,
        optionRender: (searchConfig, formProps, dom) => [
          ...dom.reverse(),
          <Button
            key="out"
            onClick={() => {
              const values = searchConfig?.form?.getFieldsValue();
              console.log(values);
            }}
          >
            \u5BFC\u51FA
          </Button>,
        ],
      }}
      toolBarRender={() => [
        <Button key="3" type="primary">
          <PlusOutlined />
          \u65B0\u5EFA
        </Button>,
      ]}
    />
  );
};
`},23487:function(e,n){n.Z=`import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { Badge, Button } from 'antd';
import React, { useState } from 'react';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  status: string;
  creator: string;
  createdAt: number;
};

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const tableListDataSource: TableListItem[] = [];

const creators = ['\u4ED8\u5C0F\u5C0F', '\u66F2\u4E3D\u4E3D', '\u6797\u4E1C\u4E1C', '\u9648\u5E05\u5E05', '\u517C\u67D0\u67D0'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u5E94\u7528\u540D\u79F0',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '\u521B\u5EFA\u8005',
    dataIndex: 'creator',
    valueEnum: {
      all: { text: '\u5168\u90E8' },
      \u4ED8\u5C0F\u5C0F: { text: '\u4ED8\u5C0F\u5C0F' },
      \u66F2\u4E3D\u4E3D: { text: '\u66F2\u4E3D\u4E3D' },
      \u6797\u4E1C\u4E1C: { text: '\u6797\u4E1C\u4E1C' },
      \u9648\u5E05\u5E05: { text: '\u9648\u5E05\u5E05' },
      \u517C\u67D0\u67D0: { text: '\u517C\u67D0\u67D0' },
    },
  },
  {
    title: '\u72B6\u6001',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: '\u5168\u90E8', status: 'Default' },
      close: { text: '\u5F85\u53D1\u5E03', status: 'Default' },
      running: { text: '\u53D1\u5E03\u4E2D', status: 'Processing' },
      online: { text: '\u53D1\u5E03\u6210\u529F', status: 'Success' },
      error: { text: '\u53D1\u5E03\u5931\u8D25', status: 'Error' },
    },
  },
  {
    title: '\u5BB9\u5668\u6570\u91CF',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '\u64CD\u4F5C',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: (_, record) => [
      record.status === 'close' && <a key="link">\u53D1\u5E03</a>,
      (record.status === 'running' || record.status === 'online') && (
        <a key="warn">\u505C\u7528</a>
      ),
      record.status === 'error' && <a key="republish">\u91CD\u65B0\u53D1\u5E03</a>,
      <a
        key="monitor"
        style={
          record.status === 'running'
            ? {
                color: 'rgba(0,0,0,.25)',
                cursor: 'not-allowed',
              }
            : {}
        }
      >
        \u76D1\u63A7
      </a>,
    ],
  },
];

const renderBadge = (count: number, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginBlockStart: -2,
        marginInlineStart: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  );
};

export default () => {
  const [activeKey, setActiveKey] = useState<React.Key>('tab1');

  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // \u8868\u5355\u641C\u7D22\u9879\u4F1A\u4ECE params \u4F20\u5165\uFF0C\u4F20\u9012\u7ED9\u540E\u7AEF\u63A5\u53E3\u3002
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      toolbar={{
        filter: (
          <LightFilter>
            <ProFormDatePicker name="startdate" label="\u54CD\u5E94\u65E5\u671F" />
          </LightFilter>
        ),
        menu: {
          type: 'tab',
          activeKey: activeKey,
          items: [
            {
              key: 'tab1',
              label: <span>\u5E94\u7528{renderBadge(99, activeKey === 'tab1')}</span>,
            },
            {
              key: 'tab2',
              label: <span>\u9879\u76EE{renderBadge(30, activeKey === 'tab2')}</span>,
            },
            {
              key: 'tab3',
              label: <span>\u6587\u7AE0{renderBadge(30, activeKey === 'tab3')}</span>,
            },
          ],
          onChange: (key) => {
            setActiveKey(key as string);
          },
        },
        actions: [
          <Button key="primary" type="primary">
            \u65B0\u5EFA\u5E94\u7528
          </Button>,
        ],
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      search={false}
      dateFormatter="string"
      options={{
        setting: {
          draggable: true,
          checkable: true,
          checkedReset: false,
          extra: [<a key="confirm">\u786E\u8BA4</a>],
        },
      }}
    />
  );
};
`},82128:function(e,n){n.Z=`import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Dropdown, Popconfirm, Space } from 'antd';
import React from 'react';

export type Member = {
  avatar: string;
  realName: string;
  nickName: string;
  email: string;
  outUserNo: string;
  phone: string;
  role: RoleType;
  permission?: string[];
};

export type RoleMapType = Record<
  string,
  {
    name: string;
    desc: string;
  }
>;

export type RoleType = 'admin' | 'operator';

const RoleMap: RoleMapType = {
  admin: {
    name: '\u7BA1\u7406\u5458',
    desc: '\u4EC5\u62E5\u6709\u6307\u5B9A\u9879\u76EE\u7684\u6743\u9650',
  },
  operator: {
    name: '\u64CD\u4F5C\u5458',
    desc: '\u62E5\u6709\u6240\u6709\u6743\u9650',
  },
};

const tableListDataSource: Member[] = [];

const realNames = ['\u9A6C\u5DF4\u5DF4', '\u6D4B\u8BD5', '\u6D4B\u8BD52', '\u6D4B\u8BD53'];
const nickNames = ['\u5DF4\u5DF4', '\u6D4B\u8BD5', '\u6D4B\u8BD52', '\u6D4B\u8BD53'];
const emails = [
  'baba@antfin.com',
  'test@antfin.com',
  'test2@antfin.com',
  'test3@antfin.com',
];
const phones = ['12345678910', '10923456789', '109654446789', '109223346789'];
const permissions = [[], ['\u6743\u9650\u70B9\u540D\u79F01', '\u6743\u9650\u70B9\u540D\u79F04'], ['\u6743\u9650\u70B9\u540D\u79F01'], []];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    outUserNo: \`\${102047 + i}\`,
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    role: i === 0 ? 'admin' : 'operator',
    realName: realNames[i % 4],
    nickName: nickNames[i % 4],
    email: emails[i % 4],
    phone: phones[i % 4],
    permission: permissions[i % 4],
  });
}

const MemberList: React.FC = () => {
  const renderRemoveUser = (text: string) => (
    <Popconfirm
      key="popconfirm"
      title={\`\u786E\u8BA4\${text}\u5417?\`}
      okText="\u662F"
      cancelText="\u5426"
    >
      <a>{text}</a>
    </Popconfirm>
  );

  const columns: ProColumns<Member>[] = [
    {
      dataIndex: 'avatar',
      title: '\u6210\u5458\u540D\u79F0',
      valueType: 'avatar',
      width: 150,
      render: (dom, record) => (
        <Space>
          <span>{dom}</span>
          {record.nickName}
        </Space>
      ),
    },
    {
      dataIndex: 'email',
      title: '\u8D26\u53F7',
    },
    {
      dataIndex: 'role',
      title: '\u89D2\u8272',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                label: '\u7BA1\u7406\u5458',
                key: 'admin',
              },
              {
                label: '\u64CD\u4F5C\u5458',
                key: 'operator',
              },
            ],
          }}
        >
          <a>
            {RoleMap[record.role || 'admin'].name} <DownOutlined />
          </a>
        </Dropdown>
      ),
    },
    {
      dataIndex: 'permission',
      title: '\u6743\u9650\u8303\u56F4',
      render: (_, record) => {
        const { role, permission = [] } = record;
        if (role === 'admin') {
          return '\u6240\u6709\u6743\u9650';
        }
        return permission && permission.length > 0
          ? permission.join('\u3001')
          : '\u65E0';
      },
    },
    {
      title: '\u64CD\u4F5C',
      dataIndex: 'x',
      valueType: 'option',
      render: (_, record) => {
        let node = renderRemoveUser('\u9000\u51FA');
        if (record.role === 'admin') {
          node = renderRemoveUser('\u79FB\u9664');
        }
        return [<a key="edit">\u7F16\u8F91</a>, node];
      },
    },
  ];

  return (
    <ProTable<Member>
      columns={columns}
      request={(params, sorter, filter) => {
        // \u8868\u5355\u641C\u7D22\u9879\u4F1A\u4ECE params \u4F20\u5165\uFF0C\u4F20\u9012\u7ED9\u540E\u7AEF\u63A5\u53E3\u3002
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="outUserNo"
      pagination={{
        showQuickJumper: true,
      }}
      toolBarRender={false}
      search={false}
    />
  );
};

export default MemberList;
`},5438:function(e,n){n.Z=`import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button } from 'antd';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['\u4ED8\u5C0F\u5C0F', '\u66F2\u4E3D\u4E3D', '\u6797\u4E1C\u4E1C', '\u9648\u5E05\u5E05', '\u517C\u67D0\u67D0'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u7684\u6587\u5B57\u8981\u5C55\u793A\u4F46\u662F\u8981\u7559\u4E0B\u5C3E\u5DF4'
        : '\u7B80\u77ED\u5907\u6CE8\u6587\u6848',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u5E94\u7528\u540D\u79F0',
    width: 80,
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '\u5BB9\u5668\u6570\u91CF',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '\u72B6\u6001',
    width: 80,
    dataIndex: 'status',
    initialValue: 'all',
    valueEnum: {
      all: { text: '\u5168\u90E8', status: 'Default' },
      close: { text: '\u5173\u95ED', status: 'Default' },
      running: { text: '\u8FD0\u884C\u4E2D', status: 'Processing' },
      online: { text: '\u5DF2\u4E0A\u7EBF', status: 'Success' },
      error: { text: '\u5F02\u5E38', status: 'Error' },
    },
  },
  {
    title: '\u521B\u5EFA\u8005',
    width: 80,
    dataIndex: 'creator',
    valueEnum: {
      all: { text: '\u5168\u90E8' },
      \u4ED8\u5C0F\u5C0F: { text: '\u4ED8\u5C0F\u5C0F' },
      \u66F2\u4E3D\u4E3D: { text: '\u66F2\u4E3D\u4E3D' },
      \u6797\u4E1C\u4E1C: { text: '\u6797\u4E1C\u4E1C' },
      \u9648\u5E05\u5E05: { text: '\u9648\u5E05\u5E05' },
      \u517C\u67D0\u67D0: { text: '\u517C\u67D0\u67D0' },
    },
  },
  {
    title: '\u64CD\u4F5C',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="link">\u94FE\u8DEF</a>,
      <a key="link2">\u62A5\u8B66</a>,
      <a key="link3">\u76D1\u63A7</a>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'copy', name: '\u590D\u5236' },
          { key: 'delete', name: '\u5220\u9664' },
        ]}
      />,
    ],
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      dataSource={tableListDataSource}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      columns={columns}
      search={false}
      dateFormatter="string"
      headerTitle="\u8868\u683C\u6807\u9898"
      toolBarRender={() => [
        <Button key="show">\u67E5\u770B\u65E5\u5FD7</Button>,
        <Button key="out">
          \u5BFC\u51FA\u6570\u636E
          <DownOutlined />
        </Button>,
        <Button type="primary" key="primary">
          \u521B\u5EFA\u5E94\u7528
        </Button>,
      ]}
    />
  );
};
`},66202:function(e,n){n.Z=`import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';

type GithubIssueItem = {
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: number;
  updated_at: number;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '\u6807\u9898',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tooltip: '\u6807\u9898\u8FC7\u957F\u4F1A\u81EA\u52A8\u6536\u7F29',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
        },
      ],
    },
    width: '30%',
  },
  {
    title: '\u72B6\u6001',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    valueType: 'select',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
        },
      ],
    },
    valueEnum: {
      all: { text: '\u5168\u90E8', status: 'Default' },
      open: {
        text: '\u672A\u89E3\u51B3',
        status: 'Error',
      },
      closed: {
        text: '\u5DF2\u89E3\u51B3',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '\u89E3\u51B3\u4E2D',
        status: 'Processing',
      },
    },
  },
  {
    title: '\u6807\u7B7E',
    dataIndex: 'labels',
    search: false,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
        },
      ],
    },
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '\u521B\u5EFA\u65F6\u95F4',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    hideInSearch: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
        },
      ],
    },
  },
];

export default () => {
  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        request={async () => ({
          success: true,
          data: [
            {
              id: 624748504,
              number: 6689,
              title: '\u{1F41B} [BUG]yarn install\u547D\u4EE4 antd2.4.5\u4F1A\u62A5\u9519',
              labels: [
                {
                  name: 'bug',
                  color: 'error',
                },
              ],
              state: 'open',
              locked: false,
              comments: 1,
              created_at: 1590486176000,
              updated_at: 1590487382000,
              closed_at: null,
              author_association: 'NONE',
              user: 'chenshuai2144',
              avatar:
                'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
            },
          ],
        })}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          ignoreRules: false,
        }}
        dateFormatter="string"
        headerTitle="\u9AD8\u7EA7\u8868\u683C"
      />
      <ProTable<GithubIssueItem>
        columns={columns}
        request={async () => ({
          success: true,
          data: [
            {
              id: 624748504,
              number: 6689,
              title: '\u{1F41B} [BUG]yarn install\u547D\u4EE4 antd2.4.5\u4F1A\u62A5\u9519',
              labels: [
                {
                  name: 'bug',
                  color: 'error',
                },
              ],
              state: 'open',
              locked: false,
              comments: 1,
              created_at: 1590486176000,
              updated_at: 1590487382000,
              closed_at: null,
              author_association: 'NONE',
              user: 'chenshuai2144',
              avatar:
                'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
            },
          ],
        })}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        headerTitle="\u9AD8\u7EA7\u8868\u683C"
      />
    </>
  );
};
`},26381:function(e,n){n.Z=`import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  updatedAt: number;
  createdAt: number;
  progress: number;
  money: number;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    name: \`TradeCode \${i}\`,
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    updatedAt: Date.now() - Math.floor(Math.random() * 1000),
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
  });
}

const timeAwait = (waitTime: number): Promise<void> =>
  new Promise((res) =>
    window.setTimeout(() => {
      res();
    }, waitTime),
  );

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u5E8F\u53F7',
    dataIndex: 'index',
    valueType: 'index',
    width: 80,
  },
  {
    title: '\u72B6\u6001',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: '\u5168\u90E8', status: 'Default' },
      close: { text: '\u5173\u95ED', status: 'Default' },
      running: { text: '\u8FD0\u884C\u4E2D', status: 'Processing' },
      online: { text: '\u5DF2\u4E0A\u7EBF', status: 'Success' },
      error: { text: '\u5F02\u5E38', status: 'Error' },
    },
  },
  {
    title: '\u8FDB\u5EA6',
    key: 'progress',
    dataIndex: 'progress',
    valueType: (item) => ({
      type: 'progress',
      status: item.status !== 'error' ? 'active' : 'exception',
    }),
  },
  {
    title: '\u66F4\u65B0\u65F6\u95F4',
    key: 'since2',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '\u521B\u5EFA\u65F6\u95F4',
    key: 'since3',
    dataIndex: 'createdAt',
    valueType: 'dateMonth',
  },
];

export default () => {
  const [time, setTime] = useState(() => Date.now());
  const [polling, setPolling] = useState<number>(2000);
  return (
    <ProTable<TableListItem>
      columns={columns}
      rowKey="key"
      pagination={{
        showSizeChanger: true,
      }}
      polling={polling}
      request={async () => {
        await timeAwait(2000);
        setTime(Date.now());
        return {
          data: tableListDataSource,
          success: true,
          total: tableListDataSource.length,
        };
      }}
      dateFormatter="string"
      headerTitle={\`\u4E0A\u6B21\u66F4\u65B0\u65F6\u95F4\uFF1A\${dayjs(time).format('HH:mm:ss')}\`}
      toolBarRender={() => [
        <Button
          key="3"
          type="primary"
          onClick={() => {
            if (polling) {
              setPolling(0);
              return;
            }
            setPolling(2000);
          }}
        >
          {polling ? <LoadingOutlined /> : <ReloadOutlined />}
          {polling ? '\u505C\u6B62\u8F6E\u8BE2' : '\u5F00\u59CB\u8F6E\u8BE2'}
        </Button>,
      ]}
    />
  );
};
`},69373:function(e,n){n.Z=`import { MailOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Card, Descriptions, Menu } from 'antd';
import { useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export type TableListItem = {
  key: number;
  name: string;
  createdAt: number;
  progress: number;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    name: \`TradeCode \${i}\`,
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    progress: Math.ceil(Math.random() * 100) + 1,
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u5E8F\u53F7',
    dataIndex: 'index',
    valueType: 'index',
    width: 80,
  },
  {
    title: '\u66F4\u65B0\u65F6\u95F4',
    key: 'since2',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '\u6267\u884C\u8FDB\u5EA6',
    dataIndex: 'progress',
    valueType: 'progress',
  },
];

export default () => {
  const [key, setKey] = useState('1');

  return (
    <ProTable<TableListItem>
      columns={columns}
      rowKey="key"
      pagination={{
        showSizeChanger: true,
      }}
      tableRender={(_, dom) => (
        <div
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          <Menu
            onSelect={(e) => setKey(e.key as string)}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={[
              {
                key: 'sub1',
                label: (
                  <span>
                    <MailOutlined />
                    <span>Navigation One</span>
                  </span>
                ),
                children: [
                  {
                    type: 'group',
                    key: 'g1',
                    label: 'Item 1',
                    children: [
                      {
                        key: '1',
                        label: 'Option 1',
                      },
                      {
                        key: '2',
                        label: 'Option 2',
                      },
                    ],
                  },
                  {
                    type: 'group',
                    key: 'g2',
                    label: 'Item 2',
                    children: [
                      {
                        key: '3',
                        label: 'Option 3',
                      },
                      {
                        key: '4',
                        label: 'Option 4',
                      },
                    ],
                  },
                ],
              },
            ]}
          />
          <div
            style={{
              flex: 1,
            }}
          >
            {dom}
          </div>
        </div>
      )}
      tableExtraRender={(_, data) => (
        <Card>
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Row">{data.length}</Descriptions.Item>
            <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
            <Descriptions.Item label="Association">
              <a>421421</a>
            </Descriptions.Item>
            <Descriptions.Item label="Creation Time">
              2017-01-10
            </Descriptions.Item>
            <Descriptions.Item label="Effective Time">
              2017-10-10
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
      params={{
        key,
      }}
      request={async () => {
        await waitTime(200);
        return {
          success: true,
          data: tableListDataSource,
        };
      }}
      dateFormatter="string"
      headerTitle="\u81EA\u5B9A\u4E49\u8868\u683C\u4E3B\u4F53"
    />
  );
};
`},72885:function(e,n){n.Z=`import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, ConfigProvider, Space, Tag } from 'antd';
import arEGIntl from 'antd/lib/locale/ar_EG';
import { useRef } from 'react';
import request from 'umi-request';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '\u0627\u0644\u0639\u0646\u0648\u0627\u0646',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tooltip: '\u0633\u064A\u062A\u0645 \u062A\u0642\u0644\u064A\u0635 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0641\u064A \u062D\u0627\u0644 \u0643\u0627\u0646 \u0637\u0648\u064A\u0644 \u062C\u062F\u064B\u0627',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '\u0647\u0630\u0627 \u0627\u0644\u062D\u0642\u0644 \u0645\u0637\u0644\u0648\u0628',
        },
      ],
    },
    width: '30%',
    search: false,
  },
  {
    title: '\u0627\u0644\u062D\u0627\u0644\u0629',
    dataIndex: 'state',
    initialValue: 'open',
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: '\u0627\u0644\u0643\u0644', status: 'Default' },
      open: {
        text: '\u063A\u064A\u0631 \u0645\u062D\u0644\u0648\u0644\u0629',
        status: 'Error',
      },
      closed: {
        text: '\u062A\u0645 \u062D\u0644\u0647\u0627',
        status: 'Success',
      },
      processing: {
        text: '\u0646\u0639\u0645\u0644 \u0639\u0644\u064A\u0647\u0627',
        status: 'Processing',
      },
    },
  },
  {
    title: '\u0627\u0644\u062A\u0633\u0645\u064A\u0629',
    dataIndex: 'labels',
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '\u0627\u0644\u062A\u0634\u063A\u064A\u0644',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="link">
        \u0631\u0627\u0628\u0637
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        \u67E5\u770B
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '\u0646\u0633\u062E' },
          { key: 'delete', name: '\u062D\u0630\u0641' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();

  return (
    <ConfigProvider locale={arEGIntl} direction="rtl">
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {} as Record<string, any>) =>
          request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          })
        }
        pagination={{
          pageSize: 5,
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        headerTitle="\u0646\u0645\u0648\u0630\u062C \u0627\u062D\u062A\u0631\u0627\u0641\u064A"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            \u062C\u062F\u064A\u062F
          </Button>,
        ]}
      />
    </ConfigProvider>
  );
};
`},528:function(e,n){n.Z=`import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

type GithubIssueItem = {
  key: number;
  name: string;
  createdAt: number;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '\u5E8F\u53F7',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: '\u6807\u9898',
    dataIndex: 'name',
    search: false,
  },
];

export default () => (
  <ProTable<GithubIssueItem>
    columns={columns}
    request={async (params) => {
      console.log(params);
      return {
        data: [
          {
            key: 1,
            name: \`TradeCode \${1}\`,
            createdAt: 1602572994055,
          },
        ],
        success: true,
      };
    }}
    search={false}
    rowKey="key"
    options={{
      search: true,
    }}
    headerTitle="toolbar \u4E2D\u641C\u7D22"
  />
);
`},50302:function(e,n){n.Z=`import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';

type GithubIssueItem = {
  key: number;
  name: string;
  createdAt: number;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: 'index',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: 'Title',
    dataIndex: 'name',
  },
  {
    title: 'Money',
    dataIndex: 'title',
    width: 100,
    valueType: 'money',
    renderText: () => (Math.random() * 100).toFixed(2),
  },
];

export default () => (
  <ProTable<GithubIssueItem>
    columns={columns}
    request={async () => {
      return {
        data: [
          {
            key: 1,
            name: \`TradeCode \${1}\`,
            createdAt: 1602572994055,
          },
        ],
        success: true,
      };
    }}
    rowKey="key"
    dateFormatter="string"
    headerTitle="\u67E5\u8BE2 Table"
    search={{
      defaultCollapsed: false,
      labelWidth: 'auto',
      optionRender: (searchConfig, formProps, dom) => [
        ...dom.reverse(),
        <Button key="out" onClick={() => {}}>
          \u5BFC\u51FA
        </Button>,
      ],
    }}
    toolBarRender={() => [
      <Button key="primary" type="primary">
        <PlusOutlined />
        \u65B0\u5EFA
      </Button>,
    ]}
  />
);
`},99658:function(e,n){n.Z=`import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '\u6807\u9898',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tooltip: '\u6807\u9898\u8FC7\u957F\u4F1A\u81EA\u52A8\u6536\u7F29',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '\u6B64\u9879\u4E3A\u5FC5\u586B\u9879',
        },
      ],
    },
  },
  {
    disable: true,
    title: '\u72B6\u6001',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '\u8D85\u957F'.repeat(50) },
      open: {
        text: '\u672A\u89E3\u51B3',
        status: 'Error',
      },
      closed: {
        text: '\u5DF2\u89E3\u51B3',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '\u89E3\u51B3\u4E2D',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: '\u6807\u7B7E',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '\u521B\u5EFA\u65F6\u95F4',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '\u521B\u5EFA\u65F6\u95F4',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '\u64CD\u4F5C',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        \u7F16\u8F91
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        \u67E5\u770B
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '\u590D\u5236' },
          { key: 'delete', name: '\u5220\u9664' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        return request<{
          data: GithubIssueItem[];
        }>('https://proapi.azurewebsites.net/github/issues', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // \u7531\u4E8E\u914D\u7F6E\u4E86 transform\uFF0C\u63D0\u4EA4\u7684\u53C2\u4E0E\u4E0E\u5B9A\u4E49\u7684\u4E0D\u540C\u8FD9\u91CC\u9700\u8981\u8F6C\u5316\u4E00\u4E0B
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="\u9AD8\u7EA7\u8868\u683C"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          \u65B0\u5EFA
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '1',
              },
              {
                label: '3rd item',
                key: '1',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};
`},72773:function(e,n){n.Z=`import type { ProColumns } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import type { BadgeProps } from 'antd';
import { Badge, Button } from 'antd';
import React, { useEffect, useState } from 'react';

type TableListItem = {
  createdAtRange?: number[];
  createdAt: number;
  code: string;
};

type DetailListProps = {
  ip: string;
};

const DetailList: React.FC<DetailListProps> = (props) => {
  const { ip } = props;
  const [tableListDataSource, setTableListDataSource] = useState<
    TableListItem[]
  >([]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '\u65F6\u95F4\u70B9',
      key: 'createdAt',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '\u4EE3\u7801',
      key: 'code',
      width: 80,
      dataIndex: 'code',
      valueType: 'code',
    },
    {
      title: '\u64CD\u4F5C',
      key: 'option',
      width: 80,
      valueType: 'option',
      render: () => [<a key="a">\u9884\u8B66</a>],
    },
  ];

  useEffect(() => {
    const source = [];
    for (let i = 0; i < 15; i += 1) {
      source.push({
        createdAt: Date.now() - Math.floor(Math.random() * 10000),
        code: \`const getData = async params => {
          const data = await getData(params);
          return { list: data.data, ...data };
        };\`,
        key: i,
      });
    }

    setTableListDataSource(source);
  }, [ip]);

  return (
    <ProTable<TableListItem>
      columns={columns}
      dataSource={tableListDataSource}
      pagination={{
        pageSize: 3,
        showSizeChanger: false,
      }}
      rowKey="key"
      toolBarRender={false}
      search={false}
    />
  );
};

type statusType = BadgeProps['status'];

const valueEnum: statusType[] = ['success', 'error', 'processing', 'default'];

export type IpListItem = {
  ip?: string;
  cpu?: number | string;
  mem?: number | string;
  disk?: number | string;
  status: statusType;
};

const ipListDataSource: IpListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  ipListDataSource.push({
    ip: \`106.14.98.1\${i}4\`,
    cpu: 10,
    mem: 20,
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    disk: 30,
  });
}

type IPListProps = {
  ip: string;
  onChange: (id: string) => void;
};

const IPList: React.FC<IPListProps> = (props) => {
  const { onChange } = props;

  const columns: ProColumns<IpListItem>[] = [
    {
      title: 'IP',
      key: 'ip',
      dataIndex: 'ip',
      render: (_, item) => {
        return <Badge status={item.status} text={item.ip} />;
      },
    },
    {
      title: 'CPU',
      key: 'cpu',
      dataIndex: 'cpu',
      valueType: {
        type: 'percent',
        precision: 0,
      },
    },
    {
      title: 'Mem',
      key: 'mem',
      dataIndex: 'mem',
      valueType: {
        type: 'percent',
        precision: 0,
      },
    },
    {
      title: 'Disk',
      key: 'disk',
      dataIndex: 'disk',
      valueType: {
        type: 'percent',
        precision: 0,
      },
    },
  ];
  return (
    <ProTable<IpListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // \u8868\u5355\u641C\u7D22\u9879\u4F1A\u4ECE params \u4F20\u5165\uFF0C\u4F20\u9012\u7ED9\u540E\u7AEF\u63A5\u53E3\u3002
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: ipListDataSource,
          success: true,
        });
      }}
      rowKey="ip"
      toolbar={{
        search: {
          onSearch: (value) => {
            alert(value);
          },
        },
        actions: [
          <Button key="list" type="primary">
            \u65B0\u5EFA\u9879\u76EE
          </Button>,
        ],
      }}
      options={false}
      pagination={false}
      search={false}
      onRow={(record) => {
        return {
          onClick: () => {
            if (record.ip) {
              onChange(record.ip);
            }
          },
        };
      }}
    />
  );
};

const Demo: React.FC = () => {
  const [ip, setIp] = useState('0.0.0.0');
  return (
    <ProCard split="vertical">
      <ProCard colSpan="384px" ghost>
        <IPList onChange={(cIp) => setIp(cIp)} ip={ip} />
      </ProCard>
      <ProCard title={ip}>
        <DetailList ip={ip} />
      </ProCard>
    </ProCard>
  );
};

export default Demo;
`},36574:function(e,n){n.Z=`import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';

export type Status = {
  color: string;
  text: string;
};

const statusMap = {
  0: {
    color: 'blue',
    text: '\u8FDB\u884C\u4E2D',
  },
  1: {
    color: 'green',
    text: '\u5DF2\u5B8C\u6210',
  },
  2: {
    color: 'volcano',
    text: '\u8B66\u544A',
  },
  3: {
    color: 'red',
    text: '\u5931\u8D25',
  },
  4: {
    color: '',
    text: '\u672A\u5B8C\u6210',
  },
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: Status;
  createdAt: number;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['\u4ED8\u5C0F\u5C0F', '\u66F2\u4E3D\u4E3D', '\u6797\u4E1C\u4E1C', '\u9648\u5E05\u5E05', '\u517C\u67D0\u67D0'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: statusMap[((Math.floor(Math.random() * 10) % 5) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u5E94\u7528\u540D\u79F0',
    width: 120,
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '\u72B6\u6001',
    width: 120,
    dataIndex: 'status',
    render: (_, record) => (
      <Tag color={record.status.color}>{record.status.text}</Tag>
    ),
  },
  {
    title: '\u5BB9\u5668\u6570\u91CF',
    width: 120,
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },

  {
    title: '\u521B\u5EFA\u8005',
    width: 120,
    dataIndex: 'creator',
    valueEnum: {
      all: { text: '\u5168\u90E8' },
      \u4ED8\u5C0F\u5C0F: { text: '\u4ED8\u5C0F\u5C0F' },
      \u66F2\u4E3D\u4E3D: { text: '\u66F2\u4E3D\u4E3D' },
      \u6797\u4E1C\u4E1C: { text: '\u6797\u4E1C\u4E1C' },
      \u9648\u5E05\u5E05: { text: '\u9648\u5E05\u5E05' },
      \u517C\u67D0\u67D0: { text: '\u517C\u67D0\u67D0' },
    },
  },
];

const expandedRowRender = () => {
  const data = [];
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56',
    });
  }
  return (
    <ProTable
      columns={[
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Name', dataIndex: 'name', key: 'name' },

        { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        {
          title: 'Action',
          dataIndex: 'operation',
          key: 'operation',
          valueType: 'option',
          render: () => [<a key="Pause">Pause</a>, <a key="Stop">Stop</a>],
        },
      ]}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={data}
      pagination={false}
    />
  );
};

export default () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // \u8868\u5355\u641C\u7D22\u9879\u4F1A\u4ECE params \u4F20\u5165\uFF0C\u4F20\u9012\u7ED9\u540E\u7AEF\u63A5\u53E3\u3002
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      expandable={{ expandedRowRender }}
      search={false}
      dateFormatter="string"
      headerTitle="\u5D4C\u5957\u8868\u683C"
      options={false}
      toolBarRender={() => [
        <Button key="show">\u67E5\u770B\u65E5\u5FD7</Button>,
        <Button key="out">
          \u5BFC\u51FA\u6570\u636E
          <DownOutlined />
        </Button>,
        <Button key="primary" type="primary">
          \u521B\u5EFA\u5E94\u7528
        </Button>,
      ]}
    />
  );
};
`},65919:function(e,n){n.Z=`import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space } from 'antd';
import dayjs from 'dayjs';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  status: string | number;
  updatedAt: number;
  createdAt: number;
  progress: number;
  money: number;
  percent: number | string;
  createdAtRange: number[];
  code: string;
  avatar: string;
  image: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    image:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    name: \`TradeCode \${i}\`,
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    updatedAt:
      dayjs('2019-11-16 12:50:26').valueOf() - Math.floor(Math.random() * 1000),
    createdAt:
      dayjs('2019-11-16 12:50:26').valueOf() - Math.floor(Math.random() * 2000),
    createdAtRange: [
      dayjs('2019-11-16 12:50:26').valueOf() - Math.floor(Math.random() * 2000),
      dayjs('2019-11-16 12:50:26').valueOf() - Math.floor(Math.random() * 2000),
    ],
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    percent:
      Math.random() > 0.5
        ? ((i + 1) * 10 + Math.random()).toFixed(3)
        : -((i + 1) * 10 + Math.random()).toFixed(2),
    code: \`const getData = async params => {
  const data = await getData(params);
  return { list: data.data, ...data };
};\`,
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u5E8F\u53F7',
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    title: 'border \u5E8F\u53F7',
    dataIndex: 'index',
    key: 'indexBorder',
    valueType: 'indexBorder',
  },
  {
    title: '\u4EE3\u7801',
    key: 'code',
    width: 120,
    dataIndex: 'code',
    valueType: 'code',
  },
  {
    title: '\u5934\u50CF',
    dataIndex: 'avatar',
    key: 'avatar',
    valueType: 'avatar',
    width: 150,
    render: (dom) => (
      <Space>
        <span>{dom}</span>
        <a
          href="https://github.com/chenshuai2144"
          target="_blank"
          rel="noopener noreferrer"
        >
          chenshuai2144
        </a>
      </Space>
    ),
  },
  {
    title: '\u56FE\u7247',
    dataIndex: 'image',
    key: 'image',
    valueType: 'image',
  },
  {
    title: '\u64CD\u4F5C',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: (_, row, index, action) => [
      <a
        key="a"
        onClick={() => {
          action?.startEditable(row.key);
        }}
      >
        \u7F16\u8F91
      </a>,
    ],
  },
];

export default () => (
  <>
    <ProTable<TableListItem>
      columns={columns}
      request={() => {
        return Promise.resolve({
          total: 200,
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      headerTitle="\u6837\u5F0F\u7C7B"
    />
  </>
);
`},37558:function(e,n){n.Z=`import { ProTable } from '@ant-design/pro-components';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  updatedAt: number;
  createdAt: number;
  progress: number;
  money: number;
  percent: number | string;
  createdAtRange: number[];
  code: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    name: \`TradeCode \${i}\`,
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    updatedAt: Date.now() - Math.floor(Math.random() * 1000),
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    createdAtRange: [
      Date.now() - Math.floor(Math.random() * 2000),
      Date.now() - Math.floor(Math.random() * 2000),
    ],
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    percent:
      Math.random() > 0.5
        ? ((i + 1) * 10 + Math.random()).toFixed(3)
        : -((i + 1) * 10 + Math.random()).toFixed(2),
    code: \`const getData = async params => {
  const data = await getData(params);
  return { list: data.data, ...data };
};\`,
  });
}

export default () => (
  <>
    <ProTable<TableListItem>
      columns={[
        {
          title: '\u521B\u5EFA\u65F6\u95F4',
          key: 'since',
          dataIndex: 'createdAt',
          valueType: 'dateTime',
        },
        {
          title: '\u65E5\u671F\u533A\u95F4',
          key: 'dateRange',
          dataIndex: 'createdAtRange',
          valueType: 'dateRange',
        },
        {
          title: '\u65F6\u95F4\u8303\u56F4',
          key: 'dateTimeRangeCustom',
          dataIndex: 'dateTimeRange',
          hideInTable: true,
          valueType: 'dateTimeRange',
          fieldProps: {
            // placeholder: ['1', '2']
          },
          renderFormItem: (_, { type, defaultRender }) => {
            if (type === 'form') {
              return null;
            }
            return defaultRender(_);
          },
        },
        {
          title: '\u65F6\u95F4\u533A\u95F4',
          key: 'dateTimeRange',
          dataIndex: 'createdAtRange',
          valueType: 'dateTimeRange',
          search: {
            transform: (value: any) => ({
              startTime: value[0],
              endTime: value[1],
            }),
          },
        },
        {
          title: '\u66F4\u65B0\u65F6\u95F4',
          key: 'since2',
          dataIndex: 'createdAt',
          valueType: 'date',
        },
        {
          title: '\u66F4\u65B0\u65F6\u95F4',
          key: 'since4',
          dataIndex: 'createdAt',
          valueType: 'fromNow',
        },
        {
          title: '\u5173\u95ED\u65F6\u95F4',
          key: 'since3',
          dataIndex: 'updatedAt',
          valueType: 'time',
        },
        {
          title: '\u64CD\u4F5C',
          key: 'option',
          width: 120,
          valueType: 'option',
          render: (_, row, index, action) => [
            <a
              key="a"
              onClick={() => {
                action?.startEditable(row.key);
              }}
            >
              \u7F16\u8F91
            </a>,
          ],
        },
      ]}
      request={() => {
        return Promise.resolve({
          total: 200,
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      headerTitle="\u65E5\u671F\u7C7B"
    />
  </>
);
`},78664:function(e,n){n.Z=`import { ProTable } from '@ant-design/pro-components';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  updatedAt: number;
  createdAt: number;
  progress: number;
  money: number;
  percent: number | string;
  createdAtRange: number[];
  code: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    name: \`TradeCode \${i}\`,
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    updatedAt: Date.now() - Math.floor(Math.random() * 1000),
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    createdAtRange: [
      Date.now() - Math.floor(Math.random() * 2000),
      Date.now() - Math.floor(Math.random() * 2000),
    ],
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    percent:
      Math.random() > 0.5
        ? ((i + 1) * 10 + Math.random()).toFixed(3)
        : -((i + 1) * 10 + Math.random()).toFixed(2),
    code: \`const getData = async params => {
  const data = await getData(params);
  return { list: data.data, ...data };
};\`,
  });
}

export default () => (
  <ProTable<TableListItem>
    columns={[
      {
        title: '\u8FDB\u5EA6',
        key: 'progress',
        dataIndex: 'progress',
        valueType: (item) => ({
          type: 'progress',
          status: item.status !== 'error' ? 'active' : 'exception',
        }),
        width: 200,
      },
      {
        title: '\u91D1\u989D',
        dataIndex: 'money',
        valueType: 'money',
        width: 150,
      },
      {
        title: '\u6570\u5B57',
        dataIndex: 'money',
        key: 'digit',
        valueType: 'digit',
        width: 150,
      },
      {
        title: '\u6570\u5B57',
        dataIndex: 'money',
        key: 'second',
        valueType: 'second',
        width: 150,
      },
      {
        title: '\u767E\u5206\u6BD4',
        key: 'percent',
        width: 120,
        dataIndex: 'percent',
        valueType: () => ({
          type: 'percent',
        }),
      },
      {
        title: '\u64CD\u4F5C',
        key: 'option',
        width: 120,
        valueType: 'option',
        render: (_, row, index, action) => [
          <a
            key="a"
            onClick={() => {
              action?.startEditable(row.key);
            }}
          >
            \u7F16\u8F91
          </a>,
        ],
      },
    ]}
    request={() => {
      return Promise.resolve({
        total: 200,
        data: tableListDataSource,
        success: true,
      });
    }}
    rowKey="key"
    headerTitle="\u6570\u5B57\u7C7B"
  />
);
`},41086:function(e,n){n.Z=`import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

const cascaderOptions = [
  {
    field: 'front end',
    value: 'fe',
    language: [
      {
        field: 'Javascript',
        value: 'js',
      },
      {
        field: 'Typescript',
        value: 'ts',
      },
    ],
  },
  {
    field: 'back end',
    value: 'be',
    language: [
      {
        field: 'Java',
        value: 'java',
      },
      {
        field: 'Go',
        value: 'go',
      },
    ],
  },
];

const valueEnumMap = {
  0: 'running',
  1: 'online',
  2: 'error',
};

export type TableListItem = {
  key: number;
  status: string | number;
  cascader: string[];
  treeSelect: string[];
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    status: valueEnumMap[((Math.floor(Math.random() * 10) % 3) + '') as '0'],
    cascader: ['fe', 'js'],
    treeSelect: ['fe', 'js'],
  });
}

const valueEnum = {
  all: { text: '\u5168\u90E8', status: 'Default' },
  running: { text: '\u8FD0\u884C\u4E2D', status: 'Processing' },
  online: { text: '\u5DF2\u4E0A\u7EBF', status: 'Success' },
  error: { text: '\u5F02\u5E38', status: 'Error' },
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '\u72B6\u6001',
    valueType: 'select',
    dataIndex: 'status',
    initialValue: ['all'],
    width: 100,
    valueEnum,
  },
  {
    title: '\u5355\u9009\u72B6\u6001',
    dataIndex: 'status',
    valueType: 'radio',
    initialValue: 'all',
    width: 100,
    valueEnum,
  },
  {
    title: '\u5355\u9009\u6309\u94AE\u72B6\u6001',
    dataIndex: 'status',
    valueType: 'radioButton',
    initialValue: 'all',
    width: 100,
    valueEnum,
  },
  {
    title: '\u591A\u9009\u72B6\u6001',
    dataIndex: 'status',
    initialValue: ['all'],
    width: 100,
    valueType: 'checkbox',
    valueEnum,
  },
  {
    title: '\u7EA7\u8054\u9009\u62E9\u5668',
    key: 'cascader',
    dataIndex: 'cascader',
    width: 100,
    fieldProps: {
      options: cascaderOptions,
      fieldNames: {
        children: 'language',
        label: 'field',
      },
    },
    valueType: 'cascader',
  },
  {
    title: '\u6811\u5F62\u4E0B\u62C9\u6846',
    key: 'treeSelect',
    dataIndex: 'treeSelect',
    width: 100,
    // request: async () => cascaderOptions,
    fieldProps: {
      options: cascaderOptions,
      fieldNames: {
        children: 'language',
        label: 'field',
      },
      showSearch: true,
      filterTreeNode: true,
      multiple: true,
      treeNodeFilterProp: 'field',
    },
    valueType: 'treeSelect',
  },
  {
    title: '\u65F6\u95F4\u8303\u56F4',
    key: 'dateTimeRange',
    dataIndex: 'dateTimeRange',
    hideInTable: true,
    valueType: 'dateTimeRange',
    fieldProps: {
      // placeholder: []
    },
    renderFormItem: (_, { type, defaultRender }) => {
      if (type === 'form') {
        return null;
      }

      return defaultRender(_);
    },
  },
  {
    title: '\u64CD\u4F5C',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: (_, row, index, action) => [
      <a
        key="a"
        onClick={() => {
          action?.startEditable(row.key);
        }}
      >
        \u7F16\u8F91
      </a>,
    ],
  },
];

export default () => (
  <>
    <ProTable<TableListItem>
      columns={columns}
      request={() => {
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      search={{
        defaultCollapsed: false,
        span: 12,
        labelWidth: 'auto',
      }}
      editable={{
        type: 'multiple',
      }}
      rowKey="key"
      headerTitle="\u6837\u5F0F\u7C7B"
    />
  </>
);
`}}]);
