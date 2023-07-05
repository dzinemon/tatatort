const path = require("path")

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      {
        cakes: allContentfulCategory(filter: {type: {eq: "cake"}, node_locale: {eq: "uk"}}) {
          edges {
            node {
              slug
              id
              name
              type
            }
          }
        }
        fillings: allContentfulCategory(filter: {type: {eq: "filling"}, node_locale: {eq: "uk"}}) {
          edges {
            node {
              slug
              id
              name
              type
            }
          }
        }
      }
    `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const cakePages = result.data.cakes.edges;
  const fillingPages = result.data.fillings.edges;

  // Create pages for each markdown file.
  const cakeTemplate = path.resolve(`src/templates/cake.js`)
  
  cakePages.forEach(({ node }) => {
    // const path = node..path
    createPage({
      path: `/${node.slug}`,
      component: cakeTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        slug: node.slug
      },
    })
  })

  const fillingTemplate = path.resolve(`src/templates/filling.js`)
  fillingPages.forEach(({ node }) => {
    // const path = node..path
    createPage({
      path: `/${node.slug}`,
      component: fillingTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        slug: node.slug
      },
    })
  })
}