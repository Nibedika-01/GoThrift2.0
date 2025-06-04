import { useState, useContext } from 'react';
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
  const [showMessage, setShowMessage] = useState(false); // New state for message visibility

  const products = {
    recent: [
      { id: 1, name: 'Vintage Graphic Tee', category: 'Tops', color: 'Black', price: 25, sizes: ['S', 'M', 'L'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg' },
      { id: 2, name: 'Denim Jacket', category: 'Tops', color: 'Blue', price: 45, sizes: ['M', 'L', 'XL'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg' },
      { id: 3, name: 'High-Waisted Jeans', category: 'Bottoms', color: 'Dark Wash', price: 35, sizes: ['28', '30', '32'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg' },
      { id: 4, name: 'Floral Maxi Dress', category: 'Dresses', color: 'Multicolor', price: 50, sizes: ['S', 'M'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg' },
      { id: 10, name: 'Scarf', category: 'Accessories', color: 'Red', price: 12, sizes: ['One Size'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg' },
    ],
    tops: [
      { id: 5, name: 'Cotton Blouse', color: 'White', price: 20, sizes: ['S', 'M', 'L'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg' },
      { id: 6, name: 'Sweatshirt', color: 'Gray', price: 30, sizes: ['M', 'L', 'XL'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg' },
      { id: 11, name: 'Flannel Shirt', color: 'Plaid', price: 28, sizes: ['S', 'M', 'L'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg' },
    ],
    bottoms: [
      { id: 7, name: 'Chinos', color: 'Khaki', price: 28, sizes: ['30', '32', '34'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg' },
      { id: 12, name: 'Cargo Pants', color: 'Green', price: 32, sizes: ['30', '32'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg' },
    ],
    dresses: [
      { id: 8, name: 'Summer Sundress', color: 'Yellow', price: 40, sizes: ['S', 'M'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg' },
      { id: 13, name: 'Cocktail Dress', color: 'Black', price: 55, sizes: ['S', 'M', 'L'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg' },
    ],
    accessories: [
      { id: 9, name: 'Leather Belt', color: 'Brown', price: 15, sizes: ['M', 'L'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg' },
      { id: 14, name: 'Sunglasses', color: 'Black', price: 18, sizes: ['One Size'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg' },
    ],
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowMessage(true); // Show the message
    setTimeout(() => setShowMessage(false), 2000); // Hide after 2 seconds
  };

  const ProductCard = ({ product }) => (
    <div className="group relative bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full rounded-lg bg-rose-100 object-cover group-hover:opacity-80 lg:aspect-auto lg:h-80"
          />
        </Link>
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-rose-600 font-medium">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-rose-400">{product.color}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-rose-500">${product.price}</p>
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
      </div>
    );
  };

  return (
    <div className="bg-pink-50 min-h-screen pt-16">
      <NavHome />
      {/* Message Display */}
      {showMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-300 text-black px-4 py-2 z-1 rounded-md shadow-lg transition-opacity duration-300">
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