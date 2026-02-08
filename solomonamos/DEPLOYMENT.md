# Deployment Guide

## Quick Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd solomonamos-site
vercel
```

Follow the prompts to:
1. Link to your Vercel account
2. Deploy the project
3. Get your production URL

## Connect Your Domain (solomonamos.com)

### Option 1: Vercel DNS (Easiest)

1. In Vercel dashboard, go to your project settings
2. Add domain: `solomonamos.com`
3. Vercel will give you nameservers
4. In Cloudflare, update nameservers to point to Vercel

### Option 2: Keep Cloudflare DNS (Recommended)

1. In Vercel, add domain: `solomonamos.com`
2. Vercel will give you a CNAME target
3. In Cloudflare DNS, add:
   ```
   Type: CNAME
   Name: @
   Target: cname.vercel-dns.com
   Proxy: Off (DNS only)
   ```
4. For www subdomain:
   ```
   Type: CNAME
   Name: www
   Target: cname.vercel-dns.com
   Proxy: Off
   ```

## Environment Variables

In Vercel dashboard, add these environment variables:

```
BEEHIIV_PUBLICATION_ID=your_publication_id
BEEHIIV_API_KEY=your_api_key
NEXT_PUBLIC_GA_ID=your_google_analytics_id (optional)
```

## Alternative: Cloudflare Pages

```bash
# Install Wrangler CLI
npm i -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy .next --project-name=solomonamos-site
```

Configure in Cloudflare Pages dashboard:
- Build command: `npm run build`
- Output directory: `.next`
- Framework preset: Next.js

## Post-Deployment Checklist

- [ ] Domain resolves correctly
- [ ] HTTPS certificate active
- [ ] All pages load
- [ ] Newsletter form configured with Beehiiv
- [x] Calendly link updated
- [ ] Social links updated in Footer
- [ ] Test on mobile devices
- [ ] Check Lighthouse scores

## Updating Content

### To publish a new blog post:

1. Create `.mdx` file in `content/posts/`
2. Add frontmatter with title, excerpt, date, tags
3. Commit and push to Git
4. Vercel auto-deploys on push

### To update site content:

1. Edit components in `src/components/sections/`
2. Update your info, links, services
3. Commit and push
4. Auto-deploys

## Monitoring

Vercel provides:
- Real-time logs
- Analytics (optional paid feature)
- Web Vitals monitoring
- Error tracking

## Performance Tips

Current build:
- ✓ All static pages pre-rendered
- ✓ Optimized images
- ✓ Minimal JavaScript
- ✓ Fast Time to First Byte

Expected Lighthouse scores: 95+

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify DNS propagation: `https://dnschecker.org`
3. Test locally first: `npm run build && npm start`

---

Site built with Next.js 14, deployed on Vercel, DNS managed by Cloudflare.
