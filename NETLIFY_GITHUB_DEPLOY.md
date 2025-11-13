# Netlify + GitHub Deployment Guide

## ✅ Current Status

- **GitHub Repository**: https://github.com/adiraza/SalmanAkhtarWeb.git
- **Code Pushed**: ✅ Ready
- **Netlify Token**: Configured

## 🚀 Deploy to Netlify via Dashboard (Recommended)

Since the CLI is having issues, the easiest way is to deploy via the Netlify Dashboard:

### Step 1: Create New Site on Netlify

1. **Go to**: https://app.netlify.com
2. **Login** with: adilrazanafi786@gmail.com
3. **Click "Add new site"** → **"Import an existing project"**
4. **Choose "GitHub"**
5. **Authorize Netlify** to access your GitHub (if needed)
6. **Select repository**: `adiraza/SalmanAkhtarWeb`
7. **Click "Connect"**

### Step 2: Configure Build Settings

Netlify should auto-detect Next.js, but verify:

- **Build command**: `npm run build`
- **Publish directory**: Leave empty (plugin handles it)
- **Base directory**: Leave empty (root)

### Step 3: Deploy

1. **Click "Deploy site"**
2. Wait for build to complete (2-5 minutes)
3. Your site will be live at: `https://excel-energy-solar.netlify.app`

## 🔧 Alternative: Deploy via Netlify API

If you prefer CLI, we can use the Netlify API directly.

## 📋 Build Configuration

Your `netlify.toml` is already configured:

```toml
[build]
  command = "npm run build"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"
```

## 🔐 After Deployment

1. **Initialize Data**: Visit `https://your-site.netlify.app/api/init`
2. **Admin Login**: 
   - URL: `https://your-site.netlify.app/admin`
   - Username: `admin`
   - Password: `admin123`

## 🔄 Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch will auto-deploy
- You can see deploy status in Netlify dashboard
- Build logs are available for debugging

## 📝 Next Steps

1. Complete the dashboard deployment (Step 1-3 above)
2. Test your live site
3. Initialize data via `/api/init`
4. Start managing content via admin panel

