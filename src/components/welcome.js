
import { Link } from 'react-router-dom';

const Welcome=()=>{
    
    return (
          <div className="p-10 mt-10">
            <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-800">
             Welcome to your utility app
             </h2>
            <p className="text-center text-sm leading-5 text-gray-600">
              It's simple and easy
            </p>
            
            <form >
              <div className="mt-14 flex justify-center">
              <Link to="/signup" className="w-full flex justify-center">
                <button type="button"
                  className="group w-full lg:w-1/3 md:w-2/3 py-2 px-4 bg-gray-400  border border-transparent text-sm leading-5 font-medium 
                    rounded-md text-black bg-teal-500 hover:bg-teal-400 focus:outline-none focus:border-teal-400 
                    focus:shadow-outline-teal active:bg-teal-400 active:outline-none transition duration-150 ease-in-out"
                >
                  Sign Up
                </button>
                </Link>
              </div>
              <p className="text-center mt-2 text-base  leading-5 text-gray-600">
              Or
              </p>

              <div className="mt-2 flex justify-center">
              <Link to="/login" className="w-full flex justify-center">
                <button type="button"
                  className="group w-full lg:w-1/3 md:w-2/3 py-2 px-4 bg-gray-400  border border-transparent text-sm leading-5 font-medium 
                    rounded-md text-black bg-teal-500 hover:bg-teal-400 focus:outline-none focus:border-teal-400 
                    focus:shadow-outline-teal active:bg-teal-400 active:outline-none transition duration-150 ease-in-out"
                >
                    Sign In
                </button>
                </Link>
              </div>

            </form>
          </div>
      )
}
export default Welcome;