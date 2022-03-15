import type { RowProps, ColProps } from 'antd';
import { Row, Col } from 'antd';
import { useMemo } from 'react';

export interface GridHelpers {
  WrapperRow: React.FC<RowProps>;
  WrapperCol: React.FC<ColProps>;
  grid: boolean;
}

export const gridHelpers: (grid?: boolean) => GridHelpers = (grid) => ({
  grid: !!grid,
  WrapperRow({ children, ...props }) {
    return grid ? (
      <Row gutter={8} {...props}>
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
      <Col {...defaultColProps} {...props}>
        {children}
      </Col>
    );
  },
});

export const useGridHelpers = (grid: boolean | undefined) => {
  return useMemo(() => gridHelpers(grid), [grid]);
};
