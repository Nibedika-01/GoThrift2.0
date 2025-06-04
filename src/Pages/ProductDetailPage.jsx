import { useParams, useLocation, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import CartContext from '../CartContext';
import Navbar from '../Components/HomePage/NavHomePage';

const ProductDetailPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { state } = useLocation(); // Get product data passed via Link state
  const { addToCart } = useContext(CartContext);
   const [showMessage, setShowMessage] = useState(false);

  // Static product data (temporary until backend integration)
  const products = {
    1: { id: 1, name: 'Vintage Graphic Tee', category: 'Tops', color: 'Black', price: 25, sizes: ['S', 'M', 'L'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg' },
    2: { id: 2, name: 'Denim Jacket', category: 'Tops', color: 'Blue', price: 45, sizes: ['M', 'L', 'XL'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg' },
    3: { id: 3, name: 'High-Waisted Jeans', category: 'Bottoms', color: 'Dark Wash', price: 35, sizes: ['28', '30', '32'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg' },
    4: { id: 4, name: 'Floral Maxi Dress', category: 'Dresses', color: 'Multicolor', price: 50, sizes: ['S', 'M'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg' },
    5: { id: 5, name: 'Cotton Blouse', color: 'White', price: 20, sizes: ['S', 'M', 'L'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg' },
    6: { id: 6, name: 'Sweatshirt', color: 'Gray', price: 30, sizes: ['M', 'L', 'XL'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg' },
    7: { id: 7, name: 'Chinos', color: 'Khaki', price: 28, sizes: ['30', '32', '34'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg' },
    8: { id: 8, name: 'Summer Sundress', color: 'Yellow', price: 40, sizes: ['S', 'M'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg' },
    9: { id: 9, name: 'Leather Belt', color: 'Brown', price: 15, sizes: ['M', 'L'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg' },
    10: { id: 10, name: 'Scarf', category: 'Accessories', color: 'Red', price: 12, sizes: ['One Size'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg' },
    11: { id: 11, name: 'Flannel Shirt', color: 'Plaid', price: 28, sizes: ['S', 'M', 'L'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg' },
    12: { id: 12, name: 'Cargo Pants', color: 'Green', price: 32, sizes: ['30', '32'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg' },
    13: { id: 13, name: 'Cocktail Dress', color: 'Black', price: 55, sizes: ['S', 'M', 'L'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg' },
    14: { id: 14, name: 'Sunglasses', color: 'Black', price: 18, sizes: ['One Size'], image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg' },
  };

  const product = products[id]; // Look up the product by ID

  if (!product) {
    return (
      <div className="bg-pink-50 min-h-screen pt-16 text-center">
        <h1 className="text-2xl font-bold text-rose-700 mt-10">Product Not Found</h1>
        <Link to="/home" className="mt-4 inline-block text-rose-600 hover:text-rose-500">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setShowMessage(true); // Show the message
    setTimeout(() => setShowMessage(false), 2000); 
  };

  return (
    <>
    <Navbar/>
    {showMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-300 text-black px-4 py-2 z-1 rounded-md shadow-lg transition-opacity duration-300">
          Added to cart successfully!
        </div>
      )}
    <div className="bg-pink-50 min-h-screen pt-16">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <Link to="/home" className="text-rose-600 hover:text-rose-500 mb-6 inline-block">
          ← Back to Products
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[500px] rounded-lg bg-rose-100 object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-rose-700">{product.name}</h1>
            <p className="mt-2 text-lg text-rose-500">{product.category}</p>
            <p className="mt-2 text-sm text-rose-400">{product.color}</p>
            <p className="mt-4 text-2xl font-semibold text-rose-600">${product.price}</p>
            <div className="mt-4 flex">
              <h3 className="text-sm font-medium text-rose-700">Size:</h3>
              <p className="text-sm text-rose-400">{product.sizes.join(', ')}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-6 w-full bg-rose-500 text-white py-3 rounded-md hover:bg-rose-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetailPage;