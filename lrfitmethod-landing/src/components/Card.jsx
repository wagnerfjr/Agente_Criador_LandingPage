export default function Card({
  children,
  variant = 'elevated',
  className = '',
  padding = 'md',
  ...props
}) {
  const baseStyles = 'rounded-lg bg-white transition-all duration-200';

  const variants = {
    elevated: 'shadow-md hover:shadow-lg border border-gray-100',
    flat: 'border border-gray-200 bg-gray-50',
    outlined: 'border-2 border-gray-200',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
