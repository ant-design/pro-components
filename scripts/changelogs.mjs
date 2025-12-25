import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import path from 'path';

// Helper to run shell commands
const run = (command) => {
  try {
    return execSync(command, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
  } catch (error) {
    console.error(`Failed to execute command: ${command}`);
    throw error;
  }
};

async function main() {
  console.log('Generating Changelog...');
  
  // Get releases from GitHub API
  // We fetch up to 100 releases. 
  // Using 'ant-design/pro-components' as the repo.
  const repo = 'ant-design/pro-components';
  const cmd = `gh api repos/${repo}/releases?per_page=100`;
  
  try {
    const data = run(cmd);
    const releases = JSON.parse(data);
    
    let markdown = '# Changelog\n\n';

    // Releases are typically returned in reverse chronological order (newest first)
    for (const release of releases) {
      if (release.draft) continue;

      const tagName = release.tag_name;
      const date = new Date(release.published_at).toISOString().split('T')[0];
      const body = release.body || '';

      markdown += `## ${tagName}\n`;
      markdown += `\`${date}\`\n\n`;
      markdown += `${body}\n\n`;
      markdown += `---\n\n`;
    }

    const outputPath = path.join(process.cwd(), 'CHANGELOG.md');
    writeFileSync(outputPath, markdown);
    console.log(`Success! Changelog written to ${outputPath}`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
