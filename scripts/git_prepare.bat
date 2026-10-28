@echo off
cd /d "e:\APLICATIVOS\3D"
git init
git branch -M main
git remote remove origin >nul 2>&1
git remote add origin https://github.com/felipemartins008-create/ziggie.git
git add .
git commit -m "feat: Loja Ziggie 3D completa com integracao Shopify"
echo COMMIT_DONE
