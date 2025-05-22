import { Link } from "react-router-dom";

const AlsoPurchased = () => {
  return (
    <div className="bg-pink-50">
      <div className="mx-auto max-w-2xl mt-12 px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-rose-700">
          Recently added collection
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div className="group relative bg-white p-2 rounded-xl shadow hover:shadow-md transition">
            <img
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt="Front of men's Basic Tee in black."
              className="aspect-square w-full rounded-lg bg-rose-100 object-cover group-hover:opacity-80 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="text-sm text-rose-600 font-medium">
                  <Link to="/product/basic-tee">
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    Basic Tee
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-rose-400">Black</p>
              </div>
              <p className="text-sm font-semibold text-rose-500">$35</p>
            </div>
            
          </div>
          <div className="group relative bg-white p-2 rounded-xl shadow hover:shadow-md transition">
            <img
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt="Front of men's Basic Tee in black."
              className="aspect-square w-full rounded-lg bg-rose-100 object-cover group-hover:opacity-80 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="text-sm text-rose-600 font-medium">
                  <Link to="/product/basic-tee">
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    Basic Tee
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-rose-400">Black</p>
              </div>
              <p className="text-sm font-semibold text-rose-500">$35</p>
            </div>
            
          </div>
          <div className="group relative bg-white p-2 rounded-xl shadow hover:shadow-md transition">
            <img
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt="Front of men's Basic Tee in black."
              className="aspect-square w-full rounded-lg bg-rose-100 object-cover group-hover:opacity-80 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="text-sm text-rose-600 font-medium">
                  <Link to="/product/basic-tee">
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    Basic Tee
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-rose-400">Black</p>
              </div>
              <p className="text-sm font-semibold text-rose-500">$35</p>
            </div>
            
          </div>
          <div className="group relative bg-white p-2 rounded-xl shadow hover:shadow-md transition">
            <img
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt="Front of men's Basic Tee in black."
              className="aspect-square w-full rounded-lg bg-rose-100 object-cover group-hover:opacity-80 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="text-sm text-rose-600 font-medium">
                  <Link to="/product/basic-tee">
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    Basic Tee
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-rose-400">Black</p>
              </div>
              <p className="text-sm font-semibold text-rose-500">$35</p>
            </div>
            
          </div>
          <div className="group relative bg-white p-2 rounded-xl shadow hover:shadow-md transition">
            <img
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt="Front of men's Basic Tee in black."
              className="aspect-square w-full rounded-lg bg-rose-100 object-cover group-hover:opacity-80 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="text-sm text-rose-600 font-medium">
                  <Link to="/product/basic-tee">
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    Basic Tee
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-rose-400">Black</p>
              </div>
              <p className="text-sm font-semibold text-rose-500">$35</p>
            </div>
            
          </div>

          {/* You can copy and repeat the product card above for more items */}
        </div>
      </div>
    </div>
  );
};

export default AlsoPurchased;
