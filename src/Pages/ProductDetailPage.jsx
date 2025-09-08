import { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CartContext from '../CartContext';
import NavHome from '../Components/HomePage/NavHomePage';


const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('No product ID provided in URL');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/clothing/${id}`);
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }
        const data = await response.json();
        const mappedProduct = {
          id: data._id,
          name: data.name,
          category: data.category,
          color: data.color,
          price: data.price,
          sizes: data.sizes,
          image: `http://localhost:5000${data.image}`,
          description: data.description || "Beautiful and comfortable clothing piece that perfectly fits your style. Made with high-quality materials and designed for everyday wear.",
        };
        setProduct(mappedProduct);
        setSelectedSize(mappedProduct.sizes[0] || '');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message || 'Product not found');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    const productWithDetails = {
      ...product,
      selectedSize,
      quantity,
    };

    addToCart(productWithDetails);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  if (loading) {
    return (
      <div className="bg-pink-50 min-h-screen pt-16">
        <NavHome />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-pink-50 min-h-screen pt-16">
        <NavHome />
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="text-rose-600 text-xl mb-4">Product not found</div>
          <button
            onClick={() => navigate('/home')}
            className="bg-rose-500 text-white px-6 py-2 rounded-md hover:bg-rose-600 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pink-50 min-h-screen pt-16">
      <NavHome />

      {/* Message Display */}
      {showMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-300 text-black px-4 py-2 z-50 rounded-md shadow-lg transition-opacity duration-300">
          Added to cart successfully!
        </div>
      )}

      {/* Product Details */}
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image Gallery */}
          <div className="flex flex-col">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-rose-700">{product.name}</h1>

            <div className="mt-3">
              <p className="text-3xl tracking-tight text-rose-600">Rs. {product.price}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-rose-600">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-6">
              <div className="flex items-center space-x-6">
                <div>
                  <span className="text-sm font-medium text-rose-700">Category:</span>
                  <span className="ml-2 text-sm text-rose-600">{product.category}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-rose-700">Color:</span>
                  <span className="ml-2 text-sm text-rose-600">{product.color}</span>
                </div>
              </div>
            </div>

            <form className="mt-6">
              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-medium text-rose-700">Size</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition ${selectedSize === size
                          ? 'bg-rose-500 text-white'
                          : 'bg-white text-rose-600 border border-rose-300 hover:bg-rose-50'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-rose-700">Quantity</h3>
                <div className="mt-2 flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-rose-700">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-8 flex space-x-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-rose-500 text-white py-3 px-8 rounded-md hover:bg-rose-600 transition font-medium"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/home')}
                  className="px-8 py-3 border border-rose-300 text-rose-600 rounded-md hover:bg-rose-50 transition font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;