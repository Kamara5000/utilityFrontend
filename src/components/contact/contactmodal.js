import { motion,AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import DeleteContactModal from './deleteContactModal';
import EditContactModal from './editContactModal';

const ContactModal = ({ contact, setSelectedContact }) => {
  const closeModal = event => {
    if(event.keyCode === 27) setSelectedContact(null)
    if (event.currentTarget === event.target) setSelectedContact(null)
    if(event.keyCode === 27 || event.currentTarget === event.target) {
      setSelectedContact(null)
    }
  }

  let [delcontact, handledelcontact] = useState(false);

  let [editcontact, handleEditContact] = useState(false);


   window.addEventListener('keydown', event => closeModal(event))
  return (
    <div className={style.overlay}>
      <div className={style.container} onClick={event => closeModal(event)}>
        <motion.div
          animate={{ scale: [0.7, 1.5, 1] }}
          exit={{ scale: 0 }}
          className={style.modal}
        >
          <p className={style.title}>
            {contact.name}
          </p>
          <div className={style.content}>
            <p className="font-medium">Address:</p>
            <p>{contact.address}</p>
            <p className="font-medium">Phone:</p>
            <p>{contact.phone}</p>
            <p className="font-medium">Email:</p>
            <p>{contact.email}</p>
            <p>Twitter:</p>
            <p>{contact.twitter? contact.twitter:''}</p>
            <p>instagram:</p>
            <p>{contact.instagram}</p>
          </div>
            <div className="flex flex-wrap justify-center items-center mt-4 border-t-2 pt-5">
                <button onClick={()=>handleEditContact(true)} className="text-xs mr-2 py-1.5 px-4 ransition animate-pulse text-gray-600 bg-blue-200 rounded-2xl">
                    Edit
                </button>
                <button onClick={()=>handledelcontact(true)} className="text-xs mr-2 py-1.5 px-4 transition animate-bounce text-gray-600 bg-red-300 rounded-2xl">
                    Delete
                </button>
            </div>
        </motion.div>
        
        <AnimatePresence>
            {delcontact &&
             <DeleteContactModal
                selectedContact={contact}
                setSelectedContact={handledelcontact}
                mainModal = {setSelectedContact}
             />
            }
        </AnimatePresence>
        <AnimatePresence>
          {editcontact && 
          <EditContactModal contact ={contact} contactSelected={setSelectedContact} editContact={handleEditContact}/>}
        </AnimatePresence>

      </div>
    </div>
  )
}
const style = {
  overlay: 'fixed top-0  h-screen w-screen bg-black bg-opacity-10',
  container: 'flex h-screen',
  modal: 'm-auto bg-white  rounded-lg shadow-lg px-14 pt-5 pb-10',
  title: 'text-center mb-5 text-gray-700 font-semibold text-xl',
  content: 'grid grid-cols-2 break-words text-gray-600 gap-x-0'
}
export default ContactModal