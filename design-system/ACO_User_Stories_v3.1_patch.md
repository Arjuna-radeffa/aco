# ACO User Stories — Patch v3.1
### Revisi: Konfigurasi peluang partisipasi per node proyek

---

## Konteks Revisi

Sub-proyek bisa dibuka untuk investasi uang atau wakaf uang **secara independen** dari parent-nya.
Parent bisa tertutup untuk partisipasi, tapi sub-proyeknya terbuka — dan sebaliknya.
Tidak ada node yang disembunyikan dari external user; yang berbeda hanya apakah node tersebut **menerima partisipasi** atau tidak.

Implikasi utama:
- Arief harus bisa mengkonfigurasi status partisipasi **per node**, bukan hanya di root.
- Catalog investasi dan wakaf uang untuk external user harus menampilkan **semua node yang terbuka**, dari level mana pun.

---

## Story yang Direvisi

---

### US-IO-01 (Revisi)
**Sebagai** Investment Officer, **saya ingin** membuat proyek baru dengan field yang menyesuaikan kategori dan mengkonfigurasi apakah node ini terbuka untuk partisipasi eksternal **agar** peluang investasi dan wakaf dapat dikelola secara granular per komponen proyek.

**Acceptance Criteria:**
- Terdapat halaman "Tambah Proyek" dengan dropdown kategori: Properti, Logistik, UMKM, Wakaf Produktif, Sosial, dll.
- Pemilihan kategori memunculkan set field dinamis yang relevan sesuai kategori.
- Field universal ada di semua kategori: nama proyek, deskripsi, tanggal mulai, nilai total proyek, skema partisipasi.
- Proyek baru yang dibuat tanpa parent adalah root project (level 1).
- Data dapat disimpan sebagai Draft sebelum difinalisasi.
- **[Revisi]** Setiap node proyek (root maupun sub-proyek) memiliki konfigurasi "Peluang Partisipasi" yang independen dengan dua setting terpisah:
  - Terbuka untuk Investasi Uang: Ya / Tidak
  - Terbuka untuk Wakaf Uang: Ya / Tidak
- **[Revisi]** Konfigurasi ini tidak diwariskan dari parent; default keduanya adalah "Tidak" saat node baru dibuat.
- **[Revisi]** Node yang dibuka untuk partisipasi akan muncul di catalog external user; yang tidak dibuka tetap terlihat oleh external user sebagai bagian dari transparansi struktur proyek, namun tanpa tombol aksi partisipasi.

---

### US-EX-05 (Revisi)
**Sebagai** External User, **saya ingin** menyetor wakaf uang ke program yang tersedia **agar** dana saya dapat segera dikelola secara produktif.

**Acceptance Criteria:**
- **[Revisi]** Catalog wakaf uang menampilkan semua node proyek dari level mana pun yang dikonfigurasi terbuka untuk Wakaf Uang — bukan hanya root project.
- **[Revisi]** Setiap item catalog menampilkan: nama node, konteks hirarkinya (breadcrumb singkat, misal: "Proyek A › Sub-Proyek B"), deskripsi, dan progress dana terkumpul vs target.
- Pengguna memilih program, memasukkan nominal, dan mengkonfirmasi setoran.
- Setelah pembayaran dikonfirmasi, dana masuk ke rekening wakaf (terisolasi dari rekening investasi).
- Pengguna mendapat bukti setor dan dapat memantau perkembangan program dari dashboard.
- **[Revisi]** Dari halaman detail program, pengguna dapat menelusuri struktur proyek ke atas (parent) maupun ke bawah (sub-proyek sibling) untuk memahami konteks lengkap penggunaan dana.
- Pengguna dapat melihat laporan penggunaan dana wakaf mereka secara berkala.

---

### US-EX-06 (Revisi)
**Sebagai** External User, **saya ingin** menyertakan dana investasi ke proyek yang tersedia **agar** dana saya bekerja dan menghasilkan bagi hasil.

**Acceptance Criteria:**
- **[Revisi]** Catalog investasi menampilkan semua node proyek dari level mana pun yang dikonfigurasi terbuka untuk Investasi Uang — bukan hanya root project.
- **[Revisi]** Setiap item catalog menampilkan: nama node, konteks hirarkinya (breadcrumb singkat), deskripsi, target dana, skema bagi hasil, dan tenor.
- **[Revisi]** Dari halaman detail proyek investasi, pengguna dapat menelusuri struktur ke atas (parent) dan ke bawah (sub-proyek) untuk memahami konteks dan transparansi penggunaan dana — namun hanya node yang terbuka untuk partisipasi yang memiliki tombol aksi.
- Pengguna memilih proyek, memasukkan nominal, dan mengkonfirmasi komitmen investasi.
- Dana yang sudah dikonfirmasi namun belum disalurkan masih dapat ditarik; setelah disalurkan tidak bisa.
- Pengguna menerima notifikasi saat bagi hasil didistribusikan, dengan rincian perhitungan.
- Dashboard menampilkan total investasi aktif, bagi hasil yang sudah diterima, dan status tiap proyek.

---

## Implikasi Teknis untuk Developer

**Catalog query logic:**
Catalog investasi dan wakaf uang tidak bisa di-query hanya dari root project. Query harus mengambil semua node di semua level dengan flag `open_for_investment = true` atau `open_for_waqf_money = true`.

**Breadcrumb di catalog:**
Karena node yang muncul bisa dari level mana pun, setiap item catalog perlu menyertakan path hirarkinya agar external user tidak bingung dengan konteks proyek.

**Transparansi struktur vs aksi partisipasi:**
Dua hal yang berbeda:
- Semua node **terlihat** oleh external user saat mereka membuka detail proyek (transparansi penuh).
- Hanya node dengan flag terbuka yang menampilkan **tombol aksi** (Wakaf Uang / Investasi).

---

*Patch v3.1 — apply on top of ACO_User_Stories_v3.md*
*Stories yang tidak disebutkan di sini tidak berubah.*
