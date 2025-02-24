'use client';
import { createContext, useContext, useState } from 'react';

interface Option {
  name: string;
  eloScore: number;
  eliminated?: boolean;
}

type DecisionState = {
  options: Option[];
  voters: string[];
  currentMatchup: number;
  totalMatchups: number;
  matchupResults: Array<{
    optionA: string;
    optionB: string;
    votes: Array<{voter: string, choice: 'A' | 'B' | 'IDK'}>
  }>;
}

export type DecisionContextType = {
  state: DecisionState;
  addOption: (option: Option) => void;
  clearOptions: () => void;
  addVoter: (voter: string) => void;
  clearVoters: () => void;
  updateOptionElo: (index: number, newElo: number) => void;
  updateMatchupVote: (voter: string, choice: 'A' | 'B' | 'IDK') => void;
  confirmMatchup: () => void;
  resetSession: () => void;
  updateOptionElimination: (index: number, eliminated: boolean) => void;
}

const initialState: DecisionState = {
  options: [],
  voters: [],
  currentMatchup: 0,
  totalMatchups: 0,
  matchupResults: []
};

const DecisionContext = createContext<DecisionContextType | null>(null);

export function DecisionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DecisionState>(initialState);

  const addOption = (name: string) => {
    setState(prev => ({
      ...prev,
      options: [...prev.options, { name, eloScore: 1500 }]
    }));
  };

  const addVoter = (name: string) => {
    setState(prev => ({
      ...prev,
      voters: [...prev.voters, name]
    }));
  };

  const updateOptionElo = (index: number, newElo: number) => {
    setState(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => 
        i === index ? { ...opt, eloScore: newElo } : opt
      )
    }));
  };

  const updateMatchupVote = (voter: string, choice: 'A' | 'B' | 'IDK') => {
    setState(prev => ({
      ...prev,
      matchupResults: prev.matchupResults.map(matchup => 
        matchup.optionA === voter ? { ...matchup, votes: matchup.votes.map(vote => vote.voter === voter ? { ...vote, choice } : vote) } : matchup
      )
    }));
  };

  const confirmMatchup = () => {
    setState(prev => ({
      ...prev,
      currentMatchup: prev.currentMatchup + 1,
      matchupResults: []
    }));
  };

  const resetSession = () => {
    setState(initialState);
  };

  const updateOptionElimination = (index: number, eliminated: boolean) => {
    setState(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => 
        i === index ? { ...opt, eliminated } : opt
      )
    }));
  };

  const clearOptions = () => {
    setState(prev => ({
      ...prev,
      options: []
    }));
  };

  const clearVoters = () => {
    setState(prev => ({ ...prev, voters: [] }));
  };

  return (
    <DecisionContext.Provider value={{
      state,
      addOption,
      addVoter,
      clearOptions,
      updateOptionElo,
      updateMatchupVote,
      confirmMatchup,
      resetSession,
      updateOptionElimination,
      clearVoters
    }}>
      {children}
    </DecisionContext.Provider>
  );
}

export function useDecisions() {
  const context = useContext(DecisionContext);
  if (!context) {
    throw new Error('useDecisions must be used within a DecisionProvider');
  }
  return context;
} 