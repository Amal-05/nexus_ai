import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Upload as UploadIcon, 
  FileText, 
  Image as ImageIcon, 
  Globe, 
  Mic, 
  CheckCircle2, 
  X,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function UploadView({ onUploadComplete }: { onUploadComplete: () => void }) {
  const { setDocumentText, setSummary } = useAppContext();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<{ file: File; name: string; size: string; status: 'pending' | 'uploading' | 'complete' | 'error' }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = (newFiles: File[]) => {
    const mapped = newFiles.map(f => ({
      file: f,
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(2) + ' MB',
      status: 'pending' as const
    }));
    setFiles(prev => [...prev, ...mapped]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const startProcessing = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setFiles(prev => prev.map(f => ({ ...f, status: 'uploading' })));

    try {
      const formData = new FormData();
      formData.append('file', files[0].file);

      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'The Analysis Engine encountered an error.');
      }
      
      const data = await res.json();
      
      setFiles(prev => prev.map(f => ({ ...f, status: 'complete' })));
      setDocumentText(data.text);
      setSummary({
        id: Math.random().toString(36).substr(2, 9),
        title: files[0].name,
        timestamp: new Date().toLocaleString(),
        ...data.summary
      });
      
      onUploadComplete();
    } catch (error: any) {
      console.error('Analysis failed:', error);
      setError(error.message === 'Failed to fetch' 
        ? 'Analysis Engine unreachable. Please ensure the server is running on port 3001.' 
        : error.message
      );
      setFiles(prev => prev.map(f => ({ ...f, status: 'error' })));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Knowledge Ingestion</h2>
        <p className="text-on-surface-variant">Feed Nexus AI your source materials to begin technical analysis.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`
            aspect-square rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-8 transition-all cursor-pointer
            ${isDragging ? 'border-primary bg-primary/10 scale-[1.02]' : 'border-outline-variant/30 hover:border-primary/50 hover:bg-surface-container-high/50'}
          `}
        >
          <div className="w-20 h-20 rounded-2xl bg-surface-container-highest flex items-center justify-center mb-6">
            <UploadIcon className={isDragging ? 'text-primary animate-bounce' : 'text-on-surface-variant'} size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Drop your files here</h3>
          <p className="text-sm text-on-surface-variant text-center mb-8">PDFs, Word docs, Transcripts, or handwritten notes (JPEG/PNG)</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="application/pdf,.doc,.docx,image/*" 
            onChange={(e) => {
              if (e.target.files) processFiles(Array.from(e.target.files));
            }} 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2 rounded-xl bg-surface-container-highest font-bold text-sm hover:bg-surface-container-highest/80 transition-colors"
          >
            Browse Files
          </button>
        </div>

        <div className="space-y-6">
          <h4 className="text-sm font-mono font-bold text-on-surface-variant uppercase tracking-widest">Active Sources</h4>
          <div className="space-y-4">
            {files.length === 0 && (
              <div className="h-32 flex items-center justify-center border border-outline-variant/10 rounded-2xl border-dashed">
                <p className="text-xs text-on-surface-variant opacity-40 italic">No files selected</p>
              </div>
            )}
            {files.map((file, i) => (
              <div key={i} className="glass-card p-4 rounded-xl flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
                    <FileText size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold truncate max-w-[150px]">{file.name}</p>
                    <p className="text-[10px] text-on-surface-variant">{file.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {file.status === 'uploading' ? (
                    <Loader2 size={16} className="animate-spin text-primary" />
                  ) : (
                    <CheckCircle2 size={16} className="text-green-400" />
                  )}
                  <button className="p-1 hover:bg-error/10 hover:text-error rounded transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-outline-variant/10">
            <h4 className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest mb-4">Other Methods</h4>
            <div className="grid grid-cols-3 gap-2">
              <MethodBtn icon={<ImageIcon size={14} />} label="Album" />
              <MethodBtn icon={<Globe size={14} />} label="URL" />
              <MethodBtn icon={<Mic size={14} />} label="Voice" />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-error-container/10 border border-error/20 p-4 rounded-2xl flex items-center gap-3 text-error text-sm"
        >
          <X className="cursor-pointer" size={16} onClick={() => setError(null)} />
          {error}
        </motion.div>
      )}

      <div className="flex justify-center pt-8">
        <button 
          onClick={startProcessing}
          disabled={files.length === 0 || isProcessing}
          className="primary-gradient px-12 py-4 rounded-2xl text-lg font-bold text-on-primary flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
        >
          {isProcessing ? <Loader2 size={24} className="animate-spin" /> : <ArrowRight size={24} />}
          {isProcessing ? 'Processing Neural Graph...' : 'Initiate Analysis'}
        </button>
      </div>
    </div>
  );
}

function MethodBtn({ icon, label }: { icon: any, label: string }) {
  return (
    <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors border border-outline-variant/5">
      <div className="text-on-surface-variant">{icon}</div>
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}
