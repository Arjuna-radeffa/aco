# ACO — Page Spec: External User
### v1.0

---

# MODUL 5 — HALAMAN PUBLIK MARKETING

---

## P-PUB-NAV — Shared Public Layout (Navbar & Footer)
**Berlaku untuk:** Semua halaman publik: P-PUB-00, P-PUB-01, P-EX-01, P-EX-02, P-ADD-01, P-ADD-02
**Catatan:** P-EX-00a (Registrasi) dan P-EX-00b (KYC Upload) menggunakan versi sederhana: hanya logo tanpa nav links.

### Navbar

| Elemen | Tipe | Behaviour |
|---|---|---|
| Logo ACO | Gambar/link | Navigasi ke `/` |
| Link "Beranda" | Link nav | Navigasi ke `/`; active state jika di homepage |
| Link "Browse" | Link nav | Navigasi ke `/browse`; active state jika di `/browse` atau `/browse/[slug]` |
| Link "Tentang ACO" | Link nav | Navigasi ke `/about`; active state jika di `/about` |
| Tombol "Masuk" | Button secondary | Navigasi ke `/login`; **hanya tampil jika belum login** |
| Tombol "Daftar" | Button primary | Navigasi ke `/register`; **hanya tampil jika belum login** |
| Tombol "Dashboard" | Button primary | **Hanya tampil jika sudah login**; navigasi ke halaman default role: External User → `/dashboard`, Investment Officer → P-IO-01, Portfolio Monitor → P-PM-01, Finance Officer → P-FR-01, Admin → P-AO-01 |

### Footer

| Elemen | Tipe | Behaviour |
|---|---|---|
| Logo ACO | Gambar | Tidak interaktif |
| Tagline singkat | Teks | Statis |
| Link "Beranda" | Link | `/` |
| Link "Browse" | Link | `/browse` |
| Link "Tentang ACO" | Link | `/about` |
| Link "Syarat & Ketentuan" | Link | `/terms` |
| Link "Kebijakan Privasi" | Link | `/privacy` |
| Teks copyright | Teks | "© [tahun] ACO. Semua hak dilindungi." Tahun diambil otomatis dari sistem. |

---

## P-PUB-00 — Homepage
**URL:** `/`
**Akses:** Publik (termasuk user yang sudah login; tidak ada redirect)
**Layout:** Menggunakan P-PUB-NAV

### Section 1 — Hero

| Elemen | Tipe | Behaviour |
|---|---|---|
| Headline | Heading H1 | Teks statis (ditentukan tim ACO) |
| Subheadline | Teks | Teks statis; deskripsi singkat platform dalam 1–2 kalimat |
| Tombol "Mulai Investasi" | Button primary | Navigasi ke `/browse?tab=investasi` |
| Tombol "Wakafkan Sekarang" | Button secondary | Navigasi ke `/browse?tab=wakaf` |
| Background / ilustrasi | Gambar | Statis |

---

### Section 2 — Statistik Platform

Empat kartu angka yang ditarik secara real-time dari database:

| Kartu | Sumber Data | Format |
|---|---|---|
| Jumlah Proyek Aktif | Proyek berstatus Aktif | Angka bulat |
| Total Dana Investasi Terkumpul | Akumulasi seluruh dana investasi yang masuk platform | Rupiah |
| Total Wakaf Terkumpul | Akumulasi seluruh wakaf uang yang dikonfirmasi | Rupiah |
| Jumlah Partisipan | Akun External User dengan KYC terverifikasi | Angka bulat |

---

### Section 3 — Cara Kerja

| Elemen | Tipe | Behaviour |
|---|---|---|
| Toggle tab | Tab | "Investasi" / "Wakaf"; default aktif: Investasi |
| Step cards — tab Investasi | Card list horizontal | 4 langkah: (1) Daftar & KYC → (2) Pilih Proyek → (3) Konfirmasi Investasi → (4) Terima Bagi Hasil |
| Step cards — tab Wakaf | Card list horizontal | 4 langkah: (1) Daftar & KYC → (2) Pilih Program → (3) Ikrarkan Wakaf → (4) Pantau Dampak |

Konten statis; setiap step card berisi ikon, nomor urut, judul, dan deskripsi singkat.

---

### Section 4 — Proyek & Program Unggulan

| Elemen | Tipe | Behaviour |
|---|---|---|
| Grid proyek | Card grid, maksimal 6 card | Hanya proyek dengan flag "Tampilkan di Homepage" = Ya yang dikonfigurasi Admin di P-AO-04 |
| Struktur card | — | Sama dengan card di P-EX-01: thumbnail, nama proyek, kategori badge, progress bar pendanaan, target dana, jenis partisipasi badge |
| Urutan card | — | Mengikuti urutan manual yang ditetapkan Admin |
| Klik card | — | Navigasi ke P-EX-02 (`/browse/[projectSlug]`) |
| Tombol "Lihat Semua Proyek" | Button secondary | Navigasi ke `/browse` |
| Fallback jika tidak ada proyek dipilih admin | — | Section ini tidak dirender sama sekali |

**Dependensi:** P-AO-04 (Konfigurasi Proyek) perlu menambahkan toggle "Tampilkan di Homepage" dan field urutan tampil.

---

### Section 5 — Keunggulan ACO

Empat poin keunggulan statis ditampilkan sebagai card:

| Poin | Deskripsi |
|---|---|
| Sesuai Syariah | Aturan syariah dikuatkan di level sistem: pemisahan dana, batas fee nazir, dan permanen wakaf |
| Transparan | RAB dan rencana penggunaan dana dapat diakses publik per proyek |
| Dana Terisolasi | Empat rekening terpisah: Investasi, Zakat, Infaq/Shadaqah, dan Wakaf Produktif |
| Diawasi Penuh | Audit log immutable dan monitoring portofolio berjalan secara real-time |

---

### Section 6 — CTA Penutup

| Elemen | Tipe | Behaviour |
|---|---|---|
| Teks ajakan | Heading | Statis |
| Tombol "Daftar Sekarang" | Button primary | Navigasi ke `/register`; **hanya tampil jika belum login** |
| Tombol "Dashboard" | Button primary | Navigasi ke halaman default role; **hanya tampil jika sudah login** |
| Tombol "Browse Proyek" | Button secondary | Navigasi ke `/browse`; tampil untuk semua kondisi login |

---

## P-PUB-01 — About ACO
**URL:** `/about`
**Akses:** Publik
**Layout:** Menggunakan P-PUB-NAV

### Section 1 — Profil Organisasi

| Elemen | Tipe | Behaviour |
|---|---|---|
| Heading | H1 | "Tentang ACO" |
| Deskripsi | Teks panjang | Penjelasan tentang ACO: siapa, apa yang dilakukan, sejak kapan beroperasi. Konten statis. |

---

### Section 2 — Visi & Misi

| Elemen | Tipe | Behaviour |
|---|---|---|
| Visi | Teks | Statis |
| Misi | List poin | Statis |

---

### Section 3 — Cara ACO Bekerja

Penjelasan lebih detail dibandingkan Section Cara Kerja di homepage.

| Elemen | Tipe | Behaviour |
|---|---|---|
| Sub-section Investasi | Teks + ilustrasi | Mekanisme investasi, skema bagi hasil, dan perlindungan investor termasuk pernyataan "tidak ada jaminan recovery" **[DIKUNCI]** |
| Sub-section Wakaf Produktif | Teks + ilustrasi | Mekanisme wakaf, peran ACO sebagai nazir, dan alur penyaluran hasil ke mustahiq |
| Sub-section Wakaf Aset | Teks | Penjelasan bahwa pengajuan di platform adalah langkah awal; proses hukum (akta ikrar wakaf) dilakukan di luar platform **[DIKUNCI sesuai BL-4.4]** |

---

### Section 4 — Kepatuhan Syariah

| Elemen | Tipe | Behaviour |
|---|---|---|
| Deskripsi komitmen | Teks | Statis |
| List aturan dikuatkan sistem | List | 4 aturan dari BL-8.1: (1) Fee nazir wakaf ≤ 10% profit bersih, (2) Pokok wakaf bersifat permanen dan tidak dapat ditarik, (3) Dana zakat hanya disalurkan ke 8 asnaf, (4) Empat rekening dana terisolasi sepenuhnya |

---

### Section 5 — Struktur Pengelolaan Dana

| Elemen | Tipe | Behaviour |
|---|---|---|
| Visualisasi 4 rekening | Diagram atau card grid | Statis; menampilkan 4 kategori dana yang terisolasi beserta penjelasan fungsi masing-masing |
| Catatan pemisahan | Teks | "Tidak ada transaksi yang dapat memindahkan dana antar kategori tanpa persetujuan dua pihak." |

---

### Section 6 — CTA Penutup

| Elemen | Tipe | Behaviour |
|---|---|---|
| Teks ajakan | Teks | Statis |
| Tombol "Mulai Berpartisipasi" | Button primary | Navigasi ke `/register` jika belum login; `/dashboard` jika sudah login |
| Tombol "Browse Proyek" | Button secondary | Navigasi ke `/browse` |

---

# MODUL 6 — EXTERNAL USER

---

## P-EX-00a Registrasi
**URL:** `/register`
**Akses:** Publik (belum login)
**Layout:** Versi sederhana P-PUB-NAV — hanya logo ACO tanpa nav links dan tombol CTA

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Field Nama Lengkap | Input teks | Wajib; min 3 karakter |
| Field Email | Input teks | Wajib; validasi format; cek duplikasi saat blur |
| Field Nomor HP | Input teks | Wajib; validasi format Indonesia (+62 atau 08xx) |
| Field Password | Input password | Wajib; min 8 karakter; harus mengandung huruf dan angka; toggle show/hide |
| Field Konfirmasi Password | Input password | Wajib; validasi kecocokan dengan field password |
| Checkbox persetujuan | Checkbox | Teks: "Saya menyetujui Syarat & Ketentuan dan Kebijakan Privasi ACO" dengan link ke masing-masing dokumen; wajib dicentang |
| Tombol "Daftar" | Button primary | Disabled jika ada field belum valid; submit form |
| Link "Sudah punya akun? Login" | Link teks | Navigasi ke P-00 |

### Behaviour Setelah Submit
- Sistem mengirim email verifikasi ke alamat yang didaftarkan
- User diarahkan ke halaman konfirmasi: "Email verifikasi telah dikirim ke [email]. Silakan cek inbox Anda."
- Akun tidak aktif sampai email diverifikasi
- Link verifikasi di email berlaku 24 jam; jika expired, user dapat request kirim ulang

---

## P-EX-00b KYC Upload
**URL:** `/kyc`
**Akses:** External User (login, email terverifikasi, KYC belum selesai)
**Layout:** Versi sederhana P-PUB-NAV — hanya logo ACO tanpa nav links dan tombol CTA

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Banner status | Banner | Menampilkan status KYC saat ini: Belum Diajukan / Menunggu Review / Ditolak (beserta alasan) |
| Section info | Teks | Penjelasan singkat mengapa KYC diperlukan dan apa yang terjadi setelah terverifikasi |
| Upload KTP | File upload | Wajib; format JPG/PNG/PDF; max 5MB; preview thumbnail setelah upload; tombol ganti file |
| Panduan foto KTP | Teks + ikon | "Pastikan: seluruh kartu terlihat, teks terbaca jelas, tidak ada pantulan cahaya" |
| Upload NPWP | File upload | Opsional; format JPG/PNG/PDF; max 5MB |
| Upload Selfie dengan KTP | File upload | Opsional; format JPG/PNG; max 5MB |
| Tombol "Ajukan untuk Verifikasi" | Button primary | Aktif hanya jika KTP sudah diupload; konfirmasi modal sebelum submit |
| Tombol "Simpan Draft" | Button secondary | Simpan file yang sudah diupload tanpa mengajukan |

### Behaviour Setelah Pengajuan
- Status berubah ke "Menunggu Review"
- Semua field menjadi read-only
- Muncul tombol "Batalkan Pengajuan" untuk menarik kembali dan mengupload ulang (hanya selama masih Menunggu Review)
- Notifikasi N-01 dikirim ke Reza

---

## P-EX-01 Browse Catalog
**URL:** `/browse`
**Akses:** Publik (termasuk user belum login)
**Layout:** Menggunakan P-PUB-NAV

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Tab "Investasi" / "Wakaf Uang" / "Semua" | Tab | Filter catalog berdasarkan jenis partisipasi; default "Semua"; dapat diaktifkan via query param: `?tab=investasi` atau `?tab=wakaf` (digunakan oleh CTA di P-PUB-00) |
| Search bar | Input teks | Pencarian berdasarkan nama proyek atau keyword; real-time atau on-submit |
| Filter kategori | Dropdown | Properti / Logistik / UMKM / Wakaf Produktif / Sosial / dll. |
| Filter progress pendanaan | Dropdown | Semua / Masih Tersedia / Hampir Penuh (>80%) |
| Sort | Dropdown | Terbaru / Terlama / Progress Tertinggi / Target Dana Terbesar |
| Grid proyek | Card grid | Setiap card: thumbnail (jika ada), nama proyek, breadcrumb singkat (jika sub-proyek), kategori badge, progress bar pendanaan, target dana, jenis partisipasi badge |
| Progress bar | Bar | Menampilkan % dana terkumpul dari target; warna berubah saat mendekati penuh |
| Breadcrumb pada card | Teks | Nama parent ditampilkan sebagai plain text (tidak link) jika parent tertutup untuk publik |
| Klik card | — | Navigasi ke P-EX-02 |
| Pesan jika kosong | Teks | "Tidak ada proyek yang sesuai dengan filter Anda." |
| Banner KYC (untuk user login belum KYC) | Banner kuning | "Lengkapi verifikasi identitas Anda untuk mulai berpartisipasi." dengan tombol "Verifikasi Sekarang" → P-EX-00b |

---

## P-EX-02 Detail Proyek / Program (Publik)
**URL:** `/browse/[projectSlug]`
**Akses:** Publik
**Layout:** Menggunakan P-PUB-NAV

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Breadcrumb | Teks/navigasi | Level di atas yang terbuka publik = link aktif; level yang tertutup = plain text tidak dapat diklik |
| Nama proyek | Heading | |
| Badge kategori & jenis partisipasi | Badge | |
| Deskripsi proyek | Teks panjang | |
| Progress pendanaan | Bar + angka | Dana terkumpul / Target dana + persentase |
| Section "Skema Partisipasi" | Teks | Menampilkan field Skema Partisipasi yang diinput Arief |
| Section "Informasi Proyek" | Display | Field-field relevan sesuai kategori proyek |
| Section "RAB & Penggunaan Dana" | Tabel accordion | Breakdown RAB per item/komponen; dapat di-expand untuk transparansi |
| Section "Sub-Proyek" | List | Hanya sub-proyek yang terbuka publik ditampilkan sebagai link; sub-proyek tertutup tidak ditampilkan sama sekali |
| Section "Dokumen" | List | Hanya dokumen yang sudah berstatus Tervalidasi dan dikonfigurasi sebagai dokumen publik |
| Tombol "Investasi Sekarang" | Button primary hijau | Muncul jika proyek terbuka untuk Investasi; klik → P-EX-03 (jika sudah KYC) atau modal login/KYC prompt (jika belum) |
| Tombol "Wakaf Uang" | Button primary | Muncul jika proyek terbuka untuk Wakaf Uang; klik → P-EX-04 (jika sudah KYC) atau modal login/KYC prompt |
| Banner "Pendanaan Penuh" | Banner hijau | Muncul jika target dana sudah terpenuhi; tombol investasi/wakaf disembunyikan |

### Modal: Prompt Login / KYC
| Elemen | Behaviour |
|---|---|
| Jika belum login | Teks: "Silakan login atau daftar untuk berpartisipasi." + tombol Login + tombol Daftar |
| Jika sudah login, KYC pending | Teks: "Verifikasi identitas Anda sedang diproses. Anda dapat berpartisipasi setelah verifikasi selesai." |
| Jika sudah login, KYC ditolak | Teks: "Verifikasi identitas Anda perlu dilengkapi." + tombol "Lengkapi KYC" → P-EX-00b |

---

## P-EX-03 Flow Investasi
**URL:** `/invest/[projectId]`
**Akses:** External User (KYC terverifikasi)

### Step 1: Masukkan Nominal

| Elemen | Tipe | Behaviour |
|---|---|---|
| Info proyek ringkas | Display | Nama proyek, target dana, sisa dana yang dibutuhkan |
| Field nominal investasi | Input angka | Format Rupiah otomatis; tidak ada minimum/maksimum default; jika proyek punya batas kepemilikan, validasi bahwa nominal tidak melebihi sisa kuota investor tersebut |
| Estimasi porsi kepemilikan | Teks kalkulasi | Muncul real-time: "Nominal ini setara dengan X% kepemilikan di proyek ini" |
| Tombol "Lanjut" | Button primary | Validasi field; lanjut ke Step 2 |

### Step 2: Tinjau & Persetujuan

| Elemen | Tipe | Behaviour |
|---|---|---|
| Ringkasan investasi | Display | Nama proyek, nominal, estimasi porsi kepemilikan, skema bagi hasil, jadwal distribusi, tenor |
| Section risiko | Teks | Menampilkan pernyataan risiko standar termasuk "Tidak ada jaminan recovery" **[DIKUNCI]** |
| Checkbox persetujuan risiko | Checkbox | Teks: "Saya memahami dan menerima risiko investasi ini sepenuhnya"; wajib dicentang |
| Tombol "Konfirmasi Investasi" | Button primary | Aktif setelah checkbox dicentang; eksekusi konfirmasi; notifikasi N-09a terkirim |
| Tombol "Kembali" | Button teks | Kembali ke Step 1 |

### Step 3: Konfirmasi Berhasil

| Elemen | Tipe | Behaviour |
|---|---|---|
| Ikon sukses | Ilustrasi | |
| Teks konfirmasi | Teks | "Investasi Anda sebesar Rp [nominal] untuk [nama proyek] berhasil dikonfirmasi." |
| Info penting | Teks | "Dana Anda dapat ditarik selama belum disalurkan ke proyek. Setelah disalurkan, investasi tidak dapat dibatalkan." |
| Tombol "Lihat Detail Investasi" | Button | Navigasi ke P-EX-06 (detail partisipasi) |
| Tombol "Kembali ke Browse" | Button teks | Navigasi ke P-EX-01 |

---

## P-EX-04 Flow Wakaf Uang
**URL:** `/waqf/[projectId]`
**Akses:** External User (KYC terverifikasi)

### Step 1: Masukkan Nominal

| Elemen | Tipe | Behaviour |
|---|---|---|
| Info program ringkas | Display | Nama program, deskripsi singkat, progress pendanaan |
| Field nominal wakaf | Input angka | Format Rupiah; tidak ada minimum/maksimum |
| Tombol "Lanjut" | Button primary | Validasi field; lanjut ke Step 2 |

### Step 2: Ikrar & Konfirmasi

| Elemen | Tipe | Behaviour |
|---|---|---|
| Teks ikrar wakaf | Teks formal | Teks ikrar standar wakaf yang mencantumkan nama wakif, nominal, dan program; **tidak dapat diedit** |
| Pernyataan permanen | Banner | "Dana yang telah diwakafkan bersifat permanen dan tidak dapat ditarik kembali." **[DIKUNCI]** |
| Checkbox konfirmasi | Wajib dicentang | "Saya memahami bahwa wakaf bersifat permanen dan dengan ini mengikrarkan wakaf uang saya." |
| Tombol "Ikrarkan Wakaf" | Button primary | Aktif setelah checkbox; eksekusi; notifikasi N-09b terkirim |
| Tombol "Kembali" | Button teks | Kembali ke Step 1 |

### Step 3: Tanda Terima

| Elemen | Tipe | Behaviour |
|---|---|---|
| Ikon sukses | Ilustrasi | |
| Teks konfirmasi | Teks | "Jazakallahu khairan. Wakaf uang Anda sebesar Rp [nominal] untuk [nama program] telah diterima." |
| Nomor referensi wakaf | Teks | Kode unik untuk referensi |
| Tombol "Download Tanda Terima" | Button | Unduh PDF tanda terima wakaf |
| Tombol "Lihat Detail Wakaf" | Button | Navigasi ke P-EX-06 |
| Tombol "Kembali ke Browse" | Button teks | |

---

## P-EX-05 Form Wakaf Aset
**URL:** `/waqf/asset`
**Akses:** External User (KYC terverifikasi)

### Elemen — Step 1: Jenis Aset

| Elemen | Tipe | Behaviour |
|---|---|---|
| Pilihan jenis aset | Radio cards | Aset Tidak Bergerak (properti) / Aset Bergerak (kendaraan, alat) |
| Tombol "Lanjut" | Button primary | |

### Elemen — Step 2: Detail Aset (Tidak Bergerak)

| Elemen | Tipe | Behaviour |
|---|---|---|
| Jenis properti | Dropdown | Tanah / Bangunan / Tanah & Bangunan |
| Alamat lengkap | Textarea | Wajib |
| Luas (m²) | Input angka | Wajib |
| Status sertifikat | Dropdown | SHM / HGB / AJB / Belum bersertifikat / Lainnya |
| Estimasi nilai pasar | Input angka | Opsional; format Rupiah |
| Keterangan tambahan | Textarea | Opsional |

### Elemen — Step 2: Detail Aset (Bergerak)

| Elemen | Tipe | Behaviour |
|---|---|---|
| Jenis aset | Dropdown | Kendaraan Roda 4 / Kendaraan Roda 2 / Alat Produksi / Lainnya |
| Merek / Tipe | Input teks | Wajib untuk kendaraan |
| Tahun | Input angka | Wajib untuk kendaraan |
| Kondisi | Dropdown | Sangat Baik / Baik / Cukup |
| Estimasi nilai pasar | Input angka | Opsional; format Rupiah |
| Keterangan tambahan | Textarea | Opsional |

### Elemen — Step 3: Upload Dokumen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Upload dokumen kepemilikan | File upload | Wajib; SHM/BPKB/dll; PDF/JPG/PNG max 10MB |
| Upload foto aset | File upload multi | Opsional; max 5 foto; JPG/PNG max 5MB per foto |
| Upload dokumen pendukung lain | File upload multi | Opsional |

### Elemen — Step 4: Konfirmasi & Submit

| Elemen | Tipe | Behaviour |
|---|---|---|
| Ringkasan data aset | Display read-only | Semua data yang diinput |
| Pernyataan niat wakaf | Teks | Teks standar niat wakaf aset |
| Checkbox konfirmasi | Wajib | "Data yang saya masukkan adalah benar dan saya berniat mewakafkan aset ini." |
| Tombol "Ajukan Wakaf Aset" | Button primary | Submit; status = Menunggu Tindak Lanjut ACO |
| Tombol "Kembali" | Button teks | |

### Setelah Submit
- Halaman konfirmasi: "Pengajuan wakaf aset Anda telah diterima. Tim ACO akan menghubungi Anda dalam waktu dekat untuk proses selanjutnya."
- Status pengajuan dapat dipantau dari dashboard P-EX-05 detail

---

## P-EX-06 Dashboard External User
**URL:** `/dashboard`
**Akses:** External User (login)

### Elemen — Header

| Elemen | Tipe | Behaviour |
|---|---|---|
| Sapaan | Teks | "Halo, [nama]!" |
| Status KYC | Badge | Terverifikasi (hijau) / Menunggu Review (kuning) / Ditolak (merah) / Belum Diajukan (abu) |
| Tombol "Lengkapi KYC" | Button | Hanya muncul jika KYC belum terverifikasi; navigasi ke P-EX-00b |

### Elemen — Summary Cards

| Elemen | Tipe | Behaviour |
|---|---|---|
| Kartu Total Investasi Aktif | Kartu angka | Total nilai investasi yang sedang berjalan |
| Kartu Total Bagi Hasil Diterima | Kartu angka | Akumulasi seluruh bagi hasil yang sudah diterima |
| Kartu Total Wakaf Uang | Kartu angka | Akumulasi seluruh wakaf uang |
| Kartu Partisipasi Aktif | Kartu angka | Jumlah proyek/program yang sedang diikuti |

### Elemen — Tab Partisipasi

| Elemen | Tipe | Behaviour |
|---|---|---|
| Tab "Investasi" | Tab | Menampilkan daftar partisipasi investasi |
| Tab "Wakaf Uang" | Tab | Menampilkan daftar partisipasi wakaf uang |
| Tab "Wakaf Aset" | Tab | Menampilkan pengajuan wakaf aset |

### Elemen — Tab Investasi

| Elemen | Tipe | Behaviour |
|---|---|---|
| Card per investasi | Card list | Nama proyek, nominal investasi, tanggal mulai, status proyek, total bagi hasil diterima, bagi hasil terakhir |
| Badge status proyek | Badge | Sesuai status proyek: Aktif / Selesai / Gagal |
| Tombol "Tarik Dana" | Button | Hanya muncul jika dana belum disalurkan; konfirmasi modal sebelum eksekusi |
| Klik card | — | Navigasi ke P-EX-07 (detail partisipasi) |

### Elemen — Tab Wakaf Uang

| Elemen | Tipe | Behaviour |
|---|---|---|
| Card per wakaf uang | Card list | Nama program, nominal wakaf, tanggal, status program, laporan dampak terakhir |
| Klik card | — | Navigasi ke P-EX-07 |

### Elemen — Tab Wakaf Aset

| Elemen | Tipe | Behaviour |
|---|---|---|
| Card per pengajuan | Card list | Jenis aset, tanggal pengajuan, status pengajuan |
| Status pengajuan | Badge | Menunggu Tindak Lanjut ACO / Dalam Proses / Selesai |
| Klik card | — | Navigasi ke P-EX-07 |

---

## P-EX-07 Detail Partisipasi
**URL:** `/dashboard/participation/[id]`
**Akses:** External User (pemilik partisipasi tersebut)

### Elemen — Header

| Elemen | Tipe | Behaviour |
|---|---|---|
| Nama proyek/program | Heading | |
| Breadcrumb proyek | Navigasi | Hanya level yang terbuka publik dapat diklik |
| Badge jenis partisipasi | Badge | Investasi / Wakaf Uang / Wakaf Aset |
| Badge status | Badge | Sesuai status |

### Elemen — Section Ringkasan (semua jenis)

| Elemen | Tipe | Behaviour |
|---|---|---|
| Nominal partisipasi | Display | |
| Tanggal konfirmasi | Display | |
| Nomor referensi | Display | Kode unik transaksi |
| Tombol "Download Bukti" | Button | Unduh PDF bukti partisipasi/tanda terima |

### Elemen — Section Khusus Investasi

| Elemen | Tipe | Behaviour |
|---|---|---|
| Porsi kepemilikan | Display | % dari total proyek |
| Skema bagi hasil | Display | Persentase dan jadwal distribusi |
| Status penyaluran dana | Display | Belum Disalurkan / Sudah Disalurkan |
| Tombol "Tarik Dana" | Button merah | Hanya muncul jika status = Belum Disalurkan; konfirmasi modal |
| Riwayat bagi hasil | Tabel | Kolom: Periode, Nominal, Tanggal Transfer; urut terbaru |
| Total bagi hasil diterima | Angka summary | Akumulasi semua distribusi |

### Elemen — Section Khusus Wakaf Uang

| Elemen | Tipe | Behaviour |
|---|---|---|
| Riwayat laporan dampak | Timeline | Update berkala dari program; setiap item: tanggal, ringkasan dampak |
| Progress program | Bar | Progress pendanaan keseluruhan program |

### Elemen — Section Khusus Wakaf Aset

| Elemen | Tipe | Behaviour |
|---|---|---|
| Detail aset | Display | Semua data yang disubmit |
| Riwayat status | Timeline | Perubahan status pengajuan + catatan dari ACO |
| Informasi kontak ACO | Display | Hanya muncul setelah ACO menghubungi; nama PIC dan nomor kontak |

---

## P-EX-08 Laporan Bulanan
**URL:** `/dashboard/reports/[bulan-tahun]`
**Akses:** External User (KYC terverifikasi, punya minimal 1 partisipasi aktif)

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Selector periode | Dropdown bulan/tahun | Hanya menampilkan periode di mana user sudah bergabung |
| Section Ringkasan Bulan | Display | Total partisipasi aktif, total bagi hasil diterima bulan ini, nominal wakaf aktif |
| Section per partisipasi | List expandable | Setiap partisipasi aktif dengan aktivitas bulan tersebut |
| Tombol "Download PDF" | Button | Unduh laporan dalam format PDF |
| Link "Laporan Bulan Lainnya" | Link | Navigasi ke daftar semua laporan yang tersedia |

---

## P-EX-09 Profil & Pengaturan Akun
**URL:** `/profile`
**Akses:** External User (login)

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Section Data Diri | Display + edit | Nama, email (read-only), nomor HP; tombol "Edit" membuka form edit inline |
| Section KYC | Display | Status KYC; link "Lihat Detail" → P-EX-00b |
| Section Keamanan | Display | Tombol "Ubah Password" → modal ubah password |
| Section Notifikasi | Toggle list | Preferensi penerimaan email per kategori notifikasi; [CONFIG] |
| Tombol "Simpan Perubahan" | Button | Simpan semua perubahan yang belum tersimpan |

### Modal: Ubah Password
| Elemen | Behaviour |
|---|---|
| Field password saat ini | Wajib |
| Field password baru | Wajib; min 8 karakter; harus mengandung huruf dan angka |
| Field konfirmasi password baru | Wajib; validasi kecocokan |
| Tombol "Simpan" | Eksekusi + kirim konfirmasi via email |
| Tombol "Batal" | Tutup modal |

---

# MODUL 7 — HALAMAN TAMBAHAN

---

## P-ADD-01 Halaman Syarat & Ketentuan
**URL:** `/terms`
**Akses:** Publik
**Layout:** Menggunakan P-PUB-NAV

Halaman statis berisi teks Syarat & Ketentuan platform.

---

## P-ADD-02 Halaman Kebijakan Privasi
**URL:** `/privacy`
**Akses:** Publik
**Layout:** Menggunakan P-PUB-NAV

Halaman statis berisi teks Kebijakan Privasi platform.

---

## P-ADD-03 Halaman 404
**URL:** Otomatis untuk path tidak ditemukan

| Elemen | Behaviour |
|---|---|
| Teks | "Halaman tidak ditemukan." |
| Tombol "Kembali ke Beranda" | Navigasi ke halaman default sesuai status login user |

---

## P-ADD-04 Halaman Tidak Memiliki Akses (403)
**URL:** Otomatis saat user mengakses halaman di luar role mereka

| Elemen | Behaviour |
|---|---|
| Teks | "Anda tidak memiliki akses ke halaman ini." |
| Tombol "Kembali" | Navigasi ke halaman default role user |

---

# RINGKASAN SEMUA HALAMAN

| Kode | Nama Halaman | Akses |
|---|---|---|
| P-00 | Login | Publik |
| P-00b | Forgot Password | Publik |
| P-SH-01 | Main Layout Internal | Semua internal |
| P-SH-02 | Semua Notifikasi | Semua internal |
| P-IO-01 | Daftar Proyek | IO, PM (RO), FR (RO), Admin (RO) |
| P-IO-02 | Tambah / Edit Proyek | IO |
| P-IO-03 | Detail Proyek | IO, PM, FR, Admin |
| P-PM-01 | Dashboard Monitoring | PM |
| P-PM-02 | Antrian Update Masuk | PM |
| P-PM-03 | Proyek Terlambat | PM |
| P-PM-04 | Detail Monitoring Proyek | PM |
| P-FR-01 | Dashboard Keuangan | FR |
| P-FR-02 | Antrian Review Transaksi | FR |
| P-FR-03 | Kalkulasi Bagi Hasil | FR |
| P-FR-04 | Rekonsiliasi | FR |
| P-FR-05 | Laporan Keuangan | FR |
| P-AO-01 | Antrian KYC | Admin |
| P-AO-02 | Review KYC | Admin |
| P-AO-03 | Manajemen Pengguna | Admin |
| P-AO-04 | Konfigurasi Proyek | Admin |
| P-AO-05 | Antrian Validasi Dokumen | Admin |
| P-AO-06 | Audit Log | Admin |
| P-PUB-NAV | Shared Public Navbar & Footer | Semua halaman publik (komponen, bukan halaman) |
| P-PUB-00 | Homepage | Publik |
| P-PUB-01 | About ACO | Publik |
| P-EX-00a | Registrasi | Publik |
| P-EX-00b | KYC Upload | External User |
| P-EX-01 | Browse Catalog | Publik |
| P-EX-02 | Detail Proyek Publik | Publik |
| P-EX-03 | Flow Investasi | External User (KYC) |
| P-EX-04 | Flow Wakaf Uang | External User (KYC) |
| P-EX-05 | Form Wakaf Aset | External User (KYC) |
| P-EX-06 | Dashboard External User | External User |
| P-EX-07 | Detail Partisipasi | External User |
| P-EX-08 | Laporan Bulanan | External User |
| P-EX-09 | Profil & Pengaturan | External User |
| P-ADD-01 | Syarat & Ketentuan | Publik |
| P-ADD-02 | Kebijakan Privasi | Publik |
| P-ADD-03 | 404 | Semua |
| P-ADD-04 | 403 | Semua |

**Total: 39 halaman + 1 shared component (P-PUB-NAV)**

---

*ACO Page Spec — Modul Publik Marketing & External User v1.1*
*Dibaca bersama: ACO_PageSpec_Internal_v1.md, ACO_BusinessLogic_Rules_v1.md, ACO_Notification_Spec_v1.md, ACO_UserStories_v3.md*