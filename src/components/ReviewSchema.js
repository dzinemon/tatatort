import React from 'react'

// Review Schema component for rich snippets
const ReviewSchema = ({ reviews = [], businessName = "Тататорт" }) => {
  if (!reviews || reviews.length === 0) return null

  const aggregateRating = {
    "@type": "AggregateRating",
    ratingValue: reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1
  }

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessName,
    aggregateRating: aggregateRating,
    review: reviews.map(review => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1
      },
      reviewBody: review.text,
      datePublished: review.date
    }))
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(reviewSchema, null, 0)}
    </script>
  )
}

// Sample reviews for demonstration (in a real app, these would come from a CMS or review platform)
export const sampleReviews = [
  {
    author: "Олена К.",
    rating: 5,
    text: "Замовляли весільний торт - результат перевершив усі очікування! Дуже смачно і красиво!",
    date: "2024-05-15"
  },
  {
    author: "Андрій М.",
    rating: 5,
    text: "Чудові торти для дитячого дня народження. Діти були в захваті від дизайну!",
    date: "2024-04-20"
  },
  {
    author: "Марія С.",
    rating: 5,
    text: "Оригінальні начинки, неймовірний смак. Обов'язково замовлятимемо ще!",
    date: "2024-03-10"
  }
]

export default ReviewSchema
