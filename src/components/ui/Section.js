import React from 'react';

const Section = ({ 
  className = '', 
  containerClassName = '',
  children, 
  ...props 
}) => {
  return (
    <section className={`py-12 lg:py-20 relative ${className}`} {...props}>
      <div className={`container mx-auto ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
