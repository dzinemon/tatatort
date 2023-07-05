import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Modal from '../components/Modal'
import PageHero from '../components/PageHero'

import { ArrowsPointingOutIcon } from '@heroicons/react/24/solid'

import Layout from '../components/layout'

export default function CakesPage({ data }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(0)
  const {images} = data.contentfulCategory

  const handlePrevClick = () => {
    if (modalItem > 0) {
      setModalItem(modalItem - 1);
    } else {
      setModalItem(images.length - 1)
    }
  };
  
  const handleNextClick = () => {
    if (modalItem < images.length - 1) {
      setModalItem(modalItem + 1);
    } else {
      setModalItem(0)
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && modalOpen) {
        handleNextClick();
      }
      if (e.key === 'ArrowLeft' && modalOpen) {
        handlePrevClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalItem]);
  
  return (
    <Layout>
    
      <PageHero title={data.contentfulCategory.title} />
      

      <div className="container">
        <div className="grid gap-4 lg:gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          { images &&
            images.map((el, idx, arr) => {
              return (
                <div className='relative group'>
                  <div className='bg-gradient-to-r from-blue-200 to-cyan-200 aspect-square shadow-lg rounded-lg overflow-hidden' key={`images-${idx}`}>
                    <GatsbyImage objectFit='cover' imgClassName='object-center' className='aspect-square h-full w-full' image={el.gatsbyImageData} alt={`${ el.title && el.title } ${el.description && el.description}`} />
                  </div>
                  <button className='absolute group-hover:opacity-100 opacity-0 inset-0 duration-200 flex items-center justify-center rounded bg-white/20 backdrop-blur-xs' onClick={() => {
                    setModalOpen(true)
                    setModalItem(idx)
                    } }>
                      <ArrowsPointingOutIcon className="h-12 w-12 text-white" />
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>

      
        <Modal modalItem={modalItem} setNext={handleNextClick} setPrev={handlePrevClick} open={modalOpen} onClose={() => setModalOpen(false)}>
          <img src={`${images[modalItem].file.url}`} className='max-w-full max-h-full' width={images[modalItem].file.details.image.width} height={images[modalItem].file.details.image.width} alt={`${images[modalItem].title}`}/>
        </Modal>

      <div >
        
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulCategory(
      slug: {eq: $slug},
      node_locale: {eq: "uk"}
    ) {
      id
      slug
      name
      title
      type
      images {
        gatsbyImageData
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
`