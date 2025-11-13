# GitHub Repository Setup Guide

## Step 1: Create Repository on GitHub

1. **Go to GitHub**: https://github.com
2. **Sign in** with your account (adilraza786786@gmail.com)
3. **Click the "+" icon** (top right) → **"New repository"**
4. **Repository name**: `SalmanAkhtarWeb`
5. **Description**: "Excel Energy Solar - Next.js Website with Admin Panel"
6. **Visibility**: Choose **Public** or **Private**
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. **Click "Create repository"**

## Step 2: Push Your Code

After creating the repository, run these commands:

```bash
# Make sure you're in the project directory
cd "C:\Users\loser\Desktop\New folder (2)\New folder\my-next-project"

# Verify remote is set (or set it)
git remote add origin https://github.com/adilraza786786/SalmanAkhtarWeb.git

# Or if it already exists, update it:
git remote set-url origin https://github.com/adilraza786786/SalmanAkhtarWeb.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Alternative: Use GitHub CLI (if installed)

```bash
gh repo create SalmanAkhtarWeb --public --source=. --remote=origin --push
```

## Step 3: Verify

After pushing, check:
- **Repository URL**: https://github.com/adilraza786786/SalmanAkhtarWeb
- All your files should be visible
- The repository should show your commits

## Troubleshooting

### If you get "Repository not found":
- Make sure you created the repository on GitHub first
- Check the repository name matches exactly: `SalmanAkhtarWeb`
- Verify your GitHub username is correct

### If you get authentication errors:
- You may need to use a Personal Access Token instead of password
- Go to: GitHub → Settings → Developer settings → Personal access tokens
- Create a token with `repo` permissions
- Use the token as your password when pushing

### If you need to change the repository name:
```bash
git remote set-url origin https://github.com/adilraza786786/NEW-REPO-NAME.git
```

## Next Steps After Push

1. **Connect to Netlify** (optional):
   - Go to Netlify Dashboard
   - Site Settings → Build & Deploy → Continuous Deployment
   - Connect to GitHub
   - Select `SalmanAkhtarWeb` repository
   - Netlify will auto-deploy on every push

2. **Add README** (optional):
   - The README.md is already in your project
   - It will appear on GitHub after pushing

3. **Set up GitHub Actions** (optional):
   - For automated testing/deployment
   - Create `.github/workflows` directory

