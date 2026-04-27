import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import aboutimg from '../assets/ABOUT Website.png'

const About = () => {
  const form = useRef();
  const [name, setname]=useState('');
  const [email, setemail]=useState('');
  const [message, setmessage]=useState('');

  const notify = (e) => {
    e.preventDefault();
    emailjs
    .sendForm('service_apmlr52', 'template_wfjh6mf', form.current, {
      publicKey: '2Aj9tWJxptMIaWf-d',
    })
    .then(
      () => {
        console.log('SUCCESS!');
        toast("Message Sent Succesfully!")
      },
      (error) => {
        console.log('FAILED...', error.text);
      },
    );
   
    setname('');
    setemail('');
    setmessage('');
};

  return (
    <div>
      <div>
        <div>
            <img src={aboutimg} alt=""  className='w-[100%] h-[85vh]' />
        </div>
        <div className='flex justify-center mt-[80px] flex-col items-center'>
          <p className=' w-[70%] text-justify relative mb-[20px]'> 
          <h1 className='text-center my-7 font-bold text-[20px]'>About Autovibe</h1>
Welcome to Autovibe, your ultimate destination for buying and selling vehicles hassle-free. Our platform brings together passionate sellers and eager buyers, creating a vibrant marketplace where every automotive dream finds its match. <br />

At Autovibe, we understand the excitement and significance of finding the perfect vehicle. Whether you're a seller looking to showcase your prized possession or a buyer on the hunt for your next adventure companion, we're here to make the journey smooth and enjoyable.<br />

Our platform is designed to empower both sellers and buyers, offering intuitive tools and features to streamline the process. Sellers can easily create listings with detailed descriptions and eye-catching visuals, ensuring their vehicles stand out in the crowd. Meanwhile, buyers can browse through a diverse selection of vehicles, narrowing down their search based on preferences and requirements.<br />

<h1 className='text-center my-7 font-bold text-[20px]'> Why Choose Autovibe?</h1>
<ul className='list-disc relative'>

<li className='font-bold ml-7'>Diverse Selection:</li> From sleek sedans to rugged SUVs, our platform hosts a wide range of vehicles to suit every taste and budget.

<li className='font-bold ml-7'>Transparent Transactions:</li> We prioritize transparency and honesty in every transaction, fostering trust and confidence between buyers and sellers.

<li className='font-bold ml-7'>User-Friendly Interface:</li> Our intuitive interface makes navigating the platform a breeze, whether you're listing a vehicle or searching for your dream ride.

<li className='font-bold ml-7'>Dedicated Support:</li> Have a question or need assistance? Our friendly support team is here to help every step of the way.

</ul>

Get in Touch
Have a question or feedback about Autovibe? <br /> We'd love to hear from you! <br />Fill out the contact form below, and one of our representatives will get back to you as soon as possible.


          </p>
          <div className='bg-[#2c3253] w-[70%] h-[80vh] flex flex-col items-center '>

      <section className="text-gray-700 body-font relative">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Contact <span className='text-[#00D8FF]'>Us</span> 
            </h1>
          
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form ref={form} onSubmit={notify}>
            <div className="flex flex-wrap -m-2">
           
              <div className="p-2 w-1/2">
             
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="AutoVibes"
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="email"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="from_name"
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="message"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
              <input className='relative cursor-pointer w-[110px] h-[45px] rounded-lg text-white bg-slate-400 hover:bg-[#65949d] active:mt-[7px] transition-all ease-in-out'  type="submit" value="Send" />
                  <ToastContainer />
              </div>
            
            </div>
            </form>
          </div>
        </div>
      </section>
    </div>

        </div>
      </div>
    </div>
  )
}

export default About
