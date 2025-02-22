interface ResultsScreenProps {
  options: Array<{ name: string; eloScore: number }>;
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
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-8">Final Rankings</h1>
      
      <div className="space-y-2">
        {sortedOptions.map((option, index) => (
          <div 
            key={option.name}
            className="flex justify-between items-center p-4 bg-white rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-gray-400">
                {index + 1}
              </span>
              <span className="font-medium">{option.name}</span>
            </div>
            <span className="text-sm text-gray-500">
              {Math.round(option.eloScore)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleCopyResults}
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Copy Results
        </button>
        <button
          onClick={onRestart}
          className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
        >
          Start Over
        </button>
      </div>
    </div>
  );
} 