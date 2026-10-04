'use client';

import React from 'react';
import { PlusCircle, Cpu, Layers, Building2, TrendingUp, ArrowRight, FileText } from 'lucide-react';
import { ResourcePassport } from '../types/cirval';
import { ActiveTab } from './Navbar';
import { SupplyAggregation } from './SupplyAggregation';

interface DashboardViewProps {
  resources: ResourcePassport[];
  onOpenAddResource: () => void;
  onSelectResourceForEngine: (resource: ResourcePassport) => void;
  onOpenResourcePassport: (resource: ResourcePassport) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  resources,
  onOpenAddResource,
  onSelectResourceForEngine,
  onOpenResourcePassport,
  setActiveTab
}) => {
  const STATUS_STYLE: Record<string, string> = {
    'Valorization Analysis': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Matching': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Processor Confirmed': 'bg-lime/10 text-lime border-lime/20',
    'In Logistics': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Valorized': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  const STATUS_LABEL: Record<string, string> = {
    'Valorization Analysis': 'Analisis Valorisasi',
    'Matching': 'Pencocokan Mitra',
    'Processor Confirmed': 'Mitra Terkonfirmasi',
    'In Logistics': 'Dalam Pengiriman',
    'Valorized': 'Telah Tervalorisasi',
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 space-y-8">
      {/* Welcome */}
      <div className="card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-lime/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="badge bg-lime/10 text-lime border border-lime/20 text-[10px]">PRODUCER ACCOUNT • BOGOR</span>
            <h1 className="text-3xl font-black tracking-tight">
              Selamat Sore, <span className="text-lime">PT Nusantara Food</span>
            </h1>
            <p className="text-sm text-muted-2 max-w-lg">
              Kelola residual sisa pangan, tinjau Decision Engine, dan pantau pengalihan ke mitra sirkular terverifikasi.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button onClick={onOpenAddResource} className="btn-lime flex items-center gap-2 text-xs">
              <PlusCircle className="w-4 h-4" /> Analisis Sisa Baru
            </button>
            <button onClick={() => setActiveTab('valorization')} className="btn-outline flex items-center gap-2 text-xs">
              <Cpu className="w-4 h-4 text-lime" /> Decision Engine
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
                  { label: 'Residual Aktif', value: resources.length, unit: 'Listing', icon: Layers, color: 'text-lime' },
          { label: 'Dalam Valorisasi', value: 2, unit: 'Batch', icon: Cpu, color: 'text-amber-400' },
          { label: 'Pencocokan Aktif', value: 5, unit: 'Mitra', icon: Building2, color: 'text-blue-400' },
          { label: 'Nilai Sirkular', value: 'Rp 6,8', unit: 'Juta', icon: TrendingUp, color: 'text-lime' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">{kpi.label}</span>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight">
                {kpi.value} <span className="text-sm font-medium text-muted">{kpi.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Resources List */}
      <div className="card p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h2 className="text-lg font-bold">Residual Aktif Anda</h2>
          <button onClick={onOpenAddResource} className="text-xs font-semibold text-lime hover:underline flex items-center gap-1">
            + Tambah Residu Baru
          </button>
        </div>

        <div className="space-y-3">
          {resources.map((res) => (
            <div key={res.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-surface-2 border border-border hover:border-border-2 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-lime/10 text-lime flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm">{res.materialName}</span>
                    <span className={`badge text-[10px] border ${STATUS_STYLE[res.status] || 'bg-surface-3 text-muted border-border'}`}>
                      {STATUS_LABEL[res.status] || res.status}
                    </span>
                  </div>
                  <div className="text-xs text-muted mt-1 flex flex-wrap gap-3">
                    <span>{res.availableVolume} {res.volumeUnit}</span>
                    <span>•</span>
                    <span>Kelembaban: {res.moistureLevel}%</span>
                    <span>•</span>
                    <span className="font-mono text-muted">{res.id}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => onOpenResourcePassport(res)} className="btn-outline !py-1.5 !px-3 text-xs flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Paspor
                </button>
                <button onClick={() => onSelectResourceForEngine(res)} className="btn-lime !py-1.5 !px-3 text-xs flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" /> Analisis <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supply Aggregation */}
      <SupplyAggregation />
    </div>
  );
};
