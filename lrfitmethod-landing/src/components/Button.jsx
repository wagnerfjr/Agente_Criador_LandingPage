export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-gold text-dark hover:bg-gold-dark focus:ring-gold disabled:bg-gray-400',
    secondary: 'bg-dark text-white hover:bg-gray-800 focus:ring-dark disabled:bg-gray-400',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-dark focus:ring-gold disabled:border-gray-400 disabled:text-gray-400',
    ghost: 'text-gold hover:bg-gold hover:bg-opacity-10 focus:ring-gold disabled:text-gray-400',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
