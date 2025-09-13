# Deployment Guide - Bitsmove Website

This guide will help you deploy the Bitsmove website to Vercel with all the necessary configurations.

## Prerequisites

- Vercel account
- Auth0 account with configured application
- Git repository with the code

## Vercel Deployment

### 1. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy the project
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure build settings:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 2. Environment Variables Configuration

In your Vercel dashboard, go to Settings → Environment Variables and add:

```env
REACT_APP_AUTH0_DOMAIN=genai-6844550283068684.au.auth0.com
REACT_APP_AUTH0_CLIENT_ID=hVLyaEWnSMC9TcaN2dHS6byluT7RPieb
REACT_APP_AUTH0_AUDIENCE=https://genai-6844550283068684.au.auth0.com/api/v2/
```

Make sure to mark these as "Production" environment variables.

### 3. Auth0 Configuration

Update your Auth0 application settings:

#### Allowed Callback URLs:
```
https://your-domain.vercel.app
https://bitsmove-website.vercel.app
http://localhost:3000
```

#### Allowed Logout URLs:
```
https://your-domain.vercel.app
https://bitsmove-website.vercel.app
http://localhost:3000
```

#### Allowed Web Origins:
```
https://your-domain.vercel.app
https://bitsmove-website.vercel.app
http://localhost:3000
```

### 4. Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Go to Settings → Domains
3. Add your custom domain
4. Configure DNS settings as instructed

## Build Configuration

The project includes a `vercel.json` file with optimized settings:

- Static file caching
- Security headers
- Proper routing for SPA
- Environment variable mapping

## Performance Optimizations

The website includes several optimizations:

- **Image Optimization**: Properly sized images
- **Code Splitting**: Automatic code splitting by Create React App
- **Caching**: Optimized caching headers for static assets
- **Compression**: Automatic gzip compression by Vercel

## Monitoring and Analytics

Consider adding:

1. **Vercel Analytics**: Built-in analytics from Vercel
2. **Google Analytics**: For detailed user tracking
3. **Error Tracking**: Sentry or similar service

## Security

The deployment includes:

- Security headers in `vercel.json`
- HTTPS enforcement
- Content Security Policy
- XSS protection

## Troubleshooting

### Common Issues

1. **Build Failures**: Check environment variables are set correctly
2. **Auth0 Issues**: Verify callback URLs in Auth0 dashboard
3. **Styling Issues**: Ensure all CSS files are imported correctly

### Debug Mode

To debug issues:

1. Check Vercel function logs
2. Use browser dev tools
3. Check Auth0 logs in dashboard

## Rollback Strategy

If issues occur:

1. Use Vercel's deployment history to rollback
2. Keep previous working versions tagged in Git
3. Test deployments on preview URLs first

## Maintenance

Regular maintenance tasks:

1. Update dependencies monthly
2. Monitor performance metrics
3. Check security updates
4. Review and update translations

## Support

For deployment issues:

- Check Vercel documentation
- Review Auth0 setup guides
- Contact support@bitsmove.com
