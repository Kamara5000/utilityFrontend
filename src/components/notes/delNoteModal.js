import { motion } from 'framer-motion';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { useState } from 'react';

const DeleteNoteModal = ({ selectedNote, setSelectedNote, mainModal }) => {

  let [success, setSuccess] = useState(false);

  const closeModal = event => {
    if(event.keyCode === 27) setSelectedNote(false)
    if (event.currentTarget === event.target) setSelectedNote(false)
    if(event.keyCode === 27 || event.currentTarget === event.target) {
      setSelectedNote(false)
    }
  }
const history = useHistory();

  const no = ()=>{
    setSelectedNote(false)
  }
  
  const yes = ()=>{
    
    //alert(selectedContact._id)
    const {_id} = selectedNote;
      //console.log(_id)
                 axios({
                         method: "delete",
                        //  url: `http://localhost:5000/notes/delete/${_id}`,
                         url: `https://boiling-stream-11406.herokuapp.com/notes/delete/${_id}`,
                         headers: { 
                         'authorization': `Bearer ${localStorage.getItem('token')}`,
                         //'Content-Type': 'multipart/form-data'
                          }, 
                      })
 
                 .then(response=>{console.log(response.data); 

                    if(response.data.message === "success"){

                      setSuccess(true);
                    }
                    if(response.data.error === "jwt expired"){
                      history.push("/login");
                  }
                  }).catch(err=>console.log(err));
  }

  const goBack = ()=>{
    mainModal(null)
  }

   window.addEventListener('keydown', event => closeModal(event))
  return (
    <div className={style.overlay}>
      <div className={style.container} onClick={event => closeModal(event)}>
        {!success && <motion.div
          animate={{ scale: [0.7, 1.5, 1] }}
          exit={{ scale: 0 }}
          className={style.modal}
        >
          
          <div className={style.content}>
            <p className="font-medium">Are you sure you want to delete the note</p>
            <p className={style.title}>
                {selectedNote.title}
            </p>
          </div>
            <div className="flex flex-wrap justify-center items-center mt-4 border-t-2 pt-5">
                <button onClick={yes} className="text-xs mr-2 py-1.5 px-4 ransition animate-pulse text-gray-600 bg-blue-200 rounded-2xl">
                    Yes
                </button>
                <button onClick={no} className="text-xs mr-2 py-1.5 px-4 transition animate-bounce text-gray-600 bg-red-300 rounded-2xl">
                    No
                </button>
            </div>
        </motion.div>}
        {success && <motion.div
          animate={{ scale: [0.7, 1.5, 1] }}
          exit={{ scale: 0 }}
          className={style.modal}
        >
          
          <div className={style.content}>
            <p className="font-medium text-green-500">Note deleted succesfully!!!</p>
  
          </div>
            <div className="flex flex-wrap justify-center items-center mt-4 border-t-2 pt-5">
                <button onClick={goBack} className="text-xs mr-2 py-1.5 px-4 ransition animate-pulse text-gray-600 bg-blue-200 rounded-2xl">
                    Ok
                </button>
            </div>
        </motion.div>}
      </div>
    </div>
  )
}
const style = {
  overlay: 'fixed top-0  h-screen w-screen bg-black bg-opacity-10',
  container: 'flex h-screen',
  modal: 'm-auto bg-white  rounded-lg shadow-lg px-14 pt-5 pb-10',
  title: 'text-center mb-5 text-gray-700 font-semibold text-xl',
  content: 'grid md:grid-cols-2  text-gray-600 gap-x-0'
}
export default DeleteNoteModal