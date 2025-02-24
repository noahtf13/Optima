interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-xl font-medium transition-all duration-200';
  
  const variants = {
    primary: `bg-indigo-500 text-white ${!disabled && 'hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20'}`,
    secondary: `bg-gray-100 text-gray-600 ${!disabled && 'hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'}`,
    ghost: `text-gray-600 ${!disabled && 'hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50'}`
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
} 