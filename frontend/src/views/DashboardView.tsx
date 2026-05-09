import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { 
  FileText, 
  MessageSquare, 
  BookOpen, 
  ScanLine, 
  Network,
  Milestone,
  ArrowRight,
  TrendingUp,
  Flame,
  Trophy
} from 'lucide-react';

export default function DashboardView({ onNavigate }: { onNavigate: (view: any) => void }) {
  const { user } = useAuth();
  const { summary } = useAppContext();
  
  // Robust name extraction to prevent crashes if displayName is null
  const rawName = user?.displayName || user?.email?.split('@')[0] || 'Scholar';
  const firstName = rawName.split(' ')[0];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Welcome Banner */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card rounded-3xl p-10 relative group">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-3">Good Evening, {firstName} 👋</h2>
            <p className="text-lg text-on-surface-variant max-w-md">
              {summary ? (
                <>Currently analyzing <span className="text-primary font-bold">{summary.title}</span>. Continue your deep dive or start a new task.</>
              ) : (
                <>Ready to accelerate your learning? Upload your notes to begin AI synthesis.</>
              )}
            </p>
            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => onNavigate(summary ? 'summaries' : 'upload')}
                className="primary-gradient px-8 py-3 rounded-xl font-bold text-on-primary shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {summary ? 'Continue Analysis' : 'Start Now'}
              </button>
              <button 
                onClick={() => onNavigate('planner')}
                className="px-8 py-3 rounded-xl bg-surface-container-high/50 border border-outline-variant/30 font-bold backdrop-blur-md hover:bg-surface-container-highest transition-colors"
              >
                View Planner
              </button>
            </div>
          </div>
          <div className="absolute right-12 bottom-12 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={160} className="text-primary" />
          </div>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
        </div>

        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">AI Productivity Score</p>
              <h3 className="text-4xl font-bold text-primary mt-1">0%</h3>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-surface-container-highest flex items-center justify-center relative">
               <svg className="absolute inset-0 w-full h-full -rotate-90">
                 <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-primary" strokeDasharray="176" strokeDashoffset="176" />
               </svg>
               <span className="text-xs font-bold">-</span>
            </div>
          </div>
          
          <div className="py-4 border-y border-outline-variant/10 my-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container/20 flex items-center justify-center border border-secondary/20">
              <Flame className="text-secondary" size={24} />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-on-surface-variant uppercase">0-Day Streak</p>
              <p className="text-sm font-bold">Start Learning</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono font-bold uppercase text-on-surface-variant">Weekly Goal</span>
              <span className="text-[10px] font-mono font-bold text-tertiary">0/30 hrs</span>
            </div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-tertiary w-[0%] rounded-full shadow-[0_0_10px_rgba(76,215,246,0.3)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Quick AI Lab</h3>
          <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
            Explore All Tools <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard 
            icon={<FileText className="text-primary" />} 
            title="Summarize" 
            desc="One-click AI extraction for complex technical documents."
            accent="primary"
            onClick={() => onNavigate('upload')}
          />
          <ToolCard 
            icon={<MessageSquare className="text-secondary" />} 
            title="Viva Prep" 
            desc="Practice technical oral exams with real-time feedback."
            accent="secondary"
            onClick={() => onNavigate('chat')}
          />
          <ToolCard 
            icon={<Network className="text-tertiary" />} 
            title="Knowledge Graph" 
            desc="Visualize topical connections across your modules."
            accent="tertiary"
            onClick={() => onNavigate('diagram')}
          />
        </div>
      </section>

      {/* Activity & Milestones */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
        <div className="glass-card rounded-3xl p-8">
           <h4 className="text-xl font-bold mb-6 flex items-center justify-between">
              Recent Activity
              <span className="text-[10px] font-mono text-on-surface-variant uppercase">Last 24 Hours</span>
           </h4>
           <div className="space-y-4">
              {summary ? (
                <ActivityItem 
                  icon={<FileText className="text-primary" />} 
                  title={summary.title} 
                  detail={`Summary generated ${summary.timestamp}`} 
                />
              ) : (
                <div className="py-8 text-center opacity-30 italic text-xs">
                  No recent activity found. Upload a document to start.
                </div>
              )}
           </div>
        </div>

        <div className="glass-card rounded-3xl p-8">
           <h4 className="text-xl font-bold mb-6 flex items-center justify-between">
              Study Milestones
              <Trophy size={18} className="text-primary" />
           </h4>
           <div className="space-y-6">
              <div className="py-8 text-center opacity-30 italic text-xs">
                No milestones yet. Complete modules to earn them.
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}

function ToolCard({ icon, title, desc, accent, onClick }: { icon: any, title: string, desc: string, accent: 'primary' | 'secondary' | 'tertiary', onClick?: () => void }) {
  const accentColors = {
    primary: 'border-l-primary/40 group-hover:border-l-primary',
    secondary: 'border-l-secondary/40 group-hover:border-l-secondary',
    tertiary: 'border-l-tertiary/40 group-hover:border-l-tertiary'
  };

  return (
    <div 
      onClick={onClick}
      className={`glass-card p-6 rounded-2xl group cursor-pointer border-l-4 ${accentColors[accent]} transition-all`}
    >
      <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{desc}</p>
      <div className="h-16 rounded-xl bg-surface-container-low/50 border border-outline-variant/10 flex items-center justify-center text-[10px] font-mono text-on-surface-variant/40 uppercase">
        Drop file or click to start
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, detail }: { icon: any, title: string, detail: string }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-container-high/40 transition-colors cursor-pointer">
      <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="text-[10px] text-on-surface-variant mt-1">{detail}</p>
      </div>
    </div>
  );
}

function MilestoneItem({ status, title, desc }: { status: 'completed' | 'in-progress' | 'upcoming', title: string, desc: string }) {
  return (
    <div className="relative pl-6 border-l-2 border-outline-variant/20 group">
      <div className={`
        absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-surface
        ${status === 'completed' ? 'bg-primary ring-4 ring-primary/10' : ''}
        ${status === 'in-progress' ? 'bg-tertiary ring-4 ring-tertiary/10' : ''}
        ${status === 'upcoming' ? 'bg-surface-container-highest' : ''}
      `} />
      <div>
        <p className={`text-[10px] font-mono font-bold uppercase mb-1 ${status === 'completed' ? 'text-primary' : status === 'in-progress' ? 'text-tertiary' : 'text-on-surface-variant opacity-60'}`}>
          {status.replace('-', ' ')}
        </p>
        <h5 className="text-sm font-bold">{title}</h5>
        <p className="text-xs text-on-surface-variant mt-1">{desc}</p>
      </div>
    </div>
  );
}
