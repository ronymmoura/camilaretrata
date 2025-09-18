# Deployment Guide - Camila Retrata

## Prerequisites for Deployment

1. **Database Setup**
   - PostgreSQL database (local or cloud service)
   - Run migrations: `npx prisma migrate deploy`
   - Seed data: `npm run db:seed`

2. **Environment Variables**
   ```env
   DATABASE_URL=\"postgresql://...\"
   GMAIL_USER=\"your.email@gmail.com\"
   GMAIL_PASSWORD=\"your_app_password\"
   JWT_SECRET=\"secure-random-string\"
   NEXT_PUBLIC_SITE_URL=\"https://yourdomain.com\"
   ```

## Vercel Deployment (Recommended)

1. **Connect Repository**
   - Push code to GitHub/GitLab
   - Connect to Vercel dashboard

2. **Configure Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Use Vercel Postgres or external PostgreSQL service

3. **Build Settings**
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`

4. **Domain Configuration**
   - Add custom domain in Vercel dashboard
   - Update NEXT_PUBLIC_SITE_URL

## Manual Deployment

1. **Build Application**
   ```bash
   npm run build
   npm run start
   ```

2. **Server Requirements**
   - Node.js 18+
   - PostgreSQL database
   - File storage (for uploads)

## Post-Deployment Checklist

- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] Default admin user created
- [ ] Email functionality tested
- [ ] Upload functionality tested
- [ ] SSL certificate configured
- [ ] Domain redirects set up
- [ ] Analytics configured (optional)

## Security Considerations

- Change default admin password
- Use strong JWT secret
- Enable HTTPS in production
- Configure proper CORS settings
- Set up rate limiting (if needed)

## Monitoring & Maintenance

- Set up error tracking (Sentry, etc.)
- Monitor database performance
- Regular security updates
- Backup strategy for uploads and database