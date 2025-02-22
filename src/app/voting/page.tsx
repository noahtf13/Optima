'use client';
import { useDecisions } from '@/context/DecisionContext';
import VotingScreen from '@/components/VotingScreen';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Calculate K-factor based on total options
function calculateK(totalOptions: number): number {
  return 800 / (totalOptions - 1);
}

// Calculate score based on votes
function calculateScore(votes: Record<string, string>, side: 'left' | 'right'): number {
  return Object.values(votes).reduce((score, vote) => {
    if (vote === side) return score + 1;
    if (vote === 'idk') return score + 0.5;
    return score;
  }, 0);
}

// Calculate new Elo ratings
function calculateNewElo(
  ratingA: number,
  ratingB: number,
  scoreA: number,
  totalVotes: number,
  k: number
): number {
  const expectedScore = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const actualScore = scoreA / totalVotes;
  return ratingA + k * (actualScore - expectedScore);
}

export default function VotingPage() {
  const { state, updateOptionElo } = useDecisions();
  const router = useRouter();
  const [currentPair, setCurrentPair] = useState<[number, number]>([0, 1]);
  const [currentMatchup, setCurrentMatchup] = useState(0);
  
  // Redirect if not enough options or voters
  useEffect(() => {
    if (state.options.length < 3 || state.voters.length < 2) {
      router.push('/');
    }
  }, [state.options.length, state.voters.length, router]);

  if (state.options.length < 3 || state.voters.length < 2) {
    return null;
  }
  
  const totalMatchups = (state.options.length * (state.options.length - 1)) / 2;

  const handleVotingComplete = (votes: Record<string, string>) => {
    // Calculate scores
    const leftScore = calculateScore(votes, 'left');
    const rightScore = calculateScore(votes, 'right');
    const totalVotes = state.voters.length;
    
    // Get current ratings
    const [optionA, optionB] = currentPair;
    const ratingA = state.options[optionA].eloScore;
    const ratingB = state.options[optionB].eloScore;
    
    // Calculate K factor
    const k = calculateK(state.options.length);
    
    // Calculate new ratings
    const newRatingA = calculateNewElo(ratingA, ratingB, leftScore, totalVotes, k);
    const newRatingB = calculateNewElo(ratingB, ratingA, rightScore, totalVotes, k);
    
    // Update ratings in context
    updateOptionElo(optionA, newRatingA);
    updateOptionElo(optionB, newRatingB);

    if (currentMatchup >= totalMatchups - 1) {
      router.push('/results');
      return;
    }

    // Get next unique pair
    const nextPair = getNextUniquePair(currentPair, state.options.length);
    setCurrentPair(nextPair);
    setCurrentMatchup(prev => prev + 1);
  };

  return <VotingScreen 
    items={[
      state.options[currentPair[0]].name,
      state.options[currentPair[1]].name
    ]}
    voters={state.voters}
    onVotingComplete={handleVotingComplete}
    currentMatchup={currentMatchup}
    totalMatchups={totalMatchups}
    options={state.options}
  />;
}

// Helper function to get the next unique pair of items to compare
function getNextUniquePair(currentPair: [number, number], totalItems: number): [number, number] {
  const [i, j] = currentPair;
  
  // If we haven't reached the end of current i's comparisons
  if (j + 1 < totalItems) {
    return [i, j + 1];
  }
  
  // Move to next i and start with j = i + 1
  const nextI = i + 1;
  return [nextI, nextI + 1];
} 