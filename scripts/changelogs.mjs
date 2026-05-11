import doctor from '@umijs/doctor';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoPath = path.join(__dirname, '..');

doctor.genChangelogs(repoPath);
