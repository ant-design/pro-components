/* eslint-disable react-hooks/exhaustive-deps */
import {
  get,
  set,
  warning,
} from '@rc-component/util';
import { ConfigProvider, Form } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {
  ProFormContext,
  isDeepEqualReact,
  usePrevious,
  useRefFunction,
} from '../../utils';
import { GridContext, useGridHelpers } from '../helpers';
import { genParams } from '../sync/genParams';
import { covertFormName } from './covertFormName';
import type { BaseFormProps, ProFormRef } from './BaseFormTypes';
import type { SubmitterProps } from './Submitter';
import Submitter from './Submitter';

const { noteOnce } = warning;

export const defaultExtraUrlParams = {} as Record<string, any>;

export function BaseFormComponents<T = Record<string, any>, U = Record<string, any>>(
  props: BaseFormProps<T, U> & {
    loading: boolean;
    onUrlSearchChange: (value: Record<string, string | number>) => void;
    transformKey: (values: any, omit: boolean, parentKey?: NamePath) => any;
  },
) {
  const {
    children,
    contentRender,
    submitter,
    fieldProps,
    formItemProps,
    groupProps,
    transformKey,
    formRef: propsFormRef,
    onInit,
    form,
    loading,
    formComponentType,
    extraUrlParams = defaultExtraUrlParams,
    syncToUrl,
    onUrlSearchChange,
    onReset,
    omitNil = true,
    isKeyPressSubmit,
    autoFocusFirstInput = true,
    grid,
    rowProps,
    colProps,
    ...rest
  } = props;

  const formInstance = Form.useFormInstance();

  const { componentSize } = ConfigProvider?.useConfig?.() || {
    componentSize: 'middle',
  };

  const formRef = useRef<ProFormRef<any>>((form || formInstance) as any);

  const { RowWrapper } = useGridHelpers({ grid, rowProps });

  const getFormInstance = useRefFunction(() => formInstance);

  const formatValues = useMemo(
    () => ({
      getFieldsFormatValue: (allData?: true, omitNilParam?: boolean) => {
        const formInstance = getFormInstance();
        if (!formInstance) {
          return {};
        }
        const values = formInstance.getFieldsValue(allData!);
        return transformKey(
          values,
          omitNilParam !== undefined ? omitNilParam : omitNil,
        );
      },
      getFieldFormatValue: (
        paramsNameList: NamePath = [],
        omitNilParam?: boolean,
      ) => {
        const formInstance = getFormInstance();
        if (!formInstance) {
          return undefined;
        }
        const nameList = covertFormName(paramsNameList);
        if (!nameList) throw new Error('nameList is require');
        const value = formInstance.getFieldValue(nameList!);
        const obj = nameList ? set({}, nameList as string[], value) : value;
        const newNameList = [...nameList];
        newNameList.shift();
        const transformed = transformKey(
          obj,
          omitNilParam !== undefined ? omitNilParam : omitNil,
          newNameList,
        );
        const result = get(transformed, nameList as string[]);
        if (result && typeof result === 'object' && !Array.isArray(result)) {
          const objValue = Object.values(result)[0];
          if (Array.isArray(objValue)) {
            return objValue;
          }
          return objValue;
        }
        return result;
      },
      getFieldFormatValueObject: (
        paramsNameList?: NamePath,
        omitNilParam?: boolean,
      ) => {
        const formInstance = getFormInstance();
        if (!formInstance) {
          return {};
        }
        const nameList = covertFormName(paramsNameList);
        const value = formInstance.getFieldValue(nameList!);
        const obj = nameList ? set({}, nameList as string[], value) : value;
        return transformKey(
          obj,
          omitNilParam !== undefined ? omitNilParam : omitNil,
          nameList,
        );
      },
      validateFieldsReturnFormatValue: async (
        nameList?: NamePath[],
        omitNilParam?: boolean,
      ) => {
        const formInstance = getFormInstance();
        if (!formInstance) {
          return {};
        }
        if (!Array.isArray(nameList) && nameList)
          throw new Error('nameList must be array');

        const values = await formInstance.validateFields(nameList);
        const transformedKey = transformKey(
          values,
          omitNilParam !== undefined ? omitNilParam : omitNil,
        );
        return transformedKey ? transformedKey : {};
      },
    }),
    [omitNil, transformKey, getFormInstance],
  );

  const items = useMemo(() => {
    return React.Children.toArray(children as any).map((item, index) => {
      if (index === 0 && React.isValidElement(item) && autoFocusFirstInput) {
        return React.cloneElement(item, {
          ...item.props,
          autoFocus: autoFocusFirstInput,
        });
      }
      return item;
    });
  }, [autoFocusFirstInput, children]);

  const submitterProps: SubmitterProps = useMemo(
    () => (typeof submitter === 'boolean' || !submitter ? {} : submitter),
    [submitter],
  );

  const submitterNode = useMemo(() => {
    if (submitter === false) return undefined;
    return (
      <Submitter
        key="submitter"
        {...submitterProps}
        onReset={() => {
          const finalValues = transformKey(
            formRef.current?.getFieldsValue(),
            omitNil,
          );
          submitterProps?.onReset?.(finalValues);
          onReset?.(finalValues);
          if (syncToUrl) {
            const params = Object.keys(
              transformKey(formRef.current?.getFieldsValue(), false),
            ).reduce((pre, next) => {
              return {
                ...pre,
                [next]: finalValues[next] || undefined,
              };
            }, extraUrlParams);

            onUrlSearchChange(genParams(syncToUrl, params || {}, 'set'));
          }
        }}
        submitButtonProps={{
          loading,
          ...submitterProps.submitButtonProps,
        }}
      />
    );
  }, [
    submitter,
    submitterProps,
    loading,
    transformKey,
    omitNil,
    onReset,
    syncToUrl,
    extraUrlParams,
    onUrlSearchChange,
  ]);

  const content = useMemo(() => {
    const wrapItems = grid ? <RowWrapper>{items}</RowWrapper> : items;
    if (contentRender) {
      return contentRender(wrapItems as any, submitterNode, formRef.current);
    }
    return wrapItems;
  }, [grid, RowWrapper, items, contentRender, submitterNode]);

  const preInitialValues = usePrevious(props.initialValues);

  useEffect(() => {
    if (syncToUrl || !props.initialValues || !preInitialValues || rest.request)
      return;
    const isEqual = isDeepEqualReact(props.initialValues, preInitialValues);
    noteOnce(
      isEqual,
      `initialValues 只在 form 初始化时生效，如果你需要异步加载推荐使用 request，或者 initialValues ? <Form/> : null `,
    );
    noteOnce(
      isEqual,
      `The initialValues only take effect when the form is initialized, if you need to load asynchronously recommended request, or the initialValues ? <Form/> : null `,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialValues]);

  useImperativeHandle(propsFormRef, () => {
    return {
      ...formRef.current,
      getFieldsFormatValue: (allData?: true, omitNilParam?: boolean) => {
        const formInstance = formRef.current;
        if (!formInstance) {
          return {};
        }
        const values = formInstance.getFieldsValue(allData!);
        return transformKey(
          values,
          omitNilParam !== undefined ? omitNilParam : omitNil,
        );
      },
      getFieldFormatValue: (
        paramsNameList: NamePath = [],
        omitNilParam?: boolean,
      ) => {
        const formInstance = formRef.current;
        if (!formInstance) {
          return undefined;
        }
        const nameList = covertFormName(paramsNameList);
        if (!nameList) throw new Error('nameList is require');
        const value = formInstance.getFieldValue(nameList!);
        const obj = nameList ? set({}, nameList as string[], value) : value;
        const newNameList = [...nameList];
        newNameList.shift();
        const transformed = transformKey(
          obj,
          omitNilParam !== undefined ? omitNilParam : omitNil,
          newNameList,
        );
        const result = get(transformed, nameList as string[]);
        if (result && typeof result === 'object' && !Array.isArray(result)) {
          const objValue = Object.values(result)[0];
          if (Array.isArray(objValue)) {
            return objValue;
          }
          return objValue;
        }
        return result;
      },
      getFieldFormatValueObject: (
        paramsNameList?: NamePath,
        omitNilParam?: boolean,
      ) => {
        const formInstance = formRef.current;
        if (!formInstance) {
          return {};
        }
        const nameList = covertFormName(paramsNameList);
        const value = formInstance.getFieldValue(nameList!);
        const obj = nameList ? set({}, nameList as string[], value) : value;
        return transformKey(
          obj,
          omitNilParam !== undefined ? omitNilParam : omitNil,
          nameList,
        );
      },
      validateFieldsReturnFormatValue: async (
        nameList?: NamePath[],
        omitNilParam?: boolean,
      ) => {
        const formInstance = formRef.current;
        if (!formInstance) {
          return {};
        }
        if (!Array.isArray(nameList) && nameList)
          throw new Error('nameList must be array');

        const values = await formInstance.validateFields(nameList);
        const transformedKey = transformKey(
          values,
          omitNilParam !== undefined ? omitNilParam : omitNil,
        );
        return transformedKey ? transformedKey : {};
      },
    };
  }, [omitNil, transformKey, formRef.current]);
  useEffect(() => {
    const finalValues = transformKey(
      formRef.current?.getFieldsValue?.(true),
      omitNil,
    );
    onInit?.(finalValues, {
      ...formRef.current,
      ...formatValues,
    });
  }, []);

  return (
    <ProFormContext.Provider
      value={{
        ...formatValues,
        formRef,
      }}
    >
      <ConfigProvider componentSize={rest.size || componentSize}>
        <GridContext.Provider value={{ grid, colProps }}>
          {rest.component !== false && (
            <input
              type="text"
              style={{
                display: 'none',
              }}
            />
          )}
          {content}
        </GridContext.Provider>
      </ConfigProvider>
    </ProFormContext.Provider>
  );
}
