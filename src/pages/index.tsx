import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import OGTags from '../components/OGTags';
import { Pagination } from 'antd';
import { fetchProducts } from '../utils/api';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const PRODUCTS_PER_PAGE = 6;

const Home = ({ products }: { products: Product[] }) => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<Product[]>(products);
  const [nodePage, setNodePage] = useState(1); 
  const [dotnetPage, setDotnetPage] = useState(1);

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

    setNodePage(1);
    setDotnetPage(1);
  }, [search, products]);

  const nodeProducts = filtered.filter(
    (product) => product.category === 'Node.js Products'
  );
  const dotnetProducts = filtered.filter(
    (product) => product.category === '.NET Products'
  );

  const nodeTotalPages = Math.ceil(nodeProducts.length / PRODUCTS_PER_PAGE);
  const dotnetTotalPages = Math.ceil(dotnetProducts.length / PRODUCTS_PER_PAGE);

  const currentNodeProducts = nodeProducts.slice(
    (nodePage - 1) * PRODUCTS_PER_PAGE,
    nodePage * PRODUCTS_PER_PAGE
  );

  const currentDotnetProducts = dotnetProducts.slice(
    (dotnetPage - 1) * PRODUCTS_PER_PAGE,
    dotnetPage * PRODUCTS_PER_PAGE
  );

  const handleNodePageChange = (page: number) => {
    setNodePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDotnetPageChange = (page: number) => {
    setDotnetPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <>
      <OGTags
        title="Product Showcase"
        description="Browse our products"
        image="/assets/Global Square.jpeg"
      />
      <Navbar />
      <div className="p-4 max-w-7xl mx-auto font-sans">
        <input
          type="text"
          placeholder="Search by name or price"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-8 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-primary">Node.js Products</h2>
            {currentNodeProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                  {currentNodeProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {nodeTotalPages > 1 && (
                  <div className="flex justify-center mt-6">
                    <Pagination
                      current={nodePage}
                      total={nodeProducts.length}
                      pageSize={PRODUCTS_PER_PAGE}
                      onChange={handleNodePageChange}
                      showSizeChanger={false}
                      className="ant-pagination"
                    />
                  </div>
                )}
              </>
            ) : (
              <p className="text-textBody">No Node.js products found.</p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-accent">.NET Products</h2>
            {currentDotnetProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                  {currentDotnetProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {dotnetTotalPages > 1 && (
                  <div className="flex justify-center mt-6">
                    <Pagination
                      current={dotnetPage}
                      total={dotnetProducts.length}
                      pageSize={PRODUCTS_PER_PAGE}
                      onChange={handleDotnetPageChange}
                      showSizeChanger={false}
                      className="ant-pagination"
                    />
                  </div>
                )}
              </>
            ) : (
              <p className="text-textBody">No .NET products found.</p>
            )}
          </section>
        </div>
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
    console.error(error);
    return { props: { products: [] } };
  }
}

export default Home;
