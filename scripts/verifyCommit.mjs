/* eslint-disable import/no-extraneous-dependencies */
// Invoked on the commit-msg git hook by yorkie.

const { chalk } = require('@umijs/utils');

const msgPath = process.env.GIT_PARAMS;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const commitRE =
  /^(((\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]) )?(revert: )?(feat|fix|docs|UI|refactor|⚡perf|workflow|build|CI|typos|chore|tests|types|wip|release|dep)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.log();
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `invalid commit message format.`,
    )}\n\n${chalk.red(
      `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
    )}    
${chalk.green(`💥 feat(compiler): add 'comments' option`)}\n
${chalk.green(`🐛 fix(compiler): fix some bug`)}\n
${chalk.green(`📝 docs(compiler): add some docs`)}\n
${chalk.green(`💄 UI(compiler): better styles`)}\n
${chalk.green(`🎨 chore(compiler): do something`)}\n
${chalk.red(`See .github/commit-convention.md for more details.\n`)}`,
  );
  process.exit(1);
}
