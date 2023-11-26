import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Modal from '../components/Modal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArrowsPointingOutIcon } from '@heroicons/react/24/solid'
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css'

import Layout from '../components/layout'
import SeoComponent from '../components/SeoComponent';

const socialItems = [
  { name: <><FontAwesomeIcon icon={faInstagram} size="lg" /> Instagram </>, url: "https://www.instagram.com/tatatort/" },
  { name: <><FontAwesomeIcon icon={faFacebook} size="lg" /> Facebook </>, url: "https://www.facebook.com/Tatatort/" }
]

export default function FillingsIndexPage({ data }) {

  // const fillings = data.fillings.edges.map(el => el.node)
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(0)
  const allFillings = data.fillings.edges.map(el => el.node)

  const images = allFillings.map(el => el.images).flat() 

  // const handlePrevClick = () => {
  //   if (modalItem > 0) {
  //     setModalItem(modalItem - 1);
  //   } else {
  //     setModalItem(images.length - 1)
  //   }
  // };
  
  // const handleNextClick = () => {
  //   if (modalItem < images.length - 1) {
  //     setModalItem(modalItem + 1);
  //   } else {
  //     setModalItem(0)
  //   }
  // };

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.key === 'ArrowRight' && modalOpen) {
  //       handleNextClick();
  //     }
  //     if (e.key === 'ArrowLeft' && modalOpen) {
  //       handlePrevClick();
  //     }
  //   };
  //   window.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [modalItem, modalOpen]);
  
  
  return (
    <Layout>
      <SeoComponent
        title={`Торти на замовлення в Києві - Тататорт`}
        description={`Тут ви зможете замовити оригінальні торти для своїх близьких. Дизайн, смачна начинка та позитивні емоції – це Тататорт!`}
      />
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
          {/* <div className="w-full lg:w-1/2 aspect-video bg-teal-500">

          </div> */}
        </div>
      </div>

      {/* {
        JSON.stringify(allFillings, null, 2)
      } */}
      
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
                            <GatsbyImage objectFit='cover' imgClassName='object-center' className='aspect-square h-full w-full' image={img.gatsbyImageData} alt={`${ img.title && img.title } ${img.description && img.description}`} />
                            {/* <button className='absolute group-hover:opacity-100 opacity-0 inset-0 duration-200 flex items-center justify-center rounded bg-white/20 backdrop-blur-xs' onClick={() => {
                              setModalOpen(true)
                              setModalItem(el.id)
                              } }>
                                <ArrowsPointingOutIcon className="h-12 w-12 text-white" />
                            </button> */}
                          </div>
                          <div className='space-y-4 flex-grow bg-white/60 backdrop-blur-sm p-4 rounded-b-lg'>
                          <p className='text-lg lg:text-2xl font-poiret'>{img.title}</p>
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
      

{/*       
        <Modal modalItem={modalItem} setNext={handleNextClick} setPrev={handlePrevClick} open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className='relative'>
            <img src={`${images[modalItem].file.url}`} className='max-w-full max-h-full' width={images[modalItem].file.details.image.width} height={images[modalItem].file.details.image.width} alt={`${images[modalItem].title}`}/>
            <div className='absolute bottom-0 left-0 right-0 bg-white/60'>
              <p className=' text-center text-xl lg:text-3xl font-poiret'>{images[modalItem].title}</p>
              <p>{images[modalItem].description}</p>
            </div>
          </div>
        </Modal> */}

    </Layout>
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