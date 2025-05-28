const OrderHistory = ({ closeOrderHistory }) => {
  const orderData = [
    {
      orderId: "ORD12345",
      date: "2025-05-15",
      total: 75.50,
      status: "Delivered"
    },
    {
      orderId: "ORD12346",
      date: "2025-04-22",
      total: 45.00,
      status: "Shipped"
    },
    {
      orderId: "ORD12347",
      date: "2025-03-10",
      total: 120.25,
      status: "Processing"
    }
  ];

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

                  <div className="mt-8">
                    <div className="flow-root">
                      {orderData.length === 0 ? (
                        <p className="text-rose-500">No orders found.</p>
                      ) : (
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {orderData.map((order) => (
                            <li key={order.orderId} className="flex py-6">
                              <div className="flex-1 flex flex-col">
                                <div className="flex justify-between text-base font-medium text-rose-700">
                                  <h3>Order #{order.orderId}</h3>
                                </div>
                                <p className="mt-1 text-sm text-rose-500">Date: {order.date}</p>
                                <p className="mt-1 text-sm text-rose-500">Total: ${order.total.toFixed(2)}</p>
                                <p className="mt-1 text-sm text-rose-500">Status: {order.status}</p>
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

export default OrderHistory;