# Deployment Guide — Vercel

## Overview

LR Fit Method is deployed on **Vercel**, with automatic deployments on every push to `master` branch.

## Quick Start

### 1. Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Select "Import Git Repository"
4. Authorize GitHub and select `Agente_Criador_LandingPage`
5. Vercel auto-detects Vite configuration

### 2. Environment Variables

Configure in Vercel dashboard under **Settings → Environment Variables**:

```
VITE_META_PIXEL_ID=YOUR_PIXEL_ID
VITE_GA_ID=YOUR_GA_ID
VITE_API_URL=https://api.lrfitmethod.com
```

Production Preview Deployment Staging
✅ Must set   ✅ Must set      ✅ Must set

### 3. Deploy

**Automatic:** Every push to `master` triggers deployment
**Manual:** Push the "Deploy" button in Vercel dashboard

## Deployment Domains

| Environment | Domain | Status |
|------------|--------|--------|
| Production | `lrfitmethod.vercel.app` | Auto-deploy on `master` |
| Preview | `pr-*.lrfitmethod.vercel.app` | Auto-deploy on PR |
| Local | `localhost:5173` | `npm run dev` |

## Build Process

Vercel automatically:

1. **Installs dependencies:** `npm ci`
2. **Validates content:** `npm run validate-content`
3. **Builds project:** `npm run build`
4. **Deploys dist/:** to Vercel CDN

**Build time:** ~2-3 minutes
**Cache:** Reuses node_modules and build cache

## Monitoring Deployments

### 1. Vercel Dashboard
- View all deployments
- Check build logs
- Monitor performance metrics
- Manage domains

### 2. GitHub Integration
- Deployment status appears on PRs
- Auto-comment with preview URL
- Block merge if build fails

### 3. Environment Metrics
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

## Production Checklist

Before going live:

- [ ] Environment variables configured
- [ ] Custom domain connected (if applicable)
- [ ] SSL certificate enabled (automatic)
- [ ] Analytics tracking verified
- [ ] Meta Pixel firing correctly
- [ ] 404 page configured
- [ ] Redirects working
- [ ] Performance metrics passing

## Custom Domain (Optional)

To use a custom domain like `lrfit.com`:

1. Vercel Dashboard → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Wait for propagation (~24 hours)

## Rollback

To revert to a previous deployment:

1. Vercel Dashboard → Deployments
2. Find previous stable deployment
3. Click "Promote to Production"
4. Confirm rollback

**OR** (via Git):
```bash
git revert <commit-hash>
git push origin master
# Vercel auto-deploys
```

## Environment Variables

### Production-Only
```
VITE_API_URL=https://api.lrfitmethod.com
```

### All Environments
```
VITE_META_PIXEL_ID=<your-pixel-id>
VITE_GA_ID=<your-ga-id>
```

## Monitoring & Alerts

### Performance Monitoring
- Core Web Vitals tracked automatically
- Alerts if LCP > 2.5s
- Alerts if CLS > 0.1

### Error Monitoring
- Sentry integration (optional)
- Error logs in Vercel dashboard
- Real-time alerts

### Usage Monitoring
- Function executions tracked
- Bandwidth monitored
- Monthly reports available

## Troubleshooting

### Build Fails
```bash
# Check logs in Vercel dashboard
# Common causes:
# - Missing environment variable
# - Validation error (check PENDENTE placeholders)
# - Dependency conflict
```

**Fix:** Push a new commit to retry

### Slow Deployments
- Check CDN edge cache
- Verify edge functions aren't blocking
- Monitor network requests

### Performance Issues
- Check Core Web Vitals
- Review bundle size: `npm run analyze`
- Enable image optimization

## Free Tier Limits

Vercel's Free plan includes:
- ✅ 100GB/month bandwidth
- ✅ Automatic HTTPS
- ✅ Serverless functions
- ✅ Unlimited previews
- ✅ Real-time deployment monitoring

Scaling to Pro at $20/month if needed.

## CI/CD Pipeline

```
Push to master
      ↓
GitHub Actions trigger
      ↓
Build & validate (npm run validate-content)
      ↓
Tests pass
      ↓
Deploy to Vercel
      ↓
Domain live in ~2 min
```

## Success Indicators

✅ Green checkmark on GitHub commit
✅ "Visit" link works on PR
✅ No console errors in DevTools
✅ Meta Pixel firing (check Meta Business Suite)
✅ Analytics showing data (if GA configured)

---

**Need help?** Check the Vercel docs at https://vercel.com/docs or email wagnerfjr@gmail.com
