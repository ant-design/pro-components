import React, { useContext } from 'react';
import { ConfigContext } from 'antd/lib/config-provider/context';
import { Alert, Space } from 'antd';
import './index.less';
import { useIntl, IntlType } from '@ant-design/pro-provider';

export interface TableAlertProps<T> {
  selectedRowKeys: (number | string)[];
  selectedRows: T[];
  alertInfoRender?:
    | ((props: {
        intl: IntlType;
        selectedRowKeys: (number | string)[];
        selectedRows: T[];
      }) => React.ReactNode)
    | false;
  onCleanSelected: () => void;
  alertOptionRender?:
    | false
    | ((props: { intl: IntlType; onCleanSelected: () => void }) => React.ReactNode);
}

const defaultAlertOptionRender = (props: { intl: IntlType; onCleanSelected: () => void }) => {
  const { intl, onCleanSelected } = props;
  return [
    <a onClick={onCleanSelected} key="0">
      {intl.getMessage('alert.clear', '清空')}
    </a>,
  ];
};

const TableAlert = <T, U = {}>({
  selectedRowKeys = [],
  onCleanSelected,
  selectedRows = [],
  alertInfoRender = ({ intl }) => (
    <Space>
      {intl.getMessage('alert.selected', '已选择')}
      <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>
      {intl.getMessage('alert.item', '项')}&nbsp;&nbsp;
    </Space>
  ),
  alertOptionRender = defaultAlertOptionRender,
}: TableAlertProps<T>) => {
  const intl = useIntl();

  const option =
    alertOptionRender &&
    alertOptionRender({
      onCleanSelected,
      intl,
    });
  const { getPrefixCls } = useContext(ConfigContext);
  const className = getPrefixCls('pro-table-alert');
  if (alertInfoRender === false) {
    return null;
  }
  const dom = alertInfoRender({ intl, selectedRowKeys, selectedRows });
  if (dom === false || selectedRowKeys.length < 1) {
    return null;
  }
  return (
    <div className={className}>
      <Alert
        message={
          <div className={`${className}-info`}>
            <div className={`${className}-info-content`}>{dom}</div>
            {option && <div className={`${className}-info-option`}>{option}</div>}
          </div>
        }
        type="info"
        showIcon
      />
    </div>
  );
};

export default TableAlert;
