/** Title: 多行文字水印 */
import { WaterMark } from '@ant-design/pro-components';

export default () => (
  <WaterMark content={['蚂蚁集团', '多行文字']}>
    <div style={{ height: 500 }} />
  </WaterMark>
);
