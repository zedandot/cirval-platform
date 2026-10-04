'use client';

import React, { useState } from 'react';
import { Building2, MapPin, Sparkles, ArrowRight, Filter, ShieldCheck } from 'lucide-react';
import { ProcessorPartner, ValorizationPathway, ResourcePassport } from '../types/cirval';
import { MATCHING_PARTNERS } from '../data/mockData';

interface PathwayMatchingProps {
  selectedPathway: ValorizationPathway;
  resource: ResourcePassport;
  onRequestTransaction: (partner: ProcessorPartner) => void;
  onBackToDecisionEngine: () => void;
}

export const PathwayMatching: React.FC<PathwayMatchingProps> = ({
  selectedPathway, resource, onRequestTransaction, onBackToDecisionEngine
}) => {
  const [filterRadius, setFilterRadius] = useState(50);
  const [minCompat, setMinCompat] = useState(85);

  const matched = MATCHING_PARTNERS.filter(p => {
    const spec = p.pathwaySpecialty.toLowerCase().includes(selectedPathway.name.toLowerCase()) || p.compatibilityScore > 88;
    return spec && p.distanceKm <= filterRadius && p.compatibilityScore >= minCompat;
  }).sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 space-y-6">
      {/* Header */}
      <div className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button onClick={onBackToDecisionEngine} className="text-xs text-lime hover:underline mb-1 block">← Kembali ke Mesin Keputusan</button>
          <h1 className="text-2xl font-black">Mitra untuk: <span className="text-lime">{selectedPathway.indonesianName}</span></h1>
          <p className="text-xs text-muted mt-1">
            Material: <b>{resource.materialName}</b> • {resource.availableVolume} {resource.volumeUnit}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-2 border border-border">
            <Filter className="w-3.5 h-3.5 text-muted" />
            <span className="text-muted text-[11px]">Radius:</span>
            <select value={filterRadius} onChange={e => setFilterRadius(Number(e.target.value))}
              className="bg-transparent text-white text-xs font-medium focus:outline-none">
              <option value="25">&lt; 25 km</option><option value="50">&lt; 50 km</option><option value="100">&lt; 100 km</option>
            </select>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-2 border border-border">
            <span className="text-muted text-[11px]">Min. Kompatibel:</span>
            <select value={minCompat} onChange={e => setMinCompat(Number(e.target.value))}
              className="bg-transparent text-white text-xs font-medium focus:outline-none">
              <option value="80">&gt; 80%</option><option value="90">&gt; 90%</option><option value="95">&gt; 95%</option>
            </select>
          </div>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {matched.map(p => (
          <div key={p.id} className="card p-6 card-glow flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">{p.companyType}</span>
                <span className="badge bg-surface-3 text-muted-2 border border-border text-[10px]">
                  <MapPin className="w-3 h-3" /> {p.distanceKm} km
                </span>
              </div>
              <h3 className="text-base font-bold">{p.companyName}</h3>
              <span className="text-xs text-muted">{p.regency}, {p.province || 'Jawa Barat'}</span>

              {/* Compatibility */}
              <div className="mt-3 p-3 rounded-xl bg-lime/5 border border-lime/20 flex items-center justify-between">
                <div className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-lime" /><span className="text-xs font-bold">Kompatibilitas</span></div>
                <span className="text-lg font-black font-mono text-lime">{p.compatibilityScore}%</span>
              </div>

              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-muted">Volume:</span><span className="font-semibold">{p.requiredVolume}</span></div>
                <div className="flex justify-between"><span className="text-muted">Harga:</span><span className="font-bold text-lime">Rp {p.indicativePriceRp.toLocaleString('id-ID')}/kg</span></div>
                <div className="flex justify-between"><span className="text-muted">Standar:</span><span className="font-medium truncate ml-2">{p.isoOrLabCert}</span></div>
              </div>
            </div>

            <div className="pt-3 border-t border-border space-y-2">
              <button onClick={() => onRequestTransaction(p)} className="btn-lime w-full flex items-center justify-center gap-1.5 text-xs !py-2.5">
                <Building2 className="w-4 h-4" /> Ajukan Transaksi <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted">
                <ShieldCheck className="w-3 h-3 text-lime" /> Terverifikasi
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
