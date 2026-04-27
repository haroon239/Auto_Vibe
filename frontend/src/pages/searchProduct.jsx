import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import notfound from '../assets/not found.png'
import Cards from '../components/cards';

import axios from 'axios';

const SearchProduct = () => {
  const [search, setsearch]=useSearchParams();
  const [searchProduct, setsearchProduct]=useState([]);
  console.log(search.get('name'),'name.....');
  console.log(search.get('city'),'city.....');
  const name=search.get('name');
  const city=search.get('city');
  const minprice=search.get('minprice');
  const maxprice=search.get('maxprice');

  useEffect(()=>{
    const search= async(e)=>{
  
      const data={ name:name,
          city:city,
          minprice:minprice,
          maxprice:maxprice
        }       
       console.log(data);
        await  axios.get(`http://localhost:6500/search?name=${name}&city=${city}&minprice=${minprice}&maxprice=${maxprice}`).then((res)=>{
          console.log(res.data, "searchproduct");
          setsearchProduct(res.data);
        })
  
        
    }

    search();
  },[])

  if (!searchProduct) {
    return <div>No related Product</div>; // You can replace this with a loading spinner or message
  }

  return (
    <div className='border-2 border-black'>
    <div className='flex justify-center'>
        <h1 className='text-[50px] font-bold'> Search Product</h1>
    </div>
   
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

{searchProduct.length>0 ?
searchProduct.map((item)=>{
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

export default SearchProduct
