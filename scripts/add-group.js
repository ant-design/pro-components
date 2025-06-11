const fs = require('fs');
const path = require('path');
const glob = require('glob');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function addGroupToFile(filePath, componentName) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let needsUpdate = false;

    // Remove any existing group configurations
    const groupRegex = /group:\s*[^\n]*\n/g;
    if (content.match(groupRegex)) {
      content = content.replace(groupRegex, '');
      needsUpdate = true;
    }

    // Find the position after nav configuration
    const navEndMatch = content.match(/nav:\s*\n\s*title:\s*[^\n]*\n/);
    if (navEndMatch) {
      const navEnd = navEndMatch.index + navEndMatch[0].length;
      const groupContent = `group: ${capitalizeFirstLetter(componentName)}\n`;
      content = content.slice(0, navEnd) + groupContent + content.slice(navEnd);
      needsUpdate = true;
    } else {
      // If no nav configuration found, add after first line of frontmatter
      const frontmatterStart = content.indexOf('---');
      if (frontmatterStart !== -1) {
        const afterFirstLine = content.indexOf('\n', frontmatterStart) + 1;
        const groupContent = `group: ${capitalizeFirstLetter(componentName)}\n`;
        content =
          content.slice(0, afterFirstLine) +
          groupContent +
          content.slice(afterFirstLine);
        needsUpdate = true;
      } else {
        console.log(`Skipped (no frontmatter): ${filePath}`);
        return;
      }
    }

    if (needsUpdate) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated group to ${componentName} in: ${filePath}`);
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

componentDirs.forEach((componentName) => {
  const pattern = `docs/components/${componentName}/**/*.@(md|mdx)`;
  glob(pattern, (err, files) => {
    if (err) {
      console.error(`Error finding files in ${componentName}:`, err);
      return;
    }
    files.forEach((file) => addGroupToFile(file, componentName));
  });
});
