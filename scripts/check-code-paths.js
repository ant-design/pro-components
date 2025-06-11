const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to extract src path from code tag
function extractSrcPath(codeTag) {
  const srcMatch = codeTag.match(/src="([^"]+)"/);
  if (!srcMatch) return null;
  return srcMatch[1];
}

// Function to check if path is valid
function checkPath(mdFile, srcPath) {
  // Get the actual demo file path
  const mdDir = path.dirname(mdFile);
  const absoluteDemoPath = path.resolve(mdDir, srcPath);

  // Calculate what the path should be
  const mdRelativeToRoot = path.relative(process.cwd(), mdFile);
  const demoRelativeToRoot = path.relative(process.cwd(), absoluteDemoPath);

  // Expected path should start from demos directory
  const expectedPath = path.relative(
    mdDir,
    path.join(process.cwd(), 'demos', demoRelativeToRoot.split('demos/')[1]),
  );

  return {
    currentPath: srcPath,
    expectedPath,
    exists: fs.existsSync(absoluteDemoPath),
    mdFile: mdRelativeToRoot,
    demoFile: demoRelativeToRoot,
    isCorrect: srcPath === expectedPath,
  };
}

// Function to process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const codeTagMatches = content.match(/<code[^>]*src="[^"]*"[^>]*>/g) || [];

    const results = [];
    codeTagMatches.forEach((codeTag) => {
      const srcPath = extractSrcPath(codeTag);
      if (srcPath) {
        const checkResult = checkPath(filePath, srcPath);
        if (!checkResult.isCorrect || !checkResult.exists) {
          results.push(checkResult);
        }
      }
    });

    if (results.length > 0) {
      console.log('\n' + '='.repeat(80));
      console.log(`Issues found in: ${filePath}`);
      results.forEach((result) => {
        console.log('\n  Path issue:');
        console.log(`  Current:  ${result.currentPath}`);
        console.log(`  Expected: ${result.expectedPath}`);
        console.log(`  Exists:   ${result.exists ? '✅' : '❌'}`);
        if (!result.exists) {
          console.log(`  Demo file not found: ${result.demoFile}`);
        }
      });
    }
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
}

// Find all markdown files
console.log('Checking code paths in markdown files...\n');

glob('docs/**/*.md', (err, files) => {
  if (err) {
    console.error('Error finding files:', err);
    process.exit(1);
  }

  if (files.length === 0) {
    console.warn('No markdown files found');
    process.exit(0);
  }

  let hasIssues = false;
  files.forEach((file) => {
    processFile(file);
    hasIssues = true;
  });

  if (!hasIssues) {
    console.log('✅ All code paths are correct!');
  } else {
    console.log(
      '\n❗️ Issues found in code paths. Please check the report above.',
    );
  }
});
