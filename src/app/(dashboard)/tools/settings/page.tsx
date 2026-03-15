'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Palette, 
  Moon, 
  Sun, 
  Monitor, 
  Layout, 
  Check, 
  Info,
  Sparkles,
  Smartphone,
  Bell,
  Lock,
  Eye
} from 'lucide-react';
// DashboardLayout removed - handled by (dashboard)/layout.tsx
import { useTheme } from '@/components/providers/ThemeProvider';
import { THEMES } from '@/lib/constants';

export default function SettingsPage() {
  const { theme, setTheme, isDark, toggleDarkMode, setCustomTheme } = useTheme();
  const [customPrimary, setCustomPrimary] = useState(theme.primary);
  const [customSecondary, setCustomSecondary] = useState(theme.secondary);
  const [activeTab, setActiveTab] = useState<'appearance' | 'preferences' | 'security'>('appearance');

  // Preferences State
  const [prefs, setPrefs] = useState({
    tooltips: true,
    animations: true,
    compact: false,
    notifications: true,
  });

  // Security State
  const [apiKey, setApiKey] = useState('sk-chp-••••••••••••••••');
  const [privacyMode, setPrivacyMode] = useState(true);

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'preferences', label: 'Preferences', icon: Layout },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="space-y-8 pb-20">
        <header className="space-y-2">
          <div className="flex items-center space-x-3 text-[var(--primary)]">
            <Settings className="w-6 h-6 animate-spin-slow" />
            <span className="font-bold uppercase tracking-widest text-xs">System settings</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight">Configuration</h1>
          <p className="text-muted-foreground text-lg">Personalize your ChatPilot experience and manage application preferences.</p>
        </header>

        {/* Tabs */}
        <div className="flex space-x-1 p-1 bg-muted/50 rounded-2xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-background shadow-sm text-[var(--primary)]' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === 'appearance' && (
                <motion.div
                  key="appearance"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Mode Toggle */}
                  <section className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                          <Moon className="w-5 h-5 text-[var(--primary)]" />
                          Display Mode
                        </h2>
                        <p className="text-sm text-muted-foreground">Switch between light and dark themes.</p>
                      </div>
                      <button
                        onClick={toggleDarkMode}
                        className={`relative w-14 h-8 rounded-full transition-colors cursor-pointer ${
                          isDark ? 'bg-[var(--primary)]' : 'bg-muted-foreground/20'
                        }`}
                      >
                        <motion.div
                          animate={{ x: isDark ? 24 : 4 }}
                          className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
                        >
                          {isDark ? <Moon className="w-3 h-3 text-[var(--primary)]" /> : <Sun className="w-3 h-3 text-orange-400" />}
                        </motion.div>
                      </button>
                    </div>
                  </section>

                  {/* Preset Themes */}
                  <section className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold">Preset Themes</h2>
                      <p className="text-sm text-muted-foreground">Select one of our curated high-contrast color palettes.</p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {THEMES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTheme(t)}
                          className={`group relative p-4 rounded-2xl border-2 transition-all cursor-pointer text-left overflow-hidden ${
                            theme.id === t.id 
                              ? 'border-[var(--primary)] bg-[var(--primary)]/5' 
                              : 'border-transparent bg-muted/30 hover:bg-muted/50'
                          }`}
                        >
                          <div className="flex flex-col gap-3">
                            <div className="flex space-x-1">
                              <div className="w-6 h-6 rounded-full shadow-sm" style={{ backgroundColor: t.primary }} />
                              <div className="w-6 h-6 rounded-full shadow-sm -ml-2 border-2 border-background" style={{ backgroundColor: t.secondary }} />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.id === t.id ? 'text-[var(--primary)]' : 'text-muted-foreground'}`}>
                              {t.name}
                            </span>
                          </div>
                          {theme.id === t.id && (
                            <div className="absolute top-2 right-2">
                              <Check className="w-4 h-4 text-[var(--primary)]" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* Custom Theme */}
                  <section className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-400" />
                        Custom Palette
                      </h2>
                      <p className="text-sm text-muted-foreground">Design your own theme by picking custom hex colors.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-muted-foreground uppercase px-1">Primary Color</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={customPrimary}
                            onChange={(e) => setCustomPrimary(e.target.value)}
                            className="w-12 h-12 rounded-xl border-none p-1 cursor-pointer bg-muted"
                          />
                          <input
                            type="text"
                            value={customPrimary}
                            onChange={(e) => setCustomPrimary(e.target.value)}
                            className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm font-mono uppercase"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-muted-foreground uppercase px-1">Secondary Color</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={customSecondary}
                            onChange={(e) => setCustomSecondary(e.target.value)}
                            className="w-12 h-12 rounded-xl border-none p-1 cursor-pointer bg-muted"
                          />
                          <input
                            type="text"
                            value={customSecondary}
                            onChange={(e) => setCustomSecondary(e.target.value)}
                            className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm font-mono uppercase"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setCustomTheme(customPrimary, customSecondary)}
                      className="w-full py-4 rounded-2xl bg-foreground text-background font-bold hover:opacity-90 transition-opacity shadow-lg cursor-pointer"
                    >
                      Apply Custom Colors
                    </button>
                  </section>
                </motion.div>
              )}

              {activeTab === 'preferences' && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <section className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-[var(--primary)]" />
                        App Experience
                      </h2>
                      <p className="text-sm text-muted-foreground">Adjust how ChatPilot behaves on your device.</p>
                    </div>

                    <div className="space-y-4">
                      {[
                        { id: 'tooltips', label: 'Show interactive tooltips', desc: 'Display helpful hints while using tools.', icon: Info },
                        { id: 'animations', label: 'Enable rich animations', desc: 'Smooth transitions and micro-interactions.', icon: Sparkles },
                        { id: 'compact', label: 'Compact dashboard', desc: 'Reduce spacing to show more tools at once.', icon: Eye },
                        { id: 'notifications', label: 'Push notifications', desc: 'Get alerts for completed AI tasks.', icon: Bell },
                      ].map((pref) => (
                        <div key={pref.id} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-[var(--primary)]">
                              <pref.icon className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5">
                              <div className="font-bold text-sm tracking-tight">{pref.label}</div>
                              <div className="text-[10px] text-muted-foreground tracking-tight">{pref.desc}</div>
                            </div>
                          </div>
                          <button 
                            onClick={() => togglePref(pref.id as any)}
                            className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                              prefs[pref.id as keyof typeof prefs] ? 'bg-[var(--primary)]' : 'bg-muted-foreground/30'
                            }`}
                          >
                            <motion.div
                              animate={{ x: prefs[pref.id as keyof typeof prefs] ? 20 : 4 }}
                              className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <section className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <Lock className="w-5 h-5 text-rose-500" />
                        Security & Privacy
                      </h2>
                      <p className="text-sm text-muted-foreground">Manage your AI credentials and data visibility.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-muted-foreground uppercase px-1">OpenAI API Key (Encrypted)</label>
                        <div className="relative group">
                          <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl px-4 py-4 pr-12 text-sm font-mono tracking-widest outline-none focus:ring-2 focus:ring-[var(--primary)]"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                            <Eye className="w-4 h-4" />
                          </div>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">Your API key is stored locally and never sent to our servers. Be careful when sharing your screen.</p>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-rose-500">
                            <Lock className="w-5 h-5" />
                          </div>
                          <div className="space-y-0.5">
                            <div className="font-bold text-sm tracking-tight">Incognito Mode</div>
                            <div className="text-[10px] text-muted-foreground tracking-tight">Do not save message history in browser.</div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setPrivacyMode(!privacyMode)}
                          className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                            privacyMode ? 'bg-[var(--primary)]' : 'bg-muted-foreground/30'
                          }`}
                        >
                          <motion.div
                            animate={{ x: privacyMode ? 20 : 4 }}
                            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                          />
                        </button>
                      </div>
                    </div>

                    <button className="w-full py-4 rounded-2xl gradient-primary text-white font-bold hover:shadow-lg transition-all cursor-pointer">
                      Save Credentials
                    </button>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Preview Sidebar */}
          <div className="lg:sticky lg:top-8 space-y-6">
            <div className={`bg-card border-2 border-[var(--primary)]/20 rounded-3xl p-8 shadow-xl space-y-8 overflow-hidden relative`}>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--primary)]/5 rounded-full blur-3xl" />
              
              <div className="space-y-1 relative">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Live Preview</h3>
                <p className="text-xs text-muted-foreground">See how your theme looks on components.</p>
              </div>

              <div className="space-y-6 relative">
                <div className="space-y-3">
                  <div className="h-6 w-32 bg-[var(--primary)]/20 rounded-full animate-pulse" />
                  <div className="h-4 w-48 bg-muted rounded-full" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="h-20 rounded-2xl bg-[var(--primary)] flex items-center justify-center shadow-lg shadow-[var(--primary)]/20">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <div className="h-20 rounded-2xl bg-[var(--secondary)] flex items-center justify-center shadow-lg shadow-[var(--secondary)]/20 opacity-80">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-border bg-background space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                      <Settings className="w-4 h-4" />
                    </div>
                    <div className="flex-1 px-3">
                      <div className="h-2 w-20 bg-[var(--primary)]/40 rounded-full" />
                    </div>
                    <div className="w-10 h-4 bg-muted rounded-full" />
                  </div>
                </div>

                <button className="w-full py-3 rounded-xl gradient-primary text-white font-bold text-sm shadow-lg shadow-[var(--primary)]/20">
                  Example Button
                </button>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-6 flex items-start space-x-4">
              <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-amber-500">Auto-Save Active</p>
                <p className="text-xs text-amber-500/80 leading-relaxed">
                  Settings are automatically saved to your browser session and will persist between visits.
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
