import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import RegisterModal from './registerModal';
import {useHistory } from  'react-router-dom';

const Reg=(props)=>{

  const history = useHistory();
    let [mail, setMail] = useState(null);
    let [pass, setPass]= useState(null);
    let [reg, changeReg] = useState(false);
    let [password, handlePassword] = useState('password');
    let [show, handleShow] =useState(false);
    let [eye, handleEye] = useState('fa fa-eye');
    let [exist, handleExist] = useState(false);
        
       const handleSet=(event)=>{
            let checkMail= event.target.name==="email";
            let checkPass = event.target.name ==="password";
           
             if (checkMail) {
                setMail(event.target.value);
            }else if(checkPass){
                setPass(event.target.value);
            }
        }

        const handleSubmit=(e)=>{
           e.preventDefault();
            let m= {email:mail,  password:pass};
              console.log(m)
                        axios({
                                method: "post",
                                url: "http://localhost:5000/register",
                                data: m,
                                // headers: { 
                                // 'Content-Type': 'multipart/form-data'
                                //  }, 
                             })
        
                        .then(response=>{console.log(response.data); 
                            if (response.data.message === "success") {
                              changeReg(!reg)
                            }
                            
                            if (response.data.message === "user exist") {
                              handleExist(true)
                            }
                            
                         }).catch(err=>console.log(err));
        };

    

    const setVisible = ()=>{
      handleShow(!show)
      if(show){
        handlePassword('text');
        handleEye('fa fa-eye-slash')
      }if(!show){
        handlePassword('password');
        handleEye('fa fa-eye')
      }
    }
      
        
    
    return (
      <React.Fragment>
          <div className="p-10 mt-10">
            <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-800">
              Create your account
            </h2>
            <p className="text-center text-sm leading-5 text-gray-600">
              Or
              <span className="text-gray-400 mx-2">
                <Link to="/login">Sign In</Link>
              </span>
              It's simple and easy
            </p>
            
            <form onSubmit={handleSubmit} className="fom mt-14">
              <div className="flex justify-center">
                <div className="lg:w-1/3 md:w-2/3 w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input   required type="email" name="email" id="email" placeholder="example@gmail.com"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                      py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                    onChange={handleSet}
                  />
                </div>
              </div>
    
              <div className="flex justify-center mt-4">
                <div className="lg:w-1/3 md:w-2/3 w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                    Password
                  </label>  
                  <div className="relative mb-2">
                    <input  type={password} name="password" id="password" placeholder="*********" required
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                      py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                      onChange={handleSet}
                    />
                   <button type="button" className="block text-gray-400 absolute right-2 top-2" onClick={setVisible}><span className={eye}></span></button>
                  </div>
                  {exist && <p className="text-sm text-red-400 ">user with this email already exist</p>}
                </div>
              </div>
              
              
              <div className="mt-4 flex justify-center">
                <button type="submit"
                  className="group w-full lg:w-1/3 md:w-2/3 py-2 px-4 bg-gray-400  border border-transparent text-sm leading-5 font-medium 
                    rounded-md text-black bg-teal-500 hover:bg-teal-400 focus:outline-none focus:border-teal-400 
                    focus:shadow-outline-teal active:bg-teal-400 active:outline-none transition duration-150 ease-in-out"
                  //onSubmit={handleSubmit}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>

          <AnimatePresence>
          {reg &&
          <RegisterModal changeReg={changeReg} />
          }
          </AnimatePresence>
      </React.Fragment>
      )
}
export default Reg;