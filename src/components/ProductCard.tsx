import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-secondary hover:bg-lime-200 rounded-lg shadow-lg p-6 text-center transition duration-300 transform hover:scale-105 hover:shadow-xl">
    <div className="bg-lime-600 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-4">
      <Image
        src={product.image}
        alt={product.name}
        width={60}
        height={60}
        className="object-contain"
        loading="lazy"
      />
    </div>
    <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
    <p className="text-lg font-semibold text-gray-700 mb-4">${product.price}</p>
    <Link href={`/products/productDetail?id=${product.id}`}>
      <button className="mt-4 w-full bg-primary text-white px-4 py-2 rounded hover:bg-accent transition-colors duration-300">
        View
      </button>
    </Link>
  </div>
);

export default ProductCard;
