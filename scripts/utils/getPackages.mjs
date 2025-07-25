import { readdirSync } from 'fs';
import { join } from 'path';

export default function getPackages() {
  return readdirSync(join(process.cwd(), 'packages')).filter(
    (pkg) => pkg.charAt(0) !== '.',
  );
}
