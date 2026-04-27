import React, {useEffect, useState} from 'react'
import noavailable from '../assets/not-available.png';
import axios from 'axios'
import { IoIosHeart } from "react-icons/io";
import {NavLink} from 'react-router-dom';
import emptyproduct from '../assets/nolikeproduct.png'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Likeproduct = () => {
  const [likeproduct, setlikeproduct]=useState([]);
  // console.log(likeproduct, "at line 5");
  const userId = localStorage.getItem("id");

  // for get all the image
  const allimage = async () => {
    try {
        const id = localStorage.getItem("id");
        
        // Check if id is available
        if (!id) {
            console.error("User ID not found in localStorage");
            return;
        }

        const data = {
            userid: id
        };

        const response = await axios.post('http://localhost:6500/likeproductlist', data);

        // Log response data
        console.log(response.data.likedProducts, "line 7");

        // Assuming setlikeproduct is a state setter function
        setlikeproduct(response.data.likedProducts);
    } catch (error) {
        // Handle errors
        console.error("Error:", error);
    }
};



  const removelikeproduct = async (product) => {
  
    try {
      // toast("Product is remove from liked");
       
        const productId = product;

        // Check if userId is available
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        // Create data object with productId and userId
        const data = {
            productid: productId,
            userid: userId
        };

        // Make POST request to remove product from liked list
        const response = await axios.post("http://localhost:6500/removelikeproductlist", data);

        // Log response
        console.log(response);
        if(response.status===200){
          allimage()
        }

        // setlikeproduct(prevProduct=> prevProduct.filter(p=> p!=))
    } catch (error) {
        // Handle errors
        console.error("Error:", error);
    }
};





  useEffect(()=>{
allimage();
  },[])



  const productclick=async (id,behave)=>{
    console.log('hello',behave);
    const body={
      product:id,
      behaviour:behave
    }
   
  await axios.post('http://localhost:6500/productclick',body).then((res)=>{
    console.log(res, "click product");
  })
  }
  return (
//  <h1>liked product</h1>
    <div className="bg-white">
      
       {likeproduct.length<=0? <img className='h-[100vh] w-[100%]' src={emptyproduct}></img> :
       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
       <h2 className="text-2xl font-bold tracking-tight text-gray-900">List Of Liked Product</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {likeproduct.map((product) => (
          <div key={product.id} className=" relative">
            <div className='w-8 h-8 rounded-full flex items-center justify-center text-center absolute top-2 right-2 border-solid border-2 border-black bg-yellow-300  ' onClick={()=>{removelikeproduct(product._id), productclick(product._id, "dislike")}}>
            <IoIosHeart className="text-red-500 hover:text-white text-2xl"  /></div>
           
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-[200px]">
            <NavLink to={`/product/detail/${product._id}`}>   
             <img
                src={`http://localhost:6500/${product.image}`}
                alt={noavailable}
                className="h-full w-full  object-cover object-center "
              />
              </NavLink>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={product.href}>
                  <NavLink to={`/product/detail/${product._id}`}>   
                   <span aria-hidden="true" className="absolute" />
                   </NavLink>
                    {product.vehicleName}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.vehicleColor}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.vehiclePrice}$</p>
            </div>
          </div>
        ))}
      </div>
    </div>
       }

{/* <ToastContainer />  */}
    </div>
  )
}

export default Likeproduct;
