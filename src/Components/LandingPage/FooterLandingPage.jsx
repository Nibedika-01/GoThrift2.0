import React from 'react'

const FooterLandingPage = () => {
  return (
    <>
    <footer id='footer' className="flex flex-col space-y-10 justify-center bg-[#f5f2eb] p-30">

    <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
        <a className="hover:text-gray-900" href="#">Home</a>
        <a className="hover:text-gray-900" href="#features">Features</a>
        <a className="hover:text-gray-900" href="#aboutUs">About Us</a>
        <a className="hover:text-gray-900" href="#contact">Contact</a>
    </nav>

    <div className="flex justify-center space-x-5">
        <a href="https://www.facebook.com/nibe.ika.gautam" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
        </a>
        <a href="https://www.linkedin.com/in/nibedika-gautam-a73929356/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
        </a>
        <a href="https://www.instagram.com/nibedik_a/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
        </a>
    </div>
    <p className="text-center text-gray-700 font-medium">&copy; 2022 Company Ltd. All rights reservered.</p>
</footer>
    </>
  )
}

export default FooterLandingPage
