const { execSync } = require('child_process');
const path = require('path');

const projectRoot = __dirname;

try {
  console.log('🔧 Setting up database...');
  
  // Run Prisma generate
  execSync('npx prisma generate', { cwd: projectRoot, stdio: 'inherit' });
  
  // Run Prisma db push
  execSync('npx prisma db push', { cwd: projectRoot, stdio: 'inherit' });
  
  // Run seed script
  execSync('npx tsx prisma/seed.ts', { cwd: projectRoot, stdio: 'inherit' });
  
  console.log('✅ Database setup completed successfully!');
} catch (error) {
  console.error('❌ Database setup failed:', error.message);
  process.exit(1);
}
