import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

import Layout from '../components/layout'

const CakeCategoryCard = ( {data} ) => {

  const image = data.images[0]

  return (
    <a href={`/${data.slug}`} className='bg-white group shadow-lg rounded-lg relative block hover:shadow-xl duration-200'>
      <div className='bg-gradient-to-r from-blue-200 to-cyan-200 aspect-square rounded-lg overflow-hidden opacity-80 group-hover:opacity-100 duration-200'>
        <GatsbyImage objectFit='cover' imgClassName='object-center' className='aspect-square h-full w-full' image={image.gatsbyImageData} alt={`${ image.title && image.title } ${image.description && image.description}`} />
      </div>
      <div className='absolute inset-0'>
        <div className='flex h-full p-6 items-center justify-center'>
          <div className='w-auto aspect-square rounded-md bg-white/80 backdrop-blur-sm text-center flex flex-col justify-center items-center h-full'>
            <div className='relative w-full'>
              <p className="px-4 font-bold text-2xl font-poiret">{data.title}</p>
              <p className="px-4 text-sm font-light absolute text-center w-full opacity-0 group-hover:opacity-100 duration-500">
                Детальніше
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}
const FillingCategoryCard = ( {data} ) => {
  const image = data.images[0]
  return (
    <a href={`/${data.slug}`} className='bg-white group shadow-lg rounded-lg relative block hover:shadow-xl duration-200'>
      <div className='bg-gradient-to-r from-blue-200 to-cyan-200 aspect-square rounded-lg overflow-hidden opacity-80 group-hover:opacity-100 duration-200'>
        <GatsbyImage objectFit='cover' imgClassName='object-center' className='aspect-square h-full w-full' image={image.gatsbyImageData} alt={`${ image.title && image.title } ${image.description && image.description}`} />
      </div>
      <div className='absolute inset-0'>
        <div className='flex h-full p-6 items-center justify-center'>
          <div className='w-auto aspect-square rounded-md bg-white/80 backdrop-blur-sm text-center flex flex-col justify-center items-center h-full'>
            <div className='relative w-full'>
              <p className="px-4 font-bold text-2xl font-poiret">{data.title}</p>
              <p className="px-4 text-sm font-light absolute text-center w-full opacity-0 group-hover:opacity-100 duration-500">
                Детальніше
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

const socialItems = [
  { name: <><FontAwesomeIcon icon={faInstagram} size="md" /> Instagram </>, url: "https://www.instagram.com/tatatort/" },
  { name: <><FontAwesomeIcon icon={faFacebook} size="md" /> Facebook </>, url: "https://www.facebook.com/Tatatort/" }
]

export default function IndexPage({ data }) {

  const fillings = data.fillings.edges
  const cakes = data.cakes.edges
  
  
  
  return (
    <Layout>
    
      <div className="container py-16 lg:py-20 xl:py-28">
        <div className="flex flex-wrap items-center justify-center -mx-4">
          <div className="w-full max-w-2xl text-center">
            <h1 className='font-poiret lg:text-6xl text-4xl'>Тататорт</h1>
            <p className="mb-8 lg:mb-10 opacity-80 text-sm">Оригінальні торти на замовлення у Києві</p>
            <div className='space-y-5 text-lg max-w-2xl mx-auto'>
              <p>Друзі, цей сайт присвячений моєму солодкому хобі. Тут кожен зможе знайти торти для себе.</p>
              <p>Оригінальний дизайн, смачна начинка, позитивні емоції – це Тататорт!</p>
              <p>Замовити торт або кендібар:
                {" "}
              {socialItems.map((soc, idx) => <a href={soc.url} className='mx-1 text-cyan-600 hover:underline'>{soc.name}</a>)}
              </p>
            </div>
          </div>
          {/* <div className="w-full lg:w-1/2 aspect-video bg-teal-500">

          </div> */}
        </div>
      </div>

      <section className="py-10">
        <h2 className='text-center font-poiret lg:text-5xl text-3xl mb-6 lg:mb-8'>Торти Тататорт</h2>
        <div className="container p-4 md:p-6 lg:p-10 rounded-xl backdrop-blur-sm bg-white/50">
        
          <div className="grid gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
              cakes.map((el, idx, arr) => {
                return <CakeCategoryCard data={el.node} />
              })
            }
          </div>
          <div>{JSON.stringify(cakes.title, null, 2)}</div>
        </div>
      </section>

      <section className="py-10">
        <h2 className='text-center font-poiret lg:text-5xl text-3xl mb-6 lg:mb-8'> Начинки Тататорт</h2>
        <div className="container p-4 md:p-6 lg:p-10 rounded-xl backdrop-blur-sm bg-white/50">
        
          <div className="grid gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
              fillings.map((el, idx, arr) => {
                return <FillingCategoryCard data={el.node} />
              })
            }
          </div>
          <div>{JSON.stringify(fillings.title, null, 2)}</div>
        </div>
      </section>

    </Layout>
  )
}

export const query = graphql`
  query {
    cakes: allContentfulCategory(filter: {type: {eq: "cake"}, node_locale: {eq: "uk"}}) {
      edges {
        node {
          slug
          id
          name
          type
          title
          images {
            gatsbyImageData
            title
            description
          }
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
          title
          images {
            gatsbyImageData
            title
            description
          }
        }
      }
    }
  }
`