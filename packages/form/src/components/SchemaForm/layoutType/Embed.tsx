import classNames from 'classnames';
import { FormProps } from 'antd';

const Embed: React.FC<{ children: any; layout: FormProps['layout'] }> = ({
  children,
  layout,
}) => (
  <div className={classNames('ant-form', layout && `ant-form-${layout}`)}>
    {children}
  </div>
);

export default Embed;
