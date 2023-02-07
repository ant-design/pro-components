import { styled, ThemeMode } from 'antd-style';
import { memo, ReactNode, type FC } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useThemeStore } from '../../store/useThemeStore';
import NativeSelect from '../NativeSelect';

const IconDark = () => (
  <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor">
    <path d="M8.218 1.455c3.527.109 6.327 3.018 6.327 6.545 0 3.6-2.945 6.545-6.545 6.545a6.562 6.562 0 0 1-6.036-4h.218c3.6 0 6.545-2.945 6.545-6.545 0-.91-.182-1.745-.509-2.545m0-1.455c-.473 0-.909.218-1.2.618-.29.4-.327.946-.145 1.382.254.655.4 1.31.4 2 0 2.8-2.291 5.09-5.091 5.09h-.218c-.473 0-.91.22-1.2.62-.291.4-.328.945-.146 1.38C1.891 14.074 4.764 16 8 16c4.4 0 8-3.6 8-8a7.972 7.972 0 0 0-7.745-8h-.037Z" />
  </svg>
);

const IconLight = () => (
  <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor">
    <path d="M8 13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM8 3a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm7 4a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM3 8a1 1 0 0 1-1 1H1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm9.95 3.536.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-9.9-7.072-.707-.707a1 1 0 0 1 1.414-1.414l.707.707A1 1 0 0 1 3.05 4.464Zm9.9 0a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707Zm-9.9 7.072a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707ZM8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
  </svg>
);

const IconAuto = () => (
  <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor">
    <path d="M14.595 8a6.595 6.595 0 1 1-13.19 0 6.595 6.595 0 0 1 13.19 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 2.014v11.972A5.986 5.986 0 0 0 8 2.014Z" />
  </svg>
);

const IconWrapper = styled.span`
  width: 12px;
`;

const Option = ({ icon, label }: { icon: ReactNode; label: ReactNode }) => (
  <Flexbox horizontal gap={12} align={'center'}>
    <IconWrapper>{icon} </IconWrapper>
    {label}
  </Flexbox>
);

const options = [
  { label: '跟随系统', icon: <IconAuto />, value: 'auto' },
  { label: '亮色模式', icon: <IconLight />, value: 'light' },
  { label: '暗色模式', icon: <IconDark />, value: 'dark' },
];

const ThemeSwitch: FC = () => {
  const themeMode = useThemeStore((s) => s.themeMode);

  return (
    <span>
      <NativeSelect
        options={options}
        value={options.findIndex((o) => o.value === themeMode)}
        onChange={(index) => {
          const mode = options[index].value as unknown as ThemeMode;
          useThemeStore.setState({ themeMode: mode });
        }}
        renderValue={(index) => options[index].icon}
        renderItem={(item) => <Option label={item.label} icon={item.icon} />}
      />
    </span>
  );
};

export default memo(ThemeSwitch);
