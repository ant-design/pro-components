/* eslint-disable @typescript-eslint/naming-convention */
import React, { ReactText } from 'react';
import { DataIndex } from 'rc-table/lib/interface';

/**
 * 检查值是否存在
 * 为了 避开 0 和 false
 * @param value
 */
export const checkUndefinedOrNull = (value: any) => value !== undefined && value !== null;

/**
 *  根据 key 和 dataIndex 生成唯一 id
 * @param key 用户设置的 key
 * @param dataIndex 在对象中的数据
 * @param index 序列号，理论上唯一
 */
export const genColumnKey = (
  key?: React.ReactText | undefined,
  dataIndex?: DataIndex,
  index?: number,
) => {
  if (key) {
    return key;
  }
  if (!key && dataIndex) {
    if (Array.isArray(dataIndex)) {
      return dataIndex.join('-');
    }
    return dataIndex;
  }
  return `${index}`;
};

/**
 * 删除对象中所有的空值
 * @param obj
 */
export const removeObjectNull = (obj: { [key: string]: any }) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

/**
 * 减少 width，支持 string 和 number
 */
export const reduceWidth = (width?: string | number): string | number | undefined => {
  if (width === undefined) {
    return width;
  }
  if (typeof width === 'string') {
    if (!width.includes('calc')) {
      return `calc(100% - ${width})`;
    }
    return width;
  }
  if (typeof width === 'number') {
    return (width as number) - 32;
  }
  return width;
};
