import { CheckCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';

const Demo = () => (
  <>
    <CheckCard.Group style={{ width: '100%' }} size="small">
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={8}>
          <CheckCard
            style={{ width: '100%' }}
            title="Card A"
            description="This is the description"
            value="A"
          />
        </Col>
        <Col xs={24} sm={8}>
          <CheckCard
            style={{ width: '100%' }}
            title="Card B"
            description="This is the description"
            value="B"
          />
        </Col>
        <Col xs={24} sm={8}>
          <CheckCard
            style={{ width: '100%' }}
            title="Card C"
            description="This is the description"
            value="C"
          />
        </Col>
      </Row>
    </CheckCard.Group>
  </>
);

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
