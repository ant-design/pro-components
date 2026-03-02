const doctor = require('@umijs/doctor');
const path = require('path');

const repo_path = path.join(__dirname, '..');

const genChangelogs = () => {
  doctor.genChangelogs(repo_path);
};

genChangelogs();
