# ACO User Stories — Patch v3.2
### Revisi: Aturan visibilitas proyek di publik

---

## Koreksi dari v3.1

Patch v3.1 mengasumsikan semua node proyek terlihat oleh external user, dengan perbedaan hanya pada tombol aksi. **Asumsi ini salah.**

Aturan yang benar:

| Kondisi node | Tampil di catalog publik? | Bisa diklik? |
|---|---|---|
| Butuh pendanaan (investasi/wakaf uang terbuka) | Ya | Ya |
| Tidak butuh pendanaan | Tidak | — |
| Tidak butuh pendanaan, tapi sub-proyeknya butuh | Muncul sebagai teks di breadcrumb sub-proyek | Tidak |

---

## Story yang Direvisi

---

### US-IO-01 (Revisi — menggantikan versi v3.1)

**Sebagai** Investment Officer, **saya ingin** membuat proyek baru dan mengkonfigurasi apakah node ini terbuka untuk partisipasi eksternal **agar** hanya proyek yang membutuhkan pendanaan yang muncul di catalog publik.

**Acceptance Criteria:**
- Terdapat halaman "Tambah Proyek" dengan dropdown kategori: Properti, Logistik, UMKM, Wakaf Produktif, Sosial, dll.
- Pemilihan kategori memunculkan set field dinamis yang relevan sesuai kategori.
- Field universal ada di semua kategori: nama proyek, deskripsi, tanggal mulai, nilai total proyek, skema partisipasi.
- Proyek baru yang dibuat tanpa parent adalah root project (level 1).
- Data dapat disimpan sebagai Draft sebelum difinalisasi.
- Setiap node proyek memiliki konfigurasi "Peluang Partisipasi" yang independen:
  - Terbuka untuk Investasi Uang: Ya / Tidak
  - Terbuka untuk Wakaf Uang: Ya / Tidak
- Konfigurasi tidak diwariskan dari parent; default keduanya adalah "Tidak" saat node baru dibuat.
- **[Revisi v3.2]** Node dengan salah satu atau kedua flag "Ya" → muncul di catalog publik.
- **[Revisi v3.2]** Node dengan kedua flag "Tidak" → tidak muncul di catalog publik sama sekali; hanya terlihat oleh pengguna internal.
- **[Revisi v3.2]** Jika node tertutup namun sub-proyeknya terbuka, nama node tersebut tetap ditampilkan sebagai teks konteks (breadcrumb) di halaman catalog sub-proyeknya, namun tidak dapat diklik dan tidak memiliki halaman publik.

---

### US-EX-05 (Revisi — menggantikan versi v3.1)

**Sebagai** External User, **saya ingin** menyetor wakaf uang ke program yang tersedia **agar** dana saya dapat segera dikelola secara produktif.

**Acceptance Criteria:**
- Catalog wakaf uang hanya menampilkan node proyek yang dikonfigurasi terbuka untuk Wakaf Uang — dari level mana pun.
- Setiap item catalog menampilkan: nama node, breadcrumb konteks (nama parent/grandparent sebagai teks, tidak dapat diklik jika parent tidak terbuka untuk publik), deskripsi, dan progress dana terkumpul vs target.
- Pengguna memilih program, memasukkan nominal, dan mengkonfirmasi setoran.
- Setelah pembayaran dikonfirmasi, dana masuk ke rekening wakaf (terisolasi dari rekening investasi).
- Pengguna mendapat bukti setor dan dapat memantau perkembangan program dari dashboard.
- **[Revisi v3.2]** Dari halaman detail program, pengguna hanya dapat menavigasi ke node lain yang juga terbuka untuk publik. Node parent yang tertutup tidak memiliki halaman yang bisa dibuka.
- Pengguna dapat melihat laporan penggunaan dana wakaf mereka secara berkala.

---

### US-EX-06 (Revisi — menggantikan versi v3.1)

**Sebagai** External User, **saya ingin** menyertakan dana investasi ke proyek yang tersedia **agar** dana saya bekerja dan menghasilkan bagi hasil.

**Acceptance Criteria:**
- Catalog investasi hanya menampilkan node proyek yang dikonfigurasi terbuka untuk Investasi Uang — dari level mana pun.
- Setiap item catalog menampilkan: nama node, breadcrumb konteks (nama parent/grandparent sebagai teks, tidak dapat diklik jika parent tidak terbuka untuk publik), deskripsi, target dana, skema bagi hasil, dan tenor.
- Pengguna memilih proyek, memasukkan nominal, dan mengkonfirmasi komitmen investasi.
- Dana yang sudah dikonfirmasi namun belum disalurkan masih dapat ditarik; setelah disalurkan tidak bisa.
- Pengguna menerima notifikasi saat bagi hasil didistribusikan, dengan rincian perhitungan.
- **[Revisi v3.2]** Dari halaman detail proyek, pengguna hanya dapat menavigasi ke node lain yang juga terbuka untuk publik. Node parent yang tertutup ditampilkan namanya sebagai teks konteks saja, tanpa link.
- Dashboard menampilkan total investasi aktif, bagi hasil yang sudah diterima, dan status tiap proyek.

---

## Implikasi Teknis untuk Developer (Koreksi dari v3.1)

**Visibilitas = partisipasi, bukan dua hal terpisah.**
Tidak ada konsep "node terlihat tapi tidak bisa ditransaksi." Jika node tidak butuh pendanaan, ia tidak memiliki halaman publik sama sekali.

**Breadcrumb adalah teks statis, bukan navigasi.**
Ketika sub-proyek terbuka tapi parent-nya tertutup, breadcrumb di halaman sub-proyek hanya menampilkan nama parent sebagai label teks. Tidak ada `href`, tidak ada halaman tujuan. Ini menghindari kebingungan user yang mencoba mengklik dan mendapat 404.

**Contoh skenario breadcrumb:**

```
Proyek Induk (tertutup) › Sub-Proyek X (terbuka)
    ↑ teks biasa, tidak bisa diklik
```

```
Proyek Induk (terbuka) › Sub-Proyek X (terbuka)
    ↑ link aktif ke halaman Proyek Induk
```

**Catalog query tetap sama seperti v3.1:** ambil semua node dengan flag terbuka, dari semua level. Yang berubah hanya behavior navigasi di halaman detail.

---

*Patch v3.2 — apply on top of v3 + v3.1*
*Menggantikan seluruh isi US-IO-01, US-EX-05, US-EX-06 dari patch v3.1.*
*Stories lain tidak berubah.*
