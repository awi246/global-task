import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  
  <div className="bg-secondary hover:bg-lime-400 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
    <Image
      src={product.image}
      alt={product.name}
      width={300}
      height={200}
      className="object-contain w-full h-48"
      loading="lazy"
    />
    <div className="p-4">
      <h2 className="text-lg font-semibold text-textDark mt-2">{product.name}</h2>
      <p className="text-textBody">{product.price}</p>
      <Link href={`/products/productDetail?id=${product.id}`}>
        <button className="mt-4 w-full bg-primary text-white px-4 py-2 rounded hover:bg-accent transition-colors duration-300">
          View
        </button>
      </Link>
    </div>
  </div>
);

export default ProductCard;
