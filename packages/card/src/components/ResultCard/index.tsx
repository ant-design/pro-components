import React, { useContext, useState } from 'react';
import Card from '../Card';
import { ConfigProvider, Result, Steps } from 'antd';
import { ResultProps } from 'antd/es/result';
import { CloseOutlined } from '@ant-design/icons';
import { useStyle } from './style';
import classNames from 'classnames';

type piplineType = {
  current: number;
  style?: React.CSSProperties;
  items: {
    id?: string | number;
    title?: string;
    description?: string;
  }[];
};

export type ResultCardProps = {
  result: ResultProps;
  pipline?: piplineType;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

const ResultCard: React.FC<ResultCardProps> = (props) => {
  const {
    className,
    result = {
      status: 'success',
    },
    pipline = { current: 1, style: {}, items: null },
    onClose = () => {},
    style,
    ...rest
  } = props;

  const { current = 1, style: piplineStyle, items } = pipline;
  const [open, setOpen] = useState(true);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-result-card');
  const { wrapSSR, hashId } = useStyle(prefixCls);
  const classString = classNames(prefixCls, className, hashId);

  if (!open) {
    return <></>;
  }

  return wrapSSR(
    <Card
      className={classString}
      style={style}
      {...rest}
      bordered
      bodyStyle={{
        padding: 0,
      }}
    >
      <div className={classNames(`${prefixCls}-contant`, className, hashId)}>
        {items && (
          <Steps
            direction="vertical"
            progressDot={(dot) => {
              return React.cloneElement(dot, { backgroundColor: '#fa8c16' });
            }}
            current={current}
            className={classNames(`${prefixCls}-contant-steps`, hashId)}
            style={{ ...piplineStyle }}
          >
            {items.map((step: any) => (
              <Steps.Step key={step.id} title={step.title} description={step.description} />
            ))}
          </Steps>
        )}
        <Card
          extra={
            <CloseOutlined
              onClick={() => {
                setOpen(false);
                onClose();
              }}
            />
          }
        >
          <Result {...result} />
        </Card>
      </div>
    </Card>,
  );
};

export default ResultCard;
