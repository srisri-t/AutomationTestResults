# Automation Test Results Viewer

A modern web application for visualizing and managing Cucumber JSON test reports with an intuitive interface, built using Vue.js and deployed on GitHub Pages.

## 🚀 Live Demo

Visit the live application: [https://YOUR-USERNAME.github.io/AutomationTestResults/](https://YOUR-USERNAME.github.io/AutomationTestResults/)

## 🛠️ Setup for GitHub Pages Deployment

### Prerequisites
- GitHub account
- Node.js 16+ installed locally
- Git configured

### Quick Setup

1. **Fork or Clone this repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/AutomationTestResults.git
   cd AutomationTestResults
   ```

2. **Install Dependencies**
   ```bash
   cd cucumber-report-viewer
   npm install
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source
   - Save the settings

4. **Push to Main Branch**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

5. **Access Your Site**
   - Your site will be available at: `https://YOUR-USERNAME.github.io/AutomationTestResults/`
   - GitHub Actions will automatically build and deploy on every push to main

## 🏃‍♂️ Local Development

### Start Development Server
```bash
cd cucumber-report-viewer
npm run serve
```
- Frontend: `http://localhost:8080`

### Start Backend Server (Optional)
```bash
cd cucumber-report-viewer
npm run server
```
- Backend API: `http://localhost:3001`

### Full Stack Development
```bash
cd cucumber-report-viewer
npm run dev
```

## 📁 Project Structure

```
AutomationTestResults/
├── .github/workflows/       # GitHub Actions deployment
├── cucumber-report-viewer/  # Main Vue.js application
│   ├── src/                # Source code
│   ├── public/             # Static assets
│   ├── server.js           # Express backend
│   └── package.json        # Dependencies
├── docs/                   # Documentation
└── Jsons/                  # Sample test reports
```

## 🔧 Configuration

### Environment Variables
- **Production** (`.env.production`): Configured for GitHub Pages
- **Development** (`.env.development`): Configured for local development

### Vue Configuration
The `vue.config.js` is configured to:
- Use correct public path for GitHub Pages
- Enable PWA features
- Optimize build for production
- Handle asset copying

## 📊 Features

- **Upload & Visualize** Cucumber JSON reports
- **Interactive Dashboard** with test statistics
- **Advanced Search & Filtering** capabilities
- **Dark/Light Theme** support
- **Responsive Design** for all devices
- **GitHub Pages Integration** for easy sharing

## 🚀 Deployment Process

The deployment is fully automated using GitHub Actions:

1. **Trigger**: Push to main branch or manual workflow dispatch
2. **Build**: Install dependencies and build Vue.js application
3. **Deploy**: Upload build artifacts to GitHub Pages
4. **Live**: Site is automatically updated

## 🔍 Troubleshooting

### Common Issues

1. **Site not loading after deployment**
   - Check GitHub Actions logs for build errors
   - Verify GitHub Pages is enabled in repository settings
   - Ensure the repository name matches the configuration

2. **Assets not loading**
   - Verify the `publicPath` in `vue.config.js` matches your repository name
   - Check browser console for 404 errors

3. **Routing issues**
   - The app uses hash routing for GitHub Pages compatibility
   - 404.html handles SPA routing redirects

### Getting Help

1. Check the [GitHub Actions logs](../../actions) for deployment issues
2. Review the [documentation](docs/) for detailed guides
3. Create an issue if you encounter problems

## 📝 License

MIT License - see LICENSE file for details

---

**Note**: Replace `YOUR-USERNAME` with your actual GitHub username in the URLs above.