import React from 'react';

const Card = ({ className = '', children, hoverEffect = true, ...props }) => {
  const baseStyles = 'bg-white rounded-xl overflow-hidden shadow-lg border border-neutral-100';
  const hoverStyles = hoverEffect ? 'hover:shadow-xl transition-shadow duration-300' : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
