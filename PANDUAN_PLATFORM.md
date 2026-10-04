# PANDUAN DAN SCRATCHPAD PLATFORM CIRVAL
> **CIRVAL** (*Circular Valorization Platform Indonesia*)  
> *Platform Valorisasi Sirkular Indonesia — Mengubah Residual Pangan Menjadi Sumber Daya Sekunder Terukur.*

---

## 1. Apa Itu CIRVAL dan Mengapa Platform Ini Dibuat?

### Latar Belakang Masalah
Indonesia menghasilkan puluhan juta ton sampah dan sisa pangan (*food loss and waste*) setiap tahunnya dari sektor industri makanan, roastery kopi, katering skala besar (termasuk unit dapur terpusat seperti SPPG/MBG), hingga agroindustri. Sebagian besar residu organik ini berakhir di TPA (*landfill*) yang memicu emisi gas metana ($CH_4$) atau hanya dibuang tanpa nilai tambah.

Kendala utamanya adalah:
1. **Asimetri Informasi Mutu**: Industri pengolah (pabrik pakan, bioenergi, biokomposit) ragu menyerap residu karena tidak ada data spesifikasi kadar air, nutrisi, atau jaminan kebersihan.
2. **Ketiadaan Mesin Penentu Jalur Optimal**: Pelaku usaha tidak tahu sisa pangannya paling bernilai jika diolah menjadi apa (apakah pakan ternak, biogas, pelet energi, atau kompos).
3. **Ketiadaan Rantai Lacak (*Traceability*) & Umpan Balik**: Tidak ada pencatatan tertutup mengenai apakah proses pengolahan berhasil dan bagaimana hasilnya dapat melatih algoritma rekomendasi berikutnya.

### Solusi CIRVAL
CIRVAL hadir bukan sekadar sebagai tempat jual-beli limbah biasa, melainkan **Platform Infrastruktur Valorisasi Sirkular B2B** berbasis data ilmiah. CIRVAL memfasilitasi siklus sirkular dari hulu ke hilir:
$$\text{Residu Terdaftar} \longrightarrow \text{Paspor Digital} \longrightarrow \text{Decision Engine} \longrightarrow \text{Pencocokan Pengolah} \longrightarrow \text{Jejak Sirkular \& Kalibrasi}$$

---

## 2. Bedah Fungsi Setiap Menu di Navbar (Navigasi)

Berikut adalah penjelasan fungsi setiap bar/menu navigasi dari kiri ke kanan:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [Beranda] [Dasbor] [Residual]  •   🍃 Cirval   •  [Mesin Keputusan] [Pencocokan] [Dampak]  [Analisis Residu] [NF] │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### ① Beranda (`landing`)
* **Tujuan**: Halaman perkenalan (*landing page*) utama bagi publik, dewan juri, investor, maupun calon mitra industri.
* **Fungsi Utama**:
  * Menjelaskan visi & proposisi nilai CIRVAL dengan desain premium, modern, dan interaktif.
  * Menampilkan statistik capaian langsung (*animated counter*): Residu teralihkan (ton), CO₂e ditekan, dan efisiensi sirkular.
  * Menampilkan **Alur 4 Langkah Valorisasi** (Profiling $\rightarrow$ Decision Engine $\rightarrow$ Pencocokan Mitra $\rightarrow$ Jejak Sirkular).
  * Memberikan akses langsung ke dua aksi utama: tombol **"Valorisasi Residual Anda"** (membuka formulir pendaftaran residu) dan **"Lihat Marketplace"** (menjelajahi katalog residu).

---

### ② Dasbor (`dashboard`)
* **Tujuan**: Pusat kendali operasional (*dashboard*) harian bagi entitas penghasil residu (misal: PT Nusantara Food).
* **Fungsi Utama**:
  * **Kartu Ringkasan Metrik (KPIs)**:
    * *Residual Aktif*: Total listing residu yang sedang didaftarkan.
    * *Dalam Valorisasi*: Batch yang sedang diuji atau diproses oleh mitra.
    * *Pencocokan Aktif*: Jumlah mitra pengolah yang cocok dan siap bertransaksi.
    * *Nilai Sirkular*: Estimasi potensi nilai ekonomi (Rupiah) dari residu yang terselamatkan.
  * **Daftar Residual Aktif**: Tabel interaktif sisa bahan pangan yang dimiliki. Pada setiap baris terdapat dua tombol penting:
    * **Paspor**: Membuka popup *Digital Resource Passport* dengan spesifikasi lab lengkap.
    * **Analisis**: Langsung membawa material tersebut ke *Valorization Decision Engine* untuk simulasi kelayakan 5 jalur pengolahan.

---

### ③ Residual / Katalog Material (`resources`)
* **Tujuan**: Katalog terbuka seluruh inventaris sisa pangan yang telah terverifikasi di dalam ekosistem CIRVAL.
* **Fungsi Utama**:
  * Menampilkan residu dari berbagai generator (ampas kopi roastery Sentul, kulit pisang industri keripik, sisa dapur katering SPPG, spent grain brewery, dll.).
  * Setiap kartu menampilkan data kunci: volume suplai per hari/minggu, tingkat kelembaban, kategori material, dan status verifikasi lab.
  * Pengguna dapat mencari, menyaring, dan membuka paspor digital tiap material secara transparan.

---

### ④ Mesin Keputusan (`valorization` / Decision Engine)
* **Tujuan**: Fitur kecerdasan komputasi inti CIRVAL yang menganalisis kelayakan valorisasi secara objektif dan ilmiah.
* **Fungsi Utama**:
  * Menerima input spesifikasi fisiko-kimia material aktif (Kadar Air, Rasio C/N, Serat Kasar, Bahan Organik).
  * **Simulasi Interaktif**: Pengguna dapat menggeser slider (Radius Logistik, Volume Batch, Target Profitabilitas) untuk melihat bagaimana dinamika kelayakan berubah secara *real-time*.
  * **Perhitungan 5 Jalur Valorisasi (*Cascading Valorization*)**:
    1. *Animal Feed* (Pakan Ternak): Kelayakan untuk silase / pelet konsentrat pakan.
    2. *Bioenergy* (Biogas / Briket): Potensi energi kalor dan produksi biogas.
    3. *Soil Amendment / Kompos*: Rekayasa kesuburan tanah & pupuk organik cair.
    4. *Biomaterial / Biokomposit*: Pemanfaatan serat selulosa untuk papan partikel ramah lingkungan.
    5. *Ekstraksi Senyawa Bioaktif*: Isolasi antioksidan/polifenol bernilai tinggi.
  * Menyajikan rekomendasi jalur peringkat tertinggi (*Top Match*) dan tombol satu-klik untuk langsung mencocokkan mitra industri pengolah.

---

### ⑤ Pencocokan (`marketplace` / Pathway Matching)
* **Tujuan**: Penghubung B2B (*circular matchmaker*) antara penghasil residu dengan fasilitas pengolah terdekat.
* **Fungsi Utama**:
  * Menampilkan profil mitra pengolah terverifikasi (contoh: *Pasundan Agro*, *BioTek Sentul*, *Sentul Biopellet Hub*).
  * Menghitung kecocokan kapasitas olah harian, jarak radius logistik, dan estimasi biaya perolehan bahan baku (*gate fee* / harga beli per kg).
  * Tombol **"Ajukan Transaksi Sirkular"**: Menginisiasi kontrak digital pengalihan residu dari generator ke pengolah.

---

### ⑥ Dampak (`impact` / Circular Impact Dashboard)
* **Tujuan**: Dasbor akuntabilitas keberlanjutan dan pelaporan ESG (*Environmental, Social, Governance*).
* **Fungsi Utama**:
  * Menampilkan metrik nyata dampak lingkungan:
    * *Diverted Residuals*: Total volume sampah organik yang tidak sampai membusuk di TPA.
    * *Avoided Carbon Emisi*: Ton $CO_2e$ yang berhasil dicegah dari reduksi gas metana.
    * *Secondary Resources Created*: Volume pakan ternak, pelet energi, dan pupuk yang berhasil tercipta.
    * *Economic Value Recaptured*: Nilai rupiah yang berhasil diputar kembali ke ekonomi lokal.
  * Grafik visual tren sirkularitas bulanan dan distribusi kontribusi per klaster wilayah (Bogor, Sukabumi, Bandung).

---

### ⑦ Transaksi & Jejak Sirkular (`transactions` & `traceability`)
* **Tujuan**: Rekam jejak rantai pasok tertutup (*Chain of Custody*) dari residu hingga menjadi produk baru.
* **Fungsi Utama**:
  * Setiap perpindahan dicatat dengan hash kriptografi SHA-256 dan nomor batch transparan.
  * Menampilkan tahapan: *Generator Dispatched* $\rightarrow$ *Lab Verification Passed* $\rightarrow$ *Processor Received* $\rightarrow$ *Batch Processed*.
  * Terdapat tombol **"Kirim Feedback Hasil Olah"** pada batch yang selesai diproses untuk membuka mekanisme *Feedback Loop*.

---

### ⑧ Profil Akun (`profile` / Inisial "NF")
* **Tujuan**: Halaman identitas bisnis dan kepatuhan entitas yang masuk ke sistem CIRVAL.
* **Fungsi Utama**:
  * Menampilkan status verifikasi generator pangan terpercaya (*Verified Food Processor*).
  * Menampilkan detail fasilitas, izin operasional, kuota pasokan, riwayat audit lab terakreditasi, dan pengaturan preferensi akun.

---

## 3. Fitur Pop-up / Modal Interaktif

Selain menu utama di navbar, terdapat 3 popup interaktif dengan desain *dark obsidian & neon lime*:

1. **Tombol "Analisis Residu" (Pendaftaran Residu 2 Langkah)**:
   * *Langkah 1*: Input identitas material, kategori, volume harian, lokasi fasilitas, dan frekuensi pasokan.
   * *Langkah 2*: Input parameter fisiko-kimia material (Kadar Air %, Rasio C/N, Serat Kasar %, Bahan Organik %) dan status sertifikasi lab.
   * *Output*: Menerbitkan ID paspor baru dan hash verifikasi secara instan.

2. **Modal "CIRVAL Resource Passport"**:
   * Menampilkan paspor digital resmi sisa pangan yang berisi biochemical profile lengkap, stempel hash terenkripsi SHA-256, QR code, dan estimasi kelayakan valorisasi awal.
   * Dilengkapi fitur cetak fisik (*Cetak Passport*) serta tombol cepat menjalankan *Decision Engine*.

3. **Modal "Feedback & Algorithm Learning Loop"**:
   * Memungkinkan mitra pengolah menginput hasil olahan aktual (Yield %, biaya pengolahan/kg, hasil mutu Grade A/B/C, dan tingkat penolakan).
   * Data ini secara otomatis mengkalibrasi bobot penilaian algoritma CIRVAL untuk batch selanjutnya (*closed-loop machine learning*).

---

## 4. Rangkuman Singkat untuk Presentasi / Tanya Jawab Juri

| Pertanyaan | Jawaban Kunci |
|---|---|
| **Apa itu CIRVAL?** | Platform digital B2B yang menghubungkan penghasil residu pangan dengan pengolah sekunder melalui paspor material digital dan mesin keputusan ilmiah. |
| **Apa keunggulannya dibanding bank sampah biasa?** | CIRVAL tidak sekadar mengumpulkan limbah, melainkan menggunakan data fisiko-kimia material untuk memilih jalur valorisasi terbaik (*cascading valorization*: pakan, bioenergi, atau bahan baku biokomposit). |
| **Bagaimana transparansi mutunya?** | Menggunakan *Digital Resource Passport* dengan parameter lab terstandar, QR Code, dan hash kriptografis anti-pemalsuan. |
| **Bagaimana sistem berkembang?** | Menggunakan arsitektur *closed learning loop*, di mana data empiris hasil pengolahan pabrik menjadi umpan balik untuk terus melatih dan mempertajam akurasi algoritma. |
