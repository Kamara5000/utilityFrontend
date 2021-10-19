import React, { useEffect, useState } from 'react';
import axios from  'axios';
import {motion} from 'framer-motion';
import Header from '../header';
import Footer from '../footer';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router';


const Todo = ()=>{
let [todoItem, handletodoItem] = useState(null);
let [isLoad, handleLoading] = useState(true);
let [add, handleAdd] = useState(false);
let [count, setCount] = useState(1);
let [del, handleDel] = useState(false);
let [error, handleError] = useState(false);
let [todo, handleTodo] = useState(null);



const history =useHistory();
const { username } = useParams();


useEffect(()=>{
    
    let isMounted = true;
    //loading from backend

            axios({
                        method: "get",
                        // url: `http://localhost:5000/todo/${username}`,
                        url: `https://boiling-stream-11406.herokuapp.com/todo/${username}`,
                        headers: { 
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                         }, 
                     })
                
                .then(res=>{
            console.log(res);
            if(res.data.error === "jwt expired"){
                history.push("/login");
            }else{
                if (isMounted) {
                    handletodoItem(res.data);
                    
                    handleLoading(false);
                
                }
                
            }
            
            
            }).catch(err=>{
            console.log(err)})
        

        
        
    
        //clean up
        return () => isMounted = false
    
},[count]);

const handleSet = (event)=>{
    let setItem = event.target.value;
    handleTodo(setItem);
}

const addtodoItem=()=>{
    let isMounted = true
    let m = {todo:todo};
    console.log(todo)
    handleAdd(!add);
    if (add) {
            if (todo != null) {
                axios({
                    method: "post",
                    // url: `http://localhost:5000/todo/add/${username}`,
                    url: `https://boiling-stream-11406.herokuapp.com/todo/add/${username}`,
                    data:m,
                    headers: { 
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                        }, 
                    }).then(res=>{
                    //console.log(res);
                    
                    if(res.data.error == "jwt expired"){
                    history.push("/login");
                    }else{
                    
                        if (isMounted) {
                         handletodoItem(res.data);
                         handleLoading(false);
                         setCount(count+1);
                        }

                    }

                   
                }).catch(err=>{
                    console.log(err)})

                handleTodo(null)
                
            }
        handleAdd(!add)
    }
}

const delTodo =(t)=>{
        let _id = t._id;
    axios({
        method: "delete",
        // url: `http://localhost:5000/todo/delete/${_id}`,
        url: `https://boiling-stream-11406.herokuapp.com/todo/delete/${_id}`,
        headers: { 
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        //'Content-Type': 'multipart/form-data'
         }, 
     })

.then(response=>{console.log(response.data); 

   if(response.data.message === "success"){
        handleDel(true)
        handleLoading(false)
        setCount(count+1);
   }
   if(response.data.error === "jwt expired"){
     history.push("/login");
 }
 }).catch(err=>console.log(err));
 
}

const closetArea = ()=>{
    handleAdd(!add);
}

//console.log(todoItem);

return(
<React.Fragment>
    <section><Header username={username}/></section>
                
<div className="md:w-2/3 w-4/5 h-2/3 mx-auto bg-gray-100 flex items-center justify-center mt-32 ">
    <div className="w-full mx-auto rounded-lg border border-gray-700 p-8 lg:py-12 lg:px-14 text-gray-300 max-width: 800px">
        <div className="mb-10">
            <h1 className="text-2xl font-bold"><span className="fa fa-star text-white text-3xl leading-none align-bottom"></span> Todo</h1>
        </div>
        <div className="mb-10">
            {todoItem && todoItem.length>0? todoItem.map((t, i)=>(
                <div key={i} >
                <ul  className="-mx-1">
                    <div>
                        
                    <motion.li
                    //to add transition to the cards
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, delay:i/10}}
                        drag={false}
                        dragElastic={1}
                        dragConstraints={{ top: 1, bottom: 1, right: 1, left: 1 }}
                        key={i}
                        className=" rounded transition-all flex text-black focused:bg-gray-800 focused:shadow-lg px-4 py-4 my-1 -mx-2">
                            
                            <div className="flex-none w-10 leading-none">
                                <span className="fa fa-check-circle"></span>
                            </div>
                            <div className="w-full truncate break-words">
                            {t.todo}
                            </div>

                            <div className=" flex justify-end">
                                <button onClick={()=>delTodo(t)} className="p-1 -mr-1 focus:outline-none hover:text-red-300  " ><span className="fas fa-trash"></span></button>
                            </div>
                        </motion.li>
                    </div>
                </ul>
            </div>
            )):''}
            <div>
                {todoItem === null && <p className="text-gray-500">No todo</p>}
            </div> 
        </div>

        {add && <div className="flex-grow max-w-full">
            <div className="w-full leading-none">
                <textarea type="text" onChange={handleSet} name="todo" className="text-md w-full  bg-transparent text-gray-500 leading-none focus:outline-none mb-2"  placeholder="Add New todo...">
                </textarea>
            </div>
            <div className="w-full flex justify-end">
                <button onClick={closetArea} className="p-1 -mr-1 focus:outline-none hover:text-red-300" ><span className="fas fa-trash"></span></button>
            </div>
            </div>
        }
        
        <div className="flex justify-center">
            <button onClick={addtodoItem}  title="Click to add" className="py-1 px-10 border border-gray-600 hover:border-gray-100 rounded leading-none focus:outline-none text-xl">
                <span className="fa fa-plus"></span></button>
        </div>
    </div>
</div>


            <section>
                <Footer/>
            </section>
        
            
        </React.Fragment>
    )
}

export default Todo;