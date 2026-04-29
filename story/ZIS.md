# ACO — User Stories: ZIS & Wakaf Patch
### v1.0 — Zakat, Infaq & Shadaqah, Wakaf Sosial, Revisi Wakaf Produktif

Patch ini menambahkan dan merevisi user stories untuk:
- Zakat: flow External User membayar zakat + flow Hendra mendistribusikan ke asnaf
- Infaq & Shadaqah: flow External User berdonasi + flow Arief membuat program
- Wakaf: pemilihan Sosial vs Produktif oleh wakif, bagi hasil wakif (configurable)
- Sinta: monitoring aset wakaf sosial
- Transparansi: laporan publik ZIS & Wakaf

Stories yang tidak disebutkan di patch ini tidak berubah dari v3 + v3.1 + v3.2.

---

# BAGIAN A — INTERNAL TEAM

---

## Arief — Investment Officer

### US-IO-08 (Baru)
**Sebagai** Investment Officer, **saya ingin** membuat dan mengelola program infaq & shadaqah **agar** donasi masyarakat tersalurkan ke kebutuhan yang jelas dan hasilnya dapat dilaporkan secara transparan.

**Acceptance Criteria:**
- Arief dapat membuat proyek dengan kategori baru **"Program Sosial (Infaq & Shadaqah)"** di P-IO-02.
- Field tambahan khusus kategori ini: deskripsi program, penerima manfaat yang dituju, target dana (opsional), dan tanggal akhir penggalangan (opsional).
- Flag partisipasi "Terbuka untuk Infaq & Shadaqah" tersedia di Section 3 Konfigurasi Partisipasi, menggantikan flag Investasi/Wakaf Uang untuk kategori ini.
- Program yang aktif dan terbuka muncul di catalog publik tab "Infaq & Shadaqah" di P-EX-01.
- Arief dapat menutup penggalangan dana setelah target terpenuhi atau periode selesai; program yang ditutup tidak menerima donasi baru tetapi tetap terlihat di riwayat publik.
- Arief dapat menginput laporan realisasi penggunaan dana yang dipublikasikan di halaman program.

---

### US-IO-01 (Revisi — tambah kategori Wakaf Sosial)
Menambahkan kategori baru ke dropdown proyek di P-IO-02:

**Acceptance Criteria tambahan:**
- Dropdown kategori proyek menyertakan opsi **"Wakaf Sosial"**.
- Kategori Wakaf Sosial memiliki field dinamis tersendiri (lihat Page Spec patch — P-IO-02 revisi).
- Proyek Wakaf Sosial otomatis tertaut ke rekening Dana Wakaf Sosial; tidak bisa dialihkan ke rekening lain.
- Flag partisipasi "Terbuka untuk Wakaf Uang Sosial" tersedia dan memunculkan program di catalog publik tab "Wakaf Uang" dengan badge "Sosial".
- Sub-proyek dari proyek Wakaf Sosial mewarisi status wakaf sosial dan tidak dapat diubah ke tipe lain.

---

## Sinta — Portfolio Monitor

### US-PM-07 (Baru)
**Sebagai** Portfolio Monitor, **saya ingin** memantau kondisi dan manfaat setiap aset wakaf sosial yang dikelola ACO **agar** laporan berkala kepada wakif dapat dikirim secara akurat dan halaman transparansi publik selalu terbarui.

**Acceptance Criteria:**
- Dashboard monitoring Sinta memiliki section atau tab terpisah **"Aset Wakaf Sosial"**, menampilkan daftar semua aset wakaf sosial yang dikelola (bergerak, tidak bergerak, maupun yang berasal dari wakaf uang sosial yang sudah terealisasi).
- Setiap aset menampilkan: jenis aset, nama/lokasi, tanggal diterima, tanggal laporan terakhir, dan status kondisi terkini.
- Sinta dapat menginput update kondisi aset: deskripsi kondisi, jumlah penerima manfaat aktif, catatan pemeliharaan, dan foto (opsional).
- Sistem mengirim pengingat otomatis kepada Sinta H-7 sebelum jadwal laporan berkala ke wakif (sesuai konfigurasi Admin di BL-11.4).
- Dari halaman detail aset, Sinta dapat men-generate laporan PDF per aset dan mengirimkannya ke wakif (trigger notifikasi N-19).
- Ringkasan laporan (tanpa data pribadi wakif) dipublikasikan otomatis ke halaman transparansi P-PUB-02 setelah laporan dikirim.

---

## Hendra — Finance & Reconciliation

### US-FR-07 (Baru)
**Sebagai** Finance Officer, **saya ingin** mendistribusikan dana zakat kepada 8 asnaf **agar** zakat tersalurkan sesuai ketentuan syariah dan setiap rupiah tercatat secara akuntabel.

**Acceptance Criteria:**
- Halaman distribusi zakat (P-FR-06) menampilkan saldo Dana Zakat yang siap didistribusikan, setelah porsi amil dipotong otomatis sesuai konfigurasi Admin.
- Hendra mengalokasikan nominal ke asnaf yang dipilih; tidak wajib semua 8 asnaf setiap sesi — distribusi bertahap diperbolehkan.
- Setiap baris alokasi asnaf dapat disertai: nama/lembaga penerima, keterangan program, dan dokumen bukti penyaluran (upload opsional).
- Sistem menolak distribusi jika total alokasi sesi ini melebihi saldo Dana Zakat yang tersedia.
- Hendra mengkonfirmasi sebelum distribusi diproses; konfirmasi memerlukan checklist: "Saya telah memverifikasi keabsahan alokasi ini."
- Setelah dikonfirmasi, distribusi tidak dapat dibatalkan dan masuk ke audit trail immutable.
- Setiap sesi distribusi yang selesai otomatis memperbarui laporan transparansi publik di P-PUB-02.

---

### US-FR-08 (Baru)
**Sebagai** Finance Officer, **saya ingin** mengelola pencairan dan pelaporan dana infaq & shadaqah per program **agar** dana tersalurkan sesuai peruntukan dan dapat diverifikasi publik.

**Acceptance Criteria:**
- Dashboard keuangan (P-FR-01) menampilkan saldo Dana Infaq & Shadaqah dengan rincian: saldo per program yang aktif dan saldo general fund.
- Hendra dapat mengeksekusi pencairan dana untuk program tertentu setelah menerima request dari Arief melalui sistem.
- Setiap pencairan wajib dikaitkan ke program yang sesuai dan disertai dokumen justifikasi penggunaan; sistem menolak pencairan tanpa dokumen justifikasi.
- Hendra dapat mempublikasikan laporan penggunaan dana per program; laporan yang dipublikasikan muncul otomatis di halaman publik program dan di P-PUB-02.
- Jika program berakhir dengan kelebihan dana, Hendra memproses sesuai BL-10.2 dengan justifikasi tertulis dan persetujuan dua pihak.

---

### US-FR-05 (Revisi — tambah laporan Wakaf Sosial & bagi hasil wakif)
**Acceptance Criteria tambahan:**
- Dropdown jenis laporan di P-FR-05 menambahkan opsi: **"Dana Wakaf Sosial"** dan **"Bagi Hasil Wakif"**.
- Laporan Dana Wakaf Sosial mencakup: pemasukan (wakaf uang sosial), pengeluaran (pembelian/pembangunan aset), saldo aset terealisasi.
- Laporan Bagi Hasil Wakif (hanya muncul jika fitur aktif di Admin) mencakup: proyek wakaf produktif, wakif yang memiliki klaim bagi hasil, nominal bagi hasil per periode, dan status distribusi.
- Laporan bagi hasil wakif juga menjadi dasar Hendra memproses distribusi ke wakif yang bersangkutan.

---

## Reza — Admin & Platform Operator

### US-AO-06 (Baru — Konfigurasi Platform ZIS & Wakaf)
**Sebagai** Admin, **saya ingin** mengonfigurasi parameter ZIS & Wakaf di level platform **agar** aturan syariah dan kebijakan ACO dapat diterapkan secara konsisten di seluruh sistem.

**Acceptance Criteria:**
- Terdapat halaman konfigurasi platform P-AO-07 yang mencakup pengaturan ZIS & Wakaf.
- Admin dapat mengaktifkan/menonaktifkan jenis zakat yang tersedia dan menginput nilai nisab per jenis.
- Admin dapat mengatur porsi amil zakat (default 12.5%; sistem menolak input > 12.5%).
- Admin dapat mengaktifkan/menonaktifkan fitur bagi hasil wakif secara global; jika diaktifkan, Admin mengatur batas maksimal persentase.
- Admin dapat mengaktifkan/menonaktifkan jalur general fund infaq & shadaqah.
- Admin dapat mengatur frekuensi laporan distribusi zakat dan laporan kondisi aset wakaf sosial.
- Setiap perubahan konfigurasi tercatat di audit log dengan timestamp dan user yang mengubah.

---

---

# BAGIAN B — EXTERNAL USER

---

## US-EX-02 (Revisi — tambah Zakat dan Infaq & Shadaqah)
**Sebagai** External User, **saya ingin** memilih jenis partisipasi yang ingin saya lakukan **agar** proses selanjutnya sesuai dengan niat dan jenis kontribusi yang saya inginkan.

**Acceptance Criteria (revisi dari v3):**
- Setelah KYC terverifikasi, pengguna dapat memulai partisipasi baru dari dashboard.
- Terdapat **6 pilihan jenis partisipasi** (dari sebelumnya 4):
  1. Wakaf Aset Tidak Bergerak
  2. Wakaf Aset Bergerak
  3. Wakaf Uang
  4. Investasi Uang
  5. **Bayar Zakat** *(baru)*
  6. **Infaq & Shadaqah** *(baru)*
- Setiap pilihan menampilkan deskripsi singkat perbedaannya sebelum user melanjutkan.
- Satu akun dapat memiliki beberapa partisipasi aktif dari jenis yang berbeda secara bersamaan.
- Setiap jenis partisipasi ditampilkan sebagai entri terpisah di dashboard.

---

## US-EX-03 / US-EX-04 (Revisi — tambah pilihan Sosial vs Produktif)
Berlaku untuk: US-EX-03 (Wakaf Aset Tidak Bergerak) dan US-EX-04 (Wakaf Aset Bergerak).

**Acceptance Criteria tambahan:**
- Di awal form wakaf aset (sebelum detail aset), terdapat step **"Pilih Jenis Pengelolaan Wakaf"** dengan dua pilihan:
  - **Wakaf Sosial**: aset akan digunakan langsung sebagai fasilitas atau layanan sosial. Tidak ada bagi hasil untuk wakif.
  - **Wakaf Produktif**: aset akan dikelola secara produktif untuk menghasilkan pendapatan yang disalurkan ke mustahiq. Wakif dapat memilih untuk menerima porsi bagi hasil (jika fitur aktif).
- Setiap pilihan dilengkapi penjelasan singkat perbedaan manfaat dan risikonya.
- Jika memilih **Wakaf Produktif** dan fitur bagi hasil wakif diaktifkan Admin: muncul pertanyaan opsional "Apakah Anda ingin menerima porsi bagi hasil dari hasil pengelolaan aset ini?" dengan opsi Ya/Tidak.
  - Jika Ya: wakif mengisi nomor rekening untuk pembayaran bagi hasil.
  - Persentase bagi hasil aktual dikonfigurasi Arief per proyek; wakif hanya menyatakan preferensi.
- Pilihan yang telah dikonfirmasi tidak dapat diubah setelah pengajuan diterima.

---

## US-EX-05 (Revisi — Wakaf Uang: tambah pilihan Sosial vs Produktif)
Menggantikan US-EX-05 dari v3 (dengan revisi v3.1 dan v3.2 tetap berlaku untuk catalog logic).

**Acceptance Criteria (revisi):**
- Catalog wakaf uang (tab "Wakaf Uang" di P-EX-01) menampilkan program dari dua jenis:
  - Program **Wakaf Sosial** (diberi badge "Sosial"): dana digunakan untuk membangun/membeli fasilitas sosial. Dana masuk ke rekening Wakaf Sosial.
  - Program **Wakaf Produktif** (diberi badge "Produktif"): dana dikelola produktif. Dana masuk ke rekening Wakaf Produktif.
- Pengguna dapat memfilter catalog berdasarkan jenis (Sosial / Produktif / Semua).
- Setiap program menampilkan dengan jelas jenis pengelolaannya, progress dana, dan (untuk Produktif) informasi skema distribusi ke mustahiq.
- Jika program wakaf produktif yang dipilih memiliki opsi bagi hasil wakif (dikonfigurasi Arief dan Admin mengaktifkan fitur): muncul pilihan opsional apakah wakif ingin klaim bagi hasil.
- Ikrar wakaf uang menyebutkan jenis pengelolaan (Sosial atau Produktif) secara eksplisit dalam teks ikrar.
- Dana wakaf uang Sosial masuk ke rekening Dana Wakaf Sosial; dana wakaf uang Produktif masuk ke rekening Dana Wakaf Produktif.

---

## US-EX-12 (Baru) — Bayar Zakat
**Sebagai** External User, **saya ingin** membayar zakat melalui platform ACO **agar** zakat saya tersalurkan melalui amil terpercaya dengan bukti yang jelas dan saya dapat memantau laporan distribusinya.

**Acceptance Criteria:**
- Pengguna memilih jenis zakat dari daftar yang dikonfigurasi Admin (hanya jenis yang aktif yang ditampilkan).
- Tersedia kalkulator zakat opsional per jenis: pengguna memasukkan data harta/penghasilan dan kalkulator menampilkan estimasi zakat yang wajib dibayarkan berdasarkan nilai nisab terkini.
- Pengguna memasukkan nominal final yang ingin dibayarkan; nominal tidak terikat hasil kalkulator.
- Halaman konfirmasi menampilkan ringkasan: jenis zakat, nominal, dan pernyataan bahwa dana masuk ke rekening Zakat yang terisolasi dan dikelola oleh ACO sebagai amil.
- Pengguna mengkonfirmasi; dana masuk ke rekening Dana Zakat.
- Notifikasi N-16 terkirim; pengguna menerima bukti pembayaran zakat yang dapat diunduh sebagai PDF.
- Riwayat seluruh pembayaran zakat tersedia di tab "Zakat" pada Dashboard pengguna (P-EX-06).
- Dari dashboard, pengguna dapat mengakses laporan distribusi zakat ACO (halaman publik P-PUB-02) untuk memantau bagaimana zakatnya dikelola.

---

## US-EX-13 (Baru) — Infaq & Shadaqah
**Sebagai** External User, **saya ingin** berinfaq atau bershadaqah melalui platform **agar** donasi saya tersalurkan ke program yang jelas, hasilnya terlaporkan, dan saya dapat memantau dampaknya.

**Acceptance Criteria:**
- Pengguna dapat memilih program infaq dari catalog publik (P-EX-01 tab "Infaq & Shadaqah") atau berdonasi ke general fund ACO.
- Setiap program menampilkan: nama program, deskripsi, penerima manfaat yang dituju, target dana (jika ada), progress dana terkumpul, dan laporan penggunaan terakhir (jika sudah ada).
- Pengguna memasukkan nominal, mengkonfirmasi, dan menerima bukti donasi (PDF dapat diunduh).
- Notifikasi N-17 terkirim; donasi masuk ke rekening Dana Infaq & Shadaqah.
- Riwayat seluruh donasi infaq & shadaqah tersedia di tab "Infaq & Shadaqah" pada Dashboard pengguna (P-EX-06).
- Pengguna menerima notifikasi N-18 setiap kali ada update atau laporan dari program yang mereka dukung.
- Dari halaman detail program di P-EX-01, pengguna dapat melihat laporan realisasi penggunaan dana yang dipublikasikan oleh Hendra/Arief.

---

## US-EX-07 (Revisi) — Dashboard External User
**Acceptance Criteria tambahan (selain yang sudah ada di v3):**

- Summary cards di header dashboard ditambah dua kartu baru:
  - **Kartu Total Zakat Dibayarkan**: akumulasi seluruh pembayaran zakat yang dikonfirmasi
  - **Kartu Total Infaq & Shadaqah**: akumulasi seluruh donasi infaq & shadaqah

- Tab partisipasi dikembangkan dengan dua tab baru:
  - **Tab "Zakat"**: daftar riwayat pembayaran zakat; setiap entri menampilkan jenis zakat, nominal, tanggal, dan nomor referensi; tombol download bukti per entri
  - **Tab "Infaq & Shadaqah"**: daftar donasi; setiap entri menampilkan nama program (atau "General Fund"), nominal, tanggal, status program, dan update terakhir program; klik entri → detail program atau P-EX-07

- Notifikasi yang masuk dari program infaq yang didukung ditampilkan di notifikasi terpusat dashboard.

---

## Dependensi Baru

| Dari | Ke | Keterangan |
|---|---|---|
| US-AO-06 (konfigurasi platform) | US-EX-12 (bayar zakat) | Jenis zakat aktif & nisab dikonfigurasi Admin dahulu |
| US-AO-06 (aktifkan bagi hasil wakif) | US-EX-03/04/05 revisi | Field bagi hasil hanya muncul jika Admin aktifkan |
| US-IO-08 (buat program infaq) | US-EX-13 (donasi infaq) | Program harus ada sebelum bisa didonasikan |
| US-IO-01 revisi (kategori Wakaf Sosial) | US-EX-05 revisi | Program wakaf sosial perlu dibuat Arief sebelum muncul di catalog |
| US-FR-07 (distribusi zakat) | P-PUB-02 (transparansi) | Distribusi yang selesai memperbarui laporan publik otomatis |
| US-PM-07 (laporan aset wakaf sosial) | N-19 (notif ke wakif) | Sinta trigger laporan → notif terkirim ke wakif |

---

## Ringkasan Jumlah Stories (Updated)

| Peran | Jumlah Stories (v3) | Tambahan Patch ini | Total |
|---|---|---|---|
| Arief — Investment Officer | 6 | 1 baru + 1 revisi | 7+ |
| Sinta — Portfolio Monitor | 6 | 1 baru | 7 |
| Hendra — Finance & Reconciliation | 6 | 2 baru + 1 revisi | 8+ |
| Reza — Admin & Platform Operator | 5 | 1 baru | 6 |
| External User | 7 | 2 baru + 4 revisi | 9+ |
| **Total** | **30** | **+6 baru, +6 revisi** | **36+** |

---

*ACO User Stories: ZIS & Wakaf Patch v1.0*
*Apply on top of: ACO_User_Stories_v3.md + v3.1_patch + v3.2_patch*
*Stories yang tidak disebut di sini tidak berubah.*