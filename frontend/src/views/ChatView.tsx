import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Mic2, 
  Bot, 
  User, 
  Sparkles,
  History,
  Terminal,
  Zap,
  MoreVertical,
  Volume2,
  RefreshCw,
  Clock
} from 'lucide-react';
import { chatWithAI } from '../lib/gemini';
import { ChatMessage } from '../types';
import { useAppContext } from '../context/AppContext';

export default function ChatView() {
  const { documentText, chatHistory, setChatHistory } = useAppContext();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input.trim();
    setChatHistory([...chatHistory, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatWithAI(userMsg, documentText, chatHistory);
      setChatHistory([...chatHistory, { role: 'user', content: userMsg }, { role: 'assistant', content: response.reply }]);
    } catch (error) {
      console.error(error);
      setChatHistory([...chatHistory, { role: 'user', content: userMsg }, { role: 'assistant', content: "I encountered a technical glitch in my logic core. Could you try asking that again?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full flex gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Main Chat Interface */}
      <section className="flex-1 flex flex-col relative border border-outline-variant/10 rounded-3xl overflow-hidden glass-card">
        {/* Chat Header */}
        <div className="px-8 py-6 flex justify-between items-center bg-surface-container/40 backdrop-blur-md border-b border-outline-variant/10">
          <div className="flex items-center gap-4">
            <div className="ai-orb p-2 rounded-xl">
              <Bot size={20} className="text-on-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                Viva Engine v2.4 
                <Sparkles size={14} className="text-primary animate-pulse" />
              </h2>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <p className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Neural Core Online</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container border border-outline-variant/10 hover:bg-surface-container-high transition-all text-xs font-bold">
              <History size={14} /> session history
            </button>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors"><MoreVertical size={18} /></button>
          </div>
        </div>

        {/* Messages Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-8 space-y-8 custom-scrollbar">
          {chatHistory.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center">
                <Bot size={40} className="text-primary/40" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Secure Viva Mode</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Start your oral exam practice or ask any technical engineering question. Nexus AI is primed with your semester curriculum.
                </p>
              </div>
              <div className="grid grid-cols-1 w-full gap-2 pt-4">
                <SuggestionBtn text="Start a mock technical viva" onClick={() => setInput("Start a mock technical viva based on my document")} />
                <SuggestionBtn text="Explain the core concepts intuitively" onClick={() => setInput("Explain the core concepts from this document in simple terms")} />
                <SuggestionBtn text="Analyze potential exam questions" onClick={() => setInput("What are the most likely exam questions from this topic?")} />
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {chatHistory.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}
              >
                {msg.role === 'assistant' && (
                   <div className="w-10 h-10 rounded-xl ai-orb flex items-center justify-center shrink-0">
                     <Bot size={20} className="text-on-primary" />
                   </div>
                )}
                
                <div className={`
                   max-w-[80%] p-5 rounded-2xl relative
                   ${msg.role === 'user' 
                     ? 'bg-primary-container text-on-primary-container font-medium rounded-tr-none shadow-xl shadow-primary/10' 
                     : 'glass-card text-on-surface rounded-tl-none border-t-white/10'
                   }
                `}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  
                  {msg.role === 'assistant' && (
                    <div className="mt-4 flex gap-2 border-t border-outline-variant/10 pt-4">
                        <MsgTool icon={<Volume2 size={12} />} />
                        <MsgTool icon={<RefreshCw size={12} />} />
                        <MsgTool icon={<Terminal size={12} />} />
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-10 h-10 rounded-xl bg-secondary-container/20 flex items-center justify-center shrink-0 border border-secondary/20">
                    <User size={20} className="text-secondary" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
               <div className="w-10 h-10 rounded-xl ai-orb flex items-center justify-center animate-pulse">
                <Bot size={20} className="text-on-primary" />
              </div>
              <div className="glass-card p-5 rounded-2xl rounded-tl-none flex gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Footer */}
        <div className="px-8 pb-8 pt-4">
          <div className="glass-card rounded-2xl p-2 flex items-center gap-2 focus-within:ring-2 focus-within:ring-primary/40 transition-all border-white/20">
            <button className="p-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high rounded-xl">
              <Paperclip size={20} />
            </button>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your response or ask a follow-up..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-4 ml-2"
            />
            <div className="flex items-center gap-2 pr-2">
              <button className="p-3 text-on-surface-variant hover:text-secondary transition-colors hover:bg-surface-container-high rounded-xl">
                <Mic2 size={20} />
              </button>
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-primary text-on-primary p-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 opacity-30 text-[9px] font-mono font-bold uppercase tracking-[0.2em]">
            <Zap size={10} className="text-primary" /> Proctoring active • Nexus AI v2.4
          </div>
        </div>
      </section>

      {/* Right Rail: Session Info */}
      <aside className="w-80 flex flex-col gap-6">
        <div className="glass-card rounded-3xl p-6">
          <h4 className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-widest mb-6 flex justify-between items-center">
            Session Stats
            <TrendingUpSmall />
          </h4>
          <div className="space-y-4">
             <StatRow label="Time Elapsed" value="12:45" icon={<Clock size={12} />} />
             <StatRow label="Accuracy" value="92%" icon={<Sparkles size={12} />} />
             <StatRow label="Focus Level" value="High" icon={<Zap size={12} />} />
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 flex-1 flex flex-col">
           <h4 className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-widest mb-6">Subject Knowledge</h4>
           <div className="space-y-6">
              <TopicBar label="Technical Accuracy" percent="85%" color="bg-primary" />
              <TopicBar label="Conceptual Depth" percent="62%" color="bg-tertiary" />
              <TopicBar label="Problem Solving" percent="40%" color="bg-secondary" />
           </div>
           
           <div className="mt-auto bg-surface-container-highest/30 rounded-2xl p-4 border border-white/5 group overflow-hidden relative">
              <Terminal size={14} className="mb-2 text-primary opacity-50" />
              <p className="text-[10px] text-on-surface-variant leading-relaxed">
                Nexus AI is identifying "Dynamic Stability" as your high-leak topic. Recommend focusing on pole-zero plots.
              </p>
              <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all" />
           </div>
        </div>
      </aside>
    </div>
  );
}

function SuggestionBtn({ text, onClick }: { text: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="text-left px-4 py-2 text-xs border border-outline-variant/10 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-on-surface"
    >
      {text}
    </button>
  );
}

function MsgTool({ icon }: { icon: any }) {
  return (
    <button className="p-1.5 hover:bg-surface-container-highest rounded-lg text-on-surface-variant transition-colors">
      {icon}
    </button>
  );
}

function StatRow({ label, value, icon }: { label: string, value: string, icon: any }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 opacity-60">
        {icon}
        <span className="text-[10px] font-medium">{label}</span>
      </div>
      <span className="text-xs font-mono font-bold">{value}</span>
    </div>
  );
}

function TopicBar({ label, percent, color }: { label: string, percent: string, color: string }) {
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

function TrendingUpSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
      <polyline points="16 7 22 7 22 13"></polyline>
    </svg>
  );
}
