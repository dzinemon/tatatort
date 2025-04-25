import React from "react"
import { useStaticQuery, graphql } from "gatsby"

// This component's data will be used inside the page's Head export
export const Seo = ({ title, description, image, article, keywords, children }) => {
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

  // Schema.org structured data
  const schemaOrgWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: seo.url,
    name: seo.title,
    description: seo.description,
    image: seo.image,
  }

  const schemaOrgBusiness = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "Тататорт",
    description: "Оригінальні торти на замовлення у Києві",
    url: siteUrl,
    telephone: "+380632498807",
    email: "tatautekhina@gmail.com",
    image: `${siteUrl}${defaultImage}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Київ",
      addressCountry: "UA"
    },
    sameAs: [
      "https://www.instagram.com/tatatort/",
      "https://www.facebook.com/Tatatort/"
    ]
  }

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

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>
      <script type="application/ld+json">{JSON.stringify(schemaOrgBusiness)}</script>
      
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