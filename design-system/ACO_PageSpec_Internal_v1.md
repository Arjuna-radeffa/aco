# ACO — Page Spec: Internal Team
### v1.0

Konvensi dokumen:
- **[DIKUNCI]** = behaviour tidak dapat diubah secara konfigurasi
- **[CONFIG]** = dapat dikonfigurasi Admin/Superadmin
- Semua halaman internal memerlukan login dan role yang sesuai
- Redirect otomatis ke Login jika sesi habis

---

# MODUL 0 — AUTENTIKASI

---

## P-00 Login Page
**URL:** `/login`
**Akses:** Semua user (belum login)

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Logo ACO | Gambar | Tidak interaktif |
| Field Email | Input text | Validasi format email saat blur; trim whitespace otomatis |
| Field Password | Input password | Toggle show/hide password |
| Tombol Login | Button primary | Disabled jika salah satu field kosong; submit form saat diklik |
| Link "Lupa Password?" | Link teks | Navigasi ke P-00b (halaman reset password) |
| Pesan error | Inline text | Muncul di bawah tombol jika kredensial salah: "Email atau password tidak sesuai." Tidak menyebutkan mana yang salah. |

### Behaviour Halaman
- Setelah login berhasil, sistem redirect berdasarkan role:
  - Investment Officer → P-IO-01 (Project List)
  - Portfolio Monitor → P-PM-01 (Monitoring Dashboard)
  - Finance Officer → P-FR-01 (Finance Dashboard)
  - Admin → P-AO-01 (KYC Queue)
  - External User → P-EX-06 (Dashboard External User)
- Jika user sudah login dan mengakses `/login`, redirect ke halaman default role mereka
- Maksimal 5 kali percobaan login gagal → akun dikunci sementara 15 menit; tampilkan pesan yang sesuai **[DIKUNCI]**

---

## P-00b Forgot Password
**URL:** `/forgot-password`
**Akses:** Semua user (belum login)

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Field Email | Input text | Validasi format email |
| Tombol Kirim | Button primary | Kirim email reset; tampilkan pesan sukses generik tanpa mengkonfirmasi apakah email terdaftar |
| Link "Kembali ke Login" | Link teks | Navigasi ke P-00 |

---

# MODUL 1 — SHELL & NAVIGASI (INTERNAL)

---

## P-SH-01 Main Layout Internal
**Berlaku untuk:** Semua halaman internal setelah login

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Sidebar navigasi | Panel kiri | Menampilkan item menu sesuai role yang aktif; dapat di-collapse menjadi icon-only |
| Logo ACO (sidebar) | Gambar | Klik → kembali ke halaman default role |
| Nama & role user (sidebar bawah) | Teks + avatar | Tidak interaktif; hanya display |
| Tombol Logout (sidebar bawah) | Button | Klik → konfirmasi modal "Apakah Anda yakin ingin keluar?" → logout dan redirect ke P-00 |
| Bell notifikasi (header) | Icon + badge | Badge menampilkan jumlah notifikasi belum dibaca (max tampil: "99+"); klik → buka Notification Panel |
| Notification Panel | Dropdown panel | Menampilkan 10 notifikasi terbaru; setiap item: ikon tipe, teks ringkas, waktu relatif (misal: "2 jam lalu"); klik item → navigasi ke halaman terkait dan tandai sebagai dibaca; link "Lihat Semua" → P-SH-02 |
| Area konten utama | Container | Menampilkan halaman yang aktif |

### Item Menu per Role

**Investment Officer (Arief):**
- Daftar Proyek
- Tambah Proyek

**Portfolio Monitor (Sinta):**
- Dashboard Monitoring
- Antrian Update
- Proyek Terlambat

**Finance Officer (Hendra):**
- Dashboard Keuangan
- Antrian Review Dana
- Kalkulasi Bagi Hasil
- Rekonsiliasi
- Laporan Keuangan

**Admin (Reza):**
- Antrian KYC
- Manajemen Pengguna
- Konfigurasi Proyek
- Antrian Dokumen
- Audit Log

---

## P-SH-02 Halaman Semua Notifikasi
**URL:** `/notifications`
**Akses:** Semua internal user

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Daftar notifikasi | List | Semua notifikasi urut terbaru; setiap item: ikon tipe, teks lengkap, waktu, status (dibaca/belum) |
| Filter tipe | Dropdown | Filter berdasarkan tipe notifikasi |
| Tombol "Tandai Semua Dibaca" | Button | Mengubah semua notifikasi menjadi status dibaca |
| Klik item notifikasi | — | Navigasi ke halaman terkait; tandai notifikasi sebagai dibaca |

---

# MODUL 2 — INVESTMENT OFFICER (ARIEF)

---

## P-IO-01 Daftar Proyek
**URL:** `/projects`
**Akses:** Investment Officer, Portfolio Monitor (read-only), Finance Officer (read-only), Admin (read-only)

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Search bar | Input teks | Pencarian real-time; menemukan proyek di semua level dan menampilkan breadcrumb konteksnya |
| Filter Status | Dropdown multi-select | Opsi: Draft, Aktif, Selesai, Dihentikan |
| Filter Kategori | Dropdown multi-select | Opsi sesuai kategori proyek yang tersedia |
| Filter Level | Dropdown | Opsi: Semua Level, Hanya Root, Level 1-2, dst |
| Tombol "Tambah Proyek" | Button primary | Navigasi ke P-IO-02; hanya tampil untuk Investment Officer |
| Tree view proyek | Tree list | Setiap node dapat di-expand/collapse; indent visual per level |
| Node proyek | List item | Menampilkan: nama proyek, badge status, total RAB, jumlah sub-proyek langsung; klik → P-IO-03 (detail proyek) |
| Tombol expand/collapse node | Icon button | Toggle tampil/sembunyikan sub-proyek di bawah node tersebut |
| Tombol "Expand Semua" / "Collapse Semua" | Button teks | Expand atau collapse seluruh tree sekaligus |
| Badge status | Badge warna | Draft=abu, Aktif=hijau, Selesai=biru, Dihentikan=merah |
| Tombol hapus proyek | Icon button (merah) | Hanya muncul pada proyek berstatus Draft tanpa transaksi terkait; klik → modal konfirmasi hapus |

### Modal: Konfirmasi Hapus Proyek
| Elemen | Behaviour |
|---|---|
| Teks konfirmasi | "Proyek [nama] akan dihapus permanen. Tindakan ini tidak dapat dibatalkan." |
| Tombol "Hapus" | Merah; eksekusi penghapusan → kembali ke P-IO-01 dengan notifikasi sukses |
| Tombol "Batal" | Tutup modal |

---

## P-IO-02 Tambah / Edit Proyek
**URL:** `/projects/new` atau `/projects/[id]/edit`
**Akses:** Investment Officer

### Elemen — Section 1: Informasi Dasar

| Elemen | Tipe | Behaviour |
|---|---|---|
| Dropdown Kategori | Select | Wajib diisi pertama; memunculkan field dinamis di bawahnya; mengubah kategori setelah field dinamis diisi → modal konfirmasi "Mengubah kategori akan menghapus data field spesifik kategori sebelumnya." |
| Field Nama Proyek | Input teks | Wajib; max 100 karakter |
| Field Deskripsi | Textarea | Opsional; max 500 karakter |
| Field Tanggal Mulai | Date picker | Wajib |
| Field Nilai Total Proyek | Input angka | Wajib; format otomatis sebagai mata uang Rupiah; read-only jika proyek punya sub-proyek (nilai dihitung otomatis dari agregasi) |
| Field Skema Partisipasi | Textarea / rich text | Deskripsi skema yang akan tampil di halaman publik; wajib jika salah satu flag partisipasi = Ya |
| Field Parent Proyek | Select search | Opsional; jika diisi, proyek ini menjadi sub-proyek dari parent yang dipilih; menampilkan breadcrumb setelah dipilih |

### Elemen — Section 2: Field Dinamis per Kategori

**Kategori: Properti**
| Field | Tipe | Keterangan |
|---|---|---|
| Lokasi | Input teks | Wajib |
| Luas lahan/bangunan | Input angka + satuan | Wajib |
| Status sertifikat | Dropdown | SHM / HGB / Lainnya |
| Status lahan | Dropdown | Milik sendiri / Wakaf |

**Kategori: Logistik**
| Field | Tipe | Keterangan |
|---|---|---|
| Jumlah armada | Input angka | Wajib |
| Area/rute operasional | Input teks | Wajib |
| Jenis kendaraan | Input teks | Opsional |

**Kategori: UMKM**
| Field | Tipe | Keterangan |
|---|---|---|
| Jenis usaha | Input teks | Wajib |
| Lokasi usaha | Input teks | Wajib |
| Jumlah karyawan | Input angka | Opsional |

**Kategori: Wakaf Produktif**
| Field | Tipe | Keterangan |
|---|---|---|
| Jenis aset | Dropdown | Tidak bergerak / Bergerak / Uang |
| Data wakif | Input teks | Nama wakif; wajib |
| Nama nazir | Input teks | Wajib |
| Persentase fee nazir | Input angka (%) | Wajib; validasi: 0–10%; sistem menolak >10% dengan pesan error eksplisit |
| Catatan kepemilikan | Textarea | Jika properti di atas lahan wakaf: field ini menampilkan teks default "Kepemilikan pembeli: SHM Bangunan. Lahan berstatus wakaf." yang dapat diedit |

### Elemen — Section 3: Konfigurasi Partisipasi

| Elemen | Tipe | Behaviour |
|---|---|---|
| Toggle "Terbuka untuk Investasi Uang" | Toggle Ya/Tidak | Default: Tidak; jika diubah ke Ya, field Skema Partisipasi menjadi wajib |
| Toggle "Terbuka untuk Wakaf Uang" | Toggle Ya/Tidak | Default: Tidak; jika diubah ke Ya, field Skema Partisipasi menjadi wajib |
| Field Target Dana | Input angka | Muncul jika salah satu toggle = Ya; wajib; format Rupiah |
| Field Batas Kepemilikan per Investor | Input angka (%) | Opsional; jika kosong = tidak ada batas |
| Field Porsi Fee ACO | Input angka (%) | Wajib jika toggle Investasi = Ya; validasi: 1–10%; sistem menolak di luar rentang |
| Field Jadwal Distribusi Bagi Hasil | Dropdown | Muncul jika toggle Investasi = Ya; opsi: Bulanan, Triwulanan, Semesteran, Setelah Selesai |
| Field Perilaku Periode Nihil | Dropdown | Muncul jika toggle Investasi = Ya; opsi: Hangus (default), Akumulasi ke periode berikutnya |
| Field Mekanisme Pengembalian Pokok | Dropdown | Muncul jika toggle Investasi = Ya; opsi: Otomatis, Manual |

### Elemen — Section 4: RAB

| Elemen | Tipe | Behaviour |
|---|---|---|
| Tabel RAB | Tabel editable | Kolom: Nama Item, Kategori Biaya, Nominal, Keterangan |
| Tombol "Tambah Item RAB" | Button | Menambah baris baru di tabel |
| Baris hapus item RAB | Icon button per baris | Menghapus baris tersebut |
| Subtotal RAB langsung | Teks kalkulasi | Total item RAB yang diinput langsung di level ini (real-time) |
| Total RAB dari sub-proyek | Teks read-only | Hanya tampil jika proyek sudah punya sub-proyek; nilai dari agregasi |
| Total RAB keseluruhan | Teks bold | Subtotal langsung + Total dari sub-proyek |

### Elemen — Section 5: Aksi Form

| Elemen | Tipe | Behaviour |
|---|---|---|
| Tombol "Simpan Draft" | Button secondary | Menyimpan tanpa validasi field wajib; status proyek = Draft |
| Tombol "Aktifkan Proyek" | Button primary | Validasi semua field wajib; jika ada yang kosong, scroll ke field pertama yang bermasalah dan tampilkan error inline; jika valid → status = Aktif |
| Tombol "Batal" | Button teks | Kembali ke P-IO-01; jika ada perubahan yang belum disimpan → modal konfirmasi "Perubahan belum disimpan. Yakin ingin keluar?" |

### Behaviour Tambahan
- Proyek berstatus Aktif: semua field dapat diedit kecuali field keuangan yang sudah dikunci Finance; setiap perubahan disimpan ke changelog
- Field yang dikunci Finance ditampilkan sebagai read-only dengan ikon kunci dan tooltip "Field ini dikunci oleh Finance Officer"
- Pada mode Edit: terdapat tab "Riwayat Perubahan" di bagian bawah halaman

---

## P-IO-03 Detail Proyek
**URL:** `/projects/[id]`
**Akses:** Investment Officer (full), Portfolio Monitor (read-only + monitoring), Finance Officer (read-only + keuangan), Admin (read-only + dokumen)

### Tab 1: Overview

| Elemen | Tipe | Behaviour |
|---|---|---|
| Breadcrumb | Navigasi | Menampilkan posisi dalam hirarki; setiap level dapat diklik untuk navigasi ke parent |
| Badge status proyek | Badge | Warna sesuai status |
| Semua field proyek | Display read-only | Menampilkan semua data yang diinput di P-IO-02 |
| Tombol "Edit" | Button | Hanya untuk Investment Officer; navigasi ke P-IO-02 mode edit |
| Tombol "Tambah Sub-Proyek" | Button | Hanya untuk Investment Officer; navigasi ke P-IO-02 dengan parent = proyek ini |
| Section "Konfigurasi Partisipasi" | Display | Menampilkan flag partisipasi, target dana, dan progress pendanaan (jika aktif) |

### Tab 2: RAB & Timeline

| Elemen | Tipe | Behaviour |
|---|---|---|
| Toggle tampilan | Toggle | "Proyek Ini Saja" vs "Termasuk Sub-Proyek" |
| Tabel RAB | Tabel | Jika mode "Termasuk Sub-Proyek": tampilkan tree breakdown per level dengan indent; nilai parent = agregasi otomatis |
| Kolom RAB | Kolom | Nama Item, Kategori, RAB, Realisasi (dari Finance), Selisih |
| Baris realisasi > RAB | Highlight merah | Otomatis pada baris yang over budget |
| Timeline | Gantt sederhana atau list milestone | Tanggal mulai, target selesai, milestone per sub-proyek |

### Tab 3: Dokumen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Toggle "Proyek Ini" / "Semua Level" | Toggle | Mode "Semua Level" menampilkan dokumen dari seluruh sub-proyek dengan label sumber |
| Filter kategori dokumen | Dropdown | Legal, Keuangan, Operasional, Lainnya |
| Daftar dokumen | List | Setiap item: nama file, kategori, tanggal upload, pengunggah, status badge |
| Status badge dokumen | Badge | Menunggu Validasi=kuning, Tervalidasi=hijau, Ditolak=merah |
| Tombol "Upload Dokumen" | Button | Hanya untuk Investment Officer; membuka modal upload |
| Klik dokumen | — | Membuka file di tab baru |
| Ikon "Ganti Versi" | Icon button | Hanya pada dokumen Tervalidasi; membuka modal upload versi baru |

### Modal: Upload Dokumen
| Elemen | Behaviour |
|---|---|
| Field nama dokumen | Input teks; wajib |
| Dropdown kategori | Legal / Keuangan / Operasional / Lainnya; wajib |
| Field upload file | Drag & drop atau klik; format PDF/JPG/PNG; max 10MB; validasi sisi client sebelum upload |
| Field tanggal kedaluwarsa | Date picker; opsional |
| Tombol "Upload" | Submit; tampilkan progress bar saat upload berlangsung |
| Tombol "Batal" | Tutup modal |

### Tab 4: Sub-Proyek

| Elemen | Tipe | Behaviour |
|---|---|---|
| Daftar sub-proyek langsung | List | Setiap item: nama, status badge, total RAB, jumlah sub-proyek-nya; klik → P-IO-03 sub-proyek tersebut |
| Tombol "Tambah Sub-Proyek" | Button | Navigasi ke P-IO-02 dengan parent = proyek ini |
| Pesan jika kosong | Teks | "Proyek ini belum memiliki sub-proyek." |

---

# MODUL 3 — PORTFOLIO MONITOR (SINTA)

---

## P-PM-01 Dashboard Monitoring
**URL:** `/monitoring`
**Akses:** Portfolio Monitor

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Summary bar | 4 kartu angka | Total proyek aktif; Update terkini; Terlambat update; Perlu tindak lanjut |
| Kartu "Terlambat" | Kartu highlight | Warna kuning/merah; klik → P-PM-03 (halaman proyek terlambat) |
| Filter kategori | Dropdown | Filter tree berdasarkan kategori proyek |
| Filter status update | Dropdown | Terkini / Terlambat / Semua |
| Filter sumber data | Dropdown | Form ACO / API / Semua |
| Tree view proyek | Tree list | Struktur sama seperti P-IO-01 namun dengan kolom tambahan monitoring |
| Node proyek | List item | Nama, breadcrumb (untuk sub-proyek), indikator kesehatan, status update, tanggal update terakhir |
| Indikator kesehatan | Ikon warna | Hijau=Sehat, Kuning=Perlu Perhatian, Merah=Kritis, Abu=Data Belum Tersedia |
| Klik node | — | Navigasi ke P-PM-04 (detail monitoring proyek) |
| Status update | Badge | "Terkini" atau "Terlambat X hari" dalam warna merah |

### Behaviour Agregasi Kesehatan
- Parent node menampilkan kesehatan terburuk dari sub-proyeknya
- Jika salah satu sub-proyek Kritis → parent minimal Perlu Perhatian
- Jika data terlambat → status ditampilkan "Data Belum Tersedia", bukan status lama **[DIKUNCI]**

---

## P-PM-02 Antrian Update Masuk
**URL:** `/monitoring/updates`
**Akses:** Portfolio Monitor

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Tab "Belum Ditinjau" / "Sudah Ditinjau" | Tab | Filter berdasarkan status review |
| Filter proyek | Select search | Filter daftar berdasarkan proyek tertentu |
| Filter sumber | Dropdown | Form ACO / API |
| Daftar update | List | Urut terbaru; setiap item: nama proyek, breadcrumb, tanggal update, sumber data, status review |
| Badge "Perlu Tindak Lanjut" | Badge merah | Muncul pada update yang ditandai demikian |
| Klik item update | — | Buka Modal Review Update |

### Modal: Review Update
| Elemen | Behaviour |
|---|---|
| Header | Nama proyek + breadcrumb + tanggal update |
| Tabel perbandingan | Dua kolom: Update Sebelumnya vs Update Ini; baris per metrik; nilai yang berubah di-highlight |
| Delta indicator | +/- nilai dan persentase perubahan per metrik berubah |
| Indikator dampak ke parent | Teks info: "Perubahan ini mempengaruhi status [nama parent]" — muncul jika ada dampak ke parent |
| Dropdown status review | Ditinjau – Normal / Ditinjau – Perlu Tindak Lanjut |
| Field catatan tindak lanjut | Textarea; wajib jika status = Perlu Tindak Lanjut |
| Tombol "Simpan Review" | Button primary; simpan status review |
| Tombol "Batal" | Tutup modal tanpa menyimpan |

---

## P-PM-03 Proyek Terlambat Update
**URL:** `/monitoring/overdue`
**Akses:** Portfolio Monitor

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Filter level | Dropdown | Semua Level / Hanya Root / Level tertentu |
| Filter sumber data | Dropdown | Form ACO / API / Semua |
| Daftar proyek terlambat | List | Urut keterlambatan terlama; setiap item: nama, breadcrumb, sumber data, deadline yang terlewat, jumlah hari terlambat |
| Klik item | — | Navigasi ke P-PM-04 proyek tersebut |
| Tombol "Kirim Pengingat Manual" | Button | Hanya untuk proyek dengan sumber Form ACO; kirim ulang notifikasi ke project team; konfirmasi sebelum eksekusi |

---

## P-PM-04 Detail Monitoring Proyek
**URL:** `/monitoring/projects/[id]`
**Akses:** Portfolio Monitor

### Tab 1: Overview

| Elemen | Tipe | Behaviour |
|---|---|---|
| Breadcrumb navigasi | Navigasi | Semua level dapat diklik |
| Indikator kesehatan | Badge besar | Status + warna |
| Section "Sumber Data" | Display | Metode (Form/API), status koneksi (untuk API: Terhubung/Terputus/Error + timestamp terakhir), jadwal update wajib, tanggal update terakhir |
| Section "Ringkasan Performa" | Display | Metrik utama periode terakhir vs proyeksi |
| Daftar sub-proyek langsung | List | Nama + indikator kesehatan tiap sub-proyek; klik → P-PM-04 sub-proyek tersebut |

### Tab 2: Riwayat Update

| Elemen | Tipe | Behaviour |
|---|---|---|
| Timeline update | List kronologis | Setiap item: tanggal, sumber, status review Sinta, ikon tipe |
| Klik item | — | Buka Modal Review Update (sama dengan P-PM-02) |
| Celah timeline | Visual gap | Periode tanpa update ditampilkan eksplisit sebagai gap dengan label "Tidak ada update [periode]" |

### Tab 3: Grafik Tren

| Elemen | Tipe | Behaviour |
|---|---|---|
| Dropdown metrik | Select | Pilih metrik yang ditampilkan (sesuai kategori proyek) |
| Toggle tampilan | Toggle | "Proyek Ini" vs "Overlay Sub-Proyek" (hanya tampil jika punya sub-proyek) |
| Rentang waktu | Segmented button | 1 Bulan / 3 Bulan / 6 Bulan / 1 Tahun |
| Grafik garis | Chart | Garis proyeksi (putus-putus) vs realisasi (solid); titik data yang melewati threshold ditandai dengan ikon peringatan; celah data ditampilkan eksplisit (garis terputus) |

### Tab 4: Catatan Monitoring

| Elemen | Tipe | Behaviour |
|---|---|---|
| Tombol "Tambah Catatan" | Button | Buka Modal Tambah Catatan |
| Daftar catatan | List kronologis | Setiap item: tanggal, tipe badge, isi catatan, penulis |
| Badge tipe catatan | Badge warna | Observasi Rutin=abu, Peringatan=kuning, Tindak Lanjut=biru, Eskalasi=merah |
| Catatan Eskalasi | Highlight merah | Ditampilkan lebih menonjol; label "Notifikasi terkirim ke Investment Officer" |

### Modal: Tambah Catatan Monitoring
| Elemen | Behaviour |
|---|---|
| Dropdown tipe catatan | Observasi Rutin / Peringatan / Tindak Lanjut / Eskalasi |
| Textarea isi catatan | Wajib; min 20 karakter |
| Info tipe Eskalasi | Banner info kuning: "Catatan bertipe Eskalasi akan mengirimkan notifikasi ke Investment Officer secara otomatis." |
| Tombol "Simpan" | Submit; jika tipe Eskalasi → konfirmasi modal sebelum submit |
| Tombol "Batal" | Tutup modal |

---

# MODUL 4 — FINANCE OFFICER (HENDRA)

---

## P-FR-01 Dashboard Keuangan
**URL:** `/finance`
**Akses:** Finance Officer

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| 4 kartu saldo | Kartu | Satu per kategori dana: Investasi, Zakat, Infaq & Shadaqah, Wakaf; menampilkan saldo real-time; warna berbeda per kategori |
| Kartu "Antrian Review" | Kartu angka | Jumlah transaksi lintas kategori yang menunggu review; klik → P-FR-02 |
| Kartu "Kalkulasi Pending" | Kartu angka | Jumlah kalkulasi bagi hasil yang belum dikonfirmasi; klik → P-FR-03 |
| Kartu "Rekonsiliasi Pending" | Kartu angka | Jumlah item rekonsiliasi belum selesai; klik → P-FR-04 |
| Tabel transaksi terbaru | Tabel | 10 transaksi terakhir dari semua kategori; kolom: tanggal, kategori dana, proyek, tipe, nominal, status |
| Filter tabel | Dropdown | Filter per kategori dana |

---

## P-FR-02 Antrian Review Transaksi Lintas Kategori
**URL:** `/finance/cross-category`
**Akses:** Finance Officer

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Daftar transaksi ditahan | List | Setiap item: nominal, kategori sumber, kategori tujuan, tanggal deteksi, alasan sistem menahan |
| Klik item | — | Buka Modal Review Transaksi |

### Modal: Review Transaksi Lintas Kategori
| Elemen | Behaviour |
|---|---|
| Detail transaksi | Semua informasi transaksi yang ditahan |
| Alasan sistem | Teks penjelasan mengapa sistem menahan transaksi ini |
| Textarea justifikasi | Wajib jika Setujui; min 30 karakter |
| Tombol "Setujui" | Proses transaksi setelah justifikasi diisi; catat dalam audit trail khusus |
| Tombol "Tolak" | Batalkan transaksi; opsional isi alasan penolakan |
| Tombol "Batal" | Tutup modal |

---

## P-FR-03 Kalkulasi Bagi Hasil
**URL:** `/finance/profit-sharing`
**Akses:** Finance Officer

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Dropdown proyek | Select search | Hanya menampilkan proyek aktif dengan jadwal distribusi bagi hasil |
| Dropdown periode | Select | Periode sesuai jadwal distribusi proyek yang dipilih |
| Tombol "Hitung" | Button | Meminta sistem menjalankan kalkulasi untuk proyek + periode yang dipilih |
| Tabel hasil kalkulasi | Tabel | Muncul setelah hitung; kolom: Pihak, Persentase, Nominal |
| Baris total profit | Baris header tabel | Total profit bersih periode ini yang menjadi basis kalkulasi |
| Baris per pihak | Baris data | Investor (total), ACO, pihak lain jika ada |
| Rincian per investor | Expandable | Klik baris Investor untuk lihat breakdown per investor |
| Tombol "Tandai Dispute" | Button secondary | Tandai kalkulasi sebagai dispute; buka field keterangan; kalkulasi tidak diproses sampai dispute diselesaikan |
| Tombol "Konfirmasi & Proses" | Button primary hijau | Konfirmasi modal sebelum eksekusi; setelah eksekusi → distribusi diproses dan notifikasi N-10 dikirim |

### Modal: Konfirmasi Distribusi Bagi Hasil
| Elemen | Behaviour |
|---|---|
| Ringkasan | Total yang akan didistribusikan, jumlah penerima |
| Checkbox konfirmasi | "Saya telah memverifikasi keakuratan kalkulasi ini." Wajib dicentang |
| Tombol "Proses Distribusi" | Eksekusi; tidak dapat dibatalkan setelah ini |
| Tombol "Batal" | Kembali ke halaman kalkulasi |

---

## P-FR-04 Rekonsiliasi
**URL:** `/finance/reconciliation`
**Akses:** Finance Officer

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Dropdown proyek | Select search | |
| Dropdown periode | Select | |
| Tombol "Load Data" | Button | Memuat tabel rekonsiliasi |
| Tabel rekonsiliasi | Tabel | Kolom: Tanggal, Deskripsi, Proyeksi, Realisasi, Selisih, Status |
| Highlight selisih | Warna baris | Realisasi > proyeksi = merah; realisasi < proyeksi = kuning |
| Dropdown status per baris | Select per baris | Cocok / Selisih Wajar / Perlu Investigasi |
| Field keterangan per baris | Input teks | Muncul jika status = Selisih Wajar atau Perlu Investigasi; wajib |
| Status rekonsiliasi keseluruhan | Badge | Belum Selesai / Selesai Sebagian / Selesai |
| Tombol "Selesaikan Rekonsiliasi" | Button primary | Aktif jika semua baris sudah diberi status; konfirmasi sebelum eksekusi |

---

## P-FR-05 Laporan Keuangan
**URL:** `/finance/reports`
**Akses:** Finance Officer

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Dropdown jenis laporan | Select | Per Kategori Dana / Konsolidasi Semua Kategori / Fee Nazir per Proyek |
| Dropdown kategori dana | Select | Muncul jika jenis = Per Kategori; opsi: Investasi, Zakat, Infaq & Shadaqah, Wakaf |
| Dropdown proyek | Select search | Muncul jika jenis = Fee Nazir; opsional untuk jenis lain (kosong = semua proyek) |
| Date range picker | Tanggal mulai – tanggal selesai | |
| Tombol "Generate Laporan" | Button primary | Memuat preview laporan |
| Preview laporan | Section | Menampilkan ringkasan: saldo awal, total pemasukan, total pengeluaran, saldo akhir; data pending diberi tanda asterisk |
| Tombol "Download PDF" | Button | Unduh laporan dalam format PDF |
| Tombol "Download Excel" | Button | Unduh laporan dalam format Excel |
| Riwayat laporan | List | 10 laporan terakhir yang pernah digenerate; setiap item: jenis, periode, tanggal generate, tombol download ulang |

---

# MODUL 5 — ADMIN & PLATFORM OPERATOR (REZA)

---

## P-AO-01 Antrian KYC
**URL:** `/admin/kyc`
**Akses:** Admin

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Tab "Menunggu Review" / "Selesai" | Tab | Filter berdasarkan status |
| Filter tanggal | Date range | Filter berdasarkan tanggal pengajuan |
| Daftar submission | List | Urut tanggal pengajuan terlama; setiap item: nama user, tanggal pengajuan, berapa hari menunggu |
| Badge waktu tunggu | Badge | >3 hari kerja: kuning; >5 hari kerja: merah |
| Klik item | — | Navigasi ke P-AO-02 |

---

## P-AO-02 Review KYC
**URL:** `/admin/kyc/[userId]`
**Akses:** Admin

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Data user | Display | Nama, email, nomor HP, tanggal registrasi |
| Riwayat pengajuan KYC | Accordion | Semua pengajuan sebelumnya (jika pernah ditolak); dapat dibuka untuk melihat dokumen dan alasan penolakan lama |
| Viewer dokumen KTP | Image viewer | Zoom in/out, rotate; tampil penuh di area yang memadai |
| Viewer dokumen lain | Image/PDF viewer | Jika ada dokumen tambahan |
| Checklist verifikasi | Checklist | Item: Nama di KTP sesuai data registrasi / KTP tidak kedaluwarsa / Foto KTP jelas dan terbaca / Nomor KTP valid (16 digit); semua wajib dicentang sebelum dapat menyetujui |
| Tombol "Setujui" | Button hijau | Aktif hanya jika semua checklist dicentang; konfirmasi modal → notifikasi N-08a terkirim |
| Tombol "Tolak" | Button merah | Buka Modal Penolakan KYC |

### Modal: Penolakan KYC
| Elemen | Behaviour |
|---|---|
| Dropdown alasan | Foto tidak jelas / KTP kedaluwarsa / Data tidak sesuai / Dokumen tidak valid / Lainnya |
| Textarea catatan | Wajib jika alasan = Lainnya; opsional untuk alasan lain |
| Tombol "Konfirmasi Tolak" | Eksekusi penolakan; notifikasi N-08b terkirim ke user |
| Tombol "Batal" | Tutup modal |

---

## P-AO-03 Manajemen Pengguna
**URL:** `/admin/users`
**Akses:** Admin

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Search bar | Input teks | Cari berdasarkan nama atau email |
| Filter role | Dropdown | Semua / Investment Officer / Portfolio Monitor / Finance Officer / Admin / External User |
| Filter status | Dropdown | Aktif / Dibekukan / Dinonaktifkan |
| Tabel pengguna | Tabel | Kolom: Nama, Email, Role, Status, Tanggal Bergabung, Aksi |
| Tombol "Ubah Role" | Button per baris | Buka Modal Ubah Role |
| Tombol "Bekukan" | Button per baris | Hanya untuk akun Aktif; buka Modal Konfirmasi Pembekuan |
| Tombol "Aktifkan" | Button per baris | Hanya untuk akun Dibekukan; konfirmasi → aktifkan akun |
| Tombol "Nonaktifkan" | Button per baris | Hanya untuk akun Aktif/Dibekukan; buka Modal Konfirmasi Penonaktifan |
| Tombol "Tambah Pengguna Internal" | Button primary | Buka Modal Tambah Pengguna Internal |

### Modal: Ubah Role
| Elemen | Behaviour |
|---|---|
| Nama user | Read-only display |
| Role saat ini | Read-only display |
| Dropdown role baru | Hanya menampilkan role dengan level akses ≤ level akses Admin yang sedang login **[DIKUNCI]** |
| Tombol "Simpan" | Konfirmasi modal: "Mengubah role [nama] dari [role lama] menjadi [role baru]?"; eksekusi + catat di audit log |
| Tombol "Batal" | Tutup modal |

### Modal: Konfirmasi Pembekuan Akun
| Elemen | Behaviour |
|---|---|
| Nama user | Display |
| Textarea alasan | Wajib |
| Tombol "Bekukan Akun" | Eksekusi; user tidak dapat login; notifikasi terkirim ke user |
| Tombol "Batal" | Tutup modal |

### Modal: Konfirmasi Penonaktifan Permanen
| Elemen | Behaviour |
|---|---|
| Teks peringatan | "Penonaktifan bersifat permanen. Data user tidak dihapus namun akun tidak dapat digunakan kembali." |
| Dropdown alasan | Daftar alasan standar |
| Textarea catatan | Opsional |
| Konfirmasi dua langkah | Checkbox: "Saya memahami tindakan ini tidak dapat dibatalkan" |
| Tombol "Nonaktifkan" | Aktif hanya setelah checkbox dicentang |
| Tombol "Batal" | Tutup modal |

### Modal: Tambah Pengguna Internal
| Elemen | Behaviour |
|---|---|
| Field nama | Wajib |
| Field email | Wajib; validasi format; cek duplikasi |
| Dropdown role | Investment Officer / Portfolio Monitor / Finance Officer / Admin |
| Tombol "Buat Akun" | Sistem generate password sementara dan kirim via email ke user baru |
| Tombol "Batal" | Tutup modal |

---

## P-AO-04 Konfigurasi Proyek
**URL:** `/admin/projects/[id]/config`
**Akses:** Admin
**Catatan:** Halaman ini diakses dari P-IO-03 (tab Overview) via link "Konfigurasi Monitoring" yang hanya terlihat oleh Admin

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Nama & breadcrumb proyek | Display read-only | |
| Dropdown frekuensi update wajib | Select | Mingguan / Dua Mingguan / Bulanan |
| Opsi warisan konfigurasi | Toggle | "Gunakan konfigurasi parent" (hanya muncul untuk sub-proyek); jika aktif, semua field di bawah menjadi read-only dan menampilkan nilai dari parent |
| Dropdown sumber data | Select | Form ACO / Integrasi API |
| Select akun project team | Select multi | Muncul jika sumber = Form ACO; pilih akun External User yang berwenang mengisi form update; hanya menampilkan akun dengan role External User yang sudah KYC terverifikasi |
| Info integrasi API | Display | Muncul jika sumber = Integrasi API; menampilkan status koneksi, endpoint, dan timestamp terakhir berhasil (read-only untuk Admin; dikonfigurasi secara teknis oleh developer) |
| Toggle "Tampilkan di Homepage" | Toggle Ya/Tidak | Default: Tidak; menentukan apakah proyek ini muncul di Section Proyek Unggulan di P-PUB-00; hanya berlaku untuk node yang memiliki minimal satu flag partisipasi = Ya |
| Field "Urutan di Homepage" | Input angka | Muncul jika "Tampilkan di Homepage" = Ya; angka lebih kecil = tampil lebih awal; jika sama, urut berdasarkan tanggal diaktifkan |
| Tombol "Simpan" | Button primary | Simpan konfigurasi; catat perubahan di changelog proyek |
| Tombol "Batal" | Link | Kembali ke P-IO-03 |

---

## P-AO-05 Antrian Validasi Dokumen
**URL:** `/admin/documents`
**Akses:** Admin

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Filter proyek | Select search | |
| Filter kategori | Dropdown | Legal / Keuangan / Operasional / Lainnya |
| Daftar dokumen menunggu | List | Setiap item: nama dokumen, proyek (dengan breadcrumb), kategori, pengunggah, tanggal upload |
| Klik item | — | Buka Modal Review Dokumen |

### Modal: Review Dokumen
| Elemen | Behaviour |
|---|---|
| Preview dokumen | PDF viewer atau image viewer |
| Info dokumen | Nama, kategori, proyek, pengunggah, tanggal upload |
| Field tanggal kedaluwarsa | Date picker; opsional; jika diisi, sistem kirim pengingat H-14 |
| Tombol "Validasi" | Status dokumen → Tervalidasi |
| Tombol "Tolak" | Buka field alasan penolakan (wajib); status → Ditolak; notifikasi ke Arief |
| Tombol "Batal" | Tutup modal |

---

## P-AO-06 Audit Log
**URL:** `/admin/audit-log`
**Akses:** Admin

### Elemen

| Elemen | Tipe | Behaviour |
|---|---|---|
| Filter pengguna | Select search | |
| Filter tipe aksi | Dropdown multi-select | Login, Perubahan Data, Approval, Penolakan, Perubahan Role, Upload Dokumen, dll. |
| Filter entitas | Select search | Cari berdasarkan nama proyek, nama user, dll. |
| Date range picker | | |
| Tombol "Reset Filter" | Button teks | Hapus semua filter |
| Tabel audit log | Tabel | Kolom: Timestamp, User, Tipe Aksi, Entitas, Sebelum, Sesudah |
| Sel "Sebelum" / "Sesudah" | Teks | Untuk perubahan kompleks: truncated dengan tombol "Lihat Detail" yang membuka modal JSON diff |
| Tombol "Export CSV" | Button | Unduh hasil tabel yang sedang ditampilkan (dengan filter aktif) dalam format CSV |
| Pagination | Navigasi | 50 baris per halaman |

---

*ACO Page Spec — Modul Internal v1.0*
*Lanjutan: Modul External User tersedia di file terpisah: ACO_PageSpec_ExternalUser_v1.md*
