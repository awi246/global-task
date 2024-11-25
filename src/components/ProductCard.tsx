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
  <div className="border rounded shadow p-4">
    <Image
      src={product.image}
      alt={product.name}
      width={200}
      height={200}
      className="object-cover"
      loading="lazy"
    />
    <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
    <p className="text-textBody">{product.price}</p>
    <Link href={`/products/productDetail?id=${product.id}`}>
      <button className="mt-2 bg-accent text-white px-4 py-2 rounded">View</button>
    </Link>
  </div>
);

export default ProductCard;
