import React from 'react';

const SectionHeading = ({ children, className = '' }) => {
  return (
    <h2 className={`text-center font-poiret lg:text-5xl text-3xl mb-8 lg:mb-12 text-neutral-900 ${className}`}>
      {children}
    </h2>
  );
};

export default SectionHeading;
