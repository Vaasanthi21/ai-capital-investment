import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  console.log('Staging files...');
  execSync('git add .', { cwd: __dirname, stdio: 'inherit' });
  
  console.log('Committing changes...');
  try {
    execSync('git commit -m "feat: update Accreditation page with interactive components, lightboxes, and ledger"', { cwd: __dirname, stdio: 'inherit' });
  } catch (err) {
    console.log('Commit note: Nothing new to commit or already committed.');
  }

  console.log('Pushing to GitHub (origin/main)...');
  execSync('git push origin main', { cwd: __dirname, stdio: 'inherit' });
  
  console.log('Successfully pushed to GitHub repository!');
} catch (error) {
  console.error('Error during git push:', error.message);
}
