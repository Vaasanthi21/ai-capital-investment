@echo off
echo ========================================================
echo Pushing transparent copy button style fix to GitHub...
echo Repository: https://github.com/Vaasanthi21/ai-capital-investment.git
echo ========================================================
cd /d "c:\Users\vasan\.gemini\antigravity\scratch\ai-capital-investment"
git add .
git commit -m "fix: enforce explicit transparent background on copy and external link ledger buttons"
git push origin main
echo ========================================================
echo Push complete! Vercel build will update button backgrounds.
echo ========================================================
