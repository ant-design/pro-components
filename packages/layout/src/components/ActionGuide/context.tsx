import React from 'react';
import type { ActionGuideAction, ActionGuideContainerProps } from './interface';

export type ActionGuideContextProps = ActionGuideContainerProps & {
  action: ActionGuideAction;
  curIdx: number;
  total: number;
  scrollTop: number;
};
const ActionGuideContext = React.createContext<ActionGuideContextProps | null>(null);

export default ActionGuideContext;
export const ActionGuideContextProvider = ActionGuideContext.Provider;
export const ActionGuideContextConsumer = ActionGuideContext.Consumer;
