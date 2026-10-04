'use client';

import React, { useState } from 'react';
import { Leaf, Menu, X, Sparkles } from 'lucide-react';

export type ActiveTab =
  | 'landing'
  | 'dashboard'
  | 'resources'
  | 'valorization'
  | 'marketplace'
  | 'transactions'
  | 'traceability'
  | 'impact'
  | 'profile';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAddResource: () => void;
  resourcesCount: number;
  variant?: 'light' | 'dark';
}

const NAV_ITEMS: { id: ActiveTab; label: string }[] = [
  { id: 'landing', label: 'Beranda' },
  { id: 'dashboard', label: 'Dasbor' },
  { id: 'resources', label: 'Residual' },
  { id: 'valorization', label: 'Mesin Keputusan' },
  { id: 'marketplace', label: 'Pencocokan' },
  { id: 'impact', label: 'Dampak' },
];

const MORE_ITEMS: { id: ActiveTab; label: string }[] = [
  { id: 'resources', label: 'Residual Saya' },
  { id: 'transactions', label: 'Transaksi' },
  { id: 'traceability', label: 'Jejak Sirkular' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddResource,
  variant = 'dark'
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLight = variant === 'light';

  return (
    <header className={`relative z-50 w-full transition-all duration-300 ${isLight ? 'bg-transparent' : 'sticky top-0 pt-3 px-3 md:px-5'}`}>
      <div className={`${isLight ? 'px-4 sm:px-6 pt-4' : ''}`}>
        <div className="mx-auto max-w-6xl">
          <div 
            className={`flex items-center justify-between gap-3 h-14 px-2 sm:px-3 rounded-full text-white transition-all duration-300 ${
              isLight 
                ? 'bg-[#111111] shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-white/5' 
                : 'bg-[#111111]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:border-lime/25'
            }`}
          >
            {/* Left Nav links */}
            <nav className="hidden lg:flex items-center gap-1 pl-2">
              {NAV_ITEMS.slice(0, 3).map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-lime text-[#111] font-bold shadow-[0_2px_14px_rgba(200,245,66,0.35)] scale-105'
                        : 'text-white/75 hover:text-white hover:bg-white/10 active:scale-95'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Brand Logo with Interactive Spin & Glow */}
            <button
              onClick={() => setActiveTab('landing')}
              className="group flex items-center gap-2 px-2.5 py-1 rounded-full hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              <span className="w-7 h-7 rounded-full bg-lime flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:scale-110 shadow-[0_0_12px_rgba(200,245,66,0.35)]">
                <Leaf className="w-3.5 h-3.5 text-[#111]" />
              </span>
              <span className="text-[15px] font-bold tracking-tight text-white transition-colors group-hover:text-lime">
                Cir<span className="text-lime">val</span>
              </span>
            </button>

            {/* Right Nav links & CTAs */}
            <div className="flex items-center gap-1.5 pr-1">
              <nav className="hidden lg:flex items-center gap-1">
                {NAV_ITEMS.slice(3).map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-lime text-[#111] font-bold shadow-[0_2px_14px_rgba(200,245,66,0.35)] scale-105'
                          : 'text-white/75 hover:text-white hover:bg-white/10 active:scale-95'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              {/* CTA button with pulse animation */}
              <button
                onClick={onOpenAddResource}
                className="hidden sm:inline-flex btn-lime !py-2 !px-4 text-[12px] font-bold items-center gap-1.5 animate-pulse-lime hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_4px_16px_rgba(200,245,66,0.3)] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#111]" />
                <span>Analisis Residu</span>
              </button>

              {/* User Avatar with Hover Glow */}
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-8 h-8 rounded-full text-[11px] font-bold flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer ${
                  activeTab === 'profile' 
                    ? 'bg-lime text-[#111] ring-2 ring-lime/40 shadow-[0_0_12px_rgba(200,245,66,0.4)]' 
                    : 'bg-white/10 text-lime hover:bg-white/20 hover:ring-2 hover:ring-lime/30'
                }`}
                aria-label="Profil Akun"
              >
                NF
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mx-4 mt-3 rounded-3xl bg-[#111]/95 backdrop-blur-xl border border-white/10 p-3 space-y-1 fade-up shadow-2xl">
          {[...NAV_ITEMS, ...MORE_ITEMS].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm transition-all duration-200 cursor-pointer ${
                activeTab === item.id 
                  ? 'bg-lime text-[#111] font-bold shadow-[0_2px_12px_rgba(200,245,66,0.3)]' 
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
