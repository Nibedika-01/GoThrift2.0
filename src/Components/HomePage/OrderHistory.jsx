import { useState, useEffect } from 'react';

const OrderHistory = ({ closeOrderHistory, userId }) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch orders from database
  const token = localStorage.getItem('userToken');
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/orders/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
        }

        const orders = await response.json();
        console.log('Orders response:', JSON.stringify(orders, null, 2));
        setOrderData(orders);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    } else {
      setLoading(false);
      console.warn('No userId provided, skipping fetch.');
    }
  }, [userId, token]);

  // Function to remove an order from the UI only
  const deleteOrder = (orderId) => {
    console.log('Removing order from history:', orderId); // Debug orderId

    try {
      // Update state to remove the order from UI
      setOrderData(prevOrders => prevOrders.filter(order => order._id !== orderId));
      setMessage({ type: 'success', text: 'Order removed from history' });
      console.log('Order removed from history:', orderId);

      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: `Failed to remove order: ${err.message}` });
      console.error('Error removing order:', err);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-bold text-rose-700" id="slide-over-title">
                        Order History
                      </h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          onClick={closeOrderHistory}
                          type="button"
                          className="relative -m-2 p-2 text-rose-400 hover:text-rose-500 cursor-pointer"
                        >
                          <span className="absolute -inset-0.5"></span>
                          <span className="sr-only">Close panel</span>
                          <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-700"></div>
                      <span className="ml-2 text-rose-600">Loading orders...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            {/* Slide-over panel */}
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-bold text-rose-700" id="slide-over-title">
                      Order History
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        onClick={closeOrderHistory}
                        type="button"
                        className="relative -m-2 p-2 text-rose-400 hover:text-rose-500 cursor-pointer"
                      >
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Close panel</span>
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Message Display */}
                  {message && (
                    <div className={`mt-4 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  )}

                  <div className="mt-8">
                    <div className="flow-root">
                      {error ? (
                        <div className="text-center py-12">
                          <div className="mx-auto h-12 w-12 text-rose-400">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                          </div>
                          <h3 className="mt-2 text-sm font-medium text-rose-700">Error loading orders</h3>
                          <p className="mt-1 text-sm text-rose-500">{error}</p>
                        </div>
                      ) : orderData.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="mx-auto h-12 w-12 text-rose-400">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                          </div>
                          <h3 className="mt-2 text-sm font-medium text-rose-700">No orders placed for now</h3>
                          <p className="mt-1 text-sm text-rose-500">You haven't made any orders yet. Start shopping to see your order history here!</p>
                        </div>
                      ) : (
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {orderData.map((order) => (
                            <li key={order._id} className="flex py-6">
                              {/* Product Images */}
                              <div className="flex-shrink-0 mr-4">
                                <div className={`grid gap-2 ${order.items.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} max-w-[128px]`}>
                                  {order.items.map((item, index) => {
                                    const imageUrl = item?.product?.image;
                                    console.log(`Item ${index} image data:`, { item, imageUrl });

                                    const fullImageUrl = imageUrl
                                      ? imageUrl.startsWith('http')
                                        ? imageUrl
                                        : `http://localhost:5000${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
                                      : null;
                                    console.log(`Item ${index} fullImageUrl:`, fullImageUrl);

                                    const imageSize = order.items.length > 1 ? 'h-12 w-12' : 'h-16 w-16';

                                    return (
                                      <div key={index} className={`${imageSize} flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 relative`}>
                                        {fullImageUrl ? (
                                          <img
                                            src={fullImageUrl}
                                            alt={item?.product?.name || item?.name || item?.productName || 'Product'}
                                            className="h-full w-full object-cover object-center"
                                            onError={(e) => {
                                              console.error(`Image failed to load for item ${index}:`, fullImageUrl);
                                              e.target.style.display = 'none';
                                              e.target.nextSibling.style.display = 'flex';
                                            }}
                                            onLoad={() => {
                                              console.log(`Image loaded successfully for item ${index}:`, fullImageUrl);
                                            }}
                                          />
                                        ) : (
                                          <div className="h-full w-full bg-rose-50 flex items-center justify-center">
                                            <span className="text-xs text-rose-500">No Image</span>
                                          </div>
                                        )}
                                        {/* Fallback placeholder */}
                                        <div className="h-full w-full bg-rose-50 flex items-center justify-center absolute top-0 left-0" style={{ display: fullImageUrl ? 'none' : 'flex' }}>
                                          <svg className="h-8 w-8 text-rose-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                          </svg>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="flex-1 flex">
                                {/* Order Details */}
                                <div className="flex-1 flex flex-col">
                                  <div className="flex justify-between text-base font-medium text-rose-700">
                                    <h3>
                                      {order.items && order.items.length > 0 ?
                                        order.items[0].name || order.items[0].productName || 'Order' :
                                        'Order'
                                      }
                                      {order.items && order.items.length > 1 &&
                                        <span className="text-sm font-normal text-rose-500">
                                          {` +${order.items.length - 1} more items`}
                                        </span>
                                      }
                                    </h3>
                                  </div>
                                  <p className="mt-1 text-sm text-rose-500">
                                    Date: {new Date(order.date || order.createdAt).toLocaleDateString()}
                                  </p>
                                  <p className="mt-1 text-sm text-rose-500">
                                    Total: Rs.{" "}
                                    {order.items
                                      ? order.items.reduce((sum, item) => sum + (item.totalAmount || 0), 0)
                                      : "00"}
                                  </p>
                                  <p className="mt-1 text-sm text-rose-500">
                                    Status: <span className={`font-medium ${getStatusColor(order.status)}`}>
                                      {order.status || 'Unknown'}
                                    </span>
                                  </p>
                                  {order.items && order.items.length > 0 && (
                                    <div className="mt-2">
                                      <p className="text-xs text-rose-400">Items: {order.items.length}</p>
                                      <div className="mt-1 flex flex-wrap gap-1">
                                        {order.items.slice(0, 3).map((item, index) => (
                                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700">
                                            {item.product?.name || item.name || item.productName || 'Product'} {item.quantity > 1 && `(${item.quantity})`}
                                          </span>
                                        ))}
                                        {order.items.length > 3 && (
                                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700">
                                            +{order.items.length - 3} more
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {/* Remove Button */}
                                <div className="flex items-start ml-4">
                                  <button
                                    onClick={() => deleteOrder(order._id)}
                                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="mt-6 flex justify-center text-center text-sm text-rose-500">
                    <p>
                      <button
                        onClick={closeOrderHistory}
                        className="font-medium text-rose-600 hover:text-rose-500"
                      >
                        Back to Profile
                        <span aria-hidden="true"> →</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine status color
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'delivered':
      return 'text-green-600';
    case 'shipped':
      return 'text-blue-600';
    case 'processing':
      return 'text-yellow-600';
    case 'cancelled':
      return 'text-red-600';
    default:
      return 'text-rose-600';
  }
};

export default OrderHistory;