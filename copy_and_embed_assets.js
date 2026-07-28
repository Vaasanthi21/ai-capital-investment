import fs from 'fs';
import path from 'path';

const brainUserUploadedDir = 'C:\\Users\\vasan\\.gemini\\antigravity\\brain\\a09edfaa-5c98-4fab-a650-e93a239d3a11\\.user_uploaded';
const projectPublicDir = 'c:\\Users\\vasan\\.gemini\antigravity\\scratch\\ai-capital-investment\\public';
const certsPublicDir = path.join(projectPublicDir, 'certificates');

if (!fs.existsSync(certsPublicDir)) {
    fs.mkdirSync(certsPublicDir, { recursive: true });
}

// 1. Copy face photos
const faceFiles = [
    { src: 'media__1785221807592.png', dest: 'ankush_jain.png' },
    { src: 'media__1785221788292.png', dest: 'anant_jain.png' },
    { src: 'media__1785221807592.png', dest: 'ankush_jain.jpg' },
    { src: 'media__1785221788292.png', dest: 'anant_jain.jpg' }
];

faceFiles.forEach(f => {
    const src = path.join(brainUserUploadedDir, f.src);
    const dest = path.join(projectPublicDir, f.dest);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied face photo: ${f.src} -> public/${f.dest}`);
    }
});

// 2. Copy certificate images
const certFiles = [
    { src: 'media__1785221511280.png', dest: 'ankush_jain_nism_xxia_pms_advisor.png' },
    { src: 'media__1785221511289.png', dest: 'ankush_jain_nism_xv_research_analyst.png' },
    { src: 'media__1785221511592.jpg', dest: 'ankush_jain_nism_va_mutual_funds.jpg' },
    { src: 'media__1785221532320.png', dest: 'anant_jain_nism_va_mutual_funds.png' },
    { src: 'media__1785221532533.jpg', dest: 'anant_jain_nism_xvi_commodity_derivatives.jpg' }
];

certFiles.forEach(f => {
    const src = path.join(brainUserUploadedDir, f.src);
    const dest = path.join(certsPublicDir, f.dest);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied cert image: ${f.src} -> public/certificates/${f.dest}`);
    }
});

// 3. Read Base64 Data URIs for face photos to embed in React component as fail-proof fallback
const ankushFaceBase64 = `data:image/png;base64,${fs.readFileSync(path.join(brainUserUploadedDir, 'media__1785221807592.png')).toString('base64')}`;
const anantFaceBase64 = `data:image/png;base64,${fs.readFileSync(path.join(brainUserUploadedDir, 'media__1785221788292.png')).toString('base64')}`;

// Read Base64 Data URIs for certificates
const ankushVaBase64 = `data:image/jpeg;base64,${fs.readFileSync(path.join(brainUserUploadedDir, 'media__1785221511592.jpg')).toString('base64')}`;
const ankushXvBase64 = `data:image/png;base64,${fs.readFileSync(path.join(brainUserUploadedDir, 'media__1785221511289.png')).toString('base64')}`;
const ankushXxiaBase64 = `data:image/png;base64,${fs.readFileSync(path.join(brainUserUploadedDir, 'media__1785221511280.png')).toString('base64')}`;

const anantVaBase64 = `data:image/png;base64,${fs.readFileSync(path.join(brainUserUploadedDir, 'media__1785221532320.png')).toString('base64')}`;
const anantXviBase64 = `data:image/jpeg;base64,${fs.readFileSync(path.join(brainUserUploadedDir, 'media__1785221532533.jpg')).toString('base64')}`;

const assetDataFile = 'c:\\Users\\vasan\\.gemini\\antigravity\\scratch\\ai-capital-investment\\src\\components\\certificateAssets.ts';
const content = `// Auto-generated fail-proof asset data URIs for direct rendering
export const ankushFacePhoto = "${ankushFaceBase64}";
export const anantFacePhoto = "${anantFaceBase64}";

export const ankushVaCertImage = "${ankushVaBase64}";
export const ankushXvCertImage = "${ankushXvBase64}";
export const ankushXxiaCertImage = "${ankushXxiaBase64}";

export const anantVaCertImage = "${anantVaBase64}";
export const anantXviCertImage = "${anantXviBase64}";
`;

fs.writeFileSync(assetDataFile, content);
console.log('Successfully created src/components/certificateAssets.ts with embedded Base64 Data URIs!');
