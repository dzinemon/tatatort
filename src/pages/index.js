import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/layout";
import { Seo } from "../components/Seo";
import FAQ from "../components/FAQ";

const CategoryCard = ({ data, type }) => {
  const image = data.images[0];

  return (
    <a
      href={`/${data.slug}`}
      className="bg-white group shadow-lg rounded-lg relative block hover:shadow-xl duration-200"
      aria-label={`${data.title} - відкрити деталі`}
    >
      <div className="bg-gradient-to-r from-blue-200 to-cyan-200 aspect-square rounded-lg overflow-hidden opacity-80 group-hover:opacity-100 duration-200">
        <GatsbyImage
          objectFit="cover"
          imgClassName="object-center"
          className="aspect-square h-full w-full"
          image={image.gatsbyImageData}
          alt={`${image.title || ""} ${image.description || ""}`}
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="absolute inset-0">
        <div className="flex h-full p-3 lg:p-6 items-center justify-center">
          <div className="w-auto aspect-square rounded-md bg-white/80 backdrop-blur-sm text-center flex flex-col justify-center items-center h-full">
            <div className="relative w-full">
              <p className="px-4 font-bold text-lg lg:text-2xl font-poiret">
                {data.title}
              </p>
              <p className="px-4 text-xs lg:text-sm font-light absolute text-center w-full opacity-0 group-hover:opacity-100 duration-500">
                Детальніше
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

// LazyFillingCard component for better performance with below-the-fold images
const LazyFillingCard = ({ data }) => {
  const image = data.images[0];

  return (
    <a
      href={`/${data.slug}`}
      className="bg-white group shadow-lg rounded-lg relative block hover:shadow-xl duration-200"
      aria-label={`${data.title} - відкрити деталі`}
    >
      <div className="bg-gradient-to-r from-blue-200 to-cyan-200 aspect-square rounded-lg overflow-hidden opacity-80 group-hover:opacity-100 duration-200">
        <GatsbyImage
          objectFit="cover"
          imgClassName="object-center"
          className="aspect-square h-full w-full"
          image={image.gatsbyImageData}
          alt={`${image.title || ""} ${image.description || ""}`}
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0">
        <div className="flex h-full p-3 lg:p-6 items-center justify-center">
          <div className="w-auto aspect-square rounded-md bg-white/80 backdrop-blur-sm text-center flex flex-col justify-center items-center h-full">
            <div className="relative w-full">
              <p className="px-4 font-bold text-lg lg:text-2xl font-poiret">
                {data.title}
              </p>
              <p className="px-4 text-xs lg:text-sm font-light absolute text-center w-full opacity-0 group-hover:opacity-100 duration-500">
                Детальніше
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

const socialItems = [
  {
    name: (
      <>
        <FontAwesomeIcon icon={faInstagram} size="lg" /> Instagram{" "}
      </>
    ),
    url: "https://www.instagram.com/tatatort/",
    ariaLabel: "Visit our Instagram page",
  },
  {
    name: (
      <>
        <FontAwesomeIcon icon={faFacebook} size="lg" /> Facebook{" "}
      </>
    ),
    url: "https://www.facebook.com/Tatatort/",
    ariaLabel: "Visit our Facebook page",
  },
];

export default function IndexPage({ data }) {
  const fillings = data.fillings.edges;
  const cakes = data.cakes.edges;

  // FAQ data
  const faqs = [
        {
      question: "За скільки часу потрібно замовляти торт?",
      answer:
        "Рекомендуємо замовляти торт мінімум за 2-3 дні до потрібної дати, для складних дизайнів - за тиждень.",
    },
    {
      question: "Скільки коштує торт на замовлення?",
      answer:
        "Вартість торта залежить від розміру, складності дизайну та обраної начинки. Для точної ціни зв'яжіться з нами для консультації.",
    },

    {
      question: "Як здійснюється доставка тортів?",
      answer:
        "Ми пропонуємо доставку тортів по Києву та області через служби таксі. Також можливий самовивіз з нашої майстерні.",
    },
    {
      question: "Як розрахувати вагу торта?",
      answer:
        "Зазвичай розрахунок ваги торта здійснюється виходячи з кількості порцій. Рекомендуємо приблизно 125-150 грамів на порцію. В деяких випадках вага може бути більшою в залежності від дизайну та начинки.",
    }
  ];

  return (
    <Layout>
      <div className="container pt-16 lg:pt-20 xl:pt-28 pb-10 lg:pb-16 xl:pb-20">
        <div className="flex flex-wrap items-center justify-center -mx-4">
          <div className="w-full max-w-2xl text-center px-4">
            <h1 className="font-poiret lg:text-7xl text-4xl">Тататорт</h1>
            <p className="mb-5 opacity-80 text-sm">
              Оригінальні торти на замовлення у Києві
            </p>
            <div className="space-y-5 lg:text-lg max-w-2xl mx-auto">
              <p>
                Професійне виготовлення тортів на замовлення в Києві. Поєднання вишуканого смаку та сучасного дизайну. Ексклюзивний декор, натуральні інгредієнти та ваші найяскравіші емоції – це Тататорт!
              </p>
              <p>
                Замовити торт або кендібар:
                <div className="flex flex-row gap-2 md:gap-4 justify-center items-center mt-4">
                  <a
                    href="tel:+380632498807"
                    className="inline-flex items-center px-3 py-2 lg:px-6 lg:py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 md:text-lg transition-colors gap-2"
                    aria-label="Зателефонувати нам"
                  >
                    <FontAwesomeIcon icon={faPhone} />
                    Зателефонувати
                  </a>
                  <a
                    href="https://t.me/TataUtekhina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 lg:px-6 lg:py-3 border border-transparent text-base font-medium rounded-md text-cyan-700 bg-cyan-100 hover:bg-cyan-200 md:text-lg transition-colors gap-2"
                    aria-label="Написати в Telegram"
                  >
                    <FontAwesomeIcon icon={faTelegram} />
                    Написати в Telegram
                  </a>
                </div>
              </p>{" "}
              <p>Наші соціальні мережі:</p>
              {socialItems.map((soc, idx) => (
                <a
                  href={soc.url}
                  key={`social-${idx}`}
                  className="mx-1 text-cyan-600 hover:underline"
                  aria-label={soc.ariaLabel}
                >
                  {soc.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="py-10 relative">
        <div className="absolute lg:block hidden w-56 h-96 transform rotate-12 bg-rose-200 opacity-50 blur-2xl rounded-full"></div>
        <div className="absolute lg:block hidden w-56 h-96 transform rotate-12 bg-teak-200 opacity-50 blur-2xl rounded-full bottom-0 right-0"></div>
        <h2 className="text-center font-poiret lg:text-5xl text-3xl mb-6 lg:mb-8">
          Торти Тататорт
        </h2>
        <div className="container p-4 md:p-6 lg:p-10 rounded-xl backdrop-blur-sm bg-white/30">
          <div className="grid gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cakes.map((el, idx) => (
              <CategoryCard
                data={el.node}
                type="cake"
                key={`cake-category-${idx}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <h2 className="text-center font-poiret lg:text-5xl text-3xl mb-6 lg:mb-8">
          {" "}
          Начинки Тататорт
        </h2>
        <div className="text-center mb-6 lg:mb-8 lg:text-2xl text-lg">
          <a href="/fillings/" className="text-cyan-600 hover:underline">
            Дивитись всі начинки
          </a>
        </div>
        <div className="container p-4 md:p-6 lg:p-10 rounded-xl backdrop-blur-sm bg-white/30">
          <div className="grid gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {fillings.map((el, idx) => (
              <LazyFillingCard data={el.node} key={`filling-category-${idx}`} />
            ))}
          </div>
        </div>
      </section>

      <FAQ faqs={faqs} />
    </Layout>
  );
}

export const Head = ({ data }) => {
  // Create products array for schema
  const products = [
    ...data.cakes.edges.map((edge) => ({
      name: edge.node.title,
      description: `${edge.node.title} - торти від Тататорт`,
      image:
        edge.node.images[0]?.gatsbyImageData?.images?.fallback?.src ||
        "/image.png",
      category: "Торти",
    })),
    ...data.fillings.edges.map((edge) => ({
      name: edge.node.title,
      description: `${edge.node.title} - начинки від Тататорт`,
      image:
        edge.node.images[0]?.gatsbyImageData?.images?.fallback?.src ||
        "/image.png",
      category: "Начинки",
    })),
  ];

  // FAQ data for schema
  const faqs = [
    {
      question: "Як замовити торт у Тататорт?",
      answer:
        "Ви можете замовити торт через наші соціальні мережі Instagram (@tatatort) або Facebook (Tatatort), або зателефонувати за номером +380632498807.",
    },
    {
      question: "Скільки коштує торт на замовлення?",
      answer:
        "Вартість торта залежить від розміру, складності дизайну та обраної начинки. Для точної ціни зв'яжіться з нами для консультації.",
    },
    {
      question: "За скільки часу потрібно замовляти торт?",
      answer:
        "Рекомендуємо замовляти торт мінімум за 2-3 дні до потрібної дати, для складних дизайнів - за тиждень.",
    },
  ];

  return (
    <Seo
      title="Торти на замовлення в Києві - Тататорт"
      description="Тут ви зможете замовити оригінальні торти для своїх близьких. Авторський дизайн, вишукані начинки та позитивні емоції – це Тататорт!"
      pageType="WebPage"
      products={products}
      faqs={faqs}
      // reviews={reviews}
    />
  );
};

export const query = graphql`
  query {
    cakes: allContentfulCategory(
      filter: { type: { eq: "cake" }, node_locale: { eq: "uk" } }
    ) {
      edges {
        node {
          slug
          id
          name
          type
          title
          images {
            gatsbyImageData(
              width: 400
              height: 400
              quality: 70
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
            title
            description
          }
        }
      }
    }
    fillings: allContentfulCategory(
      filter: { type: { eq: "filling" }, node_locale: { eq: "uk" } }
    ) {
      edges {
        node {
          slug
          id
          name
          type
          title
          images {
            gatsbyImageData(
              width: 282
              height: 282
              quality: 70
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
            title
            description
          }
        }
      }
    }
  }
`;
