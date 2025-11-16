# Deployment Guide

## Daily Workflow (Primary: Replit)

### Making Changes
1. Edit code in Replit workspace
2. Workflow auto-restarts on save
3. Test locally at your Replit dev URL

### Deploying to Production
1. Click **Deploy** button in Replit
2. Review changes in deployment preview
3. Click **Deploy** to publish
4. Your live app updates at `your-app.replit.app`

That's it. Replit handles everything else.

## Pre-Deployment Checklist

Before clicking Deploy:
- [ ] Run tests: `npm test` (31 tests should pass)
- [ ] Check TypeScript: `npm run check`
- [ ] Test critical flows manually:
  - [ ] Login/logout works
  - [ ] Exercise navigation works
  - [ ] Code compilation works
  - [ ] Progress saves correctly

## GitHub Integration (Optional)

### Initial Setup
```bash
# In Replit Shell
git remote add origin https://github.com/your-username/rustlings-ide.git
git push -u origin main
```

### Sync to GitHub (Backup & Version Control)
```bash
git add .
git commit -m "Your change description"
git push
```

**Note:** GitHub is for version history and collaboration. Deploy happens through Replit.

## GitHub Actions CI/CD

Your `.github/workflows/test.yml` runs tests automatically on:
- Every push to `main` or `develop`
- Every pull request

This catches bugs before they reach your Replit workspace.

## Rollback (Emergency)

### If Deployment Breaks
1. Click **Deployments** tab in Replit
2. Find last working deployment
3. Click **Redeploy** on that version

### If Workspace Breaks
1. Click **History** in Replit
2. Find checkpoint before issue
3. Click **Restore**

## Database Changes

```bash
# After modifying shared/schema.ts
npm run db:push
```

**Production database is separate** - changes in dev don't affect production until deployed.

## Monitoring

### Check App Health
- Replit Dashboard → Deployments → Status
- View logs in deployment details

### Check Database
- Replit sidebar → Database tab
- View production data (read-only recommended)

## Scaling (Future)

When you need more capacity:
1. **Autoscale deployments** (Replit handles traffic spikes automatically)
2. **Custom domain**: Settings → Deployments → Custom Domain
3. **Database optimization**: Add indexes, connection pooling
4. **CDN**: For static assets (Replit has this built-in)

## Common Scenarios

### "I want to test before deploying"
- Your dev URL is always live at `your-repl.replit.dev`
- Test there, then deploy when ready

### "I broke production"
- Redeploy previous version (see Rollback above)
- Fix in workspace, test, redeploy

### "I need team collaboration"
- Push to GitHub → teammates review PR → merge to main
- Then deploy from Replit with merged changes

### "I want automated deploys"
Replit doesn't auto-deploy from GitHub pushes. Keep it manual for now:
1. Push to GitHub (version control)
2. Pull changes in Replit if needed
3. Deploy via Replit button

This prevents untested code from going live.

## Best Practices

✅ **DO:**
- Run tests before every deployment
- Use GitHub for version history
- Deploy during low-traffic hours
- Keep dev and production databases separate

❌ **DON'T:**
- Deploy without testing
- Modify production database directly
- Skip the pre-deployment checklist

## Production URLs

- **Live app**: `your-app.replit.app`
- **Dev/test**: `your-repl.replit.dev`
- **Custom domain**: Configure in Replit Deployments settings

---

**Philosophy**: Keep deployment simple and manual. Replit's one-click deploy is your production pipeline. GitHub is your safety net.
