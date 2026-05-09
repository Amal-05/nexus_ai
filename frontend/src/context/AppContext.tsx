import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Summary } from '../types';

interface AppContextType {
  documentText: string;
  setDocumentText: (text: string) => void;
  summary: Summary | null;
  setSummary: (summary: Summary | null) => void;
  chatHistory: any[];
  setChatHistory: (history: any[]) => void;
}

const AppContext = createContext<AppContextType>({
  documentText: '',
  setDocumentText: () => {},
  summary: null,
  setSummary: () => {},
  chatHistory: [],
  setChatHistory: () => {}
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [documentText, setDocumentText] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  return (
    <AppContext.Provider value={{
      documentText, setDocumentText,
      summary, setSummary,
      chatHistory, setChatHistory
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
