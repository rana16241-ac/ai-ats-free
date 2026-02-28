# 🚀 Deployment Guide

This guide covers deploying AI-ATS to Vercel for FREE.

## Prerequisites

- GitHub account with the repository
- Vercel account (free)
- Supabase project setup
- Hugging Face API key

## Option 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Connect to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

### Step 2: Import Project

1. Click "Add New..." → "Project"
2. Find `ai-ats-free` in your repository list
3. Click "Import"

### Step 3: Configure Project

1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `./` (leave as is)
3. **Build Command**: `npm run build` (auto-filled)
4. **Output Directory**: `.next` (auto-filled)

### Step 4: Add Environment Variables

Click "Environment Variables" and add:

```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
HUGGINGFACE_API_KEY = your_huggingface_api_key
```

**Important**: Add these to all environments (Production, Preview, Development)

### Step 5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Your app will be live at `https://your-project.vercel.app`

## Option 2: Deploy via CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Deploy

```bash
# From project root
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? ai-ats-free
# - Directory? ./
# - Override settings? No
```

### Step 4: Add Environment Variables

```bash
# Add production environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add HUGGINGFACE_API_KEY production
```

### Step 5: Deploy to Production

```bash
vercel --prod
```

## Post-Deployment

### 1. Verify Deployment

Visit your deployment URL and check:
- ✅ Homepage loads
- ✅ Can create a job
- ✅ Can upload resume
- ✅ AI matching works

### 2. Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-60 minutes)

### 3. Monitor Usage

**Vercel Free Tier Limits:**
- 100GB bandwidth/month
- 100 deployments/day
- Unlimited projects

**Check usage:**
1. Vercel Dashboard → Your Project → Analytics
2. Monitor bandwidth and function invocations

## Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Ensure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

**Error: "Environment variable not found"**
- Check environment variables in Vercel Dashboard
- Ensure they're added to Production environment
- Redeploy after adding variables

### Runtime Errors

**Error: "Supabase client error"**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Check Supabase project is active

**Error: "Hugging Face API error"**
- Verify `HUGGINGFACE_API_KEY` is correct
- Check you haven't exceeded free tier
- API will fallback to keyword matching if unavailable

### Performance Issues

**Slow page loads:**
- Enable Vercel Analytics
- Check function execution times
- Optimize images and assets

**High bandwidth usage:**
- Implement caching
- Optimize resume file sizes
- Use Vercel Image Optimization

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically builds and deploys
```

**Preview Deployments:**
- Every pull request gets a preview URL
- Test changes before merging
- Share with team for review

## Environment Management

### Development
```bash
# Local development
npm run dev
```

### Preview (Staging)
- Automatic for pull requests
- URL: `https://ai-ats-free-git-branch-name.vercel.app`

### Production
- Deploys from `main` branch
- URL: `https://ai-ats-free.vercel.app`

## Rollback

If deployment has issues:

1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

## Monitoring

### Vercel Analytics (Free)

1. Enable in Vercel Dashboard → Analytics
2. Track:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### Error Tracking

Check Vercel Dashboard → Functions for:
- Function errors
- Execution time
- Invocation count

## Scaling

### When to Upgrade

**Vercel Pro ($20/month):**
- >100GB bandwidth
- Need password protection
- Want advanced analytics

**Supabase Pro ($25/month):**
- >500MB database
- >1GB storage
- Need more API requests

**Hugging Face:**
- >30k API requests/month
- Consider self-hosting models

## Security

### Environment Variables
- Never commit `.env.local` to Git
- Use Vercel environment variables for production
- Rotate API keys periodically

### Supabase
- Enable Row Level Security (RLS)
- Use anon key for client-side
- Keep service key secret

## Backup

### Database Backup

```bash
# Export Supabase data
# Go to Supabase Dashboard → Database → Backups
# Download backup
```

### Code Backup

```bash
# Your code is on GitHub
# Vercel keeps deployment history
# No additional backup needed
```

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Your AI-ATS is now live! 🎉**

Share your deployment URL and start screening candidates!