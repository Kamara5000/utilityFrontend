import { motion } from 'framer-motion';
import {useHistory } from  'react-router-dom';
import axios from 'axios';


const RegisterModal = ({changeReg,}) => {
    const history = useHistory();

    //close modal and route to login page
  const closeModal = event => {
    if(event.keyCode === 27) {
        changeReg(false);
        history.push('/login')
    }
    if (event.currentTarget === event.target) {
        changeReg(false);
        history.push('/login')
    }
    if(event.keyCode === 27 || event.currentTarget === event.target) {
        changeReg(false);
        history.push('/login')
    }
   
  }

  

   window.addEventListener('keydown', event => closeModal(event));
  return (
    <div className={style.overlay}>
      <div className={style.container} onClick={event => closeModal(event)}>
        <motion.div
          animate={{ scale: [0.7,2,1] }}
          exit={{ scale: 0 }}
          className={style.modal}
        >
          <p className={style.title}>
            Account Created Successfully
          </p>
          <div className={style.content}>
            <button type="submit"
                  className="group w-full lg:w-1/3 md:w-2/3 py-2 px-4 bg-yellow-200  border border-transparent text-sm leading-5 font-medium 
                    rounded-md text-black bg-teal-500 hover:bg-teal-400 focus:outline-none focus:border-teal-400 
                    focus:shadow-outline-teal active:bg-teal-400 active:outline-none transition duration-150 ease-in-out"
                    onClick={closeModal}
                >
                  Click to Sign In
                </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
const style = {
  overlay: 'fixed top-0  h-screen w-screen bg-black bg-opacity-10',
  container: 'flex h-screen',
  modal: 'mx-auto mt-20 h-80 bg-white rounded-lg shadow-lg px-14 pt-5 pb-10',
  title: "text-center text-3xl leading-9 font-extrabold text-green-300",
  content: 'flex justify-center mt-20  text-gray-600 gap-x-0'
}
export default RegisterModal