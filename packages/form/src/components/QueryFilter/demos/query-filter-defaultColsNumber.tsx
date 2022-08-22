import { ProFormDatePicker, ProFormText, QueryFilter } from '@ant-design/pro-components';
import { Card, Col, Row } from 'antd';

export default () => {
  return (
    <Row>
      <Col>
        <Card title="不排除内部组件占用空间，用户需自行计算">
          <QueryFilter defaultCollapsed split defaultColsNumber={5}>
            <ProFormText name="name" label="应用名称" />
            <ProFormDatePicker name="createDate" label="创建时间" />
            <ProFormText name="status" label="应用状态" />
            <ProFormDatePicker name="replyDate" label="响应日期" />
            <ProFormDatePicker name="startDate" label="创建时间" />
            <ProFormDatePicker name="endDate" label="结束时间" />
          </QueryFilter>
        </Card>
      </Col>
      <Col>
        <Card title="默认展示组件数量自动排除内置组件占用空间">
          <QueryFilter defaultCollapsed split defaultColsNumber={5} excludeBuildInCompSpan>
            <ProFormText name="name" label="应用名称" />
            <ProFormDatePicker name="createDate" label="创建时间" />
            <ProFormText name="status" label="应用状态" />
            <ProFormDatePicker name="replyDate" label="响应日期" />
            <ProFormDatePicker name="startDate" label="创建时间" />
            <ProFormDatePicker name="endDate" label="结束时间" />
          </QueryFilter>
        </Card>
      </Col>
    </Row>
  );
};
