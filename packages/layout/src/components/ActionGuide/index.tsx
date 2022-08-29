import { Button, ConfigProvider, Popover, Space } from 'antd';
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import { useContext } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActionGuideContextConsumer, ActionGuideContextProvider } from './context';
import type {
  ActionGuideAction,
  ActionGuideContainerProps,
  ActionGuideItemProps,
  PaginationProps,
} from './interface';
import { useStyle } from './style';
import classNames from 'classnames';

/**
 * 用于递归遍历 children 中所有合法的`React.Element`，我们可以通过这个方法统计在`ActionGuideContainer`下包含几个`ActionGuideItem`
 * @param children
 * @param fn
 */
function recursiveMap(children: ReactNode, fn: (child: ReactNode) => any): void {
  React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      /* istanbul ignore next */
      return;
    }

    const keys = Object.keys(child.props);
    keys.forEach((key) => {
      // @ts-ignore
      const prop = child.props[key];
      if (React.isValidElement(prop)) {
        recursiveMap(prop, fn);
      } else if (typeof prop === 'object') {
        Object.keys(prop).forEach((k) => {
          if (React.isValidElement(prop[k])) {
            recursiveMap(prop[k], fn);
          }
        });
      } else if (Array.isArray(prop)) {
        /* istanbul ignore next */
        recursiveMap(
          /* istanbul ignore next */
          prop.filter((item) => React.isValidElement(item)),
          fn,
        );
      }
    });

    fn(child);
  });
}

/**
 * 根据传入的总数、当前页码和实际显示的分页项数量计算需要渲染的分页项
 * @param total 总共有几页
 * @param cur 当前在第几页
 * @param showPaginationSize 要展示的分页项数量
 * @returns
 */
function getPageItem(total: number, cur: number, showPaginationSize: number): number[] {
  if (cur < 0) return [];
  let p = 0;
  let l = 0;
  let r = l + showPaginationSize - 1;
  let mid = (l + r) >> 1;
  while (p !== cur) {
    if (p < mid) {
      p++;
      continue;
    }
    if (r === total - 1) {
      p++;
      continue;
    }
    p++;
    l++;
    r++;
    mid = (l + r) >> 1;
  }
  return new Array(total)
    .fill(0)
    .map((_item, idx) => idx)
    .filter((_item, idx) => idx >= l && idx <= r);
}
const Pagination: React.FC<PaginationProps> = (props) => {
  const { theme, total, cur, clickabled = true, onChange, showPaginationSize = 3 } = props;
  const list = getPageItem(total, cur - 1, showPaginationSize);

  return (
    <div className={`pagination ${theme === 'dot' ? `theme-dot` : `theme-index`} ${props.hashId}`}>
      {list.map((item, idx) => (
        <div
          key={idx}
          className={`pagination-item ${cur === item + 1 ? 'cur' : ''} ${props.hashId}`}
          onClick={() => {
            if (!clickabled) return;
            onChange(idx + 1);
          }}
        >
          {theme === 'index' ? item + 1 : ''}
        </div>
      ))}
    </div>
  );
};
export const ActionGuideContainer: React.FC<PropsWithChildren<ActionGuideContainerProps>> = (
  props,
) => {
  const {
    defaultIndex = -1,
    children,
    actionRef,
    curShadow,
    scrollToTarget = true,
    onChange = () => true,
  } = props;
  const [curIdx, setCurIdx] = useState(defaultIndex);
  const [itemCnt, setItemCnt] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const timer = useRef<any>();
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const prefixCls = getPrefixCls('pro-action-guide', props.prefixCls);

  const { wrapSSR, hashId } = useStyle(prefixCls);
  const action: ActionGuideAction = {
    show: async (idx) => {
      if (idx === -1) {
        setCurIdx(idx as number);
        return;
      }
      let realIdx: number;
      if (idx === 'first') {
        realIdx = 1;
      } else if (idx === 'last') {
        realIdx = itemCnt;
      } else {
        realIdx = idx;
      }
      const isContinue = await onChange({ curIdx: realIdx, total: itemCnt });

      if (!isContinue) {
        return;
      }

      setCurIdx(realIdx);

      if (scrollToTarget && realIdx >= 0) {
        timer.current = setTimeout(() => {
          const target = document.querySelector('.ant-popover-open');
          target?.scrollIntoView?.({ block: 'center', behavior: 'smooth', inline: 'center' });
        }, 100);
      }
    },
  };
  useEffect(() => {
    if (actionRef) {
      actionRef.current = action;
    }
  }, [itemCnt]);
  useEffect(() => {
    let cnt = 0;
    recursiveMap(children, (child) => {
      /* istanbul ignore next */
      if (!child) return;
      // @ts-ignore
      if (child.type.displayName === 'ActionGuideItem') {
        // eslint-disable-next-line no-param-reassign
        cnt++;
      }
    });
    setItemCnt(cnt);
  }, [children, props]);

  useEffect(() => {
    /* istanbul ignore next */
    window.onscroll = function () {
      /* istanbul ignore next */
      const mask = document.querySelector(`.${prefixCls}-mask`) as HTMLDivElement;
      /* istanbul ignore next */
      if (mask) {
        /* istanbul ignore next */
        setScrollTop(document.scrollingElement?.scrollTop || 0);
      }
    };
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const style = useMemo<CSSProperties>(
    () =>
      ({
        '--boxShadow':
          curShadow === false ? 'none' : curShadow === undefined ? '0 0 15px #333' : curShadow,
      } as CSSProperties),
    [curShadow],
  );
  return wrapSSR(
    <ActionGuideContextProvider
      value={{
        ...props,
        action,
        curIdx,
        total: itemCnt,
        scrollTop,
        hashId,
        prefixCls,
      }}
    >
      <div className={classNames(`${prefixCls}-container`, hashId)} style={style}>
        {children}
      </div>
    </ActionGuideContextProvider>,
  );
};
ActionGuideContainer.displayName = 'ActionGuideContainer';

export const ActionGuideItem: React.FC<PropsWithChildren<ActionGuideItemProps>> = (props) => {
  const { children, content, step, popoverProps = {} } = props;
  return (
    <ActionGuideContextConsumer>
      {(ctx) => {
        /* istanbul ignore next */
        if (!ctx) return null;
        const defaultPagination = (
          <Pagination
            total={ctx.total}
            cur={ctx.curIdx}
            theme={ctx.paginationTheme ?? 'dot'}
            onChange={(idx) => ctx.action.show(idx)}
            showPaginationSize={ctx.showPaginationSize}
            clickabled={ctx.paginationClickabled}
            hashId={ctx.hashId}
          />
        );
        const displayTitle = ctx?.title
          ? typeof ctx.title === 'function'
            ? ctx.title(ctx.curIdx)
            : ctx.title
          : null;
        const displayPagination =
          ctx?.pagination === false
            ? null
            : ctx?.pagination === undefined
            ? defaultPagination
            : ctx.pagination(ctx.curIdx, ctx.total, ctx.action);
        const userContent = typeof content === 'function' ? content(ctx.curIdx) : content;
        const defaultBtn = [
          <Button
            type="primary"
            key="nextBtn"
            size="small"
            className={classNames('nextBtn', ctx.hashId)}
            onClick={() => {
              if (ctx.curIdx === ctx.total) {
                ctx.action.show(-1);
              } else {
                ctx.action.show(ctx.curIdx + 1);
              }
            }}
          >
            {ctx.curIdx === ctx.total || ctx.curIdx === -1 ? '我知道了' : '下一步'}
          </Button>,
        ];
        if (ctx.curIdx < ctx.total && ctx.canSkip !== false) {
          defaultBtn.push(
            <Button
              key="skipBtn"
              type="link"
              className={classNames('skipBtn', ctx.hashId)}
              size="small"
              onClick={() => {
                ctx.action.show(-1);
              }}
            >
              跳过
            </Button>,
          );
        }
        const buttons = ctx.renderButton
          ? ctx.renderButton({
              curIdx: ctx.curIdx,
              total: ctx.total,
              next: () => ctx.action.show(ctx.curIdx + 1),
              go: ctx.action.show,
              skip: () => ctx.action.show(-1),
            })
          : defaultBtn;
        const displayContent = (
          <div className={`${ctx.prefixCls}-content-box ${ctx.hashId}`}>
            <div className={`content-container ${ctx.hashId}`}>{userContent}</div>
            <div className={`footer-container ${ctx.hashId}`}>
              <div className={`pagination-box ${ctx.hashId}`}>{displayPagination}</div>
              <div className={`btn-group ${ctx.hashId}`}>
                <Space size="small">{buttons}</Space>
              </div>
            </div>
          </div>
        );

        const visible = ctx.curIdx === step;
        return (
          <>
            {ctx.mask !== false && visible && (
              <div
                className={`${ctx.prefixCls}-mask ${ctx.hashId}`}
                style={{ top: ctx.scrollTop }}
              />
            )}
            <Popover
              title={displayTitle}
              content={displayContent}
              open={visible}
              destroyTooltipOnHide
              /** 从父级继承过来的属性，比每个项单独配置的优先级低 */
              {...(ctx.popoverProps ?? {})}
              /** 每个项单独配置的属性 */
              {...popoverProps}
            >
              {/* istanbul ignore next */}
              {React.isValidElement(children)
                ? React.cloneElement<any>(children, {
                    style: {
                      ...(children.props.style || {}),
                      zIndex: visible ? 1002 : children.props?.style?.zIndex,
                      position:
                        (visible && !children.props?.style?.position) ||
                        children.props?.style?.position === 'static'
                          ? 'relative'
                          : children.props?.style?.position,
                    },
                  })
                : /* istanbul ignore next */
                  children}
            </Popover>
          </>
        );
      }}
    </ActionGuideContextConsumer>
  );
};

ActionGuideItem.displayName = 'ActionGuideItem';
