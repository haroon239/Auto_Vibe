import React, { useState, useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { IoMdFingerPrint } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrValidate } from "react-icons/gr";
import { MdError } from "react-icons/md";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { data } from "autoprefixer";

const Signup = () => {
  const Signin = useNavigate();
  const [email, setemail] = useState();
  const [fullname, setfullname] = useState();
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [validemail, setvalidemail] = useState(false);
  const [validfullname, setvalidfullname] = useState();
  const [validusername, setvalidusername] = useState();
  const [duplicat, setduplicate] = useState();
  const [alert, setalert] = useState();

  const emailvalidation = (e) => {
    setemail(e.target.value);
  };
  useEffect(() => {
    if (username) {
      var pattern = /^[a-zA-Z0-9_]+$/;
      if (username.match(pattern)) {
        console.log("true");
        setvalidusername(true);
      } else {
        console.log("false");
        setvalidusername(false);
      }
    }
  }, [username]);

  useEffect(() => {
    if (fullname) {
      var pattern = /^[A-Za-z]+(?:[ \-'`]+[A-Za-z]+)*$/;
      if (fullname.match(pattern)) {
        console.log("true");
        setvalidfullname(true);
      } else {
        console.log("false");
        setvalidfullname(false);
      }
    }
  }, [fullname]);

  useEffect(() => {
    if (email) {
      var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (email.match(pattern)) {
        console.log("true");
        setvalidemail(true);
      } else {
        console.log("false");
        setvalidemail(false);
      }
    }
  }, [email]);

  useEffect(() => {
    if (duplicat) {
      setalert(true);

      const timer = setTimeout(() => {
        setalert(false);
        setduplicate();
      }, 2000);

      // Clear the timeout if the component unmounts before the timeout completes
    }
  }, [duplicat]);

  const registered = async (e) => {
    e.preventDefault();
    const formdata = {
      fullname: fullname,
      username: username,
      email: email,
      password: password,
    };
    console.log("submit successfull", formdata);
    if (validemail) {
      try {
        await axios
          .post("http://localhost:6500/signup", formdata)
          .then((res) => {
            console.log(res);
            if (res.data.status == 200) {
              Signin("/signin");
            }
            if (
              res.data.code === 11000 &&
              res.data.keyPattern &&
              res.data.keyValue
            ) {
              setduplicate(JSON.stringify(res.data.keyValue));
              console.log("this data is already exist : ", res.data.keyValue);
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-black  i justify-around items-center hidden">
        <div className="px-[13%]">
          <h1 className="text-white font-bold text-4xl font-sans mb-5">
            Welcome AutoVibes
          </h1>
          <p className="text-white mt-1">
            Unlock a world of automotive opportunities! Sign up now to buy,
            sell, or rent cars hassle-free. Your personalized dashboard awaits -
            simplified transactions, easy connections. Join today for a seamless
            car experience!
          </p>
          {/* <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button> */}
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white" onSubmit={registered}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">REGISTER</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

          {/* Alert of any error */}
          {alert ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">alert! Already exist :</span>{" "}
                {duplicat}
              </div>
            </div>
          ) : (
            ""
          )}

          {/* inputs */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <IoPerson />
            <input
              className="pl-2 outline-none border-none"
              type="text"
              placeholder="Full name"
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
            />
            {validfullname ? (
              <GrValidate className="text-green-400" />
            ) : (
              <MdError className="text-red-600" />
            )}
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <IoMdFingerPrint />
            <input
              className="pl-2 outline-none border-none"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            {validusername ? (
              <GrValidate className="text-green-400" />
            ) : (
              <MdError className="text-red-600" />
            )}
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <MdAlternateEmail />
            <input
              className="pl-2 outline-none border-none"
              type="email"
              placeholder="Email Address"
              autoComplete="off"
              onChange={emailvalidation}
            />
            {validemail ? (
              <GrValidate className="text-green-400" />
            ) : (
              <MdError className="text-red-600" />
            )}
          </div>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <RiLockPasswordFill />
            <input
              className="pl-2 outline-none border-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Registration
          </button>
          {/* <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span> */}
          <NavLink to="/signin">
            {" "}
            <button className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">
              SignIn
            </button>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Signup;
