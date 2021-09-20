import { motion,AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import DeleteNoteModal from './delNoteModal';
import EditNoteModal from './editNoteModal';

const NoteModal = ({ note, setSelectedNote }) => {
  const closeModal = event => {
    if(event.keyCode === 27) setSelectedNote(null)
    if (event.currentTarget === event.target) setSelectedNote(null)
    if(event.keyCode === 27 || event.currentTarget === event.target) {
      setSelectedNote(null)
    }
  }

  let [delNote, handledelNote] = useState(false);

  let [editNote, handleEditNote] = useState(false);

  const closem =()=>{
    setSelectedNote(null)
  }

   window.addEventListener('keydown', event => closeModal(event))
  return (
    <div className={style.overlay}>
      <div className={style.container} onClick={event => closeModal(event)}>
        <motion.div
          animate={{ scale: [0.7, 1.5, 1] }}
          exit={{ scale: 0 }}
          className={style.modal}
        >
         <div className="w-auto">
            
            <div className="flex  justify-between flex-wrap ">
                <h2 className={style.title}>
                        Note
                </h2>

                <button type="button"  onClick={closem}>
                    <span className="far fa-window-close text-xl justify-end self-end"></span>
                </button>
                
                </div>
            <div className="break-words block text-left p-2">
                  <h3 className="text-lg  text-gray-500 font-extrabold">Title</h3>
                  <h1 className="mt-1  font-serif">{note.title}</h1>
                  <h3 className="text-lg  text-gray-500 font-extrabold mt-3">Body</h3>
                  <h1 className="mt-1 font-serif">{note.body}</h1>
                  <h4 className="mt-1 text-gray-400 text-sm mt-5">Created on:  { note.date} </h4>
              </div>
          </div>
            <div className="flex flex-wrap justify-center items-center mt-4 border-t-2 pt-5">
                <button onClick={()=>handleEditNote(true)} className="text-xs mr-2 py-1.5 px-4 ransition animate-pulse text-gray-600 bg-blue-200 rounded-2xl">
                    Edit
                </button>
                <button onClick={()=>handledelNote(true)} className="text-xs mr-2 py-1.5 px-4 transition animate-bounce text-gray-600 bg-red-300 rounded-2xl">
                    Delete
                </button>
            </div>
        </motion.div>
        
        <AnimatePresence>
            {delNote &&
             <DeleteNoteModal
                selectedNote={note}
                setSelectedNote={handledelNote}
                mainModal = {setSelectedNote}
             />
            }
        </AnimatePresence>
        <AnimatePresence>
          {editNote && 
          <EditNoteModal note ={note} noteSelected={setSelectedNote} editNote={handleEditNote}/>}
        </AnimatePresence>

      </div>
    </div>
  )
}
const style = {
  overlay: 'fixed top-0  h-screen w-screen bg-black bg-opacity-10',
  container: 'flex h-screen',
  modal: 'm-auto bg-white h-5/6 my-10  overflow-y-auto  rounded-lg shadow-lg px-5  pt-5  pb-10',
  title: 'mb-5 text-gray-700 font-extrabold   text-xl',
  content: 'grid md:grid-cols-2  text-gray-600 gap-x-0'
}
export default NoteModal