# Mobile Responsiveness Fixes Push Script
Write-Host "=== Pushing Mobile Responsiveness Improvements ===" -ForegroundColor Green
Write-Host ""

# Check git status
Write-Host "Checking current changes..." -ForegroundColor Cyan
git status

Write-Host ""
Write-Host "Adding all changes..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "Committing mobile responsiveness improvements..." -ForegroundColor Cyan
git commit -m "Fix mobile responsiveness issues

- Enhanced ReportViewer mobile layout with better header, controls, and content spacing
- Improved ReportsCollection mobile grid and card layouts  
- Added comprehensive mobile styles for steps list and error displays
- Enhanced touch targets and typography for mobile devices
- Added global mobile responsive styles in App.vue
- Optimized for 768px, 480px, and 360px breakpoints
- Improved touch-friendly interactions and spacing"

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
        Write-Host "✅ Mobile responsiveness fixes pushed successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Changes include:" -ForegroundColor Yellow
        Write-Host "• Enhanced mobile header layout with better spacing" -ForegroundColor White
        Write-Host "• Improved search and filter controls for mobile" -ForegroundColor White
        Write-Host "• Better report cards and statistics display" -ForegroundColor White
        Write-Host "• Optimized steps list and error messages for mobile" -ForegroundColor White
        Write-Host "• Touch-friendly buttons and interactions" -ForegroundColor White
        Write-Host "• Responsive typography and spacing" -ForegroundColor White
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