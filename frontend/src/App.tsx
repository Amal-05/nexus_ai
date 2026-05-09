/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Upload as UploadIcon, 
  MessageSquare, 
  FileText, 
  BookOpen, 
  Mic2, 
  Share2, 
  Calendar, 
  Settings as SettingsIcon,
  Search,
  Bell,
  SunMoon,
  Plus,
  Terminal,
  ArrowRight
} from 'lucide-react';
import { View } from './types';
import { AppProvider } from './context/AppContext';
import { useAuth } from './context/AuthContext';

/// Components
import LandingView from './views/LandingView';
import DashboardView from './views/DashboardView';
import SummariesView from './views/SummariesView';
import ChatView from './views/ChatView';
import UploadView from './views/UploadView';
import QuestionBankView from './views/QuestionBankView';
import DiagramExplainerView from './views/DiagramExplainerView';
import PlannerView from './views/PlannerView';
import AuthView from './views/AuthView';
import SettingsView from './views/SettingsView';

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { user, logout } = useAuth();
  const [view, setView] = useState<View>('landing');

  useEffect(() => {
    if (user && (view === 'landing' || view === 'auth')) {
      setView('dashboard');
    }
  }, [user, view]);

  const handleLogin = () => {
    setView('auth');
  };

  const handleAuthComplete = () => {
    setView('dashboard');
  };

  const handleUploadComplete = () => {
    setView('summaries');
  };

  const PageTransition = ({ children }: { children: ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );


  const isAuthPage = view === 'landing' || view === 'auth';

  return (
    <div className="flex h-screen overflow-hidden bg-surface selection:bg-primary/30">
      {/* Sidebar */}
      {!isAuthPage && (
        <aside className="w-64 border-r border-outline-variant/10 bg-surface-container/30 backdrop-blur-xl flex flex-col p-4 gap-2 z-50">
        <div className="mb-8 px-4 py-2">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('dashboard')}>
            <Terminal className="text-primary" size={24} />
            <h1 className="font-h text-2xl font-bold tracking-tighter text-primary">Nexus AI</h1>
          </div>
          <p className="text-[10px] font-mono tracking-widest text-on-surface-variant/60 mt-1 uppercase">Engineering OS</p>
        </div>

        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar pr-1">
          <NavItem active={view === 'dashboard'} icon={<LayoutDashboard size={18} />} label="Dashboard" onClick={() => setView('dashboard')} />
          <NavItem active={view === 'upload'} icon={<UploadIcon size={18} />} label="Upload" onClick={() => setView('upload')} />
          <NavItem active={view === 'chat'} icon={<MessageSquare size={18} />} label="AI Chat" onClick={() => setView('chat')} />
          <NavItem active={view === 'summaries'} icon={<FileText size={18} />} label="Summaries" onClick={() => setView('summaries')} />
          <NavItem active={view === 'questions'} icon={<BookOpen size={18} />} label="Question Bank" onClick={() => setView('questions')} />
          <NavItem active={view === 'diagram'} icon={<Share2 size={18} />} label="Diagram Explainer" onClick={() => setView('diagram')} />
          <NavItem active={view === 'planner'} icon={<Calendar size={18} />} label="Semester Planner" onClick={() => setView('planner')} />
        </nav>

        <div className="mt-auto space-y-4">
          <button 
            onClick={() => setView('upload')}
            className="w-full primary-gradient text-on-primary py-3 rounded-xl font-bold shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            New Session
          </button>
          <NavItem active={view === 'settings'} icon={<SettingsIcon size={18} />} label="Settings" onClick={() => setView('settings')} />
          
          <div className="flex items-center gap-3 px-4 py-2 border-t border-outline-variant/10 pt-4">
            {user ? (
              <>
                <img 
                  src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Nexus"} 
                  alt="User" 
                  className="w-8 h-8 rounded-full bg-secondary-container object-cover" 
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-semibold truncate text-white">
                    {user.displayName || user.email?.split('@')[0] || 'Scholar'}
                  </span>
                  <span className="text-[10px] text-on-surface-variant opacity-60 truncate">
                    {user.email}
                  </span>
                </div>
                <button 
                  onClick={logout} 
                  className="p-1.5 hover:bg-error/10 hover:text-error text-on-surface-variant rounded-md transition-colors" 
                  title="Logout"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-xs font-bold text-on-secondary">?</div>
                <span className="text-sm font-medium text-on-surface-variant italic">Guest Mode</span>
              </div>
            )}
          </div>
        </div>
      </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TopBar */}
        {!isAuthPage && (
          <header className="h-16 border-b border-outline-variant/10 bg-surface/60 backdrop-blur-2xl flex items-center justify-between px-8 gap-8 z-40">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
              <input 
                type="text" 
                placeholder="Search formulas, concepts, or modules..." 
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant/70 uppercase tracking-tight">Active Session</span>
            <div className="flex items-center gap-2">
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high/50 rounded-lg transition-colors"><Bell size={18} /></button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high/50 rounded-lg transition-colors"><SunMoon size={18} /></button>
            </div>
          </div>
        </header>
        )}

        {/* Dynamic Viewport */}
        <main className="flex-1 min-h-0 overflow-y-auto px-8 py-8 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {view === 'landing' && (
              <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <LandingView onGetStarted={handleLogin} />
              </motion.div>
            )}
            {view === 'auth' && (
              <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <AuthView onComplete={handleAuthComplete} />
              </motion.div>
            )}
            {view === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <DashboardView onNavigate={setView} />
              </motion.div>
            )}
            {view === 'upload' && (
              <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <UploadView onUploadComplete={handleUploadComplete} />
              </motion.div>
            )}
            {view === 'summaries' && (
              <motion.div key="summaries" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <SummariesView onFlashcards={() => setView('questions')} />
              </motion.div>
            )}
            {view === 'chat' && (
              <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <ChatView />
              </motion.div>
            )}
            {view === 'questions' && (
              <motion.div key="questions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <QuestionBankView />
              </motion.div>
            )}
            {view === 'diagram' && (
              <motion.div key="diagram" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <DiagramExplainerView />
              </motion.div>
            )}
            {view === 'planner' && (
              <motion.div key="planner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <PlannerView onNavigate={setView} />
              </motion.div>
            )}
            {view === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <SettingsView />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}



function NavItem({ active, icon, label, onClick }: { active?: boolean; icon: ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 active:scale-95
        ${active 
          ? 'bg-secondary-container/20 text-primary border-l-2 border-primary shadow-[0_0_15px_rgba(173,198,255,0.1)]' 
          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30'
        }
      `}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
