'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Cpu, 
  QrCode, 
  Share2, 
  Download, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Droplets, 
  Layers, 
  Sparkles,
  ArrowRight,
  Printer,
  FileText
} from 'lucide-react';
import { ResourcePassport } from '../types/cirval';

interface ResourcePassportModalProps {
  resource: ResourcePassport | null;
  isOpen: boolean;
  onClose: () => void;
  onRunEngine: (resource: ResourcePassport) => void;
}

export const ResourcePassportModal: React.FC<ResourcePassportModalProps> = ({
  resource,
  isOpen,
  onClose,
  onRunEngine
}) => {
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

  if (!isOpen || !resource) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}
    >
      <div 
        className="relative w-full max-w-2xl overflow-hidden"
        style={{
          background: '#111111',
          border: '1px solid #2a2a2a',
          borderRadius: '1.75rem',
          boxShadow: '0 0 0 1px rgba(200,245,66,0.1), 0 32px 80px rgba(0,0,0,0.9)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(16px)',
          transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Accent glow line top */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,245,66,0.6), transparent)' }} />

        {/* Top Passport Branding Bar */}
        <div className="p-6 relative overflow-hidden border-b border-[#1f1f1f] bg-gradient-to-r from-[#141b16] via-[#111613] to-[#162118]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-lime/15 text-lime border border-lime/30 tracking-wider">
                  DIGITAL CIRCULAR PASSPORT
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/15 text-amber-400 border border-amber-400/30">
                  PROTOTIPE TERVERIFIKASI
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span>CIRVAL Resource Passport</span>
                <Sparkles className="w-5 h-5 text-lime animate-pulse" />
              </h2>
              <p className="text-xs text-[#8a8a86] font-mono flex items-center gap-2">
                <span>ID: {resource.id}</span>
                <span>•</span>
                <span className="text-lime">{resource.sourceBusiness}</span>
              </p>
            </div>

            <button 
              onClick={onClose}
              className="text-[#8a8a86] hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Passport Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto bg-[#0d0f0e]">
          {/* Main Specs Card */}
          <div className="bg-[#151c17] p-5 rounded-2xl border border-[#253228] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#222d25]">
              <div>
                <span className="text-[11px] font-bold text-lime uppercase tracking-wider block mb-1">
                  {resource.category}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {resource.materialName}
                </h3>
                <div className="text-xs text-[#8a8a86] flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-lime" />
                  <span>{resource.location} ({resource.regency})</span>
                </div>
              </div>

              <div className="text-left sm:text-right bg-[#1b251e] border border-[#2c3d31] p-3 sm:py-2 sm:px-4 rounded-xl">
                <div className="text-[11px] font-bold text-[#8a8a86] uppercase tracking-wider">Volume Terverifikasi</div>
                <div className="text-2xl font-black text-lime">
                  {resource.availableVolume} <span className="text-xs font-semibold text-white/70">{resource.volumeUnit}</span>
                </div>
                <div className="text-[11px] text-[#8a8a86]">{resource.supplyFrequency}</div>
              </div>
            </div>

            {/* Quality & Physicochemical Matrix */}
            <div>
              <div className="text-xs font-bold text-white/90 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-lime" />
                <span>Karakteristik Spesifik Material (Biochemical Profile)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-[#19221b] border border-[#2a382d]">
                  <span className="block text-[10px] text-[#8a8a86] uppercase font-semibold">Kadar Air</span>
                  <span className="text-base font-black text-white">{resource.moistureLevel}%</span>
                  <span className="block text-[10px] text-[#555]">Moisture Content</span>
                </div>

                <div className="p-3 rounded-xl bg-[#19221b] border border-[#2a382d]">
                  <span className="block text-[10px] text-[#8a8a86] uppercase font-semibold">Rasio C/N</span>
                  <span className="text-base font-black text-white">{resource.cnRatio}</span>
                  <span className="block text-[10px] text-[#555]">Carbon-Nitrogen</span>
                </div>

                <div className="p-3 rounded-xl bg-[#19221b] border border-[#2a382d]">
                  <span className="block text-[10px] text-[#8a8a86] uppercase font-semibold">Bahan Organik</span>
                  <span className="text-base font-black text-white">{resource.organicMatter}%</span>
                  <span className="block text-[10px] text-[#555]">Organic Matter</span>
                </div>

                <div className="p-3 rounded-xl bg-[#19221b] border border-[#2a382d]">
                  <span className="block text-[10px] text-[#8a8a86] uppercase font-semibold">Serat Kasar</span>
                  <span className="text-base font-black text-white">{resource.fiberContent}%</span>
                  <span className="block text-[10px] text-[#555]">Crude Fiber</span>
                </div>
              </div>
            </div>

            {/* Audit & Lab Hash Security Bar */}
            <div className="p-3.5 rounded-xl bg-[#0e1310] border border-[#2a382d] text-white flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-lime/10 border border-lime/25 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-lime shrink-0" />
                </div>
                <div className="truncate">
                  <span className="text-lime font-bold block text-[10px] uppercase tracking-wider">
                    VERIFIED CRYPTO HASH (SHA-256)
                  </span>
                  <span className="text-white/80 text-[11px] truncate block font-mono">
                    {resource.verificationHash}
                  </span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-lime text-[#111] shrink-0 ml-3 shadow-[0_0_12px_rgba(200,245,66,0.3)]">
                <QrCode className="w-6 h-6" />
              </div>
            </div>

            {/* Status & Verification Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime/15 text-lime border border-lime/30 font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-lime" />
                {resource.verificationStatus}
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 font-semibold border border-blue-500/30">
                Sertifikat: {resource.labCertificateNo || 'LAB-CIRVAL-ID'}
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-white/70 font-medium border border-white/10">
                {resource.contaminationStatus}
              </span>
            </div>
          </div>

          {/* Potential Valorization Pathways Identified */}
          <div className="bg-[#151c17] p-5 rounded-2xl border border-[#253228] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-lime" />
                <span>Potensi Jalur Valorisasi Awal Terdeteksi</span>
              </h4>
              <span className="text-[11px] text-[#8a8a86]">
                Memerlukan simulasi Decision Engine
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#1b271f] border border-lime/40 flex items-center justify-between shadow-[0_0_15px_rgba(200,245,66,0.06)]">
                <div>
                  <span className="font-bold text-white block">1. Animal Feed (Pakan Ternak)</span>
                  <span className="text-[11px] text-lime">Skor Estimasi: 4.3 / 5.0 (Tinggi)</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-lime text-[#111]">
                  Top Match
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#171f19] border border-[#28352b] flex items-center justify-between">
                <div>
                  <span className="font-bold text-white/90 block">2. Bioenergy (Biogas/Briket)</span>
                  <span className="text-[11px] text-[#8a8a86]">Skor Estimasi: 4.0 / 5.0</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-white/60">
                  Alternatif
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#171f19] border border-[#28352b] flex items-center justify-between">
                <div>
                  <span className="font-bold text-white/90 block">3. Compost & Soil Amendment</span>
                  <span className="text-[11px] text-[#8a8a86]">Skor Estimasi: 3.9 / 5.0</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-white/60">
                  On-site / Hub
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#171f19] border border-[#28352b] flex items-center justify-between">
                <div>
                  <span className="font-bold text-white/90 block">4. Bioactive Compounds</span>
                  <span className="text-[11px] text-[#8a8a86]">Skor Estimasi: 3.8 / 5.0</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-white/60">
                  High Value
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-[#111613] border-t border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#8a8a86]">
            <button 
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 text-white/80 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-lime" />
              <span>Cetak Passport</span>
            </button>
            <span className="text-[#333]">|</span>
            <span>Diperbarui: {new Date().toLocaleDateString('id-ID')}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onRunEngine(resource);
            }}
            className="w-full sm:w-auto btn-lime flex items-center justify-center gap-2 !py-2.5 !px-5 shadow-[0_4px_20px_rgba(200,245,66,0.3)] animate-pulse-lime cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-[#111]" />
            <span>Jalankan Valorization Decision Engine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
