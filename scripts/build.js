const execa = require('execa');
const join = require('path').join;
const slash = require('slash2');

const fs = require('fs');

console.log('📦  Building packages...');

[
  'card',
  'components',
  'descriptions',
  'field',
  'form',
  'layout',
  'list',
  'provider',
  'skeleton',
  'table',
  'utils',
];

execa('pnpm', ['--filter', `"./packages/*"`, 'build'], {
  cwd: slash(join(__dirname, '..')),
  stdout: process.stdout,
}).stdout;
