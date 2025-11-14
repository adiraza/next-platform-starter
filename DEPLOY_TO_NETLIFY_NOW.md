# 🚀 Deploy to Netlify - Step by Step Guide

## Quick Deploy (5 Minutes)

### Step 1: Go to Netlify Dashboard
1. **Visit**: https://app.netlify.com
2. **Login** with: adilrazanafi786@gmail.com

### Step 2: Import from GitHub
1. Click **"Add new site"** (top right corner)
2. Click **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. **Authorize Netlify** (if prompted) - Click "Authorize Netlify"
5. **Select repository**: `adiraza/next-platform-starter`
6. Click **"Connect"**

### Step 3: Configure Build Settings
Netlify will auto-detect Next.js, but verify:

**Build settings:**
- **Base directory**: (leave empty)
- **Build command**: `npm run build`
- **Publish directory**: (leave empty - plugin handles it)

**Environment variables:**
- Not needed for now (can add later if required)

### Step 4: Deploy!
1. Click **"Deploy site"** button
2. Wait 2-5 minutes for build to complete
3. ✅ Your site will be live!

## After Deployment

### Your Site URL
- **Live Site**: `https://excel-energy-solar.netlify.app` (or custom name Netlify assigns)
- **Admin Panel**: `https://your-site.netlify.app/admin`

### Initialize Data
1. Visit: `https://your-site.netlify.app/api/init`
2. This creates default data files

### Admin Login
- **URL**: `https://your-site.netlify.app/admin/login`
- **Username**: `admin`
- **Password**: `admin123`

## Continuous Deployment

Once connected:
- ✅ Every push to GitHub `main` branch = Auto-deploy
- ✅ Build logs available in dashboard
- ✅ Preview deployments for pull requests

## Troubleshooting

### If build fails:
1. Check build logs in Netlify dashboard
2. Look for specific error messages
3. Common issues:
   - Missing dependencies (already fixed)
   - Node version mismatch (should be 20)
   - Build timeout (rare)

### If site shows errors:
1. Visit `/api/init` to initialize data
2. Check function logs in Netlify dashboard
3. Verify all environment variables are set

## Quick Links
- **GitHub Repo**: https://github.com/adiraza/next-platform-starter
- **Netlify Dashboard**: https://app.netlify.com
- **Deploy Now**: https://app.netlify.com/start

---

**Your project is ready! Just follow steps 1-4 above! 🚀**

