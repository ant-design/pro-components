const docker = require('@umijs/doctor');
const path = require('path');

const repo_path = path.join(__dirname, '..');

const checkPublish = () => {
  docker.checkPublish(repo_path);
};

checkPublish();
