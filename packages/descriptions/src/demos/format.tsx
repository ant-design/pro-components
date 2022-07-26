import { ProDescriptions } from '@ant-design/pro-components';
import dayjs from 'dayjs';

export default () => {
  return (
    <>
      <ProDescriptions column={2} title="高级定义列表" tooltip="包含了从服务器请求，columns等功能">
        <ProDescriptions.Item
          label="日期"
          fieldProps={{
            format: 'YYYY.MM.DD',
          }}
          valueType="date"
        >
          {dayjs().valueOf()}
        </ProDescriptions.Item>
        <ProDescriptions.Item
          label="日期区间"
          fieldProps={{
            format: 'YYYY.MM.DD HH:mm:ss',
          }}
          valueType="dateTimeRange"
        >
          {[dayjs().add(-1, 'd').valueOf(), dayjs().valueOf()]}
        </ProDescriptions.Item>
        <ProDescriptions.Item
          label="时间"
          fieldProps={{
            format: 'YYYY.MM.DD',
          }}
          valueType="time"
        >
          {dayjs().valueOf()}
        </ProDescriptions.Item>

        <ProDescriptions.Item
          label="时间日期"
          fieldProps={{
            format: 'YYYY.MM.DD HH:mm:SS',
          }}
          valueType="dateTime"
        >
          {dayjs().valueOf()}
        </ProDescriptions.Item>

        <ProDescriptions.Item
          label="更新时间"
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
