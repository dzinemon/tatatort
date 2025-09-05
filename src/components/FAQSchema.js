import React from 'react'

// FAQ Schema component for rich snippets
const FAQSchema = ({ faqs = [] }) => {
  if (!faqs || faqs.length === 0) return null

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(faqSchema, null, 0)}
    </script>
  )
}

// Common FAQs for Tatatort bakery
export const defaultFAQs = [
  {
    question: "Як замовити торт у Тататорт?",
    answer: "Ви можете замовити торт через наші соціальні мережі Instagram (@tatatort) або Facebook (Tatatort), або зателефонувати за номером +380632498807."
  },
  {
    question: "Скільки коштує торт на замовлення?",
    answer: "Вартість торта залежить від розміру, складності дизайну та обраної начинки. Для точної ціни зв'яжіться з нами для консультації."
  },
  {
    question: "За скільки часу потрібно замовляти торт?",
    answer: "Рекомендуємо замовляти торт мінімум за 2-3 дні до потрібної дати, для складних дизайнів - за тиждень."
  },
  {
    question: "Чи доставляєте ви торти по Києву?",
    answer: "Так, ми здійснюємо доставку тортів по Києву. Умови доставки обговорюються індивідуально при замовленні."
  },
  {
    question: "Які начинки ви пропонуєте?",
    answer: "Ми пропонуємо різноманітні начинки: фруктові та ягідні, шоколадні, з горіхами, а також наші оригінальні авторські начинки."
  },
  {
    question: "Чи можна зробити торт для людей з алергією?",
    answer: "Так, ми можемо приготувати торти без глютену, без лактози або з урахуванням інших харчових обмежень. Обов'язково повідомте про алергії при замовленні."
  }
]

export default FAQSchema
