import React, { ChangeEvent } from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  focusColor?: string;
  className?: string;
  readOnly?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  size = 'medium',
  color = 'bg-white',
  focusColor = 'ring-indigo-600',
  className = '',
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'py-2 px-3 text-sm';
      case 'large':
        return 'py-4 px-5 text-lg';
      case 'medium':
      default:
        return 'py-3 px-4 text-base';
    }
  };

  const inputClasses = `border rounded ${color} ${getSizeClasses()} focus:outline-none focus:ring-2 ${focusColor} placeholder-gray-500 text-black ${className}`;

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={inputClasses}
    />
  );
};

export default Input;