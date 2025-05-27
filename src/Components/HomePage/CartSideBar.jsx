// src/Components/HomePage/CartSideBar.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../CartContext';

const CartSideBar = ({ closeCart }) => {
  const { cart, removeFromCart } = useContext(CartContext);

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

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
                      Shopping Cart
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        onClick={closeCart}
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
                      {cart.length === 0 ? (
                        <p className="text-rose-500">Your cart is empty.</p>
                      ) : (
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cart.map((item) => (
                            <li key={item.id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="size-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-rose-700">
                                    <h3>{item.name}</h3>
                                    <p className="ml-4">${item.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-rose-500">{item.color}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-rose-500">Qty {item.quantity}</p>
                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={() => removeFromCart(item.id)}
                                      className="font-medium text-rose-600 hover:text-rose-500 cursor-pointer"
                                    >
                                      Remove
                                    </button>
                                  </div>
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
                  <div className="flex justify-between text-base font-medium text-rose-700">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-rose-500">Shipping is calculated at checkout.</p>
                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      className="flex items-center justify-center rounded-md border border-transparent bg-rose-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-rose-500"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-rose-500">
                    <p>
                      or{' '}
                      <button
                        onClick={closeCart}
                        className="font-medium text-rose-600 hover:text-rose-500"
                      >
                        Continue Shopping
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

export default CartSideBar;