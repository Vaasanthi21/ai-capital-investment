import fs from 'fs';
import path from 'path';

const userUploadedDir = 'C:\\Users\\vasan\\.gemini\\antigravity\\brain\\a09edfaa-5c98-4fab-a650-e93a239d3a11\\.user_uploaded';
const publicDir = 'c:\\Users\\vasan\\.gemini\\antigravity\\scratch\\ai-capital-investment\\public';
const certTargetDir = path.join(publicDir, 'certificates');

if (!fs.existsSync(certTargetDir)) {
    fs.mkdirSync(certTargetDir, { recursive: true });
}

// 1. Copy Unencrypted Certificate Images to public/certificates/
const certImageFiles = [
    { src: 'media__1785221511280.png', dest: 'ankush_jain_nism_xxia_pms_advisor.png' },
    { src: 'media__1785221511289.png', dest: 'ankush_jain_nism_xv_research_analyst.png' },
    { src: 'media__1785221511592.jpg', dest: 'ankush_jain_nism_va_mutual_funds.jpg' },
    { src: 'media__1785221532320.png', dest: 'anant_jain_nism_va_mutual_funds.png' },
    { src: 'media__1785221532533.jpg', dest: 'anant_jain_nism_xvi_commodity_derivatives.jpg' }
];

certImageFiles.forEach(file => {
    const srcPath = path.join(userUploadedDir, file.src);
    const destPath = path.join(certTargetDir, file.dest);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file.src} -> certificates/${file.dest}`);
    } else {
        console.warn(`File not found in user_uploaded: ${file.src}`);
    }
});

// 2. Copy User Face Profile Photos to public/
const profileFiles = [
    { src: 'media__1785221807592.png', dest: 'ankush_jain.png' },
    { src: 'media__1785221788292.png', dest: 'anant_jain.png' }
];

profileFiles.forEach(file => {
    const srcPath = path.join(userUploadedDir, file.src);
    const destPath = path.join(publicDir, file.dest);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file.src} -> public/${file.dest}`);
    } else {
        console.warn(`Profile photo not found in user_uploaded: ${file.src}`);
    }
});

console.log('Certificates & User Face Photos successfully copied to public folder!');
