import React, { useCallback, useRef, useState } from 'react';
import type { ProFieldLightProps } from '../index';

function FieldHOC<T extends ProFieldLightProps>(
  props: T & {
    children: React.ReactNode;
    isLight?: boolean;
  },
) {
  const [labelTrigger, setLabelTrigger] = useState(false);

  const lightLabel = useRef<{
    labelRef: React.RefObject<HTMLElement>;
    clearRef: React.RefObject<HTMLElement>;
  }>(null);

  // 是label且不是label里面的clear图标触发事件
  const isTriggeredByLabel = useCallback(
    (e: React.MouseEvent) => {
      // 两条语句结果分别命名，可读性好点
      const isLabelMouseDown = lightLabel.current?.labelRef?.current?.contains(
        e.target as HTMLElement,
      );
      const isClearMouseDown = lightLabel.current?.clearRef?.current?.contains(
        e.target as HTMLElement,
      );
      return isLabelMouseDown && !isClearMouseDown;
    },
    [lightLabel],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isTriggeredByLabel(e)) {
      setLabelTrigger(true);
    }
  };
  const handleMouseUp = () => {
    setLabelTrigger(false);
  };

  if (props.isLight) {
    return (
      <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        {React.cloneElement(props.children as JSX.Element, {
          labelTrigger,
          lightLabel,
        })}
      </div>
    );
  }

  return <>{props.children as string}</>;
}

export default FieldHOC;
