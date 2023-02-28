const execa = require('execa');
const join = require('path').join;
const slash = require('slash2');

const fs = require('fs');

console.log('📦  Building packages...');

console.log(
  fs.readdirSync('./packages').map((file) => {
    console.log(fs.readFileSync(`./packages/${file}/package.json`).toString());
    return file;
  }),
);

execa('pnpm', ['--filter', slash('./packages/**'), 'build'], {
  cwd: slash(join(__dirname, '..')),
  stdout: process.stdout,
}).stdout;
