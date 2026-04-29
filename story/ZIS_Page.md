# ACO — Page Spec: ZIS & Wakaf
### v1.0 — Halaman Baru & Revisi untuk Zakat, Infaq & Shadaqah, Wakaf Sosial, Wakaf Produktif

Dokumen ini mencakup:
- Halaman baru: P-EX-10, P-EX-11, P-FR-06, P-AO-07, P-PUB-02
- Revisi: P-EX-01, P-EX-04, P-EX-05, P-EX-06, P-EX-07, P-FR-01, P-FR-05, P-IO-02, P-AO-04
- Ringkasan halaman diperbarui: total 46 halaman + 1 shared component

Dibaca bersama: ACO_PageSpec_ExternalUser_v1.md, ACO_PageSpec_Internal_v1.md, ACO_BusinessLogic_ZIS_Wakaf_patch_v1.md

---

# MODUL 6 — EXTERNAL USER (Revisi & Tambahan)

---

## P-EX-01 Browse Catalog (Revisi)
**Revisi:** Tambah tab "Infaq & Shadaqah" dan filter Sosial/Produktif untuk tab Wakaf Uang.

| Elemen | Tipe | Behaviour |
|---|---|---|
| Tab navigasi | Tab | **"Semua" / "Investasi" / "Wakaf Uang" / "Infaq & Shadaqah"** — tab "Infaq & Shadaqah" baru; default "Semua"; dapat diaktifkan via query param `?tab=infaq` |
| Filter jenis wakaf | Chip filter | Hanya muncul di tab "Wakaf Uang": chip "Sosial" dan "Produktif"; default semua tampil |
| Badge jenis wakaf | Badge | Di setiap card wakaf uang: badge "Sosial" (warna teal) atau "Produktif" (warna amber) |
| Card program infaq | Card grid | Di tab "Infaq & Shadaqah": thumbnail, nama program, deskripsi singkat, progress dana (jika ada target), badge "Infaq & Shadaqah", tanggal terakhir update laporan |
| Progress bar infaq | Bar | Hanya muncul jika program punya target dana; menampilkan % terkumpul |
| Badge "Target Terpenuhi" | Badge hijau | Muncul di card infaq jika target sudah terpenuhi; program tidak menerima donasi baru |
| Klik card infaq | — | Navigasi ke P-EX-02 (`/browse/[programSlug]`) halaman detail program |
| Catatan | — | **Zakat tidak muncul di catalog** — zakat bukan program, tidak ada target dana per program; akses via tombol "Bayar Zakat" di dashboard atau menu navigasi |

---

## P-EX-04 Flow Wakaf Uang (Revisi)
**Revisi:** Tambah tampilan jenis wakaf (Sosial/Produktif) di setiap step; revisi teks ikrar; tambah field bagi hasil wakif (kondisional).

### Step 1: Masukkan Nominal
*(tidak berubah dari v1 — lihat P-EX-04 di ACO_PageSpec_ExternalUser_v1.md)*

Tambahan:

| Elemen | Tipe | Behaviour |
|---|---|---|
| Badge jenis wakaf | Badge | Ditampilkan di samping nama program: "Wakaf Sosial" atau "Wakaf Produktif" |
| Info rekening tujuan | Teks info | "Dana Anda akan masuk ke rekening Dana Wakaf Sosial / Dana Wakaf Produktif yang terisolasi." (sesuai jenis) |

### Step 2: Ikrar & Konfirmasi

| Elemen | Tipe | Behaviour |
|---|---|---|
| Teks ikrar wakaf | Teks formal | Menyebutkan secara eksplisit jenis pengelolaan: "…sebagai **Wakaf Sosial** untuk [nama program]" atau "…sebagai **Wakaf Produktif** untuk [nama program]" |
| Pernyataan permanen | Banner | Tidak berubah: "Dana yang telah diwakafkan bersifat permanen dan tidak dapat ditarik kembali." **[DIKUNCI]** |
| Section bagi hasil wakif | Section kondisional | **Hanya muncul jika:** (1) program adalah Wakaf Produktif DAN (2) fitur bagi hasil wakif diaktifkan Admin DAN (3) Arief mengkonfigurasi porsi bagi hasil > 0% untuk proyek ini |
| Toggle bagi hasil | Toggle Ya/Tidak | "Apakah Anda ingin menerima porsi bagi hasil dari hasil pengelolaan wakaf ini?" Default: Tidak |
| Field rekening bagi hasil | Input teks | Muncul jika toggle = Ya; nama bank + nomor rekening penerima bagi hasil |
| Info porsi bagi hasil | Teks | "Porsi bagi hasil Anda: [X]% dari profit bersih per periode distribusi." (nilai dari konfigurasi Arief) |

### Step 3: Tanda Terima
*(tidak berubah — tambahan hanya label jenis wakaf pada teks konfirmasi)*

| Elemen | Behaviour |
|---|---|
| Teks konfirmasi | "Wakaf [Sosial / Produktif] uang Anda sebesar Rp [nominal] untuk [nama program] telah diterima. Jazakallahu khairan." |

---

## P-EX-05 Form Wakaf Aset (Revisi)
**Revisi:** Tambah Step 0 (pilih jenis pengelolaan) sebelum Step 1 (pilih jenis aset); tambah field bagi hasil kondisional.

### Step 0 (Baru): Pilih Jenis Pengelolaan Wakaf

| Elemen | Tipe | Behaviour |
|---|---|---|
| Heading | H2 | "Bagaimana aset Anda ingin dikelola?" |
| Card "Wakaf Sosial" | Radio card | Ikon + judul + penjelasan singkat: "Aset digunakan langsung sebagai fasilitas atau layanan sosial — masjid, sekolah, sumur, dsb. Manfaatnya langsung dirasakan masyarakat. Tidak ada bagi hasil." |
| Card "Wakaf Produktif" | Radio card | Ikon + judul + penjelasan singkat: "Aset dikelola secara bisnis/produktif untuk menghasilkan pendapatan. Sebagian besar keuntungan disalurkan ke mustahiq. Wakif dapat memilih menerima porsi bagi hasil." |
| Link "Pelajari perbedaannya" | Link | Membuka modal atau accordion yang menjelaskan perbedaan Wakaf Sosial vs Produktif secara lebih detail |
| Tombol "Lanjut" | Button primary | Validasi pilihan; lanjut ke Step 1 |

### Step 1 → Step 3: Detail Aset & Upload Dokumen
*(tidak berubah dari v1 — lihat P-EX-05 di ACO_PageSpec_ExternalUser_v1.md)*

### Step 4 (sebelumnya Step 4): Konfirmasi & Submit

Tambahan di bawah ringkasan data aset:

| Elemen | Tipe | Behaviour |
|---|---|---|
| Display jenis pengelolaan | Badge + teks | "Jenis Pengelolaan: Wakaf Sosial" atau "Wakaf Produktif" |
| Section bagi hasil wakif | Section kondisional | **Hanya muncul jika:** Wakaf Produktif dipilih DAN fitur bagi hasil wakif diaktifkan Admin |
| Toggle bagi hasil | Toggle Ya/Tidak | "Apakah Anda ingin menerima porsi bagi hasil dari hasil pengelolaan aset ini?" Default: Tidak |
| Field rekening bagi hasil | Input teks | Muncul jika toggle = Ya; nama bank + nomor rekening |
| Info porsi bagi hasil | Teks | "Porsi bagi hasil aktual dikonfigurasi oleh tim ACO sesuai jenis proyek yang akan dikelola. Anda akan diinformasikan saat proyek ditetapkan." |
| Pernyataan niat wakaf | Teks | Menyebutkan jenis pengelolaan: "…saya berniat mewakafkan aset ini sebagai **Wakaf Sosial / Produktif**." |
| Tombol "Ajukan Wakaf Aset" | Button primary | Submit; status = Menunggu Tindak Lanjut ACO |

---

## P-EX-06 Dashboard External User (Revisi)
**Revisi:** Tambah dua summary card, tambah dua tab partisipasi.

### Elemen — Summary Cards (Revisi)

| Kartu | Sumber Data | Tambahan |
|---|---|---|
| Kartu Total Investasi Aktif | Tidak berubah | |
| Kartu Total Bagi Hasil Diterima | Tidak berubah | |
| Kartu Total Wakaf Uang | Tidak berubah | |
| Kartu Partisipasi Aktif | Tidak berubah | |
| **Kartu Total Zakat Dibayarkan** | Akumulasi seluruh pembayaran zakat yang dikonfirmasi | Baru |
| **Kartu Total Infaq & Shadaqah** | Akumulasi seluruh donasi infaq & shadaqah | Baru |

*Catatan: 6 kartu dapat ditampilkan dalam dua baris 3 kolom atau scrollable horizontal di mobile.*

### Elemen — Tab Partisipasi (Revisi)

Tab yang sudah ada tidak berubah. Tambahan:

**Tab "Zakat" (Baru):**

| Elemen | Tipe | Behaviour |
|---|---|---|
| Daftar riwayat zakat | Card list | Setiap entri: jenis zakat, nominal, tanggal konfirmasi, nomor referensi |
| Tombol "Download Bukti" | Button per entri | Unduh PDF bukti pembayaran zakat |
| Link "Lihat Laporan Distribusi Zakat" | Link | Navigasi ke P-PUB-02 section Zakat untuk melihat bagaimana dana zakat ACO didistribusikan |
| Pesan jika kosong | Teks | "Belum ada riwayat pembayaran zakat. Bayar zakat sekarang." + tombol "Bayar Zakat" |

**Tab "Infaq & Shadaqah" (Baru):**

| Elemen | Tipe | Behaviour |
|---|---|---|
| Daftar donasi | Card list | Setiap entri: nama program (atau "Dana Umum"), nominal, tanggal, status program (Aktif/Selesai), update terakhir program |
| Badge status program | Badge | Aktif=hijau, Selesai=abu, Target Terpenuhi=biru |
| Tombol "Download Bukti" | Button per entri | Unduh PDF bukti donasi |
| Klik card | — | Navigasi ke halaman detail program (P-EX-02) untuk lihat laporan penggunaan |
| Pesan jika kosong | Teks | "Belum ada riwayat donasi. Lihat program yang tersedia." + tombol → P-EX-01 tab Infaq & Shadaqah |

---

## P-EX-07 Detail Partisipasi (Revisi)
**Revisi:** Tambah section khusus untuk Zakat dan Infaq & Shadaqah.

### Section Khusus Zakat (Baru)

| Elemen | Tipe | Behaviour |
|---|---|---|
| Jenis zakat | Display | Nama jenis zakat yang dibayarkan |
| Nominal | Display | Jumlah yang dibayarkan |
| Tanggal konfirmasi | Display | |
| Nomor referensi | Display | |
| Tombol "Download Bukti Zakat" | Button | Unduh PDF |
| Link "Laporan Distribusi Zakat ACO" | Link | Navigasi ke P-PUB-02 section Zakat |

### Section Khusus Infaq & Shadaqah (Baru)

| Elemen | Tipe | Behaviour |
|---|---|---|
| Nama program / "Dana Umum" | Display | |
| Nominal donasi | Display | |
| Tanggal konfirmasi | Display | |
| Status program | Badge | |
| Progress pendanaan program | Bar + angka | Dana terkumpul total / Target (jika ada target) |
| Riwayat laporan penggunaan | Timeline | Setiap item: tanggal laporan, ringkasan penggunaan, dokumen (jika ada) |
| Tombol "Download Bukti Donasi" | Button | |

---

## P-EX-10 (Baru) — Flow Bayar Zakat
**URL:** `/zakat`
**Akses:** External User (KYC terverifikasi)

### Step 1: Pilih Jenis Zakat

| Elemen | Tipe | Behaviour |
|---|---|---|
| Heading | H1 | "Bayar Zakat" |
| Info singkat | Teks | Penjelasan ACO sebagai amil zakat dan jaminan penyaluran ke 8 asnaf |
| Daftar jenis zakat | Radio cards | Satu card per jenis zakat yang diaktifkan Admin; setiap card berisi nama, deskripsi singkat, dan ketentuan nisab/haul |
| Tombol "Lanjut" | Button primary | Validasi pilihan; lanjut ke Step 2 |

### Step 2: Kalkulator & Nominal (opsional)

| Elemen | Tipe | Behaviour |
|---|---|---|
| Section "Kalkulator Zakat" (collapsible) | Accordion | Terbuka secara default; dapat dilipat jika user ingin langsung masukkan nominal |
| Form kalkulator per jenis | Form dinamis | Setiap jenis zakat memiliki input field yang relevan:<br>- Zakat Maal: total harta, utang, kebutuhan pokok<br>- Zakat Profesi: penghasilan bulanan<br>- Zakat Fitrah: jumlah tanggungan<br>- dsb. |
| Tampilkan nisab terkini | Teks | "Nisab saat ini: Rp [nilai] (setara [X] gram emas)" — diambil dari konfigurasi Admin |
| Tombol "Hitung" | Button secondary | Tampilkan estimasi zakat di bawah form |
| Hasil estimasi | Teks highlight | "Estimasi zakat Anda: Rp [nominal]" + tombol "Gunakan nilai ini" yang mengisi field nominal di bawah |
| Field nominal final | Input angka | Wajib; format Rupiah; dapat diisi manual atau dari tombol "Gunakan nilai ini"; tidak terikat hasil kalkulator |
| Disclaimer | Teks kecil | "Kalkulator ini bersifat estimasi. Nominal final adalah keputusan Anda sepenuhnya." |
| Tombol "Lanjut" | Button primary | Validasi nominal > 0; lanjut ke Step 3 |

### Step 3: Konfirmasi Pembayaran

| Elemen | Tipe | Behaviour |
|---|---|---|
| Ringkasan | Display | Jenis zakat, nominal, rekening tujuan: Dana Zakat ACO |
| Info transparansi | Teks | "Laporan distribusi zakat ACO dapat dipantau secara publik di halaman Transparansi kami." + link ke P-PUB-02 |
| Checkbox konfirmasi | Wajib | "Saya berniat menunaikan zakat dan menyerahkan kepada ACO sebagai amil untuk didistribusikan kepada yang berhak." |
| Tombol "Bayar Zakat" | Button primary | Aktif setelah checkbox; eksekusi; notifikasi N-16 terkirim |
| Tombol "Kembali" | Button teks | Kembali ke Step 2 |

### Step 4: Bukti Pembayaran

| Elemen | Tipe | Behaviour |
|---|---|---|
| Ikon sukses | Ilustrasi | |
| Teks konfirmasi | Teks | "Jazakallahu khairan. Pembayaran zakat Anda sebesar Rp [nominal] ([jenis zakat]) telah diterima." |
| Nomor referensi | Teks | Kode unik untuk referensi |
| Tombol "Download Bukti Zakat" | Button | Unduh PDF bukti pembayaran; berisi: nama muzakki, jenis zakat, nominal, tanggal, nomor referensi, cap ACO sebagai amil |
| Link "Pantau Distribusi Zakat" | Link | Navigasi ke P-PUB-02 section Zakat |
| Tombol "Kembali ke Dashboard" | Button teks | |

---

## P-EX-11 (Baru) — Flow Infaq & Shadaqah
**URL:** `/infaq`
**Akses:** External User (KYC terverifikasi); akses ke catalog program juga tersedia dari P-EX-01 tab Infaq & Shadaqah

### Step 1: Pilih Program atau Dana Umum

| Elemen | Tipe | Behaviour |
|---|---|---|
| Heading | H1 | "Infaq & Shadaqah" |
| Info singkat | Teks | Perbedaan infaq (program-based) dan shadaqah (umum); semua tersalur ke rekening Infaq & Shadaqah yang terisolasi |
| Card "Dana Umum ACO" | Radio card kondisional | Hanya tampil jika Admin mengaktifkan jalur general fund; deskripsi: "Donasi Anda dikelola ACO untuk kebutuhan sosial yang paling mendesak." |
| Daftar program aktif | Radio cards | Satu card per program infaq yang terbuka; setiap card: nama program, deskripsi singkat, progress dana (jika ada target), status |
| Filter / Sort | Dropdown | Filter: Semua / Masih Berjalan / Hampir Selesai; Sort: Terbaru / Progress Tertinggi |
| Tombol "Lihat Detail Program" | Link per card | Membuka P-EX-02 halaman detail program di tab baru |
| Tombol "Lanjut" | Button primary | Validasi pilihan; lanjut ke Step 2 |

### Step 2: Masukkan Nominal

| Elemen | Tipe | Behaviour |
|---|---|---|
| Info program terpilih | Display | Nama program / "Dana Umum", deskripsi singkat |
| Field nominal | Input angka | Wajib; format Rupiah; tidak ada minimum/maksimum |
| Tombol "Lanjut" | Button primary | Validasi; lanjut ke Step 3 |
| Tombol "Kembali" | Button teks | Kembali ke Step 1 |

### Step 3: Konfirmasi

| Elemen | Tipe | Behaviour |
|---|---|---|
| Ringkasan donasi | Display | Program terpilih, nominal, rekening tujuan: Dana Infaq & Shadaqah |
| Info transparansi | Teks | "Laporan penggunaan dana program ini dipublikasikan secara berkala di halaman program." |
| Checkbox | Wajib | "Saya mengikhlaskan donasi ini sebagai infaq/shadaqah." |
| Tombol "Konfirmasi Donasi" | Button primary | Aktif setelah checkbox; eksekusi; notifikasi N-17 terkirim |
| Tombol "Kembali" | Button teks | |

### Step 4: Bukti Donasi

| Elemen | Tipe | Behaviour |
|---|---|---|
| Ikon sukses | Ilustrasi | |
| Teks konfirmasi | Teks | "Terima kasih. Donasi Anda sebesar Rp [nominal] untuk [nama program / Dana Umum] telah diterima." |
| Nomor referensi | Teks | |
| Tombol "Download Bukti Donasi" | Button | Unduh PDF; berisi nama donatur, program, nominal, tanggal, nomor referensi |
| Tombol "Lihat Laporan Program" | Button kondisional | Hanya jika memilih program (bukan dana umum); navigasi ke halaman publik program |
| Tombol "Kembali ke Dashboard" | Button teks | |

---

# MODUL 2 — INVESTMENT OFFICER (Revisi)

---

## P-IO-02 Tambah / Edit Proyek (Revisi)
**Revisi:** Tambah dua kategori baru dan field dinamis yang relevan.

### Section 2: Field Dinamis per Kategori (Tambahan)

**Kategori Baru: Wakaf Sosial**

| Field | Tipe | Keterangan |
|---|---|---|
| Jenis aset yang akan dikelola | Dropdown | Tidak bergerak / Bergerak / Berbasis Wakaf Uang |
| Peruntukan sosial | Input teks | Wajib; deskripsi fasilitas/layanan sosial yang akan diberikan (misal: "Masjid", "Sekolah", "Sumur Bor") |
| Data wakif | Input teks | Nama wakif / lembaga; wajib |
| Lokasi pemanfaatan | Input teks | Wajib |
| Target penerima manfaat | Input teks | Deskripsi dan estimasi jumlah penerima manfaat yang dituju |
| Catatan pemeliharaan | Textarea | Opsional; rencana sumber biaya pemeliharaan aset |

*Proyek Wakaf Sosial otomatis tertaut ke rekening Dana Wakaf Sosial. Flag partisipasi "Terbuka untuk Wakaf Uang Sosial" (baru) menggantikan toggle Wakaf Uang biasa untuk kategori ini.*

**Kategori Baru: Program Sosial (Infaq & Shadaqah)**

| Field | Tipe | Keterangan |
|---|---|---|
| Deskripsi program | Textarea | Wajib; penjelasan lengkap program dan tujuannya |
| Penerima manfaat yang dituju | Input teks | Wajib; deskripsi kategori penerima (contoh: "Anak yatim di desa X") |
| Target dana | Input angka | Opsional; jika diisi, progress bar muncul di catalog; format Rupiah |
| Tanggal akhir penggalangan | Date picker | Opsional; setelah tanggal ini program otomatis ditutup |
| Tanggal akhir program | Date picker | Opsional; tanggal selesai realisasi program (berbeda dari penggalangan) |

*Program Sosial otomatis tertaut ke rekening Dana Infaq & Shadaqah. Flag partisipasi khusus kategori ini: "Terbuka untuk Infaq & Shadaqah".*

**Kategori: Wakaf Produktif (Revisi — tambah bagi hasil wakif)**

Tambahkan ke field dinamis yang sudah ada:

| Field | Tipe | Keterangan |
|---|---|---|
| Field "Porsi Bagi Hasil Wakif (%)" | Input angka (%) | **Kondisional:** hanya muncul jika Admin mengaktifkan fitur bagi hasil wakif. Opsional; default 0%; validasi: tidak boleh melebihi batas_admin%; sistem menampilkan real-time: "Fee Nazir: X% · Bagi Hasil Wakif: Y% · Mustahiq: Z%" |

---

# MODUL 4 — FINANCE OFFICER (Revisi & Tambahan)

---

## P-FR-01 Dashboard Keuangan (Revisi)
**Revisi:** 5 kartu saldo (dari 4).

| Elemen | Perubahan |
|---|---|
| Kartu saldo | Menjadi **5 kartu**: Dana Investasi, Dana Zakat, Dana Infaq & Shadaqah, Dana Wakaf Sosial *(baru)*, Dana Wakaf Produktif |
| Warna kartu | Dana Wakaf Sosial menggunakan warna berbeda dari Dana Wakaf Produktif untuk membedakan secara visual |
| Rincian saldo infaq | Kartu Dana Infaq & Shadaqah dapat di-expand untuk melihat rincian: saldo per program aktif + saldo general fund |

---

## P-FR-05 Laporan Keuangan (Revisi)
**Revisi:** Tambah jenis laporan baru.

| Elemen | Perubahan |
|---|---|
| Dropdown jenis laporan | Tambah opsi: **"Dana Wakaf Sosial"** dan **"Bagi Hasil Wakif"** |
| Dropdown kategori dana | Tambah opsi: **"Wakaf Sosial"** |
| Laporan Dana Wakaf Sosial | Mencakup: pemasukan (wakaf uang sosial, nilai taksiran aset masuk), pengeluaran (pembelian/pembangunan aset), saldo aset yang sudah terealisasi |
| Laporan Bagi Hasil Wakif | **Hanya muncul jika fitur aktif di Admin.** Mencakup: proyek wakaf produktif yang memiliki konfigurasi bagi hasil wakif, daftar wakif dengan klaim, nominal per periode, status distribusi (belum/sudah didistribusikan) |

---

## P-FR-06 (Baru) — Distribusi Zakat ke Asnaf
**URL:** `/finance/zakat-distribution`
**Akses:** Finance Officer

### Elemen — Header

| Elemen | Tipe | Behaviour |
|---|---|---|
| Saldo Dana Zakat | Display angka | Saldo real-time rekening Dana Zakat |
| Saldo setelah potong amil | Display angka | Saldo Dana Zakat dikurangi porsi amil (dihitung otomatis); label: "Siap Didistribusikan" |
| Info porsi amil | Teks info | "Porsi amil ACO [X]%: Rp [nominal] akan dipotong otomatis saat distribusi diproses." |
| Tombol "Mulai Sesi Distribusi" | Button primary | Membuka form distribusi per asnaf di bawah |

### Elemen — Form Distribusi per Asnaf

| Elemen | Tipe | Behaviour |
|---|---|---|
| Tabel asnaf | Tabel 8 baris | Satu baris per asnaf; kolom: Nama Asnaf, Deskripsi Singkat, Field Nominal, Field Penerima/Lembaga, Field Keterangan |
| Field Nominal per asnaf | Input angka | Opsional per baris (tidak wajib semua asnaf diisi dalam satu sesi); format Rupiah |
| Field Penerima/Lembaga | Input teks | Opsional; nama individu, lembaga, atau program penerima |
| Field Keterangan | Input teks | Opsional; deskripsi penggunaan |
| Total alokasi sesi ini | Teks kalkulasi real-time | Jumlah semua nominal yang diisi; berubah merah jika melebihi "Saldo Siap Didistribusikan" |
| Upload dokumen bukti | File upload multi | Opsional; untuk lampirkan bukti serah terima; PDF/JPG max 10MB per file |
| Tombol "Review & Konfirmasi" | Button primary | Aktif jika total alokasi > 0 dan tidak melebihi saldo; buka Modal Konfirmasi |

### Modal: Konfirmasi Distribusi Zakat

| Elemen | Behaviour |
|---|---|
| Tabel ringkasan | Daftar asnaf yang mendapat alokasi, nominal per asnaf, total |
| Baris porsi amil | Tampilkan nominal porsi amil yang dipotong |
| Baris total | Total yang diproses (termasuk potong amil) |
| Checklist konfirmasi | "Saya telah memverifikasi keabsahan seluruh alokasi ini dan siap memproses distribusi." Wajib dicentang |
| Tombol "Proses Distribusi" | Eksekusi; tidak dapat dibatalkan; audit trail tercatat; laporan transparansi P-PUB-02 diperbarui otomatis; notifikasi internal terkirim |
| Tombol "Batal" | Kembali ke form |

### Tab: Riwayat Distribusi

| Elemen | Tipe | Behaviour |
|---|---|---|
| Filter periode | Date range | |
| Tabel riwayat | Tabel | Kolom: Tanggal Sesi, Total Didistribusikan, Porsi Amil, Jumlah Asnaf yang Menerima, Status |
| Tombol "Lihat Detail" per baris | Button | Expand tampilkan breakdown per asnaf dari sesi tersebut |
| Tombol "Download Laporan Sesi" | Button per baris | Unduh PDF laporan distribusi sesi tersebut |

---

# MODUL 5 — ADMIN (Revisi & Tambahan)

---

## P-AO-04 Konfigurasi Proyek (Revisi)
**Revisi:** Tambah toggle "Tampilkan di Halaman Transparansi" untuk proyek ZIS & Wakaf Sosial.

| Elemen | Perubahan |
|---|---|
| Toggle "Tampilkan di Halaman Transparansi" | Baru; berlaku untuk proyek kategori Wakaf Sosial dan Program Sosial; menentukan apakah proyek muncul di P-PUB-02 section yang relevan |

---

## P-AO-07 (Baru) — Konfigurasi Platform: ZIS & Wakaf
**URL:** `/admin/platform-config`
**Akses:** Admin

### Section 1: Konfigurasi Zakat

| Elemen | Tipe | Behaviour |
|---|---|---|
| Toggle per jenis zakat | Toggle list | Aktifkan/nonaktifkan setiap jenis zakat; Zakat Fitrah memiliki catatan: "Aktifkan hanya selama Ramadan" |
| Field nilai nisab per jenis | Input angka per baris | Nilai dalam Rupiah; tooltip: "Diperbarui mengikuti harga emas/perak referensi terkini" |
| Field porsi amil | Input angka (%) | Default 12.5%; sistem menampilkan error merah dan menolak jika nilai > 12.5% |
| Field frekuensi laporan distribusi | Dropdown | Mingguan / Bulanan / Setelah Setiap Sesi |

### Section 2: Konfigurasi Bagi Hasil Wakif (Wakaf Produktif)

| Elemen | Tipe | Behaviour |
|---|---|---|
| Toggle "Aktifkan fitur bagi hasil wakif" | Toggle Ya/Tidak | Default: Tidak; mengubah ke Ya memunculkan field di bawah dan menampilkan konfirmasi modal |
| Modal konfirmasi aktifkan | Modal | "Mengaktifkan fitur ini memungkinkan wakif menerima porsi bagi hasil dari wakaf produktif. Pastikan kebijakan ini telah mendapat persetujuan manajemen ACO." + checkbox persetujuan |
| Field batas maksimal porsi bagi hasil wakif | Input angka (%) | Hanya aktif jika toggle = Ya; default 20%; sistem menampilkan warning jika nilai > 30% |
| Info validasi | Teks | "Fee nazir + bagi hasil wakif tidak boleh melebihi 50%. Mustahiq selalu minimum 50%." |

### Section 3: Konfigurasi Infaq & Shadaqah

| Elemen | Tipe | Behaviour |
|---|---|---|
| Toggle "Aktifkan jalur dana umum" | Toggle Ya/Tidak | Default: Ya; menonaktifkan menyembunyikan opsi "Dana Umum" dari P-EX-11 |

### Section 4: Konfigurasi Laporan Wakaf Sosial

| Elemen | Tipe | Behaviour |
|---|---|---|
| Field frekuensi laporan kondisi aset ke wakif | Dropdown | Setiap 3 Bulan / Setiap 6 Bulan / Setiap Tahun |

### Aksi

| Elemen | Tipe | Behaviour |
|---|---|---|
| Tombol "Simpan Semua" | Button primary | Menyimpan semua konfigurasi; konfirmasi modal sebelum eksekusi; catat di audit log |
| Tombol "Reset ke Default" | Button secondary | Hanya per section; konfirmasi sebelum reset |

---

# MODUL 5 — HALAMAN PUBLIK (Tambahan)

---

## P-PUB-02 (Baru) — Transparansi ZIS & Wakaf
**URL:** `/transparansi`
**Akses:** Publik
**Layout:** Menggunakan P-PUB-NAV

Halaman ini adalah wujud nyata keunggulan ACO dalam transparansi. Semua data ditarik real-time dari database. Tidak ada konten statis di halaman ini kecuali label dan heading.

### Header Halaman

| Elemen | Tipe | Behaviour |
|---|---|---|
| Heading | H1 | "Transparansi Pengelolaan Dana" |
| Sub-heading | Teks | "Setiap rupiah yang dipercayakan kepada ACO dapat dipantau di sini." |
| Timestamp update | Teks kecil | "Data terakhir diperbarui: [tanggal & waktu]" — diambil dari timestamp transaksi/laporan terbaru |
| Tab navigasi | Tab | "Zakat" / "Infaq & Shadaqah" / "Wakaf Sosial" / "Wakaf Produktif" |

---

### Tab 1: Zakat

| Elemen | Tipe | Behaviour |
|---|---|---|
| Kartu ringkasan | 3 kartu angka | Total zakat terkumpul (sejak platform berdiri), Total terdistribusikan, Saldo menunggu distribusi |
| Filter periode | Dropdown | Bulan ini / 3 bulan terakhir / 6 bulan terakhir / Tahun ini / Semua waktu |
| Grafik tren penerimaan | Bar chart | Penerimaan zakat per bulan; tooltip per bar: nominal dan jumlah transaksi |
| Tabel distribusi per asnaf | Tabel | Kolom: Asnaf, Total Diterima (periode terpilih), % dari total distribusi; baris total di bawah |
| Chart distribusi per asnaf | Donut chart | Visualisasi proporsi distribusi per asnaf |
| Riwayat sesi distribusi | List accordion | Setiap item: tanggal sesi, total didistribusikan, ringkasan per asnaf; dapat di-expand untuk detail |
| Tombol "Download Laporan PDF" | Button | Unduh laporan distribusi zakat periode terpilih dalam format PDF |

---

### Tab 2: Infaq & Shadaqah

| Elemen | Tipe | Behaviour |
|---|---|---|
| Kartu ringkasan | 3 kartu angka | Total dana terkumpul, Total telah disalurkan, Dana dalam program aktif |
| Filter periode | Dropdown | Sama seperti tab Zakat |
| Daftar program (aktif & selesai) | Card list | Setiap card: nama program, deskripsi singkat, total dana terkumpul, total dana tersalurkan, status, progress bar (jika ada target), tombol "Lihat Laporan" |
| Laporan per program | Section expandable per card | Laporan realisasi penggunaan dana yang dipublikasikan Hendra/Arief; setiap update: tanggal, ringkasan penggunaan, nominal yang digunakan |
| Laporan dana umum | Accordion | Total dana umum yang masuk, total yang telah digunakan, deskripsi penggunaan per sesi |

---

### Tab 3: Wakaf Sosial

| Elemen | Tipe | Behaviour |
|---|---|---|
| Kartu ringkasan | 3 kartu angka | Jumlah aset wakaf sosial yang dikelola, Estimasi total penerima manfaat aktif, Total nilai aset (estimasi) |
| Daftar aset wakaf sosial | Card grid | Setiap card: foto thumbnail (jika ada), nama/jenis aset, lokasi, peruntukan, status kondisi (Baik/Perlu Perhatian/Dalam Perbaikan), jumlah penerima manfaat aktif, tanggal laporan terakhir |
| Filter jenis aset | Dropdown | Tidak Bergerak / Bergerak / Semua |
| Filter kondisi | Dropdown | Semua / Baik / Perlu Perhatian |
| Klik card aset | — | Expand atau navigasi ke halaman detail aset yang menampilkan: deskripsi lengkap, riwayat laporan kondisi (timeline), foto terbaru, catatan pemeliharaan |
| Laporan per aset | Timeline dalam detail | Setiap item: tanggal laporan, kondisi saat itu, jumlah penerima manfaat, catatan dari Sinta |

---

### Tab 4: Wakaf Produktif

| Elemen | Tipe | Behaviour |
|---|---|---|
| Kartu ringkasan | 4 kartu angka | Jumlah proyek wakaf produktif aktif, Total dana wakaf produktif dikelola, Total profit bersih yang dihasilkan (akumulasi), Total disalurkan ke mustahiq (akumulasi) |
| Filter periode | Dropdown | Sama seperti tab Zakat |
| Daftar proyek wakaf produktif | Card list | Setiap card: nama proyek, jenis aset, status proyek, total dana dikelola, profit bersih periode terakhir, distribusi ke mustahiq periode terakhir, fee nazir periode terakhir, bagi hasil wakif (jika ada dan fitur aktif), status kesehatan proyek |
| Klik card proyek | — | Expand atau navigasi ke halaman publik proyek (P-EX-02) |
| Laporan keuangan per proyek | Accordion dalam detail | Timeline distribusi: per periode distribusi, tampilkan: profit bersih, fee nazir, bagi hasil wakif, distribusi ke mustahiq, nama/lembaga mustahiq penerima (tanpa data pribadi) |
| Tombol "Download Laporan PDF" | Button | Unduh laporan wakaf produktif periode terpilih |

---

## P-PUB-NAV (Revisi) — Navbar & Footer
**Revisi:** Tambah link "Transparansi" di navbar dan footer.

| Elemen | Perubahan |
|---|---|
| Link "Transparansi" di Navbar | Link nav baru; navigasi ke `/transparansi`; active state jika di P-PUB-02 |
| Link "Transparansi" di Footer | Link baru; navigasi ke `/transparansi` |
| Tombol "Bayar Zakat" di Navbar | Button tersier kondisional; **hanya tampil jika user sudah login dan KYC terverifikasi**; navigasi ke P-EX-10 |

---

# RINGKASAN SEMUA HALAMAN (Updated)

Tambahan dari patch ini:

| Kode | Nama Halaman | Akses |
|---|---|---|
| P-EX-10 | Flow Bayar Zakat | External User (KYC) |
| P-EX-11 | Flow Infaq & Shadaqah | External User (KYC) |
| P-FR-06 | Distribusi Zakat ke Asnaf | Finance Officer |
| P-AO-07 | Konfigurasi Platform ZIS & Wakaf | Admin |
| P-PUB-02 | Transparansi ZIS & Wakaf | Publik |

**Total setelah patch: 44 halaman + 1 shared component (P-PUB-NAV)**

*(Penomoran: 39 halaman v1 + 5 halaman baru dari patch ini)*

---

*ACO Page Spec: ZIS & Wakaf v1.0*
*Dibaca bersama: ACO_PageSpec_ExternalUser_v1.md, ACO_PageSpec_Internal_v1.md, ACO_BusinessLogic_ZIS_Wakaf_patch_v1.md, ACO_UserStories_ZIS_Wakaf_patch_v1.md*
*Halaman yang tidak disebutkan di dokumen ini tidak berubah dari spesifikasi v1.*