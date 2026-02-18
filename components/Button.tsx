import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'seafoam' | 'midnight' | 'breeze' | 'wave';
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
    seafoam: "bg-seafoam text-white hover:bg-stone hover:scale-105 shadow-md hover:shadow-lg focus:ring-seafoam",
    midnight: "bg-midnight text-cream hover:bg-stone hover:scale-105 shadow-md hover:shadow-lg focus:ring-midnight",
    breeze: "bg-breeze text-stone hover:bg-seafoam hover:text-white hover:scale-105 shadow-sm focus:ring-breeze",
    wave: "bg-wave text-white hover:bg-stone hover:scale-105 shadow-sm focus:ring-wave",
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
