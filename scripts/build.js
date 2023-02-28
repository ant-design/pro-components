const execa = require('execa');
const join = require('path').join;

execa('pnpm', ['--filter', './packages/**', 'build'], {
  cwd: join(__dirname, '..'),
  stdout: process.stdout,
}).stdout;
