'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  FlaskConical, 
  FileText, 
  MapPin, 
  Calendar, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Building2,
  Droplets,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ResourcePassport, MaterialCategory, SupplyFrequency, VerificationStatus } from '../types/cirval';

interface ResourceProfilingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResourceCreated: (newResource: ResourcePassport) => void;
}

export const ResourceProfilingModal: React.FC<ResourceProfilingModalProps> = ({
  isOpen,
  onClose,
  onResourceCreated
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    materialName: 'Ampas Kopi & Kulit Buah Kopi (Arabika)',
    indonesianName: 'Ampas Kopi Basah & Cascara Residual',
    category: 'Coffee By-Product' as MaterialCategory,
    sourceBusiness: 'PT Nusantara Food (Unit Roastery Sentul)',
    businessType: 'Food Manufacturer' as const,
    location: 'Sentul Industrial Estate, Babakan Madang',
    regency: 'Bogor, Jawa Barat',
    availableVolume: 500,
    volumeUnit: 'kg/hari' as const,
    supplyFrequency: 'Harian (Daily)' as SupplyFrequency,
    moistureLevel: 65,
    cnRatio: '24:1',
    organicMatter: 89.5,
    fiberContent: 28.0,
    sugarStarchContent: 11.5,
    contaminationStatus: 'Bebas Kontaminan Fisik/Kimia' as const,
    collectionDate: new Date().toISOString().split('T')[0],
    verificationStatus: 'Verified by Lab Partner' as VerificationStatus,
    additionalNotes: 'Disimpan dalam drum tertutup rapat berstandar pangan. Bebas residu pembersih kimia.'
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(false);
      const t = setTimeout(() => setMounted(true), 10);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate unique passport ID and verification hash
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const id = `CVR-2026-BGR-${randomSuffix}`;
    const hash = `SHA256:${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    const newResource: ResourcePassport = {
      id,
      materialName: formData.materialName,
      indonesianName: formData.indonesianName,
      category: formData.category,
      sourceBusiness: formData.sourceBusiness,
      businessType: formData.businessType,
      location: formData.location,
      regency: formData.regency,
      availableVolume: Number(formData.availableVolume),
      volumeUnit: formData.volumeUnit,
      supplyFrequency: formData.supplyFrequency,
      moistureLevel: Number(formData.moistureLevel),
      cnRatio: formData.cnRatio,
      organicMatter: Number(formData.organicMatter),
      fiberContent: Number(formData.fiberContent),
      sugarStarchContent: Number(formData.sugarStarchContent),
      contaminationStatus: formData.contaminationStatus,
      collectionDate: formData.collectionDate,
      photoUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      verificationStatus: formData.verificationStatus,
      verificationHash: hash,
      labCertificateNo: `LAB-CIRVAL-2026-${randomSuffix}-ID`,
      additionalNotes: formData.additionalNotes,
      recommendedPathwayId: 'pathway-animal-feed',
      status: 'Valorization Analysis'
    };

    onResourceCreated(newResource);
  };

  const inputClass = `w-full text-xs px-3 py-2.5 rounded-xl border border-[#2a2a2a] bg-[#1b1b1b] text-white placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#c8f542]/40 focus:border-[#c8f542]/60 transition-all duration-200`;
  const labelClass = `block text-[11px] font-bold text-[#8a8a86] mb-1.5 uppercase tracking-wider`;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden"
        style={{
          background: '#111111',
          border: '1px solid #2a2a2a',
          borderRadius: '1.5rem',
          boxShadow: '0 0 0 1px rgba(200,245,66,0.08), 0 32px 80px rgba(0,0,0,0.8)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(16px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      >
        {/* Accent glow */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,245,66,0.5), transparent)' }} />

        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #1e1e1e' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(200,245,66,0.12)', border: '1px solid rgba(200,245,66,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c8f542' }}>
                <FlaskConical size={18} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#fff', margin: 0 }}>
                    Registrasi & Profiling Residu Pangan
                  </h3>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: 'rgba(200,245,66,0.15)', color: '#c8f542', border: '1px solid rgba(200,245,66,0.25)' }}>
                    Langkah {step} dari 2
                  </span>
                </div>
                <p style={{ fontSize: '11px', color: '#8a8a86', margin: '2px 0 0' }}>
                  Lengkapi spesifikasi material untuk menerbitkan CIRVAL Resource Passport
                </p>
              </div>
            </div>
            <button onClick={onClose}
              style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'transparent', border: '1px solid #2a2a2a', color: '#8a8a86', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Step tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '14px', gap: '8px' }}>
            {[
              { n: 1, label: '1. Identitas & Karakteristik Pasokan' },
              { n: 2, label: '2. Fisiko-Kimia & Audit Lab' },
            ].map(({ n, label }) => (
              <button key={n} type="button" onClick={() => setStep(n)}
                style={{ padding: '8px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: 700, border: step === n ? '1px solid rgba(200,245,66,0.4)' : '1px solid #2a2a2a', background: step === n ? 'rgba(200,245,66,0.12)' : 'transparent', color: step === n ? '#c8f542' : '#8a8a86', cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>



        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '20px 24px', maxHeight: '65vh', overflowY: 'auto' }}>
          {step === 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className={labelClass}>Nama Material *</label>
                  <input type="text" required value={formData.materialName}
                    onChange={e => setFormData({ ...formData, materialName: e.target.value })}
                    className={inputClass} placeholder="Contoh: Ampas Kopi, Kulit Pisang..." />
                </div>
                <div>
                  <label className={labelClass}>Kategori Material *</label>
                  <select value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as MaterialCategory })}
                    className={inputClass} style={{ cursor: 'pointer' }}>
                    <option value="Coffee By-Product">Produk Sampingan Kopi (Ampas & Kulit)</option>
                    <option value="Fruit & Vegetable">Buah & Sayuran (Kulit & Sisa)</option>
                    <option value="Grain & Brewery">Serealia & Brewery (Ampas Gandum)</option>
                    <option value="Bakery & Starch">Roti & Pati (Singkong / Tepung Sisa)</option>
                    <option value="Catering & Food Service">Katering & Jasa Boga (Dapur SPPG/MBG)</option>
                    <option value="Oil & Fat Residue">Residu Minyak & Lemak Nabati</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className={labelClass}>Nama Perusahaan / Unit Usaha *</label>
                  <input type="text" required value={formData.sourceBusiness}
                    onChange={e => setFormData({ ...formData, sourceBusiness: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Tipe Entitas *</label>
                  <select value={formData.businessType}
                    onChange={e => setFormData({ ...formData, businessType: e.target.value as any })}
                    className={inputClass} style={{ cursor: 'pointer' }}>
                    <option value="Food Manufacturer">Manufaktur Makanan / Pabrik Olahan</option>
                    <option value="SPPG / MBG Kitchen">Dapur Layanan Makanan SPPG / MBG</option>
                    <option value="Coffee Roastery / Cafe">Roastery Kopi & Jaringan Kafe</option>
                    <option value="Restaurant / Hotel">Restoran & Hotel</option>
                    <option value="Agro-processing">Pengolahan Pertanian & Koperasi</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className={labelClass}>Lokasi Spesifik Fasilitas *</label>
                  <input type="text" required value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className={inputClass} placeholder="Alamat fasilitas penyimpanan residu..." />
                </div>
                <div>
                  <label className={labelClass}>Kota / Kabupaten (Wilayah Pasokan) *</label>
                  <select value={formData.regency}
                    onChange={e => setFormData({ ...formData, regency: e.target.value })}
                    className={inputClass} style={{ cursor: 'pointer' }}>
                    <option value="Bogor, Jawa Barat">Bogor, Jawa Barat (Default Demo)</option>
                    <option value="Bandung, Jawa Barat">Bandung Raya, Jawa Barat</option>
                    <option value="Depok, Jawa Barat">Depok, Jawa Barat</option>
                    <option value="Tangerang, Banten">Tangerang, Banten</option>
                    <option value="Sukabumi, Jawa Barat">Sukabumi, Jawa Barat</option>
                    <option value="Jakarta Timur, DKI Jakarta">Jakarta Timur, DKI Jakarta</option>
                    <option value="Surabaya, Jawa Timur">Surabaya, Jawa Timur</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', padding: '14px', borderRadius: '14px', background: 'rgba(200,245,66,0.04)', border: '1px solid rgba(200,245,66,0.12)' }}>
                <div>
                  <label className={labelClass}>Volume Tersedia *</label>
                  <input type="number" min="1" required value={formData.availableVolume}
                    onChange={e => setFormData({ ...formData, availableVolume: Number(e.target.value) })}
                    className={inputClass} style={{ fontWeight: 700 }} />
                </div>
                <div>
                  <label className={labelClass}>Satuan Volume *</label>
                  <select value={formData.volumeUnit}
                    onChange={e => setFormData({ ...formData, volumeUnit: e.target.value as any })}
                    className={inputClass} style={{ cursor: 'pointer' }}>
                    <option value="kg/hari">kg / hari</option>
                    <option value="kg/minggu">kg / minggu</option>
                    <option value="ton/bulan">ton / bulan</option>
                    <option value="ton/batch">ton / batch</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Frekuensi Suplai *</label>
                  <select value={formData.supplyFrequency}
                    onChange={e => setFormData({ ...formData, supplyFrequency: e.target.value as any })}
                    className={inputClass} style={{ cursor: 'pointer' }}>
                    <option value="Harian (Daily)">Harian</option>
                    <option value="2-3 Hari Sekali">2-3 Hari Sekali</option>
                    <option value="Mingguan (Weekly)">Mingguan</option>
                    <option value="Sesuai Siklus Produksi">Sesuai Siklus Produksi</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4px' }}>
                <button type="button" onClick={() => setStep(2)} className="btn-lime"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                  <span>Lanjut ke Uji Fisiko-Kimia</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(200,245,66,0.06)', border: '1px solid rgba(200,245,66,0.18)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <FlaskConical size={16} style={{ color: '#c8f542', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <span style={{ fontWeight: 700, fontSize: '12px', color: '#c8f542', display: 'block' }}>Input Karakteristik Kimia & Mutu</span>
                  <p style={{ fontSize: '11px', color: '#8a8a86', margin: '2px 0 0' }}>
                    Data ini digunakan Decision Engine untuk mengevaluasi kelayakan teknis pakan, bioenergi, biokomposit, atau ekstraksi.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
                {[
                  { label: 'Kadar Air', key: 'moistureLevel', unit: '%', min: 5, max: 95, step: 1, type: 'number' },
                  { label: 'Serat Kasar', key: 'fiberContent', unit: '%', min: 0, max: 100, step: 0.1, type: 'number' },
                  { label: 'Bahan Organik', key: 'organicMatter', unit: '%', min: 0, max: 100, step: 0.1, type: 'number' },
                ].map(({ label, key, unit, min, max, step: s }) => (
                  <div key={key} style={{ padding: '12px', borderRadius: '12px', background: '#1b1b1b', border: '1px solid #2a2a2a' }}>
                    <label style={{ fontSize: '10px', fontWeight: 700, color: '#8a8a86', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input type="number" min={min} max={max} step={s}
                        value={formData[key as keyof typeof formData] as number}
                        onChange={e => setFormData({ ...formData, [key]: Number(e.target.value) })}
                        style={{ width: '100%', fontSize: '13px', fontWeight: 700, padding: '6px 8px', borderRadius: '8px', border: '1px solid #2a2a2a', background: '#111', color: '#fff', outline: 'none' }} />
                      <span style={{ fontSize: '11px', color: '#8a8a86', flexShrink: 0 }}>{unit}</span>
                    </div>
                  </div>
                ))}
                <div style={{ padding: '12px', borderRadius: '12px', background: '#1b1b1b', border: '1px solid #2a2a2a' }}>
                  <label style={{ fontSize: '10px', fontWeight: 700, color: '#8a8a86', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Rasio C/N</label>
                  <input type="text" value={formData.cnRatio} onChange={e => setFormData({ ...formData, cnRatio: e.target.value })} placeholder="24:1"
                    style={{ width: '100%', fontSize: '13px', fontWeight: 700, padding: '6px 8px', borderRadius: '8px', border: '1px solid #2a2a2a', background: '#111', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className={labelClass}>Status Kontaminasi *</label>
                  <select value={formData.contaminationStatus}
                    onChange={e => setFormData({ ...formData, contaminationStatus: e.target.value as any })}
                    className={inputClass} style={{ cursor: 'pointer' }}>
                    <option value="Bebas Kontaminan Fisik/Kimia">Bebas Kontaminan Fisik/Kimia (Grade A)</option>
                    <option value="Mengandung Kemasan Minimal (<1%)">Kemasan Minimal &lt;1% (Grade B)</option>
                    <option value="Perlu Pemilahan Sederhana">Perlu Pemilahan Sederhana di Lokasi</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Verifikasi Laboratorium *</label>
                  <select value={formData.verificationStatus}
                    onChange={e => setFormData({ ...formData, verificationStatus: e.target.value as any })}
                    className={inputClass} style={{ cursor: 'pointer' }}>
                    <option value="Verified by Lab Partner">Telah Diverifikasi Lab Rekanan CIRVAL</option>
                    <option value="Batch Audited">Audit Batch Berkala</option>
                    <option value="Pending Lab Verification">Menunggu Penjadwalan Uji Lab</option>
                    <option value="Self-Reported with Photos">Laporan Mandiri Disertai Foto Mutu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Catatan Tambahan & Protokol Penanganan</label>
                <textarea rows={2} value={formData.additionalNotes}
                  onChange={e => setFormData({ ...formData, additionalNotes: e.target.value })}
                  className={inputClass} placeholder="Instruksi penanganan, masa simpan maksimum..."
                  style={{ resize: 'none' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #1e1e1e' }}>
                <button type="button" onClick={() => setStep(1)}
                  style={{ padding: '9px 18px', borderRadius: '10px', border: '1px solid #2a2a2a', background: 'transparent', color: '#8a8a86', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                  ← Kembali
                </button>
                <button type="submit" className="btn-lime"
                  style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13px' }}>
                  <Sparkles size={15} />
                  <span>Terbitkan CIRVAL Resource Passport</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
