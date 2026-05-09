import { Terminal, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export default function LandingView({ onGetStarted }: { onGetStarted: () => void }) {
  const { user, signInWithGoogle } = useAuth();

  const handleAuth = () => {
    onGetStarted();
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary-container relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }} />
      
      {/* Hero Particles Effect Sim */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 4 + 'px',
              height: Math.random() * 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <header className="relative z-10 max-w-7xl mx-auto px-8 h-20 flex items-center justify-between border-b border-outline-variant/10 bg-surface/60 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Terminal className="text-primary" size={24} />
          <span className="text-2xl font-bold tracking-tighter text-primary">Nexus AI</span>
        </div>
        <nav className="flex items-center gap-8">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Features</a>

          <button onClick={handleAuth} className="primary-gradient px-6 py-2 rounded-lg text-sm font-bold text-on-primary shadow-lg shadow-primary-container/20 flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
            {user ? 'Dashboard' : 'Signup'}
          </button>
        </nav>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-64">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 border border-secondary-container/30 text-secondary text-[10px] font-mono font-bold tracking-widest uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              Next-Gen Engineering OS
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl font-bold leading-[1.1] tracking-tight"
            >
              Your AI-Powered <span className="text-transparent bg-clip-text primary-gradient">Engineering</span> Study Partner
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-on-surface-variant max-w-lg leading-relaxed"
            >
              Upload notes, generate summaries, prepare for viva, and plan semesters smarter. Designed for the rigor of technical mastery.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <button 
                onClick={handleAuth}
                className="primary-gradient px-8 py-4 rounded-xl text-lg font-bold text-on-primary flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {user ? 'Continue to App' : 'Get Started'}
                <ArrowRight size={20} />
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 pt-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container-highest" />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-surface bg-primary/20 text-[10px] font-bold text-primary flex items-center justify-center">+2k</div>
              </div>
              <p className="text-xs text-on-surface-variant">Trusted by students at leading technical universities.</p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-[100px] rounded-full opacity-50"></div>
            <div className="glass-card rounded-2xl p-4 shadow-2xl relative overflow-hidden aspect-video group">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                alt="Dashboard" 
                className="w-full h-full object-cover rounded-xl opacity-40 group-hover:opacity-60 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Terminal className="text-primary/50 animate-pulse" size={64} />
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-8 py-32 border-t border-outline-variant/10">
        <h2 className="text-3xl font-bold text-center mb-16">The Intelligence Workflow</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<UploadIcon className="text-primary" />} 
            step="01" 
            title="Upload" 
            desc="Feed the AI your raw lecture notes, PDFs, textbook chapters, or handwritten diagram snapshots." 
          />
          <FeatureCard 
            icon={<Brain className="text-tertiary" />} 
            step="02" 
            title="Analyze" 
            desc="Nexus AI parses formulas, diagrams, and complex logic. It maps your curriculum to a semester knowledge graph." 
          />
          <FeatureCard 
            icon={<CheckCircle className="text-secondary" />} 
            step="03" 
            title="Excel" 
            desc="Access hyper-summaries, custom question banks for viva prep, and automated study schedules." 
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, step, title, desc }: { icon: any, step: string, title: string, desc: string }) {
  return (
    <div className="glass-card p-8 rounded-2xl group hover:bg-surface-container-high/40 transition-all border-l-4 border-l-primary/30">
      <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center mb-6">{icon}</div>
      <div className="text-[10px] font-mono font-bold text-primary mb-2 uppercase tracking-widest">Step {step}</div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
    </div>
  );
}

function UploadIcon(props: any) { return <UploadIconInner {...props} />; }
function UploadIconInner(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>; }
function Brain(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.28 2.5 2.5 0 0 1 4.44-2.5Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.28 2.5 2.5 0 0 0-4.44-2.5Z"></path></svg>; }
function CheckCircle(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>; }
