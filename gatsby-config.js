/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
    url: `http://tatatort.com.ua/`,
    image: '/image.png'
  },
  plugins: [{
    resolve: 'gatsby-source-contentful',
    options: {
      "accessToken": "AygsNyMYepUzJD67HpSsmlTZos3B-qAVclijgGg2AXQ",
      "spaceId": "k9kptl22xzvk"
    }
  }, "gatsby-plugin-image", {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      "trackingId": "387120216"
    }
  }, "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", {
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