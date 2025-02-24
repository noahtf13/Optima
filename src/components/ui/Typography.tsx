interface TitleProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Title({ children, className = '', size = 'lg' }: TitleProps) {
  const sizes = {
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-5xl'
  };

  return (
    <h1 className={`
      font-bold
      ${sizes[size]}
      bg-gradient-to-r from-primary-900 to-primary-400
      bg-clip-text text-transparent
      tracking-tight
      [text-shadow:_0_4px_8px_rgb(99_102_241_/_15%)]
      ${className}
    `}>
      {children}
    </h1>
  );
}

export function Subtitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-lg text-gray-600 dark:text-gray-400 ${className}`}>
      {children}
    </p>
  );
} 