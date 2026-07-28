import fs from 'fs';
import path from 'path';

const downloadsDir = 'C:\\Users\\vasan\\Downloads';
const publicDir = 'c:\\Users\\vasan\\.gemini\\antigravity\\scratch\\ai-capital-investment\\public';

function extractJpegFromPdf(pdfPath, outputPath) {
    if (!fs.existsSync(pdfPath)) {
        console.warn(`PDF not found: ${pdfPath}`);
        return false;
    }
    const buffer = fs.readFileSync(pdfPath);
    let offset = 0;
    const jpegs = [];

    while (offset < buffer.length - 3) {
        // Search for JPEG SOI (0xFF, 0xD8, 0xFF)
        if (buffer[offset] === 0xFF && buffer[offset + 1] === 0xD8 && buffer[offset + 2] === 0xFF) {
            const start = offset;
            let end = -1;
            for (let i = start + 2; i < buffer.length - 1; i++) {
                // Search for JPEG EOI (0xFF, 0xD9)
                if (buffer[i] === 0xFF && buffer[i + 1] === 0xD9) {
                    end = i + 2;
                    break;
                }
            }
            if (end !== -1) {
                const jpegBuffer = buffer.slice(start, end);
                // Only take images larger than 3KB (to ignore small icons or logos if any)
                if (jpegBuffer.length > 3000) {
                    jpegs.push(jpegBuffer);
                }
                offset = end;
                continue;
            }
        }
        offset++;
    }

    if (jpegs.length > 0) {
        // Sort by size to get the face photo (candidate photos in NISM certificates are usually 5KB - 50KB)
        jpegs.sort((a, b) => b.length - a.length);
        fs.writeFileSync(outputPath, jpegs[0]);
        console.log(`Successfully extracted exact candidate photo (${jpegs[0].length} bytes) -> ${outputPath}`);
        return true;
    } else {
        console.warn(`No JPEG image streams found in ${pdfPath}`);
        return false;
    }
}

// Extract Ankush Jain photo from Ankush Jain_NISM V.pdf
const ankushPdf = path.join(downloadsDir, 'Ankush Jain_NISM V.pdf');
const ankushOutput = path.join(publicDir, 'ankush_jain.jpg');
extractJpegFromPdf(ankushPdf, ankushOutput);

// Extract Anant Jain photo from NSIM_VA_Anant Jain.pdf
const anantPdf = path.join(downloadsDir, 'NSIM_VA_Anant Jain.pdf');
const anantOutput = path.join(publicDir, 'anant_jain.jpg');
extractJpegFromPdf(anantPdf, anantOutput);
