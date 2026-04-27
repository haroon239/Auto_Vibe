import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
const Dashboard = () => {
const signIn=useNavigate();

const [resgistereduser, setresgistereduser]=useState('');
const [revenue, setrevenue]=useState('');
const [seller, setseller]=useState('');
const [product, setproduct]=useState('');
const [soldproduct, setsoldproduct]=useState('');
const [admin, setadmin]=useState(true)


const adminfunction=async ()=>{
  const userId=localStorage.getItem('id');
  if(userId){
    // const body={
    //   userid:userId
    // }
const admincontent=await axios.get(`http://localhost:6500/adminDashboard/${userId}`).then((res)=>{
  console.log(res.data, "Admin Dashboard Result");
  if(res.data.status==200){
    setadmin(true);
  const revenue=res.data.revenue[0].Revenue;
  setrevenue(revenue);
  setproduct(res.data.product);
  setresgistereduser(res.data.registerduser);
  setseller(res.data.Seller);
  setsoldproduct(res.data.soldproduct)
  }else{
    setadmin(false);
  }
})
}else{
  signIn("/signin")
}
}

useEffect(()=>{
  if(!admin){
    alert("This Field Is Just For Admin")
  }
adminfunction();
},[])

  return (
    <div>
      <div>
        <div className='w-[100%] h-[100px] border-2 border-black bg-black flex justify-center items-center font-bold text-[20px]'>
            <h1 className='text-white'>{admin?"Admin Dashboard" : "You are not an Admin"}</h1>
        </div>
        {admin && <div className='flex'>
            <div className='border-2 border-black w-[18%] h-[90px] bg-[#f03c3c] flex flex-col items-center m-[1%]'>
                <h2 className='text-white font-bold text-[20px]'>Revenue</h2>
                <h4 className=' font-bold text-[30px]'>${revenue}</h4>
            </div>
            <div className='border-2 border-black w-[18%] h-[90px] bg-[#923482] flex flex-col items-center m-[1%]'>
                <h2 className='text-white font-bold text-[20px]'>Registered User</h2>
                <h4 className=' font-bold text-[30px]'>{resgistereduser}+</h4>
            </div>
            <div className='border-2 border-black w-[18%] h-[90px] bg-[#395a46] flex flex-col items-center m-[1%]'>
                <h2 className='text-white font-bold text-[20px]'>Seller</h2>
                <h4 className=' font-bold text-[30px]'>{seller}+</h4>
            </div>
            <div className='border-2 border-black w-[18%] h-[90px] bg-[#2f4f52] flex flex-col items-center m-[1%]'>
                <h2 className='text-white font-bold text-[20px]'>Total Product</h2>
                <h4 className=' font-bold text-[30px]'>{product}+</h4>
            </div>
            <div className='border-2 border-black w-[18%] h-[90px] bg-[#7e3cf0] flex flex-col items-center m-[1%]'>
                <h2 className='text-white font-bold text-[20px]'>Sell Out</h2>
                <h4 className=' font-bold text-[30px]'>{soldproduct}+</h4>
            </div>


            
        </div>}
      </div>
    </div>
  )
}

export default Dashboard
