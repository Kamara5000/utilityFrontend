import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const EditNoteModal = ({note, noteSelected, editNote}) => {
    let [title,setTitle] = useState("");
    let [body, setBody] = useState("");

    let [success, setSuccess] = useState(false);

    const history =useHistory();

   const closem=()=>{
        //editNote(false);
        noteSelected(false);
    }

  
  useEffect(()=>{
    setTitle(note.title);
    setBody(note.body);
  },[])  

  

  const handleSet=(event)=>{
    let checkTitle= event.target.name==="title";
    let checkBody= event.target.name==="body";
    
     if (checkTitle) {
        setTitle(event.target.value);
    }else if(checkBody){
        setBody(event.target.value);
    }
}

  const handleSubmit=(e)=>{
    e.preventDefault();

    
    const id = note._id;
    //console.log(username);
    

     let m= {title,body};

    console.log(m)
       
                 axios({
                         method: "patch",
                         url: `http://localhost:5000/notes/edit/${id}`,
                         data: m,
                         headers: { 
                         'authorization': `Bearer ${localStorage.getItem('token')}`,
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



  return (
    
    <>
       <div className={style.overlay}>
      <div className={style.container}>
        <motion.div
          animate={{ scale: [0.7, 1.5, 1] }}
          exit={{ scale: 0 }}
          className={style.modal}
        >
           {!success && <div className="">
                <div className="flex  justify-between flex-wrap ">
                <h2 className={style.title}>
                        Edit Note
                </h2>

                <button type="button"  onClick={closem}>
                    <span className="far fa-window-close text-xl justify-end self-end"></span>
                </button>
                
                </div>
            
                <form onSubmit={handleSubmit} className={style.content}>
                <div className="w-full mb-2 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <textarea   required type="text" value={title} name="title" id="title" placeholder="Title"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                      py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                      onChange={handleSet}
                  />
                </div>
           
                <div className="w-full mb-2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="body">
                    Body
                  </label>
                  <textarea   required type="text" value ={body} name="body" id="body" 
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                      py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                      onChange={handleSet}
                  />
              </div>
              <div className="mt-4 flex justify-center items-center">
                <button type="submit"
                  className="group w-full h-10 md:w-2/3 py-2 px-4 bg-gray-400  border border-transparent text-sm font-medium 
                    rounded-md text-black bg-teal-500 hover:bg-teal-400 focus:outline-none focus:border-teal-400 
                    focus:shadow-outline-teal active:bg-teal-400 active:outline-none transition duration-150 ease-in-out"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        }
        {success &&
            <div>
                <p className="font-medium text-green-500">Note Edited succesfully !!!</p>
                <div className="flex flex-wrap justify-center items-center mt-4 pt-5">
                <button onClick={closem} className="text-xs mr-2 py-1.5 px-4 ransition animate-pulse text-gray-600 bg-blue-200 rounded-2xl">
                    Ok
                </button>
        
            </div>
            </div>
        }
        </motion.div>
      </div>
    </div>
    
    </>    
  )
}
const style = {
    overlay: 'fixed top-0  h-screen w-screen bg-black bg-opacity-10',
    container: 'flex h-screen  overflow-y-initial ',
    modal: ' m-auto bg-white h-auto md:w-2/4 w-full overflow-y-auto mx-4 md:mx-auto rounded-lg shadow-lg px-10 pt-5 pb-10',
    title: 'text-center text-lg leading-9 font-extrabold text-gray-800',
    content: 'grid fom mt-4 w-full md:grid-cols-1 text-gray-600',
  

}

export default EditNoteModal