import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css'

import Layout from '../components/layout'
import { Seo } from '../components/Seo';

const socialItems = [
  { name: <><FontAwesomeIcon icon={faInstagram} size="lg" /> Instagram </>, url: "https://www.instagram.com/tatatort/" },
  { name: <><FontAwesomeIcon icon={faFacebook} size="lg" /> Facebook </>, url: "https://www.facebook.com/Tatatort/" }
]

export default function FillingsIndexPage({ data }) {
  const allFillings = data.fillings.edges.map(el => el.node)
  
  return (
    <Layout>
      <div className="container pt-16 lg:pt-20 xl:pt-28 pb-10 lg:pb-16 xl:pb-20">
        <div className="flex flex-wrap items-center justify-center -mx-4">
          <div className="w-full max-w-2xl text-center">
            <h1 className='font-poiret lg:text-6xl text-4xl'>Начинки Тататорт</h1>
            <p className="mb-8 lg:mb-10 opacity-80 text-sm">Оригінальні торти на замовлення у Києві</p>
            <div className='space-y-5 lg:text-lg max-w-2xl mx-auto'>
              <p>Замовити начинки та торти:
                {" "}
              {socialItems.map((soc, idx) => <a href={soc.url} key={`social-${idx}`} className='mx-1 text-cyan-600 hover:underline'>{soc.name}</a>)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {
        allFillings.map((el, idx) => {
          return (
            <section className="py-10 relative" key={`filling-category-section-${idx}`}>
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
                              alt={`${ img.title && img.title } ${img.description && img.description}`} 
                            />
                          </div>
                          <div className='space-y-4 flex-grow bg-white/60 backdrop-blur-sm p-4 rounded-b-lg'>
                            <h3 className='text-lg lg:text-2xl font-poiret'>{img.title}</h3>
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

export const Head = () => (
  <Seo
    title="Начинки для тортів Тататорт - Київ"
    description="Різноманітні оригінальні начинки для тортів на замовлення. Дизайн, смачна начинка та позитивні емоції – це Тататорт!"
  />
)

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
            gatsbyImageData(width: 282, height: 282)
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