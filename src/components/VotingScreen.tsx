import { useState, useEffect } from 'react';
import { Container } from './layout/Container';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProgressHeader } from './layout/ProgressHeader';

interface VotingScreenProps {
  items: string[];
  voters: string[];
  onVotingComplete: (results: Record<string, string>) => void;
  currentMatchup: number;
  totalMatchups: number;
  options: Option[];
}

interface Option {
  name: string;
  eloScore: number;
  eliminated?: boolean;
}

export default function VotingScreen({ 
  items, 
  voters, 
  onVotingComplete,
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
            className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(currentMatchup / totalMatchups) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
          {totalMatchups - currentMatchup} remaining matchups / {totalMatchups} total
        </p>
      </Card>

      {/* Matchup display */}
      <div className="flex justify-between items-center gap-8 mb-8">
        <Card className="flex-1 p-8 text-center bg-indigo-50 dark:bg-indigo-900/20">
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

      {/* Options Status */}
      <Card variant="subtle" className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Options Status</h3>
        <div className="grid grid-cols-2 gap-4">
          {options.map(option => (
            <div
              key={option.name}
              className={`p-4 rounded-xl transition-all duration-500 ${
                option.eliminated 
                  ? 'bg-red-100 dark:bg-red-900/20 line-through text-gray-500 dark:text-gray-400'
                  : 'bg-green-100 dark:bg-green-900/20 text-foreground'
              }`}
            >
              {option.name}
            </div>
          ))}
        </div>
      </Card>

      <Button
        variant="primary"
        fullWidth
        disabled={!allVotesSubmitted}
        onClick={() => allVotesSubmitted && onVotingComplete(votes)}
      >
        Confirm & Next
      </Button>
    </Container>
  );
} 