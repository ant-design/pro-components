import { ProCard } from '../../components';

export default () => {
  return (
    <>
      <ProCard
        title="Title"
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
