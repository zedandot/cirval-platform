'use client';

import React, { useState } from 'react';
import { Plus, MapPin, CheckCircle2, Info } from 'lucide-react';
import { AggregationOpportunity } from '../types/cirval';
import { DEMO_AGGREGATION } from '../data/mockData';

export const SupplyAggregation: React.FC = () => {
  const [agg, setAgg] = useState<AggregationOpportunity>(DEMO_AGGREGATION);
  const [adding, setAdding] = useState(false);
  const [done, setDone] = useState(false);

  const handleRecruit = () => {
    setAdding(true);
    setTimeout(() => {
      setAgg(prev => ({
        ...prev, currentAggregatedKgWeek: 500, percentageFulfilled: 100, shortfallKgWeek: 0,
        suggestedAction: 'Kuota 500 kg/minggu terpenuhi 100%. Rute kolektif siap dijadwalkan.',
        status: 'Ready for Pickup',
        participatingSuppliers: [...prev.participatingSuppliers, { businessName: 'Bisnis D (Katering Melati Sentul)', volumeKgWeek: 50, location: 'Sentul City', distanceFromHubKm: 4.8 }]
      }));
      setAdding(false);
      setDone(true);
    }, 800);
  };

  return (
    <div className="card p-6 sm:p-8 space-y-5">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px]">Core Feature 4</span>
          </div>
          <h2 className="text-lg font-bold mt-1">Supply Aggregation Engine</h2>
          <p className="text-xs text-muted">Gabungkan sisa pangan dari beberapa bisnis berdekatan untuk memenuhi kuota pengolah.</p>
        </div>
        <span className={`badge text-[10px] border ${agg.percentageFulfilled === 100 ? 'bg-lime/10 text-lime border-lime/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
          {agg.percentageFulfilled === 100 ? 'Siap Angkut' : 'Agregasi'}
        </span>
      </div>

      {/* Progress */}
      <div className="p-4 rounded-xl bg-surface-2 border border-border space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-muted">Target: <b className="text-white">{agg.processorName}</b> — {agg.requiredVolumeKgWeek} kg/mgg</span>
          <span className="font-mono font-bold text-lime">{agg.currentAggregatedKgWeek} kg ({agg.percentageFulfilled}%)</span>
        </div>
        <div className="w-full h-2 rounded-full bg-surface-3 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ${agg.percentageFulfilled === 100 ? 'bg-lime' : 'bg-gradient-to-r from-lime to-amber-400'}`}
            style={{ width: `${agg.percentageFulfilled}%` }} />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted"><Info className="w-3 h-3 text-blue-400" />{agg.suggestedAction}</div>
      </div>

      {/* Suppliers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {agg.participatingSuppliers.map((s, i) => (
          <div key={i} className="card p-3.5 space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-muted font-semibold">#{i + 1}</span>
              <span className="font-mono font-bold text-lime">{s.volumeKgWeek} kg/mgg</span>
            </div>
            <div className="text-xs font-bold truncate">{s.businessName}</div>
            <div className="text-[11px] text-muted flex items-center gap-1"><MapPin className="w-3 h-3" />{s.location} ({s.distanceFromHubKm} km)</div>
          </div>
        ))}

        {agg.shortfallKgWeek > 0 && (
          <div className="card p-3.5 border-dashed border-amber-500/40 bg-amber-500/5 flex flex-col justify-between space-y-2">
            <div>
              <div className="text-[10px] font-bold text-amber-400">Tambahan {agg.shortfallKgWeek} kg Ditemukan</div>
              <div className="text-[11px] text-muted">Katering di Sentul (4.8 km)</div>
            </div>
            <button onClick={handleRecruit} disabled={adding}
              className="btn-lime w-full text-xs !py-1.5 flex items-center justify-center gap-1">
              <Plus className="w-3 h-3" /> {adding ? 'Menggabungkan...' : 'Gabungkan'}
            </button>
          </div>
        )}
      </div>

      {done && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-lime/10 border border-lime/20 text-xs fade-up">
          <CheckCircle2 className="w-5 h-5 text-lime shrink-0" />
          <span><b>Agregasi Berhasil 100%.</b> Biaya logistik berkurang 34% dengan rute kolektif.</span>
        </div>
      )}
    </div>
  );
};
