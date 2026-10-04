'use client';

import React, { useState } from 'react';
import { Navbar, ActiveTab } from '../components/Navbar';
import { HeroLanding } from '../components/HeroLanding';
import { DashboardView } from '../components/DashboardView';
import { ValorizationDecisionEngine } from '../components/ValorizationDecisionEngine';
import { PathwayMatching } from '../components/PathwayMatching';
import { MarketplaceView } from '../components/MarketplaceView';
import { TransactionTraceability } from '../components/TransactionTraceability';
import { ImpactDashboard } from '../components/ImpactDashboard';
import { ProfileView } from '../components/ProfileView';
import { ResourceProfilingModal } from '../components/ResourceProfilingModal';
import { ResourcePassportModal } from '../components/ResourcePassportModal';
import { FeedbackLoopModal } from '../components/FeedbackLoopModal';
import { 
  ResourcePassport, 
  ValorizationPathway, 
  ProcessorPartner, 
  CircularTransaction, 
  FeedbackData 
} from '../types/cirval';
import { 
  INITIAL_RESOURCES, 
  COFFEE_PULP_PATHWAYS
} from '../data/mockData';
import { CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [resources, setResources] = useState<ResourcePassport[]>(INITIAL_RESOURCES);
  const [activeResource, setActiveResource] = useState<ResourcePassport>(INITIAL_RESOURCES[0]);
  const [selectedPathway, setSelectedPathway] = useState<ValorizationPathway>(COFFEE_PULP_PATHWAYS[0]);
  
  // Modals state
  const [isAddResourceOpen, setIsAddResourceOpen] = useState<boolean>(false);
  const [isPassportOpen, setIsPassportOpen] = useState<boolean>(false);
  const [passportResource, setPassportResource] = useState<ResourcePassport | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [feedbackTx, setFeedbackTx] = useState<CircularTransaction | null>(null);

  // In-app Alert Notification
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Handler when a new resource is registered
  const handleResourceCreated = (newRes: ResourcePassport) => {
    setResources(prev => [newRes, ...prev]);
    setIsAddResourceOpen(false);
    setPassportResource(newRes);
    setIsPassportOpen(true);
    showToast(`Resource Passport ${newRes.id} berhasil diterbitkan dan siap dianalisis!`);
  };

  // Handler to inspect resource passport
  const handleOpenPassport = (res: ResourcePassport) => {
    setPassportResource(res);
    setIsPassportOpen(true);
  };

  // Handler to run Decision Engine on a specific resource
  const handleRunEngine = (res: ResourcePassport) => {
    setActiveResource(res);
    setActiveTab('valorization');
    showToast(`Memulai Decision Engine untuk ${res.materialName}...`, 'info');
  };

  // Handler when a pathway is selected from Decision Engine to find partners
  const handleSelectPathwayForMatching = (pathway: ValorizationPathway) => {
    setSelectedPathway(pathway);
    setActiveTab('marketplace'); // or pathway matching section
    showToast(`Menampilkan mitra pengolah terverifikasi untuk jalur ${pathway.name}`);
  };

  // Handler when user requests transaction with a partner
  const handleRequestTransaction = (partner: ProcessorPartner) => {
    showToast(`Permintaan transaksi berhasil dikirim ke ${partner.companyName}. Kontrak sirkular disiapkan!`);
    setActiveTab('transactions');
  };

  // Handler when processor feedback is submitted
  const handleFeedbackSubmitted = (data: FeedbackData) => {
    showToast(`Feedback hasil pengolahan ${data.processorName} dicatat. Algoritma CIRVAL telah dikalibrasi!`);
  };

  const nav = (
    <Navbar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onOpenAddResource={() => setIsAddResourceOpen(true)}
      resourcesCount={resources.length}
      variant={activeTab === 'landing' ? 'light' : 'dark'}
    />
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#111] text-white shadow-2xl border border-lime/30 flex items-center gap-3 fade-up max-w-md">
          <div className="p-1 rounded-full bg-lime/15 text-lime">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-white block">Pemberitahuan CIRVAL</span>
            <span className="text-white/70">{notification.message}</span>
          </div>
        </div>
      )}

      {activeTab !== 'landing' && nav}

      <main className="flex-1 pb-16">
        <div key={activeTab} className="fade-up">
          {activeTab === 'landing' && (
            <HeroLanding
              nav={nav}
              onOpenAddResource={() => setIsAddResourceOpen(true)}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardView
              resources={resources}
              onOpenAddResource={() => setIsAddResourceOpen(true)}
              onSelectResourceForEngine={handleRunEngine}
              onOpenResourcePassport={handleOpenPassport}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'resources' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 card">
                <div>
                  <span className="badge bg-lime/10 text-lime uppercase">
                    Katalog Material
                  </span>
                  <h1 className="display text-2xl font-extrabold mt-2">
                    Katalog Sisa Pangan
                  </h1>
                  <p className="text-xs text-muted mt-1">
                    Daftar seluruh residu yang terdaftar dengan Digital Resource Passport dan status kelayakan valorisasinya.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddResourceOpen(true)}
                  className="btn-lime text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>+ Daftarkan Residu Baru</span>
                </button>
              </div>

              <MarketplaceView
                resources={resources}
                onSelectResourceForEngine={handleRunEngine}
                onOpenResourcePassport={handleOpenPassport}
              />
            </div>
          )}

          {activeTab === 'valorization' && (
            <ValorizationDecisionEngine
              activeResource={activeResource}
              onSelectPathwayForMatching={handleSelectPathwayForMatching}
            />
          )}

          {activeTab === 'marketplace' && (
            <div className="space-y-6">
              {/* Direct pathway-driven matching view */}
              <PathwayMatching
                selectedPathway={selectedPathway}
                resource={activeResource}
                onRequestTransaction={handleRequestTransaction}
                onBackToDecisionEngine={() => setActiveTab('valorization')}
              />

              {/* General B2B circular exchange */}
              <div className="pt-6 border-t border-border">
                <MarketplaceView
                  resources={resources}
                  onSelectResourceForEngine={handleRunEngine}
                  onOpenResourcePassport={handleOpenPassport}
                />
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <TransactionTraceability
              onOpenFeedback={(tx) => {
                setFeedbackTx(tx);
                setIsFeedbackOpen(true);
              }}
            />
          )}

          {activeTab === 'traceability' && (
            <TransactionTraceability
              onOpenFeedback={(tx) => {
                setFeedbackTx(tx);
                setIsFeedbackOpen(true);
              }}
            />
          )}

          {activeTab === 'impact' && (
            <ImpactDashboard />
          )}

          {activeTab === 'profile' && (
            <ProfileView />
          )}
        </div>
      </main>

      <footer className="px-3 md:px-5 pb-5">
        <div className="rounded-[2rem] bg-lime text-[#111] p-8 sm:p-12 mb-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="display text-4xl sm:text-5xl font-extrabold">Cirval</div>
              <p className="text-sm max-w-md mt-3 text-[#111]/70">
                Platform valorisasi sirkular Indonesia — residual pangan menjadi sumber daya sekunder yang terukur.
              </p>
            </div>
            <span className="text-xs font-semibold">B2B Sustainability • Prototype 2026</span>
          </div>
        </div>
        <div className="rounded-[2rem] bg-surface border border-border p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-muted">
          <div>
            <div className="font-bold text-white mb-2">Platform</div>
            <ul className="space-y-1.5">
              <li>Profiling & Resource Passport</li>
              <li>Valorization Decision Engine</li>
              <li>Pathway Matching</li>
              <li>Traceability Loop</li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-white mb-2">Konteks</div>
            <ul className="space-y-1.5">
              <li>Klaster pakan Bogor–Sukabumi</li>
              <li>Dapur SPPG / MBG</li>
              <li>Cascara & ampas kopi</li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-white mb-2">Catatan</div>
            <p className="leading-relaxed">
              Data dampak, lab, dan transaksi di prototipe ini bersifat simulasi.
            </p>
            <p className="mt-3 text-[11px]">© 2026 CIRVAL Indonesia</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ResourceProfilingModal
        isOpen={isAddResourceOpen}
        onClose={() => setIsAddResourceOpen(false)}
        onResourceCreated={handleResourceCreated}
      />

      <ResourcePassportModal
        resource={passportResource}
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        onRunEngine={handleRunEngine}
      />

      <FeedbackLoopModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        transaction={feedbackTx}
        onSubmitFeedback={handleFeedbackSubmitted}
      />
    </div>
  );
}
