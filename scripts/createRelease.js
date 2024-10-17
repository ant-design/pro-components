const { Octokit } = require('octokit');
const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

console.log('开始发布');
const github = new Octokit({
  debug: process.env.NODE_ENV === 'development',
  auth: process.env.GITHUB_TOKEN || process.env.GITHUB_AUTH,
});

const getChangelog = (content, version) => {
  const lines = content.split('\n');
  const changeLog = [];
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
      begin = `## ${version}`.trim() === line.trim();
    }
  }
  return changeLog.join('\n');
};

const getMds = async (allVersion = false) => {
  const info = await github.rest.users
    .getAuthenticated()
    .then(({ data: { login } }) => {
      return 'Hello, ' + login;
    });
  console.log(info);
  const docDir = path.join(__dirname, '..', 'docs');
  const mdFile = fs
    .readdirSync(docDir)
    .filter((name) => name.includes('changelog.md'))
    .shift();
  const pkg = 'components';

  const content = fs.readFileSync(path.join(docDir, mdFile)).toString();
  let versions = [
    require(path.join(
      path.join(__dirname, '..', 'packages', pkg, 'package.json'),
    )).version,
  ];
  if (allVersion) {
    versions = exec('git tag')
      .toString()
      .split('\n')
      .filter((tag) => tag.includes(pkg))
      .map((tag) => tag.split('@').pop());
  }
  console.log(versions.toString());
  versions.map(async (version) => {
    const versionPkg = `@ant-design/pro-${pkg}@${version}`;
    const changeLog = getChangelog(content, versionPkg);

    if (!changeLog) {
      return;
    }

    let release_id = '';

    try {
      const tag = await github.rest.repos
        .getReleaseByTag({
          owner: 'ant-design',
          repo: 'pro-components',
          tag: versionPkg,
        })
        .then(({ data }) => {
          return data;
        })
        .catch((e) => {
          // console.log(versionPkg + '标签不存在');
        });

      if (tag) {
        release_id = tag.id;
      }

      if (!tag.body && tag) {
        github.rest.repos
          .updateRelease({
            owner: 'ant-design',
            release_id,
            repo: 'pro-components',
            tag_name: versionPkg,
            name: versionPkg,
            body: changeLog,
          })
          .catch((e) => {
            console.log(versionPkg + '更新失败哦');
          });
        return;
      }
    } catch (error) {
      // console.log(versionPkg + '创建失败！');
    }

    if (!release_id) {
      console.log(versionPkg + '标签创建中');
      github.rest.repos
        .createRelease({
          owner: 'ant-design',
          repo: 'pro-components',
          tag_name: versionPkg,
          name: versionPkg,
          body: changeLog,
        })
        .catch((e) => {
          console.log(versionPkg + '创建失败！');
        });
    }
  });
};

getMds();
