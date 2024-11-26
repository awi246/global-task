/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import OGTags from '../../components/OGTags';
import { fetchProductById } from '../../utils/api';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const ProductDetail = ({ product }: { product: Product | null }) => {
  if (!product) {
    return (
      <>
        <OGTags
          title="Product Not Found"
          description="The requested product does not exist."
          image="/assets/Global Square.jpeg"
        />
        <Navbar />
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="text-textBody mt-2">The product you are looking for does not exist.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <OGTags
        title={product.name}
        description={product.price}
        image={product.image}
      />
      <Navbar />
      <div className="p-4 flex flex-col items-center">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover"
          loading="lazy"
        />
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="text-textBody mt-2">{product.price}</p>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  try {
    const product = await fetchProductById(Number(id));
    return { props: { product: product || null } };
  } catch (error) {
    console.error(error);
    return { props: { product: null } };
  }
}

export default ProductDetail;
