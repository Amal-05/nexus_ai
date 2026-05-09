import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ScanLine, 
  Upload as UploadIcon, 
  Sparkles, 
  Loader2, 
  X,
  Maximize2,
  FileSearch,
  Zap,
  Layers,
  ArrowRight
} from 'lucide-react';
import { explainDiagram } from '../lib/gemini';

export default function DiagramExplainerView() {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setImage(base64);
        setAnalysis('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const base64Data = image.split(',')[1];
      const result = await explainDiagram(base64Data);
      setAnalysis(result || "Could not analyze diagram.");
    } catch (error) {
      console.error(error);
      setAnalysis("Technical error during neural scan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="bg-tertiary/20 p-3 rounded-2xl text-tertiary">
              <ScanLine size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Diagram Explainer</h2>
              <p className="text-on-surface-variant">AI-powered visual analysis for technical schematics and blueprints.</p>
            </div>
         </div>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        {/* Left: Image Canvas */}
        <section className="flex-[1.2] flex flex-col gap-4">
           <div className="flex-1 glass-card rounded-[40px] relative overflow-hidden flex flex-col items-center justify-center group p-4">
              {image ? (
                <>
                  <img src={image} alt="Target Diagram" className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-surface-container-lowest/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex items-center justify-center gap-4">
                     <button className="bg-surface/80 p-4 rounded-2xl hover:bg-white/90 hover:text-surface transition-all active:scale-95">
                        <Maximize2 size={24} />
                     </button>
                     <button 
                       onClick={() => { setImage(null); setAnalysis(''); }}
                       className="bg-error/30 p-4 rounded-2xl hover:bg-error hover:text-white transition-all active:scale-95"
                     >
                        <X size={24} />
                     </button>
                  </div>
                </>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-full border-4 border-dashed border-outline-variant/10 rounded-[32px] flex flex-col items-center justify-center p-12 hover:border-tertiary/40 hover:bg-tertiary/5 transition-all cursor-pointer group"
                >
                  <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center mb-8 border border-outline-variant/10 group-hover:scale-110 group-hover:bg-tertiary/10 transition-all">
                    <UploadIcon size={40} className="group-hover:text-tertiary transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Feed Diagram Core</h3>
                  <p className="text-on-surface-variant max-w-xs text-center leading-relaxed">
                    Drop a JPEG, PNG, or scan result. Works with circuit diagrams, flowcharts, and mechanical blueprints.
                  </p>
                </div>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
           </div>

           <div className="flex gap-4">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 glass-card py-4 rounded-2xl font-bold hover:bg-surface-container-high transition-all flex items-center justify-center gap-2"
              >
                 <UploadIcon size={18} />
                 Change Image
              </button>
              <button 
                onClick={handleAnalyze}
                disabled={!image || loading}
                className="flex-[2] primary-gradient py-4 rounded-2xl font-bold text-on-primary shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
              >
                {loading ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} />}
                {loading ? 'Neural Scanning...' : 'Run Component Analysis'}
              </button>
           </div>
        </section>

        {/* Right: Analysis Panel */}
        <aside className="flex-1 flex flex-col gap-6">
           <div className="glass-card rounded-[40px] p-8 flex-1 flex flex-col overflow-hidden relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-tertiary/20 p-2 rounded-xl text-tertiary"><FileSearch size={18} /></div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">Logic Breakdown</p>
                  <h4 className="text-lg font-bold">Structural Insights</h4>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-8">
                 {!analysis && !loading && (
                   <div className="h-full flex flex-col items-center justify-center text-center opacity-20 grayscale italic">
                      <Layers size={48} className="mb-4" />
                      <p className="text-xs max-w-[200px]">Analysis will appear here once the neural scan is complete.</p>
                   </div>
                 )}

                 {loading && (
                    <div className="space-y-4 animate-pulse">
                       {[...Array(6)].map((_, i) => (
                         <div key={i} className={`h-4 bg-surface-container-highest rounded-full ${i % 2 === 0 ? 'w-full' : 'w-3/4'}`} />
                       ))}
                    </div>
                 )}

                 {analysis && !loading && (
                   <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }}
                     className="prose prose-invert prose-sm max-w-none text-on-surface/90 leading-relaxed space-y-6"
                   >
                     {analysis.split('\n\n').map((para, i) => (
                       <div key={i} className="group">
                         <p className="whitespace-pre-wrap">{para}</p>
                         <div className="h-px w-0 group-hover:w-full bg-tertiary/20 transition-all duration-700 mt-4" />
                       </div>
                     ))}
                   </motion.div>
                 )}
              </div>

              {analysis && (
                <div className="pt-8 mt-4 border-t border-outline-variant/10 space-y-4">
                  <div className="flex gap-2">
                    <AnalysisTag icon={<Zap size={10} />} label="Physics" />
                    <AnalysisTag icon={<Layers size={10} />} label="Schematics" />
                    <AnalysisTag icon={<ScanLine size={10} />} label="High Confidence" />
                  </div>
                  <button className="w-full bg-surface-container-highest/50 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-all group">
                     Ask follow-up question
                     <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
           </div>
        </aside>
      </div>
    </div>
  );
}

function AnalysisTag({ icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-[10px] font-mono font-bold uppercase text-on-surface-variant border border-outline-variant/10">
      {icon}
      {label}
    </div>
  );
}
