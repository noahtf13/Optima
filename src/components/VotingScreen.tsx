import { useState, useEffect } from 'react';

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
  
  const handleConfirm = () => {
    if (allVotesSubmitted) {
      onVotingComplete(votes);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${(currentMatchup / totalMatchups) * 100}%` }}
        />
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
        {totalMatchups - currentMatchup} remaining matchups / {totalMatchups} total
      </div>

      {/* Matchup display */}
      <div className="flex justify-between items-center gap-8">
        <div className="flex-1 p-8 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-foreground">{items[0]}</h2>
        </div>
        <div className="text-xl font-bold text-foreground">vs</div>
        <div className="flex-1 p-8 bg-red-100 dark:bg-red-900 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-foreground">{items[1]}</h2>
        </div>
      </div>
      
      {/* Voting buttons */}
      <div className="space-y-4">
        {voters.map(voter => (
          <div key={voter} className="flex items-center justify-between gap-4">
            <span className="w-24 text-foreground">{voter}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setVotes({ ...votes, [voter]: 'left' })}
                className={`px-4 py-2 rounded ${
                  votes[voter] === 'left' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-foreground'
                }`}
              >
                Left
              </button>
              <button
                onClick={() => setVotes({ ...votes, [voter]: 'idk' })}
                className={`px-4 py-2 rounded ${
                  votes[voter] === 'idk' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-foreground'
                }`}
              >
                IDK
              </button>
              <button
                onClick={() => setVotes({ ...votes, [voter]: 'right' })}
                className={`px-4 py-2 rounded ${
                  votes[voter] === 'right' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-foreground'
                }`}
              >
                Right
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Eliminated options list */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2 text-foreground">Options</h3>
        <div className="grid grid-cols-2 gap-2">
          {options.map(option => (
            <div
              key={option.name}
              className={`p-2 rounded ${
                option.eliminated 
                  ? 'bg-red-100 dark:bg-red-900 line-through text-gray-500 dark:text-gray-400'
                  : 'bg-green-100 dark:bg-green-900 text-foreground'
              } transition-all duration-500`}
            >
              {option.name}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleConfirm}
        disabled={!allVotesSubmitted}
        className={`w-full py-3 rounded-lg font-bold ${
          allVotesSubmitted 
            ? 'bg-green-500 text-white hover:bg-green-600' 
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
        }`}
      >
        Confirm & Next
      </button>
    </div>
  );
} 