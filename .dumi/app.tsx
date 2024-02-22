import { Alert } from 'antd';

// @ts-ignore
export function rootContainer(container) {
  return (
    <div>
      <div
        style={{
          padding: '8px 12px',
        }}
      >
        <Alert
          showIcon
          type="info"
          closeIcon
          message={
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                window.open(
                  'https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__eHKeOtUOUM1QVkxMUczQjhUOENSWFJNMkMzRFY2SS4u',
                );
              }}
            >
              我们正在收集信息，以便为明年的计划做出更好的准备。您的反馈对我们非常重要，将帮助我们了解您的需求和期望，从而提供更好的服务,点击此处参与调查。
            </div>
          }
        />
      </div>
      {container}
    </div>
  );
}
