
import React from 'react';

interface ButtonProps {
  variant: 'outline' | 'solid';
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, size, onClick, disabled = false, children }) => {
  const baseStyles = "rounded px-4 py-2 focus:outline-none transition-all";
  const variantStyles = variant === 'outline' ? 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' : 'bg-blue-600 text-white hover:bg-blue-700';
  const sizeStyles = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
