'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDecisions } from '../context/DecisionContext';

export default function HomeScreen() {
  const { state, addOption } = useDecisions();
  const [currentInput, setCurrentInput] = useState('');
  const router = useRouter();

  return (
    <main className="max-w-md mx-auto p-4">
      <form onSubmit={(e) => {
        e.preventDefault();
        if (currentInput.trim()) {
          addOption(currentInput.trim());
          setCurrentInput('');
        }
      }}>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          placeholder="Enter a decision option..."
          className="w-full p-2 border rounded bg-background text-foreground"
        />
      </form>

      <ul className="my-4">
        {state.options.map((option, index) => (
          <li key={index} className="p-2 bg-gray-50 dark:bg-gray-800 mb-2 rounded text-foreground">
            {option.name}
          </li>
        ))}
      </ul>

      <button
        onClick={() => state.options = []}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
      >
        Clear All
      </button>

      <button
        onClick={() => state.options.length >= 3 && router.push('/voters')}
        className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded
          ${state.options.length < 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={state.options.length < 3}
      >
        Next
      </button>
    </main>
  );
} 