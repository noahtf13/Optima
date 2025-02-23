'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDecisions } from '../context/DecisionContext';

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
    <main className="max-w-md mx-auto p-4">
      <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <h2 className="font-bold mb-2 text-foreground">Options to Vote On:</h2>
        <ul>
          {state.options.map((option, index) => (
            <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
              {option.name}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          placeholder="Enter voter name..."
          className="w-full p-2 border rounded bg-background text-foreground"
        />
      </form>

      <ul className="my-4">
        {state.voters.map((voter, index) => (
          <li key={index} className="p-2 bg-gray-50 dark:bg-gray-800 mb-2 rounded text-foreground">
            {voter}
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <button
          onClick={() => router.push('/')}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>

        <button
          onClick={() => state.voters.length >= 2 && router.push('/voting')}
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex-1
            ${state.voters.length < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={state.voters.length < 2}
        >
          Start Voting ({state.voters.length}/2 voters minimum)
        </button>
      </div>
    </main>
  );
}