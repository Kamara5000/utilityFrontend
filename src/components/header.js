import { Link, useHistory, NavLink} from 'react-router-dom';
import {useState} from 'react';

const Header= ({username})=>{
     let [show, handleShow] = useState("hidden w-full  block flex-grow lg:flex   lg:items-center  lg:w-auto");
     let [toggle, setToggle] = useState(false);

     //console.log("header" + username)
    
    const setShow=()=>{
        setToggle(!toggle)

        if(toggle){
            handleShow("hidden w-full  block flex-grow lg:flex   lg:items-center  lg:w-auto")
        }

        if(!toggle){
            handleShow("w-full  block flex-grow lg:flex   lg:items-center  lg:w-auto");
        }
        
    }

 
    const history = useHistory();

    const signOut =()=>{
        localStorage.removeItem('token');
        history.push("/login");
    }
    
    return(
        <nav className=" flex items-center justify-between flex-wrap fixed top-0 w-full bg-gray-300 p-6">
            <div className="flex items-center flex-no-shrink text-white mr-6">
                <span className="fa fa-tools fa-3x"></span>
                <span className="ml-2 font-semibold text-xl tracking-tight">Utility App</span>
            </div>
            
            <div className="block lg:hidden">
                <button onClick={setShow} className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
                    <span className="fa fa-bars"></span>
                    
                </button>
            </div>
            
            <div className={show}>
                <div className="text-sm lg:flex-grow">
               
                <NavLink to={`/contact/${username}`}  activeClassName="active" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter transition duration-500 outline-none  hover:text-white mr-10">
                    Contacts
                </NavLink>
                <NavLink  to={`/notes/${username}`} activeClassName="active" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter transition duration-500 hover:text-white mr-10">
                     Notes
                </NavLink>
                <NavLink to={`/todo/${username}`} activeClassName="active" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter transition duration-500   hover:text-white">
                    Todo
                </NavLink>
                </div>
                <div>
                    <button onClick={signOut} className="inline-block font-semibold text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal outline-none  mt-4 lg:mt-0">Sign Out</button>
                </div>   
            </div>
        </nav>
    )
}

export default Header;