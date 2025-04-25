import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css'

import Layout from '../components/layout'
import { Seo } from '../components/Seo';

const CategoryCard = ({ data, type }) => {
  const image = data.images[0];
  
  return (
    <a 
      href={`/${data.slug}`} 
      className='bg-white group shadow-lg rounded-lg relative block hover:shadow-xl duration-200'
      aria-label={`${data.title} - відкрити деталі`}
    >
      <div className='bg-gradient-to-r from-blue-200 to-cyan-200 aspect-square rounded-lg overflow-hidden opacity-80 group-hover:opacity-100 duration-200'>
        <GatsbyImage 
          objectFit='cover' 
          imgClassName='object-center' 
          className='aspect-square h-full w-full' 
          image={image.gatsbyImageData} 
          alt={`${image.title || ''} ${image.description || ''}`} 
        />
      </div>
      <div className='absolute inset-0'>
        <div className='flex h-full p-3 lg:p-6 items-center justify-center'>
          <div className='w-auto aspect-square rounded-md bg-white/80 backdrop-blur-sm text-center flex flex-col justify-center items-center h-full'>
            <div className='relative w-full'>
              <p className="px-4 font-bold text-lg lg:text-2xl font-poiret">{data.title}</p>
              <p className="px-4 text-xs lg:text-sm font-light absolute text-center w-full opacity-0 group-hover:opacity-100 duration-500">
                Детальніше
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

// LazyFillingCard component for better performance with below-the-fold images
const LazyFillingCard = ({ data }) => {
  const image = data.images[0];
  
  return (
    <a 
      href={`/${data.slug}`} 
      className='bg-white group shadow-lg rounded-lg relative block hover:shadow-xl duration-200'
      aria-label={`${data.title} - відкрити деталі`}
    >
      <div className='bg-gradient-to-r from-blue-200 to-cyan-200 aspect-square rounded-lg overflow-hidden opacity-80 group-hover:opacity-100 duration-200'>
        <GatsbyImage 
          objectFit='cover' 
          imgClassName='object-center' 
          className='aspect-square h-full w-full' 
          image={image.gatsbyImageData} 
          alt={`${image.title || ''} ${image.description || ''}`} 
          loading="lazy"
        />
      </div>
      <div className='absolute inset-0'>
        <div className='flex h-full p-3 lg:p-6 items-center justify-center'>
          <div className='w-auto aspect-square rounded-md bg-white/80 backdrop-blur-sm text-center flex flex-col justify-center items-center h-full'>
            <div className='relative w-full'>
              <p className="px-4 font-bold text-lg lg:text-2xl font-poiret">{data.title}</p>
              <p className="px-4 text-xs lg:text-sm font-light absolute text-center w-full opacity-0 group-hover:opacity-100 duration-500">
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
  { 
    name: <><FontAwesomeIcon icon={faInstagram} size="lg" /> Instagram </>, 
    url: "https://www.instagram.com/tatatort/",
    ariaLabel: "Visit our Instagram page"
  },
  { 
    name: <><FontAwesomeIcon icon={faFacebook} size="lg" /> Facebook </>, 
    url: "https://www.facebook.com/Tatatort/",
    ariaLabel: "Visit our Facebook page"
  }
]

export default function IndexPage({ data }) {
  const fillings = data.fillings.edges
  const cakes = data.cakes.edges
  
  return (
    <Layout>
      <div className="container pt-16 lg:pt-20 xl:pt-28 pb-10 lg:pb-16 xl:pb-20">
        <div className="flex flex-wrap items-center justify-center -mx-4">
          <div className="w-full max-w-2xl text-center">
            <h1 className='font-poiret lg:text-6xl text-4xl'>Тататорт</h1>
            <p className="mb-8 lg:mb-10 opacity-80 text-sm">Оригінальні торти на замовлення у Києві</p>
            <div className='space-y-5 lg:text-lg max-w-2xl mx-auto'>
              <p>Друзі, цей сайт присвячений моєму солодкому хобі. Тут кожен зможе знайти торти для себе.</p>
              <p>Оригінальний дизайн, смачна начинка, позитивні емоції – це Тататорт!</p>
              <p>Замовити торт або кендібар:
                {" "}
              {socialItems.map((soc, idx) => (
                <a 
                  href={soc.url} 
                  key={`social-${idx}`} 
                  className='mx-1 text-cyan-600 hover:underline'
                  aria-label={soc.ariaLabel}
                >
                  {soc.name}
                </a>
              ))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-10 relative">
        <div className="absolute lg:block hidden w-56 h-96 transform rotate-12 bg-rose-200 opacity-50 blur-2xl rounded-full"></div>
        <div className="absolute lg:block hidden w-56 h-96 transform rotate-12 bg-teak-200 opacity-50 blur-2xl rounded-full bottom-0 right-0"></div>
        <h2 className='text-center font-poiret lg:text-5xl text-3xl mb-6 lg:mb-8'>Торти Тататорт</h2>
        <div className="container p-4 md:p-6 lg:p-10 rounded-xl backdrop-blur-sm bg-white/30">
        
          <div className="grid gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cakes.map((el, idx) => (
              <CategoryCard data={el.node} type="cake" key={`cake-category-${idx}`} />
            ))}
          </div>
        </div>
        
      </section>

      <section className="py-10">
        <h2 className='text-center font-poiret lg:text-5xl text-3xl mb-6 lg:mb-8'> Начинки Тататорт</h2>
        <div className='text-center mb-6 lg:mb-8 lg:text-2xl text-lg'>
            <a href='/fillings/' className='text-cyan-600 hover:underline'>Дивитись всі начинки</a>
          </div>
        <div className="container p-4 md:p-6 lg:p-10 rounded-xl backdrop-blur-sm bg-white/30">
        
          <div className="grid gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {fillings.map((el, idx) => (
              <LazyFillingCard data={el.node} key={`filling-category-${idx}`} />
            ))}
          </div>

         
        </div>
      </section>

    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Торти на замовлення в Києві - Тататорт"
    description="Тут ви зможете замовити оригінальні торти для своїх близьких. Дизайн, смачна начинка та позитивні емоції – це Тататорт!"
  />
)

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
            gatsbyImageData(width: 282, height: 282)
            title
            description
          }
        }
      }
    }
  }
`