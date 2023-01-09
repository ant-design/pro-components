import { NavLink } from 'dumi';

type INavigateProps = {
  children: React.ReactNode;
  href?: string;
  target?: string;
};

// URL地址 正则表达式
export const URLReg = new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/);

export const Navigate = (props: INavigateProps) => {
  const { children, href, target } = props || {};
  if (href && !URLReg.test(href)) {
    return (
      <NavLink to={href} target={target}>
        {children}
      </NavLink>
    );
  }
  return (
    <a href={href} target={target} rel="noreferrer">
      {children}
    </a>
  );
};
