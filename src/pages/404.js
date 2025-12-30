import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { Seo } from "../components/Seo"

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="container pt-12 lg:pt-20 xl:pt-28 pb-10 lg:pb-16 xl:pb-20">
        <div className="flex flex-wrap items-center justify-center -mx-4">
          <div className="w-full max-w-2xl text-center">
            <h1 className='font-poiret lg:text-6xl text-4xl'>Сторінку не знайдено</h1>
            <p className="mb-8 lg:mb-10 opacity-80 text-sm">На жаль, ця сторінка не існує</p>
            <div className='space-y-5 lg:text-lg max-w-2xl mx-auto'>
              <p>Повернутись на <Link to="/" className="text-cyan-600 hover:underline">головну сторінку</Link></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => {
  const breadcrumbs = [
    { name: "Головна", url: "/" },
    { name: "404 - Сторінку не знайдено", url: "/404/" }
  ]

  return (
    <Seo
      title="Сторінку не знайдено - Тататорт"
      description="На жаль, ця сторінка не існує. Повернутись на головну сторінку."
      pageType="WebPage"
      breadcrumbs={breadcrumbs}
    />
  )
}
