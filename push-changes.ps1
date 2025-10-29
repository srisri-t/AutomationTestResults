# Universal GitHub Push Script
# Usage: Edit the commit message below and run the script

Write-Host "=== GitHub Push Script ===" -ForegroundColor Green
Write-Host ""

# ============================================
# EDIT COMMIT MESSAGE HERE
# ============================================
$commitMessage = @"
Create professional SVG preview card for social media sharing

- Created beautiful SVG preview card with GeoCall branding
- Updated meta tags to use SVG image for better compatibility
- Added structured data (JSON-LD) for enhanced SEO
- Professional gradient design with feature highlights
- Optimized 1200x630 dimensions for social media platforms
- Added HTML generator tool for creating PNG versions
- Enhanced link previews across all social platforms
- Improved brand visibility and professional appearance
"@

# ============================================
# SCRIPT EXECUTION (Don't modify below)
# ============================================

Write-Host "Commit Message:" -ForegroundColor Yellow
Write-Host $commitMessage -ForegroundColor White
Write-Host ""

# Check git status
Write-Host "Checking current changes..." -ForegroundColor Cyan
git status

Write-Host ""
$continue = Read-Host "Continue with commit and push? (y/n)"

if ($continue -ne 'y' -and $continue -ne 'Y') {
    Write-Host "Operation cancelled." -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "Adding all changes..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "Committing changes..." -ForegroundColor Cyan
git commit -m $commitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Commit failed. Please check the error above." -ForegroundColor Red
    exit
}

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
        Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your changes are now live at:" -ForegroundColor Yellow
        Write-Host "https://srisri-t.github.io/AutomationTestResults/" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "GitHub Pages will update in 2-5 minutes." -ForegroundColor White
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