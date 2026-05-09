import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trophy
} from 'lucide-react';
import { Question } from '../types';
import { generateQuestionBank } from '../lib/gemini';
import { useAppContext } from '../context/AppContext';

export default function QuestionBankView() {
  const { documentText } = useAppContext();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mastered, setMastered] = useState<number[]>([]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const context = documentText || "Engineering fundamentals and technical study roadmap.";
      const data = await generateQuestionBank(context);
      if (!data || data.length === 0) throw new Error("No questions could be generated from this context.");
      setQuestions(data);
      setCurrentIdx(0);
      setShowAnswer(false);
    } catch (error: any) {
      console.error(error);
      setError(error.message === 'Failed to fetch' 
        ? 'Analysis Engine unreachable. Please ensure the server is running on port 3001.' 
        : error.message || 'Failed to generate question bank.'
      );
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentIdx];

  return (
    <div className="h-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Question Bank</h2>
          <p className="text-on-surface-variant">Master technical concepts through AI-generated viva challenges.</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="bg-secondary-container text-on-secondary px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
          Regenerate Questions
        </button>
      </div>

      <div className="flex-1 flex gap-8">
        {/* Progress Rail */}
        <aside className="w-64 glass-card rounded-3xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">Mastery Status</span>
            <Trophy size={16} className="text-primary" />
          </div>
          
          <div className="space-y-3 flex-1">
            {(questions || []).map((q, i) => (
              <button 
                key={i}
                onClick={() => { setCurrentIdx(i); setShowAnswer(false); }}
                className={`
                  w-full p-4 rounded-2xl flex items-center gap-3 transition-all
                  ${i === currentIdx ? 'bg-primary/20 border border-primary/30 shadow-lg shadow-primary/10' : 'bg-surface-container hover:bg-surface-container-high border border-transparent'}
                `}
              >
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold
                  ${mastered.includes(i) ? 'bg-green-400 text-surface' : 'bg-surface-container-highest text-on-surface-variant'}
                `}>
                  {mastered.includes(i) ? <CheckCircle2 size={12} /> : i + 1}
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-xs font-bold truncate">{q.question}</p>
                  <p className={`text-[8px] font-mono font-bold uppercase ${q.difficulty === 'Hard' ? 'text-error' : q.difficulty === 'Medium' ? 'text-tertiary' : 'text-primary'}`}>
                    {q.difficulty}
                  </p>
                </div>
              </button>
            ))}
            {questions.length === 0 && (
              <div className="text-center py-12 opacity-30 grayscale italic text-[10px]">
                Generate questions to see progress here.
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant/10">
            <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase mb-2">
              <span>Overall Score</span>
              <span>{Math.round((mastered.length / (questions.length || 1)) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500" 
                style={{ width: `${(mastered.length / (questions.length || 1)) * 100}%` }} 
              />
            </div>
          </div>
        </aside>

        {/* Question Card */}
        <div className="flex-1 flex flex-col gap-6">
          {error && (
            <div className="bg-error-container/10 border border-error/20 p-6 rounded-3xl text-error text-center space-y-4">
              <AlertCircle className="mx-auto" size={32} />
              <p className="text-sm font-bold">{error}</p>
              <button onClick={handleGenerate} className="text-xs underline font-mono">Try Again</button>
            </div>
          )}

          {!currentQuestion && !loading && !error && (
            <div className="flex-1 glass-card rounded-[40px] flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8">
                <HelpCircle size={48} className="text-primary opacity-50" />
              </div>
              <h3 className="text-2xl font-bold mb-4">No Active Session</h3>
              <p className="text-on-surface-variant max-w-sm mb-12">
                Generate a new question bank based on your uploaded notes or a specific engineering topic.
              </p>
              <button 
                onClick={handleGenerate}
                className="primary-gradient px-10 py-4 rounded-2xl font-bold text-on-primary shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all"
              >
                Generate First Set
              </button>
            </div>
          )}

          {currentQuestion && (
            <motion.div 
              key={currentIdx}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 glass-card rounded-[40px] p-12 flex flex-col relative overflow-hidden"
            >
                <div className="flex justify-between items-start mb-12">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                        <HelpCircle size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">Question {currentIdx + 1}</p>
                        <h4 className="text-xl font-bold">Technical Challenge</h4>
                      </div>
                   </div>
                   <div className={`px-4 py-1.5 rounded-full border text-[10px] font-mono font-bold uppercase ${currentQuestion.difficulty === 'Hard' ? 'bg-error/10 border-error/20 text-error' : currentQuestion.difficulty === 'Medium' ? 'bg-tertiary/10 border-tertiary/20 text-tertiary' : 'bg-primary/10 border-primary/20 text-primary'}`}>
                      {currentQuestion.difficulty} Level
                   </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-3xl font-bold leading-tight mb-12">"{currentQuestion?.question}"</h3>
                  
                  {showAnswer && currentQuestion && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-card p-8 rounded-3xl bg-surface-container-high/40 border-t-white/10"
                    >
                      <h5 className="text-[10px] font-mono font-bold text-primary uppercase mb-4 tracking-widest flex items-center gap-2">
                        <Sparkles size={14} /> AI Model Answer
                      </h5>
                      <p className="text-lg leading-relaxed text-on-surface/90 italic">
                        {currentQuestion.answer}
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="mt-12 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                      disabled={currentIdx === 0}
                      className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors disabled:opacity-20"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                      disabled={currentIdx === questions.length - 1}
                      className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors disabled:opacity-20"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => setShowAnswer(!showAnswer)}
                      className="px-8 py-4 rounded-2xl bg-surface-container-highest font-bold hover:bg-surface-container-high transition-colors"
                    >
                      {showAnswer ? 'Hide Insight' : 'Reveal Model Answer'}
                    </button>
                    <button 
                      onClick={() => {
                        const isCurrentlyMastered = mastered.includes(currentIdx);
                        if (isCurrentlyMastered) {
                          setMastered(prev => prev.filter(id => id !== currentIdx));
                        } else {
                          setMastered(prev => [...prev, currentIdx]);
                          
                          // Auto-advance with a clearer delay for visual confirmation
                          if (currentIdx < questions.length - 1) {
                            setTimeout(() => {
                              setCurrentIdx(prev => prev + 1);
                              setShowAnswer(false);
                            }, 600);
                          }
                        }
                      }}
                      className={`
                        px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95
                        ${mastered.includes(currentIdx) 
                          ? 'bg-green-400 text-surface shadow-xl shadow-green-400/20' 
                          : 'primary-gradient text-on-primary shadow-xl shadow-primary/20 hover:scale-[1.02]'
                        }
                      `}
                    >
                      {mastered.includes(currentIdx) ? <CheckCircle2 size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-current opacity-50" />}
                      {mastered.includes(currentIdx) ? 'Mastered!' : 'I Mastered This'}
                    </button>
                  </div>
                </div>

                <div className="absolute right-0 bottom-0 p-8 opacity-5">
                   <BookOpen size={200} />
                </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
