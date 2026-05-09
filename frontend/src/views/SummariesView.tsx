import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Bookmark, 
  Maximize2,
  ListRestart,
  AlertCircle,
  Lightbulb,
  Zap,
  Loader2,
  X
} from 'lucide-react';
import { generateSummary } from '../lib/gemini';
import { useAppContext } from '../context/AppContext';

export default function SummariesView({ onFlashcards }: { onFlashcards?: () => void }) {
  const { documentText, setDocumentText, summary, setSummary } = useAppContext();
  const [inputText, setInputText] = useState(documentText || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (documentText && !inputText) {
      setInputText(documentText);
    }
  }, [documentText]);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const data = await generateSummary(inputText);
      setDocumentText(inputText);
      setSummary({
        id: Math.random().toString(36).substr(2, 9),
        title: "Current Analysis",
        timestamp: new Date().toLocaleString(),
        ...data
      });
    } catch (error: any) {
      console.error(error);
      setError(error.message === 'Failed to fetch' 
        ? 'Analysis Engine unreachable. Please ensure the server is running on port 3001.' 
        : 'The Analysis Engine encountered an error.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Left: Input / Editor Area */}
      <section className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-primary/20 p-2 rounded-xl text-primary"><FileText size={20} /></div>
            <div>
              <h2 className="text-2xl font-bold">Knowledge Processor</h2>
              <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-60">Input Lab v2.0</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors"><Maximize2 size={18} /></button>
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-error-container/10 border border-error/20 p-4 rounded-2xl flex items-center gap-3 text-error text-sm"
          >
            <AlertCircle size={16} />
            {error}
            <button onClick={() => setError(null)} className="ml-auto opacity-50 hover:opacity-100"><X size={14} /></button>
          </motion.div>
        )}

        <div className="flex-1 glass-card rounded-2xl p-6 flex flex-col relative group">
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your engineering lecture notes, textbook passages, or technical transcripts here..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 resize-none font-sans leading-relaxed"
          />
          
          <div className="mt-4 pt-4 border-t border-outline-variant/10 flex items-center justify-between">
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-on-surface-variant uppercase mb-1">Status</span>
                <span className="text-xs font-bold text-tertiary">Ready to Process</span>
              </div>
            </div>
            <button 
              onClick={handleGenerate}
              disabled={loading || !inputText}
              className="primary-gradient px-8 py-3 rounded-xl font-bold text-on-primary flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              Generate Nexus Summary
            </button>
          </div>
        </div>
      </section>

      {/* Right: Summary Panel */}
      <aside className="w-[450px] flex flex-col gap-6">
        <div className="flex items-center gap-2 px-1">
           <Zap className="text-secondary" size={20} />
           <h3 className="text-xl font-bold text-secondary">AI Insights</h3>
        </div>

        <div className="flex-1 glass-card rounded-3xl p-6 overflow-y-auto custom-scrollbar flex flex-col gap-8">
           {!summary && !loading && (
             <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-30 grayscale italic text-sm">
                <FileText size={48} className="mb-4 opacity-20" />
                Wait for input analysis to see technical breakdown, formulas, and exam tips.
             </div>
           )}

           {loading && (
             <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-pulse">
                <Loader2 size={40} className="animate-spin text-primary opacity-50" />
                <p className="text-xs font-mono font-bold text-primary uppercase tracking-widest">Processing Knowledge Graph...</p>
             </div>
           )}

           {summary && !loading && (
             <>
               <div className="glass-card p-5 rounded-2xl bg-surface-container-high/40 border-t-white/20">
                  <h4 className="text-[10px] font-mono font-bold text-secondary uppercase mb-3 tracking-widest">Executive Summary</h4>
                  <p className="text-sm leading-relaxed text-on-surface/90 italic line-clamp-4">{summary.executiveSummary}</p>
               </div>

               <div className="space-y-4">
                  <h4 className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest px-1">Key Concepts</h4>
                  <div className="space-y-3">
                    {(summary.keyConcepts || []).map((concept, i) => (
                      <div key={i} className="flex gap-3 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shadow-[0_0_8px_rgba(173,198,255,1)]" />
                        <p className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors leading-relaxed">{concept}</p>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="glass-card p-5 rounded-2xl border-l-4 border-l-tertiary">
                  <h4 className="text-[10px] font-mono font-bold text-tertiary uppercase mb-4 tracking-widest">Formula Bank</h4>
                  <div className="space-y-4">
                    {(summary.formulas || []).map((f, i) => (
                      <div key={i} className="space-y-1">
                        <span className="text-[8px] font-mono font-bold text-on-surface-variant uppercase opacity-60 tracking-widest">{f.name}</span>
                        <code className="block bg-surface-container-highest/50 p-2 rounded-lg text-xs font-mono text-on-surface border border-white/5">{f.equation}</code>
                      </div>
                    ))}
                    {(!summary.formulas || summary.formulas.length === 0) && <p className="text-[10px] italic opacity-40">No formulas detected in this set.</p>}
                  </div>
               </div>

               <div className="bg-error-container/10 border border-error/20 p-5 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <AlertCircle size={32} className="text-error" />
                  </div>
                  <h4 className="text-[10px] font-mono font-bold text-error uppercase mb-2 tracking-widest flex items-center gap-1">
                    <Lightbulb size={12} />
                    Exam High-Yield
                  </h4>
                  <p className="text-[11px] text-on-surface/80 leading-relaxed italic">{summary.examTips}</p>
               </div>

               <div className="mt-auto pt-8 flex gap-2">
                  <ActionButton icon={<Copy size={14} />} label="Copy" />
                  <ActionButton icon={<Download size={14} />} label="Export" />
                  <ActionButton icon={<Bookmark size={14} />} label="Save" />
               </div>
               
               <button 
                 onClick={onFlashcards}
                 className="w-full bg-secondary-container text-on-secondary/90 font-bold py-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-2xl shadow-secondary-container/20 hover:brightness-110 active:scale-95 transition-all"
               >
                  <ListRestart size={16} />
                  Convert to Interactive Flashcards
               </button>
             </>
           )}
        </div>
      </aside>
    </div>
  );
}

function ActionButton({ icon, label }: { icon: any, label: string }) {
  return (
    <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-high hover:bg-surface-container-highest transition-colors py-2 rounded-lg text-[10px] font-bold">
      {icon}
      {label}
    </button>
  );
}
