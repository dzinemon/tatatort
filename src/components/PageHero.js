import React from "react";

export default function PageHero( {title} ) {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <h1 className='text-4xl lg:text-6xl font-poiret text-center'>{title}</h1>
    </div>
  )
}