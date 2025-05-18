import React from "react";

const HeroSection = () => {
  return (
    <div className="relative mt-20 flex flex-col items-center mx-auto lg:flex-row-reverse lg:max-w-5xl xl:max-w-6xl">
      {/* Image Section */}
      <div className="w-full h-64 lg:w-1/2 lg:h-auto rounded-lg overflow-hidden shadow-lg">
        <img
          className="h-full w-full object-cover"
          src="https://picsum.photos/id/1018/2000"
          alt="Stylish thrift fashion"
        />
      </div>

      {/* Text Content */}
      <div className="max-w-lg bg-gradient-to-br from-rose-100 via-rose-50 to-rose-200 md:max-w-2xl md:z-10 md:shadow-2xl md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12 rounded-3xl border border-rose-300">
        <div className="flex flex-col p-8 md:px-12">
          <h2 className="text-3xl font-logo font-extrabold text-rose-700 uppercase lg:text-5xl tracking-wide drop-shadow-md">
            Thrift With Style
          </h2>
          <p className="mt-4 font-body text-rose-800 text-sm lg:text-base leading-relaxed">
            Discover affordable fashion treasures that don't cost the earth. Our curated thrift collection is perfect for
            fashionistas who love style <em>and</em> sustainability.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="inline-block w-full text-center text-lg font-body font-semibold text-white bg-rose-500 border-2 border-rose-600 py-3 px-8 hover:bg-rose-600 hover:shadow-lg transition-all duration-300 md:w-48 rounded-full shadow-md"
            >
              Visit Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
