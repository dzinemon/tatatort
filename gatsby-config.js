/**
 * @type {import('gatsby').GatsbyConfig}
 */

// Load environment variables based on the current environment
const activeEnv = process.env.NODE_ENV || 'development'
console.log(`Using environment: ${activeEnv}`)

// Load default .env file first
require("dotenv").config()

// Then load environment-specific file that can override defaults
require("dotenv").config({
  path: `.env.${activeEnv}`,
})

// For debugging - you can remove this in production
// console.log('CONTENTFUL_SPACE_ID:', process.env.CONTENTFUL_SPACE_ID)
// console.log('CONTENTFUL_ACCESS_TOKEN:', process.env.CONTENTFUL_ACCESS_TOKEN)

module.exports = {
  siteMetadata: {
    siteUrl: `https://tatatort.com.ua`,
    url: `https://tatatort.com.ua`,
    image: '/image.png'
  },
  plugins: [{
    resolve: 'gatsby-source-contentful',
    options: {
      // Hardcoded values as fallback if env vars fail
      "accessToken": process.env.CONTENTFUL_ACCESS_TOKEN || "SKdRd1Ih5v4f4QJFe5FIV2Z_-VvOiJPIZpKrJVJVU7M",
      "spaceId": process.env.CONTENTFUL_SPACE_ID || "k9kptl22xzvk"
    }
  }, "gatsby-plugin-image", {
    resolve: `gatsby-plugin-google-gtag`,
    options: {
      trackingIds: [
        "G-98YQDHYXK7"
      ]
    }
  }, "gatsby-plugin-react-helmet", {
    resolve: "gatsby-plugin-sitemap",
    options: {
      output: "/",
      excludes: ["/404", "/404.html", "/dev-404-page"],
      query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
        }
      `,
      resolveSiteUrl: () => "https://tatatort.com.ua",
      serialize: ({ path, site }) => {
        let priority = 0.7;
        let changefreq = "weekly";
        
        // Set higher priority for homepage
        if (path === "/") {
          priority = 1.0;
          changefreq = "daily";
        }
        // Set higher priority for main category pages
        else if (path.match(/^\/[^\/]+\/$/) && !path.includes("/page-data/")) {
          priority = 0.8;
          changefreq = "weekly";
        }
        
        return {
          url: path,
          changefreq,
          priority,
        };
      },
    },
  }, {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/logowhitebg.png"
    }
  }, "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  },
  'gatsby-plugin-postcss'
]
};