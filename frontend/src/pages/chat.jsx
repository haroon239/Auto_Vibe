import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {  useNavigate, useParams } from 'react-router-dom';
import profile from '../assets/profile.png'
import axios from 'axios';

const Chat = () => {
  const params = useParams();
  const navigation=useNavigate()
  const productId = params.productid;
  
  const [socket, setSocket] = useState(null);
  const [openchat, setopenchat]=useState(true);
  const [chatFetched, setChatFetched] = useState(false);
  const [chatid, setChatId] = useState('');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [seller, setseller]=useState(false);
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
console.log(messages, ".....alll.....");
  useEffect(() => {
if(!localStorage.getItem('Token')){
  navigation('/signin');
}

    const newSocket = io('http://localhost:6500', {
      query: { userId: localStorage.getItem('id') }
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Set up a listener for the 'message' event
    socket.on('message', (data) => {
      // Update the messages state with the new message
      console.log(data, ".....data.....");
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);


   useEffect(()=>{
      const fetchproductseller=async ()=>{
      const product = await axios.get(`http://localhost:6500/productdetail/${productId}`);
      // setseller( product.data.data.user);

      const seller = product.data.data.user._id;
      console.log(seller, "seller......");
      if (seller === localStorage.getItem('id')) {
        setseller(true);
        setopenchat(false);
      }
}
fetchproductseller();
  },[])

  const sendMsg = async () => {
    try {
       const product = await axios.get(`http://localhost:6500/productdetail/${productId}`);
      // setseller( product.data.data.user);

      const seller = product.data.data.user._id;
      const userId = localStorage.getItem('id');

      let data;
      if (seller === localStorage.getItem('id')) {
        data = {
          username: localStorage.getItem('username'),
          message: msg,
          productid: productId,
          sender: seller,
          receiver: chatid
        };
      } else {
        data = {
          username: localStorage.getItem('username'),
          message: msg,
          productid: productId,
          sender: userId, 
          receiver: seller
        };
      }

      await axios.post("http://localhost:6500/sendmessage", data);

      if (socket) {
        socket.emit('sendmessage', data, (acknowledgment) => {
          if (acknowledgment.success) {
            console.log('Message sent:', acknowledgment.message);
          } else {
            console.error('Message sending failed:', acknowledgment.message);
          }
        });
      }

      setMsg('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

 useEffect(() => {
  if (openchat && !chatFetched) {
     const userid= localStorage.getItem('id');
    getChat(userid);
    setChatFetched(true);
  }
}, [openchat, chatFetched]);

  const getChat = async (userid, name) => {
    setChatId(userid);
    setName(name);
    setopenchat(true);
    try {
      setMessages([]);
      const res = await axios.get(`http://localhost:6500/getmessage/${productId}/${userid}`);
      setMessages(res.data.messages[0].message)
      console.log(res.data.messages[0].message, "....getchat....")
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  // if(openchat){
  //  const userid= localStorage.getItem('id');
  //   getChat(userid);
  // }
  useEffect(() => {
    const getParticipants = async () => {
      try {
        const res = await axios.get(`http://localhost:6500/allparticipants/${productId}`);
        console.log(res.data, ".......getparticipants....")
        setParticipants(res.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };
    getParticipants();
  }, [productId]);

  return (
    <div className=' w-[100%] flex justify-center'>
      <div className='w-[90%] border-solid border-2 border-cyan-950 flex'>
        {/* this is chat user div */}
        <div className='border-solid border-red-500 border-2 m-2 rounded-lg max-h-[579px] overflow-y-auto'>
          {seller && participants.map((user, index) => (
            <div key={index} onClick={() => getChat(user._id, user.username)} className='m-2 p-2 w-[270px] cursor-pointer border-2 border-solid border-black flex items-center'>
              <img src={profile} alt={user.username} className='w-[45px] h-[45px] mr-3' />
              <h3 className='font-bold'>{user.username}</h3>
            </div>
          ))}
        </div>

        {/* this is chating div */}
        <div className='relative rounded-lg w-[60%] m-2 h-[90vh] border-solid border-2 border-sky-500'>
          {/* profile name and logo */}
      { openchat &&   <div>
          <div className='flex item-center rounded-lg h-[50px] m-3 border-solid border-2 border-black'>
            <img src={profile} className='mt-[3px] ml-[15px] w-[40
px] h-[40px]' alt="" />
<h2 className='py-[9px] px-[10px]'>{name}</h2>
</div>

{/* all messages */}
 {/* {console.log("openchat:", openchat)} */}
<div className='container flex flex-col overflow-auto w-[90%] h-[67vh] ml-[20px]  border-solid border-2 border-black'>
{ messages && messages.length > 0 && messages.map((item, index) => {
  if (item.sender === localStorage.getItem('id') || item.user== localStorage.getItem('id')) {
    return (
      <div className='flex justify-end ' key={index}>
        <p className='text-white p-2 pl-3 text-left rounded-l-lg rounded-tr-lg min-w-[8%] max-w-[60%] m-[3px]  bg-[#098C31]'> {item.username}: {item.message}</p>
      </div>
    )
  }
  else{
    return (
      <div className='flex justify-start' key={index}>
        <p className='text-white p-2 pl-3 text-left rounded-r-lg rounded-tl-lg min-w-[8%] max-w-[60%] m-[3px]  bg-slate-700'> {item.username}: {item.message}</p>
      </div>
    )
  }
})}

</div>

{/* profile input and send button */}
<div className='absolute ml-[20px] w-[90%] bottom-0 flex item-center rounded-lg h-[50px] m-3 border-solid border-2 border-black'>
<input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} className=' outline-none focus:outline-none w-[75%] pl-[10px]' placeholder='write something' />
<div className='w-[90px] bg-yellow-400 flex p-[10px] items-center'>
  <button onClick={sendMsg} className='text-[20px] font-bold'>Send</button>
</div>
</div>
</div>}
</div>

</div>
</div>
)
}

export default Chat;

























// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { useNavigate, useParams } from "react-router-dom";
// import profile from "../assets/profile.png";
// import axios from "axios";

// const Chat = () => {
//   const params = useParams();
//   const navigation = useNavigate();
//   const productId = params.productid;

//   const [socket, setSocket] = useState(null);
//   const [openchat, setopenchat] = useState(true);
//   const [chatFetched, setChatFetched] = useState(false);
//   const [chatid, setChatId] = useState("");
//   const [name, setName] = useState("");
//   const [msg, setMsg] = useState("");
//   const [seller, setseller] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [participants, setParticipants] = useState([]);
//   console.log(messages, ".....alll.....");
//   useEffect(() => {
//     if (!localStorage.getItem("Token")) {
//       navigation("/signin");
//     }

//     const newSocket = io("http://localhost:6500", {
//       query: { userId: localStorage.getItem("id") },
//     });
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     if (!socket) return;

//     // Set up a listener for the 'message' event
//     socket.on("message", (data) => {
//       // Update the messages state with the new message
//       console.log(data, ".....data.....");
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       socket.off("message");
//     };
//   }, [socket]);

//   useEffect(() => {
//     const fetchproductseller = async () => {
//       const product = await axios.get(
//         `http://localhost:6500/productdetail/${productId}`
//       );
//       // setseller( product.data.data.user);

//       const seller = product.data.data.user;
//       if (seller === localStorage.getItem("id")) {
//         setseller(true);
//         setopenchat(false);
//       }
//     };
//     fetchproductseller();
//   }, []);

//   const sendMsg = async () => {
//     try {
//       const product = await axios.get(
//         `http://localhost:6500/productdetail/${productId}`
//       );
//       // setseller( product.data.data.user);

//       const seller = product.data.data.user;
//       const userId = localStorage.getItem("id");

//       let data;
//       if (seller === localStorage.getItem("id")) {
//         data = {
//           username: localStorage.getItem("username"),
//           message: msg,
//           productid: productId,
//           sender: seller,
//           receiver: chatid,
//         };
//       } else {
//         data = {
//           username: localStorage.getItem("username"),
//           message: msg,
//           productid: productId,
//           sender: userId,
//           receiver: seller,
//         };
//       }

//       await axios.post("http://localhost:6500/sendmessage", data);

//       if (socket) {
//         socket.emit("sendmessage", data, (acknowledgment) => {
//           if (acknowledgment.success) {
//             console.log("Message sent:", acknowledgment.message);
//           } else {
//             console.error("Message sending failed:", acknowledgment.message);
//           }
//         });
//       }

//       setMsg("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   useEffect(() => {
//     if (openchat && !chatFetched) {
//       const userid = localStorage.getItem("id");
//       getChat(userid);
//       setChatFetched(true);
//     }
//   }, [openchat, chatFetched]);

//   const getChat = async (userid, name) => {
//     setChatId(userid);
//     setName(name);
//     setopenchat(true);
//     try {
//       setMessages([]);
//       const res = await axios.get(
//         `http://localhost:6500/getmessage/${productId}/${userid}`
//       );
//       setMessages(res.data.messages[0].message);
//       console.log(res.data.messages[0].message, "....getchat....");
//     } catch (error) {
//       console.error("Error fetching chat:", error);
//     }
//   };

//   // if(openchat){
//   //  const userid= localStorage.getItem('id');
//   //   getChat(userid);
//   // }
//   useEffect(() => {
//     const getParticipants = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:6500/allparticipants/${productId}`
//         );
//         console.log(res.data, ".......getparticipants....");
//         setParticipants(res.data);
//       } catch (error) {
//         console.error("Error fetching participants:", error);
//       }
//     };
//     getParticipants();
//   }, [productId]);

//   return (
//     <div className=" w-[100%] flex justify-center">
//       <div className="w-[90%] border-solid border-2 border-cyan-950 flex">
//         {/* this is chat user div */}
//         <div className="border-solid border-red-500 border-2 m-2 rounded-lg max-h-[579px] overflow-y-auto">
//           {seller &&
//             participants.map((user, index) => (
//               <div
//                 key={index}
//                 onClick={() => getChat(user._id, user.username)}
//                 className="m-2 p-2 w-[270px] cursor-pointer border-2 border-solid border-black flex items-center"
//               >
//                 <img
//                   src={profile}
//                   alt={user.username}
//                   className="w-[45px] h-[45px] mr-3"
//                 />
//                 <h3 className="font-bold">{user.username}</h3>
//               </div>
//             ))}
//         </div>

//         {/* this is chating div */}
//         <div className="relative rounded-lg w-[60%] m-2 h-[90vh] border-solid border-2 border-sky-500">
//           {/* profile name and logo */}
//           {openchat && (
//             <div>
//               <div className="flex item-center rounded-lg h-[50px] m-3 border-solid border-2 border-black">
//                 <img
//                   src={profile}
//                   className="mt-[3px] ml-[15px] w-[40
// px] h-[40px]"
//                   alt=""
//                 />
//                 <h2 className="py-[9px] px-[10px]">{name}</h2>
//               </div>

//               {/* all messages */}
//               {/* {console.log("openchat:", openchat)} */}
//               <div className="container flex flex-col overflow-auto w-[90%] h-[67vh] ml-[20px]  border-solid border-2 border-black">
//                 {messages &&
//                   messages.length > 0 &&
//                   messages.map((item, index) => {
//                     if (
//                       item.sender === localStorage.getItem("id") ||
//                       item.user == localStorage.getItem("id")
//                     ) {
//                       return (
//                         <div className="flex justify-end " key={index}>
//                           <p className="text-white p-2 pl-3 text-left rounded-l-lg rounded-tr-lg min-w-[8%] max-w-[60%] m-[3px]  bg-[#098C31]">
//                             {" "}
//                             {item.username}: {item.message}
//                           </p>
//                         </div>
//                       );
//                     } else {
//                       return (
//                         <div className="flex justify-start" key={index}>
//                           <p className="text-white p-2 pl-3 text-left rounded-r-lg rounded-tl-lg min-w-[8%] max-w-[60%] m-[3px]  bg-slate-700">
//                             {" "}
//                             {item.username}: {item.message}
//                           </p>
//                         </div>
//                       );
//                     }
//                   })}
//               </div>

//               {/* profile input and send button */}
//               <div className="absolute ml-[20px] w-[90%] bottom-0 flex item-center rounded-lg h-[50px] m-3 border-solid border-2 border-black">
//                 <input
//                   type="text"
//                   value={msg}
//                   onChange={(e) => setMsg(e.target.value)}
//                   className=" outline-none focus:outline-none w-[75%] pl-[10px]"
//                   placeholder="write something"
//                 />
//                 <div className="w-[90px] bg-yellow-400 flex p-[10px] items-center">
//                   <button onClick={sendMsg} className="text-[20px] font-bold">
//                     Send
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
