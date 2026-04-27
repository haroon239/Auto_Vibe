import React from 'react'
// Import all images
import audi from '../assets/Audi.png';
import BMW from '../assets/BMW.png';
import Honda from '../assets/Honda.png';
import Hyundai from '../assets/hyundai.png';
import Isuzu from '../assets/Isuzu.png';
import Kia from '../assets/Kia.png';
import mercedes from '../assets/mercedes.png';
import MG from '../assets/MG.png';
import Suzuki from '../assets/Suzuki.png';
import Tesla from '../assets/Tesla.png';
import Tyota from '../assets/Tyota.png';
import United from '../assets/United.png';
import Chengan from '../assets/Chengan.jpg';
import { NavLink, useParams } from 'react-router-dom';



const Category = () => {

const catgory=[
    {name:"Audi", image:audi},
    {name:"BMW", image:BMW},
    {name:"Honda", image:Honda},
    {name:"Hyundai", image:Hyundai},
    {name:"Isuzu", image:Isuzu},
    {name:"Kia", image:Kia},
    {name:"MG", image:MG},
    {name:"Merceds", image:mercedes},
    {name:"Suzuki", image:Suzuki},
    {name:"Tesla", image:Tesla},
    {name:"Tyota", image:Tyota},
    {name:"United", image:United},
    {name:"Chengan", image:Chengan},


]

const categaryproduct=(value)=>{
  console.log("categaryproduct.....", value);
}

  return (
    <div>
<div className=" flex flex-col bg-white m-auto p-auto">
<h1 className="flex py-5 lg:px-10 md:px-10 px-5  md:mx-20 mx-5 font-bold text-4xl text-gray-800">
       ALL Categary
      </h1>
      <div className="w-[95%] flex overflow-x-scroll pb-10 hide-scroll-bar">
        <div className="flex flex-nowrap lg:ml-20 md:ml-20 ml-10 ">
         
          {catgory.map((item, index) => (
            <NavLink to={`/home/category/product/${item.name}`}>
             <div key={index} className="inline-block px-3">
            <div onClick={()=>categaryproduct(item.name)} className="w-[100px] h-[130px] text-center cursor-pointer max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src={item.image}alt={item.name}  />
                <h2>{item.name}</h2>
            </div>
            </div>
           </NavLink>
        ))}
            
          </div>
       
        
      </div>
</div>


    </div>
  )
}

export default Category
