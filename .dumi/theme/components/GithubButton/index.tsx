import { GithubFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useSiteStore } from '../../store/useSiteStore';

const GithubButton: React.FC = () => {
  const repoUrl = useSiteStore((s) => s.siteData.themeConfig?.socialLinks?.github);
  return repoUrl ? (
    <Tooltip showArrow={false} title={'Github'}>
      <a href={repoUrl} target={'_blank'}>
        <Button icon={<GithubFilled />} />
      </a>
    </Tooltip>
  ) : null;
};

export default GithubButton;
