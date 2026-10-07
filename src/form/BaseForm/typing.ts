import type { FormInstance } from 'antd';
import type { ProFormInstanceType } from '../../utils/components/ProFormContext';

export type ProFormInstance<T = any> = FormInstance<T> & ProFormInstanceType<T>;

export type ProFormRef<T> = ProFormInstance<T> & {
  nativeElement?: HTMLElement;
  focus?: () => void;
};

export type SyncToUrl<T> = boolean | ((values: T, type: 'get' | 'set') => T);
