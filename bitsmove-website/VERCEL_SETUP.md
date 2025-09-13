# Vercel Setup Guide for Bitsmove Website

## Quick Setup Checklist

### 1. Environment Variables in Vercel Dashboard

Go to your Vercel project → Settings → Environment Variables and add:

```
REACT_APP_AUTH0_DOMAIN = genai-6844550283068684.au.auth0.com
REACT_APP_AUTH0_CLIENT_ID = hVLyaEWnSMC9TcaN2dHS6byluT7RPieb  
REACT_APP_AUTH0_AUDIENCE = https://genai-6844550283068684.au.auth0.com/api/v2/
```

**Important**: Mark all as "Production" environment variables.

### 2. Auth0 Application Settings

Update your Auth0 application (www.bitsmove.com) with these URLs:

#### Allowed Callback URLs:
```
https://bitsmove-website.vercel.app
https://bitsmove-website-git-main-yourusername.vercel.app
https://bitsmove-website.vercel.app
http://localhost:3000
```

#### Allowed Logout URLs:
```
https://bitsmove-website.vercel.app
https://bitsmove-website-git-main-yourusername.vercel.app
https://bitsmove-website.vercel.app
http://localhost:3000
```

#### Allowed Web Origins:
```
https://bitsmove-website.vercel.app
https://bitsmove-website-git-main-yourusername.vercel.app
https://bitsmove-website.vercel.app
http://localhost:3000
```

### 3. Build Settings

Vercel should automatically detect this as a Create React App project. If not, set:

- **Framework Preset**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### 4. Deployment Steps

1. **Connect Repository**: Link your Git repository to Vercel
2. **Set Environment Variables**: Add the Auth0 variables above
3. **Deploy**: Vercel will automatically deploy on every push to main
4. **Test**: Verify the website loads and Auth0 login works

### 5. Custom Domain (Optional)

If you have a custom domain:

1. Go to Settings → Domains
2. Add your domain (e.g., www.bitsmove.com)
3. Update Auth0 URLs to include your custom domain
4. Configure DNS as instructed by Vercel

## Testing Checklist

After deployment, verify:

- [ ] Website loads correctly
- [ ] Navigation works (smooth scrolling)
- [ ] Language switcher functions
- [ ] Auth0 login/logout works
- [ ] All sections display properly
- [ ] Contact form works (test submission)
- [ ] Mobile responsiveness
- [ ] All images load (especially the logo)

## Troubleshooting

### Auth0 Issues
- Verify all callback URLs are added in Auth0 dashboard
- Check environment variables are set correctly in Vercel
- Ensure Auth0 application is active

### Build Issues
- Check that all dependencies are in package.json
- Verify build command and output directory
- Check for any TypeScript errors

### Performance Issues
- Verify vercel.json is properly configured
- Check image optimization
- Review bundle size

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify Auth0 configuration
3. Test locally first with `npm start`
4. Contact support@bitsmove.com
