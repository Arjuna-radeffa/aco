# ACO — User Stories Internal Team (v2)

---

## Arief — Investment Officer
**MVP Scope: Entry Data Only**
Proses penilaian kelayakan, due diligence, dan approval ditunda ke fase berikutnya.

---

### US-IO-01
**Sebagai** Investment Officer, **saya ingin** membuat profil proyek baru dengan field yang menyesuaikan kategori proyek **agar** data setiap proyek tercatat secara lengkap dan relevan.

**Acceptance Criteria:**
- Terdapat halaman "Tambah Proyek" dengan dropdown kategori: Properti, Logistik, UMKM, Wakaf Produktif, Sosial, dll.
- Pemilihan kategori memunculkan set field dinamis yang relevan — Properti: lokasi, luas lahan, status SHM; Logistik: jumlah armada, rute operasional; dst.
- Field universal ada di semua kategori: nama proyek, deskripsi singkat, tanggal mulai, nilai total proyek, skema bagi hasil.
- Field wajib dan opsional dibedakan secara visual.
- Data dapat disimpan sebagai Draft sebelum difinalisasi.

> **Catatan:** Fase selanjutnya — field due diligence dan penilaian kelayakan akan ditambahkan di sini.

---

### US-IO-02
**Sebagai** Investment Officer, **saya ingin** mengisi data proyek wakaf produktif dengan field khusus **agar** aspek hukum dan keuangan wakaf tercatat dengan benar.

**Acceptance Criteria:**
- Kategori Wakaf Produktif menampilkan field tambahan: jenis aset (bergerak/tidak bergerak), status lahan, data wakif, dan informasi nazir.
- Field persentase fee nazir divalidasi agar tidak melebihi 10%.
- Untuk proyek properti di atas lahan wakaf, terdapat field khusus untuk mencatat bahwa status kepemilikan pembeli adalah SHM Bangunan, bukan SHM Lahan.
- Proyek wakaf secara otomatis tertaut ke rekening dana wakaf, terpisah dari rekening investasi.

---

### US-IO-03
**Sebagai** Investment Officer, **saya ingin** melihat dan mengedit daftar semua proyek yang sudah diinput **agar** data proyek dapat diperbarui ketika ada perubahan informasi.

**Acceptance Criteria:**
- Halaman daftar proyek menampilkan semua proyek dengan status: Draft, Aktif, Selesai, Dihentikan.
- Setiap proyek dapat dibuka untuk diedit; semua perubahan pada proyek berstatus Aktif tercatat dalam changelog.
- Field parameter keuangan yang sudah dikunci oleh Finance hanya bisa diubah melalui proses revisi yang memerlukan konfirmasi Finance Officer.
- Proyek hanya dapat dihapus jika masih berstatus Draft dan belum ada transaksi terkait.

---

### US-IO-04
**Sebagai** Investment Officer, **saya ingin** mengupload dokumen pendukung proyek ke sistem **agar** seluruh berkas tersimpan terpusat dan mudah diakses.

**Acceptance Criteria:**
- Di halaman detail proyek, terdapat tab "Dokumen" untuk upload berkas.
- Dokumen dapat dikategorikan: Legal, Keuangan, Operasional, Lainnya.
- Format yang didukung: PDF, JPG, PNG, maksimum 10MB per file.
- Setiap dokumen memiliki status: Menunggu Validasi, Tervalidasi, Ditolak — diubah oleh Admin (Reza).
- Dokumen yang sudah Tervalidasi tidak dapat dihapus, hanya dapat digantikan versi baru.

---

## Sinta — Portfolio Monitor
**Direvisi:** Sumber data monitoring ada dua jalur (form ACO / integrasi API), dan Sinta perlu mengetahui proyek yang belum menyetor update.

---

### Sumber Data & Koneksi Proyek

#### US-PM-01
**Sebagai** Portfolio Monitor, **saya ingin** melihat konfigurasi sumber data tiap proyek **agar** saya tahu apakah update datang dari form ACO atau dari integrasi sistem eksternal.

**Acceptance Criteria:**
- Di halaman detail proyek, terdapat section "Konfigurasi Sumber Data" yang menampilkan metode aktif: Form ACO atau Integrasi API.
- Proyek dengan integrasi API menampilkan status koneksi: Terhubung, Terputus, atau Error — beserta timestamp terakhir data berhasil ditarik.
- Proyek dengan Form ACO menampilkan jadwal update yang diwajibkan dan tanggal update terakhir.
- Sinta tidak mengkonfigurasi integrasi secara teknis (itu tugas Admin), namun dapat melihat statusnya.

---

#### US-PM-02
**Sebagai** Portfolio Monitor, **saya ingin** menerima notifikasi ketika sebuah proyek belum menyetor update sesuai jadwal **agar** tidak ada proyek yang "hilang dari radar".

**Acceptance Criteria:**
- Setiap proyek memiliki konfigurasi "Frekuensi Update Wajib": mingguan, dua mingguan, atau bulanan (dikonfigurasi oleh Admin).
- Jika deadline terlewat, proyek otomatis ditandai "Update Terlambat" dan Sinta mendapat notifikasi.
- Notifikasi berisi: nama proyek, jenis sumber data (form/API), jadwal yang seharusnya, dan berapa hari keterlambatan.
- Untuk proyek berbasis form: sistem mengirim pengingat otomatis ke project team di H-2 dan hari-H.
- Sinta dapat melihat semua proyek yang sedang terlambat dalam satu halaman terpusat.

---

### Monitoring & Review

#### US-PM-03
**Sebagai** Portfolio Monitor, **saya ingin** melihat dashboard semua proyek aktif dengan indikator kesehatan **agar** saya mendapat gambaran portofolio secara menyeluruh.

**Acceptance Criteria:**
- Dashboard menampilkan kartu per proyek: nama, kategori, status update (Terkini / Terlambat N hari), dan indikator kesehatan.
- Proyek dengan data terlambat ditampilkan dengan status "Data Belum Tersedia", bukan angka usang.
- Filter tersedia untuk: kategori proyek, status update, dan sumber data (Form / API).
- Summary bar menampilkan: total proyek aktif, jumlah update terkini, dan jumlah yang terlambat.

---

#### US-PM-04
**Sebagai** Portfolio Monitor, **saya ingin** me-review update yang masuk dari project team **agar** saya dapat menilai kondisi proyek dan mengambil tindakan jika diperlukan.

**Acceptance Criteria:**
- Setiap update yang masuk (via form maupun API) muncul di antrian "Update Masuk" dengan status Belum Ditinjau.
- Sinta dapat membuka detail update, membandingkan dengan update sebelumnya, dan melihat delta perubahan secara visual.
- Sinta dapat mengubah status update menjadi: Ditinjau – Normal, atau Ditinjau – Perlu Tindak Lanjut.
- Status "Perlu Tindak Lanjut" mewajibkan Sinta mengisi catatan tindakan yang akan diambil.
- Riwayat semua update beserta status review tersimpan di timeline proyek.

---

#### US-PM-05
**Sebagai** Portfolio Monitor, **saya ingin** melihat grafik tren metrik kunci per proyek **agar** saya dapat mendeteksi pola penurunan lebih awal.

**Acceptance Criteria:**
- Halaman detail proyek menampilkan grafik tren untuk metrik sesuai kategori proyek.
- Grafik hanya menampilkan titik data dari update yang sudah disubmit; tidak menginterpolasi data yang kosong.
- Grafik menampilkan garis proyeksi vs realisasi jika data proyeksi tersedia.
- Celah data (gap) karena keterlambatan update ditampilkan eksplisit di grafik, tidak disembunyikan.

---

#### US-PM-06
**Sebagai** Portfolio Monitor, **saya ingin** mencatat temuan dan tindak lanjut monitoring **agar** terdapat jejak pengawasan yang terdokumentasi per proyek.

**Acceptance Criteria:**
- Di halaman detail proyek, terdapat tab "Catatan Monitoring" yang bisa diisi Sinta kapan saja.
- Setiap catatan menyertakan: tanggal, tipe (Observasi Rutin / Peringatan / Tindak Lanjut / Eskalasi), dan isi catatan.
- Catatan bersifat append-only; entri lama tidak dapat diubah atau dihapus.
- Catatan dengan tipe Eskalasi otomatis membuat notifikasi ke Investment Officer.

---

## Hendra — Finance & Reconciliation

---

### Pengelolaan Dana & Rekening

#### US-FR-01
**Sebagai** Finance Officer, **saya ingin** mencatat semua aliran dana masuk dengan tag kategori dana yang jelas **agar** investasi, zakat, infaq, shadaqah, dan wakaf tidak pernah tercampur.

**Acceptance Criteria:**
- Setiap transaksi masuk wajib memiliki tag jenis dana: Investasi, Zakat, Infaq, Shadaqah, atau Wakaf.
- Sistem menolak transaksi tanpa tag atau dengan tag yang tidak sesuai rekening tujuan.
- Dashboard Finance menampilkan saldo real-time per kategori dana secara terpisah.
- Setiap pemindahan dana antar rekening memerlukan justifikasi tertulis dan konfirmasi dua pihak.

---

#### US-FR-02
**Sebagai** Finance Officer, **saya ingin** menyetujui atau menahan transaksi yang berpotensi melintasi batas antar kategori dana **agar** integritas tiap pool dana terjaga.

**Acceptance Criteria:**
- Sistem mendeteksi dan menahan otomatis transaksi yang mencoba memindahkan dana antar kategori.
- Transaksi yang ditahan masuk ke antrian "Perlu Review"; Hendra mendapat notifikasi.
- Hendra dapat menyetujui (dengan justifikasi terdokumentasi) atau menolak transaksi tersebut.
- Setiap transaksi lintas kategori yang disetujui tercatat dalam audit trail khusus.

---

### Bagi Hasil & Distribusi

#### US-FR-03
**Sebagai** Finance Officer, **saya ingin** sistem menghitung bagi hasil secara otomatis berdasarkan parameter proyek **agar** distribusi kepada investor akurat dan konsisten.

**Acceptance Criteria:**
- Sistem membaca parameter bagi hasil dari data proyek yang diinput Arief.
- Kalkulasi berjalan sesuai jadwal yang dikonfigurasi per proyek.
- Hasil kalkulasi menampilkan rincian: total keuntungan periode, porsi tiap pihak, dan jumlah yang akan didistribusikan.
- Hendra mereview dan mengkonfirmasi sebelum distribusi diproses.
- Jika ada dispute, kalkulasi dapat dibuka untuk koreksi manual dengan log perubahan.

---

#### US-FR-04
**Sebagai** Finance Officer, **saya ingin** sistem menghitung fee nazir wakaf secara otomatis **agar** pengelolaan keuangan wakaf produktif sesuai ketentuan.

**Acceptance Criteria:**
- Fee nazir dihitung dari persentase × profit bersih periode, bukan dari pendapatan kotor.
- Sistem memvalidasi bahwa fee nazir tidak melebihi 10%; konfigurasi di atas batas ini ditolak saat input.
- Fee nazir dicatat sebagai transaksi tersendiri dalam rekening wakaf, terpisah dari biaya operasional.
- Laporan fee nazir dapat digenerate per proyek per periode.

---

### Rekonsiliasi & Pelaporan

#### US-FR-05
**Sebagai** Finance Officer, **saya ingin** melakukan rekonsiliasi transaksi aktual dengan proyeksi **agar** selisih dapat diidentifikasi dan diselesaikan.

**Acceptance Criteria:**
- Halaman rekonsiliasi menampilkan tabel perbandingan proyeksi vs realisasi per baris transaksi.
- Selisih ditandai otomatis beserta nilainya.
- Hendra dapat menandai setiap baris sebagai: Cocok, Selisih Wajar (dengan keterangan), atau Perlu Investigasi.
- Rekonsiliasi yang belum selesai memunculkan peringatan di dashboard Finance.
- Riwayat rekonsiliasi tersimpan lengkap beserta siapa yang menyelesaikan dan kapan.

---

#### US-FR-06
**Sebagai** Finance Officer, **saya ingin** membuat laporan keuangan per kategori dana **agar** auditor dapat memverifikasi pemisahan dana dengan mudah.

**Acceptance Criteria:**
- Laporan dapat digenerate per kategori dana secara independen.
- Setiap laporan mencakup: saldo awal, total pemasukan, total pengeluaran, dan saldo akhir periode.
- Laporan dapat diunduh dalam format PDF dan Excel.
- Terdapat laporan konsolidasi yang menampilkan semua kategori berdampingan.
- Data yang belum direkonsiliasi diberi tanda khusus dalam laporan.

---

## Reza — Admin & Platform Operator

---

### Verifikasi Identitas (KYC)

#### US-AO-01
**Sebagai** Admin, **saya ingin** meninjau dan memverifikasi dokumen identitas pengguna **agar** hanya pengguna terverifikasi yang dapat berpartisipasi di platform.

**Acceptance Criteria:**
- Halaman KYC menampilkan antrian submission baru berurut waktu pengajuan.
- Admin dapat melihat dokumen yang diunggah langsung di halaman review.
- Terdapat checklist verifikasi standar yang harus dilengkapi sebelum mengambil keputusan.
- Admin dapat menyetujui atau menolak; penolakan mewajibkan pemilihan alasan dan catatan tambahan.
- Pengguna mendapat notifikasi otomatis beserta alasan jika ditolak, dan dapat mengajukan ulang.

---

### Manajemen Akses & Pengguna

#### US-AO-02
**Sebagai** Admin, **saya ingin** memberikan dan mengelola peran serta level akses untuk semua pengguna **agar** setiap orang hanya dapat mengakses fungsi sesuai tanggung jawabnya.

**Acceptance Criteria:**
- Halaman manajemen pengguna menampilkan semua akun aktif beserta peran mereka.
- Admin dapat mengubah peran dari daftar yang sudah terdefinisi; perubahan tercatat dalam audit log.
- Admin tidak dapat memberikan peran dengan level akses melebihi level akses mereka sendiri.
- Admin dapat membekukan akun sementara atau menonaktifkan permanen dengan konfirmasi dua langkah.

---

#### US-AO-03
**Sebagai** Admin, **saya ingin** mengkonfigurasi jadwal update wajib per proyek **agar** sistem dapat mendeteksi proyek yang terlambat menyetor laporan kepada Sinta.

**Acceptance Criteria:**
- Di halaman detail proyek, Admin dapat mengatur "Frekuensi Update Wajib": mingguan, dua mingguan, atau bulanan.
- Admin juga mengatur metode sumber data: Form ACO atau Integrasi API.
- Untuk sumber Form ACO, Admin menentukan akun project team mana yang berwenang mengisi form.
- Perubahan konfigurasi jadwal tercatat dalam changelog proyek.
- Konfigurasi ini menjadi dasar sistem untuk memicu notifikasi keterlambatan ke Sinta.

> **Catatan Dependensi:** US-AO-03 adalah enabler untuk US-PM-02. Harus dikerjakan lebih dulu.

---

### Validasi Dokumen Legal

#### US-AO-04
**Sebagai** Admin, **saya ingin** memvalidasi dan mengarsipkan dokumen legal per proyek **agar** berkas kepatuhan tersusun rapi dan mudah ditemukan.

**Acceptance Criteria:**
- Admin menerima notifikasi setiap ada dokumen baru yang diupload Arief di tab Dokumen proyek.
- Admin dapat mengubah status dokumen menjadi Tervalidasi atau Ditolak dengan catatan.
- Dokumen yang sudah Tervalidasi tidak dapat dihapus; hanya bisa digantikan versi baru.
- Admin dapat menetapkan tanggal kedaluwarsa; sistem mengirim pengingat H-14 sebelum tanggal tersebut.

---

### Audit & Akuntabilitas

#### US-AO-05
**Sebagai** Admin, **saya ingin** melihat audit log dari seluruh aksi pengguna dan sistem **agar** platform memiliki jejak pertanggungjawaban yang lengkap.

**Acceptance Criteria:**
- Audit log mencatat semua aksi signifikan: login, perubahan data, approval, penolakan, perubahan peran, upload dokumen.
- Setiap entri log menyertakan: timestamp, user ID, jenis aksi, entitas yang terpengaruh, dan nilai sebelum/sesudah.
- Log dapat difilter berdasarkan user, jenis aksi, dan rentang waktu.
- Audit log bersifat immutable; tidak ada user yang dapat mengubah atau menghapus entri.
- Admin dapat mengekspor log dalam format CSV untuk audit eksternal.

---

## Dependensi Antar Peran

| Dari | Ke | Keterangan |
|---|---|---|
| US-AO-03 (Reza konfigurasi jadwal) | US-PM-02 (Sinta terima notif terlambat) | Harus selesai lebih dulu |
| US-IO-01 (Arief input proyek) | US-AO-04 (Reza validasi dokumen) | Dokumen upload di proyek yang sama |
| US-IO-01 (Arief input parameter bagi hasil) | US-FR-03 (Hendra kalkulasi bagi hasil) | Parameter proyek = input kalkulasi |
| US-AO-02 (Reza buat akun project team) | US-PM-02 (Notif ke project team) | Project team perlu akun dulu untuk terima pengingat |

---

*ACO User Stories v2 — Revised per feedback: Arief MVP = entry data only; Sinta = dual-source monitoring + overdue alerts*
