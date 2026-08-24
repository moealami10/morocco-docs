import React from 'react';

interface LocalBusinessSchemaProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  addressCountry: string;
}

export const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({
  name,
  url,
  logo,
  description,
  addressCountry,
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "url": url,
    ...(logo && { "logo": logo }),
    ...(description && { "description": description }),
    "address": {
      "@type": "PostalAddress",
      "addressCountry": addressCountry
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
