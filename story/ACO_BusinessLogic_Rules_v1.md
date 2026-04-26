# ACO — Business Logic Rules
### v1.0 — Final

Dokumen ini adalah referensi aturan bisnis yang berlaku di platform ACO.
Terdapat dua jenis aturan:
- **DIKUNCI** — nilai tetap, tidak bisa diubah oleh siapapun kecuali perubahan kebijakan resmi
- **CONFIGURABLE** — dapat dikonfigurasi oleh Admin/Superadmin atau Arief sesuai konteks yang disebutkan

---

## Area 1 — Investasi: Bagi Hasil

**BL-1.1 — Basis kalkulasi profit**
Bagi hasil dihitung dari **pendapatan bersih setelah biaya operasional**.
Biaya operasional yang mengurangi basis kalkulasi harus terdokumentasi dan disetujui oleh Hendra.
`DIKUNCI`

---

**BL-1.2 — Fee ACO sebagai pengelola investasi**
ACO mendapatkan porsi bagi hasil sebagai pengelola platform, terpisah dari porsi investor.
- Minimum porsi ACO: **1%**
- Maksimum porsi ACO: **10%**
- Nilai aktual dikonfigurasi per proyek oleh Arief saat input proyek.
- Validasi sistem: sistem menolak konfigurasi di luar rentang 1%–10%.

`DIKUNCI: batas min 1% dan max 10%`
`CONFIGURABLE: nilai aktual per proyek oleh Arief`

---

**BL-1.3 — Skema bagi hasil**
Total bagi hasil dari profit = porsi investor + porsi ACO + porsi lain yang disepakati per proyek.
Total seluruh porsi harus = 100%. Sistem memvalidasi ini sebelum proyek dapat diaktifkan.
`DIKUNCI`

---

**BL-1.4 — Jadwal distribusi bagi hasil**
Jadwal distribusi bagi hasil kepada investor dikonfigurasi per proyek oleh Arief saat input proyek.
Opsi yang tersedia: bulanan, triwulanan, semesteran, atau setelah proyek selesai.
`CONFIGURABLE: per proyek oleh Arief`

---

**BL-1.5 — Periode profit nihil**
Jika pada suatu periode proyek tidak menghasilkan profit (impas atau rugi):
- Default: tidak ada distribusi periode tersebut; bagi hasil periode tersebut **hangus** (tidak diakumulasikan ke periode berikutnya).
- Arief dapat mengkonfigurasi per proyek untuk menggunakan opsi akumulasi.

`CONFIGURABLE: per proyek oleh Arief. Default = hangus`

---

**BL-1.6 — Batasan nominal investasi**
Tidak ada batasan minimum maupun maksimum nominal investasi per transaksi.
`DIKUNCI`

---

**BL-1.7 — Frekuensi investasi per investor per proyek**
Satu investor boleh berinvestasi lebih dari satu kali di proyek yang sama tanpa batasan.
Porsi kepemilikan investor dihitung dari total akumulasi seluruh transaksinya di proyek tersebut.
`DIKUNCI`

---

## Area 2 — Investasi: Dana & Penarikan

**BL-2.1 — Dana belum tersalurkan**
Dana investor yang sudah masuk namun belum disalurkan ke proyek tidak memiliki batas waktu holding otomatis. Dana tetap ditahan sampai:
- Proyek mencapai target dana dan dana disalurkan, atau
- Investor melakukan penarikan manual.

`DIKUNCI`

---

**BL-2.2 — Penarikan sebelum penyaluran**
Investor dapat menarik dana kapan saja selama dana **belum disalurkan** ke proyek.
Setelah dana disalurkan, investor **tidak dapat menarik dana** (no early exit).
Verifikasi status penyaluran dilakukan oleh Hendra sebelum penarikan diproses.
`DIKUNCI`

---

**BL-2.3 — Pengembalian pokok saat proyek selesai**
Mekanisme pengembalian pokok investasi saat tenor habis dikonfigurasi per proyek oleh Arief.
Opsi yang tersedia:
- Otomatis dikembalikan ke saldo akun investor
- Investor harus request penarikan manual

`CONFIGURABLE: per proyek oleh Arief`

---

**BL-2.4 — Status dana dalam platform**
Dana investor yang berada di platform (belum disalurkan) disimpan di rekening investasi yang terisolasi.
Dana ini tidak boleh digunakan untuk keperluan operasional ACO atau dicampur dengan dana kategori lain.
`DIKUNCI`

---

## Area 3 — Proyek Bermasalah & Gagal

**BL-3.1 — Kewenangan penetapan status gagal**
Proyek hanya dapat dinyatakan resmi "Gagal" melalui **keputusan komite internal ACO**.
Tidak ada individu yang dapat menetapkan status gagal secara sepihak.
`DIKUNCI`

---

**BL-3.2 — Urutan prioritas distribusi hasil likuidasi**
Jika proyek gagal dan aset dilikuidasi, distribusi hasil likuidasi mengikuti urutan prioritas berikut:
1. Biaya proses likuidasi (legal, akuntan, valuator, dll.)
2. Pengembalian pokok investor
3. Bagi hasil yang belum terbayar kepada investor
4. Fee ACO yang belum terbayar
5. Sisa (jika ada) dibagi proporsional kepada investor sesuai porsi kepemilikan

`DIKUNCI`

---

**BL-3.3 — Jaminan recovery investor**
Tidak ada jaminan minimum recovery dari ACO kepada investor jika proyek gagal.
Investor menanggung risiko investasi secara penuh.
Ketentuan ini wajib dicantumkan secara eksplisit dalam perjanjian investasi dan ditampilkan kepada investor sebelum konfirmasi investasi.
`DIKUNCI`

---

**BL-3.4 — Transparansi kondisi proyek gagal**
Seluruh informasi terkait kegagalan proyek, proses likuidasi, dan hasil distribusi wajib dikomunikasikan secara transparan kepada semua investor yang terlibat.
Tidak ada informasi material yang boleh disembunyikan.
`DIKUNCI`

---

## Area 4 — Wakaf Produktif

**BL-4.1 — Sifat permanen wakaf**
Pokok wakaf (aset maupun uang yang telah diwakafkan) bersifat **permanen** dan tidak dapat ditarik kembali oleh wakif dalam kondisi apapun.
Ini adalah ketentuan hukum wakaf dan tidak dapat dikonfigurasi.
`DIKUNCI`

---

**BL-4.2 — Protokol wakaf produktif merugi**
Jika proyek wakaf produktif mengalami kerugian yang mengancam nilai aset pokok:
1. Sinta mengeskalasi kondisi ke komite internal ACO.
2. Komite mengambil keputusan tindakan korektif.
3. Laporan kondisi dikirimkan kepada wakif.
4. Keputusan final ada di tangan komite ACO, dengan mempertimbangkan masukan wakif.
Nilai aset pokok wakaf tidak boleh berkurang. Jika diperlukan, ACO dapat menggunakan dana cadangan operasional untuk menjaga nilai pokok.
`DIKUNCI`

---

**BL-4.3 — Distribusi hasil wakaf produktif**
Hasil bersih dari pengelolaan wakaf produktif (setelah biaya operasional) dibagi sebagai berikut:
- **Maksimal 10%**: fee nazir — dibagi antara ACO (sebagai nazir utama) dan nazir yang ditunjuk per proyek
- **Minimal 90%**: disalurkan seluruhnya ke mustahiq atau program sosial yang ditentukan

Porsi aktual fee nazir (dalam rentang 0%–10%) dikonfigurasi per proyek oleh Arief.
Sistem menolak konfigurasi fee nazir di atas 10%.
Sisa setelah fee nazir (minimal 90%) **seluruhnya** ke mustahiq; tidak ada potongan lain.

`DIKUNCI: batas max fee nazir 10% dan seluruh sisa ke mustahiq`
`CONFIGURABLE: nilai aktual fee nazir per proyek oleh Arief`

---

**BL-4.4 — Wakaf aset tidak bergerak & bergerak**
Proses wakaf aset (tidak bergerak maupun bergerak) yang disubmit melalui platform bersifat sebagai pengajuan awal. Proses hukum (akta ikrar wakaf, serah terima aset) dilakukan di luar platform. Platform hanya mencatat status dan riwayat prosesnya.
`DIKUNCI`

---

**BL-4.5 — Kepemilikan properti di lahan wakaf**
Untuk proyek properti yang dibangun di atas lahan wakaf:
- Status kepemilikan pembeli adalah **SHM Bangunan**
- Lahan tetap berstatus wakaf (milik umat) dan tidak dapat diperjualbelikan
- Ketentuan ini wajib dicantumkan secara eksplisit dalam akad jual beli

`DIKUNCI`

---

## Area 5 — Struktur Proyek

**BL-5.1 — Hirarki proyek**
Proyek dapat memiliki sub-proyek tanpa batas kedalaman level.
RAB level parent = akumulasi RAB semua sub-proyek langsung + item reguler yang diinput langsung di level tersebut.
Agregasi bersifat rekursif ke atas secara real-time.
`DIKUNCI`

---

**BL-5.2 — Konfigurasi peluang partisipasi per node**
Setiap node proyek (root maupun sub-proyek) memiliki dua flag partisipasi yang independen:
- Terbuka untuk Investasi Uang: Ya / Tidak
- Terbuka untuk Wakaf Uang: Ya / Tidak

Default keduanya adalah "Tidak" saat node baru dibuat.
Flag tidak diwariskan dari parent ke sub-proyek.
`CONFIGURABLE: per node oleh Arief`

---

**BL-5.3 — Visibilitas proyek di publik**
Node yang memiliki minimal satu flag partisipasi "Ya" → tampil di catalog publik.
Node dengan kedua flag "Tidak" → tidak tampil di catalog publik; hanya terlihat oleh pengguna internal.
Jika node tertutup namun sub-proyeknya terbuka: nama node ditampilkan sebagai teks konteks (breadcrumb) di halaman sub-proyek, tanpa link dan tanpa halaman publik.
`DIKUNCI`

---

**BL-5.4 — Batas maksimal kepemilikan investor per proyek**
Batas maksimal porsi kepemilikan satu investor dalam satu proyek dikonfigurasi per proyek oleh Arief.
Jika tidak dikonfigurasi, tidak ada batas (satu investor boleh mendanai hingga 100% target proyek).
`CONFIGURABLE: per proyek oleh Arief`

---

## Area 6 — KYC & Akun Pengguna

**BL-6.1 — Dokumen wajib KYC**
Dokumen yang wajib diunggah untuk KYC:
- KTP (wajib, untuk semua jenis pengguna termasuk penanggung jawab badan usaha)

Badan usaha dan individu diperlakukan sama — menggunakan KTP penanggung jawab.
`DIKUNCI`

---

**BL-6.2 — Akses sebelum KYC terverifikasi**
Pengguna yang belum menyelesaikan KYC dapat menjelajahi platform (catalog proyek, informasi publik) namun **tidak dapat melakukan transaksi** dalam bentuk apapun.
`DIKUNCI`

---

**BL-6.3 — Isolasi data partisipasi**
Satu akun external user dapat memiliki beberapa jenis partisipasi aktif secara bersamaan (wakaf aset, wakaf uang, investasi uang).
Setiap partisipasi adalah entri terpisah. Pemisahan terjadi di level transaksi dan rekening, bukan di level akun.
`DIKUNCI`

---

## Area 7 — Pemisahan Dana

**BL-7.1 — Empat rekening terpisah**
Platform mengelola empat kategori dana yang sepenuhnya terisolasi satu sama lain:
1. Dana Investasi
2. Dana Zakat
3. Dana Infaq & Shadaqah
4. Dana Wakaf Produktif

Tidak ada transaksi yang boleh memindahkan dana antar kategori tanpa justifikasi terdokumentasi dan persetujuan dua pihak (Hendra + satu pejabat lain).
`DIKUNCI`

---

**BL-7.2 — Validasi tag dana**
Setiap transaksi yang masuk ke platform wajib memiliki tag kategori dana yang sesuai rekening tujuan.
Sistem menolak transaksi tanpa tag atau dengan tag yang tidak sesuai.
`DIKUNCI`

---

**BL-7.3 — Zakat: distribusi ke 8 asnaf**
Dana zakat hanya boleh disalurkan kepada 8 asnaf yang ditentukan syariah.
Setiap alokasi dana zakat wajib mencantumkan kategori asnaf yang dituju.
`DIKUNCI`

---

## Area 8 — Aturan Syariah Platform

**BL-8.1 — Aturan syariah yang dikuatkan di level sistem**
Aturan syariah yang dikuatkan secara teknis di platform:
1. Fee nazir wakaf tidak boleh melebihi 10% dari profit bersih
2. Pokok wakaf bersifat permanen dan tidak dapat ditarik
3. Dana zakat hanya boleh disalurkan ke 8 asnaf
4. Empat rekening dana terisolasi sepenuhnya

Tidak ada aturan syariah tambahan yang dikuatkan di level sistem untuk fase MVP.
`DIKUNCI`

---

## Ringkasan: Yang Configurable dan Oleh Siapa

| Aturan | Configurable oleh | Keterangan |
|---|---|---|
| Porsi fee ACO per proyek | Arief | Dalam rentang 1%–10% |
| Jadwal distribusi bagi hasil | Arief | Per proyek |
| Perilaku periode profit nihil | Arief | Default: hangus |
| Mekanisme pengembalian pokok | Arief | Per proyek |
| Batas kepemilikan investor per proyek | Arief | Default: tidak ada batas |
| Flag partisipasi per node proyek | Arief | Per node, independen |
| Porsi fee nazir wakaf | Arief | Dalam rentang 0%–10% |
| Threshold kesehatan proyek | Admin/Superadmin | Berlaku global atau per kategori |
| Frekuensi update wajib per proyek | Admin | Per proyek |
| Sumber data monitoring per proyek | Admin | Form ACO atau API |
| SLA verifikasi KYC | Admin/Superadmin | Target waktu internal |
| Channel notifikasi aktif | Admin/Superadmin | In-app, email, dll. |
| Batas pengajuan ulang KYC | Admin/Superadmin | Default: tidak terbatas |
| Cooling-off period transaksi | Admin/Superadmin | Default: tidak ada |

---

*ACO Business Logic Rules v1.0*
*Dokumen ini adalah referensi utama untuk developer, QA, dan tim product.*
*Setiap perubahan aturan harus melalui persetujuan manajemen ACO dan direfleksikan ke dokumen ini sebelum diimplementasikan.*