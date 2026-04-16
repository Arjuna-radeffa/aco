# ACO Platform Deployment Guide to Cloudflare Pages

## 📋 Prerequisites

- Node.js 18+ installed
- Cloudflare Account with API Token configured
- Domain `aco.tigo.co.id` pointing to Cloudflare nameservers

## 🔧 Deployment Setup

### Step 1: Install Wrangler CLI
```bash
npm install -g wrangler
```

### Step 2: Authenticate with Cloudflare
```bash
wrangler login
```
This will open your browser and authenticate using the API token in `.env`

### Step 3: Install Dependencies
```bash
cd d:\Project2026\aco\aco-frontend
npm install
```

### Step 4: Build Production Bundle
```bash
npm run build
```

This will create an optimized production build in the `dist/` folder with:
- Minified JavaScript (Terser)
- CSS optimization via Tailwind
- Source maps for debugging
- Vendor code splitting (React bundle separate)

### Step 5: Deploy to Cloudflare Pages

#### Option A: Using Wrangler CLI
```bash
cd d:\Project2026\aco\aco-frontend
wrangler pages deploy dist --project-name aco
```

#### Option B: Using Git Integration (Recommended for CI/CD)
1. Push code to GitHub repository
2. Connect to Cloudflare Pages via GitHub integration
3. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy automatically on push

#### Option C: Using Cloudflare Dashboard UI
1. Go to Cloudflare Dashboard → Pages
2. Create new project → Connect Git or Upload directly
3. Select repository
4. Build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy

### Step 6: Configure Domain
1. Go to Cloudflare Dashboard → Pages → Settings
2. Custom Domain: `aco.tigo.co.id`
3. Cloudflare will verify DNS configuration
4. Site should be live at https://aco.tigo.co.id

## 📊 Deployment Checklist

✅ **Pre-deployment:**
- [ ] All dashboards populated with content
- [ ] Material Icons loaded (Google Fonts)
- [ ] No compilation errors (`npm run build` succeeds)
- [ ] Environment variables set (.env and .env.production)
- [ ] All features tested locally on localhost:3000

✅ **Deployment:**
- [ ] Node.js 18+ installed
- [ ] Wrangler CLI installed and authenticated
- [ ] Production bundle created (`dist/` folder exists)
- [ ] Domain DNS pointing to Cloudflare
- [ ] Site accessible at https://aco.tigo.co.id

✅ **Post-deployment:**
- [ ] Site loads without errors
- [ ] All dashboards accessible
- [ ] Material Icons display correctly
- [ ] Navigation between roles works
- [ ] Responsive design on mobile/tablet

## 🚀 Quick Start Commands

```bash
# Full deployment pipeline
cd d:\Project2026\aco\aco-frontend

# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to Cloudflare
wrangler pages deploy dist --project-name aco
```

## 🔐 Environment Variables

**Production (.env.production):**
```
VITE_API_BASE_URL=https://aco.tigo.co.id/api
VITE_APP_NAME=ACO Platform
VITE_ENVIRONMENT=production
```

**Root (.env - Cloudflare config):**
```
CLOUDFLARE_API_TOKEN=<YOUR_CLOUDFLARE_API_TOKEN>
CLOUDFLARE_ACCOUNT_ID=fa152694bcc0c864187cd5f524db2941
CLOUDFLARE_ZONE_ID=05d5d62623535df073730728b4afd923
CLOUDFLARE_PROJECT_NAME=aco
DOMAIN_NAME=aco.tigo.co.id
```

## 📈 Build Output Structure

```
dist/
├── index.html                 (Entry point)
├── assets/
│   ├── index-[hash].js       (Main bundle)
│   ├── vendor-[hash].js      (React vendor code)
│   ├── index-[hash].css      (Tailwind styles)
│   └── index.js.map          (Source map)
└── _redirects                 (Redirect rules)
```

## 🧪 Testing Before Deployment

```bash
# Build and preview locally
npm run build
npm run preview

# Visit http://localhost:4173 to test production build
```

## ⚡ Performance Tips

- All dashboards: 8 roles with ~30+ menu items each ✅
- Total content: 60+ UI cards with sample data ✅
- Optimized: CSS splitting, JS minification, vendor bundling ✅
- CDN-ready: Cloudflare Pages global distribution ✅

## 🆘 Troubleshooting

**Issue: Build fails**
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm run build
```

**Issue: Icon not showing**
- Verify Material Icons font loaded in index.html
- Check: `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />`

**Issue: Deploy fails**
```bash
# Check Wrangler authentication
wrangler whoami

# Check Cloudflare credentials
echo %CLOUDFLARE_API_TOKEN% (Windows)
echo $CLOUDFLARE_API_TOKEN    (Mac/Linux)
```

## 📞 Support

For issues with Cloudflare Pages deployment:
1. Check Cloudflare Status: https://www.cloudflarestatus.com/
2. Review Cloudflare Docs: https://developers.cloudflare.com/pages/
3. Check deployment logs in Cloudflare Dashboard

---

**Deployment Status:** Ready for production ✅
**Domain:** aco.tigo.co.id
**Build Command:** `npm run build`
**Output Directory:** `dist/`
**Framework:** React + Vite + Tailwind CSS
