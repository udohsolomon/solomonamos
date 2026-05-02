# Solomon Amos - Personal Site

A modern, agentic-styled personal website built with Next.js 14, Tailwind CSS, and TypeScript.

## Features

- **Agentic/Terminal Aesthetic** - Dark theme with terminal-inspired UI elements
- **Geist Font** - Using Vercel's Geist Sans and Mono fonts
- **Newsletter Integration** - Beehiiv form integration ready
- **Booking Integration** - Calendly embed for scheduling calls
- **Blog System** - Built-in blog with dynamic routing
- **Fully Responsive** - Mobile-first design
- **SEO Optimized** - Meta tags, Open Graph, and structured data

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Typography**: Geist Font Family
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env.local` file:

```env
# Beehiiv (Newsletter)
BEEHIIV_PUBLICATION_ID=your_publication_id
BEEHIIV_API_KEY=your_api_key

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Integrations

### Beehiiv Newsletter

1. Sign up at [beehiiv.com](https://beehiiv.com)
2. Get your publication ID and API key
3. Update the Newsletter component with your credentials

### Calendly Booking

1. Sign up at [calendly.com](https://calendly.com)
2. Create your event type (e.g., "Discovery Call")
3. Update the Calendly URL in the Contact component

For embedded widget, add to your layout:

```html
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Configure environment variables
4. Deploy

### Cloudflare Pages

1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Configure environment variables
5. Deploy

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  background: '#0a0a0a',
  foreground: '#fafafa',
  accent: {
    DEFAULT: '#00d9ff', // Change this to your brand color
    hover: '#00b8d9',
  },
  // ...
}
```

### Content

- **Blog Posts**: Add posts to `/src/app/blog/[slug]/page.tsx` or integrate a CMS
- **Services**: Edit `/src/components/sections/Services.tsx`
- **About**: Edit `/src/components/sections/About.tsx`

## Domain Setup (Cloudflare)

1. Add your domain to Cloudflare
2. Update nameservers at your registrar
3. Configure DNS records:
   - `A` record pointing to your hosting provider
   - Or `CNAME` for Vercel: `cname.vercel-dns.com`

## License

MIT License - feel free to use this as a template for your own site.

---

Built with care by Solomon Amos
