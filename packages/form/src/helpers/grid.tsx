import type { ColProps, RowProps } from 'antd';
import { Col, Row } from 'antd';
import { useContext, useMemo } from 'react';
import FieldContext from '../FieldContext';
import type { ProFormGridConfig } from '../interface';

interface CommonProps {
  Wrapper?: React.FC<any>;
}

export interface GridHelpers {
  RowWrapper: React.FC<RowProps & CommonProps>;
  ColWrapper: React.FC<ColProps & CommonProps>;
  grid: boolean;
}

export const gridHelpers: (config: ProFormGridConfig & CommonProps) => GridHelpers = ({
  grid,
  rowProps,
  colProps,
}) => ({
  grid: !!grid,
  RowWrapper({ children, Wrapper, ...props } = {}) {
    if (!grid) {
      return Wrapper ? <Wrapper>{children}</Wrapper> : (children as any);
    }

    return (
      <Row gutter={8} {...rowProps} {...props}>
        {children}
      </Row>
    );
  },
  ColWrapper({ children, Wrapper, ...rest } = {}) {
    const props = useMemo(() => {
      const originProps = { ...colProps, ...rest };

      /**
       * `xs` takes precedence over `span`
       * avoid `span` doesn't work
       */
      if (typeof originProps.span === 'undefined' && typeof originProps.xs === 'undefined') {
        originProps.xs = 24;
      }

      return originProps;
    }, [rest]);

    if (!grid) {
      return Wrapper ? <Wrapper>{children}</Wrapper> : children;
    }

    return (<Col {...props}>{children}</Col>) as any;
  },
});

export const useGridHelpers = (props?: (ProFormGridConfig & CommonProps) | boolean) => {
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
        Wrapper: config?.Wrapper,
      }),
    [config?.Wrapper, config?.colProps, config.grid, config?.rowProps, grid],
  );
};
