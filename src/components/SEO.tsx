import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
}

const SEO = ({
  title,
  description,
  name = 'Hyunjae Cheon',
  type = 'website',
}: SEOProps) => {
  const defaultTitle = 'Hyunjae Cheon - Frontend Developer';
  const defaultDescription = 'Portfolio of Hyunjae Cheon, a creative Frontend Developer specializing in React, TypeScript, and modern web technologies.';
  
  const siteTitle = title ? `${title} | ${name}` : defaultTitle;
  const metaDescription = description || defaultDescription;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name='description' content={metaDescription} />
      
      {/* Facebook tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={siteTitle} />
      <meta property='og:description' content={metaDescription} />
      
      {/* Twitter tags */}
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={siteTitle} />
      <meta name='twitter:description' content={metaDescription} />
    </Helmet>
  );
};

export default SEO;
