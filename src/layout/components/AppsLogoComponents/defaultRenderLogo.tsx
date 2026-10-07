import type React from 'react';

/** Render a string logo as an image, or return the supplied node. */
export const defaultRenderLogo = (
  logo: React.ReactNode | (() => React.ReactNode),
): React.ReactNode => {
  if (typeof logo === 'string') {
    return <img width="auto" height={22} src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};
