import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import OGTags from '../components/OGTags';
import { fetchProducts } from '../utils/api';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const Home = ({ products }: { products: Product[] }) => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<Product[]>(products);

  useEffect(() => {
    if (search.trim() === '') {
      setFiltered(products);
    } else {
      const lowerSearch = search.toLowerCase();
      const filteredProducts = products.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          p.price.toLowerCase().includes(lowerSearch)
      );
      setFiltered(filteredProducts);
    }
  }, [search, products]);

  return (
    <>
      <OGTags
        title="Product Showcase"
        description="Browse our products"
        image="/assets/Global Square.jpeg"
      />
      <Navbar />
      <div className="p-4">
        <input
          type="text"
          placeholder="Search by name or price"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-textBody">No products found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  try {
    const products = await fetchProducts();
    return { props: { products } };
  } catch (error) {
    return { props: { products: [] } };
  }
}

export default Home;
