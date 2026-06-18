import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import aboutimg from '../assets/ABOUT Website.png'
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/testimonial1.jfif'
import img2 from '../assets/testimonial2.jfif'
import img3 from '../assets/testimonial3.jfif'

const About = () => {
   const navigate = useNavigate()
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
    <div className="min-h-screen bg-white">
 
      {/* ── HERO SECTION ── */}
      <section className="bg-[#0a1f5c] py-20 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          About AutoVibe
        </h1>
        <p className="text-blue-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Pakistan's most trusted car marketplace connecting buyers and
          sellers since 2024. Engineering the future of automotive retail.
        </p>
 
        {/* Stats */}
        <div className="flex justify-center gap-6 mt-10 flex-wrap">
          {[
            { icon: '👥', number: '30K+', label: 'Daily Visitors' },
            { icon: '🚗', number: '2,400+', label: 'Cars Listed' },
          ].map((stat) => (
            <div key={stat.label}
              className="flex items-center gap-3 bg-blue-700/40 border border-blue-600/40
                         rounded-2xl px-6 py-4 min-w-[160px]">
              <div className="w-10 h-10 rounded-xl bg-blue-500/40 flex items-center justify-center text-xl">
                {stat.icon}
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-xl leading-none">{stat.number}</p>
                <p className="text-blue-300 text-xs mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── OUR STORY ── */}
      <section className="bg-white py-16 px-4 sm:px-8 lg:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
 
          {/* Left — Text */}
          <div>
            <h2 className="text-3xl font-bold text-[#0a1f5c] mb-5">
              We Started With a Simple Mission
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              AutoVibe was founded in 2024 with a clear purpose: to revolutionize the
              automotive landscape in Pakistan. We recognized the challenges faced by
              both individual buyers and professional dealers — lack of transparency,
              fragmented communication, and slow transactions.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Our platform bridges these gaps by providing a high-tech, user-centric
              interface that prioritizes trust above all else. Whether you're searching
              for your first luxury vehicle or scaling your dealership inventory, AutoVibe
              ensures a seamless journey from the first click to the final handshake.
            </p>
          </div>
 
          {/* Right — Image / Illustration */}
          <div className="w-full h-64 lg:h-80 bg-blue-50 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&auto=format&fit=crop"
              alt="AutoVibe Office"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentNode.classList.add('flex','items-center','justify-center')
                e.target.parentNode.innerHTML = '<span class="text-6xl">🏢</span>'
              }}
            />
          </div>
        </div>
      </section>
 
      {/* ── OUR VALUES ── */}
      <section className="bg-gray-50 py-16 px-4 sm:px-8 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
            What We Stand For
          </p>
          <h2 className="text-3xl font-bold text-[#0a1f5c] mb-10">
            Built on Trust and Transparency
          </h2>
 
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: '🛡️',
                title: 'Verified Listings',
                desc: 'Every listing is reviewed by our team before going live to ensure accuracy and authenticity.',
              },
              {
                icon: '⏱️',
                title: 'Save Your Time',
                desc: 'Find your perfect car in minutes, not days. Smart filters help you zero in on exactly what you need.',
              },
              {
                icon: '🤝',
                title: 'Safe Deals',
                desc: 'We protect both buyers and sellers with transparent processes and secure communication.',
              },
            ].map((val) => (
              <div key={val.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm
                           hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-4">
                  {val.icon}
                </div>
                <h3 className="text-[#0a1f5c] font-bold text-base mb-2">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── MEET THE TEAM ── */}
      <section className="bg-white py-16 px-4 sm:px-8 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0a1f5c] mb-10 text-center">
            Meet the Team
          </h2>
 
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Ali Hassan', role: 'CEO & Founder', avatar: img1, color: 'bg-blue-500' },
              { name: 'Sara Khan', role: 'Head of Product', avatar: img3, color: 'bg-purple-500' },
              { name: 'Usman Malik', role: 'Lead Developer', avatar: img2, color: 'bg-teal-500' },
            ].map((member) => (
              <div key={member.name}
                className="flex flex-col items-center text-center bg-gray-50
                           rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-all duration-300">
                {/* Avatar */}
                <img src={member.avatar} className={`w-20 h-20 rounded-full ${member.color} flex items-center justify-center object-center
                                 text-white text-xl font-bold mb-4 shadow-lg`} />
                  
                
                <h3 className="text-[#0a1f5c] font-bold text-base">{member.name}</h3>
                <p className="text-gray-400 text-sm mt-1 mb-4">{member.role}</p>
 
                {/* LinkedIn icon */}
                <a href="#"
                  className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center
                             text-white text-xs font-bold hover:bg-blue-700 transition">
                  in
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── CTA BANNER ── */}
      <section className="bg-[#0a1f5c] py-16 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Have questions? We are here to help
        </h2>
        <p className="text-blue-300 text-sm mb-8">
          Reach out to our team anytime
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3 bg-white text-[#0a1f5c] font-semibold
                       rounded-xl hover:bg-blue-50 transition-all duration-200 text-sm">
            Contact Us
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 border-2 border-white text-white font-semibold
                       rounded-xl hover:bg-white hover:text-[#0a1f5c] transition-all duration-200 text-sm">
            Browse Cars
          </button>
        </div>
      </section>
 
    </div>
  )

//     <div>
//       <div>
//         <div>
//             <img src={aboutimg} alt=""  className='w-[100%] h-[85vh]' />
//         </div>
//         <div className='flex justify-center mt-[80px] flex-col items-center'>

//           <p className=' w-[70%] text-justify relative mb-[20px]'> 
//           <h1 className='text-center my-7 font-bold text-[20px]'>About Autovibe</h1>
//           <p>
// Welcome to Autovibe, your ultimate destination for buying and selling vehicles hassle-free. Our platform brings together passionate sellers and eager buyers, creating a vibrant marketplace where every automotive dream finds its match. <br />

// At Autovibe, we understand the excitement and significance of finding the perfect vehicle. Whether you're a seller looking to showcase your prized possession or a buyer on the hunt for your next adventure companion, we're here to make the journey smooth and enjoyable.<br />

// Our platform is designed to empower both sellers and buyers, offering intuitive tools and features to streamline the process. Sellers can easily create listings with detailed descriptions and eye-catching visuals, ensuring their vehicles stand out in the crowd. Meanwhile, buyers can browse through a diverse selection of vehicles, narrowing down their search based on preferences and requirements.<br />
// </p>
// <h1 className='text-center my-7 font-bold text-[20px]'> Why Choose Autovibe?</h1>
// <ul className='list-disc relative'>

// <li className='font-bold ml-7'>Diverse Selection:</li> From sleek sedans to rugged SUVs, our platform hosts a wide range of vehicles to suit every taste and budget.

// <li className='font-bold ml-7'>Transparent Transactions:</li> We prioritize transparency and honesty in every transaction, fostering trust and confidence between buyers and sellers.

// <li className='font-bold ml-7'>User-Friendly Interface:</li> Our intuitive interface makes navigating the platform a breeze, whether you're listing a vehicle or searching for your dream ride.

// <li className='font-bold ml-7'>Dedicated Support:</li> Have a question or need assistance? Our friendly support team is here to help every step of the way.

// </ul>

// Get in Touch
// Have a question or feedback about Autovibe? <br /> We'd love to hear from you! <br />Fill out the contact form below, and one of our representatives will get back to you as soon as possible.


//           </p>
//           <div className='bg-[#2c3253] w-[70%] h-[80vh] flex flex-col items-center '>

//       <section className="text-gray-700 body-font relative">
//         <div className="container px-5 py-12 mx-auto">
//           <div className="flex flex-col text-center w-full mb-12">
//             <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
//               Contact <span className='text-[#00D8FF]'>Us</span> 
//             </h1>
          
//           </div>
//           <div className="lg:w-1/2 md:w-2/3 mx-auto">
//           <form ref={form} onSubmit={notify}>
//             <div className="flex flex-wrap -m-2">
           
//               <div className="p-2 w-1/2">
             
//                 <div className="relative">
//                   <label for="name" className="leading-7 text-sm text-gray-300">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="AutoVibes"
//                     className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//                   />
//                 </div>
//               </div>
//               <div className="p-2 w-1/2">
//                 <div className="relative">
//                   <label
//                     for="email"
//                     className="leading-7 text-sm text-gray-300"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="from_name"
//                     className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//                   />
//                 </div>
//               </div>
//               <div className="p-2 w-full">
//                 <div className="relative">
//                   <label
//                     for="message"
//                     className="leading-7 text-sm text-gray-300"
//                   >
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="p-2 w-full">
//               <input className='relative cursor-pointer w-[110px] h-[45px] rounded-lg text-white bg-slate-400 hover:bg-[#65949d] active:mt-[7px] transition-all ease-in-out'  type="submit" value="Send" />
//                   <ToastContainer />
//               </div>
            
//             </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </div>

//         </div>
//       </div>
//     </div>
// )
}

export default About
