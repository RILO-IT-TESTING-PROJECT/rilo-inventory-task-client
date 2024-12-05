
import React from 'react';

interface InputProps {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ placeholder, value, onChange, className }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border p-2 rounded-md ${className}`}
    />
  );
};
