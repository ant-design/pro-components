import React from 'react';
import ProForm, {
  ProFormText,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDateRangePicker,
  ProFormTimePicker,
  ProFormDateTimeRangePicker,
  ProFormTextArea,
  ProFormCheckbox,
} from '@ant-design/pro-form';

interface GithubIssueItem {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: string;
  locked: boolean;
  assignee?: any;
  assignees: any[];
  milestone?: any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: any;
  author_association: string;
  body: string;
}

interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export default () => {
  return (
    <ProForm onFinish={(values) => console.log(values)}>
      <ProFormText
        name="name"
        label="名称"
        tip="最长为 24 位，用于标定的唯一 id"
        placeholder="请输入名称"
      />
      <ProFormTextArea
        name="remark"
        label="备注"
        placeholder="请输入备注"
        tip="最长为 24 位，用于标定的唯一 id,最长为 24 位，用于标定的唯一 id,最长为 24 位，用于标定的唯一 id"
      />
      <ProFormDatePicker name="date" label="日期" />
      <ProForm.Group title="这是一个分组">
        <ProFormDateTimePicker name="dateTime" label="日期时间" />
        <ProFormDateRangePicker name="dateRange" label="日期区间" />
      </ProForm.Group>
      <ProFormCheckbox.Group
        name="checkbox"
        layout="vertical"
        label="行业分布"
        options={['农业', '制造业', '互联网']}
      />
      <ProFormDateTimeRangePicker name="dateTimeRange" label="日期时间区间" />
      <ProFormTimePicker name="time" label="时间选择" placeholder="请选择" />
    </ProForm>
  );
};
