'use client';

import React, { useState } from 'react';
import {
  Building2,
  Search,
  MapPin,
  ShieldCheck,
  Cpu,
  ArrowRight,
  FileText
} from 'lucide-react';
import { ResourcePassport } from '../types/cirval';

interface MarketplaceViewProps {
  resources: ResourcePassport[];
  onSelectResourceForEngine: (resource: ResourcePassport) => void;
  onOpenResourcePassport: (resource: ResourcePassport) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  resources,
  onSelectResourceForEngine,
  onOpenResourcePassport
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [maxMoisture, setMaxMoisture] = useState<number>(90);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.sourceBusiness.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || res.regency.includes(selectedLocation);
    const matchesMoisture = res.moistureLevel <= maxMoisture;
    const matchesVerification = !onlyVerified || res.verificationStatus.includes('Verified');
    return matchesSearch && matchesCategory && matchesLocation && matchesMoisture && matchesVerification;
  });

  return (
    <div className="max-w-7xl mx-auto px-5 py-8 space-y-6">
      <div className="card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="badge bg-lime text-[#111] font-bold">Bursa B2B</span>
          <h1 className="display text-3xl font-extrabold mt-3">Bursa Sumber Daya Sirkular</h1>
          <p className="text-sm text-muted mt-1 max-w-lg">
            Pertukaran sisa pangan terstandar dengan spesifikasi kimiawi untuk industri pengolah.
          </p>
        </div>
        <div className="rounded-2xl bg-lime/10 border border-lime/20 p-4 text-xs max-w-sm">
          <div className="font-bold flex items-center gap-1.5 text-lime">
            <Cpu className="w-4 h-4" /> Terhubung ke Decision Engine
          </div>
          <p className="text-muted-2 mt-1">Setiap listing punya Resource Passport dan skor kecocokan jalur.</p>
        </div>
      </div>

      <div className="card p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari material, industri, atau lokasi..."
              className="w-full text-sm pl-9 pr-4 py-2.5 rounded-full border border-border bg-surface-2 focus:outline-none focus:border-lime/40"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs px-4 py-2.5 rounded-full border border-border bg-surface-2"
          >
            <option value="All">Semua Kategori</option>
            <option value="Coffee By-Product">Ampas & Kulit Kopi</option>
            <option value="Fruit & Vegetable">Kulit Buah & Sayur</option>
            <option value="Grain & Brewery">Ampas Jelai & Biji-bijian</option>
            <option value="Bakery & Starch">Tepung & Pati</option>
            <option value="Catering & Food Service">Dapur Katering & SPPG</option>
          </select>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="text-xs px-4 py-2.5 rounded-full border border-border bg-surface-2"
          >
            <option value="All">Semua Wilayah</option>
            <option value="Bogor">Bogor</option>
            <option value="Bandung">Bandung</option>
            <option value="Depok">Depok</option>
            <option value="Tangerang">Tangerang</option>
            <option value="Sukabumi">Sukabumi</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <span className="text-muted">Kadar air maks <b className="text-white">{maxMoisture}%</b></span>
            <input type="range" min="20" max="90" value={maxMoisture} onChange={(e) => setMaxMoisture(Number(e.target.value))} className="w-28" />
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={onlyVerified} onChange={(e) => setOnlyVerified(e.target.checked)} />
              Terverifikasi lab
            </label>
          </div>
          <span className="text-muted">{filteredResources.length} listing</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => (
          <div key={res.id} className="card card-glow p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono text-muted">{res.id}</span>
                <span className="badge bg-lime/10 text-lime text-[10px]">{res.category}</span>
              </div>
              <h3 className="font-bold text-base leading-snug">{res.materialName}</h3>
              <div className="text-xs text-muted flex items-center gap-1 mt-2">
                <Building2 className="w-3 h-3" />
                <span className="truncate">{res.sourceBusiness}</span>
              </div>
              <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{res.location}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mt-4">
                <div className="p-2 rounded-xl bg-surface-2">
                  <span className="block text-[10px] text-muted">Volume</span>
                  <span className="text-xs font-bold">{res.availableVolume}</span>
                </div>
                <div className="p-2 rounded-xl bg-surface-2">
                  <span className="block text-[10px] text-muted">Air</span>
                  <span className="text-xs font-bold">{res.moistureLevel}%</span>
                </div>
                <div className="p-2 rounded-xl bg-surface-2">
                  <span className="block text-[10px] text-muted">C/N</span>
                  <span className="text-xs font-bold">{res.cnRatio}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs pt-3">
                <span className="flex items-center gap-1 text-muted-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-lime" />
                  {res.verificationStatus}
                </span>
                <button onClick={() => onOpenResourcePassport(res)} className="text-lime font-semibold flex items-center gap-1">
                  <FileText className="w-3 h-3" /> Paspor
                </button>
              </div>
            </div>
            <button
              onClick={() => onSelectResourceForEngine(res)}
              className="mt-4 w-full btn-lime !rounded-2xl text-xs flex items-center justify-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5" /> Cocokkan Mitra <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
