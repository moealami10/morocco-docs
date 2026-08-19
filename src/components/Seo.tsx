import React from 'react'
import { Helmet } from 'react-helmet-async'

export interface SeoProps {
  title: string
  description: string
  canonicalUrl: string
  lang?: string
  alternates?: Array<{ hrefLang: string; href: string }>
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonicalUrl,
  lang = 'fr',
  alternates,
}) => {
  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {alternates?.map((alt) => (
        <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Kaghit" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
