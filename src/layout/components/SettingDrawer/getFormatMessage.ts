import { gLocaleObject } from '../../locales';

export const getFormatMessage = (): ((data: {
  id: string;
  defaultMessage?: string;
}) => string) => {
  const formatMessage = ({
    id,
  }: {
    id: string;
    defaultMessage?: string;
  }): string => {
    const locales = gLocaleObject();
    return locales[id];
  };
  return formatMessage;
};
