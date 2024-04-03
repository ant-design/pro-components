import { CheckCard } from '@ant-design/pro-components';
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
