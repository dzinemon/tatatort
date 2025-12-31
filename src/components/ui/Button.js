import React from 'react';
import { Link } from 'gatsby';

const variants = {
  primary: 'bg-primary-700 text-white hover:bg-primary-800 border border-transparent shadow-sm',
  secondary: 'bg-secondary-100 text-secondary-800 hover:bg-secondary-200 border border-transparent',
  outline: 'bg-transparent border border-primary-700 text-primary-700 hover:bg-primary-50',
  ghost: 'bg-transparent text-primary-700 hover:bg-primary-50 hover:underline',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  to, 
  href, 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 gap-2 cursor-pointer';
  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.md;
  
  const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClassName} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
