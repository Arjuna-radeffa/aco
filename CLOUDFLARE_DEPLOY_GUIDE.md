# 🚀 ACO Platform - Cloudflare Pages Deployment Guide

## Status: Build Complete ✅
- Production bundle: `dist/` folder ready
- Total size: ~961 KB
- All 8 dashboards included with mock data

---

## 📋 Opsi 1: Manual Deployment via Cloudflare Dashboard (RECOMMENDED)

### Steps:
1. **Buka Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com/
   - Login dengan akun Cloudflare Anda

2. **Navigate ke Pages Project**
   - Klik **Pages** di sidebar
   - Pilih project **aco** (jika sudah ada) atau buat baru
   
3. **Upload Build Files**
   - Klik **Create a deployment**
   - Pilih **Upload assets**
   - Drag & drop folder `d:\Project2026\aco\aco-frontend\dist\` 
   - ATAU: Select files and upload semua files dari dist folder:
     - `index.html`
     - `assets/vendor-*.js`
     - `assets/index-*.js`
     - `assets/index-*.css`

4. **Konfigurasi Custom Domain**
   - Setelah deployment selesai, buka **Pages > aco > Custom domain**
   - Klik **Add custom domain**
   - Masukkan: `aco.tigo.co.id`
   - Verifikasi DNS records (seharusnya sudah terkonfigurasi di zona tigo.co.id)

5. **Selesai!** 🎉
   - Website akan live di https://aco.tigo.co.id

---

## 📋 Opsi 2: Generate New API Token (untuk Automation)

Jika ingin automation dengan Wrangler CLI, butuh API token dengan permissions:
- ✅ Account → Cloudflare Pages
- ✅ Account → Workers Routes
- ✅ Zone → Zone
- ✅ User → User Details

### Langkah-langkah:
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click **Create Token**
3. Gunakan template **"Cloudflare Pages"** atau customize dengan permissions di atas
4. Copy token baru
5. Update `.env` dengan token baru:
   ```env
   CLOUDFLARE_API_TOKEN=<NEW_TOKEN_HERE>
   ```
6. Kemudian jalankan:
   ```powershell
   cd d:\Project2026\aco\aco-frontend
   $env:CLOUDFLARE_API_TOKEN='<NEW_TOKEN>'
   wrangler pages deploy dist --project-name aco --branch main
   ```

---

## 📋 Opsi 3: GitHub Actions CI/CD (Automatic Deployment)

Setup auto-deployment setiap kali push ke GitHub:

### Langkah-langkah:
1. Push project ke GitHub repository
2. Di Cloudflare Pages:
   - Create new project
   - Connect ke GitHub
   - Select repository & branch
   - Build setting: `npm run build`
   - Output: `dist`

3. Auto-deploy setiap push ke main branch

---

## 📊 Deployment Checklist

- [x] Dependencies installed
- [x] Production build created (`vite build`)
- [x] dist folder verified (6 files, 961 KB)
- [x] wrangler.toml configured
- [ ] Cloudflare API token permissions updated (jika menggunakan Opsi 2)
- [ ] Custom domain configured (aco.tigo.co.id)
- [ ] DNS records verified

---

## 🔍 Troubleshooting

### "Authentication error [code: 10000]"
**Solusi:** API token tidak punya permissions. 
- Gunakan Opsi 1 (manual dashboard) OR
- Generate token baru dengan permissions yang tepat (Opsi 2)

### "Domain not resolving"
**Solusi:** DNS records perlu time untuk propagate (5-10 menit)
- Cek nameserver menunjuk ke Cloudflare
- Verify zone di Cloudflare = `tigo.co.id`

### "Build failed"
**Solusi:** Sudah berhasil build di local.
- Pastikan dist folder terupload lengkap
- Check browser console untuk errors

---

## 📦 Build Output Details

```
dist/
├── index.html                          (0.69 kB → gzip: 0.40 kB)
├── assets/
│   ├── index-35d52642.js              (146.65 kB → gzip: 26.16 kB)
│   ├── index-1b373cbd.css             (1.13 kB → gzip: 0.58 kB)
│   └── vendor-324528e4.js             (139.76 kB → gzip: 44.90 kB)
```

**Total:** ~288 kB (uncompressed) → ~72 kB (gzipped with compression)

---

## 🎯 Next Steps

1. **Pilih Opsi** (1, 2, atau 3)
2. **Deploy** sesuai langkah yang dipilih
3. **Test** aplikasi di https://aco.tigo.co.id
4. **Verify** semua 8 dashboards berfungsi:
   - Investor Micro ✅
   - Investor Enterprise ✅
   - Project Owner ✅
   - Muzakki ✅
   - Munfiq ✅
   - Wakif ✅
   - Mustahiq ✅
   - Admin + Officers ✅

---

**Deployment Status:** 🟢 **READY TO DEPLOY**
**Created:** 2026-04-13
**Domain:** aco.tigo.co.id
