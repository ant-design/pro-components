const fs = require('fs');
const path = require('path');
const glob = require('glob');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function addNavToFile(filePath, componentName) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let needsUpdate = false;

    // Remove any existing nav configurations
    const navRegex = /nav:\s*\n(\s*title:\s*[^\n]*\n)(\s*path:\s*[^\n]*\n)?/g;
    if (content.match(navRegex)) {
      content = content.replace(navRegex, '');
      needsUpdate = true;
    }

    // Find the position after the frontmatter start
    const frontmatterStart = content.indexOf('---');
    if (frontmatterStart === -1) {
      console.log(`Skipped (no frontmatter): ${filePath}`);
      return;
    }

    // Find the next line after the first ---
    const afterFirstLine = content.indexOf('\n', frontmatterStart) + 1;

    // Insert nav content after the first line
    const navContent = `nav:
  title: ${capitalizeFirstLetter(componentName)}
`;
    const newContent =
      content.slice(0, afterFirstLine) +
      navContent +
      content.slice(afterFirstLine);

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated nav title to ${componentName} in: ${filePath}`);
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

componentDirs.forEach((componentName) => {
  const pattern = `docs/components/${componentName}/**/*.@(md|mdx)`;
  glob(pattern, (err, files) => {
    if (err) {
      console.error(`Error finding files in ${componentName}:`, err);
      return;
    }
    files.forEach((file) => addNavToFile(file, componentName));
  });
});
