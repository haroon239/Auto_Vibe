import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import whatsapp from "../assets/WhatsAppButtonGreenLarge.png";
import ReactWhatsapp from 'react-whatsapp';
import Emailbtn from '../assets/emailbutton.png'
import { GiClick } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import Relatedproduct from "../components/relatedproduct";


const Productdetail = () => {
  const params = useParams();
  const home = useNavigate();

  //    console.log(params);
  const [isLoading, setIsLoading] = useState(false);
  const[sold, setsold]=useState();
  const [email, setemail]=useState('')
  const [chat, setchat] = useState(false);
  const [image, setimage] = useState("");
  const [name, setname] = useState("");
  const [color, setcolor] = useState("");
  const [brand, setbrand] = useState("");
  const [price, setprice] = useState();
  const [registered, setregistered] = useState("");
  const [engine, setengine] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [description, setdescription] = useState("");
  const [edit, setedit] = useState(false);
  const [button, setbutton] = useState(false);
  const [click, setclick]=useState('');
  const [like,setlike]=useState('')
  //  console.log(imagedetail);
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setchat(true);
    }
     
     
  }, []);




  const productdetails =async () => {
    // Set loading state

    try {
      //   const findproduct={"_id":params}

      await axios
        .get(`http://localhost:6500/productdetail/${params._id}`)
        .then((res) => {
             console.log(res);
          const DBuserid = res.data.data.user._id;
          const LSuserid = localStorage.getItem("id");
          setimage(res.data.data.image);
          setname(res.data.data.vehicleName);
          setcolor(res.data.data.vehicleColor);
          setbrand(res.data.data.vehicleCategory);
          setengine(res.data.data.engineCapacity);
          setregistered(res.data.data.registeredCity);
          setContactNumber(res.data.data.ContactNumber);
          setdescription(res.data.data.Description);
          setprice(res.data.data.vehiclePrice);
          setemail(res.data.data.user.email);
          setsold(res.data.data.sold);
          if (DBuserid === LSuserid) {
            setbutton(true);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const editproduct = async () => {
    // console.log("true");
    setedit(true);
  };

  const updateproduct = async () => {
    setedit(false);

    const userId = localStorage.getItem("id");
    const formData = new FormData();
    if(sold==true){
     confirm("Are You Sure This Vehicle Available For Selling ?")
      formData.append("sold",false)
    }
    else{
      confirm("Are You Sure This Vehicle is Sold ?");
      formData.append("sold",true);
      
    }
    formData.append("image", image);
    formData.append("name", name);
    formData.append("color", color);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("registered", registered);
    formData.append("engine", engine);
    formData.append("ContactNumber", ContactNumber);
    formData.append("description", description);
    formData.append("id", userId);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // Assuming 'http://localhost:6500/:id' is the correct format, replace it with the actual URL
      const response = await axios
        .patch(
          `http://localhost:6500/updateproduct/${params._id}`,
          formData,
          config
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            productdetails();
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const soldproduct=()=>{
    try {
      alert("sold  Product....");
    } catch (error) {
      
    }
  }

  const deleteproduct = async () => {
    try {
      await axios
        .delete(`http://localhost:6500/deleteproduct/${params._id}`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            home("/");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productdetails();
    const getclick=async ()=>{
      const getclick= await axios.get(`http://localhost:6500/getclick/${params._id}`).then((res)=>{
        setclick(res.data.data.click)
        setlike(res.data.data.like)

       })
      }
  
      getclick();

  }, [params]);

  return (
    <>
    <div>
      {edit && (
        <section className="bg-white dark:bg-gray-900  ">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Add a new product
            </h2>
            {/* <form onSubmit={formvalidation}> */}
            <div>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <label
                    className="block mb-4 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="user_avatar"
                  >
                    Upload file
                  </label>
                  <input
                    onChange={(e) => {
                      setimage(e.target.files[0]);
                    }}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    id="user_avatar"
                    type="file"
                    encType="multipart/form-data"
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Vehicle Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Color
                  </label>
                  <input
                    value={color}
                    onChange={(e) => {
                      setcolor(e.target.value);
                    }}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Vehicle Colour"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Brand
                  </label>
                  <input
                    value={brand}
                    onChange={(e) => {
                      setbrand(e.target.value);
                    }}
                    type="text"
                    name="brand"
                    id="brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Product brand"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    value={price}
                    onChange={(e) => {
                      setprice(e.target.value);
                    }}
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Registerd In
                  </label>
                  <input
                    value={registered}
                    onChange={(e) => {
                      setregistered(e.target.value);
                    }}
                    type="text"
                    name="brand"
                    id="brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Registered city"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Engine Capacity
                  </label>
                  <input
                    value={engine}
                    onChange={(e) => {
                      setengine(e.target.value);
                    }}
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="180CC"
                    required=""
                  />
                </div>
                {/* <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car feature</label>
                  <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option selected="">Select category</option>
                      <option value="TV">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="GA">Gaming/Console</option>
                      <option value="PH">Phones</option>
                  </select>
              </div> */}

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                    id="description"
                    rows="8"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your description here"
                  ></textarea>
                </div>
              </div>
              <input
                type="submit"
                onClick={updateproduct}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              />

              {/* <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
         Add product
         </button> */}
            </div>
          </div>
        </section>
      )}

      {/* // detail product page*/}
      {!edit && (
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
          <div className="flex flex-col gap-6 lg:w-2/4">
            <img
              src={`http://localhost:6500/${image}`}
              alt=""
              className="w-full h-full aspect-square object-cover rounded-xl"
            />
            {/* <div className='flex flex-row justify-between h-24'>
                        <img src={images.img1} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)}/>
                        <img src={images.img2} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)}/>
                        <img src={images.img3} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)}/>
                        <img src={images.img4} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)}/>
                    </div> */}
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <h1 className="text-3xl font-bold">{name}</h1>
            </div>
            <p className="text-gray-700">
              <span className=" font-bold">Color:</span> {color}
            </p>
            <p className="text-gray-700">
              <span className=" font-bold">Brand:</span> {brand}
            </p>
            <p className="text-gray-700">
              <span className=" font-bold">Registered City:</span> {registered}
            </p>
            <p className="text-gray-700">
              <span className=" font-bold">Engine Capacity:</span> {engine}CC
            </p>

            <p className="text-gray-700">
              <span className=" font-bold">Description:</span> {description}
            </p>

            <h6 className="text-2xl font-semibold">$ {price}</h6>
            {ContactNumber && (
             
            <ReactWhatsapp className="w-[180px] h-[40px] " number={ContactNumber} message="Hello how are you!!!"><img alt="Chat on WhatsApp" src={whatsapp} /></ReactWhatsapp>
             
             
             
          
            )}
<a href = {`mailto: ${email}`}><img src={Emailbtn} alt="Send Email" className="w-[216px] h-[63px]"/></a>
            {/* <div className='flex flex-row items-center gap-12'>
                        <div className='flex flex-row items-center'>
                            <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                            <span className='py-4 px-6 rounded-lg'>2</span>
                            <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                        </div>
                        <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full'>Add to Cart</button>

                    </div> */}

            {button && (
              <div>
                <button
                  onClick={editproduct}
                  className="bg-yellow-800 text-white font-semibold py-3 px-16 rounded-xl h-full m-2"
                >
                  Edit Product
                </button>

                <button
                  onClick={deleteproduct}
                  className="bg-red-500 text-white font-semibold py-3 px-16 rounded-xl h-full"
                >
                  Delete Product
                </button>

                <button
                  onClick={updateproduct}
                  className="bg-red-500 text-white font-semibold py-3 px-10 rounded-xl h-full"
                >
                 {sold? "Available Vehicle": "Sell Out"}
                </button>
              <div className="flex ">
                <div className="click  mr-3 w-[200px] h-[100px] flex flex-col items-center rounded-md justify-center bg-[#5bb9c2]">
                  <h2 className="text-[20px] font-bold">Total Click</h2>
                  <div className="flex justify-around items-center">
                      <GiClick className="text-[50px] "/>
                      <h1 className="text-[40px] font-bold">{click}</h1>
                  </div>
                </div>
                <div className="click w-[200px] h-[100px] flex flex-col items-center rounded-md justify-center bg-[#5bb9c2]">
                  <h2 className="text-[20px] font-bold">Total Likes</h2>
                  <div className="flex justify-around items-center">
                      <FaHeart className="text-[35px] "/>
                      <h1 className="text-[40px] font-bold">{like}</h1>
                  </div>
                </div>
                </div>
              </div>
            )}
            <NavLink to={chat ? `/chat/${params._id}` : "/signin"}>
              <button className="bg-yellow-500  text-black font-semibold py-3 px-16 rounded-xl h-full m-2">
                Chating.....
              </button>
            </NavLink>

          </div>
        </div>
      )}

</div>

<div>
  <Relatedproduct Category={brand} productId={params}/>
</div>
    </>
  );
};

export default Productdetail;
