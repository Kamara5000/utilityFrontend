import { Link } from 'react-router-dom';
const Footer= ()=>{

    const d = new Date();
    const year = d.getFullYear();


    return(
        
    <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
            <div className="px-5 py-2">
                <Link to="#" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                    About
                </Link>
            </div>
            <div className="px-5 py-2">
                <Link to="/blog" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                   Blog
                </Link>
            </div>
            <div className="px-5 py-2">
                <Link to="/team" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                    Team
                </Link>
            </div>
            <div className="px-5 py-2">
                <Link to="/pricing" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                    Pricing
                </Link>
            </div>
            <div className="px-5 py-2">
                <Link to="/contact" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                    Contact
                </Link>
            </div>
            <div className="px-5 py-2">
                 <Link to="/terms" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                   Terms
                </Link>
            </div>
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 text-xl  hover:text-gray-500">
                <span className="fab fa-facebook"></span>
                
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 text-xl  hover:text-gray-500">
                <span className="fab fa-instagram"></span>
                
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer"  className="text-gray-400 text-xl  hover:text-gray-500">
                <span className="fab fa-twitter"></span>
                
            </a>
            <a href="https://www.github.com" target="_blank"  rel="noreferrer" className="text-gray-400 text-xl  hover:text-gray-500">
                <span className="fab fa-github"></span>
                
            </a>
            
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
            © {year} Utility App, Inc. All rights reserved.
        </p>
    </div>
    )
}

export default Footer;