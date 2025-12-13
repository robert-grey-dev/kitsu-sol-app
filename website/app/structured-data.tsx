'use client'

export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kitsu Inu',
    url: 'https://kitsuinu.com',
    logo: 'https://kitsuinu.com/logo.png',
    description: 'Professional Solana token creation platform',
    sameAs: [
      'https://twitter.com/kitsu_inu_',
      'https://t.me/kitsuinu',
      'https://github.com/robert-grey-dev/kitsu-sol-app',
    ],
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Kitsu Inu Token Creator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0.1',
      priceCurrency: 'SOL',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does it cost to create a token?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Creating a token costs 0.1 SOL platform fee plus network fees (~0.02 SOL). Total approximately 0.12 SOL.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need coding skills?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No coding skills required. Our platform handles everything automatically - just fill in your token details.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I add liquidity after creating the token?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, after creation you can add liquidity on Raydium or Orca DEX.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}

