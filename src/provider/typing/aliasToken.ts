import type { GlobalToken } from 'antd';
import type { ProTokenType } from './layoutToken';

export type ProAliasToken = GlobalToken &
  ProTokenType & {
    themeId: number;
    /** Pro component class prefix, for example `.ant-pro`. */
    proComponentsCls: string;
    /** Ant Design component class prefix, for example `.ant`. */
    antCls: string;
    /** Ant Design icon class prefix. */
    iconCls: string;
  };
