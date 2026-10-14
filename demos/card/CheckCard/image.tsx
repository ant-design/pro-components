import { CheckCard } from '@ant-design/pro-components';

const Demo = () => (
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

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
