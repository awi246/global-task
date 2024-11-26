import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import OGTags from '../components/OGTags';
import ReactPaginate from 'react-paginate'; 
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
  const [nodePage, setNodePage] = useState(0); 
  const [dotnetPage, setDotnetPage] = useState(0);

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

    setNodePage(0);
    setDotnetPage(0);
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
    nodePage * PRODUCTS_PER_PAGE,
    (nodePage + 1) * PRODUCTS_PER_PAGE
  );

  const currentDotnetProducts = dotnetProducts.slice(
    dotnetPage * PRODUCTS_PER_PAGE,
    (dotnetPage + 1) * PRODUCTS_PER_PAGE
  );

  const handleNodePageChange = ({ selected }: { selected: number }) => {
    setNodePage(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDotnetPageChange = ({ selected }: { selected: number }) => {
    setDotnetPage(selected);
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
                    <ReactPaginate
                      previousLabel="← Previous"
                      nextLabel="Next →"
                      breakLabel="..."
                      breakClassName="hidden" 
                      pageCount={nodeTotalPages}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={handleNodePageChange}
                      containerClassName="flex space-x-2"
                      pageClassName=""
                      pageLinkClassName="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
                      previousClassName=""
                      previousLinkClassName={`px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 ${
                        nodePage === 0 ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      nextClassName=""
                      nextLinkClassName={`px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 ${
                        nodePage === nodeTotalPages - 1 ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      activeLinkClassName="bg-blue-600 text-white border-blue-600"
                      disabledClassName=""
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
                    <ReactPaginate
                      previousLabel="← Previous"
                      nextLabel="Next →"
                      breakLabel="..."
                      breakClassName="hidden" 
                      pageCount={dotnetTotalPages}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={handleDotnetPageChange}
                      containerClassName="flex space-x-2"
                      pageClassName=""
                      pageLinkClassName="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
                      previousClassName=""
                      previousLinkClassName={`px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 ${
                        dotnetPage === 0 ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      nextClassName=""
                      nextLinkClassName={`px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 ${
                        dotnetPage === dotnetTotalPages - 1 ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      activeLinkClassName="bg-blue-600 text-white border-blue-600"
                      disabledClassName=""
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
