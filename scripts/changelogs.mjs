const docker = require('@umijs/doctor');
const path = require('path');

const repo_path = path.join(__dirname, '..');

const genChangelogs = () => {
  docker.genChangelogs(repo_path);
};

genChangelogs();
