# GitHub Push Script for AutomationTestResults Project
# This script allows pushing to a specific GitHub repository with custom credentials
# without affecting global Git configuration

Write-Host "=== GitHub Push Script for AutomationTestResults ===" -ForegroundColor Green
Write-Host ""

# Get the GitHub token securely
Write-Host "Please enter your GitHub Personal Access Token for the srisri-t/AutomationTestResults repository:" -ForegroundColor Yellow
$token = Read-Host -AsSecureString
$tokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($token))

Write-Host ""
Write-Host "Configuring repository-specific Git settings..." -ForegroundColor Cyan

# Set repository-specific user configuration (only for this repo)
git config user.name "srisri-t"
git config user.email "srisri-t@users.noreply.github.com"

Write-Host "Repository Git config updated." -ForegroundColor Green

# Create the authenticated URL
$repoUrl = "https://${tokenPlain}@github.com/srisri-t/AutomationTestResults.git"

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan

try {
    # Push using the authenticated URL
    git push $repoUrl main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Go to your GitHub repository: https://github.com/srisri-t/AutomationTestResults" -ForegroundColor White
        Write-Host "2. Navigate to Settings > Pages" -ForegroundColor White
        Write-Host "3. Select 'GitHub Actions' as the source" -ForegroundColor White
        Write-Host "4. Wait for the deployment to complete" -ForegroundColor White
        Write-Host "5. Your site will be live at: https://srisri-t.github.io/AutomationTestResults/" -ForegroundColor White
        Write-Host ""
        Write-Host "You can monitor the deployment in the Actions tab of your repository." -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "❌ Push failed. Please check the error message above." -ForegroundColor Red
    }
} catch {
    Write-Host ""
    Write-Host "❌ Error occurred during push: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    # Clear the token from memory
    $tokenPlain = $null
    $token = $null
    [System.GC]::Collect()
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")