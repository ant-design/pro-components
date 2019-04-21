import { Icon } from 'antd';

const { iconfontUrl } = defaultSettings;
const scriptUrl = iconfontUrl;
// 使用：
// import IconFont from '@/components/IconFont';
// <IconFont type='icon-demo' className='xxx-xxx' />
export default Icon.createFromIconfontCN({ scriptUrl });
