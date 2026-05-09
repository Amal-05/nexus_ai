/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Settings as SettingsIcon, 
  Shield, 
  Brain, 
  Save, 
  Cpu, 
  Globe, 
  Moon, 
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type Tab = 'profile' | 'preferences' | 'ai' | 'security';

export default function SettingsView() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <SettingsIcon size={18} /> },
    { id: 'ai', label: 'AI Core', icon: <Brain size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <div className="p-2 rounded-xl primary-gradient text-on-primary">
            <SettingsIcon size={24} />
          </div>
          Settings
        </h2>
        <p className="text-on-surface-variant mt-2">Manage your account preferences and AI engine configurations.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 glass-card rounded-2xl p-2 shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap
                  ${activeTab === tab.id 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface'
                  }
                `}
              >
                {tab.icon}
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0 w-full space-y-6">
          <div className="glass-card rounded-3xl p-8 min-h-[500px]">
            {activeTab === 'profile' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row items-center gap-8 border-b border-outline-variant/10 pb-8">
                  <div className="relative group">
                    <img 
                      src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Nexus"} 
                      alt="Avatar" 
                      className="w-24 h-24 rounded-2xl object-cover ring-2 ring-primary/20 ring-offset-4 ring-offset-surface shadow-xl" 
                    />
                    <button className="absolute -bottom-2 -right-2 p-2 bg-primary text-on-primary rounded-lg shadow-lg hover:scale-110 transition-transform">
                      <Zap size={14} />
                    </button>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-white">{user?.displayName || 'Scholar'}</h3>
                    <p className="text-on-surface-variant text-sm">{user?.email}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                      <span className="px-2 py-1 rounded-md bg-secondary-container/30 text-secondary text-[10px] font-mono uppercase tracking-wider">Nexus Engineer</span>
                      <span className="px-2 py-1 rounded-md bg-tertiary-container/30 text-tertiary text-[10px] font-mono uppercase tracking-wider">Level 4 Scholar</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Full Name" defaultValue={user?.displayName || ''} />
                  <InputGroup label="Professional Bio" placeholder="AI Engineering Student..." />
                  <InputGroup label="Institution" placeholder="Nexus Institute of Technology" />
                  <InputGroup label="Primary Discipline" placeholder="Advanced Quantum Mechanics" />
                </div>
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <section className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Moon size={18} className="text-primary" /> Appearance
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <ThemeCard active label="Dark Mode" description="Optimized for late night sessions" />
                    <ThemeCard label="Light Mode" description="Clear and bright for daylight use" disabled />
                    <ThemeCard label="System" description="Follows your OS preferences" disabled />
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Globe size={18} className="text-primary" /> Localization
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectGroup label="Primary Language" options={['English (US)', 'Spanish', 'French', 'German']} />
                    <SelectGroup label="Timezone" options={['UTC -5 (Eastern Time)', 'UTC 0 (London)', 'UTC +5:30 (Mumbai)', 'UTC +9 (Tokyo)']} />
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'ai' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-4">
                  <Cpu className="text-primary shrink-0" size={24} />
                  <div>
                    <h4 className="text-primary font-bold">Neural Engine Selection</h4>
                    <p className="text-sm text-on-surface-variant">Your current session is powered by Gemini 1.5 Pro. This provides the highest quality analysis for complex engineering diagrams and multi-modal inputs.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Advanced AI Configuration</h3>
                    <div className="space-y-4">
                      <InputGroup 
                        label="Custom API Key (Optional)" 
                        type="password" 
                        placeholder="Enter your Google AI Studio key..."
                        description="Provide your own key to bypass platform rate limits."
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Authentication</h3>
                  <div className="space-y-4">
                    <button className="w-full text-left p-4 rounded-xl border border-outline-variant/20 hover:bg-surface-container-high/30 transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10">
                          <Shield size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Two-Factor Authentication</p>
                          <p className="text-xs text-on-surface-variant">Add an extra layer of security to your account.</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-primary font-bold uppercase">Disabled</span>
                    </button>

                    <button className="w-full text-left p-4 rounded-xl border border-outline-variant/20 hover:bg-surface-container-high/30 transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10">
                          <Globe size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Login History</p>
                          <p className="text-xs text-on-surface-variant">View your recent login attempts and active devices.</p>
                        </div>
                      </div>
                      <CheckCircle2 size={18} className="text-success-container/60" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-outline-variant/10">
                  <h3 className="text-lg font-bold text-error flex items-center gap-2">
                    <AlertCircle size={18} /> Danger Zone
                  </h3>
                  <p className="text-sm text-on-surface-variant">Once you delete your account, there is no going back. Please be certain.</p>
                  <button className="px-6 py-2 rounded-xl border border-error/50 text-error hover:bg-error/10 transition-all text-sm font-bold">
                    Deactivate Account
                  </button>
                </div>
              </motion.div>
            )}

          </div>

          <div className="flex items-center justify-end gap-4">
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-primary font-medium text-sm"
              >
                <CheckCircle2 size={16} />
                Changes applied successfully
              </motion.div>
            )}
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-3 rounded-2xl primary-gradient text-on-primary font-bold shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {isSaving ? 'Synchronizing...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, type = "text", placeholder = "", defaultValue = "", description = "" }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold pl-1">{label}</label>
      <input 
        type={type} 
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full bg-surface-container-high/50 border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/30" 
      />
      {description && <p className="text-[10px] text-on-surface-variant/60 pl-1">{description}</p>}
    </div>
  );
}

function SelectGroup({ label, options }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold pl-1">{label}</label>
      <select className="w-full bg-surface-container-high/50 border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function ThemeCard({ active = false, label, description, disabled = false }) {
  return (
    <div className={`
      p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden group
      ${active 
        ? 'border-primary bg-primary/5' 
        : 'border-outline-variant/20 hover:border-primary/50 bg-surface-container'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}>
      {active && (
        <div className="absolute top-2 right-2 text-primary">
          <CheckCircle2 size={16} />
        </div>
      )}
      <p className="font-bold text-sm text-white">{label}</p>
      <p className="text-[10px] text-on-surface-variant mt-1">{description}</p>
      {disabled && <span className="absolute inset-0 flex items-center justify-center bg-surface/80 text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Coming Soon</span>}
    </div>
  );
}

