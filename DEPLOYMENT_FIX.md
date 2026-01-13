# GitHub Pages Deployment Fix

## Problem
The GitHub Pages deployment was failing because the repository was configured to use Jekyll (GitHub's default static site generator), but this is a React application built with Vite. The deployment would build successfully but then get cancelled during the deploy phase.

## Solution
This PR implements the following changes to properly deploy the Vite React app to GitHub Pages:

### 1. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Created a custom GitHub Actions workflow that:
  - Builds the Vite React app using `npm run build`
  - Uploads the build artifacts from the `dist` folder
  - Deploys to GitHub Pages using the official `actions/deploy-pages` action

### 2. Disable Jekyll Processing (`public/.nojekyll`)
- Added an empty `.nojekyll` file in the `public` directory
- This file gets copied to the `dist` folder during build
- Tells GitHub Pages to skip Jekyll processing and serve the static files as-is

### 3. SPA Routing Support (`package.json`)
- Updated the build script to create a `404.html` file (copy of `index.html`)
- This enables client-side routing with React Router
- When users navigate directly to routes like `/career` or `/skills`, GitHub Pages will serve the 404.html which loads the React app

### 4. Explicit Base URL (`vite.config.js`)
- Added explicit `base: '/'` configuration
- Ensures all asset paths are correct for the root domain deployment

## Required Repository Settings

⚠️ **IMPORTANT**: You need to update the repository settings to use GitHub Actions for deployment:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions** (instead of "Deploy from a branch")
4. Save the settings

Once this is configured, the workflow will automatically run on every push to the `main` branch.

## How It Works

1. When code is pushed to `main`, the workflow triggers
2. The workflow installs dependencies and builds the app with `npm run build`
3. The `dist` folder (containing the built React app) is uploaded as a Pages artifact
4. The artifact is deployed to GitHub Pages
5. Your site is available at https://jorisdebien.github.io/

## Testing Locally

You can test the build locally with:
```bash
npm run build
npm run preview
```

## References
- [Deploying Vite Apps to GitHub Pages](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions for GitHub Pages](https://github.com/actions/deploy-pages)
