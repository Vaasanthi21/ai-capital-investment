@echo off
echo ========================================================
echo Pushing updated Accreditation components to GitHub...
echo Repository: https://github.com/Vaasanthi21/ai-capital-investment.git
echo ========================================================
cd /d "c:\Users\vasan\.gemini\antigravity\scratch\ai-capital-investment"
git add .
git commit -m "feat: update Accreditation page with interactive components, lightboxes, and ledger"
git push origin main
echo ========================================================
echo Push complete!
echo ========================================================
