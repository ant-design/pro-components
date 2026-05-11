import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Octokit } from 'octokit';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function readRootPackage() {
  return JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'));
}

function resolveChangelogFile() {
  const candidates = [
    join(root, 'site', 'changelog.md'),
    join(root, 'site', 'changelog.en-US.md'),
  ];
  const found = candidates.find((p) => existsSync(p));
  if (!found) {
    throw new Error('No changelog at site/changelog.md (or .en-US)');
  }
  return found;
}

function getChangelogBody(content, version) {
  const lines = content.split(/\r?\n/);
  const escaped = version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const headerRe = new RegExp(`^## \\[${escaped}\\]`);
  let i = 0;
  while (i < lines.length && !headerRe.test(lines[i])) i += 1;
  if (i >= lines.length) return '';
  i += 1;
  const body = [];
  while (i < lines.length && !/^## \[/.test(lines[i])) {
    body.push(lines[i]);
    i += 1;
  }
  return body.join('\n').trim();
}

function listVersionsFromChangelog(content) {
  const re = /^## \[([^\]]+)\]/gm;
  const versions = [];
  let match;
  while ((match = re.exec(content)) !== null) {
    versions.push(match[1]);
  }
  return versions;
}

function parseGithubRepo(pkg) {
  const fromEnv = process.env.GITHUB_REPOSITORY;
  if (fromEnv) {
    const [owner, repo] = fromEnv.split('/');
    return { owner, repo };
  }
  const url = pkg.repository?.url ?? '';
  const m = url.match(/github\.com[/:]([^/]+)\/([^/.]+?)(?:\.git)?$/i);
  if (!m) {
    throw new Error(
      'Cannot resolve GitHub owner/repo: set GITHUB_REPOSITORY or fix package.json repository.url',
    );
  }
  return { owner: m[1], repo: m[2] };
}

async function ensureRelease(
  octokit,
  { owner, repo, tag, name, body, defaultBranch },
) {
  if (!body) {
    console.log(`${tag}: empty changelog section, skip`);
    return;
  }
  try {
    const { data } = await octokit.rest.repos.getReleaseByTag({
      owner,
      repo,
      tag,
    });
    if (data.body?.trim()) {
      console.log(`${tag}: release exists with body, skip`);
      return;
    }
    await octokit.rest.repos.updateRelease({
      owner,
      repo,
      release_id: data.id,
      tag_name: data.tag_name,
      name: data.name || name,
      body,
    });
    console.log(`${tag}: updated release notes`);
  } catch (error) {
    if (error.status !== 404) {
      console.error(`${tag}:`, error.message);
      throw error;
    }
    await octokit.rest.repos.createRelease({
      owner,
      repo,
      tag_name: tag,
      name,
      body,
      target_commitish: defaultBranch,
    });
    console.log(`${tag}: created release`);
  }
}

const token = process.env.GITHUB_TOKEN || process.env.GITHUB_AUTH;
if (!token) {
  console.error('GITHUB_TOKEN or GITHUB_AUTH is required');
  process.exit(1);
}

const pkg = readRootPackage();
const { owner, repo } = parseGithubRepo(pkg);
const changelogFile = resolveChangelogFile();
const changelogContent = readFileSync(changelogFile, 'utf-8');
const all = process.argv.includes('--all');
const versions = all
  ? listVersionsFromChangelog(changelogContent)
  : [pkg.version];

console.log(
  '开始发布 | 仓库:',
  `${owner}/${repo}`,
  '| changelog:',
  changelogFile.replace(root + '\\', '').replace(root + '/', ''),
  '| 版本:',
  versions.join(', '),
);

const octokit = new Octokit({ auth: token });
const {
  data: { default_branch: defaultBranch },
} = await octokit.rest.repos.get({ owner, repo });

for (const version of versions) {
  const tag = `${pkg.name}@${version}`;
  const body = getChangelogBody(changelogContent, version);
  await ensureRelease(octokit, {
    owner,
    repo,
    tag,
    name: tag,
    body,
    defaultBranch,
  });
}
