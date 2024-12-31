import React, { MouseEvent } from 'react';

interface ButtonProps {
  color?: string;
  size?: 'small' | 'medium' | 'large';
  text: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ color = '#6D2EB1', size = 'medium', text, onClick, className = '' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'py-2 px-3 text-sm'; // Increased padding
      case 'large':
        return 'py-4 px-5 text-lg'; // Increased padding
      case 'medium':
      default:
        return 'py-3 px-4 text-base'; // Increased padding
    }
  };

  const buttonClasses = `text-white rounded ${getSizeClasses()} hover:bg-opacity-75 ${className}`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  );
};

export default Button;