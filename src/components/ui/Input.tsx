interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export function Input({ 
  fullWidth = true,
  className = '',
  ...props 
}: InputProps) {
  return (
    <input
      className={`
        p-4 
        border border-gray-200 dark:border-gray-800 
        rounded-xl 
        bg-white dark:bg-gray-800 
        text-gray-900 dark:text-gray-100
        placeholder-gray-400 dark:placeholder-gray-500
        focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
        outline-none 
        transition-all duration-200
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    />
  );
} 