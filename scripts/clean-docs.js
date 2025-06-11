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

// Find and delete all README.md files in docs directory
glob('docs/**/README.md', (err, files) => {
  if (err) {
    console.error('Error finding README files:', err);
    return;
  }

  files.forEach(deleteFile);
});

// Find and delete all changelog files in docs directory
glob('docs/**/changelog*.@(md|mdx)', (err, files) => {
  if (err) {
    console.error('Error finding changelog files:', err);
    return;
  }

  files.forEach(deleteFile);
});
