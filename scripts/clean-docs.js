const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to delete a file if it exists
function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`Deleted: ${filePath}`);
    } catch (err) {
      console.error(`Error deleting ${filePath}:`, err);
    }
  }
}

// Delete specific changelog files in docs root
const rootChangelogs = [
  'docs/changelog.md',
  'docs/changelog.en-US.md',
  'docs/CHANGELOG.md',
  'docs/CHANGELOG.en-US.md',
];

rootChangelogs.forEach(deleteFile);

// Find and delete all README.md files in docs directory
glob('docs/**/README.md', (err, files) => {
  if (err) {
    console.error('Error finding README files:', err);
    return;
  }
  files.forEach(deleteFile);
});

// Find and delete all changelog files in docs subdirectories
glob('docs/**/changelog*.@(md|mdx)', { nocase: true }, (err, files) => {
  if (err) {
    console.error('Error finding changelog files:', err);
    return;
  }
  files.forEach(deleteFile);
});

// Also find CHANGELOG files (uppercase)
glob('docs/**/CHANGELOG*.@(md|mdx)', (err, files) => {
  if (err) {
    console.error('Error finding CHANGELOG files:', err);
    return;
  }
  files.forEach(deleteFile);
});
