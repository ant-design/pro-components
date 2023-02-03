import { IApi } from 'dumi';

export default (api: IApi) => {
  api.logger.info('💋', api.env);
};
