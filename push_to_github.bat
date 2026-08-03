@echo off
echo ========================================================
echo Pushing exact video match data and CSS updates to GitHub...
echo Repository: https://github.com/Vaasanthi21/ai-capital-investment.git
echo ========================================================
cd /d "c:\Users\vasan\.gemini\antigravity\scratch\ai-capital-investment"
git add .
git commit -m "fix: update accreditation data with exact video match PANs, CPE codes, and certificate details"
git push origin main
echo ========================================================
echo Push complete! Vercel build triggered.
echo ========================================================
