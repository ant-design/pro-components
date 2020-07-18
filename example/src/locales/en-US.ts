import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import pwa from './en-US/pwa';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Download this page to your local project',
  'app.alert.umi-ui-available': 'umi ui is now available, click the umi icon in the lower right corner to use it',
  'app.alert.umi-ui-released': 'umi ui has been released, run `npm run ui` to try it out.',
  'app.welcome.link.fetch-blocks': 'Fetch all blocks',
  'app.welcome.link.block-list': 'Quickly build pages based on `block` development',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
