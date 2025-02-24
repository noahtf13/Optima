'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDecisions } from '../context/DecisionContext';
import { Container } from './layout/Container';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProgressHeader } from './layout/ProgressHeader';

export default function HomeScreen() {
  const { state, addOption, clearOptions } = useDecisions();
  const [currentInput, setCurrentInput] = useState('');
  const router = useRouter();

  return (
    <Container size="md">
      <ProgressHeader currentStep={0} />

      {/* Instructions */}
      <Card variant="subtle" className="mb-8">
        <h2 className="font-semibold mb-2 text-lg">Getting Started</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enter at least 3 options you want the group to decide between.
        </p>
      </Card>

      {/* Input Form */}
      <form onSubmit={(e) => {
        e.preventDefault();
        if (currentInput.trim()) {
          addOption(currentInput.trim());
          setCurrentInput('');
        }
      }} className="mb-6">
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          placeholder="Enter a decision option..."
          className="w-full p-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </form>

      {/* Options List */}
      {state.options.length > 0 && (
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Your Options ({state.options.length}/3 minimum)
          </h3>
          <ul className="space-y-2 mb-6">
            {state.options.map((option, index) => (
              <li key={index} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-foreground">
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mt-auto">
        <Button variant="ghost" onClick={clearOptions}>
          Clear All
        </Button>
        <Button
          variant="primary"
          fullWidth
          disabled={state.options.length < 3}
          onClick={() => state.options.length >= 3 && router.push('/voters')}
        >
          Continue to Voters ({state.options.length}/3)
        </Button>
      </div>
    </Container>
  );
} 