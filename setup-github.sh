#!/bin/bash

# GitHub Setup Script for Excel Energy Project
# This script helps you push your code to GitHub

echo "🚀 Setting up GitHub repository..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "📝 Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "Initial commit: Excel Energy website with admin panel"
fi

# Check if remote exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ Remote 'origin' already exists"
    REMOTE_URL=$(git remote get-url origin)
    echo "   Current remote: $REMOTE_URL"
    
    read -p "Do you want to change the remote URL? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote set-url origin https://github.com/adilraza786786/SalmanAkhtarWeb.git
        echo "✅ Remote URL updated"
    fi
else
    echo "🔗 Adding remote repository..."
    git remote add origin https://github.com/adilraza786786/SalmanAkhtarWeb.git
fi

# Set branch to main
git branch -M main

echo ""
echo "📤 Ready to push to GitHub!"
echo ""
echo "Next steps:"
echo "1. Make sure you're logged into GitHub"
echo "2. Create the repository 'SalmanAkhtarWeb' on GitHub if it doesn't exist"
echo "3. Run: git push -u origin main"
echo ""
echo "Or run this command now:"
echo "   git push -u origin main"
echo ""

read -p "Do you want to push now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Pushing to GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully pushed to GitHub!"
    else
        echo "❌ Push failed. You may need to:"
        echo "   1. Authenticate with GitHub"
        echo "   2. Create the repository on GitHub first"
        echo "   3. Check your internet connection"
    fi
fi

echo ""
echo "✨ Setup complete!"

