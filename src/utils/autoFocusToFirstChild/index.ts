import React from 'react';

/**
 * 将 autoFocus 应用到第一个子节点；若首个子节点是 Fragment，则递归应用到其第一个子节点，
 * 避免向 React.Fragment 传入非法 props。
 */
export function autoFocusToFirstChild(
  node: React.ReactNode,
  autoFocus: boolean,
): React.ReactNode {
  if (!autoFocus || !React.isValidElement(node)) return node;
  if (node.type === React.Fragment) {
    const children = React.Children.toArray(node.props.children);
    const newChildren = children.map((child, index) =>
      index === 0 ? autoFocusToFirstChild(child, autoFocus) : child,
    );
    return React.cloneElement(node, {}, ...newChildren);
  }
  return React.cloneElement(node, {
    ...(node.props as any),
    autoFocus,
  });
}
