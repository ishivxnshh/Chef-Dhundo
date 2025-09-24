# GitHub Actions Setup for Clerk Environment Variables

## 🔑 Required GitHub Secrets

To fix the Clerk authentication build error, you need to add these secrets to your GitHub repository:

### 1. Go to GitHub Repository Settings
- Navigate to your repository on GitHub
- Click **Settings** tab
- Click **Secrets and variables** → **Actions**

### 2. Add These Repository Secrets

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_live_Y2xlcmsuY2hlZmRodW5kby5jb20k` | Your Clerk publishable key |
| `CLERK_SECRET_KEY` | `sk_live_your_secret_key_here` | Your Clerk secret key |

### 3. How to Add Secrets
1. Click **New repository secret**
2. Name: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
3. Value: Copy from your `.env` file
4. Click **Add secret**
5. Repeat for `CLERK_SECRET_KEY`

## 🚀 What This Fixes

- ✅ Clerk authentication during GitHub Actions build
- ✅ Environment variables available during deployment
- ✅ No more "Missing publishableKey" errors
- ✅ Successful builds and deployments

## 📝 Current Configuration

The workflow file (`.github/workflows/main_chefdhundoweb.yml`) has been updated to:
- Pass environment variables to the build step
- Use GitHub secrets for sensitive data
- Ensure Clerk keys are available during build

## 🔍 Verification

After adding the secrets:
1. Push any change to trigger the workflow
2. Check the Actions tab for successful builds
3. Verify deployment to Azure App Service

## ⚠️ Important Notes

- **Never commit `.env` files to GitHub**
- **Use GitHub Secrets for all sensitive data**
- **The `.env` file is only for local development**
- **Azure App Service will also need these environment variables**
