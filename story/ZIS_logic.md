# ACO — Business Logic: ZIS & Wakaf Patch
### v1.0 — Zakat, Infaq & Shadaqah, Wakaf Sosial, Revisi Wakaf Produktif

Patch ini menambahkan dan merevisi aturan bisnis untuk:
- Zakat (Area 9 — baru)
- Infaq & Shadaqah (Area 10 — baru)
- Wakaf Sosial (Area 11 — baru)
- Revisi BL-7.1 (Pemisahan Dana — rekening ke-5)
- Revisi BL-4.3 & tambah BL-4.6 (Wakaf Produktif — bagi hasil wakif)
- Revisi BL-8.1 (Aturan Syariah — tambah ZIS & Wakaf Sosial)

Aturan yang tidak disebutkan di patch ini tidak berubah dari `ACO_BusinessLogic_Rules_v1.md`.

---

## Revisi Area 7 — Pemisahan Dana

**BL-7.1 (Revisi) — Lima rekening terpisah**
Platform mengelola **lima** kategori dana yang sepenuhnya terisolasi satu sama lain:
1. Dana Investasi
2. Dana Zakat
3. Dana Infaq & Shadaqah
4. Dana Wakaf Sosial *(baru — sebelumnya digabung dengan Wakaf Produktif)*
5. Dana Wakaf Produktif

Alasan pemisahan Wakaf Sosial dan Wakaf Produktif: keduanya memiliki karakteristik pengelolaan, pelaporan, dan distribusi yang berbeda — Wakaf Sosial digunakan langsung sebagai fasilitas, sedangkan Wakaf Produktif dikelola produktif dan menghasilkan surplus yang didistribusikan.

Tidak ada transaksi yang boleh memindahkan dana antar kategori tanpa justifikasi terdokumentasi dan persetujuan dua pihak (Hendra + satu pejabat lain).
`DIKUNCI`

---

## Revisi Area 4 — Wakaf Produktif

**BL-4.3 (Revisi) — Distribusi hasil wakaf produktif**
Hasil bersih dari pengelolaan wakaf produktif (setelah biaya operasional) dibagi sebagai berikut:
- **0%–10%**: fee nazir — dibagi antara ACO (sebagai nazir utama) dan nazir yang ditunjuk per proyek
- **0%–batas_admin%**: bagi hasil wakif (opsional, fitur CONFIGURABLE oleh Admin)
- **Sisanya**: disalurkan seluruhnya ke mustahiq atau program sosial yang ditentukan

Aturan validasi sistem:
1. Fee nazir tidak boleh melebihi 10%; sistem menolak konfigurasi di atas 10%
2. Fitur bagi hasil wakif: **default NONAKTIF**; Admin mengaktifkan secara global melalui P-AO-07
3. Jika fitur aktif: Admin mengonfigurasi batas maksimal porsi bagi hasil wakif (default: 20%)
4. Arief mengonfigurasi nilai aktual fee nazir dan bagi hasil wakif per proyek, dalam batas yang ditetapkan Admin
5. **Sistem memvalidasi: fee nazir + bagi hasil wakif ≤ 50%** — mustahiq selalu mendapat minimum 50%
6. Jika bagi hasil wakif = 0% (tidak diklaim), porsi mustahiq = 100% − fee nazir

`DIKUNCI: batas fee nazir 10%, kombinasi fee + bagi hasil wakif maks 50%, mustahiq minimum 50%`
`CONFIGURABLE: aktifkan/nonaktifkan fitur bagi hasil wakif oleh Admin`
`CONFIGURABLE: batas maksimal porsi bagi hasil wakif oleh Admin (default 20%)`
`CONFIGURABLE: nilai aktual fee nazir dan bagi hasil wakif per proyek oleh Arief`

---

**BL-4.6 (Baru) — Pemilihan jenis wakaf oleh wakif**
Pada saat menyerahkan aset atau uang wakaf, wakif menentukan jenis pengelolaan yang diinginkan:
- **Wakaf Sosial**: aset atau uang digunakan langsung untuk fasilitas atau program sosial (masjid, sekolah, sumur, pembangunan, dsb.). Tidak ada mekanisme bagi hasil untuk wakif.
- **Wakaf Produktif**: aset atau uang dikelola secara produktif untuk menghasilkan pendapatan; sebagian besar disalurkan ke mustahiq. Wakif dapat meminta porsi bagi hasil jika fitur ini diaktifkan Admin.

Implikasi routing dana:
- Wakaf Sosial → rekening Dana Wakaf Sosial
- Wakaf Produktif → rekening Dana Wakaf Produktif

Pilihan jenis wakaf yang telah dikonfirmasi tidak dapat diubah oleh siapapun setelah pengajuan diterima ACO.
`DIKUNCI`

---

## Area 9 — Zakat

**BL-9.1 — Jenis zakat yang diterima platform**
Platform menerima pembayaran zakat dalam jenis-jenis berikut:
- Zakat Maal (harta kekayaan)
- Zakat Profesi / Penghasilan
- Zakat Perdagangan
- Zakat Emas & Perak
- Zakat Fitrah (hanya aktif selama Ramadan; Admin mengaktifkan/menonaktifkan secara manual)
- Zakat Lainnya (jenis tambahan yang dapat dikonfigurasi Admin)

`CONFIGURABLE: jenis zakat yang aktif dan tersedia oleh Admin`

---

**BL-9.2 — Kalkulator zakat sebagai alat bantu**
Platform menyediakan kalkulator zakat per jenis sebagai alat bantu muzakki mengestimasi kewajiban zakatnya.
- Kalkulator menggunakan nilai nisab yang dikonfigurasi Admin (setara nilai emas; diperbarui berkala)
- Hasil kalkulator bersifat **informatif dan tidak mengikat**; nominal final ditentukan sendiri oleh muzakki
- Platform tidak memvalidasi atau menolak nominal yang berbeda dari hasil kalkulator

`CONFIGURABLE: nilai nisab per jenis zakat oleh Admin (diperbarui mengikuti harga referensi)`

---

**BL-9.3 — ACO sebagai amil**
ACO berperan sebagai amil zakat. Porsi amil diambil dari total dana zakat yang terkumpul sebelum distribusi ke 7 asnaf lainnya.
- Porsi amil (ACO): dikonfigurasi Admin, default **12.5%** (1/8 dari total, sesuai prinsip syariah)
- Porsi amil tidak boleh melebihi 12.5%; sistem menolak konfigurasi di atas batas ini
- Pemotongan porsi amil dilakukan otomatis oleh sistem saat Hendra memulai proses distribusi
- Porsi amil dicatat sebagai transaksi tersendiri dengan label "Amil — ACO" dalam rekening Dana Zakat

`DIKUNCI: batas maksimal porsi amil 12.5%`
`CONFIGURABLE: nilai aktual porsi amil oleh Admin (default: 12.5%)`

---

**BL-9.4 — Distribusi ke 8 asnaf**
Dana zakat (setelah porsi amil) didistribusikan kepada asnaf yang dipilih Hendra pada setiap sesi distribusi:

| # | Asnaf | Keterangan Konteks Modern |
|---|---|---|
| 1 | Fakir | Tidak memiliki harta dan penghasilan |
| 2 | Miskin | Memiliki penghasilan namun tidak mencukupi kebutuhan dasar |
| 3 | Amil | Sudah dipotong di BL-9.3 |
| 4 | Mualaf | Orang yang baru masuk Islam dan perlu dukungan |
| 5 | Riqab | Dalam konteks modern: program pemberdayaan/pemerdekaan dari eksploitasi |
| 6 | Gharimin | Orang yang terlilit utang untuk kebutuhan halal |
| 7 | Fisabilillah | Program di jalan Allah: dakwah, pendidikan agama, pertahanan umat |
| 8 | Ibnu Sabil | Musafir yang kehabisan bekal; dalam konteks modern: bantuan darurat perjalanan |

Setiap alokasi distribusi wajib mencantumkan: asnaf yang dituju, nominal, dan dapat mencantumkan nama/lembaga penerima. Distribusi boleh ke sebagian asnaf per sesi (tidak wajib semua 8 asnaf setiap distribusi).
Hendra mengeksekusi distribusi; setiap distribusi dicatat immutable dalam audit trail.
`DIKUNCI`

---

**BL-9.5 — Transparansi distribusi zakat**
Laporan distribusi zakat bersifat publik dan mencakup:
- Total dana zakat terkumpul per periode (bulan/tahun)
- Total terdistribusikan per asnaf: nominal dan persentase dari total distribusi
- Ringkasan program atau kategori penerima per asnaf (tanpa data pribadi penerima individu)

Laporan diterbitkan minimal satu kali per bulan oleh Hendra, setelah sesi distribusi selesai.
`DIKUNCI: kewajiban transparansi laporan distribusi`
`CONFIGURABLE: frekuensi minimum laporan oleh Admin (default: bulanan)`

---

## Area 10 — Infaq & Shadaqah

**BL-10.1 — Dua jalur infaq & shadaqah**
Platform menerima infaq & shadaqah melalui dua jalur:
- **Program-based**: donasi ditujukan ke program/proyek tertentu yang dibuat oleh Arief (kategori "Program Sosial"). Dana dikunci hanya untuk program tersebut.
- **General fund**: donasi ke dana umum ACO tanpa penunjukan program. Penggunaan ditentukan ACO sesuai prioritas kebutuhan dan dilaporkan secara agregat.

Kedua jalur masuk ke rekening Dana Infaq & Shadaqah dan tetap terisolasi dari rekening lain.

`DIKUNCI: isolasi rekening`
`CONFIGURABLE: aktif/tidaknya jalur general fund oleh Admin (default: aktif)`

---

**BL-10.2 — Sifat dana infaq & shadaqah**
Berbeda dengan wakaf, dana infaq & shadaqah **boleh habis digunakan** untuk keperluan program atau distribusi. Tidak ada kewajiban pelestarian pokok.
Dana yang terkumpul untuk suatu program hanya boleh digunakan untuk program tersebut.
Jika program berakhir dengan kelebihan dana:
- Opsi 1: Dikembalikan ke donatur (jika nominal donasi kecil, bisa diwakilkan persetujuan kolektif)
- Opsi 2: Dipindahkan ke program sejenis atas persetujuan dua pihak (Hendra + Admin) dengan justifikasi tertulis
`DIKUNCI: penggunaan dana sesuai peruntukan program`

---

**BL-10.3 — Transparansi penggunaan infaq & shadaqah**
Setiap program infaq & shadaqah wajib mempublikasikan:
- Progress pengumpulan dana vs target (real-time)
- Laporan realisasi penggunaan dana setelah program selesai atau pada titik milestone yang ditentukan
- Update berkala dari program sesuai jadwal yang dikonfigurasi per program

Donatur dapat melihat laporan penggunaan dana program yang mereka dukung dari dashboard. Laporan ringkasan dipublikasikan di halaman publik program.
`DIKUNCI: kewajiban transparansi laporan program`

---

## Area 11 — Wakaf Sosial

**BL-11.1 — Definisi wakaf sosial dalam platform**
Wakaf sosial (wakaf khairi) adalah wakaf di mana aset atau uang digunakan langsung sebagai fasilitas atau layanan sosial, tanpa mekanisme bagi hasil produktif.
Prinsip: *"Tahan pokoknya, berikan manfaatnya langsung."*
- Aset fisik (tanah/bangunan): menjadi fasilitas yang dapat digunakan masyarakat (masjid, sekolah, makam, sumur, dsb.)
- Uang wakaf sosial: digunakan untuk membangun atau membeli aset sosial; aset hasil belanja itulah yang menjadi "pokok wakaf" yang dipelihara
- Tidak ada surplus atau bagi hasil; manfaatnya adalah akses langsung ke fasilitas

`DIKUNCI`

---

**BL-11.2 — Rekening wakaf sosial**
Seluruh dana yang diklasifikasikan sebagai wakaf sosial (baik uang maupun nilai taksiran aset) disimpan di rekening Dana Wakaf Sosial, terpisah dari rekening Dana Wakaf Produktif.
Rekening Dana Wakaf Sosial tidak boleh digunakan untuk kegiatan produktif atau menghasilkan keuntungan.
`DIKUNCI`

---

**BL-11.3 — Pengelolaan aset wakaf sosial**
ACO berperan sebagai nazir untuk aset wakaf sosial yang diterima.
Tanggung jawab nazir:
- Menjaga kondisi fisik aset agar tetap dapat memberikan manfaat
- Memastikan pemanfaatan sesuai dengan niat wakaf yang ditetapkan wakif
- Tidak menjual, menghibahkan, atau mengalihkan aset wakaf dalam kondisi apapun

Biaya pemeliharaan aset wakaf sosial dapat bersumber dari:
- Dana operasional ACO
- Donasi/infaq yang secara eksplisit ditujukan untuk pemeliharaan aset tersebut

`DIKUNCI: larangan menjual atau mengalihkan aset wakaf sosial`

---

**BL-11.4 — Laporan kondisi dan manfaat aset wakaf sosial**
Sinta (Portfolio Monitor) memantau dan mendokumentasikan kondisi setiap aset wakaf sosial yang dikelola ACO.
Laporan wajib dikirim kepada wakif minimal sekali setiap 6 bulan, mencakup:
- Kondisi fisik aset (deskripsi terkini)
- Estimasi jumlah penerima manfaat aktif (per bulan atau per periode)
- Catatan pemeliharaan, perbaikan, atau kejadian signifikan selama periode
- Foto kondisi aset (opsional, jika memungkinkan secara teknis dan legal)

Versi ringkasan laporan (tanpa data pribadi wakif) dipublikasikan otomatis di halaman transparansi publik ACO (P-PUB-02).
`DIKUNCI: kewajiban laporan 6 bulanan ke wakif`
`CONFIGURABLE: frekuensi laporan oleh Admin (default: setiap 6 bulan)`

---

## Revisi Area 8 — Aturan Syariah Platform

**BL-8.1 (Revisi) — Aturan syariah yang dikuatkan di level sistem**
Aturan syariah yang dikuatkan secara teknis di platform:
1. Fee nazir wakaf tidak boleh melebihi 10% dari profit bersih
2. Pokok wakaf bersifat permanen dan tidak dapat ditarik
3. Dana zakat hanya boleh disalurkan ke 8 asnaf
4. Lima rekening dana terisolasi sepenuhnya
5. Porsi amil zakat tidak boleh melebihi 12.5% (1/8)
6. Fee nazir + bagi hasil wakif tidak boleh melebihi 50% (mustahiq minimum 50%)
7. Rekening Dana Wakaf Sosial tidak boleh digunakan untuk kegiatan produktif

`DIKUNCI`

---

## Ringkasan Lengkap: Yang Configurable dan Oleh Siapa

| Aturan | Configurable oleh | Keterangan |
|---|---|---|
| *(dari v1 — tidak berubah)* | | |
| Porsi fee ACO per proyek investasi | Arief | Dalam rentang 1%–10% |
| Jadwal distribusi bagi hasil | Arief | Per proyek |
| Perilaku periode profit nihil | Arief | Default: hangus |
| Mekanisme pengembalian pokok | Arief | Per proyek |
| Batas kepemilikan investor per proyek | Arief | Default: tidak ada batas |
| Rasio komersial vs sosial per proyek | Arief | Bilangan bulat 0–100% |
| Flag partisipasi per node proyek | Arief | Per node, independen |
| Porsi fee nazir wakaf produktif | Arief | Dalam rentang 0%–10% |
| *(tambahan dari patch ini)* | | |
| Nilai aktual bagi hasil wakif per proyek | Arief | 0%–batas_admin%; hanya jika fitur aktif |
| Aktifkan/nonaktifkan fitur bagi hasil wakif (global) | Admin | Default: nonaktif |
| Batas maksimal porsi bagi hasil wakif | Admin | Default: 20%; berlaku jika fitur aktif |
| Jenis zakat yang aktif di platform | Admin | Termasuk toggle Zakat Fitrah |
| Nilai nisab kalkulator zakat per jenis | Admin | Diperbarui berkala mengikuti harga referensi |
| Porsi amil zakat | Admin | Default 12.5%; tidak boleh melebihi 12.5% |
| Aktif/nonaktif general fund infaq & shadaqah | Admin | Default: aktif |
| Frekuensi laporan distribusi zakat | Admin | Default: bulanan |
| Frekuensi laporan kondisi aset wakaf sosial ke wakif | Admin | Default: setiap 6 bulan |

---

*ACO Business Logic: ZIS & Wakaf Patch v1.0*
*Apply on top of: ACO_BusinessLogic_Rules_v1.md*
*Aturan yang tidak disebut di sini tidak berubah dari v1.*