const fs = require('fs');
const path = require('path');
const glob = require('glob');

const navContent = `nav:
  title: Components
`;

function addNavToFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let needsUpdate = false;

    // Remove any existing nav configurations
    const navRegex = /nav:\s*\n(\s*title:\s*[^\n]*\n)(\s*path:\s*[^\n]*\n)?/g;
    const navCount = (content.match(navRegex) || []).length;

    if (navCount >= 1) {
      // Remove all nav configurations
      content = content.replace(navRegex, '');
      needsUpdate = true;
      console.log(`Removed nav config from: ${filePath}`);
    }

    if (needsUpdate || navCount === 0) {
      // Find the position after the frontmatter start
      const frontmatterStart = content.indexOf('---');
      if (frontmatterStart === -1) {
        console.log(`Skipped (no frontmatter): ${filePath}`);
        return;
      }

      // Find the next line after the first ---
      const afterFirstLine = content.indexOf('\n', frontmatterStart) + 1;

      // Insert nav content after the first line
      const newContent =
        content.slice(0, afterFirstLine) +
        navContent +
        content.slice(afterFirstLine);

      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

// Process all markdown files in component directories
const componentDirs = [
  'table',
  'skeleton',
  'list',
  'layout',
  'form',
  'field',
  'card',
  'descriptions',
  'provider',
  'utils',
];

componentDirs.forEach((dir) => {
  const pattern = `docs/${dir}/**/*.@(md|mdx)`;
  glob(pattern, (err, files) => {
    if (err) {
      console.error(`Error finding files in ${dir}:`, err);
      return;
    }
    files.forEach(addNavToFile);
  });
});
