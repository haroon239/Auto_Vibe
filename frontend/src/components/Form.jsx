import React from 'react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import axios from 'axios';

const Form = () => {
  const home = useNavigate();
  const signin = useNavigate();
  const payment = useNavigate()
  const [image, setimage] = useState('');
  const [name, setname] = useState('');
  const [color, setcolor] = useState('');
  const [category, setcategory] = useState('');
  const [price, setprice] = useState();
  const [registered, setregistered] = useState('');
  const [engine, setengine] = useState('');
  const [number, setnumber] = useState('');
  const [phone, setPhone] = useState('')
  const [description, setdescription] = useState('');


  const userId = localStorage.getItem('id');
  useEffect(() => {
    if (!localStorage.getItem('Token')) {
      signin('/signin');
    }
  }, [])



  
  const formvalidation = async (e) => {
    alert("formvalidation")
    // e.preventDefault();

    const paymentverified = await axios.get(`http://localhost:6500/getpayments/${userId}`);
    const status = paymentverified.data.status;
    console.log(paymentverified.data.status, "paymentverifiend");
    if (status == 200) {
      const token = localStorage.getItem('Token');
      if (token) {

        const formdata = new FormData();
        formdata.append('image', image);
        formdata.append('name', name);
        formdata.append('color', color);
        formdata.append('category', category);
        formdata.append('price', price);
        formdata.append('registered', registered);
        formdata.append('engine', engine);
        formdata.append('number', phone);
        formdata.append('description', description);
        formdata.append('id', userId);


        try {

          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };
          const product = await axios.post('http://localhost:6500/products', formdata, config);
          if (product.status === 201) {
            const updateProduct = await axios.patch(`http://localhost:6500/user/${userId}`);
            console.log(updateProduct);
            if (updateProduct.status === 200) {
              home('/');
            }
          }

        } catch (error) {
          console.log(error)
        }
      } else {
        signin("/signin")
      }
    } else {
      payment("/seller/payments");
    }


  }

  return (
    <>
      <style>
        {`.custom-phone-input .react-international-phone-country-selector {
          margin-right: 8px;`}

      </style>
      <div className="min-h-screen bg-[#f6f8fc]">

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">

          {/* HEADER */}
          <div className="mb-6">

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>

              Back
            </button>

            <div className="mt-3">
              <h1 className="text-3xl font-bold text-[#0a1f5c]">
                Sell Your Vehicle
              </h1>

              <p className="text-gray-500 mt-1 text-sm">
                Create a professional listing and connect with buyers faster.
              </p>
            </div>
          </div>

          <form onSubmit={formvalidation} className="space-y-6">

            {/* TOP GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

              {/* LEFT SIDE */}
              <div className="xl:col-span-2 space-y-6">

                {/* VEHICLE INFO */}
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">

                  <h2 className={sectionTitle}>
                    🚗 Vehicle Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                      <label className={labelClass}>Vehicle Name</label>

                      <input
                        type="text"
                        placeholder="Honda Civic RS Turbo"
                        onChange={(e) => setname(e.target.value)}
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Brand</label>

                      <div className="relative">

                        <select
                          onChange={(e) => setcategory(e.target.value)}
                          className={selectClass}
                          required
                        >
                          <option value="">Select brand</option>
                          <option value="Audi">Audi</option>
                          <option value="BMW">BMW</option>
                          <option value="Honda">Honda</option>
                          <option value="Hyundai">Hyundai</option>
                          <option value="Kia">Kia</option>
                          <option value="MG">MG</option>
                          <option value="Suzuki">Suzuki</option>
                          <option value="Tesla">Tesla</option>
                          <option value="Toyota">Toyota</option>
                        </select>

                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Color</label>

                      <input
                        type="text"
                        placeholder="Crystal Black"
                        onChange={(e) => setcolor(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Condition</label>

                      <select
                        onChange={(e) => setcondition(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select</option>
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                        <option value="Certified">Certified</option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* SPECIFICATIONS */}
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">

                  <h2 className={sectionTitle}>
                    ⚙️ Specifications
                  </h2>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                    <div>
                      <label className={labelClass}>Year</label>

                      <input
                        type="number"
                        placeholder="2024"
                        onChange={(e) => setyear(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Engine</label>

                      <input
                        type="text"
                        placeholder="1800CC"
                        onChange={(e) => setengine(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Fuel</label>

                      <select
                        onChange={(e) => setfuel(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Electric">Electric</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Transmission</label>

                      <select
                        onChange={(e) => settransmission(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select</option>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="bg-white border mt-[65px] border-gray-100 rounded-3xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">

                  <h2 className={sectionTitle}>
                    📝 Description
                  </h2>

                  <textarea
                    rows={6}
                    placeholder="Describe vehicle condition, features, maintenance history, reason for selling..."
                    onChange={(e) => setdescription(e.target.value)}
                    className={`${inputClass} resize-none`}
                  />

                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-6">

                {/* IMAGE UPLOAD */}
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">

                  <h2 className={sectionTitle}>
                    📸 Upload Photos
                  </h2>

                  <div
                    onClick={() => fileRef.current.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className={`
                      h-[200px] border-2 border-dashed rounded-3xl
                      flex items-center justify-center cursor-pointer
                      transition-all duration-200
                      ${preview
                        ? 'border-blue-400 p-2'
                        : 'border-gray-200 hover:border-blue-400 bg-gray-50'
                      }
                    `}
                  >

                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        className="h-full w-full object-contain rounded-2xl"
                      />
                    ) : (
                      <div className="text-center px-4">

                        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">

                          <svg
                            className="w-7 h-7 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                            />
                          </svg>

                        </div>

                        <p className="text-sm font-medium text-gray-700">
                          Upload vehicle image
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Drag & drop or click
                        </p>

                      </div>
                    )}

                  </div>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />

                </div>

                {/* PRICING */}
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">

                  <h2 className={sectionTitle}>
                    💰 Pricing & Contact
                  </h2>

                  <div className="space-y-4">

                    <div>
                      <label className={labelClass}>Price</label>

                      <div className="relative">

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                          PKR
                        </span>

                        <input
                          type="number"
                          placeholder="2,500,000"
                          onChange={(e) => setprice(e.target.value)}
                          className={`${inputClass} pl-14`}
                          required
                        />

                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Mileage</label>

                      <input
                        type="number"
                        placeholder="45000 KM"
                        onChange={(e) => setmileage(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Registered City</label>

                      <input
                        type="text"
                        placeholder="Lahore"
                        onChange={(e) => setregistered(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>WhatsApp Number</label>

                      <PhoneInput
                        defaultCountry="pk"
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                        style={{ width: '100%' }}
                        className="custom-phone-input"
                        inputStyle={{
                          width: '100%',
                          border: '1px solid #e5e7eb',
                          borderRadius: '1rem',
                          fontSize: '14px',
                          padding: '12px 16px',
                          height: '46px',

                        }}
                      />
                    </div>

                  </div>

                </div>




              </div>

            </div>

            {/* STICKY SUBMIT */}
            <div className="sticky bottom-4 z-50 ">

              <button
                type="submit"
                disabled={loading}
                className="
                  w-[200px] bg-blue-600 hover:bg-blue-700
                  text-white font-semibold py-4 rounded-2xl
                  transition-all duration-200
                  active:scale-[0.99]
                  shadow-lg disabled:opacity-60
                "
              >
                {loading ? 'Submitting...' : 'Submit Listing →'}
              </button>

            </div>

          </form>
          {/* TRUST */}
          <div className="bg-gradient-to-br  rounded-3xl p-2 text-black mt-10">



            <div className="  text-sm flex justify-around">

              <div className="flex items-center gap-3 text-center">
                <span className="text-xl">🛡️</span>
                <p>Verified buyers & secure listings</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl">👁️</span>
                <p>Thousands of daily visitors</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl">⚡</span>
                <p>Fast listing approval process</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Form