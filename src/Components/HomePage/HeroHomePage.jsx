import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../CartContext';
import NavHome from './NavHomePage';

const ProductsPage = () => {
  const { addToCart } = useContext(CartContext);
  const [recentSlideIndex, setRecentSlideIndex] = useState(0);
  const [topsSlideIndex, setTopsSlideIndex] = useState(0);
  const [bottomsSlideIndex, setBottomsSlideIndex] = useState(0);
  const [dressesSlideIndex, setDressesSlideIndex] = useState(0);
  const [accessoriesSlideIndex, setAccessoriesSlideIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [products, setProducts] = useState({
    recent: [],
    tops: [],
    bottoms: [],
    dresses: [],
    accessories: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clothing');
        const data = await response.json();
        const mappedData = data.map((item) => ({
          id: item._id,
          name: item.name,
          category: item.category,
          color: item.color,
          price: item.price,
          sizes: item.sizes,
          image: `http://localhost:5000${item.image}`,
        }));
        setProducts({
          recent : mappedData.slice(0, 5),
          tops: mappedData.filter((item) => item.category === 'Tops'),
          bottoms: mappedData.filter((item) => item.category === 'Bottoms'),
          dresses: mappedData.filter((item) => item.category === 'Dresses'),
          accessories: mappedData.filter((item) => item.category === 'Accessories'),
        });
      }
      catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const ProductCard = ({ product }) => (
    <div className="group relative bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <div className="relative">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full rounded-lg bg-rose-100 object-cover group-hover:opacity-80 lg:aspect-auto lg:h-80"
          />
        </Link>
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-rose-600 font-medium">
          <Link to={`/products/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-rose-400">{product.color}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-rose-500">Rs. {product.price}</p>
          <p className="text-sm text-rose-400">{product.sizes.join(', ')}</p>
        </div>
        <button
          onClick={() => handleAddToCart(product)}
          className="mt-3 w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  const ProductSlider = ({ products, slideIndex, setSlideIndex }) => {
    const productsPerSlide = 4;
    const maxIndex = Math.ceil(products.length / productsPerSlide) - 1;

    const handlePrev = () => {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : maxIndex);
    };

    const handleNext = () => {
      setSlideIndex(slideIndex < maxIndex ? slideIndex + 1 : 0);
    };

    const startIndex = slideIndex * productsPerSlide;
    const visibleProducts = products.slice(startIndex, startIndex + productsPerSlide);

    return (
      <div className="relative">
      {products.length === 0 ? (
        <p className="mt-6 text-rose-500 text-center">No items available in this category</p>
      ):(
        <>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePrev}
            className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition disabled:opacity-50"
            disabled={products.length <= productsPerSlide}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition disabled:opacity-50"
            disabled={products.length <= productsPerSlide}
          >
            Next
          </button>
        </div>
        </>
      )
      }
      </div>
    );
  };

  return (
    <div className="bg-pink-50 min-h-screen pt-16">
      <NavHome />
      {/* Message Display */}
      {showMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-300 text-black px-4 py-2 z-50 rounded-md shadow-lg transition-opacity duration-300">
          Added to cart successfully!
        </div>
      )}
      <div id="recent" className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-rose-700">Recently Added Collection</h2>
        <ProductSlider
          products={products.recent}
          slideIndex={recentSlideIndex}
          setSlideIndex={setRecentSlideIndex}
        />
      </div>
      <div id="tops" className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-rose-700">Tops</h2>
        <ProductSlider
          products={products.tops}
          slideIndex={topsSlideIndex}
          setSlideIndex={setTopsSlideIndex}
        />
      </div>
      <div id="bottoms" className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-rose-700">Bottoms</h2>
        <ProductSlider
          products={products.bottoms}
          slideIndex={bottomsSlideIndex}
          setSlideIndex={setBottomsSlideIndex}
        />
      </div>
      <div id="dresses" className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-rose-700">Dresses</h2>
        <ProductSlider
          products={products.dresses}
          slideIndex={dressesSlideIndex}
          setSlideIndex={setDressesSlideIndex}
        />
      </div>
      <div id="accessories" className="mx-auto max-w-2xl px-4 py-16 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-rose-700">Accessories</h2>
        <ProductSlider
          products={products.accessories}
          slideIndex={accessoriesSlideIndex}
          setSlideIndex={setAccessoriesSlideIndex}
        />
      </div>
    </div>
  );
};

export default ProductsPage;