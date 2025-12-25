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
  
  const repo = 'ant-design/pro-components';
  const cmd = `gh api repos/${repo}/releases?per_page=100`;
  
  try {
    const data = run(cmd);
    const releases = JSON.parse(data);
    
    // Add Frontmatter
    let markdown = '---\ntitle: 更新日志\n---\n\n# Changelog\n\n';

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

    // Change output path to site/changelog.md
    const outputPath = path.join(process.cwd(), 'site', 'changelog.md');
    writeFileSync(outputPath, markdown);
    console.log(`Success! Changelog written to ${outputPath}`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
