import React, {useEffect, useState} from 'react'
import img1 from '../assets/hero_section.jpg';
import img2 from '../assets/nolikeproduct.png';
import Cards from './cards';
import axios from 'axios';
import notfound from '../assets/not found.png'
import { useParams } from 'react-router-dom';

const Relatedproduct = ({Category, productId}) => {
    const param=useParams();
const [relatedProduct, setrelatedProduct]=useState([]);

useEffect(()=>{
const getproduct=async ()=>{
  try {
    const product=axios.get('http://localhost:6500/getproducts').then((res)=>{
        const apidata=res.data.data;
        const relatedproduct=apidata.filter((item)=>item.vehicleCategory == Category && item._id!==param._id)
        setrelatedProduct(relatedproduct)
        console.log(relatedproduct, "Relatedproduct");
    })

    
    
  } catch (error) {
   console.log(error) 
  }
}

getproduct();
},[Category, param])
const product=[
    {
        id:123,
        name:"Kia",
        color:"brown",
        price: "250",
        image:img1

    },
    {
        id:123,
        name:"Honda",
        color:"brown",
        price: "250",
        image:img2

    }, {
        id:123,
        name:"mercedes",
        color:"brown",
        price: "250",
        image:img1

    },
]


if (!relatedProduct) {
    return <div>No related Product</div>; // You can replace this with a loading spinner or message
  }
  return (
    <div className='border-2 border-black'>
        <div className='flex justify-center'>
            <h1 className='text-[50px] font-bold'> Related Product</h1>
        </div>
       
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

{relatedProduct.length>0 ?
    relatedProduct.map((item)=>{
        return(
        <Cards id={item._id} name={item.vehicleName} color={item.vehicleColor} price={item.vehiclePrice
        } image={item.image} 
        />
    )
    }):
    <img src={notfound} alt="product not found"  />
}

</div>

    
    </div>
  )
}

export default Relatedproduct
