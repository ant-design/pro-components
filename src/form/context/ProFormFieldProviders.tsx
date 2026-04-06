import React from 'react';
import { ProConfigProvider } from '../../provider';
import { FormListContext } from '../components/List';
import FieldContext from '../FieldContext';
import type { FiledContextProps } from '../FieldContext';
import { EditOrReadOnlyContext } from '../BaseForm/EditOrReadOnlyContext';

export type ProFormFieldProvidersProps = {
  readonly?: boolean;
  fieldContextValue: FiledContextProps;
  children: React.ReactNode;
};

/**
 * 聚合只读/编辑、Field、FormList、Pro 配置等 Context，减轻 BaseForm 嵌套。
 */
export function ProFormFieldProviders({
  readonly,
  fieldContextValue,
  children,
}: ProFormFieldProvidersProps) {
  return (
    <EditOrReadOnlyContext.Provider
      value={{
        mode: readonly ? 'read' : 'edit',
      }}
    >
      <ProConfigProvider needDeps>
        <FieldContext.Provider value={fieldContextValue}>
          <FormListContext.Provider value={{}}>{children}</FormListContext.Provider>
        </FieldContext.Provider>
      </ProConfigProvider>
    </EditOrReadOnlyContext.Provider>
  );
}
