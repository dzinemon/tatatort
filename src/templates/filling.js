import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Modal from '../components/Modal'

import { ArrowsPointingOutIcon } from '@heroicons/react/24/solid'

import Layout from '../components/layout'
import { Seo } from '../components/Seo';

export default function FillingPage({ data }) {
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
  }, [modalItem, modalOpen]);
  
  return (
    <Layout>
      <div className="container py-16 lg:py-20">
        <h1 className='text-4xl lg:text-6xl font-poiret text-center '>{data.contentfulCategory.title}</h1>
      </div>

      <div className="container">
        <div className="grid gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          { images &&
            images.map((el, idx, arr) => {
              return (
                <div className='relative group shadow-lg flex flex-col' key={`filling-${idx}`}>
                  <div className='bg-gradient-to-r relative from-blue-200 to-cyan-200 aspect-square rounded-t-lg overflow-hidden' key={`images-${idx}`}>
                    <GatsbyImage 
                      objectFit='cover' 
                      imgClassName='object-center' 
                      className='aspect-square h-full w-full' 
                      image={el.gatsbyImageData} 
                      alt={`${ el.title && el.title } ${el.description && el.description}`}
                      loading="lazy"
                    />
                    <button className='absolute group-hover:opacity-100 opacity-0 inset-0 duration-200 flex items-center justify-center rounded bg-white/20 backdrop-blur-xs' onClick={() => {
                      setModalOpen(true)
                      setModalItem(idx)
                      } }>
                        <ArrowsPointingOutIcon className="h-12 w-12 text-white" />
                    </button>
                  </div>
                  <div className='space-y-4 flex-grow bg-white/60 backdrop-blur-sm p-4 rounded-b-lg'>
                  <p className='text-lg lg:text-2xl font-poiret'>{el.title}</p>
                  <p className='font-light text-sm lg:text-base'> {el.description}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      
        <Modal modalItem={modalItem} setNext={handleNextClick} setPrev={handlePrevClick} open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className='relative'>
            <img src={`${images[modalItem].file.url}`} className='max-w-full max-h-full' width={images[modalItem].file.details.image.width} height={images[modalItem].file.details.image.width} alt={`${images[modalItem].title}`}/>
            <div className='absolute bottom-0 left-0 right-0 bg-white/60'>
              <p className=' text-center text-xl lg:text-3xl font-poiret'>{images[modalItem].title}</p>
              {/* <p>{images[modalItem].description}</p> */}
            </div>
          </div>
        </Modal>

      <div >
        
      </div>
    </Layout>
  )
}

export const Head = ({ data }) => {
  // Create products array for schema from category images
  const products = data.contentfulCategory.images.map((image, index) => ({
    name: image.title || `${data.contentfulCategory.title} ${index + 1}`,
    description: image.description || `${image.title || data.contentfulCategory.title} - начинка від Тататорт`,
    image: image.file.url,
    category: data.contentfulCategory.title,
    price: "договірна"
  }))

  // Create breadcrumb navigation
  const breadcrumbs = [
    { name: "Головна", url: "/" },
    { name: "Начинки", url: "/fillings/" },
    { name: data.contentfulCategory.title, url: `/${data.contentfulCategory.slug}/` }
  ]

  // FAQ data specific to filling category
  const faqs = [
    {
      question: `Що входить до складу начинки ${data.contentfulCategory.title}?`,
      answer: "Ми використовуємо тільки якісні інгредієнти для наших начинок. Точний склад можна уточнити при замовленні."
    },
    {
      question: `Чи можна замовити торт тільки з начинкою ${data.contentfulCategory.title}?`,
      answer: "Так, ви можете обрати будь-яку начинку для свого торта або скомбінувати декілька начинок."
    }
  ]

  return (
    <Seo
      title={`${data.contentfulCategory.title} - Начинки для тортів від Тататорт`}
      description={`${data.contentfulCategory.description || data.contentfulCategory.title} - смачні начинки для тортів на замовлення у Києві від Тататорт. Натуральні інгредієнти та унікальні рецепти.`}
      image={data.contentfulCategory.images[0]?.file?.url}
      pageType="CollectionPage"
      products={products}
      breadcrumbs={breadcrumbs}
      category={data.contentfulCategory.title}
      faqs={faqs}
      keywords={`${data.contentfulCategory.title}, начинки для тортів, київ, тататорт, cake fillings`}
    />
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
      node_locale
      name
      title
      description
      type
      images {
        gatsbyImageData(
          width: 400,
          height: 400,
          quality: 85,
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
`