const config = require('@ty-fee-tools/rc-config-preset/lib/deployrc/app');

module.exports = {
  ...config,
  project: {
    ...config.project,
    name: 'ty-pro-components',
    git: 'git@gitlab2.tongyu.tech:tongyu-fe/pro-components.git',
  },
  server: {
    ...config.server,
    username: 'root',
    ip: '10.1.5.111',
    path: '/root/',
  },
  hooks: {
    ...config.hooks,
    'after-install': 'yarn build:statics',
  },
};
