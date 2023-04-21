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
  pipeline?: piplineType;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
  mode?: 'card' | 'pages';
};

const ResultCard: React.FC<ResultCardProps> = (props) => {
  const {
    className,
    result = {
      status: 'success',
    },
    mode = 'card',
    pipeline = { current: 1, style: {}, items: null },
    onClose = () => {},
    style,
    ...rest
  } = props;

  const { current = 1, style: pipelineStyle, items } = pipeline;
  const [open, setOpen] = useState(true);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-result-card');
  const { wrapSSR, hashId } = useStyle(prefixCls);
  const classString = classNames(prefixCls, className, hashId, `${prefixCls}-${mode}-mode`);

  if (!open) {
    return <></>;
  }

  return wrapSSR(
    <Card
      className={classString}
      style={style}
      bordered={mode === 'card'}
      bodyStyle={{
        padding: 0,
      }}
      {...rest}
    >
      <div className={classNames(`${prefixCls}-contant`, className, hashId)}>
        {items && (
          <div className={classNames(`${prefixCls}-pipeline`, hashId)}>
            <Steps
              direction="vertical"
              progressDot={(dot) => {
                return React.cloneElement(dot, { backgroundColor: '#fa8c16' });
              }}
              current={current}
              className={classNames(`${prefixCls}-pipeline-steps`, hashId)}
              style={{ ...pipelineStyle }}
            >
              {items.map((step: any) => (
                <Steps.Step key={step.id} title={step.title} description={step.description} />
              ))}
            </Steps>
          </div>
        )}
        <div className={classNames(`${prefixCls}-result`, hashId)}>
          {mode === 'card' && (
            <CloseOutlined
              className={classNames(`${prefixCls}-result-extra`, hashId)}
              onClick={() => {
                setOpen(false);
                onClose();
              }}
            />
          )}
          <Result {...result} />
        </div>
      </div>
    </Card>,
  );
};

export default ResultCard;
