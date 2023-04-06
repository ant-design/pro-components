import type { ExampleBlockAsset } from 'dumi-assets-types';
import ReactTechStack from 'dumi/dist/techStacks/react';
import { IDumiTechStack } from 'dumi/dist/types';
export default class DemoReactTechStack extends ReactTechStack implements IDumiTechStack {
  readonly antdVersion: string;

  constructor() {
    super();
    this.antdVersion = this.getAntdVersion();
  }
  generateMetadata(asset: ExampleBlockAsset) {
    if (asset.type === 'BLOCK' && !asset.dependencies?.antd) {
      asset.dependencies.antd = {
        type: 'NPM',
        value: this.antdVersion,
      };
    }
    return asset;
  }

  getAntdVersion() {
    const pkgJson = require('antd/package.json');
    return pkgJson.version || '5.2.0';
  }
}
