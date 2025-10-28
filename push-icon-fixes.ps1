# Icon Alignment Fixes Push Script
Write-Host "=== Pushing Icon Alignment and Padding Improvements ===" -ForegroundColor Green
Write-Host ""

# Check git status
Write-Host "Checking current changes..." -ForegroundColor Cyan
git status

Write-Host ""
Write-Host "Adding all changes..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "Committing icon alignment improvements..." -ForegroundColor Cyan
git commit -m "Fix icon alignment and padding issues in mobile header

- Fixed info card icons alignment and consistent padding
- Improved time and duration card icon positioning
- Enhanced action buttons (back, refresh, delete) styling and positioning
- Added proper flex properties for consistent icon containers
- Improved mobile responsive sizing for all card elements
- Fixed icon container dimensions and centering
- Enhanced touch targets for better mobile interaction"

Write-Host ""
Write-Host "Please enter your GitHub Personal Access Token:" -ForegroundColor Yellow
$token = Read-Host -AsSecureString
$tokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($token))

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan

try {
    # Create the authenticated URL
    $repoUrl = "https://${tokenPlain}@github.com/srisri-t/AutomationTestResults.git"
    
    # Push using the authenticated URL
    git push $repoUrl main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Icon alignment fixes pushed successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Icon improvements include:" -ForegroundColor Yellow
        Write-Host "• Consistent icon container sizing and alignment" -ForegroundColor White
        Write-Host "• Proper padding and spacing for all info cards" -ForegroundColor White
        Write-Host "• Better positioned action buttons with backdrop blur" -ForegroundColor White
        Write-Host "• Enhanced touch targets for mobile devices" -ForegroundColor White
        Write-Host "• Improved visual consistency across all card elements" -ForegroundColor White
        Write-Host ""
        Write-Host "Your site will be updated at: https://srisri-t.github.io/AutomationTestResults/" -ForegroundColor Cyan
        Write-Host "The deployment will complete in 2-5 minutes." -ForegroundColor Cyan
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