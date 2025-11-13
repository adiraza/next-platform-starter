# GitHub Setup Script for Excel Energy Project (PowerShell)
# This script helps you push your code to GitHub

Write-Host "🚀 Setting up GitHub repository..." -ForegroundColor Cyan

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Add all files
Write-Host "📝 Adding files to git..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "💾 Committing changes..." -ForegroundColor Yellow
    git commit -m "Initial commit: Excel Energy website with admin panel"
} else {
    Write-Host "✅ No changes to commit" -ForegroundColor Green
}

# Check if remote exists
try {
    $remoteUrl = git remote get-url origin 2>$null
    if ($remoteUrl) {
        Write-Host "✅ Remote 'origin' already exists" -ForegroundColor Green
        Write-Host "   Current remote: $remoteUrl" -ForegroundColor Gray
        
        $changeRemote = Read-Host "Do you want to change the remote URL? (y/n)"
        if ($changeRemote -eq "y" -or $changeRemote -eq "Y") {
            git remote set-url origin https://github.com/adilraza786786/SalmanAkhtarWeb.git
            Write-Host "✅ Remote URL updated" -ForegroundColor Green
        }
    }
} catch {
    Write-Host "🔗 Adding remote repository..." -ForegroundColor Yellow
    git remote add origin https://github.com/adilraza786786/SalmanAkhtarWeb.git
}

# Set branch to main
git branch -M main

Write-Host ""
Write-Host "📤 Ready to push to GitHub!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Make sure you're logged into GitHub"
Write-Host "2. Create the repository 'SalmanAkhtarWeb' on GitHub if it doesn't exist"
Write-Host "3. Run: git push -u origin main"
Write-Host ""

$pushNow = Read-Host "Do you want to push now? (y/n)"
if ($pushNow -eq "y" -or $pushNow -eq "Y") {
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    } else {
        Write-Host "❌ Push failed. You may need to:" -ForegroundColor Red
        Write-Host "   1. Authenticate with GitHub" -ForegroundColor Yellow
        Write-Host "   2. Create the repository on GitHub first" -ForegroundColor Yellow
        Write-Host "   3. Check your internet connection" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "✨ Setup complete!" -ForegroundColor Green

