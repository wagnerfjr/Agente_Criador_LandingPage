export default function Grid({
  children,
  cols = 3,
  gap = 'md',
  className = '',
  responsive = true,
  ...props
}) {
  const gapSizes = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
  };

  const responsiveClasses = responsive ? {
    1: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  } : colClasses;

  return (
    <div
      className={`grid ${responsiveClasses[cols]} ${gapSizes[gap]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
