import React, { useEffect, useState } from 'react';
import axios from  'axios';
import { AnimatePresence } from 'framer-motion';
import {motion} from 'framer-motion';
import ContactModal from './contactmodal';
import Header from '../header';
import Footer from '../footer';
import AddContactModal from './addcontactmodal';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router';

const Contacts = ()=>{
let [contacts, handleContacts] = useState(null);
let [filter, handleFilter] = useState(null);
let [selectedContact, handleSelectedContact] = useState(null);
let [isLoad, handleLoading] = useState(true);
let [addcontact, handleAddContact] = useState(false);
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
                    // url: `http://localhost:5000/contact/${username}`,
                    url: `https://boiling-stream-11406.herokuapp.com/contact/${username}`,
                    headers: { 
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                     }, 
                 })
            
            .then(res=>{
            //console.log(res);
            const query = filter.toLowerCase();
            const filteredContact = res.data.filter(contact=>{
            const fullName = `${contact.name}`;
            if(query.length === 1){
                const firstLetter = fullName.charAt(0).toLowerCase();
                return firstLetter === query
            }else{
                return fullName.toLowerCase().includes(query);
             }
        })

           if (isMounted) {
            handleLoading(false);
            handleFiltered(filteredContact);
            handleContacts(filteredContact)
           }
            
        
            
            }).catch(//err=>{console.log(err);}
            )
    } else {
            axios({
                        method: "get",
                        url: `https://boiling-stream-11406.herokuapp.com/contact/${username}`,
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
                    handleContacts(res.data);
                }
                
            }
            
            if (isMounted) {
                handleLoading(false);
            }
            
            }).catch(//err=>{console.log(err)}
            )
        }
    
        //clean up
        return () => isMounted = false
       

     //using randomuser api 
    // if (filter) {
    //     handleLoading(true);
    //     axios.get('https://randomuser.me/api?results=10').then(res=>{
    //         console.log(res);
    //         const query = filter.toLowerCase();
    //         const filtered = res.data.results.filter(contact=>{
    //         const fullName = `${contact.name.first} ${contact.name.last}`;
    //         if(query.length === 1){
    //             const firstLetter = fullName.charAt(0).toLowerCase();
    //             return firstLetter === query
    //         }else{
    //             return fullName.toLowerCase().includes(query);
    //          }
    //     })

    //         handleContacts(filtered);
    //         handleLoading(false);
    //         }).catch(err=>{
    //         console.log(err);})
    // } else {
    //         axios.get('https://randomuser.me/api?results=10').then(res=>{
    //         console.log(res);
    //         handleContacts(res.data.results);
    //         handleLoading(false);
    //         }).catch(err=>{
    //         console.log(err)})
    //     }

},[filter,addcontact,selectedContact]);

//console.log(contacts);

    return(
        <React.Fragment>
            <section>
                <Header username={username}/>
            </section>
            <section>
            <div className="flex  justify-between flex-wrap">
                <input placeholder="find a contact" type="text"  className="md:ml-20 ml-10 mt-32 rounded-md p-2"
                    onChange={event => handleFilter(event.target.value)}
                />
                <motion.button onClick={()=>handleAddContact(true)} className="md:ml-20 ml-10  justify-end self-end font-semibold text-sm mr-20 px-4 py-2 leading-none border rounded bg-white  hover:border-transparent hover:text-teal mt-10  md:mt-10">
                    Add Contact
                </motion.button>
                {addcontact && <AddContactModal handleAddContact={handleAddContact} username ={username}/>}
            </div>
           
           </section>
           <div className="mt-2 flex-grow self-center font-semibold text-xl text-gray-900 text-center">
            {contacts? contacts.length > 0 ? <h1>{contacts.length} contacts</h1>:'':'' }
            </div>

        
            <section className="grid md:grid-cols-4 sm:grid-cols-2  gap-6 p-10 md:p-20 lg:p-20">
            {isLoad ?<h1>Fetching data... <span className="fa fa-spinner fa-spin"></span></h1>:null}
            {error?<h1 className="text-sm text-red-400">Error loading contacts refresh to try again</h1>:null}
                {contacts && contacts.length>0?contacts.map((c,i)=>(
                    <motion.button 
                        title="Click to edit or delete"
                    //to add transition to the card
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, delay:i/10}}
                        drag={false}
                        dragElastic={1}
                        dragConstraints={{ top: 1, bottom: 1, right: 1, left: 1 }}
                        className="bg-white text-white h-80 rounded-lg shadow-md"
                        key={i}
                        onClick={() => handleSelectedContact(c)}
                    >
                  
                        <img alt="img" className="w-32 h-32 rounded-full mx-auto"  src={c.imgUrl}/>
                        <figcaption className="text-center mt-5 break-words">
                        <p className="text-gray-700 font-semibold text-xl mb-2">{c.name}</p>
                        <p className="text-gray-500 "><span className="font-medium">email:</span>{c.email}</p>
                        <p className="text-gray-500"><span className="font-medium">phone:</span> {c.phone}</p>
                        <p className="text-gray-500"><span className="font-medium">city:</span> {c.address}</p>
                        
                        
                        </figcaption>
                    </motion.button>
                )):null
                }
            {!isLoad && contacts.length<1 && <div className="text-red-400">no contact available</div>}
            {filtered && filtered.length<1 && filter &&  <h1>can't find contact</h1>}
                
            </section>

                {/* to all transition to the modal when closed*/}
            <AnimatePresence>
            {selectedContact &&
             <ContactModal
                contact={selectedContact}
                setSelectedContact={handleSelectedContact}
             />
            }
            </AnimatePresence>
            <section className="bg-white">
                <Footer/>
            </section>
            
        </React.Fragment>
    )
}

export default Contacts;