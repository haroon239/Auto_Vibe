import React, { useEffect, useState } from 'react'
import noavailable from '../assets/not-available.png';
// import axios from 'axios'

import api from '../utils/axios'

import { IoIosHeart } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import emptyproduct from '../assets/nolikeproduct.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cards from './cards';

const Likeproduct = () => {
  const [likeproduct, setlikeproduct] = useState([]);
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

      const response = await api.post("/users/likeproductlist", data);

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
      const response = await api.post("/users/removelikeproductlist", data);

      // Log response
      console.log(response);
      if (response.status === 200) {
        allimage()
      }

      // setlikeproduct(prevProduct=> prevProduct.filter(p=> p!=))
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };





  useEffect(() => {
    allimage();
  }, [])



  const productclick = async (id, behave) => {
    console.log('hello', behave);
    const body = {
      product: id,
      behaviour: behave
    }

    await api.post('/users/productclick', body).then((res) => {
      console.log(res, "click product");
    })
  }
  return (
  <div className="bg-white">

    {likeproduct.length <= 0
      ? (
        <img className='h-[100vh] w-[100%]' src={emptyproduct} />
      )
      : (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            List Of Liked Products
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {likeproduct.map((item) => (   // ← renamed to "item" to avoid conflict
              <Cards
                key={item._id}
                id={item._id}
                name={item.vehicleName}
                color={item.vehicleColor}
                price={item.vehiclePrice}
                image={item.image}
                sold={item.sold}
                mileage={item.mileage}
                transmission={item.transmission}
                year={item.year}
                onWishlist={() => {
                  removelikeproduct(item._id)
                  productclick(item._id, "dislike")
                }}
                isLiked={true}
              />
            ))}   {/* ← closing )]} for map */}

          </div>
        </div>
      )
    }

  </div>
)
}

export default Likeproduct;

// it is the code of likedproduct.jsx