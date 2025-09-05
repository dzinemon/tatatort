import React from "react"
import { useStaticQuery, graphql } from "gatsby"

// This component's data will be used inside the page's Head export
export const Seo = ({ 
  title, 
  description, 
  image, 
  article, 
  keywords, 
  children,
  // New props for enhanced schema
  pageType = "WebPage",
  breadcrumbs = [],
  products = [],
  category = null,
  price = null,
  availability = "InStock",
  faqs = [],
  reviews = []
}) => {
  const { site } = useStaticQuery(query)

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: typeof window !== 'undefined' ? `${siteUrl}${window.location.pathname}` : `${siteUrl}`,
    keywords: keywords || "торти, тататорт, торти на замовлення, київ, cake, tatatort",
  }

  // Enhanced Schema.org structured data
  const createWebPageSchema = () => ({
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": seo.url,
    url: seo.url,
    name: seo.title,
    description: seo.description,
    image: seo.image,
    inLanguage: "uk-UA",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`
    },
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`
    },
    breadcrumb: breadcrumbs.length > 0 ? createBreadcrumbSchema() : undefined,
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Тататорт"
    },
    dateModified: new Date().toISOString().split('T')[0],
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": `${seo.image}#primaryimage`,
      url: seo.image
    }
  })

  const createBreadcrumbSchema = () => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.url}`
    }))
  })

  const createProductSchema = (product, index = 0) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${seo.url}#product-${index}`,
    name: product.name || seo.title,
    description: product.description || seo.description,
    image: product.image || seo.image,
    category: product.category || category || "Торти",
    brand: {
      "@type": "Brand",
      name: "Тататорт"
    },
    manufacturer: {
      "@type": "Organization",
      name: "Тататорт",
      "@id": `${siteUrl}/#organization`
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "UAH",
      price: price || product.price || "договірна",
      availability: `https://schema.org/${availability}`,
      seller: {
        "@type": "Organization",
        name: "Тататорт",
        "@id": `${siteUrl}/#organization`
      },
      areaServed: {
        "@type": "City",
        name: "Київ"
      }
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Customizable",
        value: "true"
      },
      {
        "@type": "PropertyValue", 
        name: "Made to Order",
        value: "true"
      }
    ]
  })

  const createItemListSchema = () => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${seo.url}#itemlist`,
    name: seo.title,
    description: seo.description,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: createProductSchema(product, index)
    }))
  })

  // Enhanced LocalBusiness schema with more details
  const schemaOrgBusiness = {
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
    areaServed: {
      "@type": "City",
      name: "Київ"
    },
    sameAs: [
      "https://www.instagram.com/tatatort/",
      "https://www.facebook.com/Tatatort/"
    ],
    aggregateRating: reviews && reviews.length > 0 ? {
      "@type": "AggregateRating",
      ratingValue: reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1
    } : undefined
  }

  // Enhanced WebSite schema for homepage
  const createWebSiteSchema = () => ({
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
    inLanguage: "uk-UA",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    ],
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`
    }
  })

  // Generate FAQ schema
  const createFAQSchema = () => {
    if (!faqs || faqs.length === 0) return null
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${seo.url}#faqpage`,
      mainEntity: faqs.map((faq, index) => ({
        "@type": "Question",
        "@id": `${seo.url}#question-${index}`,
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          "@id": `${seo.url}#answer-${index}`,
          text: faq.answer
        }
      }))
    }
  }

  // Generate review schema with enhanced details
  const createReviewSchema = () => {
    if (!reviews || reviews.length === 0) return null

    const aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1
    }

    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization-reviews`,
      name: "Тататорт",
      aggregateRating: aggregateRating,
      review: reviews.map((review, index) => ({
        "@type": "Review",
        "@id": `${seo.url}#review-${index}`,
        author: {
          "@type": "Person",
          name: review.author
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1
        },
        reviewBody: review.text,
        datePublished: review.date,
        itemReviewed: {
          "@type": "LocalBusiness",
          "@id": `${siteUrl}/#organization`
        }
      }))
    }
  }

  // Enhanced Person schema for business owner
  const createPersonSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Татяна Утехіна",
    givenName: "Татяна",
    familyName: "Утехіна",
    jobTitle: "Кондитер",
    worksFor: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`
    },
    email: "tatautekhina@gmail.com",
    sameAs: [
      "https://www.instagram.com/tatatort/",
      "https://www.facebook.com/Tatatort/"
    ],
    knowsAbout: [
      "Кондитерське мистецтво",
      "Дизайн тортів",
      "Весільні торти",
      "Дитячі торти"
    ]
  })

  // Generate appropriate schemas based on page type and data
  const generateSchemas = () => {
    const schemas = []
    
    // Always include business schema
    schemas.push(schemaOrgBusiness)
    
    // Add person schema for business owner  
    schemas.push(createPersonSchema())
    
    // Add website schema for homepage
    if (seo.url === siteUrl || seo.url === `${siteUrl}/`) {
      schemas.push(createWebSiteSchema())
    }
    
    // Add appropriate page schema
    if (products.length > 0) {
      // Category page with multiple products
      schemas.push(createItemListSchema())
    } else if (pageType === "Product") {
      // Single product page
      schemas.push(createProductSchema({ name: seo.title, description: seo.description, image: seo.image }))
    } else {
      // Regular page
      schemas.push(createWebPageSchema())
    }
    
    // Add breadcrumb schema if provided (separate from webpage)
    if (breadcrumbs.length > 0 && pageType !== "WebPage") {
      schemas.push(createBreadcrumbSchema())
    }
    
    // Add FAQ schema if provided
    const faqSchema = createFAQSchema()
    if (faqSchema) {
      schemas.push(faqSchema)
    }
    
    // Add review schema if provided
    const reviewSchema = createReviewSchema()
    if (reviewSchema) {
      schemas.push(reviewSchema)
    }
    
    return schemas
  }

  const schemas = generateSchemas()

  return (
    <>
      <html lang="uk" />
      <meta name="google-site-verification" content="H8TqJH3Pw7EpE1Jk6Ii5ng09fQCYLxoW2D1n3MQdRBU" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="keywords" content={seo.keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content="Тататорт" />
      <meta property="og:locale" content="uk_UA" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:site" content="@tatatort" />
      <meta name="twitter:creator" content="@tatatort" />

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Тататорт" />
      <meta name="theme-color" content="#06b6d4" />
      <meta name="msapplication-TileColor" content="#06b6d4" />
      
      {/* Geo tags for local SEO */}
      <meta name="geo.region" content="UA-30" />
      <meta name="geo.placename" content="Київ" />
      <meta name="geo.position" content="50.4501;30.5234" />
      <meta name="ICBM" content="50.4501, 30.5234" />

      {/* Enhanced Structured data */}
      {schemas.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema, null, 0)}
        </script>
      ))}
      
      {children}
    </>
  )
}

export default Seo

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: url
        defaultImage: image
      }
    }
  }
`