// Utility functions for generating schema.org structured data

/**
 * Generate product schema for a cake category
 * @param {Object} categoryData - Contentful category data
 * @param {string} siteUrl - Site URL
 * @returns {Object} Product schema
 */
export const generateCakeProductSchema = (categoryData, siteUrl) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}/${categoryData.slug}/#product`,
    name: categoryData.title,
    description: categoryData.description || `${categoryData.title} - оригінальні торти від Тататорт`,
    category: "Торти",
    brand: {
      "@type": "Brand",
      name: "Тататорт"
    },
    manufacturer: {
      "@type": "Organization",
      name: "Тататорт",
      "@id": `${siteUrl}/#organization`
    }
  }

  // Add image if available
  if (categoryData.images && categoryData.images.length > 0) {
    baseSchema.image = categoryData.images.map(img => ({
      "@type": "ImageObject",
      url: img.file.url,
      alt: img.title || categoryData.title,
      width: img.file.details?.image?.width,
      height: img.file.details?.image?.height
    }))
  }

  // Add offers
  baseSchema.offers = {
    "@type": "Offer",
    priceCurrency: "UAH",
    price: "1200",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "Тататорт",
      "@id": `${siteUrl}/#organization`
    },
    areaServed: {
      "@type": "City",
      name: "Київ"
    }
  }

  return baseSchema
}

/**
 * Generate product schema for a filling category
 * @param {Object} categoryData - Contentful category data
 * @param {string} siteUrl - Site URL
 * @returns {Object} Product schema
 */
export const generateFillingProductSchema = (categoryData, siteUrl) => {
  const baseSchema = generateCakeProductSchema(categoryData, siteUrl)
  baseSchema.category = "Начинки для тортів"
  baseSchema.description = categoryData.description || `${categoryData.title} - оригінальні начинки від Тататорт`
  
  return baseSchema
}

/**
 * Generate ItemList schema for category pages
 * @param {Array} items - Array of items in the category
 * @param {string} title - Category title
 * @param {string} url - Category URL
 * @returns {Object} ItemList schema
 */
export const generateItemListSchema = (items, title, url) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${url}#itemlist`,
  name: title,
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: item.name,
      description: item.description,
      image: item.image,
      category: item.category
    }
  }))
})

/**
 * Generate BreadcrumbList schema
 * @param {Array} breadcrumbs - Array of breadcrumb objects with name and url
 * @param {string} siteUrl - Site URL
 * @returns {Object} BreadcrumbList schema
 */
export const generateBreadcrumbSchema = (breadcrumbs, siteUrl) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: `${siteUrl}${crumb.url}`
  }))
})

/**
 * Generate LocalBusiness schema with enhanced details
 * @param {string} siteUrl - Site URL
 * @param {string} defaultImage - Default image path
 * @returns {Object} LocalBusiness schema
 */
export const generateLocalBusinessSchema = (siteUrl, defaultImage) => ({
  "@context": "https://schema.org",
  "@type": ["Bakery", "LocalBusiness", "FoodEstablishment"],
  "@id": `${siteUrl}/#organization`,
  name: "Тататорт",
  alternateName: "Tatatort",
  description: "Оригінальні торти на замовлення у Києві. Весільні торти, дитячі торти, торти для особливих подій.",
  url: siteUrl,
  telephone: "+380632498807",
  email: "tatautekhina@gmail.com",
  image: `${siteUrl}${defaultImage}`,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}${defaultImage}`,
    width: 400,
    height: 400
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Київ",
    addressRegion: "Київська область",
    addressCountry: "UA",
    postalCode: "01000"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.4501,
    longitude: 30.5234
  },
  openingHours: "Mo-Su 09:00-21:00",
  priceRange: "$$",
  paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
  currenciesAccepted: "UAH",
  servesCuisine: "Bakery",
  serviceArea: {
    "@type": "City",
    name: "Київ"
  },
  sameAs: [
    "https://www.instagram.com/tatatort/",
    "https://www.facebook.com/Tatatort/"
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Виготовлення тортів на замовлення",
      description: "Індивідуальне виготовлення тортів для будь-яких подій"
    },
    areaServed: {
      "@type": "City",
      name: "Київ"
    }
  }
})

/**
 * Generate WebSite schema for homepage
 * @param {string} siteUrl - Site URL
 * @returns {Object} WebSite schema
 */
export const generateWebSiteSchema = (siteUrl) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Тататорт - Торти на замовлення",
  description: "Оригінальні торти на замовлення у Києві",
  publisher: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
})

export default {
  generateCakeProductSchema,
  generateFillingProductSchema,
  generateItemListSchema,
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema
}
