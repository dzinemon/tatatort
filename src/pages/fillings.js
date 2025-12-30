import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/layout';
import { Seo } from '../components/Seo';
import SocialLinks from '../components/SocialLinks';

export default function FillingsIndexPage({ data }) {
  const allFillings = data.fillings.edges.map(el => el.node)

  return (
    <Layout>
      <div className="container pt-12 lg:pt-20 xl:pt-28 pb-10 lg:pb-16 xl:pb-20">
        <div className="flex flex-wrap items-center justify-center -mx-4">
          <div className="w-full max-w-2xl text-center">
            <h1 className='font-poiret lg:text-6xl text-4xl'>Начинки Тататорт</h1>
            <p className="mb-8 lg:mb-10 opacity-80 text-sm">Оригінальні торти на замовлення у Києві</p>
            <div className="pt-4">
              <p className="mb-2 text-sm text-neutral-500">Наші соціальні мережі:</p>
              <div className="flex justify-center">
                <SocialLinks variant="hero" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        allFillings.map((el, idx) => {
          return (
            <section className="pb-10 relative" key={`filling-category-section-${idx}`}>
              <div className="absolute lg:block hidden w-56 h-96 transform rotate-12 bg-rose-200 opacity-50 blur-2xl rounded-full"></div>
              <div className="absolute lg:block hidden w-56 h-96 transform rotate-12 bg-teak-200 opacity-50 blur-2xl rounded-full bottom-0 right-0"></div>
              <h2 className='text-center font-poiret lg:text-5xl text-3xl mb-6 lg:mb-8'>{el.title}</h2>
              <div className="container p-4 md:p-6 lg:p-10 rounded-xl backdrop-blur-sm bg-white/30">

                <div className="grid gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {
                    el.images.map((img, idx) => {
                      return (
                        <div className='relative group shadow-lg flex flex-col' key={`filling-category-item-${idx}`}>
                          <div className='bg-gradient-to-r relative from-blue-200 to-cyan-200 aspect-square rounded-t-lg overflow-hidden' key={`images-${idx}`}>
                            <GatsbyImage
                              objectFit='cover'
                              imgClassName='object-center'
                              className='aspect-square h-full w-full transition-transform duration-300 group-hover:scale-105'
                              image={img.gatsbyImageData}
                              alt={`${img.title && img.title} ${img.description && img.description}`}
                              loading="lazy"
                            />
                          </div>
                          <div className='space-y-3 lg:space-y-4 flex-grow bg-white/60 backdrop-blur-sm p-2.5 lg:p-4 rounded-b-lg'>
                            <h3 className='text-lg lg:text-2xl font-poiret leading-tight'>{img.title}</h3>
                            <p className='font-light text-sm lg:text-base'> {img.description}</p>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>

            </section>
          )
        }
        )
      }
    </Layout>
  )
}

export const Head = ({ data }) => {
  // Create products array for schema from all filling categories
  const products = data.fillings.edges.flatMap(edge =>
    edge.node.images.map((image, index) => ({
      name: image.title || `${edge.node.title} ${index + 1}`,
      description: image.description || `${image.title || edge.node.title} - начинка від Тататорт`,
      image: image.file.url,
      category: edge.node.title,
      price: "1200"
    }))
  )

  // Create breadcrumb navigation
  const breadcrumbs = [
    { name: "Головна", url: "/" },
    { name: "Начинки", url: "/fillings/" }
  ]

  // FAQ data for fillings page
  const faqs = [
    {
      question: "Які начинки доступні для тортів?",
      answer: "Ми пропонуємо широкий вибір начинок: від класичних до оригінальних авторських. Всі начинки готуються з натуральних інгредієнтів."
    },
    {
      question: "Чи можна поєднувати різні начинки в одному торті?",
      answer: "Так, ви можете вибрати декілька начинок для свого торта. Ми допоможемо підібрати найкращі поєднання смаків."
    },
    {
      question: "Чи є начинки для людей з алергіями?",
      answer: "Ми можемо приготувати начинки без глютену, молочних продуктів або інших алергенів. Обов'язково повідомте про алергії при замовленні."
    }
  ]

  return (
    <Seo
      title="Начинки для тортів - Каталог смачних начинок Тататорт"
      description="Великий вибір оригінальних начинок для тортів на замовлення у Києві. Натуральні інгредієнти, унікальні рецепти та неперевершений смак від Тататорт."
      pageType="CollectionPage"
      products={products}
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      keywords="начинки для тортів, начинки тататорт, київ, cake fillings, торти на замовлення"
    />
  )
}

export const query = graphql`
  query {
    fillings: allContentfulCategory(filter: {type: {eq: "filling"}, node_locale: {eq: "uk"}}) {
      edges {
        node {
          slug
          id
          name
          type
          title
          images {
            id
            gatsbyImageData(
              width: 282, 
              height: 282,
              quality: 70,
              placeholder: BLURRED,
              formats: [AUTO, WEBP, AVIF]
            )
            title
            description
            file {
              url
              details {
                image {
                  height
                  width
                }
              }
            }
          }
        }
      }
    }
  }
`