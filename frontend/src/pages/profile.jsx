import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import noavailable from '../assets/not-available.png';

const Profile = () => {
const [data,setdata]=useState([]);

    const profileproduct=async ()=>{
    const userid=localStorage.getItem('id');
await axios.get(`http://localhost:6500/products/${userid}`).then((res)=>{
     console.log(res.data.data);
     setdata(res.data.data);
})
}

useEffect(()=>{
    profileproduct();
},[]);

 return (
    <>
 
 <div className="bg-white">
   <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
     <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your Products</h2>

     <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
       {data.map((product) => (
         <div key={product.id} className="group relative">
           <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-[200px]">
           <NavLink to={`/product/detail/${product._id}`}>   
            <img
               src={`http://localhost:6500/${product.image}`}
               alt={noavailable}
               className="h-full w-full object-cover object-center "
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
 </div>
 </>
)
}


export default Profile
