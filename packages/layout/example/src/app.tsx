import { queryCurrent } from './services/user';
import defaultSettings from '../config/defaultSettings';
import { Settings } from '../../src/';

export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  settings?: Partial<Settings>;
}> {
  const currentUser = await queryCurrent();
  return {
    currentUser,
    settings: defaultSettings,
  };
}
