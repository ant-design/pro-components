'use strict';

const path = require('path');
const fs = require('fs');

const pkgPath = path.join(process.cwd(), 'package.json');
const pkgCfg = require(pkgPath);

pkgCfg.dependencies = {};

fs.writeFileSync(pkgPath, JSON.stringify(pkgCfg), { encoding: 'utf-8' });

console.log('pkg depends remove success.');
