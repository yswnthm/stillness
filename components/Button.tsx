import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 transition-all duration-700 ease-out font-sans tracking-wide text-sm uppercase letter-spacing-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-stone text-cream hover:bg-midnight hover:scale-105 shadow-md hover:shadow-lg focus:ring-stone",
    secondary: "bg-sand text-stone hover:bg-wave hover:scale-105 shadow-sm focus:ring-sand",
    outline: "border border-stone text-stone hover:bg-stone hover:text-cream hover:border-transparent transition-colors duration-500",
    text: "bg-transparent text-stone hover:text-seafoam px-0 underline-offset-4 hover:underline decoration-1",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
