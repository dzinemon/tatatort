import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Modal from '../components/Modal'
import PageHero from '../components/PageHero'

import { ArrowsPointingOutIcon } from '@heroicons/react/24/solid'

import Layout from '../components/layout'
import { Seo } from '../components/Seo';

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
  }, [modalItem, modalOpen]);
  
  return (
    <Layout>
      <PageHero title={data.contentfulCategory.title} />
      

      <div className="container">
        <div className="grid gap-4 lg:gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          { images &&
            images.map((el, idx, arr) => {
              return (
                <div className='relative group' key={`cake-${idx}`}>
                  <div className='bg-gradient-to-r from-blue-200 to-cyan-200 aspect-square shadow-lg rounded-lg overflow-hidden group-hover:scale-[1.05] duration-500' key={`images-${idx}`}>
                    <GatsbyImage 
                      objectFit='cover' 
                      imgClassName='object-center' 
                      className='aspect-square h-full w-full' 
                      image={el.gatsbyImageData} 
                      alt={`${ el.title && el.title } ${el.description && el.description}`}
                      loading="lazy"
                    />
                  </div>
                  <button className='absolute group-hover:opacity-100 opacity-0 inset-0 duration-200 flex items-center justify-center rounded scale-[0.75] group-hover:scale-[1.05] delay-200 duration-500' onClick={() => {
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
          <img src={`${images[modalItem].file.url}`} className='max-w-full w-auto max-h-[85vh]' width={images[modalItem].file.details.image.width} height={images[modalItem].file.details.image.width} alt={`${images[modalItem].title}`}/>
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
    description: image.description || `${image.title || data.contentfulCategory.title} - торт від Тататорт`,
    image: image.file.url,
    category: data.contentfulCategory.title,
    price: "1200"
  }))

  // Create breadcrumb navigation
  const breadcrumbs = [
    { name: "Головна", url: "/" },
    { name: "Торти", url: "/#cakes" },
    { name: data.contentfulCategory.title, url: `/${data.contentfulCategory.slug}/` }
  ]

  // FAQ data specific to cake category
  const faqs = [
    {
      question: `Скільки коштує торт ${data.contentfulCategory.title}?`,
      answer: "Вартість торта залежить від розміру та складності дизайну. Зв'яжіться з нами для отримання точної ціни."
    },
    {
      question: `Як замовити торт ${data.contentfulCategory.title}?`,
      answer: "Ви можете замовити торт через наші соціальні мережі Instagram або Facebook, або зателефонувати за номером +380632498807."
    }
  ]

  return (
    <Seo
      title={`${data.contentfulCategory.title} - Торти на замовлення від Тататорт`}
      description={`${data.contentfulCategory.description || data.contentfulCategory.title} - оригінальні торти на замовлення у Києві від Тататорт. Унікальний дизайн та смачні начинки.`}
      image={data.contentfulCategory.images[0]?.file?.url}
      pageType="CollectionPage"
      products={products}
      breadcrumbs={breadcrumbs}
      category={data.contentfulCategory.title}
      faqs={faqs}
      keywords={`${data.contentfulCategory.title}, торти на замовлення, київ, тататорт, cake, custom cakes`}
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
      name
      title
      description
      type
      images {
        gatsbyImageData(
          width: 400,
          height: 400,
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
`