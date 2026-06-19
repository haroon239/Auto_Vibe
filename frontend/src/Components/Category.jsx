import React from 'react'
// Import all images
import audi from '../assets/Audi.png';
import BMW from '../assets/BMW.png';
import Honda from '../assets/Honda.png';
import Hyundai from '../assets/hyundai.png';
import Isuzu from '../assets/Isuzu.png';
import Kia from '../assets/kia.png';
import mercedes from '../assets/mercedes.png';
import MG from '../assets/MG.png';
import Suzuki from '../assets/Suzuki.png';
import Tesla from '../assets/Tesla.png';
import Tyota from '../assets/Tyota.png';
import United from '../assets/United.png';
import Chengan from '../assets/Chengan.jpg';
import { NavLink, useParams } from 'react-router-dom';



const Category = () => {

  const catgory = [
    { name: "Audi", image: audi },
    { name: "BMW", image: BMW },
    { name: "Honda", image: Honda },
    { name: "Hyundai", image: Hyundai },
    { name: "Isuzu", image: Isuzu },
    { name: "Kia", image: Kia },
    { name: "MG", image: MG },
    { name: "Merceds", image: mercedes },
    { name: "Suzuki", image: Suzuki },
    { name: "Tesla", image: Tesla },
    { name: "Tyota", image: Tyota },
    { name: "United", image: United },
    { name: "Chengan", image: Chengan },


  ]

  const categaryproduct = (value) => {
    console.log("categaryproduct.....", value);
  }

 return (
  <div className="bg-white px-5 md:px-10 lg:px-20 py-5">

    <div className="mb-8">
  <h1 className="font-bold text-3xl text-[#0a1f5c]">
    All Categories
  </h1>
  <p className="text-gray-400 text-sm mt-1">
    Browse ads by brand
  </p>
  <div className="w-12 h-1 bg-blue-600 rounded-full mt-2" />
</div>

    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-6 gap-4 pb-10">
      {catgory.map((item, index) => (
        <NavLink to={`/home/category/product/${item.name}`} key={index}>
          <div
            onClick={() => categaryproduct(item.name)}
            className="flex flex-col items-center justify-center text-center cursor-pointer rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out p-2"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-contain"
            />
            <h2 className="text-sm mt-2 text-gray-700">{item.name}</h2>
          </div>
        </NavLink>
      ))}
    </div>

  </div>
)
}

export default Category
