import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
  size = 'lg',
}) => {
  const sizeMap = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <Component className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeMap[size]} ${className}`}>
      {children}
    </Component>
  );
};

export default Container;