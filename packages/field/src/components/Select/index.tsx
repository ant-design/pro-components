import React, { ReactNode, useState, useImperativeHandle, useEffect, useRef } from 'react';
import { Select } from 'antd';
import TableStatus, { StatusType } from './status';
import { FieldFC } from '../../index';

export type ValueEnumObj = {
  [key: string]:
    | {
        text: ReactNode;
        status: StatusType;
      }
    | ReactNode;
};

export type ValueEnumMap = Map<
  React.ReactText,
  | {
      text: ReactNode;
      status: StatusType;
    }
  | ReactNode
>;

/**
 * 转化 text 和 valueEnum
 * 通过 type 来添加 Status
 * @param text
 * @param valueEnum
 * @param pure 纯净模式，不增加 status
 */
export const parsingText = (text: string | number, valueEnum?: ValueEnumMap, pure?: boolean) => {
  if (!valueEnum) {
    return text;
  }

  if (!valueEnum.has(text) && !valueEnum.has(`${text}`)) {
    return text;
  }

  const domText = (valueEnum.get(text) || valueEnum.get(`${text}`)) as {
    text: ReactNode;
    status: StatusType;
  };
  if (domText.status) {
    if (pure) {
      return domText.text;
    }
    const { status } = domText;
    const Status = TableStatus[status || 'Init'];
    if (Status) {
      return <Status>{domText.text}</Status>;
    }
  }
  return domText.text || domText;
};

/**
 * 获取类型的 type
 * @param obj
 */
function getType(obj: any) {
  // @ts-ignore
  const type = Object.prototype.toString
    .call(obj)
    .match(/^\[object (.*)\]$/)[1]
    .toLowerCase();
  if (type === 'string' && typeof obj === 'object') return 'object'; // Let "new String('')" return 'object'
  if (obj === null) return 'null'; // PhantomJS has type "DOMWindow" for null
  if (obj === undefined) return 'undefined'; // PhantomJS has type "DOMWindow" for undefined
  return type;
}

/**
 * 把 value 的枚举转化为数组
 * @param valueEnum
 */
export const parsingValueEnumToArray = (
  valueEnum: ValueEnumMap | undefined = new Map(),
): {
  value: string | number;
  text: string;
}[] => {
  const enumArray: {
    value: string | number;
    text: string;
  }[] = [];
  valueEnum.forEach((_, key) => {
    if (!valueEnum.has(key) && !valueEnum.has(`${key}`)) {
      return;
    }
    const value = (valueEnum.get(key) || valueEnum.get(`${key}`)) as {
      text: string;
    };
    if (!value) {
      return;
    }

    if (typeof value === 'object' && value?.text) {
      enumArray.push({
        text: (value?.text as unknown) as string,
        value: key,
      });
      return;
    }
    enumArray.push({
      text: ((value || '') as unknown) as string,
      value: key,
    });
  });
  return enumArray;
};

export const ObjToMap = (
  value: ValueEnumObj | ValueEnumMap | undefined,
): ValueEnumMap | undefined => {
  if (!value) {
    return value;
  }
  if (getType(value) === 'map') {
    return value as ValueEnumMap;
  }
  return new Map(Object.entries(value));
};

export type RequestData = (
  props: FieldSelectProps,
) => Promise<
  {
    label: React.ReactNode;
    value: React.ReactText;
  }[]
>;
export type FieldSelectProps = {
  text: string;
  /**
   * 值的枚举，如果存在枚举，Search 中会生成 select
   */
  valueEnum?: ValueEnumMap | ValueEnumObj;

  /**
   * 从服务器读取选项
   */
  request?: RequestData;
};

const useFetchData = (
  props: FieldSelectProps,
): [
  boolean,
  {
    label: React.ReactNode;
    value: React.ReactText;
  }[],
  () => void,
] => {
  const [options, setOptions] = useState<
    {
      label: React.ReactNode;
      value: React.ReactText;
    }[]
  >(() =>
    parsingValueEnumToArray(ObjToMap(props.valueEnum)).map(({ value, text }) => ({
      label: text,
      value,
    })),
  );
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async () => {
    if (!props.request) {
      return;
    }
    setLoading(true);
    const data = await props.request(props);
    setOptions(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [props]);
  return [loading, options, fetchData];
};

/**
 * 可以根据  valueEnum 来进行类型的设置
 * @param
 */
const FieldSelect: FieldFC<FieldSelectProps> = (props, ref) => {
  const {
    mode,
    valueEnum,
    render,
    renderFormItem,
    request,
    formItemProps,
    plain,
    children,
    ...rest
  } = props;
  const inputRef = useRef();
  const [loading, options, fetchData] = useFetchData(props);

  useImperativeHandle(ref, () => ({
    ...(inputRef.current || {}),
    fetchData: () => fetchData(),
  }));

  if (mode === 'read') {
    const dom = (
      <>
        {parsingText(
          rest.text,
          ObjToMap(valueEnum) ||
            ObjToMap(
              options.reduce((pre: any, cur) => {
                return { ...pre, [cur.value]: cur.label };
              }, {}),
            ),
          plain,
        )}
      </>
    );
    if (render) {
      return render(rest.text, { mode, ...formItemProps }, dom);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <Select
        style={{
          minWidth: 100,
        }}
        loading={loading}
        ref={inputRef}
        defaultValue={rest.text}
        allowClear
        {...rest}
        {...formItemProps}
        options={options}
      >
        {children}
      </Select>
    );
    if (renderFormItem) {
      return renderFormItem(rest.text, { mode, ...formItemProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldSelect);
