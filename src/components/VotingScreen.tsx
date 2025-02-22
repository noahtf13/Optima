'use client';
import { useRouter } from 'next/navigation';
import { useDecisions } from '../context/DecisionContext';

export default function VotingScreen() {
  const { state } = useDecisions();
  const router = useRouter();

  // Guard against empty state
  if (state.options.length < 3 || state.voters.length < 2) {
    return (
      <main className="max-w-md mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Not enough options or voters. Please go back and add more.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Current State Check</h1>
      
      <div className="mb-6">
        <h2 className="font-bold mb-2">Options:</h2>
        <ul className="bg-gray-50 p-4 rounded">
          {state.options.map((option, index) => (
            <li key={index} className="mb-2">
              {option.name} (Elo: {option.eloScore})
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="font-bold mb-2">Voters:</h2>
        <ul className="bg-gray-50 p-4 rounded">
          {state.voters.map((voter, index) => (
            <li key={index} className="mb-2">{voter}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => router.push('/voters')}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back to Voters
        </button>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">Debug Info:</h2>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(state, null, 2)}
        </pre>
      </div>
    </main>
  );
} 