import { theme } from 'antd';
import { useEffect, useMemo } from 'react';
import { getCustomToken } from '../../styles/customToken';
import { useThemeMode } from '../../utils/useThemeMode';
import { setCSSVariables } from '../../utils/setCSSVariables';

const { useToken } = theme;

export const useStyles = () => {
  const { token } = useToken();
  const { isDarkMode } = useThemeMode();
  const siteToken = useMemo(() => getCustomToken(isDarkMode, token), [isDarkMode, token]);

  useEffect(() => {
    setCSSVariables(token, siteToken, isDarkMode);
  }, [token, siteToken, isDarkMode]);

  const classNames = useMemo(
    () => ({
      container: 'dumi-footer-container',
      footer: 'dumi-footer-footer',
    }),
    [],
  );

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
