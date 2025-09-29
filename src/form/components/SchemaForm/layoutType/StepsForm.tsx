import React, { useCallback, useMemo } from 'react';
import { useLatest } from '../../../../utils';
import { StepsForm as ProStepsForm } from '../../../layouts/StepsForm';
import type { ProFormGridConfig } from '../../../typing';
import BetaSchemaForm from '../index';
import type { FormSchema, ProFormPropsType } from '../typing';

type StepsFormProps<T, ValueType> = ProFormPropsType<T, ValueType> &
  Pick<FormSchema, 'steps'> & {
    layoutType: 'StepsForm';
    forceUpdate: React.Dispatch<React.SetStateAction<[]>>;
  } & Pick<ProFormGridConfig, 'grid'>;

const StepsForm = <T, ValueType>({ steps, columns, forceUpdate, grid, ...props }: StepsFormProps<T, ValueType>) => {
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
      <BetaSchemaForm<T, ValueType>
        grid={grid}
        {...(step as FormSchema<T, ValueType>)}
        key={index}
        columns={columns[index]}
        layoutType="StepForm"
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
