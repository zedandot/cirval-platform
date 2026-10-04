'use client';

import React from 'react';
import { Recycle, Sparkles, Leaf, TrendingUp, ShieldCheck, Building2, Download } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { IMPACT_METRICS } from '../data/mockData';

const PIE_COLORS = ['#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#3f6212'];

export const ImpactDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10 space-y-8">
      {/* Header */}
      <div className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge bg-lime/10 text-lime border border-lime/20 text-[10px]">DASBOR DAMPAK SIRKULAR</span>
            <span className="badge bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px]">DATA PROTOTIPE</span>
          </div>
          <h1 className="text-2xl font-black">Dampak <span className="text-lime">Sirkular</span></h1>
          <p className="text-xs text-muted mt-1">Monitoring pengalihan sisa pangan, pembentukan sumber daya sekunder, dan reduksi emisi karbon.</p>
        </div>
        <button onClick={() => alert('Laporan ESG berhasil diunduh (Simulasi).')}
          className="btn-outline flex items-center gap-2 text-xs"><Download className="w-3.5 h-3.5" /> Ekspor Laporan ESG</button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Residu Teralihkan', value: IMPACT_METRICS.totalResidualsDivertedTon, unit: 'Ton', icon: Recycle, color: 'text-lime', sub: '+18,4% dari bulan lalu' },
          { label: 'Sumber Daya Sekunder', value: IMPACT_METRICS.totalSecondaryResourcesTon, unit: 'Ton', icon: Sparkles, color: 'text-lime', sub: 'Yield rata-rata 75,6%' },
          { label: 'Emisi Dihindari', value: IMPACT_METRICS.estimatedEmissionsAvoidedTon, unit: 'Ton CO2e', icon: Leaf, color: 'text-teal-400', sub: 'Metodologi ISO 14064' },
          { label: 'Nilai Ekonomi', value: `Rp ${(IMPACT_METRICS.estimatedEconomicValueRp / 1000000).toFixed(1)}`, unit: 'Juta', icon: TrendingUp, color: 'text-amber-400', sub: 'Nilai transaksi sirkular' },
          { label: 'Transaksi Tercatat', value: IMPACT_METRICS.totalCircularTransactions, unit: 'Batch', icon: ShieldCheck, color: 'text-blue-400', sub: '100% terlacak digital' },
          { label: 'Jaringan Aktif', value: IMPACT_METRICS.activeBusinessesCount, unit: 'Mitra', icon: Building2, color: 'text-purple-400', sub: '42 Pengolah, 8 Lab Uji' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">{kpi.label}</span>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight">
                {kpi.value} <span className="text-sm font-medium text-muted">{kpi.unit}</span>
              </div>
              <div className="text-[11px] text-muted">{kpi.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-7 card p-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold">Tren Bulanan Valorisasi & Emisi</h3>
            <p className="text-[11px] text-muted">Semester 1 2026</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={IMPACT_METRICS.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a3e635" stopOpacity={0.5} /><stop offset="95%" stopColor="#a3e635" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gEm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} /><stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#71717a' }} />
                <YAxis tick={{ fontSize: 10, fill: '#71717a' }} />
                <Tooltip contentStyle={{ background: '#141414', border: '1px solid #333', borderRadius: 12, color: '#fff', fontSize: 11 }} />
                <Legend wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
                <Area type="monotone" dataKey="residualsTon" name="Residu Tervalorisasi (Ton)" stroke="#a3e635" fill="url(#gRes)" />
                <Area type="monotone" dataKey="emissionsTon" name="Emisi Dihindari (Ton CO2e)" stroke="#2dd4bf" fill="url(#gEm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie */}
        <div className="lg:col-span-5 card p-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold">Distribusi Kategori Residu</h3>
            <p className="text-[11px] text-muted">Proporsi volume berdasarkan jenis material</p>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={IMPACT_METRICS.categoryBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="volumeTon">
                  {IMPACT_METRICS.categoryBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#141414', border: '1px solid #333', borderRadius: 12, color: '#fff', fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 text-xs">
            {IMPACT_METRICS.categoryBreakdown.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} /><span className="text-muted-2 truncate max-w-[180px]">{c.name}</span></div>
                <span className="font-mono font-bold">{c.volumeTon} T</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pathway Distribution */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div><h3 className="text-sm font-bold">Distribusi Jalur Valorisasi</h3><p className="text-[11px] text-muted">Frekuensi & nilai ekonomi per jalur</p></div>
          <span className="text-xs text-lime font-semibold">Akurasi Engine: {IMPACT_METRICS.averageFeasibilityAccuracyPercent}%</span>
        </div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={IMPACT_METRICS.pathwayDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="pathway" tick={{ fontSize: 9, fill: '#71717a' }} />
              <YAxis tick={{ fontSize: 10, fill: '#71717a' }} />
              <Tooltip contentStyle={{ background: '#141414', border: '1px solid #333', borderRadius: 12, color: '#fff', fontSize: 11 }} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="count" name="Transaksi" fill="#a3e635" radius={[4, 4, 0, 0]} />
              <Bar dataKey="valueMioRp" name="Nilai (Jt Rp)" fill="#fbbf24" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
