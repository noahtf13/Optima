'use client';
import { useDecisions } from '@/context/DecisionContext';
import ResultsScreen from '@/components/ResultsScreen';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ResultsPage() {
  const { state, resetSession } = useDecisions();
  const router = useRouter();

  useEffect(() => {
    // Redirect if no options exist
    if (state.options.length === 0) {
      router.push('/');
    }
  }, [state.options.length, router]);

  const handleRestart = () => {
    resetSession();
    router.push('/');
  };

  if (state.options.length === 0) return null;

  return (
    <ResultsScreen 
      options={state.options}
      onRestart={handleRestart}
    />
  );
} 