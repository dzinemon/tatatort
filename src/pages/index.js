import React from "react";
import { graphql } from "gatsby";

import { FaTelegramPlane, FaPhone } from "react-icons/fa";

import Layout from "../components/layout";
import { Seo } from "../components/Seo";
import FAQ from "../components/FAQ";
import Button from "../components/ui/Button";
import Section from "../components/ui/Section";
import SocialLinks from "../components/SocialLinks";
import CategoryCard from "../components/ui/CategoryCard";
import SectionHeading from "../components/ui/SectionHeading";

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
      <div className="container pt-12 lg:pt-20 xl:pt-28 pb-10 lg:pb-16 xl:pb-20">
        <div className="flex flex-wrap items-center justify-center -mx-4">
          <div className="w-full max-w-2xl text-center px-4">
            <h1 className="font-poiret lg:text-7xl text-5xl mb-4 text-neutral-900">Тататорт</h1>
            <p className="mb-8 opacity-80 text-lg text-neutral-600 font-light tracking-wide uppercase">
              Оригінальні торти на замовлення у Києві
            </p>
            <div className="space-y-8 lg:text-lg max-w-2xl mx-auto text-neutral-700 leading-relaxed">
              <p>
                Професійне виготовлення тортів на замовлення в Києві. Поєднання вишуканого смаку та сучасного дизайну. Ексклюзивний декор, натуральні інгредієнти та ваші найяскравіші емоції – це Тататорт!
              </p>

              <div className="flex flex-col items-center gap-6 mt-8">
                <span className="font-medium text-neutral-900">Замовити торт або кендібар:</span>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                  <Button
                    href="tel:+380632498807"
                    variant="primary"
                    size="lg"
                    aria-label="Зателефонувати нам"
                    className="w-full sm:w-auto"
                  >
                    <FaPhone />
                    Зателефонувати
                  </Button>

                  <Button
                    href="https://t.me/TataUtekhina"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="lg"
                    aria-label="Написати в Telegram"
                    className="w-full sm:w-auto"
                  >
                    <FaTelegramPlane />
                    Написати в Telegram
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <p className="mb-2 text-sm text-neutral-500">Наші соціальні мережі:</p>
                <div className="flex justify-center">
                  <SocialLinks variant="hero" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section className="">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

        <SectionHeading>
          Торти Тататорт
        </SectionHeading>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 relative z-10">
          {cakes.map((el, idx) => (
            <CategoryCard
              data={el.node}
              key={`cake-category-${idx}`}
              loading="eager"
            />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading className="mb-4 lg:mb-6">
          Начинки Тататорт
        </SectionHeading>

        <div className="text-center mb-8 lg:mb-12">
          <Button
            to="/fillings/"
            variant="ghost"
            className="text-lg"
          >
            Дивитись всі начинки →
          </Button>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {fillings.map((el, idx) => (
            <CategoryCard
              data={el.node}
              key={`filling-category-${idx}`}
              loading="lazy"
            />
          ))}
        </div>
      </Section>

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
            width
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
            width
          }
        }
      }
    }
  }
`;
