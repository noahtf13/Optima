interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Container({ children, size = 'md' }: ContainerProps) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl'
  };

  return (
    <main className={`${sizes[size]} mx-auto p-4 min-h-screen flex flex-col`}>
      {children}
    </main>
  );
} 