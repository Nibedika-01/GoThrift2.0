import React from 'react'
import nibedika from '../../assets/Images/nibedika.png'
import kripa from '../../assets/Images/kripa.png'
import prajeena from '../../assets/Images/prajeena.png'

const AboutUsLandingPage = () => {

    const profiles = [
        {
            name: 'Nibedika Gautam',
            position: 'Developer',
            img: nibedika,
            gradient: 'from-rose-100 to-rose-400',
            textColor: 'text-rose-300',
        },
        {
            name: 'Kripa Khatri',
            position: 'Developer',
            img: kripa,
            gradient: 'from-rose-100 to-rose-400',
            textColor: 'text-rose-300',
        },
        {
            name: 'Prajeena Bhlon',
            position: 'Developer',
            img: prajeena,
            gradient: 'from-rose-100 to-rose-400',
            textColor: 'text-rose-300',
        },
    ];

    return (
        <>
            <div id='aboutUs' className= "w-full mx-auto bg-[#f5f2eb] px-4 space-y-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-rose-700">
                        About Us
                    </h2>
                    <p className="max-w-[85%] leading-normal text-rose-700 sm:text-lg sm:leading-7">
                        About our developers.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-8 ">
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
            </div>
        </>
    )
}

export default AboutUsLandingPage
