'use client';

import React from 'react';
import { ShieldCheck, MapPin, Award, CheckCircle2 } from 'lucide-react';

export const ProfileView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-5 py-8 space-y-6">
      <div className="card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-lime text-[#111] flex items-center justify-center text-xl font-extrabold">
            NF
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="display text-2xl font-extrabold">PT Nusantara Food</h1>
              <span className="badge bg-lime/10 text-lime">Generator Terverifikasi</span>
            </div>
            <p className="text-xs text-muted mt-1">Unit Manufaktur Makanan & Pengolahan Kopi • NIB: 9120008819201</p>
            <div className="flex items-center gap-1.5 text-xs text-muted-2 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Sentul Industrial Estate, Babakan Madang, Bogor</span>
            </div>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[11px] text-muted">ID Entitas CIRVAL</span>
          <div className="font-mono font-bold">CIRVAL-ENT-BGR-004</div>
          <span className="text-[11px] text-lime">ESG Grade A</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-6 space-y-3">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Award className="w-4 h-4 text-lime" /> Sertifikasi
          </h3>
          {[
            ['ISO 22000:2018', 'Sistem Manajemen Keamanan Pangan'],
            ['Halal BPJPH', 'No. ID32110002910810323'],
            ['Zero-Waste Protocol', 'Standar audit pemilahan terpadu'],
          ].map(([title, sub]) => (
            <div key={title} className="p-3 rounded-2xl bg-surface-2 flex items-center justify-between">
              <div>
                <span className="font-bold text-sm block">{title}</span>
                <span className="text-[11px] text-muted">{sub}</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-lime" />
            </div>
          ))}
        </div>

        <div className="card p-6 space-y-3">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-lime" /> Lab Terafiliasi
          </h3>
          <div className="p-3 rounded-2xl bg-surface-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-sm">Balai Mutu Pakan Bogor</span>
              <span className="badge bg-lime/10 text-lime text-[10px]">KAN</span>
            </div>
            <p className="text-[11px] text-muted mt-1">Proksimat C/N, kadar air, aflatoksin, serat kasar.</p>
          </div>
          <div className="p-3 rounded-2xl bg-surface-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-sm">Sucofindo Sentul Biomassa</span>
              <span className="badge bg-lime/10 text-lime text-[10px]">ISO 17025</span>
            </div>
            <p className="text-[11px] text-muted mt-1">Nilai kalor biomassa dan residu logam berat.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
