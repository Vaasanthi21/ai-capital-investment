@echo off
echo ========================================================
echo Pushing pixel-perfect Verification Ledger update to GitHub...
echo Repository: https://github.com/Vaasanthi21/ai-capital-investment.git
echo ========================================================
cd /d "c:\Users\vasan\.gemini\antigravity\scratch\ai-capital-investment"
git add .
git commit -m "fix: refine Verification Ledger typography, spacing, border accents, and badge styling to match screenshot"
git push origin main
echo ========================================================
echo Push complete! Vercel build will deploy updated receipts ledger.
echo ========================================================
