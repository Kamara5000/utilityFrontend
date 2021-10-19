import React, { useEffect, useState } from 'react';
import axios from  'axios';
import { AnimatePresence } from 'framer-motion';
import {motion} from 'framer-motion';
import Header from '../header';
import Footer from '../footer';
import Notemodal from './noteModal';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router';
import AddNoteModal from './addNoteModal';
import NoteModal from './noteModal';

const Note = ()=>{
let [notes, handleNotes] = useState(null);
let [filter, handleFilter] = useState("");
let [selectedNote, handleSelectedNote] = useState(null);
let [isLoad, handleLoading] = useState(true);
let [addNote, handleAddNote] = useState(false);
let [error, handleError] = useState(false);
let [filtered ,handleFiltered] = useState(null);


const history =useHistory();
const { username } = useParams();

//console.log(username);


useEffect(()=>{
    
    let isMounted = true;
    //loading from backend

    //filter for the search input if search or load all contacts if no search
    if (filter) {
        handleLoading(true);
        axios({
                    method: "get",
                    // url: `http://localhost:5000/notes/${username}`,
                    url: `https://boiling-stream-11406.herokuapp.com/notes/${username}`,
                    headers: { 
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                     }, 
                 })
            
            .then(res=>{
            //console.log(res);
            const query = filter.toLowerCase();
            //console.log(query);
            const filteredNotes = res.data.filter(notes=>{
            const title = `${notes.title}`;
            if(query.length === 1){
                const firstLetter = title.charAt(0).toLowerCase();
                return firstLetter === query
            }else{
                return title.toLowerCase().includes(query);
             }

             
            })

            if(res.data.error === "jwt expired"){
                history.push("/login");
            }
            if (isMounted) {
                handleFiltered(filteredNotes);
                handleNotes(filteredNotes)
               }
        }).catch(err=>{
                console.log(err);})
    } else {
            axios({
                        method: "get",
                        url: `https://boiling-stream-11406.herokuapp.com/notes/${username}`,
                        headers: { 
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                         }, 
                     })
                
                .then(res=>{
            //console.log(res);
            if(res.data.error === "jwt expired"){
                history.push("/login");
            }else{
                if (isMounted) {
                    handleNotes(res.data);
                }
                
            }
            
            
            }).catch(err=>{
            console.log(err)})
        }

        if(isMounted){
            handleLoading(false);
        }
        
    
        //clean up
        return () => isMounted = false
    
},[filter,addNote,selectedNote]);

console.log(notes);

    return(
        <React.Fragment>
            <section className="bg-gray-100">
            <section>
                <Header username={username}/>
            </section>
            <section className="bg-gray-100">
            <div className="flex  justify-between flex-wrap">
                <input placeholder="find a note" type="text"  className="m-2  mt-32 rounded-md p-2"
                    onChange={event => handleFilter(event.target.value)}
                />
                <motion.button onClick={()=>handleAddNote(true)} className="m-2  justify-end self-end font-semibold text-sm mr-20 px-4 py-2 leading-none border rounded bg-white  hover:border-transparent hover:text-teal mt-5  md:mt-10">
                     Add Note
                </motion.button>
                {addNote && <AddNoteModal handleAddNote={handleAddNote} username ={username}/>}
            </div>
           
           </section>
           <div className="mt-2 flex-grow self-center font-semibold text-xl text-gray-900 text-center">
            {notes? notes.length > 0 ? <h1>{notes.length} notes</h1>:'':'' }
            </div>

        
            <section className="grid md:grid-cols-3  gap-6 p-2">
            {isLoad?<h1>Fetching data...<span className="fa fa-spinner fa-spin"></span></h1>:null}
            {error?<h1 className="text-sm text-red-400">Error loading notes refresh to try again</h1>:null}
                {notes && notes.length>0  ?notes.map((n,i)=>(
                    <motion.button
                    //to add transition to the cards
                        title="Click to edit or delete"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, delay:i/10}}
                        drag={false}
                        dragElastic={1}
                        dragConstraints={{ top: 1, bottom: 1, right: 1, left: 1 }}
                        className=" bg-white  h-auto w-auto rounded-lg shadow-md"
                        key={i}
                        onClick={() => handleSelectedNote(n)}
                    >

                        <div className="w-auto">
                            <div className="break-words block text-left p-2">
                            <h3 className="text-lg  text-gray-500 font-extrabold">Title</h3>
                            <h1 className="mt-3  font-serif">{n.title}</h1>
                            </div>
                        </div>
                    </motion.button>
                )):null
                }
            {notes === null && filter.length<1 && <div className="text-red-400 text-3xl animate-bounce">no note available</div>}
            {filtered && filtered.length<1 && filter &&  <h1>can't find note</h1>}
                
            </section>

            {/* to all transition to the modal when closed*/}
            <AnimatePresence>
            {selectedNote &&
             <NoteModal
                note={selectedNote}
                setSelectedNote={handleSelectedNote}
             />
            }
            </AnimatePresence>
            <section className="bg-white">
                <Footer/>
            </section>
            </section>
            
        </React.Fragment>
    )
}

export default Note;