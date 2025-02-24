'use client';
import { useState, useEffect } from 'react';
import { Container } from './layout/Container';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProgressHeader } from './layout/ProgressHeader';
import { LeaderboardCard } from './LeaderboardCard';

interface VotingScreenProps {
  items: string[];
  voters: string[];
  onVotingComplete: (results: Record<string, string>) => void;
  onSkipToResults: () => void;
  currentMatchup: number;
  totalMatchups: number;
  options: Array<{
    name: string;
    eloScore: number;
    eliminated?: boolean;
    winPercentage?: number;
  }>;
}

export default function VotingScreen({ 
  items, 
  voters, 
  onVotingComplete,
  onSkipToResults,
  currentMatchup,
  totalMatchups,
  options 
}: VotingScreenProps) {
  const [votes, setVotes] = useState<Record<string, string>>({});
  
  // Reset votes when items change
  useEffect(() => {
    setVotes({});
  }, [items]);
  
  // Check if all voters have voted
  const allVotesSubmitted = voters.every(voter => votes[voter]);
  
  return (
    <Container size="lg">
      <ProgressHeader currentStep={2} />
      
      {/* Progress bar */}
      <Card variant="subtle" className="mb-8">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(...options.map(opt => opt.winPercentage ?? 0))}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
          <p>
            Matchup {currentMatchup + 1} of {totalMatchups}
          </p>
          <p>
            {Math.round(Math.max(...options.map(opt => opt.winPercentage ?? 0)))}% confidence
          </p>
        </div>
      </Card>

      {/* Matchup display */}
      <div className="flex justify-between items-center gap-8 mb-8">
        <Card className="flex-1 p-8 text-center bg-primary-50 dark:bg-primary-900/20">
          <h2 className="text-2xl font-bold text-foreground">{items[0]}</h2>
        </Card>
        <div className="text-xl font-bold text-foreground">vs</div>
        <Card className="flex-1 p-8 text-center bg-violet-50 dark:bg-violet-900/20">
          <h2 className="text-2xl font-bold text-foreground">{items[1]}</h2>
        </Card>
      </div>
      
      {/* Voting buttons */}
      <Card className="mb-8">
        <div className="space-y-4">
          {voters.map(voter => (
            <div key={voter} className="flex items-center justify-between gap-4">
              <span className="w-24 text-foreground font-medium">{voter}</span>
              <div className="flex gap-2">
                {['Left', 'IDK', 'Right'].map((choice) => (
                  <Button
                    key={choice}
                    variant={votes[voter] === choice.toLowerCase() ? 'primary' : 'secondary'}
                    onClick={() => setVotes({ ...votes, [voter]: choice.toLowerCase() })}
                  >
                    {choice}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Leaderboard */}
      <LeaderboardCard options={options} />

      <div className="flex gap-4">
        <Button
          variant="secondary"
          fullWidth
          onClick={onSkipToResults}
        >
          Skip to Results
        </Button>
        <Button
          variant="primary"
          fullWidth
          disabled={!allVotesSubmitted}
          onClick={() => allVotesSubmitted && onVotingComplete(votes)}
        >
          Confirm & Next
        </Button>
      </div>
    </Container>
  );
} 