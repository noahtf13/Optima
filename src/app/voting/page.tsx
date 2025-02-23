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

export default function VotingPage() {
  const { state, updateOptionElo, updateOptionElimination } = useDecisions();
  const router: AppRouterInstance = useRouter();
  
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
    
    // Calculate K factor using the formula from spec
    const k = calculateK(state.options.length);
    
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
    
    // For each option, check if they can mathematically reach the highest score
    console.log('\nElimination Check:');
    updatedRatings.forEach((rating, index) => {
      if (!eliminatedOptions.has(index)) {
        // Calculate maximum possible points from remaining matchups
        let maxPossibleRating = rating;
        
        // For each remaining matchup
        for (let i = 0; i < state.options.length; i++) {
          if (i !== index && !eliminatedOptions.has(i)) {
            // Calculate max rating gain from a unanimous victory
            const expectedScore = 1 / (1 + Math.pow(10, (updatedRatings[i] - maxPossibleRating) / 400));
            const maxGain = k * (1 - expectedScore); // 1 represents unanimous victory
            maxPossibleRating += maxGain;
          }
        }
        
        // If max possible rating can't reach current highest, eliminate
        if (maxPossibleRating < highestElo) {
          console.log(`🚫 ${state.options[index].name} eliminated (Max possible: ${Math.round(maxPossibleRating)} vs Current highest: ${Math.round(highestElo)})`);
          newEliminated.add(index);
          updateOptionElimination(index, true);
        } else {
          console.log(`${state.options[index].name}: Can reach ${Math.round(maxPossibleRating)} (Current: ${Math.round(rating)})`);
        }
      }
    });

    // Update ratings in context after elimination check
    updateOptionElo(optionA, newRatingA);
    updateOptionElo(optionB, newRatingB);
    setEliminatedOptions(newEliminated);

    // If all but one option is eliminated, go to results
    if (state.options.length - newEliminated.size <= 1) {
      router.push('/results');
      return;
    }

    // Get next valid pair
    const nextPair = getNextUniquePair(currentPair, state.options.length, newEliminated, router);
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