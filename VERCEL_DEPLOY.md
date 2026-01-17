# Deploy on Vercel (All in One)

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Network Access → Add IP Address
3. Select **"Allow Access From Anywhere"** (0.0.0.0/0)
4. Save and wait 1-2 minutes

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Quick)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /Users/aashishjha/Desktop/Event-Management-System
vercel
```

Follow prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **event-management-system**
- Directory? **./** (press Enter)
- Override settings? **N**

### Option B: Using Vercel Website

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repo: `Event-Management-System`
5. Click **"Import"**
6. Leave settings as default (Vercel auto-detects)
7. Click **"Deploy"**

## Step 3: Add Environment Variables

After deployment:

1. Go to your project → Settings → Environment Variables
2. Add these:

```
MONGODB_URI
[REMOVED]@event-management-system.dqewfs3.mongodb.net/event-management?retryWrites=true&w=majority&appName=Event-Management-System

NODE_ENV
production

PORT
5001
```

3. Click "Save"
4. Go to Deployments → Click "..." → **Redeploy**

## Step 4: Test

1. Open your Vercel URL (like: `https://event-management-system.vercel.app`)
2. Create a profile
3. Create an event
4. Done! 🎉

## Troubleshooting

**MongoDB Connection Error:**
- Check MongoDB Atlas Network Access
- Must allow 0.0.0.0/0

**404 Not Found:**
- Check `vercel.json` is committed
- Redeploy

**API Not Working:**
- Go to Vercel Dashboard → Functions tab
- Check if backend functions are deployed
- Check logs for errors

## Custom Domain (Optional)

1. Vercel Dashboard → Settings → Domains
2. Add your domain
3. Update DNS records as shown

## Notes

- Vercel auto-detects monorepo structure
- Backend runs as serverless functions
- Frontend is static (fast!)
- Free tier: 100GB bandwidth/month
- Auto HTTPS included

## Done!

Your app is live on Vercel with both frontend and backend! 🚀
