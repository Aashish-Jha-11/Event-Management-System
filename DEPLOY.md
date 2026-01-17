# Deployment Guide

## Quick Deploy (Recommended)

### Backend - Railway/Render

**Railway (easiest):**
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. New Project → Deploy from GitHub repo
4. Select: `Event-Management-System`
5. Add Environment Variables:
   ```
   MONGODB_URI=[REMOVED]@event-management-system.dqewfs3.mongodb.net/event-management?retryWrites=true&w=majority&appName=Event-Management-System
   NODE_ENV=production
   PORT=5001
   ```
6. Root Directory: `backend`
7. Deploy!
8. Copy backend URL (like: `https://your-app.railway.app`)

### Frontend - Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Import Project → Select repo
4. Framework: Vite
5. Root Directory: `frontend`
6. Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
7. Build Command: `npm run build`
8. Output Directory: `dist`
9. Deploy!

### Update Frontend for Production

Edit `frontend/src/store/useStore.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || '/api';
```

## Alternative: Render.com

**Backend:**
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Root Directory: `backend`
5. Build: `npm install`
6. Start: `npm start`
7. Add Environment Variables (same as above)

**Frontend:**
1. New → Static Site
2. Root Directory: `frontend`
3. Build: `npm run build`
4. Publish: `dist`

## MongoDB Atlas Setup

Important: Allow backend server IP
1. MongoDB Atlas → Network Access
2. Add IP → Allow from Anywhere (0.0.0.0/0)
3. Or add specific IP of your backend server

## Verify Deployment

1. Backend health check: `https://your-backend.com/api/health`
2. Should return: `{"status":"ok","message":"Server is running"}`
3. Open frontend URL
4. Test creating profile and event

## Common Issues

**CORS Error:**
- Backend `server.js` already has `cors()` enabled
- Should work fine

**MongoDB Connection Failed:**
- Check MongoDB Atlas IP whitelist
- Verify connection string in env vars

**Backend not connecting:**
- Check if `PORT` env variable is set
- Railway/Render auto-assign port, code handles it

## Cost

- MongoDB Atlas: Free tier (512MB)
- Railway: Free trial ($5 credit)
- Vercel: Free tier
- Render: Free tier (spins down after inactivity)

**Recommended:** Railway for backend, Vercel for frontend

## Need Help?

- Railway docs: railway.app/docs
- Vercel docs: vercel.com/docs
- Render docs: render.com/docs
