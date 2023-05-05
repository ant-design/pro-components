const { yParser, chalk } = require('@umijs/utils');
const { join } = require('path');
const exec = require('./utils/exec');
const execa = require('execa');
const inquirer = require('inquirer');
const getPackages = require('./utils/getPackages');
const isNextVersion = require('./utils/isNextVersion');

const cwd = process.cwd();
const args = yParser(process.argv);
const lernaCli = require.resolve('lerna/cli');

function printErrorAndExit(message) {
  console.error(chalk.red(message));
  process.exit(1);
}

function logStep(name) {
  console.log(`${chalk.gray('>> Release:')} ${chalk.magenta.bold(name)}`);
}

function packageExists({ name, version }) {
  try {
    const { stdout, stderr } = execa.sync('npm', [
      'info',
      `${name}@${version}`,
    ]);
    if (stderr) return false;
    return stdout.length > 0;
  } catch (error) {
    return false;
  }
}

async function release() {
  // Check git status
  if (!args.skipGitStatusCheck) {
    const gitStatus = execa.sync('git', ['status', '--porcelain']).stdout;
    if (gitStatus.length) {
      printErrorAndExit(`Your git status is not clean. Aborting.`);
    }
  } else {
    logStep(
      'git status check is skipped, since --skip-git-status-check is supplied',
    );
  }

  // Check npm registry
  logStep('check npm registry');
  const userRegistry = execa.sync('npm', ['config', 'get', 'registry']).stdout;
  if (userRegistry.includes('https://registry.yarnpkg.com/')) {
    printErrorAndExit(
      `Release failed, please use ${chalk.blue('npm run release')}.`,
    );
  }
  if (!userRegistry.includes('https://registry.npmjs.org/')) {
    const registry = chalk.blue('https://registry.npmjs.org/');
    printErrorAndExit(`Release failed, npm registry must be ${registry}.`);
  }

  let updated = null;

  if (!args.publishOnly) {
    // Get updated packages
    logStep('check updated packages');
    const updatedStdout = execa.sync(lernaCli, ['changed']).stdout;
    updated = updatedStdout
      .split('\n')
      .map((pkg) => {
        return pkg.split('/')[1];
      })
      .filter(Boolean);
    if (!updated.length) {
      printErrorAndExit('Release failed, no updated package is updated.');
    }

    // Clean
    logStep('clean');

    // Build
    if (!args.skipBuild) {
      logStep('build');
      await exec('npm', ['run', 'build']);
    } else {
      logStep('build is skipped, since args.skipBuild is supplied');
    }

    // Bump version
    // Commit
    // Git Tag
    // Push
    logStep('bump version with lerna version');

    const conventionalGraduate = args.conventionalGraduate
      ? ['--conventional-graduate'].concat(
          Array.isArray(args.conventionalGraduate)
            ? args.conventionalGraduate.join(',')
            : [],
        )
      : [];
    const conventionalPrerelease = args.conventionalPrerelease
      ? ['--conventional-prerelease'].concat(
          Array.isArray(args.conventionalPrerelease)
            ? args.conventionalPrerelease.join(',')
            : [],
        )
      : [];

    const major = args.major ? ['major'] : [];
    const minor = args.minor ? ['minor'] : [];
    await exec(
      'node',
      [
        [lernaCli],
        'version',
        ...major,
        ...minor,
        '--message',
        '🎨 chore(release): Publish',
        '--conventional-commits',
      ]
        .concat(conventionalGraduate)
        .concat(conventionalPrerelease),
      {
        shell: false,
      },
    );
  }

  // Publish
  // Umi must be the latest.
  const pkgs = args.publishOnly ? getPackages() : updated;
  logStep(`publish packages: ${chalk.blue(pkgs.join(', '))}`);

  // 获取 opt 的输入
  const { otp } = await inquirer.prompt([
    {
      type: 'input',
      name: 'otp',
      message: '请输入 otp 的值，留空表示不使用 otp',
    },
  ]);
  process.env.NPM_CONFIG_OTP = otp;

  const publishList = pkgs.map((pkg, index) => {
    const pkgPath = join(cwd, 'packages', pkg.replace('pro-', ''));
    const { name, version } = require(join(pkgPath, 'package.json'));
    const isNext = isNextVersion(version);
    let isPackageExist = null;
    if (args.publishOnly) {
      isPackageExist = packageExists({ name, version });
      if (isPackageExist) {
        console.log(
          `package ${name}@${version} is already exists on npm, skip.`,
        );
      }
    }

    if (!args.publishOnly || !isPackageExist) {
      console.log(
        `[${index + 1}/${pkgs.length}] Publish package ${name} ${
          isNext ? 'with next tag' : ''
        }`,
      );
      // 默认设置为 tag 检查通过之后在设置为 latest
      let cliArgs = isNext
        ? ['publish', '--tag', 'next']
        : ['publish', '--tag', 'beta'];

      if (args.tag) {
        cliArgs = ['publish', '--tag', args.tag];
      }
      return execa('npm', cliArgs, {
        cwd: pkgPath,
      });
    }
  });
  console.log('发布中' + pkgs.join('/'));
  await Promise.all(publishList);
  console.log('发布成功！');
  await exec('npm', ['run', 'prettier']);

  logStep('done');
}

release().catch((err) => {
  console.error(err);
  process.exit(1);
});
