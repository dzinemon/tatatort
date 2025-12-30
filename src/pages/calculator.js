import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Seo } from '../components/Seo'
import Calculator from '../components/Calculator'

export default function CalculatorPage({ data }) {
  // Extract fillings grouped by category
  const fillingGroups = data.fillings.edges.map(edge => ({
    groupTitle: edge.node.title,
    items: edge.node.images ? edge.node.images.map(img => ({
      name: img.title,
      image: img.gatsbyImageData
    })) : []
  }));

  const breadcrumbs = [
    { name: "Головна", url: "/" },
    { name: "Калькулятор", url: "/calculator/" }
  ];

  return (
    <Layout>
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="text-center mb-10">
          <h1 className="font-poiret text-4xl lg:text-6xl mb-4">Калькулятор вартості</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Сплануйте свій ідеальний торт. Оберіть вагу, начинку та декор, щоб дізнатись орієнтовну вартість замовлення.
          </p>
        </div>
        
        <Calculator fillingGroups={fillingGroups} />
      </div>
    </Layout>
  )
}

export const Head = ({ data }) => (
  <Seo 
    title="Калькулятор вартості торту - Тататорт"
    description="Розрахуйте вартість вашого торту онлайн. Оберіть начинку, вагу та декор для отримання орієнтовної ціни."
    breadcrumbs={[
        { name: "Головна", url: "/" },
        { name: "Калькулятор", url: "/calculator/" }
    ]}
  />
)

export const query = graphql`
  query {
    fillings: allContentfulCategory(
      filter: { type: { eq: "filling" }, node_locale: { eq: "uk" } }
    ) {
      edges {
        node {
          title
          images {
            title
            gatsbyImageData(
              width: 60
              height: 60
              quality: 70
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`
