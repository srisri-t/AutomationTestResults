@echo off
echo === GitHub Push Script for AutomationTestResults ===
echo.

echo Please enter your GitHub Personal Access Token for the srisri-t/AutomationTestResults repository:
set /p token="Token: "

echo.
echo Configuring repository-specific Git settings...

REM Set repository-specific user configuration (only for this repo)
git config user.name "srisri-t"
git config user.email "srisri-t@users.noreply.github.com"

echo Repository Git config updated.
echo.

echo Pushing to GitHub...

REM Push using the authenticated URL
git push https://%token%@github.com/srisri-t/AutomationTestResults.git main

if %errorlevel% equ 0 (
    echo.
    echo ✅ Successfully pushed to GitHub!
    echo.
    echo Next steps:
    echo 1. Go to your GitHub repository: https://github.com/srisri-t/AutomationTestResults
    echo 2. Navigate to Settings ^> Pages
    echo 3. Select 'GitHub Actions' as the source
    echo 4. Wait for the deployment to complete
    echo 5. Your site will be live at: https://srisri-t.github.io/AutomationTestResults/
    echo.
    echo You can monitor the deployment in the Actions tab of your repository.
) else (
    echo.
    echo ❌ Push failed. Please check the error message above.
)

REM Clear the token variable
set token=

echo.
pause