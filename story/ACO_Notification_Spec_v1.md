# ACO — Notification Spec
### v1.0 — Final

Semua notifikasi dikirim via **dua channel sekaligus: in-app + email.**
Tidak ada notifikasi yang hanya in-app atau hanya email.

Terdapat dua jenis aturan:
- **DIKUNCI** — trigger, penerima, dan channel tidak dapat diubah
- **CONFIGURABLE** — dapat disesuaikan oleh Admin/Superadmin melalui halaman konfigurasi

---

## Bagian A — Notifikasi Internal Team

---

### N-01 — KYC Baru Masuk
| Field | Nilai |
|---|---|
| Trigger | External user menyelesaikan upload dokumen KYC |
| Penerima | Reza (Admin) |
| Channel | In-app + Email |
| Isi notifikasi | "Ada pengajuan KYC baru dari [nama user]. Silakan tinjau." |
| Link | Langsung ke halaman review KYC user tersebut |
| Status | DIKUNCI |

---

### N-02 — Dokumen Proyek Baru Diupload
| Field | Nilai |
|---|---|
| Trigger | Arief mengupload dokumen baru di tab Dokumen proyek mana pun |
| Penerima | Reza (Admin) |
| Channel | In-app + Email |
| Isi notifikasi | "Dokumen baru [nama dokumen] diupload di proyek [nama proyek]. Menunggu validasi." |
| Link | Langsung ke tab Dokumen proyek tersebut |
| Status | DIKUNCI |

---

### N-03 — Proyek Terlambat Setor Update
| Field | Nilai |
|---|---|
| Trigger | Proyek melewati deadline update yang dikonfigurasi Admin |
| Penerima | Sinta (Portfolio Monitor) |
| Channel | In-app + Email |
| Isi notifikasi | "Proyek [nama proyek] belum menyetor update. Terlambat [N] hari dari jadwal [tanggal deadline]." |
| Link | Langsung ke halaman detail proyek tersebut |
| Status | DIKUNCI |
| Catatan | Notifikasi ini juga memicu N-12 (pengingat ke project team) secara bersamaan |

---

### N-04 — Update Baru Masuk dari Project Team
| Field | Nilai |
|---|---|
| Trigger | Project team mengirimkan update via form ACO atau data baru masuk via integrasi API |
| Penerima | Sinta (Portfolio Monitor) |
| Channel | In-app + Email |
| Isi notifikasi | "Update baru masuk untuk proyek [nama proyek]. Menunggu review." |
| Link | Langsung ke antrian Update Masuk, difilter ke proyek tersebut |
| Status | DIKUNCI |

---

### N-05 — Eskalasi dari Portfolio Monitor
| Field | Nilai |
|---|---|
| Trigger | Sinta membuat catatan monitoring dengan tipe "Eskalasi" |
| Penerima | Arief (Investment Officer) |
| Channel | In-app + Email |
| Isi notifikasi | "Sinta mengeskalaikan proyek [nama proyek]. Ringkasan: [isi catatan eskalasi, dipotong maks 100 karakter]." |
| Link | Langsung ke catatan eskalasi di halaman detail proyek |
| Status | DIKUNCI |

---

### N-06 — Transaksi Lintas Kategori Dana Terdeteksi
| Field | Nilai |
|---|---|
| Trigger | Sistem mendeteksi dan menahan transaksi yang berpotensi melintasi batas antar kategori dana |
| Penerima | Hendra (Finance Officer) |
| Channel | In-app + Email |
| Isi notifikasi | "Transaksi senilai Rp [nominal] ditahan. Terdeteksi potensi lintas kategori dana. Perlu review." |
| Link | Langsung ke antrian transaksi yang ditahan |
| Status | DIKUNCI |

---

### N-07 — Kalkulasi Bagi Hasil Siap Direview
| Field | Nilai |
|---|---|
| Trigger | Sistem selesai menghitung kalkulasi bagi hasil sesuai jadwal proyek |
| Penerima | Hendra (Finance Officer) |
| Channel | In-app + Email |
| Isi notifikasi | "Kalkulasi bagi hasil periode [periode] untuk proyek [nama proyek] siap direview sebelum distribusi diproses." |
| Link | Langsung ke halaman kalkulasi bagi hasil proyek tersebut |
| Status | DIKUNCI |

---

### N-13 — Target Dana Proyek Terpenuhi
| Field | Nilai |
|---|---|
| Trigger | Total dana yang masuk ke proyek mencapai atau melampaui target dana |
| Penerima | Default: Arief (Investment Officer) |
| Channel | In-app + Email |
| Isi notifikasi | "Proyek [nama proyek] telah mencapai target dana Rp [nominal]." |
| Link | Langsung ke halaman detail proyek |
| Status | CONFIGURABLE: Admin dapat mengubah daftar penerima |

---

## Bagian B — Notifikasi External User

---

### N-08a — KYC Disetujui
| Field | Nilai |
|---|---|
| Trigger | Reza mengubah status KYC menjadi Terverifikasi |
| Penerima | External user yang bersangkutan |
| Channel | In-app + Email |
| Isi notifikasi | "Verifikasi identitas Anda telah disetujui. Akun Anda kini aktif dan dapat melakukan transaksi." |
| Link | Dashboard external user |
| Status | DIKUNCI |

---

### N-08b — KYC Ditolak
| Field | Nilai |
|---|---|
| Trigger | Reza mengubah status KYC menjadi Ditolak |
| Penerima | External user yang bersangkutan |
| Channel | In-app + Email |
| Isi notifikasi | "Verifikasi identitas Anda belum dapat disetujui. Alasan: [alasan yang diinput Reza]. Anda dapat mengajukan ulang." |
| Link | Halaman pengajuan ulang KYC |
| Status | DIKUNCI |

---

### N-09a — Investasi Berhasil Dikonfirmasi
| Field | Nilai |
|---|---|
| Trigger | External user menyelesaikan konfirmasi komitmen investasi |
| Penerima | External user yang bersangkutan |
| Channel | In-app + Email |
| Isi notifikasi | "Investasi Anda sebesar Rp [nominal] untuk proyek [nama proyek] berhasil dikonfirmasi. Dana Anda akan disalurkan setelah target proyek terpenuhi." |
| Link | Halaman detail partisipasi investasi tersebut |
| Status | DIKUNCI |

---

### N-09b — Wakaf Uang Berhasil Dikonfirmasi
| Field | Nilai |
|---|---|
| Trigger | External user menyelesaikan konfirmasi setoran wakaf uang |
| Penerima | External user yang bersangkutan |
| Channel | In-app + Email |
| Isi notifikasi | "Wakaf uang Anda sebesar Rp [nominal] untuk program [nama proyek] telah diterima. Jazakallahu khairan." |
| Link | Halaman detail partisipasi wakaf tersebut |
| Status | DIKUNCI |

---

### N-10 — Bagi Hasil Didistribusikan
| Field | Nilai |
|---|---|
| Trigger | Hendra mengkonfirmasi dan memproses distribusi bagi hasil |
| Penerima | Semua investor yang memiliki porsi di proyek tersebut |
| Channel | In-app + Email |
| Isi notifikasi | "Bagi hasil periode [periode] untuk proyek [nama proyek] telah ditransfer ke saldo akun Anda. Nominal: Rp [nominal]. Rincian perhitungan dapat dilihat di dashboard." |
| Link | Halaman riwayat bagi hasil investor |
| Status | DIKUNCI |

---

### N-11 — Proyek Dinyatakan Gagal
| Field | Nilai |
|---|---|
| Trigger | Komite ACO menetapkan status proyek menjadi Gagal di sistem |
| Penerima | Semua investor yang memiliki dana aktif di proyek tersebut |
| Channel | In-app + Email |
| Isi notifikasi | "Proyek [nama proyek] dinyatakan tidak dapat dilanjutkan. Proses likuidasi aset akan segera dimulai. Informasi lengkap dan perkembangan proses dapat dipantau di dashboard Anda." |
| Link | Halaman detail proyek (versi publik yang menampilkan status likuidasi) |
| Status | DIKUNCI |

---

### N-14 — Komunikasi Kondisi Proyek ke Investor
| Field | Nilai |
|---|---|
| Trigger | Sinta memutuskan secara manual untuk mengirim komunikasi kondisi proyek |
| Penerima | Semua investor yang memiliki dana aktif di proyek tersebut |
| Channel | In-app + Email |
| Isi notifikasi | Ditulis manual oleh Sinta saat membuat komunikasi |
| Link | Halaman detail proyek |
| Status | DIKUNCI (manual oleh Sinta, bukan otomatis) |
| Catatan | Tidak ada notifikasi otomatis saat status berubah; semua komunikasi kondisi proyek ke investor adalah keputusan Sinta |

---

### N-15 — Laporan Bulanan External User
| Field | Nilai |
|---|---|
| Trigger | Otomatis, setiap tanggal 1 bulan berikutnya |
| Penerima | Semua external user yang memiliki minimal satu partisipasi aktif |
| Channel | In-app + Email |
| Isi notifikasi | "Laporan bulan [bulan] tersedia. Ringkasan: [N] partisipasi aktif, total nilai Rp [nominal]." |
| Link | Halaman laporan bulanan di dashboard external user |
| Status | CONFIGURABLE: Admin dapat mengubah frekuensi (default: bulanan) |

---

### N-12 — Pengingat Update ke Project Team
| Field | Nilai |
|---|---|
| Trigger 1 | H-2 sebelum deadline update proyek |
| Trigger 2 | Hari-H deadline update proyek |
| Penerima | Akun project team yang dikonfigurasi Admin untuk proyek tersebut |
| Channel | In-app + Email |
| Isi H-2 | "Pengingat: laporan update proyek [nama proyek] jatuh tempo dalam 2 hari ([tanggal deadline]). Silakan segera mengisi form update." |
| Isi hari-H | "Hari ini adalah batas waktu pengiriman update proyek [nama proyek]. Segera kirimkan laporan Anda." |
| Link | Form update proyek tersebut |
| Status | DIKUNCI |

---

## Ringkasan

| # | Event | Penerima | Status |
|---|---|---|---|
| N-01 | KYC baru masuk | Reza | DIKUNCI |
| N-02 | Dokumen proyek baru diupload | Reza | DIKUNCI |
| N-03 | Proyek terlambat update | Sinta | DIKUNCI |
| N-04 | Update baru masuk dari project team | Sinta | DIKUNCI |
| N-05 | Eskalasi dari Sinta | Arief | DIKUNCI |
| N-06 | Transaksi lintas kategori terdeteksi | Hendra | DIKUNCI |
| N-07 | Kalkulasi bagi hasil siap direview | Hendra | DIKUNCI |
| N-08a | KYC disetujui | External user ybs | DIKUNCI |
| N-08b | KYC ditolak | External user ybs | DIKUNCI |
| N-09a | Investasi berhasil dikonfirmasi | External user ybs | DIKUNCI |
| N-09b | Wakaf uang berhasil dikonfirmasi | External user ybs | DIKUNCI |
| N-10 | Bagi hasil didistribusikan | Semua investor proyek tsb | DIKUNCI |
| N-11 | Proyek dinyatakan gagal | Semua investor proyek tsb | DIKUNCI |
| N-12 | Pengingat update ke project team | Project team proyek tsb | DIKUNCI |
| N-13 | Target dana proyek terpenuhi | Default: Arief | CONFIGURABLE |
| N-14 | Komunikasi kondisi proyek ke investor | Semua investor proyek tsb | Manual oleh Sinta |
| N-15 | Laporan bulanan external user | Semua external user aktif | CONFIGURABLE |

---

*ACO Notification Spec v1.0*
*Semua notifikasi dikirim via in-app + email secara bersamaan.*
*Dokumen ini dibaca bersama Business Logic Rules v1.0 dan User Stories v3.*