@echo off
echo ========================================================
echo Pushing Vercel build syntax fix to GitHub...
echo Repository: https://github.com/Vaasanthi21/ai-capital-investment.git
echo ========================================================
cd /d "c:\Users\vasan\.gemini\antigravity\scratch\ai-capital-investment"
git add .
git commit -m "fix: remove un-escaped CSS selector delimiter from index.css to resolve Vercel build error"
git push origin main
echo ========================================================
echo Push complete! Vercel build will succeed.
echo ========================================================
