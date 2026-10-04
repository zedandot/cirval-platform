'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  RotateCcw, 
  Cpu, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  Layers, 
  Scale, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import { CircularTransaction, FeedbackData } from '../types/cirval';
import { DEMO_FEEDBACK_RECORD } from '../data/mockData';

interface FeedbackLoopModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: CircularTransaction | null;
  onSubmitFeedback: (data: FeedbackData) => void;
}

export const FeedbackLoopModal: React.FC<FeedbackLoopModalProps> = ({
  isOpen,
  onClose,
  transaction,
  onSubmitFeedback
}) => {
  const [formData, setFormData] = useState({
    actualYieldPercent: 78.5,
    actualProcessingCostPerKg: 380,
    qualityResult: 'Grade A (Exceeds Spec)' as const,
    rejectionRatePercent: 1.5,
    finalOutputQuantity: '1.180 kg Pelet Konsentrat',
    finalOutputGrade: 'Kadar Protein 24.2%, pH Stabil 6.8',
    processingTimeDays: 3,
    operationalNotes: 'Material ampas kopi sangat homogen, fermentasi anaerobik berlangsung cepat tanpa bau menyengat.',
    algorithmWeightShift: 'Meningkatkan bobot kelayakan teknis pengolahan silase ampas kopi untuk batch berikutnya sebesar +0.15 poin.'
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
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

  if (!isOpen || !transaction) return null;

  const inputClass = `w-full text-xs px-3 py-2.5 rounded-xl border border-[#2a2a2a] bg-[#1b1b1b] text-white placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#c8f542]/40 focus:border-[#c8f542]/60 transition-all duration-200`;
  const labelClass = `block text-[11px] font-bold text-[#8a8a86] mb-1.5 uppercase tracking-wider`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: FeedbackData = {
      transactionId: transaction.id,
      processorName: transaction.processorName,
      actualYieldPercent: Number(formData.actualYieldPercent),
      actualProcessingCostPerKg: Number(formData.actualProcessingCostPerKg),
      qualityResult: formData.qualityResult,
      rejectionRatePercent: Number(formData.rejectionRatePercent),
      finalOutputQuantity: formData.finalOutputQuantity,
      finalOutputGrade: formData.finalOutputGrade,
      processingTimeDays: Number(formData.processingTimeDays),
      operationalNotes: formData.operationalNotes,
      algorithmCalibrationEffect: formData.algorithmWeightShift
    };

    setIsSubmitted(true);
    setTimeout(() => {
      onSubmitFeedback(newFeedback);
      onClose();
    }, 1200);
  };

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
        {/* Accent glow line top */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,245,66,0.5), transparent)' }} />

        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #1e1e1e' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '10px', fontWeight: 700, background: 'rgba(200,245,66,0.15)', color: '#c8f542', border: '1px solid rgba(200,245,66,0.3)', display: 'flex', alignItems: 'center', gap: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  <RotateCcw size={10} /> Fitur Inti 7
                </span>
                <span style={{ fontSize: '11px', color: '#555', fontFamily: 'monospace' }}>
                  {transaction.id}
                </span>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#fff', margin: 0 }}>
                Umpan Balik & Loop Pembelajaran Algoritma
              </h2>
              <p style={{ fontSize: '11px', color: '#8a8a86', margin: '4px 0 0' }}>
                Pengumpulan data empiris pasca-pengolahan untuk melatih akurasi Valorization Decision Engine
              </p>
            </div>
            <button onClick={onClose}
              style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'transparent', border: '1px solid #2a2a2a', color: '#8a8a86', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Flow diagram */}
        <div style={{ padding: '12px 24px', borderBottom: '1px solid #1e1e1e', background: 'rgba(200,245,66,0.03)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center', marginBottom: '8px' }}>
            Mekanisme Pembelajaran Tertutup (Closed Learning Architecture)
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            {[
              { label: 'Data Material', color: '#1b1b1b', border: '#2a2a2a', text: '#c4c4be' },
              null,
              { label: 'Rekomendasi CIRVAL', color: 'rgba(200,245,66,0.1)', border: 'rgba(200,245,66,0.3)', text: '#c8f542' },
              null,
              { label: 'Transaksi', color: '#1b1b1b', border: '#2a2a2a', text: '#c4c4be' },
              null,
              { label: 'Hasil Aktual', color: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', text: '#93c5fd' },
              null,
              { label: 'Umpan Balik', color: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.3)', text: '#fbbf24' },
              null,
              { label: 'Rekomendasi Lebih Baik ↑', color: '#c8f542', border: '#c8f542', text: '#111' },
            ].map((item, i) =>
              item === null
                ? <span key={i} style={{ fontSize: '10px', color: '#555' }}>→</span>
                : <span key={i} style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: item.color, border: `1px solid ${item.border}`, color: item.text }}>{item.label}</span>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '58vh', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className={labelClass}>Hasil Produksi Aktual (Yield) *</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input type="number" step="0.1" required value={formData.actualYieldPercent}
                  onChange={e => setFormData({ ...formData, actualYieldPercent: Number(e.target.value) })}
                  className={inputClass} style={{ fontWeight: 700 }} />
                <span style={{ fontSize: '12px', color: '#8a8a86', flexShrink: 0 }}>%</span>
              </div>
              <span style={{ fontSize: '10px', color: '#555', display: 'block', marginTop: '3px' }}>Persentase konversi bahan baku ke produk</span>
            </div>
            <div>
              <label className={labelClass}>Biaya Pengolahan Aktual (Biaya / kg) *</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: '#8a8a86', flexShrink: 0 }}>Rp</span>
                <input type="number" required value={formData.actualProcessingCostPerKg}
                  onChange={e => setFormData({ ...formData, actualProcessingCostPerKg: Number(e.target.value) })}
                  className={inputClass} style={{ fontWeight: 700 }} />
                <span style={{ fontSize: '11px', color: '#8a8a86', flexShrink: 0 }}>/kg</span>
              </div>
              <span style={{ fontSize: '10px', color: '#555', display: 'block', marginTop: '3px' }}>Biaya energi, inokulan, dan tenaga kerja</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className={labelClass}>Hasil Uji Kualitas Akhir *</label>
              <select value={formData.qualityResult}
                onChange={e => setFormData({ ...formData, qualityResult: e.target.value as any })}
                className={inputClass} style={{ cursor: 'pointer' }}>
                <option value="Grade A (Exceeds Spec)">Grade A (Melampaui Standar Spesifikasi)</option>
                <option value="Grade B (Meets Spec)">Grade B (Sesuai Standar Mutu)</option>
                <option value="Grade C (Minor Defect)">Grade C (Terdapat Deviasi Minor)</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Tingkat Penolakan / Residu *</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input type="number" step="0.1" required value={formData.rejectionRatePercent}
                  onChange={e => setFormData({ ...formData, rejectionRatePercent: Number(e.target.value) })}
                  className={inputClass} style={{ fontWeight: 700 }} />
                <span style={{ fontSize: '12px', color: '#8a8a86', flexShrink: 0 }}>%</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className={labelClass}>Kuantitas Output Akhir *</label>
              <input type="text" required value={formData.finalOutputQuantity}
                onChange={e => setFormData({ ...formData, finalOutputQuantity: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Durasi Pengolahan *</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input type="number" min="1" required value={formData.processingTimeDays}
                  onChange={e => setFormData({ ...formData, processingTimeDays: Number(e.target.value) })}
                  className={inputClass} style={{ fontWeight: 700 }} />
                <span style={{ fontSize: '11px', color: '#8a8a86', flexShrink: 0 }}>hari</span>
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>Catatan Operasional & Karakteristik Batch</label>
            <textarea rows={2} value={formData.operationalNotes}
              onChange={e => setFormData({ ...formData, operationalNotes: e.target.value })}
              className={inputClass} style={{ resize: 'none' }} />
          </div>

          {/* Algorithm calibration info */}
          <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(200,245,66,0.06)', border: '1px solid rgba(200,245,66,0.18)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Sparkles size={16} style={{ color: '#c8f542', flexShrink: 0, marginTop: 2 }} />
            <div>
              <span style={{ fontWeight: 700, fontSize: '12px', color: '#c8f542', display: 'block' }}>
                Efek Kalibrasi Pembelajaran Algoritma CIRVAL:
              </span>
              <p style={{ fontSize: '11px', color: '#8a8a86', margin: '3px 0 0' }}>
                {formData.algorithmWeightShift}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '4px', borderTop: '1px solid #1e1e1e' }}>
            <button type="button" onClick={onClose}
              style={{ padding: '9px 18px', borderRadius: '10px', border: '1px solid #2a2a2a', background: 'transparent', color: '#8a8a86', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
              Batal
            </button>
            <button type="submit" disabled={isSubmitted} className="btn-lime"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', opacity: isSubmitted ? 0.7 : 1 }}>
              <RotateCcw size={14} style={{ animation: isSubmitted ? 'spin 1s linear infinite' : 'none' }} />
              <span>{isSubmitted ? 'Mengkalibrasi Engine...' : 'Kirim Umpan Balik & Latih Engine'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
