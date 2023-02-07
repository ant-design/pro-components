import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  inner,
  offset,
  shift,
  SideObject,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInnerOffset,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import useControlledState from 'use-merge-value';

import SelectItem from './SelectItem';
import { useStyles } from './style';

interface OptionType {
  label: ReactNode;
  icon?: ReactNode;
  value: string | number | null;
}
export interface NativeSelectProps {
  value?: number;
  options?: OptionType[];
  prefixCls?: string;
  onChange?: (index: number) => void;
  renderValue?: (index: number) => ReactNode;
  renderItem: (item: OptionType, index: number) => ReactNode;
}

const NativeSelect: FC<NativeSelectProps> = ({
  options = [],
  value,
  prefixCls,
  onChange,
  renderValue,
  renderItem,
}) => {
  const cls = prefixCls ?? 'native-select';
  const [selectedIndex, setSelectedIndex] = useControlledState<number>(0, { value, onChange });

  const { styles } = useStyles(cls);
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const listContentRef = useRef<Array<string | null>>([]);
  const overflowRef = useRef<SideObject>(null);
  const allowSelectRef = useRef(false);
  const allowMouseUpRef = useRef(true);
  const selectTimeoutRef = useRef<any>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [fallback, setFallback] = useState(false);
  const [innerOffset, setInnerOffset] = useState(0);
  const [touch, setTouch] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [blockSelection, setBlockSelection] = useState(false);

  if (!open) {
    if (innerOffset !== 0) setInnerOffset(0);
    if (fallback) setFallback(false);
    if (blockSelection) setBlockSelection(false);
  }

  const { x, y, strategy, refs, context, isPositioned } = useFloating({
    placement: 'bottom-start',
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: fallback
      ? [
          offset(5),
          touch ? shift({ crossAxis: true, padding: 10 }) : flip({ padding: 10 }),
          size({
            apply({ availableHeight }) {
              Object.assign(scrollRef.current?.style ?? {}, {
                maxHeight: `${availableHeight}px`,
              });
            },
            padding: 10,
          }),
        ]
      : [
          inner({
            listRef,
            overflowRef,
            scrollRef,
            index: selectedIndex,
            offset: innerOffset,
            onFallbackChange: setFallback,
            padding: 10,
            minItemsVisible: touch ? 8 : 4,
            referenceOverflowThreshold: 20,
          }),
          offset({ crossAxis: -4 }),
        ],
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context, { event: 'mousedown' }),
    useDismiss(context),
    useRole(context, { role: 'listbox' }),
    useInnerOffset(context, {
      enabled: !fallback,
      onChange: setInnerOffset,
      overflowRef,
      scrollRef,
    }),
    useListNavigation(context, {
      listRef,
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
    }),
    useTypeahead(context, {
      listRef: listContentRef,
      activeIndex,
      onMatch: open ? setActiveIndex : setSelectedIndex,
    }),
  ]);

  useEffect(() => {
    if (open) {
      selectTimeoutRef.current = setTimeout(() => {
        allowSelectRef.current = true;
      }, 300);

      return () => {
        clearTimeout(selectTimeoutRef.current);
      };
    } else {
      allowSelectRef.current = false;
      allowMouseUpRef.current = true;
    }
    return () => [];
  }, [open]);

  const handleArrowScroll = (amount: number) => {
    if (fallback) {
      if (scrollRef.current) {
        scrollRef.current.scrollTop -= amount;
        flushSync(() => setScrollTop(scrollRef.current?.scrollTop ?? 0));
      }
    } else {
      flushSync(() => setInnerOffset((value) => value - amount));
    }
  };

  const handleArrowHide = () => {
    if (touch) {
      clearTimeout(selectTimeoutRef.current);
      setBlockSelection(true);
      selectTimeoutRef.current = setTimeout(() => {
        setBlockSelection(false);
      }, 400);
    }
  };

  const { label } = options[selectedIndex] || {};

  return (
    <>
      <button
        ref={refs.setReference}
        className={styles.button}
        {...getReferenceProps({
          onTouchStart() {
            setTouch(true);
          },
          onPointerMove({ pointerType }) {
            if (pointerType === 'mouse') {
              setTouch(false);
            }
          },
        })}
      >
        {renderValue ? renderValue(selectedIndex) : label}
      </button>

      <FloatingPortal>
        {open && (
          <FloatingOverlay lockScroll={!touch} style={{ zIndex: 3000 }}>
            <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
              <div
                ref={refs.setFloating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                }}
              >
                <div
                  className={styles.container}
                  style={{ overflowY: 'auto' }}
                  ref={scrollRef}
                  {...getFloatingProps({
                    onScroll({ currentTarget }) {
                      setScrollTop(currentTarget.scrollTop);
                    },
                    onContextMenu(e) {
                      e.preventDefault();
                    },
                  })}
                >
                  {options.map((item, i) => {
                    return (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        label={renderItem ? renderItem(item, i) : item.label}
                        // Prevent immediate selection on touch devices when
                        // pressing the ScrollArrows
                        disabled={blockSelection}
                        isSelected={i === selectedIndex}
                        isActive={i === activeIndex}
                        ref={(node) => {
                          listRef.current[i] = node;
                          listContentRef.current[i] = item.label as string;
                        }}
                        {...getItemProps({
                          onTouchStart() {
                            allowSelectRef.current = true;
                            allowMouseUpRef.current = false;
                          },
                          onKeyDown() {
                            allowSelectRef.current = true;
                          },
                          onClick() {
                            if (allowSelectRef.current) {
                              setSelectedIndex(i);
                              setOpen(false);
                            }
                          },
                          onMouseUp() {
                            if (!allowMouseUpRef.current) {
                              return;
                            }

                            if (allowSelectRef.current) {
                              setSelectedIndex(i);
                              setOpen(false);
                            }

                            // On touch devices, prevent the element from
                            // immediately closing `onClick` by deferring it
                            clearTimeout(selectTimeoutRef.current);
                            selectTimeoutRef.current = setTimeout(() => {
                              allowSelectRef.current = true;
                            });
                          },
                        })}
                      />
                    );
                  })}
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
};

export default NativeSelect;
