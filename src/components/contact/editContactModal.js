import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const EditContactModal = ({contact, contactSelected, editContact}) => {
    let [name,setName] = useState("");
    let [mail, setMail] = useState("");
    let [phone, setPhone]= useState("");
    let [address, setAddress] = useState("");
    let [twitter, setTwitter] = useState("");
    let [instagram, setInstagram] = useState("");
    let [img, setImg] = useState("");
    let [url, handleUrl] = useState();

    let [success, setSuccess] = useState(false);

    const history =useHistory();

   const closem=()=>{
        contactSelected(false);
    }

  useEffect(()=>{
    handleUrl(contact.imgUrl);
    setName(contact.name);
    setMail(contact.email);
    setPhone(contact.phone);
    setAddress(contact.address);
    setTwitter(contact.twitter);
    setInstagram(contact.instagram);
  },[])  

  const onChangeFile =(e)=>{
     const img = e.target.files[0];

     if(img){
        handleUrl(URL.createObjectURL(img));
        setImg(img)
     }
     
  }

  const handleSet=(event)=>{
    let checkName= event.target.name==="fname";
    let checkMail= event.target.name==="email";
    let checkPhone = event.target.name ==="phone";
    let checkAddress = event.target.name ==="address";
    let checkTwitter = event.target.name ==="twitter";
    let checkInstagram = event.target.name ==="instagram";
    
     if (checkMail) {
        let p = event.target.value;
        setMail(p);
    }else if(checkPhone){
        let pp = event.target.value;
        setPhone(pp);
    }else if(checkName){
        let n= event.target.value
        setName(n);
    }else if(checkAddress){
         let ad = event.target.value;
        setAddress(ad);
    }else if(checkTwitter){
        let t = event.target.value;
        setTwitter(t);
    }else if(checkInstagram){
        let i = event.target.value;
        setInstagram(i);
    }
}

  const handleSubmit=(e)=>{
    e.preventDefault();

    
    const id = contact._id;
    //console.log(username);
    

    //  let d= {mail,name,phone,address,instagram,twitter,img, oldImgUrl:contact.imgUrl};
    //  console.log(d);
    const m= new FormData();
    m.append('mail', mail);
    m.append('name', name);
    m.append('phone', phone);
    m.append('address', address);
    m.append('instagram', instagram);
    m.append('twitter', twitter);
    m.append('img', img);
    m.append('oldImgUrl', contact.imgPublicId);
    //console.log(m)
       
                 axios({
                         method: "patch",
                        //  url: `http://localhost:5000/contact/edit/${id}`,
                        url: `https://boiling-stream-11406.herokuapp.com/edit/${id}`,
                         data: m,
                         headers: { 
                         'authorization': `Bearer ${localStorage.getItem('token')}`,
                         //'Content-Type': 'multipart/form-data'
                          }, 
                      })
 
                 .then(response=>{
                   //console.log(response.data); 
                    if(response.data.message === "success"){
                     setSuccess(true);
                    }
                    if(response.data.error === "jwt expired"){
                        history.push("/login");
                    }
                  }).catch(//err=>console.log(err)
                  );

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
                        Edit Contact
                </h2>

                <button type="button"  onClick={closem}>
                    <span className="far fa-window-close text-xl justify-end self-end"></span>
                </button>
                
                </div>
            
            <form onSubmit={handleSubmit} className={style.content}>
                <div className="w-full mb-2 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fname">
                    Full Name
                  </label>
                  <input value={name}  required type="text" name="fname" id="fname" placeholder="enter full name"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                      py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                      onChange={handleSet}
                  />
                </div>
           
                <div className="w-full mb-2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input  value={mail}  required type="email" name="email" id="email" placeholder="example@gmail.com"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                      py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                      onChange={handleSet}
                  />
              </div>

              <div className="w-full mb-2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                    Phone
                  </label>
                  <input value={phone}   required type="number" name="phone" id="phone" placeholder="08000000000"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                      py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                      onChange={handleSet}
                  />
              </div>

              <div className="w-full mb-2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">
                    Address
                  </label>
                  <input value={address}   required type="text" name="address" id="address" placeholder="address"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                      py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                      onChange={handleSet}
                  />
              </div>

              <div className="w-full mb-2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="twitter">
                    Twitter
                  </label>
                  <input value={twitter}  type="text" name="twitter" id="twitter" placeholder="twitter handle" 
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                      py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                      onChange={handleSet}
                  />
              </div>
              <div className="w-full mb-2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="instagram">
                    Instagram
                  </label>
                  <input value={instagram}   type="text" name="instagram" id="instagram" placeholder="instagram handle" 
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full 
                      py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                      onChange={handleSet}
                  />
              </div>
    
              <div className="w-full mb-2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                    Upload Image
                  </label>
                  <input  type="file" name="img" onChange={onChangeFile}/>
                  {url && <img src={url} width="100px" alt="user" height="100px"/>}
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
                <p className="font-medium text-green-500">Contact Edited succesfully !!!</p>
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
  container: 'flex h-screen overflow-y-initial ',
  modal: ' m-auto bg-white md:h-auto h-screen overflow-y-auto  rounded-lg shadow-lg px-14 pt-5 pb-10',
  title: 'text-center text-3xl leading-9 font-extrabold text-gray-800',
  content: 'grid fom mt-4 w-full md:grid-cols-2    text-gray-600 gap-x-4',
  

}

export default EditContactModal