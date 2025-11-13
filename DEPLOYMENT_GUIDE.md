# Deployment Guide

## GitHub Setup

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Excel Energy website with admin panel"
```

### 2. Add GitHub Remote

```bash
git remote add origin https://github.com/adilraza786786/SalmanAkhtarWeb.git
git branch -M main
git push -u origin main
```

**Note**: You'll need to authenticate with GitHub. You can:
- Use GitHub CLI: `gh auth login`
- Use personal access token
- Use SSH keys

## Netlify Deployment

### Option 1: Deploy via Netlify Dashboard

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up/Login
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub repository: `SalmanAkhtarWeb`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Environment Variables

Add these in Netlify Dashboard → Site Settings → Environment Variables:

```
JWT_SECRET=your-secret-key-here-change-in-production
NODE_ENV=production
```

## Important Notes

1. **Data Storage**: The `/data` directory is gitignored. For production:
   - Use Netlify's environment variables for sensitive data
   - Consider migrating to a database (MongoDB, PostgreSQL)
   - Use Netlify Functions for serverless data storage

2. **File System**: Netlify Functions have read-only filesystem except `/tmp`
   - Consider using a database or external storage
   - Or use Netlify's built-in data storage

3. **Build Settings**: 
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Admin Panel Access**:
   - After deployment, access at: `https://your-site.netlify.app/admin/login`
   - Default credentials: `admin` / `admin123`
   - **Change password immediately in production!**

## Post-Deployment Checklist

- [ ] Change admin password
- [ ] Set JWT_SECRET environment variable
- [ ] Test admin panel functionality
- [ ] Test website content updates
- [ ] Verify API endpoints work
- [ ] Check analytics tracking
- [ ] Test contact form
- [ ] Test quote generation

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Verify all dependencies are installed
- Check for TypeScript errors

### Admin Panel Not Working
- Verify JWT_SECRET is set
- Check API routes are accessible
- Verify authentication cookies work

### Data Not Persisting
- Netlify Functions have read-only filesystem
- Consider using database or external storage
- Use Netlify's environment variables for config

