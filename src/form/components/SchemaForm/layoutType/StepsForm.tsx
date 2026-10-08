import React, { useCallback, useMemo } from 'react';
import { useLatest } from '../../../../utils';
import { StepsForm as ProStepsForm } from '../../../layouts/StepsForm';
import type { ProFormGridConfig } from '../../../typing';
import type { FormSchema, ProFormPropsType } from '../typing';

type StepsFormProps<T, ValueType> = ProFormPropsType<T, ValueType> &
  Pick<FormSchema, 'steps'> & {
    layoutType: 'StepsForm';
    forceUpdate: React.Dispatch<React.SetStateAction<[]>>;
    SchemaForm: React.ComponentType<any>;
  } & Pick<ProFormGridConfig, 'grid'>;

const StepsForm = <T, ValueType>({
  steps,
  columns,
  forceUpdate,
  grid,
  SchemaForm,
  ...props
}: StepsFormProps<T, ValueType>) => {
  const propsRef = useLatest(props);

  /**
   * Fixed StepsForm toggle step causing formRef to update
   */
  const onCurrentChange = useCallback(
    (current: number) => {
      propsRef.current.onCurrentChange?.(current);
      forceUpdate([]);
    },
    [forceUpdate, propsRef],
  );

  const StepDoms = useMemo(() => {
    return steps?.map((step, index) => (
      <SchemaForm
        grid={grid}
        {...(step as FormSchema<T, ValueType>)}
        key={index}
        layoutType="StepForm"
        columns={columns[index]}
      />
    ));
  }, [columns, grid, steps]);

  return (
    <ProStepsForm {...props} onCurrentChange={onCurrentChange}>
      {StepDoms}
    </ProStepsForm>
  );
};

export default StepsForm;
