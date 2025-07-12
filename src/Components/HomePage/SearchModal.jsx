import { useState, useEffect, useContext, useRef } from "react";
import { Link } from 'react-router-dom';
import CartContext from '../../CartContext';

const SearchModal = ({ isOpen, onClose, initialQuery = '', onQueryChange }) => {
  const { addToCart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const timeoutRef = useRef(null);

  const API_URL = 'http://localhost:5000';

  // Update search query when initialQuery changes
  useEffect(() => {
    setSearchQuery(initialQuery);
    if (isOpen && initialQuery.trim()) {
      performSearch(initialQuery);
    }
  }, [isOpen, initialQuery]);

  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSearchResults([]);
      setLoading(false);
      if (onQueryChange) {
        onQueryChange('');
      }
    }
  }, [isOpen, onQueryChange]);

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.products.map(item => ({
          ...item,
          image: `${API_URL}${item.image}`
        })));
      }
    } catch (error) {
      console.error("Search error", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Update the navbar search input
    if (onQueryChange) {
      onQueryChange(query);
    }

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounced search
    timeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, 300);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const handleProductClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-pink-50 z-[99999] overflow-y-auto">
      {/* Success Message */}
      {showMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-300 text-black px-4 py-2 z-[10000] rounded-md shadow-lg transition-opacity duration-300">
          Added to cart successfully!
        </div>
      )}

      <div className="px-4 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-rose-200">
          <h2 className="text-xl font-bold text-rose-700">Search Products</h2>
          <button
            onClick={onClose}
            className="text-rose-500 hover:text-rose-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-rose-100">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for clothing items..."
            className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
            autoFocus
          />
        </div>

        {/* Search Results */}
        <div className="p-6 lg:max-w-7xl mx-auto">
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-rose-500"></div>
              <p className="mt-2 text-rose-600">Searching...</p>
            </div>
          )}

          {!loading && searchQuery && searchResults.length === 0 && (
            <div className="text-center py-8">
              <p className="text-rose-600">No products found for "{searchQuery}"</p>
            </div>
          )}

          {!loading && searchQuery === '' && (
            <div className="text-center py-8">
              <p className="text-rose-600">Start typing to search for products...</p>
            </div>
          )}

          {!loading && searchResults.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {searchResults.map((product) => (
                <div key={product.id} className="group relative bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                  <Link to={`/product/${product.id}`} onClick={handleProductClick}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-square w-full rounded-lg bg-rose-100 object-contain group-hover:opacity-80 lg:aspect-auto lg:h-80"
                    />
                  </Link>
                  <div className="mt-4">
                    <h3 className="text-sm text-rose-600 font-medium">
                      <Link to={`/product/${product.id}`} onClick={handleProductClick}>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-rose-400">{product.color}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-semibold text-rose-500">${product.price}</p>
                      <p className="text-sm text-rose-400">{product.category}</p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-3 w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

              ))}
            </div>
          )}

          {searchResults.length > 8 && (
            <div className="text-center mt-4 pt-4 border-t border-rose-100">
              <p className="text-rose-600 text-sm">
                Showing first 8 results. Try refining your search for more specific results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;