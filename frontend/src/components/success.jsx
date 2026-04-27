import React, { useEffect } from 'react'
import axios from 'axios'
import payment_succed from "../assets/PAYMENT-SUCCESS.png"
import { useParams } from 'react-router-dom'
const Success = () => {
  const params=useParams();

  console.log(params,"params of success");
  const userId=localStorage.getItem("id");
const body={
  userId:userId,
  package:params.packagename
}
  
    const apicall=async()=>{
    await axios.post('http://localhost:6500/paymentAdd', body).then((res)=>{
      console.log(res,  "response of payement")
    })
  }

  apicall();
  
  return (
    <div>
      <img src={payment_succed} alt="" className='w-[100%] h-[100vh]' />
    </div>
  )
}

export default Success
