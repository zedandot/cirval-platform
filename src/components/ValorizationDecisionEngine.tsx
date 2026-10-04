'use client';

import React, { useState, useMemo } from 'react';
import { Cpu, Award, Sliders, RefreshCw, ArrowRight, MapPin, Beef, Flame, Sprout, Sparkles, Boxes, Check, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';
import { ResourcePassport, ValorizationPathway } from '../types/cirval';
import { COFFEE_PULP_PATHWAYS } from '../data/mockData';

interface ValorizationDecisionEngineProps {
  activeResource: ResourcePassport;
  onSelectPathwayForMatching: (pathway: ValorizationPathway) => void;
}

const PATHWAY_ICONS: Record<string, React.ElementType> = {
  'Animal Feed': Beef, 'Bioenergy': Flame, 'Compost & Soil Amendment': Sprout,
  'Bioactive Compound Extraction': Sparkles, 'Bio-based Material': Boxes,
};

export const ValorizationDecisionEngine: React.FC<ValorizationDecisionEngineProps> = ({
  activeResource,
  onSelectPathwayForMatching
}) => {
  const [volumeSlider, setVolumeSlider] = useState(activeResource.availableVolume || 500);
  const [moistureSlider, setMoistureSlider] = useState(activeResource.moistureLevel || 68);
  const [selectedLocation, setSelectedLocation] = useState(activeResource.regency || 'Bogor, Jawa Barat');
  const [techWeight, setTechWeight] = useState(3);
  const [economicWeight, setEconomicWeight] = useState(3);
  const [environmentalWeight, setEnvironmentalWeight] = useState(3);
  const [logisticsWeight, setLogisticsWeight] = useState(3);
  const [selectedPathwayId, setSelectedPathwayId] = useState('pathway-animal-feed');

  const calculatedPathways = useMemo(() => {
    return COFFEE_PULP_PATHWAYS.map(p => {
      let t = p.technicalScore, e = p.economicScore, env = p.environmentalScore, l = p.logisticsScore;
      if (moistureSlider > 70) {
        if (p.id === 'pathway-bioenergy') { t = Math.max(2.5, +(t - 0.7).toFixed(1)); e = Math.max(2.0, +(e - 0.6).toFixed(1)); }
        if (p.id === 'pathway-bioactive-compounds') l = Math.max(2.0, +(l - 0.4).toFixed(1));
        if (p.id === 'pathway-animal-feed') t = Math.min(5.0, +(t + 0.1).toFixed(1));
      } else if (moistureSlider < 40) {
        if (p.id === 'pathway-bioenergy') { t = Math.min(5.0, +(t + 0.2).toFixed(1)); e = Math.min(5.0, +(e + 0.5).toFixed(1)); }
        if (p.id === 'pathway-bio-materials') t = Math.min(5.0, +(t + 0.4).toFixed(1));
      }
      if (volumeSlider >= 2000) {
        if (p.id === 'pathway-bioenergy') e = Math.min(5.0, +(e + 0.6).toFixed(1));
        if (p.id === 'pathway-bioactive-compounds') e = Math.max(2.5, +(e - 0.4).toFixed(1));
      } else if (volumeSlider < 200) {
        if (p.id === 'pathway-compost') t = Math.min(5.0, +(t + 0.3).toFixed(1));
        if (p.id === 'pathway-bioenergy') e = Math.max(1.8, +(e - 0.8).toFixed(1));
      }
      if (!selectedLocation.includes('Bogor')) {
        if (p.id === 'pathway-animal-feed') l = Math.max(2.5, +(l - 0.6).toFixed(1));
        if (p.id === 'pathway-bio-materials' && selectedLocation.includes('Bandung')) l = Math.min(5.0, +(l + 0.5).toFixed(1));
      }
      const tw = techWeight + economicWeight + environmentalWeight + logisticsWeight;
      const overall = +((t * techWeight + e * economicWeight + env * environmentalWeight + l * logisticsWeight) / tw).toFixed(1);
      return { ...p, technicalScore: t, economicScore: e, environmentalScore: env, logisticsScore: l, overallScore: overall };
    });
  }, [volumeSlider, moistureSlider, selectedLocation, techWeight, economicWeight, environmentalWeight, logisticsWeight]);

  const bestPathway = useMemo(() => [...calculatedPathways].sort((a, b) => b.overallScore - a.overallScore)[0], [calculatedPathways]);
  const activeDetail = calculatedPathways.find(p => p.id === selectedPathwayId) || calculatedPathways[0];

  const radarData = ['Kelayakan Teknis', 'Potensi Ekonomi', 'Dampak Lingkungan', 'Kelayakan Logistik'].map((subject, i) => {
    const keys: ('technicalScore' | 'economicScore' | 'environmentalScore' | 'logisticsScore')[] = ['technicalScore', 'economicScore', 'environmentalScore', 'logisticsScore'];
    const af = calculatedPathways.find(p => p.id === 'pathway-animal-feed');
    const be = calculatedPathways.find(p => p.id === 'pathway-bioenergy');
    const co = calculatedPathways.find(p => p.id === 'pathway-compost');
    return { subject, 'Animal Feed': af?.[keys[i]] || 0, 'Bioenergy': be?.[keys[i]] || 0, 'Compost': co?.[keys[i]] || 0, fullMark: 5 };
  });

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 space-y-8">
      {/* Header */}
      <div className="card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="badge bg-lime text-[#0a0a0a] font-bold">
                <Cpu className="w-3 h-3" /> Valorization Decision Engine
              </span>
              <span className="badge bg-surface-3 text-muted-2 border border-border">Core Feature</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Analisis Kelayakan <span className="text-lime">Multi-Jalur</span>
            </h1>
            <p className="text-sm text-muted-2 max-w-xl">
              Evaluasi 5 jalur valorisasi berdasarkan parameter teknis, ekonomi, emisi, dan logistik.
            </p>
          </div>
          <div className="card p-4 space-y-1.5 shrink-0 lg:max-w-xs border-lime/20">
            <span className="text-[10px] font-mono text-lime font-bold uppercase tracking-wider">Material Aktif</span>
            <div className="font-bold text-sm truncate">{activeResource.materialName}</div>
            <div className="text-xs text-muted flex gap-3">
              <span>Vol: <b className="text-white">{volumeSlider} kg/hari</b></span>
              <span>Air: <b className="text-white">{moistureSlider}%</b></span>
            </div>
            <div className="text-[11px] text-muted flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {selectedLocation}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Banner */}
      <div className="card p-6 border-lime/30 bg-lime/5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-lime text-[#0a0a0a] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge bg-lime text-[#0a0a0a] font-bold text-[11px]">Recommended Pathway</span>
                <span className="text-sm font-bold">{bestPathway.overallScore} / 5.0</span>
              </div>
              <h2 className="text-xl font-black">{bestPathway.name} — <span className="text-lime">{bestPathway.indonesianName}</span></h2>
              <div className="card p-3 bg-surface text-xs text-muted-2 leading-relaxed space-y-1 max-w-xl">
                <div className="font-bold text-white flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-lime" /> Rasionalisasi Transparan:</div>
                <p>{bestPathway.recommendationRationale || `Direkomendasikan berdasarkan volume ${volumeSlider} kg/hari, kadar air ${moistureSlider}%, dan ketersediaan mitra pengolah di ${selectedLocation}.`}</p>
              </div>
            </div>
          </div>
          <button onClick={() => onSelectPathwayForMatching(bestPathway)} className="btn-lime flex items-center gap-2 text-xs shrink-0 self-start md:self-center">
            Cari Mitra Pengolah <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Pathways + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pathways Cards */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-base font-bold flex items-center gap-2">Perbandingan 5 Jalur</h3>
          {calculatedPathways.map((pw) => {
            const isRec = pw.id === bestPathway.id;
            const isSel = pw.id === selectedPathwayId;
            const Icon = PATHWAY_ICONS[pw.name] || Sparkles;
            return (
              <div key={pw.id} onClick={() => setSelectedPathwayId(pw.id)}
                className={`card p-5 cursor-pointer transition-all ${isRec ? 'border-lime/40 bg-lime/5' : isSel ? 'border-border-2' : 'card-glow'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isRec ? 'bg-lime text-[#0a0a0a]' : 'bg-surface-3 text-muted'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{pw.name}</span>
                        {isRec && <span className="badge bg-lime text-[#0a0a0a] text-[9px] font-bold">RECOMMENDED</span>}
                      </div>
                      <span className="text-[11px] text-muted">{pw.indonesianName}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black">{pw.overallScore}<span className="text-xs text-muted ml-0.5">/ 5</span></div>
                  </div>
                </div>
                {/* Score bars */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Teknis', score: pw.technicalScore, color: 'bg-lime' },
                    { label: 'Ekonomi', score: pw.economicScore, color: 'bg-amber-400' },
                    { label: 'Lingkungan', score: pw.environmentalScore, color: 'bg-teal-400' },
                    { label: 'Logistik', score: pw.logisticsScore, color: 'bg-blue-400' },
                  ].map((d) => (
                    <div key={d.label} className="text-center">
                      <div className="text-[10px] text-muted mb-1">{d.label}</div>
                      <div className="text-xs font-bold mb-1">{d.score}</div>
                      <div className="w-full h-1 rounded-full bg-surface-3 overflow-hidden">
                        <div className={`h-full rounded-full score-bar-fill ${d.color}`} style={{ width: `${(d.score / 5) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Expanded detail */}
                {isSel && (
                  <div className="mt-4 pt-4 border-t border-border space-y-2 fade-up">
                    <div className="text-xs font-bold text-white mb-1">Persyaratan Utama:</div>
                    <ul className="space-y-1 text-xs text-muted-2">
                      {pw.mainRequirements.map((r, i) => <li key={i} className="flex gap-1.5"><Check className="w-3 h-3 text-lime shrink-0 mt-0.5" />{r}</li>)}
                    </ul>
                    <div className="flex justify-between text-[11px] text-muted pt-2">
                      <span>Estimasi: <b className="text-white">{pw.estimatedValuePerKg}</b></span>
                      <span>Mitra: <b className="text-lime">{pw.potentialProcessorType.slice(0, 40)}...</b></span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Radar + Detail */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-lime" /> Radar Multi-Kriteria</h3>
              <span className="text-[10px] font-mono text-muted">0 — 5.0</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#262626" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} stroke="#333" />
                  <Radar name="Animal Feed" dataKey="Animal Feed" stroke="#a3e635" fill="#a3e635" fillOpacity={0.3} />
                  <Radar name="Bioenergy" dataKey="Bioenergy" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.15} />
                  <Radar name="Compost" dataKey="Compost" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.1} />
                  <Tooltip contentStyle={{ background: '#141414', border: '1px solid #333', borderRadius: 12, color: '#fff', fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card p-6 space-y-3 border-lime/20">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-mono text-lime uppercase">Detail Inspeksi</span>
                <div className="text-base font-bold">{activeDetail.name}</div>
              </div>
              <div className="text-xl font-black text-lime">{activeDetail.overallScore}<span className="text-xs text-muted">/ 5</span></div>
            </div>
            <div className="text-xs space-y-2 text-muted-2">
              <p><b className="text-lime">Teknis ({activeDetail.technicalScore}):</b> {activeDetail.technicalNotes}</p>
              <p><b className="text-amber-400">Ekonomi ({activeDetail.economicScore}):</b> {activeDetail.economicNotes}</p>
              <p><b className="text-teal-400">Lingkungan ({activeDetail.environmentalScore}):</b> {activeDetail.environmentalNotes}</p>
              <p><b className="text-blue-400">Logistik ({activeDetail.logisticsScore}):</b> {activeDetail.logisticsNotes}</p>
            </div>
            <button onClick={() => onSelectPathwayForMatching(activeDetail)} className="btn-lime w-full flex items-center justify-center gap-1.5 text-xs !py-2.5">
              Cari Mitra untuk {activeDetail.name} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* What-If Scenario */}
      <div className="card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-lime/10 flex items-center justify-center"><Sliders className="w-4 h-4 text-lime" /></div>
            <div>
              <h3 className="text-lg font-bold">What-if Scenario Simulator</h3>
              <p className="text-xs text-muted">Ubah parameter — skor di atas otomatis terhitung ulang real-time</p>
            </div>
          </div>
          <button onClick={() => { setVolumeSlider(activeResource.availableVolume || 500); setMoistureSlider(activeResource.moistureLevel || 68); setSelectedLocation(activeResource.regency || 'Bogor, Jawa Barat'); setTechWeight(3); setEconomicWeight(3); setEnvironmentalWeight(3); setLogisticsWeight(3); }}
            className="btn-outline text-xs flex items-center gap-1.5 !py-2 !px-3"><RefreshCw className="w-3 h-3" /> Reset</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-3 p-4 rounded-xl bg-surface-2 border border-border">
            <div className="flex justify-between text-xs"><span className="text-muted-2 font-semibold">Volume Harian</span><span className="font-mono font-bold text-lime">{volumeSlider} kg/hari</span></div>
            <input type="range" min="50" max="3000" step="50" value={volumeSlider} onChange={e => setVolumeSlider(Number(e.target.value))} className="w-full accent-lime" />
            <div className="flex justify-between text-[10px] text-muted"><span>50 kg</span><span>3.000 kg</span></div>
          </div>
          <div className="space-y-3 p-4 rounded-xl bg-surface-2 border border-border">
            <div className="flex justify-between text-xs"><span className="text-muted-2 font-semibold">Kadar Air (Moisture)</span><span className="font-mono font-bold text-lime">{moistureSlider}%</span></div>
            <input type="range" min="10" max="85" value={moistureSlider} onChange={e => setMoistureSlider(Number(e.target.value))} className="w-full accent-lime" />
            <div className="flex justify-between text-[10px] text-muted"><span>10% Kering</span><span>85% Basah</span></div>
          </div>
          <div className="space-y-3 p-4 rounded-xl bg-surface-2 border border-border">
            <div className="text-xs text-muted-2 font-semibold mb-1">Lokasi Pasokan</div>
            <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-lg bg-surface border border-border text-white focus:outline-none focus:border-lime/40 font-medium">
              <option value="Bogor, Jawa Barat">Bogor (Hub Pakan Ternak)</option>
              <option value="Bandung Raya, Jawa Barat">Bandung (Biokomposit)</option>
              <option value="Sukabumi, Jawa Barat">Sukabumi (Agro)</option>
              <option value="Tangerang, Banten">Tangerang (Industri)</option>
              <option value="Surabaya, Jawa Timur">Surabaya (Industri Timur)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="text-xs font-bold text-muted-2 mb-3">Bobot Prioritas Keputusan</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Teknis', val: techWeight, set: setTechWeight, c: 'text-lime' },
              { label: 'Ekonomi', val: economicWeight, set: setEconomicWeight, c: 'text-amber-400' },
              { label: 'Lingkungan', val: environmentalWeight, set: setEnvironmentalWeight, c: 'text-teal-400' },
              { label: 'Logistik', val: logisticsWeight, set: setLogisticsWeight, c: 'text-blue-400' },
            ].map((w) => (
              <div key={w.label}>
                <div className="flex justify-between text-xs mb-1"><span className="text-muted-2">{w.label}</span><span className={`font-bold ${w.c}`}>{w.val}x</span></div>
                <input type="range" min="1" max="5" value={w.val} onChange={e => w.set(Number(e.target.value))} className="w-full accent-lime" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
