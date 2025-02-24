'use client';
import { useDecisions } from '@/context/DecisionContext';
import VotingScreen from '@/components/VotingScreen';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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

// Simulate a matchup between two options
function simulateMatchup(ratingA: number, ratingB: number): number {
  const expectedScore = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  // Generate random actual score based on expected probability
  return Math.random() < expectedScore ? 1 : 0;
}

// Run Monte Carlo simulation
function runSimulations(
  currentRatings: number[],
  remainingMatchups: Array<[number, number]>,
  numSimulations: number = 1000
): number[] {
  const winPercentages = new Array(currentRatings.length).fill(0);

  for (let sim = 0; sim < numSimulations; sim++) {
    // Copy current ratings for this simulation
    const simRatings = [...currentRatings];
    const k = calculateK(currentRatings.length);

    // Simulate all remaining matchups
    for (const [i, j] of remainingMatchups) {
      const result = simulateMatchup(simRatings[i], simRatings[j]);
      
      // Update Elo ratings based on simulation result
      const expectedScore = 1 / (1 + Math.pow(10, (simRatings[j] - simRatings[i]) / 400));
      simRatings[i] += k * (result - expectedScore);
      simRatings[j] += k * ((1 - result) - (1 - expectedScore));
    }

    // Find winner of this simulation
    const winner = simRatings.indexOf(Math.max(...simRatings));
    winPercentages[winner]++;
  }

  // Convert to percentages
  return winPercentages.map(wins => (wins / numSimulations) * 100);
}

// Get all remaining matchups
function getRemainingMatchups(
  totalOptions: number,
  currentPair: [number, number],
  eliminatedOptions: Set<number>
): Array<[number, number]> {
  const matchups: Array<[number, number]> = [];
  
  for (let i = 0; i < totalOptions - 1; i++) {
    for (let j = i + 1; j < totalOptions; j++) {
      if (!eliminatedOptions.has(i) && !eliminatedOptions.has(j)) {
        // Only include matchups that haven't happened yet
        if (i > currentPair[0] || (i === currentPair[0] && j > currentPair[1])) {
          matchups.push([i, j]);
        }
      }
    }
  }
  
  return matchups;
}

export default function VotingPage() {
  const { state, updateOptionElo, updateOptionElimination, updateOptionWinPercentage } = useDecisions();
  const router: AppRouterInstance = useRouter();
  
  // Calculate K once at component initialization
  const k = calculateK(state.options.length);
  
  // Initialize with first valid pair
  const [currentPair, setCurrentPair] = useState<[number, number]>(() => {
    if (state.options.length >= 2) {
      return [0, 1];
    }
    return [0, 0]; // Fallback, though we'll redirect anyway
  });
  
  const [currentMatchup, setCurrentMatchup] = useState(0);
  const [eliminatedOptions, setEliminatedOptions] = useState<Set<number>>(new Set());
  
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
    
    // Calculate new ratings
    const newRatingA = calculateNewElo(ratingA, ratingB, leftScore, totalVotes, k);
    const newRatingB = calculateNewElo(ratingB, ratingA, rightScore, totalVotes, k);
    
    // Create updated ratings array for elimination check
    const updatedRatings = state.options.map((opt, i) => {
      if (i === optionA) return newRatingA;
      if (i === optionB) return newRatingB;
      return opt.eloScore;
    });
    
    // Find current highest Elo
    const highestElo = Math.max(...updatedRatings);
    
    // Check for new eliminations
    const newEliminated = new Set(eliminatedOptions);
    
    // Log the match result
    console.log(`\nMatch Result:`);
    console.log(`${state.options[optionA].name}: ${Math.round(newRatingA)} (${leftScore > rightScore ? 'Won' : 'Lost'})`);
    console.log(`${state.options[optionB].name}: ${Math.round(newRatingB)} (${rightScore > leftScore ? 'Won' : 'Lost'})`);
    
    // Get remaining matchups
    const remainingMatchups = getRemainingMatchups(
      state.options.length,
      currentPair,
      newEliminated
    );

    // Run simulations to get win percentages
    const winPercentages = runSimulations(updatedRatings, remainingMatchups);

    // Update win percentages in state
    winPercentages.forEach((percentage, index) => {
      updateOptionWinPercentage(index, percentage);
    });

    // Check for eliminations and winner
    let hasWinner = false;
    winPercentages.forEach((percentage, index) => {
      if (!eliminatedOptions.has(index)) {
        if (percentage <= 5) {
          // Eliminate options with ≤5% chance of winning
          console.log(`🚫 ${state.options[index].name} eliminated (${percentage.toFixed(1)}% chance of winning)`);
          newEliminated.add(index);
          updateOptionElimination(index, true);
        } else if (percentage >= 95) {
          // We have a winner!
          hasWinner = true;
          console.log(`🏆 ${state.options[index].name} has won (${percentage.toFixed(1)}% chance of winning)`);
        } else {
          console.log(`${state.options[index].name}: ${percentage.toFixed(1)}% chance of winning`);
        }
      }
    });

    // If we have a winner or only one option remains, go to results
    if (hasWinner || state.options.length - newEliminated.size <= 1) {
      router.push('/results');
      return;
    }

    // Update ratings in context after elimination check
    updateOptionElo(optionA, newRatingA);
    updateOptionElo(optionB, newRatingB);
    setEliminatedOptions(newEliminated);

    // Get next valid pair
    const nextPair = getNextUniquePair(currentPair, state.options.length, newEliminated, router);
    setCurrentPair(nextPair);
    setCurrentMatchup(prev => prev + 1);
  };

  const handleSkipToResults = () => {
    // Run one final simulation to update win percentages
    const remainingMatchups = getRemainingMatchups(
      state.options.length,
      currentPair,
      eliminatedOptions
    );
    
    const currentRatings = state.options.map(opt => opt.eloScore);
    const winPercentages = runSimulations(currentRatings, remainingMatchups);
    
    // Update final win percentages
    winPercentages.forEach((percentage, index) => {
      updateOptionWinPercentage(index, percentage);
    });
    
    // Navigate to results
    router.push('/results');
  };

  return (
    <VotingScreen
      items={[state.options[currentPair[0]].name, state.options[currentPair[1]].name]}
      voters={state.voters}
      onVotingComplete={handleVotingComplete}
      onSkipToResults={handleSkipToResults}
      currentMatchup={currentMatchup}
      totalMatchups={totalMatchups}
      options={state.options}
    />
  );
}

// Helper function to get the next unique pair of items to compare
function getNextUniquePair(
  currentPair: [number, number], 
  totalItems: number,
  eliminatedOptions: Set<number>,
  router: AppRouterInstance
): [number, number] {
  let [i, j] = currentPair;
  
  // Start from current pair and find next valid pair
  while (i < totalItems - 1) {
    j++;  // Move to next j
    if (j >= totalItems) {  // If j reaches end, increment i and reset j
      i++;
      j = i + 1;
    }
    
    // Check if we've reached the end
    if (i >= totalItems - 1 || j >= totalItems) {
      router.push('/results');
      return currentPair;
    }
    
    // If both options are not eliminated, we found our pair
    if (!eliminatedOptions.has(i) && !eliminatedOptions.has(j)) {
      return [i, j];
    }
  }
  
  // If we get here, no more valid pairs
  router.push('/results');
  return currentPair;
} 