import { Card } from './ui/Card';

interface LeaderboardCardProps {
  options: Array<{
    name: string;
    eloScore: number;
    eliminated?: boolean;
    winPercentage?: number;
  }>;
}

export function LeaderboardCard({ options }: LeaderboardCardProps) {
  // Sort by win percentage descending
  const sortedOptions = [...options].sort((a, b) => 
    (b.winPercentage ?? 0) - (a.winPercentage ?? 0)
  );

  return (
    <Card className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Current Standings</h3>
      <div className="space-y-3">
        {sortedOptions.map((option, index) => (
          <div
            key={option.name}
            className={`
              flex justify-between items-center p-3 rounded-lg
              ${option.eliminated 
                ? 'bg-red-50 dark:bg-red-900/20 text-gray-500 dark:text-gray-400'
                : 'bg-gray-50 dark:bg-gray-800/50'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                #{index + 1}
              </span>
              <span className={option.eliminated ? 'line-through' : ''}>
                {option.name}
              </span>
            </div>
            <div className="text-sm font-medium">
              {(option.winPercentage ?? 0).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
} 