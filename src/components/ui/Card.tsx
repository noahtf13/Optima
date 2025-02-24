interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'subtle';
  className?: string;
}

export function Card({ children, variant = 'default', className = '' }: CardProps) {
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800',
    subtle: 'bg-gray-50/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800'
  };

  return (
    <div className={`${variants[variant]} rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
} 