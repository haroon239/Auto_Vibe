import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import axios from 'axios';
const Sellingform = () => {
    const home=useNavigate();
    const signin=useNavigate();
    const payment=useNavigate()
    const [image,setimage]=useState('');
    const [name,setname]=useState('');
    const [color,setcolor]=useState('');
    const [category,setcategory]=useState('');
    const [price,setprice]=useState();
    const [registered,setregistered]=useState('');
    const [engine,setengine]=useState('');
    const [number,setnumber]=useState('');
    const [phone, setPhone]=useState('')
    const [description,setdescription]=useState('');

   
const userId=localStorage.getItem('id');
useEffect(() => {
    if(!localStorage.getItem('Token')){
      signin('/signin');
    }
},[])
    const formvalidation=async (e)=>{
        alert("formvalidation")
        // e.preventDefault();

        const paymentverified=await axios.get(`http://localhost:6500/getpayments/${userId}`);
        const status=paymentverified.data.status;
        console.log(paymentverified.data.status, "paymentverifiend");
        if(status==200){
            const token=localStorage.getItem('Token');
            if(token){

                const formdata=new FormData();
                formdata.append('image', image);
             formdata.append('name', name);
             formdata.append('color', color);
             formdata.append('category', category);
             formdata.append('price', price);
             formdata.append('registered', registered);
             formdata.append('engine', engine);
             formdata.append('number', phone);
             formdata.append('description', description);
             formdata.append('id', userId);
         
             // for (let pair of formdata.entries()) {
             //     console.log(pair[0], pair[1]);
             // }
         
             try {
         
                 const config = {
                     headers: {
                       'Content-Type': 'multipart/form-data',
                     },
                   };
                const product= await axios.post('http://localhost:6500/products',formdata,config);
                if(product.status===201){
                 const updateProduct= await axios.patch(`http://localhost:6500/user/${userId}`);
                 console.log(updateProduct);
                 if (updateProduct.status===200){
                     home('/');
                 }
                }
         
             } catch (error) {
                console.log(error) 
             }
         }else{
         signin("/signin")
         }
        }else{
payment("/seller/payments");
        }
// const token=localStorage.getItem('Token');
// if(token){

//        const formdata=new FormData();
//        formdata.append('image', image);
//     formdata.append('name', name);
//     formdata.append('color', color);
//     formdata.append('category', category);
//     formdata.append('price', price);
//     formdata.append('registered', registered);
//     formdata.append('engine', engine);
//     formdata.append('number', phone);
//     formdata.append('description', description);
//     formdata.append('id', userId);

//     // for (let pair of formdata.entries()) {
//     //     console.log(pair[0], pair[1]);
//     // }

//     try {

//         const config = {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           };
//        const product= await axios.post('http://localhost:6500/products',formdata,config);
//        if(product.status===201){
//         const updateProduct= await axios.patch(`http://localhost:6500/user/${userId}`);
//         console.log(updateProduct);
//         if (updateProduct.status===200){
//             home('/');
//         }
//        }

//     } catch (error) {
//        console.log(error) 
//     }
// }else{
// signin("/signin")
// }
       
    }
    
  return (
    // <div>
    // <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={(e) => setimage(e.target.files[0])} />
    // <input type="submit" onClick={formvalidation} />
    // </div>

    <section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
      {/* <form onSubmit={formvalidation}> */}
      <div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

          <div className="w-full">
             <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload file</label>
             <input onChange={(e)=>{setimage(e.target.files[0])}} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" encType="multipart/form-data" />
           </div>


              <div className="w-full">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle Name</label>
                  <input onChange={(e)=>{setname(e.target.value)}} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
              </div>
              <div className="w-full">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                  <input onChange={(e)=>{setcolor(e.target.value)}} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Vehicle Colour" required=""/>
              </div>
              <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                  <select id="category" onChange={(e)=>{setcategory(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option selected="">Select category</option>
                      <option value="Audi">Audi</option>
                      <option value="BMW">BMW</option>
                      <option value="Chengan">Chengan</option>
                      <option value="Honda">Honda</option>
                      <option value="Hyundai">Hyundai</option>
                      <option value="Isuzu">Isuzu</option>
                      <option value="Kia">Kia</option>
                      <option value="Merceds">Mercedes</option>
                      <option value="MG">MG</option>
                      <option value="Suzuki">Suzuki</option>
                      <option value="Tesla">Tesla</option>
                      <option value="Toyota">Toyota</option>
                      <option value="United">United</option>
                  </select>
              </div>

              {/* <div className="w-full">
                  <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                  <input onChange={(e)=>{setbrand(e.target.value)}} type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required=""/>
              </div> */}
              <div className="w-full">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input onChange={(e)=>{setprice(e.target.value)}} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required=""/>
              </div>
              <div className="w-full">
                  <label  htmlFor="registered" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Registerd In</label>
                  <input onChange={(e)=>{setregistered(e.target.value)}} type="text" name="registered" id="registered" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Registered city" required=""/>
              </div>
              <div className="w-full">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Engine Capacity</label>
                  <input onChange={(e)=>{setengine(e.target.value)}} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="180CC" required=""/>
              </div> 
           
              <div>
                  <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Whatsapp Number <span className='text-red-600'>(exceptional)</span></label>
                  <PhoneInput defaultCountry="pk" value={phone} onChange={(phone) => setPhone(phone)} />
              </div>

             

            
              <div className="sm:col-span-2">
                  <label  htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea onChange={(e)=>{setdescription(e.target.value)}} id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
              </div>


         </div> 
         <input type="submit" onClick={formvalidation} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" />


        {/* <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
         Add product
         </button> */}
         </div>
            </div>
</section>
  )
}

export default Sellingform
