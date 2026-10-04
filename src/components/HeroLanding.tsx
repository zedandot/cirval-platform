'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { ActiveTab } from './Navbar';
import { IMPACT_METRICS } from '../data/mockData';

interface HeroLandingProps {
  onOpenAddResource: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  nav?: React.ReactNode;
}

const STEPS = [
  { q: '01', title: 'Profiling Residu', desc: 'Daftarkan sisa pangan dan terbitkan Resource Passport.' },
  { q: '02', title: 'Decision Engine', desc: 'Hitung 5 jalur valorisasi berdasarkan data ilmiah.' },
  { q: '03', title: 'Pencocokan Mitra', desc: 'Temukan pengolah terverifikasi sesuai jalur terbaik.' },
  { q: '04', title: 'Jejak Sirkular', desc: 'Lacak transaksi hingga sumber daya sekunder baru.' },
];

const PARTNERS = [
  { initials: 'NF', name: 'PT Nusantara Food', role: 'Generator • Bogor' },
  { initials: 'PA', name: 'Pasundan Agro', role: 'Processor • Bandung' },
  { initials: 'SP', name: 'SPPG Sukmajaya', role: 'Jasa Boga • Depok' },
  { initials: 'LB', name: 'Lab Mutu Pakan', role: 'Verifikasi • Bogor' },
  { initials: 'BT', name: 'BioTek Sentul', role: 'Bioenergi • Jawa Barat' },
  { initials: 'CV', name: 'Cirval Logistics', role: 'Rute Kolektif • Hub' },
];

// Animated counter hook
function useCountUp(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// Single animated stat
function AnimatedStat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="animate-scale-in">
      <div className="display text-3xl sm:text-4xl font-extrabold text-white">
        {count}{suffix}
      </div>
      <div className="text-xs text-muted mt-1">{label}</div>
    </div>
  );
}

// Floating particle
function Particle({ x, size, delay, duration }: { x: number; size: number; delay: number; duration: number }) {
  return (
    <div
      style={{
        position: 'absolute', left: `${x}%`, bottom: 0,
        width: size, height: size, borderRadius: '50%',
        background: 'rgba(200,245,66,0.5)',
        animation: `particle-drift ${duration}s ease-in ${delay}s infinite`,
        pointerEvents: 'none'
      }}
    />
  );
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onOpenAddResource,
  setActiveTab,
  nav
}) => {
  const particles = [
    { x: 15, size: 4, delay: 0, duration: 5 },
    { x: 35, size: 3, delay: 1.2, duration: 6 },
    { x: 55, size: 5, delay: 0.5, duration: 4.5 },
    { x: 70, size: 3, delay: 2, duration: 7 },
    { x: 85, size: 4, delay: 0.8, duration: 5.5 },
  ];

  return (
    <div>
      {/* Hero section — white card */}
      <div className="px-3 md:px-5 pt-3 md:pt-5">
        <div className="bg-white rounded-[2.2rem] sm:rounded-[2.8rem] overflow-hidden">
          {nav}
          <section className="relative px-6 sm:px-10 lg:px-16 pt-6 pb-16 sm:pb-20 overflow-hidden">
            {/* Decorative stars */}
            <span className="absolute left-8 top-2 text-4xl text-lime hidden sm:block animate-float" aria-hidden>✦</span>
            <span className="absolute right-10 top-8 text-3xl text-lime hidden md:block animate-float delay-300" aria-hidden>✦</span>
            <span className="absolute right-32 bottom-20 text-xl text-lime/40 hidden lg:block animate-float-slow" aria-hidden>✦</span>

            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Badge */}
              <div className="animate-badge-pop inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lime/10 border border-lime/25 text-xs font-bold text-lime mb-2">
                <Sparkles size={12} /> Platform Valorisasi Sirkular Indonesia
              </div>

              <h1 className="display text-[2.35rem] sm:text-5xl lg:text-[3.6rem] font-extrabold leading-[1.08] text-[#111] animate-slide-left">
                Memberdayakan Merek
                <br />
                Dengan Solusi Sirkular
              </h1>
              <p className="max-w-xl mx-auto text-[15px] text-zinc-500 leading-relaxed animate-slide-right delay-200">
                CIRVAL membantu industri pangan mengubah residual menjadi sumber daya sekunder
                lewat decision engine, pencocokan mitra, dan jejak digital yang sederhana.
              </p>
              <div className="flex flex-wrap justify-center gap-3 animate-scale-in delay-300">
                <button onClick={onOpenAddResource} className="btn-lime flex items-center gap-2 !px-6 animate-pulse-lime">
                  Valorisasi Residual Anda
                </button>
                <button onClick={() => setActiveTab('marketplace')} className="btn-dark flex items-center gap-2 !px-6">
                  Lihat Marketplace
                </button>
              </div>
            </div>

            <div className="relative mt-10 max-w-3xl mx-auto animate-scale-in delay-400">
              <div className="rounded-[2rem] overflow-hidden bg-zinc-100 aspect-[16/9] sm:aspect-[2/1] relative">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1400&q=80"
                  alt="Tim operasional dapur dan residu pangan"
                  className="w-full h-full object-cover grayscale-[20%] transition-transform duration-700 hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Floating badge */}
              <div className="absolute -right-1 sm:right-4 -bottom-6 sm:bottom-8 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-zinc-100 animate-float hover-lift cursor-default">
                <div className="flex text-lime text-sm">★★★★★</div>
                <div>
                  <div className="text-xl font-extrabold text-[#111] leading-none">5 Jalur</div>
                  <div className="text-[11px] text-zinc-500">Decision Engine</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Stats row */}
      <section className="max-w-5xl mx-auto px-6 pt-14 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <AnimatedStat value={IMPACT_METRICS.activeBusinessesCount} label="Mitra Bisnis" suffix="+" />
          <AnimatedStat value={5} label="Jalur Valorisasi" />
          <AnimatedStat value={IMPACT_METRICS.totalResidualsDivertedTon} label="Ton Dialihkan" />
          <AnimatedStat value={IMPACT_METRICS.totalCircularTransactions} label="Transaksi Jejak" suffix="+" />
        </div>
      </section>

      {/* Turning residuals section */}
      <section className="max-w-6xl mx-auto px-5 pb-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4 animate-slide-left">
          <h2 className="display text-4xl sm:text-5xl font-extrabold leading-tight">
            Turning Residuals
            <br />
            Into Masterpieces
          </h2>
          <p className="text-muted-2 text-[15px] leading-relaxed max-w-md">
            CIRVAL bukan sekadar mencari pembeli. Engine-nya menimbang kelayakan teknis, ekonomi, lingkungan, dan logistik sebelum transaksi dimulai.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 animate-slide-right">
          <div className="relative rounded-[1.6rem] overflow-hidden h-64 sm:h-80 hover-lift">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
              alt="Ampas kopi sebagai residual"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-lime text-[#111] rounded-xl px-3 py-2 text-xs font-bold">
              CIRCULAR RESOURCE AGENCY
            </div>
          </div>
          <div className="rounded-[1.6rem] overflow-hidden h-64 sm:h-80 mt-8 hover-lift">
            <img
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80"
              alt="Produk sekunder dari residual"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="rounded-[2.2rem] bg-surface border border-border p-6 sm:p-10 grid lg:grid-cols-2 gap-10 items-center animate-glow-border">
          <div>
            <span className="badge bg-lime text-[#111] font-bold mb-4">Cara Kerja CIRVAL</span>
            <h2 className="display text-3xl sm:text-4xl font-extrabold mt-3 mb-8">Layanan Kami</h2>
            <div className="divide-y divide-border">
              {STEPS.map((s, i) => (
                <button
                  key={s.q}
                  onClick={() => setActiveTab(s.q === '02' ? 'valorization' : s.q === '03' ? 'marketplace' : 'dashboard')}
                  className={`w-full flex items-center justify-between py-4 text-left group animate-slide-left delay-${(i + 1) * 100}`}
                >
                  <div>
                    <div className="text-[11px] text-muted font-mono">{s.q}</div>
                    <div className="font-semibold group-hover:text-lime transition-colors duration-200">{s.title}</div>
                    <p className="text-xs text-muted mt-0.5 max-w-sm">{s.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-lime group-hover:translate-x-1 transition-all duration-200" />
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[1.8rem] overflow-hidden h-72 sm:h-96">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80"
                alt="Analisis residual"
                className="w-full h-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
              />
            </div>
            <div className="absolute right-4 bottom-4 space-y-2 max-w-[200px]">
              <div className="bg-white text-[#111] rounded-2xl p-4 text-xs leading-relaxed shadow-lg animate-float delay-200">
                Ingin tahu bagaimana residual jadi nilai baru?
                <button onClick={() => setActiveTab('valorization')} className="mt-2 flex items-center gap-1 font-bold hover:text-lime transition-colors">
                  Lihat cara kerjanya <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <button onClick={onOpenAddResource} className="w-full btn-lime text-xs">
                Coba Mesinnya
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="overflow-hidden py-8 border-y border-white/5 relative">
        <div className="marquee-track text-4xl sm:text-6xl font-extrabold display text-white/90">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="px-6 whitespace-nowrap">
              Valorisasi <span className="text-lime">+</span> Pencocokan <span className="text-lime">+</span> Jejak&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <h2 className="display text-4xl font-extrabold mb-10">Temui Jaringan Mitra</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PARTNERS.map((p, i) => (
            <div
              key={p.name}
              className={`rounded-[1.6rem] bg-white text-[#111] p-5 flex items-start gap-4 hover-lift cursor-default animate-scale-in delay-${(i % 4 + 1) * 100}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-lime flex items-center justify-center font-extrabold flex-shrink-0 animate-float"
                style={{ animationDelay: `${i * 0.4}s` }}>
                {p.initials}
              </div>
              <div>
                <div className="font-bold">{p.name}</div>
                <div className="text-xs text-zinc-500 mt-1">{p.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="rounded-[2rem] bg-white text-[#111] overflow-hidden grid md:grid-cols-2 items-center hover-lift">
          <div className="p-8 sm:p-12 space-y-4">
            <h2 className="display text-4xl font-extrabold leading-tight animate-slide-left">Mulai Hari Ini!</h2>
            <p className="text-zinc-500 text-sm max-w-sm animate-slide-left delay-100">
              Daftarkan residual pertama Anda. Decision Engine CIRVAL akan memetakan jalur valorisasi yang paling layak.
            </p>
            <button onClick={onOpenAddResource} className="btn-lime animate-scale-in delay-200">Mulai Analisis</button>
          </div>
          <div className="h-56 md:h-full min-h-[220px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
              alt="Konsultasi valorisasi"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

