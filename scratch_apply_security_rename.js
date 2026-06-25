const fs = require('fs');
const path = require('path');

// 1. Define files and their replacements
const replacements = [
  {
    file: 'middleware.ts',
    replace: [
      { from: /\/admin/g, to: '/portal' },
      { from: /admin\/login/g, to: 'portal/login' }
    ]
  },
  {
    file: 'components/layout/AdminSidebarNav.tsx',
    replace: [
      { from: /\/admin/g, to: '/portal' }
    ]
  },
  {
    file: 'app/api/auth/signout/route.ts',
    replace: [
      { from: /\/admin/g, to: '/portal' }
    ]
  },
  {
    file: 'app/robots.ts',
    replace: [
      { from: /\/admin\//g, to: '/portal/' },
      { from: /'\*\/admin\/'/g, to: "'/*/portal/'" }
    ]
  },
  {
    file: 'components/admin/CourseEditModal.tsx',
    replace: [
      { from: /\/admin\/courses/g, to: '/portal/courses' }
    ]
  },
  {
    file: 'components/admin/ArticleEditModal.tsx',
    replace: [
      { from: /\/admin\/articles/g, to: '/portal/articles' }
    ]
  },
  // These will be processed after folder copying (so we use 'portal' in paths)
  {
    file: 'app/[locale]/(admin)/portal/(dashboard)/layout.tsx',
    replace: [
      { from: /\/admin\/login/g, to: '/portal/login' }
    ]
  },
  {
    file: 'app/[locale]/(admin)/portal/(dashboard)/students/page.tsx',
    replace: [
      { from: /\/admin\/students/g, to: '/portal/students' }
    ]
  },
  {
    file: 'app/[locale]/(admin)/portal/(dashboard)/courses/page.tsx',
    replace: [
      { from: /\/admin\/courses/g, to: '/portal/courses' }
    ]
  },
  {
    file: 'app/[locale]/(admin)/portal/(dashboard)/articles/page.tsx',
    replace: [
      { from: /\/admin\/articles/g, to: '/portal/articles' }
    ]
  },
  {
    file: 'app/[locale]/(admin)/portal/(dashboard)/page.tsx',
    replace: [
      { from: /\/admin\/students/g, to: '/portal/students' }
    ]
  }
];

function copyFolderRecursiveSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  if (fs.lstatSync(src).isDirectory()) {
    const files = fs.readdirSync(src);
    files.forEach((file) => {
      const curSource = path.join(src, file);
      const curTarget = path.join(dest, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, curTarget);
      } else {
        fs.copyFileSync(curSource, curTarget);
      }
    });
  }
}

function deleteFolderRecursiveSync(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursiveSync(curPath);
      } else {
        try {
          fs.unlinkSync(curPath);
        } catch (e) {
          // ignore lock issues on single files
        }
      }
    });
    try {
      fs.rmdirSync(directoryPath);
    } catch (e) {
      // ignore lock issues on directory
    }
  }
}

function run() {
  console.log('--- STARTING SECURITY ROUTE MIGRATION (admin -> portal) ---');

  const oldDir = path.join(__dirname, 'app', '[locale]', '(admin)', 'admin');
  const newDir = path.join(__dirname, 'app', '[locale]', '(admin)', 'portal');

  // 1. Copy directory
  if (fs.existsSync(oldDir)) {
    try {
      console.log(`Copying folder recursively from ${oldDir} to ${newDir}...`);
      copyFolderRecursiveSync(oldDir, newDir);
      console.log('✓ Directory copied successfully.');
    } catch (err) {
      console.error('✗ ERROR: Failed to copy directory.');
      console.error(err.message);
      process.exit(1);
    }
  } else if (fs.existsSync(newDir)) {
    console.log('✓ Portal directory already exists. Continuing replacements...');
  } else {
    console.error('✗ ERROR: Could not find administrative folders to migrate.');
    process.exit(1);
  }

  // 2. Perform file replacements
  replacements.forEach(({ file, replace }) => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      console.log(`Updating file: ${file}...`);
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;

      replace.forEach(({ from, to }) => {
        content = content.replace(from, to);
      });

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✓ Updated.`);
      } else {
        console.log(`  - No changes needed.`);
      }
    } else {
      console.log(`  - File not found (skipping): ${file}`);
    }
  });

  // 3. Attempt clean up of old folder
  if (fs.existsSync(oldDir)) {
    console.log('Cleaning up old admin folder...');
    deleteFolderRecursiveSync(oldDir);
    if (fs.existsSync(oldDir)) {
      console.log('Notice: Some files in the old admin directory are locked by VS Code or your terminal. You can delete the old folder manually later, but the new "/portal" routes are active now.');
    } else {
      console.log('✓ Old admin folder cleaned up successfully.');
    }
  }

  console.log('\n--- SUCCESS! ROUTE MIGRATION COMPLETE ---');
  console.log('You can now start the server with: npm run dev');
  console.log('The portal login is at: http://localhost:3000/ar/portal/login');
}

run();
