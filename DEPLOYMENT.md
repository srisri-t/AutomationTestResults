# GitHub Pages Deployment Guide

This guide will help you set up automatic deployment to GitHub Pages for the Automation Test Results Viewer.

## 🚀 Quick Setup (5 minutes)

### Step 1: Repository Setup
1. **Fork or clone this repository** to your GitHub account
2. **Rename the repository** to match your desired URL structure (optional)
3. **Enable GitHub Pages** in repository settings

### Step 2: Configure GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### Step 3: Update Configuration (if needed)
If you renamed your repository, update the following files:

**cucumber-report-viewer/vue.config.js**:
```javascript
publicPath: process.env.NODE_ENV === 'production' 
  ? '/YOUR-REPOSITORY-NAME/' 
  : '/',
```

**cucumber-report-viewer/.env.production**:
```
VUE_APP_BASE_URL=/YOUR-REPOSITORY-NAME/
VUE_APP_REPORTS_BASE_URL=/YOUR-REPOSITORY-NAME/TestResultsJsons/
```

### Step 4: Deploy
1. **Commit and push** any changes to the main branch:
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push origin main
   ```

2. **Monitor deployment** in the Actions tab
3. **Access your site** at: `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`

## 🔧 Advanced Configuration

### Custom Domain (Optional)
1. Add a `CNAME` file to `cucumber-report-viewer/public/` with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

### Environment Variables
The application automatically detects the environment:
- **Development**: Uses local paths and API endpoints
- **Production**: Uses GitHub Pages paths and static file serving

### Build Process
The GitHub Actions workflow:
1. **Installs** Node.js and dependencies
2. **Builds** the Vue.js application
3. **Deploys** to GitHub Pages
4. **Updates** the live site automatically

## 🐛 Troubleshooting

### Common Issues

**1. Site shows 404 error**
- Verify GitHub Pages is enabled
- Check that the workflow completed successfully
- Ensure the repository is public (or you have GitHub Pro for private repos)

**2. Assets not loading**
- Check the `publicPath` in `vue.config.js`
- Verify the repository name matches the configuration
- Look for console errors in browser developer tools

**3. Deployment fails**
- Check the Actions tab for error logs
- Verify `package.json` and dependencies are correct
- Ensure Node.js version compatibility

**4. Old version still showing**
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check if deployment actually completed
- Verify the correct branch is being deployed

### Debugging Steps

1. **Check GitHub Actions logs**:
   - Go to Actions tab in your repository
   - Click on the latest workflow run
   - Review build and deploy logs

2. **Verify file structure**:
   ```
   cucumber-report-viewer/
   ├── dist/           # Built files (created during deployment)
   ├── src/            # Source code
   ├── public/         # Static assets
   └── package.json    # Dependencies
   ```

3. **Test locally**:
   ```bash
   cd cucumber-report-viewer
   npm run build
   npm run serve:dist  # Test production build locally
   ```

## 📊 Monitoring

### Deployment Status
- **Green checkmark**: Deployment successful
- **Red X**: Deployment failed (check logs)
- **Yellow circle**: Deployment in progress

### Performance
- GitHub Pages provides CDN distribution
- Automatic HTTPS certificate
- Global edge locations for fast loading

### Analytics (Optional)
Add Google Analytics or other tracking to monitor usage:
1. Add tracking code to `public/index.html`
2. Configure in your analytics dashboard
3. Monitor visitor statistics and performance

## 🔄 Updating the Site

### Automatic Updates
- **Push to main branch** → Automatic deployment
- **Pull request merge** → Automatic deployment
- **Manual trigger** → Use "Run workflow" in Actions tab

### Manual Deployment
If you need to deploy manually:
```bash
cd cucumber-report-viewer
npm run build:gh-pages
# Upload dist/ folder contents to gh-pages branch
```

## 🛡️ Security

### Best Practices
- Keep dependencies updated
- Use HTTPS (automatically enabled)
- Validate uploaded files client-side
- Sanitize user inputs

### Permissions
The GitHub Actions workflow uses minimal permissions:
- `contents: read` - Read repository files
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Authentication

## 📞 Support

If you encounter issues:
1. **Check this guide** for common solutions
2. **Review GitHub Actions logs** for specific errors
3. **Create an issue** in the repository with details
4. **Check GitHub Pages status** at [githubstatus.com](https://githubstatus.com)

---

**Success!** 🎉 Your Automation Test Results Viewer should now be live on GitHub Pages!