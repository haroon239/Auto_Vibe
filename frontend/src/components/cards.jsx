import React, { useEffect } from 'react'
import noavailable from '../assets/not-available.png';
import { IoIosHeart } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import sold2 from "../assets/sold2.png"
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

const Cards = ({ id, name, color, price, image, sold }) => { // Destructure wishlist from props
  const userId = localStorage.getItem("id");

const whishlistfun = async (productId) => {

  // toast("like product");

  const productid = productId;
  console.log("whishlistt....", productId, "userid", userId);
  const data = {
    userid: userId,
    Product: productid,
  };
  console.log("whishlistt....", data);
  await axios.post("http://localhost:6500/likedproduct", data).then((res) => {
    console.log(res, 38);
  });

};



const productclick=async (id,behave)=>{
  console.log('hello',behave);
  const body={
    userId:userId,
    product:id,
    behaviour:behave
  }
await axios.post('http://localhost:6500/productclick',body).then((res)=>{
  console.log(res, "click product");
})
}
  return (
    <div key={id} className="relative " >
      <div className='w-8 h-8 rounded-full flex items-center justify-center text-center absolute top-2 right-2 border-solid border-2 border-black bg-yellow-300' onClick={()=>{whishlistfun(id); productclick(id,"like")}}>
        <IoIosHeart className="text-white hover:text-red-500 text-2xl" />
      </div>
      {sold && <div className='w-[62px] h-[45px] rounded-sm flex items-center justify-center text-center absolute top-1 left-0 border-solid border-2  bg-yellow-300' onClick={()=>whishlistfun(id)}>
       <img src={sold2} alt="" />
      </div>}
      <div onClick={() => productclick(id,"click")} className="aspect-h-1 p-1 aspect-w-1 w-full overflow-hidden rounded-md hover:bg-gray-200 lg:aspect-none lg:h-[200px]  ">
        <NavLink to={`/product/detail/${id}`}>
          <img 
            src={`http://localhost:6500/${image}`}
            alt={noavailable}
            className="h-full w-full object-center object-fill "
          />
        </NavLink>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <NavLink to={`/product/detail/${id}`}>
              <span aria-hidden="true" className="absolute" />
              {name}
            </NavLink>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{price}$</p>
      </div>
      {/* <ToastContainer /> */}
    </div>
  )
}

export default Cards
