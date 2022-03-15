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
      <>{children}</>
    );
  },
  WrapperCol({ children, ...props }) {
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
      return <>{children}</>;
    }

    return (
      <Col {...defaultColProps} {...colProps} {...props}>
        {children}
      </Col>
    );
  },
});

export const useGridHelpers = (
  ...props: [(ProFormGridConfig | boolean)?] | [boolean, ProFormGridConfig?]
) => {
  const config = useMemo(() => {
    const prop = props[0];
    if (props.length === 2) {
      return {
        grid: prop,
        ...props[1],
      };
    } else {
      if (typeof prop === 'object') {
        return prop;
      }
      return {
        grid: prop,
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
