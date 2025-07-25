const fs = require('fs');
const path = require('path');
const glob = require('glob');

function extractSrcPath(codeTag) {
  const srcMatch = codeTag.match(/src="([^"]+)"/);
  if (!srcMatch) return null;

  const fullPath = srcMatch[1];
  const pathParts = fullPath.split('/');

  // Remove '..' and '.' from path
  const cleanParts = pathParts.filter((part) => part !== '.' && part !== '..');
  let fileName = cleanParts.join('/');
  if (!fileName.includes('.tsx')) {
    fileName = fileName + '.tsx';
  }
  return {
    originalPath: fullPath,
    cleanPath: fileName,
    fileName: pathParts[pathParts.length - 1],
  };
}

// Function to process a single file
function processFile(filePath) {
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.warn(`File does not exist: ${filePath}`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;

    // Get the relative directory path
    const relativePath = path.relative(process.cwd(), filePath);
    const dirPath = path.dirname(relativePath);

    const componentDir = dirPath
      .split('/')
      .map((item) => item.split('.')[0])
      .filter((item) => item !== '' && item !== 'demos' && item !== 'docs')
      .join('/');

    if (!componentDir) {
      return;
    }

    const demoDirPath = path.join(__dirname, '../', 'demos', componentDir);

    if (fs.existsSync(demoDirPath)) {
      // Find all code tags with src attribute
      const codeTagMatches =
        content.match(/<code[^>]*src="[^"]*"[^>]*>/g) || [];

      codeTagMatches.forEach((codeTag) => {
        const srcInfo = extractSrcPath(codeTag);
        if (srcInfo) {
          const filePathName = srcInfo.cleanPath
            .split(componentDir + '/')
            .at(-1)
            .split('/')
            .filter((item) => {
              return item !== 'demos' && item !== 'docs';
            })
            .join('/');

          const demoPath = path.join(demoDirPath, filePathName);

          if (fs.existsSync(demoPath)) {
            const relativePath = path.relative(
              path.dirname(path.join(__dirname, filePath)),
              demoPath,
            );
            console.log(relativePath);
            newContent = newContent.replace(
              new RegExp(`<code src="${srcInfo.originalPath}"`, 'g'),
              `<code src="${relativePath}"`,
            );
          } else {
          }
        }
      });
    }

    // Only write if content has changed
    if (newContent !== content) {
      try {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated: ${filePath}`);
      } catch (writeErr) {
        console.error(`Error writing to file ${filePath}:`, writeErr);
      }
    }
  } catch (readErr) {
    console.error(`Error reading file ${filePath}:`, readErr);
  }
}

// Check if docs directory exists
const docsPath = path.join(__dirname, '../docs');
if (!fs.existsSync(docsPath)) {
  console.error('Error: docs directory not found');
  process.exit(1);
}

// Find all markdown files
glob('../docs/**/*.md', (err, files) => {
  if (err) {
    console.error('Error finding files:', err);
    process.exit(1);
  }

  if (files.length === 0) {
    console.warn('Warning: No markdown files found');
    process.exit(0);
  }

  files.forEach(processFile);
  console.log('Done processing files.');
});
