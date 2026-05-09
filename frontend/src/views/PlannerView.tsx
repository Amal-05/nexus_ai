import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  GraduationCap, 
  Target, 
  Clock, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  BookOpenCheck,
  Milestone,
  Settings2,
  Sparkles
} from 'lucide-react';

export default function PlannerView({ onNavigate }: { onNavigate: (view: any) => void }) {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'milestones' | 'performance'>('roadmap');

  return (
    <div className="h-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="bg-secondary-container/20 p-3 rounded-2xl text-secondary">
              <Calendar size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Semester Planner</h2>
              <p className="text-on-surface-variant">Adaptive study roadmaps synchronized with your curriculum and exam dates.</p>
            </div>
         </div>
         <div className="flex bg-surface-container rounded-2xl p-1 border border-outline-variant/10">
            <TabBtn active={activeTab === 'roadmap'} onClick={() => setActiveTab('roadmap')} icon={<Target size={14} />} label="Roadmap" />
            <TabBtn active={activeTab === 'milestones'} onClick={() => setActiveTab('milestones')} icon={<Milestone size={14} />} label="Milestones" />
            <TabBtn active={activeTab === 'performance'} onClick={() => setActiveTab('performance')} icon={<BarChart3 size={14} />} label="Analytics" />
         </div>
      </div>

      <div className="flex-1 min-h-0">
         {activeTab === 'roadmap' && (
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
              <div className="lg:col-span-3 glass-card rounded-[40px] p-8 overflow-y-auto custom-scrollbar">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold">Study Sessions - Week 14</h3>
                    <div className="flex gap-2">
                       <button className="p-2 bg-surface-container-highest rounded-xl"><Settings2 size={18} /></button>
                       <button 
                          onClick={() => onNavigate('upload')}
                          className="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                          <Plus size={14} /> Plan Session
                       </button>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <PlannerItem 
                      time="09:00 - 11:30" 
                      title="Review Lecture Notes" 
                      subject="Module 1" 
                      status="completed" 
                      priority="High"
                    />
                    <PlannerItem 
                      time="13:00 - 14:30" 
                      title="AI Synthesis Session" 
                      subject="General" 
                      status="in-progress" 
                      priority="Medium"
                    />
                    <PlannerItem 
                      time="16:00 - 18:00" 
                      title="Practice Question Bank" 
                      subject="Self-Study" 
                      status="upcoming" 
                      priority="Urgent"
                    />
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="glass-card rounded-[32px] p-6">
                    <h4 className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest mb-6">Subject Progress</h4>
                    <div className="space-y-6">
                       <ProgressBar label="Active Module" percent="85%" color="bg-primary" />
                       <ProgressBar label="Revision Goal" percent="62%" color="bg-tertiary" />
                       <ProgressBar label="Self-Assessment" percent="40%" color="bg-secondary" />
                    </div>
                 </div>

                 <div className="glass-card rounded-[32px] p-6 bg-primary-container text-on-primary-container relative overflow-hidden group">
                    <div className="relative z-10">
                       <h4 className="text-lg font-bold mb-2">AI Academic Advisor</h4>
                       <p className="text-xs leading-relaxed opacity-90">
                         Your study velocity is increasing! Based on your recent uploads, we recommend focusing on the "Synthesis" stage for your next session to maintain peak performance.
                       </p>
                    </div>
                    <Sparkles className="absolute -right-4 -top-4 text-white opacity-10 group-hover:scale-125 transition-transform" size={120} />
                 </div>
              </div>
           </div>
         )}
         
         {activeTab !== 'roadmap' && (
           <div className="h-full flex items-center justify-center glass-card rounded-[40px] opacity-30 italic text-sm">
             Advanced {activeTab} visualization under construction in the next deployment cycle.
           </div>
         )}
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${active ? 'bg-surface text-primary shadow-lg' : 'text-on-surface-variant hover:text-on-surface'}`}
    >
      {icon}
      {label}
    </button>
  );
}

function PlannerItem({ time, title, subject, status, priority }: any) {
  return (
    <div className="glass-card p-5 rounded-3xl flex items-center justify-between group hover:bg-surface-container-high/40 transition-all border border-transparent hover:border-outline-variant/10">
       <div className="flex items-center gap-6">
          <div className="w-24">
             <p className="text-[10px] font-mono font-bold text-on-surface-variant uppercase">{time}</p>
          </div>
          <div className="h-10 w-px bg-outline-variant/10" />
          <div className="flex items-center gap-4">
             <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status === 'completed' ? 'bg-green-400/10 text-green-400' : status === 'in-progress' ? 'bg-tertiary/10 text-tertiary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                {status === 'completed' ? <CheckCircle2 size={18} /> : status === 'in-progress' ? <Clock size={18} /> : <Milestone size={18} />}
             </div>
             <div>
                <h5 className="font-bold">{title}</h5>
                <p className="text-[10px] font-mono text-on-surface-variant uppercase mt-0.5">{subject} • {priority} Priority</p>
             </div>
          </div>
       </div>
       <button className="opacity-0 group-hover:opacity-100 p-2 bg-surface-container rounded-lg transition-all">
          <Plus size={16} />
       </button>
    </div>
  );
}

function ProgressBar({ label, percent, color }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-mono">
        <span className="opacity-60">{label}</span>
        <span className="font-bold">{percent}</span>
      </div>
      <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: percent }} />
      </div>
    </div>
  );
}
