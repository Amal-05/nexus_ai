export type View = 'landing' | 'auth' | 'dashboard' | 'upload' | 'summaries' | 'chat' | 'questions' | 'diagram' | 'planner' | 'settings';

export interface Summary {
  id: string;
  title: string;
  executiveSummary: string;
  keyConcepts: string[];
  formulas: { name: string; equation: string }[];
  examTips: string;
  timestamp: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Question {
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
