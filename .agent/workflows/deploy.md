---
description: Step-by-step guide to deploy Runwal Seagull to production (FREE hosting)
---

# 🚀 Production Deployment Workflow

**Goal**: Deploy Runwal Seagull Society Portal to free hosting stack  
**Stack**: Vercel + Supabase + Cloudinary  
**Total Time**: ~2-3 hours  
**Cost**: $0 (100% free tier)

---

## 📋 Quick Reference

**Production URLs** (after deployment):
- **App**: https://runwal-seagull.vercel.app
- **Database**: Supabase Dashboard
- **Images**: Cloudinary Dashboard

**Free Tier Limits**:
- Vercel: 100GB bandwidth/month
- Supabase: 500MB database
- Cloudinary: 25GB storage

---

## ✅ Pre-Deployment Checklist

Before starting deployment:
- [ ] Code is committed and pushed to GitHub
- [ ] All tests are passing locally
- [ ] Production build works (`npm run build`)
- [ ] `.env.example` is up to date
- [ ] No secrets in Git history
- [ ] **⚠️ NEXTAUTH_URL is set to production URL (NOT your local IP)**
  - ❌ Wrong: `http://192.168.29.140:3000` (mobile testing IP)
  - ✅ Correct: `https://runwal-seagull.vercel.app` (production URL)

---

## 🎯 Deployment Tasks

### **PHASE 1: Pre-Deployment Preparation** (30 minutes)

#### Task 1.1: Verify Production Build

```bash
# Clean install
rm -rf node_modules .next
npm install

# Test production build
npm run build
```

**Expected**: Build completes without errors ✅

**If errors**: Fix TypeScript/build errors before proceeding

---

#### Task 1.2: Run E2E Tests

```bash
# Start dev server (Terminal 1)
npm run dev

# Run tests (Terminal 2)
npm run test:e2e
```

**Expected**: All critical tests pass ✅

**Note**: It's okay if some tests fail - we'll fix in production

---

#### Task 1.3: Generate Production Secrets

```bash
# Generate NEXTAUTH_SECRET (copy output)
openssl rand -base64 32
```

**Save this secret** - you'll need it for Vercel environment variables

---

### **PHASE 2: Database Setup (Supabase)** (45 minutes)

#### Task 2.1: Create Supabase Project

1. **Go to**: https://supabase.com
2. **Sign up/Login**: Use GitHub account (free)
3. **Create Organization**: "Runwal Seagull" or your name
4. **Create New Project**:
   - Name: `runwal-seagull-prod`
   - Database Password: Generate strong password (save it!)
   - Region: Choose closest to users (e.g., Mumbai/Singapore)
   - Pricing Plan: **Free**
5. **Wait**: 2-3 minutes for project to initialize

---

#### Task 2.2: Get Database Connection Strings

1. **Go to**: Project Settings → Database
2. **Copy these URLs**:

**Connection Pooling** (for Vercel):
```
postgresql://postgres.xxxxx:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
```

**Direct Connection** (for migrations):
```
postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

**Save both URLs** - replace `[PASSWORD]` with your actual password

---

#### Task 2.3: Run Database Migrations

1. **Update local `.env.local`** with Direct Connection URL:
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres"
```

2. **Run migrations**:
```bash
npx prisma migrate deploy
```

**Expected**: 
```
✅ Migrations applied successfully
```

3. **Seed initial data**:
```bash
npx prisma db seed
```

**Expected**: Admin user and buildings created

4. **Verify in Supabase**:
   - Go to Table Editor
   - Check tables exist: users, buildings, flats, events, notices
   - Verify admin user exists

---

### **PHASE 3: Cloudinary Setup** (15 minutes)

#### Task 3.1: Create Cloudinary Account

1. **Go to**: https://cloudinary.com
2. **Sign up**: Free account
3. **Skip wizards**: Dashboard → Settings

---

#### Task 3.2: Get Cloudinary Credentials

1. **Go to**: Dashboard → Settings → Product Environment
2. **Copy**:
   - Cloud Name: `dxxxxxx`
   - API Key: `123456789012345`
   - API Secret: `xxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

#### Task 3.3: Create Upload Preset

1. **Go to**: Settings → Upload
2. **Add upload preset**:
   - Preset name: `runwal_society_uploads`
   - Signing Mode: **Unsigned**
   - Folder: `runwal-seagull`
   - Upload Preset: `runwal_society_uploads` (note this!)

3. **Save**

---

### **PHASE 4: Vercel Deployment** (30 minutes)

#### Task 4.1: Create Vercel Account & Import Project

1. **Go to**: https://vercel.com
2. **Sign up**: Use GitHub account
3. **Add New Project**:
   - Import Git Repository
   - Select: `RunwallSeagull` repository
   - Click **Import**

---

#### Task 4.2: Configure Build Settings

**Framework Preset**: Next.js (auto-detected)  
**Root Directory**: `./` (leave as is)  
**Build Command**: `npm run build`  
**Output Directory**: `.next`  
**Install Command**: `npm install`

**Node Version**: 18.x (default is fine)

---

#### Task 4.3: Add Environment Variables

Click **Environment Variables** and add:

```env
# Database (use Connection Pooling URL!)
DATABASE_URL=postgresql://postgres.xxxxx:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres

# Authentication
NEXTAUTH_URL=https://runwal-seagull.vercel.app
NEXTAUTH_SECRET=<paste-secret-from-task-1.3>

# Cloudinary (Public)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxxx
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=runwal_society_uploads

# Cloudinary (Private)
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important**:
- Use **Connection Pooling URL** (port 6543), not Direct Connection
- Replace all `xxxxx` with actual values
- For all variables, select: **Production**, **Preview**, **Development**

---

#### Task 4.4: Deploy!

1. **Click Deploy**
2. **Wait**: 2-5 minutes for build
3. **Monitor**: Build logs for errors

**Expected Success**:
```
✅ Build completed
✅ Deployment ready
🌐 https://runwal-seagull.vercel.app
```

---

### **PHASE 5: Post-Deployment Verification** (30 minutes)

#### Task 5.1: Test Landing Page

1. **Visit**: https://runwal-seagull.vercel.app
2. **Check**:
   - [ ] Page loads without errors
   - [ ] Hero section visible
   - [ ] Notices section works
   - [ ] Events section works
   - [ ] No console errors (F12 → Console)

---

#### Task 5.2: Test Authentication

1. **Click "Sign In"**
2. **Login with seeded admin**:
   - Email: `admin@runwalseagull.com`
   - Password: `Admin@123` (or whatever you set in seed)
3. **Verify**:
   - [ ] Redirects to dashboard
   - [ ] Dashboard loads
   - [ ] User name displayed correctly

---

#### Task 5.3: Test Admin Functions

1. **Go to**: Admin → Users
2. **Verify**:
   - [ ] User list loads
   - [ ] Can filter users
   - [ ] No database errors

3. **Go to**: Admin → Events
4. **Test**:
   - [ ] Can view events
   - [ ] Click "Create Event"
   - [ ] Form loads

---

#### Task 5.4: Test Image Upload

1. **Create a test notice or event**
2. **Try uploading an image**
3. **Verify**:
   - [ ] Cloudinary widget opens
   - [ ] Can upload image
   - [ ] Image URL saved
   - [ ] Image displays on page

---

#### Task 5.5: Test Database Connection

1. **Create a test user** (register new account)
2. **Go to Supabase**:
   - Table Editor → users
3. **Verify**:
   - [ ] New user appears in database
   - [ ] Status is PENDING
   - [ ] All fields correct

---

### **PHASE 6: Production Optimization** (Optional, 30 minutes)

#### Task 6.1: Configure Custom Domain (Optional)

**If you have a domain**:

1. **Go to**: Vercel → Project Settings → Domains
2. **Add Domain**: `yourdomain.com`
3. **Configure DNS**:
   - Add CNAME: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → Vercel IP
4. **Wait**: SSL certificate (auto-provisioned)

---

#### Task 6.2: Enable Vercel Analytics

1. **Go to**: Project Settings → Analytics
2. **Enable**: Web Analytics (free)
3. **Verify**: Analytics tab appears

---

#### Task 6.3: Setup Error Monitoring (Optional)

**Free Option**: Vercel built-in  
**Better Option**: Sentry.io (free tier)

For Sentry:
1. Sign up at sentry.io
2. Create new project (Next.js)
3. Get DSN
4. Add to Vercel env: `SENTRY_DSN=...`

---

## 🔧 Troubleshooting Common Issues

### Issue: Build Fails on Vercel

**Error**: `Type errors` or `Module not found`

**Solution**:
```bash
# Test build locally first
npm run build

# Fix TypeScript errors
# Then redeploy
```

---

### Issue: Database Connection Error

**Error**: `Can't reach database server`

**Solution**:
1. Verify you're using **Connection Pooling URL** (port 6543)
2. Check password is correct (no special characters breaking URL)
3. Try Direct Connection URL temporarily
4. Check Supabase project is active

---

### Issue: NextAuth Error

**Error**: `[next-auth][error][NO_SECRET]`

**Solution**:
1. Verify `NEXTAUTH_SECRET` is set in Vercel env vars
2. Redeploy after adding

---

### Issue: Images Not Uploading

**Error**: Cloudinary upload fails

**Solution**:
1. Verify upload preset is **Unsigned**
2. Check `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is correct
3. Verify `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` matches preset name

---

### Issue: Prisma Client Error

**Error**: `PrismaClient is unable to run in this browser environment`

**Solution**:
```bash
# Regenerate Prisma client
npx prisma generate

# Commit and redeploy
git add .
git commit -m "fix: regenerate prisma client"
git push
```

---

### Issue: Mobile Login Redirects to localhost

**Symptom**: After login on mobile device, browser redirects to `localhost:3000` instead of your IP

**Cause**: `NEXTAUTH_URL` in `.env.local` is set to `localhost`

**Solution for Mobile Testing**:
1. Open `.env.local`
2. Change `NEXTAUTH_URL` to your local IP:
   ```env
   NEXTAUTH_URL="http://192.168.29.140:3000"
   ```
3. Restart dev server: `npm run dev`
4. Clear browser cache on mobile and try again

**⚠️ IMPORTANT**: Change it back to production URL before deploying!

---

## 🔄 Redeployment Workflow

For future updates:

### 1. Make Changes Locally
```bash
git checkout -b feature/my-feature
# Make changes
```

### 2. Test Locally
```bash
npm run build
npm run test:e2e
```

### 3. Push to GitHub
```bash
git add .
git commit -m "feat: describe change"
git push origin feature/my-feature
```

### 4. Create Pull Request
- GitHub → Create PR
- Vercel auto-creates preview deployment
- Test preview URL

### 5. Merge to Main
- Merge PR
- Vercel auto-deploys to production
- Verify live site

---

## 📊 Monitoring & Maintenance

### Daily Checks
- [ ] Site is accessible
- [ ] No error emails (if configured)
- [ ] Supabase database size (<500MB)

### Weekly Checks
- [ ] Vercel bandwidth usage (<100GB)
- [ ] Cloudinary storage (<25GB)
- [ ] Review error logs

### Monthly Tasks
- [ ] Database backup (Supabase exports)
- [ ] Review user feedback
- [ ] Update dependencies
- [ ] Security patches

---

## 🆘 Emergency Rollback

If deployment breaks production:

### Option 1: Vercel Dashboard
1. Go to Vercel → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"
4. Confirm

### Option 2: Git Revert
```bash
git revert HEAD
git push origin main
# Vercel auto-deploys reverted version
```

---

## ✅ Deployment Checklist

**Before Deployment**:
- [ ] All tests passing
- [ ] Production build works
- [ ] Secrets generated
- [ ] Environment variables ready

**Deployment**:
- [ ] Supabase project created
- [ ] Database migrated and seeded
- [ ] Cloudinary configured
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] First deployment successful

**Verification**:
- [ ] Landing page loads
- [ ] Can login
- [ ] Dashboard works
- [ ] Admin functions work
- [ ] Database writes work
- [ ] Image upload works

**Post-Deployment**:
- [ ] Domain configured (optional)
- [ ] Analytics enabled
- [ ] Error monitoring setup (optional)
- [ ] Backup strategy defined

---

## 📚 Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **NextAuth Deployment**: https://next-auth.js.org/deployment

---

## 🎉 Success!

Once all tasks are complete:
- ✅ Your app is live at `https://runwal-seagull.vercel.app`
- ✅ Database is running on Supabase
- ✅ Images are served via Cloudinary CDN
- ✅ Everything is on free tier ($0/month)
- ✅ Auto-deploys on every push to main

**Share your live URL with the society!** 🏢

---

**Workflow Version**: 2.0  
**Last Updated**: January 18, 2026  
**Estimated Total Time**: 2-3 hours
