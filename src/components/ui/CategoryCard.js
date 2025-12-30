import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";
import Card from "./Card";

const CategoryCard = ({ data, loading = "lazy", className = "" }) => {
  // write a function to get random image from images array
  const getRandomImage = (images) => {
    if (!images || images.length === 0) return null;

    // filter images that have length lower that 512px
    const filteredImages = images.filter(img => img.width && img.width >= 512);
    if (filteredImages.length === 0) return null;

    // get random image from filtered images
    const randomIndex = Math.floor(Math.random() * filteredImages.length);
    return filteredImages[randomIndex];
  };

  const image = data.images && getRandomImage(data.images);

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
              imgClassName="object-center"
              className="h-full w-full duration-700 group-hover:scale-105 scale-100"
              image={image.gatsbyImageData}
              alt={`${image.title || ""} ${image.description || ""}`}
              loading={loading} 
            />
          )}
           {/* Overlay for text legibility */}
          <div className="translate-y-full group-hover:translate-y-0 absolute inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent p-4 lg:p-6 flex items-end justify-center opacity-0 group-hover:opacity-100 duration-500">
             <span className="translate-y-full group-hover:translate-y-0 group-hover:scale-100 scale-0 delay-300 duration-300 text-neutral-800 font-medium tracking-wide text-sm uppercase">Детальніше</span>
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
