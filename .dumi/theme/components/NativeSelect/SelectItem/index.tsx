import { FC, ForwardedRef, forwardRef } from 'react';

import { useStyles } from './style';

interface SelectItemProps {
  value: any;
  label: any;
  prefixCls?: string;
  isSelected?: boolean;
  isActive?: boolean;
  ref?: ForwardedRef<HTMLButtonElement>;
  disabled?: boolean;
}

const SelectItem: FC<SelectItemProps> = forwardRef(
  ({ value, label, prefixCls, isSelected, isActive, disabled, ...props }, ref) => {
    const { styles, cx } = useStyles({ prefixCls, selected: isSelected });

    return (
      <button
        key={value}
        disabled={disabled}
        aria-selected={isSelected}
        role="option"
        tabIndex={-1}
        className={cx(styles.item, {
          [styles.selected]: isSelected,
          [styles.active]: isActive,
        })}
        ref={ref}
        {...props}
      >
        {label}
      </button>
    );
  },
);

export default SelectItem;
