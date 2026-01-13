# GitHub Pages Deployment Fix

## ⚠️ CRITICAL: Repository Settings Must Be Changed

**Before this deployment can work, you MUST change your GitHub Pages settings:**

1. Go to your repository on GitHub: https://github.com/JorisDebien/jorisdebien.github.io
2. Navigate to **Settings** → **Pages** (in the left sidebar)
3. Under **Build and deployment** → **Source**, select **GitHub Actions** (instead of "Deploy from a branch")
4. Save the settings

**Why this is required:** The repository is currently set to "Deploy from a branch", which triggers an automatic Jekyll build workflow that conflicts with our custom Vite build workflow. This causes the deployment to timeout after 10 minutes.

## Problem
The GitHub Pages deployment was timing out because the repository was configured to use Jekyll (GitHub's default static site generator), but this is a React application built with Vite. The automatic Jekyll deployment workflow would get stuck in a "deployment_queued" state and timeout after 10 minutes.

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

### 4. Added Timeout Protection (`deploy.yml`)
- Added `timeout-minutes: 5` to the deploy job
- This ensures the workflow fails fast if there's an issue
- Without this, the deployment would wait for 10 minutes before timing out

## What Was Causing the Timeout?

When the repository is set to "Deploy from a branch" mode:
1. GitHub automatically runs a Jekyll-based "pages build and deployment" workflow
2. This Jekyll workflow conflicts with our custom Vite deployment workflow
3. The Jekyll workflow gets stuck in a "deployment_queued" state
4. After 10 minutes, GitHub cancels the deployment with "Deployment cancelled"
5. Meanwhile, our custom workflow can't deploy because only one deployment can be active at a time

The solution is to switch to "GitHub Actions" mode, which:
- Disables the automatic Jekyll workflow
- Allows only our custom workflow to run
- Deploys successfully in under 2 minutes

## How to Fix the Timeout Issue

### Step 1: Change Repository Settings (REQUIRED)

⚠️ **This is the ONLY way to fix the timeout issue:**

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment** → **Source**, select **GitHub Actions**
   - Do NOT use "Deploy from a branch"
4. Click Save

### Step 2: Verify the Fix

After changing the settings:
1. Push a new commit to the `main` branch (or manually trigger the workflow)
2. The "Deploy to GitHub Pages" workflow should run successfully
3. The old "pages build and deployment" (Jekyll) workflow should no longer run
4. Your site should deploy in under 2 minutes instead of timing out after 10 minutes

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
