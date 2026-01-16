import { useEffect } from 'react';
import { theme } from 'antd';
import { getCustomToken } from '../../styles/customToken';
import { useThemeMode } from '../../utils/useThemeMode';
import { setCSSVariables } from '../../utils/setCSSVariables';

export const GlobalStyle: React.FC = () => {
  const { token } = theme.useToken();
  const { isDarkMode } = useThemeMode();
  const siteToken = getCustomToken(isDarkMode, token);

  useEffect(() => {
    setCSSVariables(token, siteToken, isDarkMode);
  }, [token, siteToken, isDarkMode]);

  return null;
};
