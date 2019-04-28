import { createContext } from 'react';

export interface ILoginContext {
  tabUtil?: {
    addTab: (id: string) => void;
    removeTab: (id: string) => void;
  };
  updateActive?: (activeItem: { [key: string]: string } | string) => void;
}

const LoginContext: React.Context<ILoginContext> = createContext({});

export default LoginContext;
