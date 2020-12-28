const GitHub = require('github');
const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const github = new GitHub({
  debug: process.env.NODE_ENV === 'development',
});

github.authenticate({
  type: 'token',
  token: process.env.GITHUB_TOKEN || process.env.GITHUB_AUTH,
});

const getChangelog = (content, version) => {
  const lines = content.split('\n');
  const changeLog = [];
  const startPattern = new RegExp(`^## ${version}`);
  const stopPattern = /^## /; // 前一个版本
  const skipPattern = /^`/; // 日期
  let begin = false;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (begin && stopPattern.test(line)) {
      break;
    }
    if (begin && line && !skipPattern.test(line)) {
      changeLog.push(line);
    }
    if (!begin) {
      begin = startPattern.test(line);
    }
  }
  return changeLog.join('\n');
};

const getMds = (allVersion = false) => {
  const docDir = path.join(__dirname, '..', 'docs');
  const mdFils = fs.readdirSync(docDir).filter((name) => name.includes('changelog.md'));
  mdFils.map((mdFile) => {
    const pkg = mdFile.replace('pro-', '').replace('.changelog.md', '');
    const content = fs.readFileSync(path.join(docDir, mdFile)).toString();
    let versions = [
      require(path.join(path.join(__dirname, '..', 'packages', pkg, 'package.json'))).version,
    ];
    if (allVersion) {
      versions = exec('git tag')
        .toString()
        .split('\n')
        .filter((tag) => tag.includes(pkg))
        .map((tag) => tag.split('@').pop());
    }
    console.log(versions);
    versions.map((version) => {
      const versionPkg = `@ant-design/pro-${pkg}@${version}`;
      const changeLog = getChangelog(content, versionPkg);
      if (!changeLog) {
        return;
      }
      github.repos
        .createRelease({
          owner: 'ant-design',
          repo: 'pro-components',
          tag_name: versionPkg,
          name: versionPkg,
          body: changeLog,
        })
        .catch((e) => {
          console.log(e);
        });
    });
  });
};

getMds();
