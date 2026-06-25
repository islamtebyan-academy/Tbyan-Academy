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
  // These will be processed after folder renaming (so we use 'portal' in paths)
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

function run() {
  console.log('--- STARTING SECURITY ROUTE RENAME (admin -> portal) ---');

  const oldDir = path.join(__dirname, 'app', '[locale]', '(admin)', 'admin');
  const newDir = path.join(__dirname, 'app', '[locale]', '(admin)', 'portal');

  // 1. Rename directory
  if (fs.existsSync(oldDir)) {
    try {
      console.log(`Renaming folder from ${oldDir} to ${newDir}...`);
      fs.renameSync(oldDir, newDir);
      console.log('✓ Directory renamed successfully.');
    } catch (err) {
      console.error('✗ ERROR: Failed to rename directory. Please make sure Next.js dev server is completely stopped!');
      console.error(err.message);
      process.exit(1);
    }
  } else if (fs.existsSync(newDir)) {
    console.log('✓ Portal directory already exists. Continuing replacements...');
  } else {
    console.error('✗ ERROR: Could not find administrative folders to rename.');
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

  console.log('\n--- SUCCESS! RENAME AND UPDATES COMPLETE ---');
  console.log('You can now run "npm run dev" to start the server at: http://localhost:3000/ar/portal');
}

run();
