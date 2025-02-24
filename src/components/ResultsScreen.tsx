import { Container } from './layout/Container';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProgressHeader } from './layout/ProgressHeader';
import { Option } from '../context/DecisionContext';

interface ResultsScreenProps {
  options: Option[];
  onRestart: () => void;
}

export default function ResultsScreen({ options, onRestart }: ResultsScreenProps) {
  const sortedOptions = [...options].sort((a, b) => b.eloScore - a.eloScore);

  const handleCopyResults = () => {
    const results = sortedOptions
      .map((opt, i) => `${i + 1}. ${opt.name} (${Math.round(opt.eloScore)})`)
      .join('\n');
    navigator.clipboard.writeText(results);
  };

  return (
    <Container size="md">
      <ProgressHeader currentStep={3} />
      
      <Card className="mb-8">
        <div className="space-y-4">
          {sortedOptions.map((option, index) => (
            <div 
              key={option.name}
              className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-primary-500 dark:text-primary-400">
                  #{index + 1}
                </span>
                <span className="font-medium text-foreground">{option.name}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(option.eloScore)}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-4">
        <Button variant="secondary" fullWidth onClick={handleCopyResults}>
          Copy Results
        </Button>
        <Button variant="primary" fullWidth onClick={onRestart}>
          Start Over
        </Button>
      </div>
    </Container>
  );
} 