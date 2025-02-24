import { Title, Subtitle } from '../ui/Typography';

interface ProgressHeaderProps {
  title?: string;
  currentStep: number;
}

export function ProgressHeader({ title = 'Optima', currentStep }: ProgressHeaderProps) {
  const steps = ['Options', 'Voters', 'Vote', 'Results'];

  return (
    <div className="mb-12">
      {/* Title Section */}
      <div className="text-center mb-12">
        <Title className="mb-3">{title}</Title>
        <Subtitle>
          Group decisions made simple through efficient consensus building
        </Subtitle>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-700" />
        {steps.map((step, i) => (
          <div key={step} className="relative flex flex-col items-center">
            <div className={`
              w-10 h-10 rounded-full 
              flex items-center justify-center 
              border-2 transition-colors
              ${i === currentStep ?
                'border-primary-500 bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400' :
                'border-gray-200 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-800'
              }`}>
              {i + 1}
            </div>
            <span className="text-sm mt-3 font-medium">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 