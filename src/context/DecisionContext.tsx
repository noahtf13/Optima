'use client';
import { createContext, useContext, useState } from 'react';

type Option = {
  name: string;
  eloScore: number;
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

type DecisionContext = {
  state: DecisionState;
  addOption: (name: string) => void;
  addVoter: (name: string) => void;
  updateMatchupVote: (voter: string, choice: 'A' | 'B' | 'IDK') => void;
  confirmMatchup: () => void;
  resetSession: () => void;
}

const initialState: DecisionState = {
  options: [],
  voters: [],
  currentMatchup: 0,
  totalMatchups: 0,
  matchupResults: []
};

const DecisionContext = createContext<DecisionContext | null>(null);

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

  return (
    <DecisionContext.Provider value={{
      state,
      addOption,
      addVoter,
      updateMatchupVote,
      confirmMatchup,
      resetSession
    }}>
      {children}
    </DecisionContext.Provider>
  );
}

export const useDecisions = () => {
  const context = useContext(DecisionContext);
  if (!context) throw new Error('useDecisions must be used within DecisionProvider');
  return context;
}; 