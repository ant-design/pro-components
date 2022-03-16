import type { RowProps, ColProps } from 'antd';
import { Row, Col } from 'antd';
import { useContext, useMemo } from 'react';
import FieldContext from '../FieldContext';
import type { ProFormGridConfig } from '../interface';

export interface GridHelpers {
  WrapperRow: React.FC<RowProps>;
  WrapperCol: React.FC<ColProps>;
  grid: boolean;
}

export const gridHelpers: (config: ProFormGridConfig) => GridHelpers = ({
  grid,
  rowProps,
  colProps,
}) => ({
  grid: !!grid,
  WrapperRow({ children, ...props }) {
    return grid ? (
      <Row gutter={8} {...rowProps} {...props}>
        {children}
      </Row>
    ) : (
      (children as any)
    );
  },
  WrapperCol({ children, ...rest }) {
    const props = { ...colProps, ...rest };
    const defaultColProps = useMemo(() => {
      /**
       * `xs` takes precedence over `span`
       * avoid `span` doesn't work
       */
      if (props?.span === undefined) {
        return {
          xs: 24,
        };
      }
      return {};
    }, [props?.span]);

    if (!grid) {
      return children as any;
    }

    return (
      <Col {...defaultColProps} {...props}>
        {children}
      </Col>
    );
  },
});

export const useGridHelpers = (props?: ProFormGridConfig | boolean) => {
  const config = useMemo(() => {
    {
      if (typeof props === 'object') {
        return props;
      }
      return {
        grid: props,
      };
    }
  }, [props]);

  const { grid } = useContext(FieldContext);

  return useMemo(
    () =>
      gridHelpers({
        grid: !!(grid || config.grid),
        rowProps: config?.rowProps,
        colProps: config?.colProps,
      }),
    [config?.colProps, config.grid, config?.rowProps, grid],
  );
};
