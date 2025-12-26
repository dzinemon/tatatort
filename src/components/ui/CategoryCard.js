import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";
import Card from "./Card";

const CategoryCard = ({ data, loading = "lazy", className = "" }) => {
  const image = data.images && data.images[0];

  return (
    <Card 
      className={`group relative block h-full ${className}`}
      role="link"
      aria-label={`${data.title} - відкрити деталі`}
    >
      <a href={`/${data.slug}`} className="block h-full">
        <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gradient-to-r from-primary-100 to-primary-50">
          {image && (
            <GatsbyImage
              objectFit="cover"
              imgClassName="object-center transition-transform duration-500 group-hover:scale-105"
              className="h-full w-full"
              image={image.gatsbyImageData}
              alt={`${image.title || ""} ${image.description || ""}`}
              loading={loading} 
            />
          )}
           {/* Overlay for text legibility */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 lg:p-6 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <span className="text-white font-medium tracking-wide text-sm uppercase">Детальніше</span>
          </div>
        </div>
        
        <div className="p-4 text-center">
          <h3 className="font-poiret font-bold text-xl text-neutral-800 group-hover:text-primary-600 transition-colors">
            {data.title}
          </h3>
        </div>
      </a>
    </Card>
  );
};

export default CategoryCard;
