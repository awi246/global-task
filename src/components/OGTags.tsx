import Head from 'next/head';

interface OGTagsProps {
  title: string;
  description: string;
  image: string;
}

const OGTags: React.FC<OGTagsProps> = ({ title, description, image }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
  </Head>
);

export default OGTags;
