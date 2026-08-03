@echo off
echo ========================================================
echo Pushing laser scanning animation fix to GitHub...
echo Repository: https://github.com/Vaasanthi21/ai-capital-investment.git
echo ========================================================
cd /d "c:\Users\vasan\.gemini\antigravity\scratch\ai-capital-investment"
git add .
git commit -m "fix: add scan-sweep CSS animation for active profile card laser scanning effect"
git push origin main
echo ========================================================
echo Push complete! Vercel build will update scanning effect.
echo ========================================================
