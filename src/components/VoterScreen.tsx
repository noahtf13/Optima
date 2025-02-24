'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDecisions } from '../context/DecisionContext';
import { Container } from './layout/Container';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProgressHeader } from './layout/ProgressHeader';

export default function VoterScreen() {
  const { state, addVoter } = useDecisions();
  const [currentInput, setCurrentInput] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && !state.voters.includes(currentInput.trim())) {
      addVoter(currentInput.trim());
      setCurrentInput('');
    }
  };

  return (
    <Container size="md">
      <ProgressHeader currentStep={1} />

      {/* Current Options */}
      <Card variant="subtle" className="mb-8">
        <h2 className="font-semibold mb-3 text-lg">Options to Vote On</h2>
        <ul className="space-y-2">
          {state.options.map((option, index) => (
            <li key={index} className="text-gray-600 dark:text-gray-300">
              {option.name}
            </li>
          ))}
        </ul>
      </Card>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          placeholder="Enter voter name..."
          className="w-full p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
        />
      </form>

      {/* Voters List */}
      {state.voters.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            Current Voters ({state.voters.length}/2 minimum)
          </h3>
          <ul className="space-y-2">
            {state.voters.map((voter, index) => (
              <li key={index} className="p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 text-foreground">
                {voter}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mt-auto">
        <Button variant="ghost" onClick={() => router.push('/')}>
          Back
        </Button>
        <Button
          variant="primary"
          fullWidth
          disabled={state.voters.length < 2}
          onClick={() => state.voters.length >= 2 && router.push('/voting')}
        >
          Start Voting ({state.voters.length}/2)
        </Button>
      </div>
    </Container>
  );
}