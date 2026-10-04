'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, QrCode, RotateCcw } from 'lucide-react';
import { CircularTransaction } from '../types/cirval';
import { DEMO_TRANSACTIONS } from '../data/mockData';

interface TransactionTraceabilityProps {
  onOpenFeedback: (transaction: CircularTransaction) => void;
}

export const TransactionTraceability: React.FC<TransactionTraceabilityProps> = ({ onOpenFeedback }) => {
  const [selectedTxId, setSelectedTxId] = useState(DEMO_TRANSACTIONS[0].id);
  const tx = DEMO_TRANSACTIONS.find(t => t.id === selectedTxId) || DEMO_TRANSACTIONS[0];

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 space-y-6">
      {/* Header */}
      <div className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="badge bg-lime/10 text-lime border border-lime/20 text-[10px] mb-1">JEJAK SIRKULAR DIGITAL</span>
          <h1 className="text-2xl font-black">Transaksi & <span className="text-lime">Keterlacakan</span></h1>
          <p className="text-xs text-muted mt-1">Rekam jejak digital dari pendaftaran residual hingga produk sumber daya sekunder tercipta.</p>
        </div>
        <select value={selectedTxId} onChange={e => setSelectedTxId(e.target.value)}
          className="text-xs font-mono px-3 py-2 rounded-lg bg-surface-2 border border-border text-white focus:outline-none focus:border-lime/40">
          {DEMO_TRANSACTIONS.map(t => <option key={t.id} value={t.id}>{t.id} — {t.materialName.slice(0, 24)}...</option>)}
        </select>
      </div>

      {/* Transaction Overview */}
      <div className="card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="badge bg-surface-3 text-lime border border-lime/20 font-mono text-[10px]">{tx.id}</span>
              <span className="text-[10px] text-muted font-mono">{tx.resourceId}</span>
            </div>
            <h2 className="text-xl font-bold">{tx.materialName}</h2>
            <div className="text-xs text-muted flex gap-2">
              <span>Pemasok: <b className="text-white">{tx.supplierName}</b></span>
              <span>→</span>
              <span>Pengolah: <b className="text-lime">{tx.processorName}</b></span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {[
              { label: 'Volume', val: `${tx.volumeKg.toLocaleString()} kg` },
              { label: 'Total Nilai', val: `Rp ${tx.totalPriceRp.toLocaleString()}` },
              { label: 'Jalur', val: tx.valorizationPathway.split('(')[0] },
              { label: 'CO2e Dihindari', val: `+${tx.carbonAvoidedTon} Ton` },
            ].map(d => (
              <div key={d.label} className="p-3 rounded-lg bg-surface-2 border border-border">
                <span className="text-[10px] text-muted block">{d.label}</span>
                <span className="font-bold text-sm">{d.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-lime" /> Rantai Kustodian</h3>
            <span className="text-[10px] font-mono text-muted">{tx.processingStatus}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {tx.traceabilityTimeline.map(item => {
              const isC = item.status === 'completed';
              const isCur = item.status === 'current';
              return (
                <div key={item.step} className={`card p-4 space-y-2 ${isCur ? 'border-amber-400/40 bg-amber-500/5' : isC ? 'border-lime/20 bg-lime/5' : 'opacity-50'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${isC ? 'bg-lime text-[#0a0a0a]' : isCur ? 'bg-amber-400 text-[#0a0a0a] animate-pulse' : 'bg-surface-3 text-muted'}`}>
                      {isC ? <CheckCircle2 className="w-3.5 h-3.5" /> : item.step}
                    </span>
                    <span className="text-[9px] font-mono text-muted">0{item.step}</span>
                  </div>
                  <div className="text-xs font-bold leading-snug">{item.title}</div>
                  <div className="text-[10px] text-muted">{item.indonesianTitle}</div>
                  {item.timestamp && <div className="text-[9px] font-mono text-muted pt-1 border-t border-border">{item.timestamp}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="card p-4 bg-surface-2 flex items-center justify-between border-lime/10">
          <div className="flex items-center gap-2 text-xs text-muted">
            <QrCode className="w-4 h-4 text-lime" />
            <span className="font-mono text-[10px]">{tx.resourceId}-CHAIN</span>
          </div>
          <button onClick={() => onOpenFeedback(tx)} className="btn-lime text-xs !py-2 !px-4 flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            {tx.feedbackSubmitted ? 'Lihat Umpan Balik' : 'Kirim Umpan Balik'}
          </button>
        </div>
      </div>
    </div>
  );
};
