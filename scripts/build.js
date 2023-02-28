const execa = require('execa');
const join = require('path').join;
const slash = require('slash2');

execa('pnpm', ['--filter', slash('./packages/**'), 'build'], {
  cwd: slash(join(__dirname, '..')),
  stdout: process.stdout,
}).stdout;
