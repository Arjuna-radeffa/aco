# ACO — User Stories Internal Team (v3)
### Revisi: Multi-level project + Single external user role

---

## Catatan Revisi v3

**Revisi 1 — Struktur Proyek Multi-Level**
Setiap proyek dapat memiliki sub-proyek tanpa batas kedalaman (secara teknis unlimited, praktis ~3 level). RAB dan timeline di level parent adalah akumulasi dari sub-proyeknya ditambah item reguler langsung di level tersebut. Implikasi ke: Arief (entry), Sinta (monitoring per level), Hendra (kalkulasi agregat).

**Revisi 2 — Single External User Role**
Tidak ada lagi pemisahan role Investor / Muzakki / Wakif di sisi user. Satu akun eksternal dapat melakukan satu atau beberapa jenis partisipasi:
- Wakaf aset tidak bergerak
- Wakaf aset bergerak
- Wakaf uang
- Investasi uang

Pemisahan tetap terjadi di level **transaksi dan dana** (bukan di level akun), sehingga isolasi rekening oleh Hendra tetap berlaku.

---

---

# BAGIAN A — INTERNAL TEAM

---

## Arief — Investment Officer
**MVP Scope: Entry Data Only**

---

### US-IO-01
**Sebagai** Investment Officer, **saya ingin** membuat proyek baru dengan field yang menyesuaikan kategori **agar** data setiap proyek tercatat secara lengkap dan relevan.

**Acceptance Criteria:**
- Terdapat halaman "Tambah Proyek" dengan dropdown kategori: Properti, Logistik, UMKM, Wakaf Produktif, Sosial, dll.
- Pemilihan kategori memunculkan set field dinamis yang relevan sesuai kategori.
- Field universal ada di semua kategori: nama proyek, deskripsi, tanggal mulai, nilai total proyek, skema partisipasi.
- Proyek baru yang dibuat tanpa parent adalah **root project** (level 1).
- Data dapat disimpan sebagai Draft sebelum difinalisasi.

---

### US-IO-02
**Sebagai** Investment Officer, **saya ingin** menambahkan sub-proyek ke dalam proyek yang sudah ada **agar** struktur kerja yang kompleks dapat dipecah menjadi komponen yang lebih kecil dan terukur.

**Acceptance Criteria:**
- Di halaman detail proyek manapun, terdapat tombol "Tambah Sub-Proyek".
- Sub-proyek mewarisi kategori parent-nya secara default, namun dapat diubah.
- Sub-proyek dapat memiliki sub-proyek lagi tanpa batas kedalaman level.
- Navigasi breadcrumb menampilkan posisi proyek dalam hirarki: misal `Proyek A > Sub-Proyek B > Sub-Proyek C`.
- Memindahkan proyek ke parent yang berbeda hanya bisa dilakukan jika belum ada transaksi dana yang terkait.

---

### US-IO-03
**Sebagai** Investment Officer, **saya ingin** melihat RAB dan timeline proyek yang otomatis teragregasi dari sub-proyeknya **agar** gambaran total proyek selalu akurat tanpa perlu input manual di level parent.

**Acceptance Criteria:**
- RAB di level parent = jumlah RAB semua sub-proyek langsung + item reguler yang diinput langsung di level tersebut.
- Agregasi bersifat rekursif ke atas: perubahan di sub-proyek terdalam langsung memperbarui semua parent di atasnya.
- Arief dapat menginput item RAB reguler di level mana pun, tidak harus di leaf node.
- Timeline parent menampilkan rentang dari tanggal mulai sub-proyek paling awal hingga tanggal selesai sub-proyek paling akhir.
- Terdapat tampilan tree view yang memperlihatkan breakdown RAB per level.

---

### US-IO-04
**Sebagai** Investment Officer, **saya ingin** melihat dan mengedit seluruh proyek dalam tampilan hierarki **agar** saya dapat memahami struktur keseluruhan portofolio proyek dengan mudah.

**Acceptance Criteria:**
- Halaman daftar proyek menampilkan struktur tree yang dapat di-expand/collapse per node.
- Filter tersedia untuk: status proyek (Draft/Aktif/Selesai/Dihentikan), kategori, dan kedalaman level.
- Pencarian proyek menemukan hasil di semua level dan menampilkan konteks hirarkinya.
- Setiap node menampilkan: nama, status, total RAB, dan jumlah sub-proyek langsung.

---

### US-IO-05
**Sebagai** Investment Officer, **saya ingin** mengisi data spesifik untuk proyek wakaf produktif **agar** aspek hukum dan keuangan wakaf tercatat dengan benar.

**Acceptance Criteria:**
- Kategori Wakaf Produktif menampilkan field tambahan: jenis aset (bergerak/tidak bergerak/uang), status lahan, data wakif, dan informasi nazir.
- Field persentase fee nazir divalidasi agar tidak melebihi 10%.
- Untuk proyek properti di atas lahan wakaf, terdapat field khusus untuk mencatat bahwa kepemilikan pembeli adalah SHM Bangunan, bukan SHM Lahan.
- Proyek wakaf secara otomatis tertaut ke rekening dana wakaf, terpisah dari rekening investasi.
- Sub-proyek dari proyek wakaf mewarisi status wakaf secara otomatis dan tidak dapat diubah ke tipe lain.

---

### US-IO-06
**Sebagai** Investment Officer, **saya ingin** mengupload dokumen pendukung di level proyek manapun **agar** dokumen tersimpan terpusat dan terkait dengan komponen proyek yang relevan.

**Acceptance Criteria:**
- Tab "Dokumen" tersedia di halaman detail setiap proyek, termasuk sub-proyek.
- Dokumen dapat dikategorikan: Legal, Keuangan, Operasional, Lainnya.
- Format yang didukung: PDF, JPG, PNG, maksimum 10MB per file.
- Dari halaman proyek parent, terdapat opsi untuk melihat semua dokumen dari seluruh sub-proyeknya sekaligus (consolidated view).
- Status dokumen (Menunggu Validasi / Tervalidasi / Ditolak) diubah oleh Admin.

---

## Sinta — Portfolio Monitor
**Revisi: monitoring harus bisa drill down per level hirarki proyek**

---

### US-PM-01
**Sebagai** Portfolio Monitor, **saya ingin** melihat status monitoring proyek dalam tampilan hierarki **agar** saya dapat mengidentifikasi di level mana permasalahan terjadi.

**Acceptance Criteria:**
- Dashboard monitoring menampilkan proyek dalam struktur tree yang dapat di-expand.
- Indikator kesehatan di level parent adalah agregasi dari kondisi sub-proyeknya: jika salah satu sub-proyek berstatus Kritis, parent minimal berstatus Perlu Perhatian.
- Sinta dapat memilih untuk melihat flat list semua proyek di semua level, atau hanya root projects.
- Navigasi breadcrumb tersedia saat Sinta membuka detail sub-proyek.

---

### US-PM-02
**Sebagai** Portfolio Monitor, **saya ingin** melihat konfigurasi sumber data tiap proyek **agar** saya tahu apakah update datang dari form ACO atau dari integrasi sistem eksternal.

**Acceptance Criteria:**
- Di halaman detail setiap proyek (termasuk sub-proyek), terdapat section "Konfigurasi Sumber Data": Form ACO atau Integrasi API.
- Proyek dengan integrasi API menampilkan status koneksi beserta timestamp terakhir data berhasil ditarik.
- Proyek dengan Form ACO menampilkan jadwal update wajib dan tanggal update terakhir.
- Sinta hanya dapat melihat konfigurasi, tidak mengubahnya.

---

### US-PM-03
**Sebagai** Portfolio Monitor, **saya ingin** menerima notifikasi ketika sebuah proyek belum menyetor update sesuai jadwal **agar** tidak ada proyek yang hilang dari radar.

**Acceptance Criteria:**
- Notifikasi terlambat berlaku di level proyek mana pun, termasuk sub-proyek terdalam.
- Notifikasi berisi: nama proyek, posisi dalam hirarki (breadcrumb), sumber data, dan jumlah hari keterlambatan.
- Untuk proyek berbasis form: sistem mengirim pengingat otomatis ke project team di H-2 dan hari-H.
- Halaman "Update Terlambat" menampilkan semua proyek yang terlambat dari semua level, dapat difilter per level.

---

### US-PM-04
**Sebagai** Portfolio Monitor, **saya ingin** me-review update yang masuk dan melihat dampaknya terhadap level parent **agar** saya dapat menilai kondisi secara holistik.

**Acceptance Criteria:**
- Antrian "Update Masuk" menampilkan update dari semua level proyek.
- Sinta dapat melihat delta perubahan dibandingkan update sebelumnya.
- Saat membuka update dari sub-proyek, terdapat indikator yang menunjukkan apakah perubahan ini mempengaruhi status parent.
- Sinta dapat mengubah status update: Ditinjau – Normal, atau Ditinjau – Perlu Tindak Lanjut (wajib isi catatan).

---

### US-PM-05
**Sebagai** Portfolio Monitor, **saya ingin** melihat grafik tren metrik per proyek di level mana pun **agar** saya dapat mendeteksi pola penurunan dari akar masalahnya.

**Acceptance Criteria:**
- Grafik tren tersedia di halaman detail setiap proyek dan sub-proyek.
- Di level parent, tersedia toggle untuk melihat grafik agregat atau grafik overlay tiap sub-proyek dalam satu tampilan.
- Grafik hanya menampilkan titik data dari update yang sudah disubmit; celah data akibat keterlambatan ditampilkan eksplisit.
- Grafik proyeksi vs realisasi tersedia jika data RAB sudah diinput.

---

### US-PM-06
**Sebagai** Portfolio Monitor, **saya ingin** mencatat temuan monitoring di level proyek yang relevan **agar** catatan terkait langsung dengan komponen yang bermasalah.

**Acceptance Criteria:**
- Tab "Catatan Monitoring" tersedia di semua level proyek.
- Catatan di sub-proyek dapat dilihat dari parent melalui consolidated view.
- Tipe catatan: Observasi Rutin / Peringatan / Tindak Lanjut / Eskalasi. Tipe Eskalasi otomatis notifikasi ke Investment Officer.
- Semua catatan bersifat append-only.

---

## Hendra — Finance & Reconciliation
**Revisi: kalkulasi dana dan bagi hasil harus mengikuti hirarki proyek**

---

### US-FR-01
**Sebagai** Finance Officer, **saya ingin** mencatat aliran dana dengan tag kategori dan keterkaitan ke level proyek yang spesifik **agar** setiap pengeluaran tercatat di komponen yang tepat.

**Acceptance Criteria:**
- Setiap transaksi pengeluaran harus dikaitkan ke node proyek spesifik (bisa root, bisa sub-proyek).
- Sistem secara otomatis mengagregasi total pengeluaran dari sub-proyek ke atas.
- Saldo tersedia per node proyek, bukan hanya di root level.
- Tag jenis dana (Investasi / Zakat / Infaq / Shadaqah / Wakaf) tetap wajib di setiap transaksi.

---

### US-FR-02
**Sebagai** Finance Officer, **saya ingin** melihat realisasi anggaran vs RAB per level proyek **agar** saya dapat memastikan tidak ada komponen yang melebihi alokasi yang ditetapkan.

**Acceptance Criteria:**
- Halaman "Anggaran Proyek" menampilkan perbandingan RAB vs realisasi per node dalam struktur tree.
- Setiap node menampilkan: RAB node itu sendiri, RAB sub-proyeknya, total RAB, realisasi, dan selisih.
- Node yang realisasinya melebihi RAB ditandai secara visual.
- Hendra dapat melihat drill-down dari root ke leaf untuk menemukan sumber overrun.

---

### US-FR-03
**Sebagai** Finance Officer, **saya ingin** mencatat dan mengisolasi semua aliran dana per kategori **agar** investasi, zakat, infaq, shadaqah, dan wakaf tidak pernah tercampur.

**Acceptance Criteria:**
- Dashboard Finance menampilkan saldo real-time per kategori dana secara terpisah.
- Sistem menolak transaksi tanpa tag atau dengan tag yang tidak sesuai rekening tujuan.
- Setiap pemindahan dana antar rekening memerlukan justifikasi tertulis dan konfirmasi dua pihak.
- Sistem mendeteksi dan menahan otomatis transaksi lintas kategori; Hendra mendapat notifikasi untuk review.

---

### US-FR-04
**Sebagai** Finance Officer, **saya ingin** sistem menghitung bagi hasil berdasarkan parameter proyek root **agar** distribusi kepada partisipan akurat.

**Acceptance Criteria:**
- Parameter bagi hasil diinput di level root project; sub-proyek tidak memiliki parameter bagi hasil sendiri kecuali dikonfigurasi berbeda.
- Kalkulasi menggunakan realisasi pendapatan agregat dari seluruh sub-proyek sebagai basis.
- Hendra mereview dan mengkonfirmasi sebelum distribusi diproses.
- Jika ada dispute, kalkulasi dapat dibuka untuk koreksi manual dengan log perubahan.

---

### US-FR-05
**Sebagai** Finance Officer, **saya ingin** sistem menghitung fee nazir wakaf secara otomatis **agar** pengelolaan keuangan wakaf produktif sesuai ketentuan.

**Acceptance Criteria:**
- Fee nazir dihitung dari persentase × profit bersih periode, bukan dari pendapatan kotor.
- Sistem memvalidasi bahwa fee nazir tidak melebihi 10%.
- Fee nazir dicatat sebagai transaksi tersendiri dalam rekening wakaf.
- Laporan fee nazir dapat digenerate per proyek per periode.

---

### US-FR-06
**Sebagai** Finance Officer, **saya ingin** melakukan rekonsiliasi dan membuat laporan keuangan per kategori dana **agar** pemisahan dana dapat diverifikasi oleh auditor.

**Acceptance Criteria:**
- Halaman rekonsiliasi menampilkan perbandingan proyeksi vs realisasi; selisih ditandai otomatis.
- Hendra menandai setiap baris: Cocok / Selisih Wajar (dengan keterangan) / Perlu Investigasi.
- Laporan dapat digenerate per kategori dana secara independen maupun dalam format konsolidasi.
- Laporan mencakup: saldo awal, total pemasukan, total pengeluaran, saldo akhir.
- Data yang belum direkonsiliasi diberi tanda khusus dalam laporan.
- Format unduhan: PDF dan Excel.

---

## Reza — Admin & Platform Operator

---

### US-AO-01
**Sebagai** Admin, **saya ingin** meninjau dan memverifikasi dokumen identitas pengguna (KYC) **agar** hanya pengguna terverifikasi yang dapat berpartisipasi di platform.

**Acceptance Criteria:**
- Halaman KYC menampilkan antrian submission baru berurut waktu pengajuan.
- Admin dapat melihat dokumen yang diunggah langsung di halaman review.
- Terdapat checklist verifikasi standar yang harus dilengkapi sebelum mengambil keputusan.
- Penolakan mewajibkan pemilihan alasan dan catatan tambahan.
- Pengguna mendapat notifikasi otomatis dan dapat mengajukan ulang jika ditolak.

---

### US-AO-02
**Sebagai** Admin, **saya ingin** mengelola akun dan akses pengguna **agar** setiap orang hanya dapat mengakses fungsi sesuai tanggung jawabnya.

**Acceptance Criteria:**
- Halaman manajemen pengguna menampilkan semua akun aktif beserta peran mereka.
- Peran internal: Investment Officer, Portfolio Monitor, Finance Officer, Admin.
- Peran eksternal: hanya satu — External User (detail partisipasi ditentukan per transaksi, bukan per akun).
- Perubahan peran tercatat dalam audit log.
- Admin dapat membekukan akun sementara atau menonaktifkan permanen dengan konfirmasi dua langkah.

---

### US-AO-03
**Sebagai** Admin, **saya ingin** mengkonfigurasi jadwal update wajib per proyek di semua level **agar** sistem dapat mendeteksi proyek yang terlambat menyetor laporan.

**Acceptance Criteria:**
- Konfigurasi tersedia di halaman detail setiap proyek, termasuk sub-proyek.
- Admin mengatur: frekuensi update wajib, metode sumber data (Form ACO / Integrasi API), dan akun project team yang berwenang mengisi form.
- Sub-proyek dapat mewarisi konfigurasi dari parent atau dikonfigurasi berbeda.
- Konfigurasi ini adalah enabler untuk sistem notifikasi keterlambatan ke Sinta.

---

### US-AO-04
**Sebagai** Admin, **saya ingin** memvalidasi dokumen legal per proyek di semua level **agar** berkas kepatuhan tersusun rapi.

**Acceptance Criteria:**
- Admin menerima notifikasi setiap ada dokumen baru yang diupload di level proyek mana pun.
- Admin dapat mengubah status dokumen: Tervalidasi atau Ditolak (dengan catatan).
- Dokumen Tervalidasi tidak dapat dihapus; hanya dapat digantikan versi baru.
- Admin dapat menetapkan tanggal kedaluwarsa; sistem mengirim pengingat H-14.

---

### US-AO-05
**Sebagai** Admin, **saya ingin** melihat audit log seluruh aksi pengguna dan sistem **agar** platform memiliki jejak pertanggungjawaban yang lengkap.

**Acceptance Criteria:**
- Audit log mencatat semua aksi signifikan: login, perubahan data, approval, penolakan, perubahan peran, upload dokumen.
- Setiap entri menyertakan: timestamp, user ID, jenis aksi, entitas yang terpengaruh, dan nilai sebelum/sesudah.
- Log dapat difilter berdasarkan user, jenis aksi, dan rentang waktu.
- Audit log bersifat immutable.
- Admin dapat mengekspor log dalam format CSV.

---

---

# BAGIAN B — EXTERNAL USER

---

## External User (Single Role)

Satu akun external user dapat melakukan satu atau lebih jenis partisipasi:
- **Wakaf aset tidak bergerak** — mewakafkan aset properti (tanah, bangunan)
- **Wakaf aset bergerak** — mewakafkan aset bergerak (kendaraan, alat produksi)
- **Wakaf uang** — menyetor dana wakaf tunai
- **Investasi uang** — menyertakan dana investasi ke proyek yang tersedia

Pemisahan tetap terjadi di level transaksi dan rekening, bukan di level akun.

---

### US-EX-01
**Sebagai** External User, **saya ingin** mendaftar dan menyelesaikan verifikasi identitas **agar** akun saya aktif dan saya dapat berpartisipasi di platform.

**Acceptance Criteria:**
- Form registrasi mengumpulkan data dasar: nama lengkap, email, nomor HP, dan password.
- Setelah registrasi, pengguna diarahkan ke halaman upload dokumen KYC (KTP wajib; NPWP opsional).
- Status KYC ditampilkan di dashboard pengguna: Menunggu Verifikasi / Terverifikasi / Ditolak.
- Jika ditolak, pengguna melihat alasan dan dapat mengajukan ulang.
- Sebelum KYC terverifikasi, pengguna dapat menjelajahi platform namun tidak dapat melakukan transaksi.

---

### US-EX-02
**Sebagai** External User, **saya ingin** memilih jenis partisipasi yang ingin saya lakukan **agar** proses selanjutnya sesuai dengan niat dan jenis aset yang ingin saya kontribusikan.

**Acceptance Criteria:**
- Setelah KYC terverifikasi, pengguna dapat memulai partisipasi baru dari dashboard.
- Terdapat 4 pilihan jenis partisipasi: Wakaf Aset Tidak Bergerak / Wakaf Aset Bergerak / Wakaf Uang / Investasi Uang.
- Memilih salah satu membuka alur (flow) yang berbeda sesuai jenisnya.
- Satu akun dapat memiliki beberapa partisipasi aktif dengan jenis yang berbeda secara bersamaan.
- Setiap jenis partisipasi ditampilkan sebagai entri terpisah di dashboard pengguna.

---

### US-EX-03
**Sebagai** External User, **saya ingin** mendaftarkan aset tidak bergerak yang akan saya wakafkan **agar** aset tersebut dapat dikelola secara produktif oleh ACO sebagai nazir.

**Acceptance Criteria:**
- Form wakaf aset tidak bergerak mengumpulkan: jenis aset (tanah/bangunan/keduanya), lokasi, luas, status sertifikat (SHM/HGB/dll), estimasi nilai, dan keterangan tambahan.
- Pengguna dapat mengupload dokumen pendukung: scan sertifikat, foto aset, dan dokumen kepemilikan.
- Setelah disubmit, status tercatat sebagai "Menunggu Tindak Lanjut ACO" dan tim ACO akan menghubungi pengguna.
- Pengguna dapat melihat status proses wakaf asetnya di dashboard.
- Terdapat penjelasan singkat tentang skema pengelolaan produktif dan hak-hak wakif sebelum submit.

---

### US-EX-04
**Sebagai** External User, **saya ingin** mendaftarkan aset bergerak yang akan saya wakafkan **agar** aset tersebut dapat dikelola secara produktif oleh ACO.

**Acceptance Criteria:**
- Form wakaf aset bergerak mengumpulkan: jenis aset (kendaraan/alat produksi/lainnya), merek/tipe, tahun, estimasi nilai, kondisi, dan keterangan.
- Pengguna dapat mengupload dokumen: BPKB/STNK (untuk kendaraan), foto aset, dan dokumen kepemilikan.
- Setelah disubmit, status tercatat sebagai "Menunggu Tindak Lanjut ACO".
- Pengguna dapat memantau status proses di dashboard.

---

### US-EX-05
**Sebagai** External User, **saya ingin** menyetor wakaf uang ke program yang tersedia **agar** dana saya dapat segera dikelola secara produktif.

**Acceptance Criteria:**
- Pengguna dapat melihat daftar program wakaf uang yang aktif beserta deskripsi dan target dana masing-masing.
- Pengguna memilih program, memasukkan nominal, dan mengkonfirmasi setoran.
- Setelah pembayaran dikonfirmasi, dana masuk ke rekening wakaf (terisolasi dari rekening investasi).
- Pengguna mendapat bukti setor dan dapat memantau perkembangan program dari dashboard.
- Pengguna dapat melihat laporan penggunaan dana wakaf mereka secara berkala.

---

### US-EX-06
**Sebagai** External User, **saya ingin** menyertakan dana investasi ke proyek yang tersedia **agar** dana saya bekerja dan menghasilkan bagi hasil.

**Acceptance Criteria:**
- Pengguna dapat melihat daftar proyek investasi yang membuka pendanaan, dengan informasi: nama proyek, deskripsi, target dana, skema bagi hasil, dan tenor.
- Proyek ditampilkan di level root; detail sub-proyek dapat dibuka untuk transparansi penggunaan dana.
- Pengguna memilih proyek, memasukkan nominal, dan mengkonfirmasi komitmen investasi.
- Dana yang sudah dikonfirmasi namun belum disalurkan masih dapat ditarik; setelah disalurkan tidak bisa.
- Pengguna menerima notifikasi saat bagi hasil didistribusikan, dengan rincian perhitungan.
- Dashboard menampilkan total investasi aktif, bagi hasil yang sudah diterima, dan status tiap proyek.

---

### US-EX-07
**Sebagai** External User, **saya ingin** melihat satu dashboard yang menampilkan semua partisipasi saya — baik wakaf maupun investasi — **agar** saya dapat memantau seluruh kontribusi saya dalam satu tempat.

**Acceptance Criteria:**
- Dashboard menampilkan semua partisipasi aktif dalam tab atau section yang dibedakan per jenis: Wakaf Aset / Wakaf Uang / Investasi.
- Setiap entri menampilkan status terkini dan ringkasan aktivitas terakhir.
- Pengguna dapat mengklik setiap entri untuk melihat detail dan riwayat lengkapnya.
- Notifikasi masuk (bagi hasil, update program, pengingat dokumen) ditampilkan secara terpusat.
- Pengguna dapat mengunduh laporan kontribusi mereka dalam format PDF.

---

---

# Dependensi Antar Story

| Dari | Ke | Keterangan |
|---|---|---|
| US-IO-01 (buat root project) | US-IO-02 (tambah sub-proyek) | Root harus ada sebelum sub-proyek dibuat |
| US-IO-03 (RAB agregat) | US-FR-02 (realisasi vs RAB per level) | Struktur RAB dari Arief = acuan rekonsiliasi Hendra |
| US-AO-03 (konfigurasi jadwal update) | US-PM-03 (notif keterlambatan) | Enabler; harus dikerjakan lebih dulu |
| US-IO-01 (parameter bagi hasil di root) | US-FR-04 (kalkulasi bagi hasil) | Parameter proyek = input kalkulasi |
| US-AO-01 (KYC terverifikasi) | US-EX-02 s/d US-EX-06 (semua transaksi) | Transaksi tidak bisa dilakukan sebelum KYC approved |
| US-AO-02 (buat akun project team) | US-PM-03 (pengingat ke project team) | Project team perlu akun untuk menerima notifikasi |

---

## Ringkasan Jumlah Stories

| Peran | Jumlah Stories |
|---|---|
| Arief — Investment Officer | 6 |
| Sinta — Portfolio Monitor | 6 |
| Hendra — Finance & Reconciliation | 6 |
| Reza — Admin & Platform Operator | 5 |
| External User | 7 |
| **Total** | **30** |

---

*ACO User Stories v3 — Revisi: multi-level project + single external user role*
*Setiap penambahan fitur atau perubahan alur harus direfleksikan ke dokumen ini sebelum masuk ke tahap implementasi.*