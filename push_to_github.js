import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Remove temp scripts
['copy_mockup.js', 'copy_cyborg.js', 'check_dim.js'].forEach(file => {
  const p = path.join(__dirname, file);
  if (fs.existsSync(p)) fs.unlinkSync(p);
});

try {
  console.log('Staging files...');
  execSync('git add .', { cwd: __dirname, stdio: 'inherit' });
  
  console.log('Committing changes...');
  try {
    execSync('git commit -m "feat: complete website overhaul to Shubh Nivesh (Ankush Jain, Mutual Fund Distributor) with 8 proposal sections, interactive SIP calculator, and statutory disclosures"', { cwd: __dirname, stdio: 'inherit' });
  } catch (err) {
    console.log('Commit note: Nothing new to commit or already committed.');
  }

  console.log('Pushing to GitHub (origin/main)...');
  execSync('git push origin main', { cwd: __dirname, stdio: 'inherit' });
  
  console.log('Successfully pushed to GitHub repository!');
} catch (error) {
  console.error('Error during git push:', error.message);
}
