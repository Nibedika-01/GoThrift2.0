import React from 'react'
// import '../../assets/Images/nibeik'

const AboutUsLandingPage = () => {

  const profiles = [
    {
      name: 'Nibedika Gautam',
      position: 'Developer',
      img: '',
      gradient: 'from-rose-100 to-rose-400',
      textColor: 'text-rose-300',
    },
    {
      name: 'Krip Khatri',
      position: 'Developer',
      img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80',
      gradient: 'from-rose-100 to-rose-400',
      textColor: 'text-rose-300',
    },
    {
      name: 'Prajeena Bhlon',
      position: 'Developer',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80',
      gradient: 'from-rose-100 to-rose-400',
      textColor: 'text-rose-300',
    },
  ];

    return (
        <>
            <div id='aboutUs' className="flex flex-wrap justify-center gap-8  w-full mx-auto bg-[#f5f2eb]">
                {profiles.map(({ name, position, img, gradient, textColor }, i) => (
                    <div
                        key={i}
                        className="w-full sm:w-80 md:w-72 lg:w-64 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-center"
                    >
                        <div className={`h-32 bg-gradient-to-r ${gradient} relative`}>
                            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md mx-auto">
                                    <img src={img} alt={name} className="h-full w-full object-cover" />
                                </div>
                            </div>
                        </div>
                        <div className="pt-20 px-6 pb-6">
                            <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
                            <p className={`${textColor} font-medium`}>{position}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AboutUsLandingPage
