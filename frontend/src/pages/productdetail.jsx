import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import api from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import ReactWhatsapp from 'react-whatsapp';
import { GiClick } from "react-icons/gi";
import { FaHeart, FaStar, FaPencilAlt, FaTrash, FaCheckCircle } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import { GiGearStick } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import Relatedproduct from "../components/RelatedProduct";

const Productdetail = () => {
  const params = useParams();
  const home = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [sold, setsold] = useState();
  const [email, setemail] = useState('');
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
  const [click, setclick] = useState('');
  const [like, setlike] = useState('');
  const [year, setyear] = useState('');
  const [fuel, setfuel] = useState('');
  const [transmission, settransmission] = useState('');
  const [condition, setcondition] = useState('');
  const [mileage, setmileage] = useState('');

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setchat(true);
    }
  }, []);

  // ── SAME AS YOUR ORIGINAL ──
  const productdetails = async () => {
    try {
      await api.get(`/products/productdetail/${params._id}`).then((res) => {
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
        if (DBuserid === LSuserid) { setbutton(true); }
      });
    } catch (error) { console.log(error); }
  };

  const editproduct = async () => setedit(true);

  // ── SAME AS YOUR ORIGINAL ──
  const updateproduct = async () => {
    setedit(false);
    const userId = localStorage.getItem("id");
    const formData = new FormData();
    if (sold == true) {
      confirm("Are You Sure This Vehicle Available For Selling ?");
      formData.append("sold", false);
    } else {
      confirm("Are You Sure This Vehicle is Sold ?");
      formData.append("sold", true);
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
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      await api.patch(`/products/updateproduct/${params._id}`, formData, config)
        .then((res) => {
          console.log(res);
          if (res.status === 200) { productdetails(); }
        });
    } catch (error) { console.error(error); }
  };

  // ── SAME AS YOUR ORIGINAL ──
  const deleteproduct = async () => {
    try {
      await api.delete(`/products/deleteproduct/${params._id}`).then((res) => {
        console.log(res);
        if (res.status === 200) { home("/"); }
      });
    } catch (error) { console.log(error); }
  };

  // ── SAME AS YOUR ORIGINAL ──
  useEffect(() => {
    productdetails();
    const getclick = async () => {
      await api.get(`productclick/getclick/${params._id}`).then((res) => {
        setclick(res.data.data.click);
        setlike(res.data.data.like);
      });
    };
    getclick();
  }, [params]);

  const inputClass = `w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700
    placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
    focus:border-transparent transition duration-200`;
  const labelClass = `block text-sm font-medium text-gray-700 mb-1.5`;

  const specs = [
    { icon: '🎨', label: "Color", value: color },
    { icon: '🏷️', label: "Brand", value: brand },
    { icon: '📍', label: "City", value: registered },
    { icon: '⚙️', label: "Engine", value: engine ? `${engine}CC` : '' },
    { icon: '🔧', label: "Transmission", value: "Automatic" },
    { icon: '📅', label: "Year", value: "2023" },
  ];

  return (
    <>
      {/* ── EDIT FORM ── */}
      {edit && (
        <div className="min-h-screen bg-[#f6f8fc]">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">

            {/* HEADER */}
            <div className="mb-6">
              <button
                onClick={() => setedit(false)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <div className="mt-3">
                <h1 className="text-3xl font-bold text-[#0a1f5c]">Edit Your Vehicle</h1>
                <p className="text-gray-500 mt-1 text-sm">Update your listing details below.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

              {/* LEFT SIDE */}
              <div className="xl:col-span-2 space-y-6">

                {/* VEHICLE INFO */}
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                  <h2 className="text-base font-bold text-[#0a1f5c] mb-4">🚗 Vehicle Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Vehicle Name</label>
                      <input
                        type="text"
                        value={name}
                        placeholder="Honda Civic RS Turbo"
                        onChange={(e) => setname(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand</label>
                      <div className="relative">
                        <select
                          value={brand}
                          onChange={(e) => setbrand(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 appearance-none"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Color</label>
                      <input
                        type="text"
                        value={color}
                        placeholder="Crystal Black"
                        onChange={(e) => setcolor(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Condition</label>
                      <select
                        onChange={(e) => setcondition(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 appearance-none"
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
                  <h2 className="text-base font-bold text-[#0a1f5c] mb-4">⚙️ Specifications</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Year</label>
                      <input
                        type="number"
                        value={year}
                        placeholder="2024"
                        onChange={(e) => setyear(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Engine</label>
                      <input
                        type="text"
                        value={engine}
                        placeholder="1800CC"
                        onChange={(e) => setengine(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Fuel</label>
                      <select
                        onChange={(e) => setfuel(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Electric">Electric</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Transmission</label>
                      <select
                        onChange={(e) => settransmission(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="bg-white border border-gray-100 mt-[65px] rounded-3xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                  <h2 className="text-base font-bold text-[#0a1f5c] mb-4">📝 Description</h2>
                  <textarea
                    rows={6}
                    value={description}
                    placeholder="Describe vehicle condition, features, maintenance history, reason for selling..."
                    onChange={(e) => setdescription(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                  />
                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-6">

                {/* IMAGE UPLOAD */}
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                  <h2 className="text-base font-bold text-[#0a1f5c] mb-4">📸 Upload Photos</h2>
                  <div
                    onClick={() => document.getElementById('editFileInput').click()}
                    className={`
                h-[200px] border-2 border-dashed rounded-3xl
                flex items-center justify-center cursor-pointer
                transition-all duration-200
                ${image && typeof image === 'object'
                        ? 'border-blue-400 p-2'
                        : 'border-gray-200 hover:border-blue-400 bg-gray-50'
                      }
              `}
                  >
                    {image && typeof image === 'object' ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        className="h-full w-full object-contain rounded-2xl"
                      />
                    ) : image && typeof image === 'string' ? (
                      <img
                        src={`http://localhost:6500/${image}`}
                        alt="preview"
                        className="h-full w-full object-contain rounded-2xl"
                      />
                    ) : (
                      <div className="text-center px-4">
                        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                          <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-700">Upload vehicle image</p>
                        <p className="text-xs text-gray-400 mt-1">Drag & drop or click</p>
                      </div>
                    )}
                  </div>
                  <input
                    id="editFileInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setimage(e.target.files[0])}
                    className="hidden"
                  />
                </div>

                {/* PRICING & CONTACT */}
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                  <h2 className="text-base font-bold text-[#0a1f5c] mb-4">💰 Pricing & Contact</h2>
                  <div className="space-y-4">

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Price</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                          PKR
                        </span>
                        <input
                          type="number"
                          value={price}
                          placeholder="2,500,000"
                          onChange={(e) => setprice(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl pl-14 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Mileage</label>
                      <input
                        type="number"
                        value={mileage}
                        placeholder="45000 KM"
                        onChange={(e) => setmileage(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Registered City</label>
                      <input
                        type="text"
                        value={registered}
                        placeholder="Lahore"
                        onChange={(e) => setregistered(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">WhatsApp Number</label>
                      <PhoneInput
                        defaultCountry="pk"
                        value={ContactNumber}
                        onChange={(phone) => setContactNumber(phone)}
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
            <div className="sticky bottom-4 z-50 flex gap-3 mt-6">
              <button
                onClick={updateproduct}
                className="w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition-all duration-200 active:scale-[0.99] shadow-lg"
              >
                Save Changes →
              </button>
              <button
                onClick={() => setedit(false)}
                className="px-8 border border-gray-200 text-gray-600 font-medium py-4 rounded-2xl text-sm hover:border-gray-300 transition"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── PRODUCT DETAIL PAGE ── */}
      {!edit && (
        <div className="min-h-screen bg-white">

          {/* Breadcrumb */}
          <div className="px-4 sm:px-8 lg:px-16 py-4 border-b border-gray-100">
            <nav className="flex items-center gap-2 text-sm text-gray-400">
              <NavLink to="/" className="hover:text-blue-600 transition">Inventory</NavLink>
              <span>›</span>
              <span className="text-gray-500">{brand}</span>
              <span>›</span>
              <span className="text-[#0a1f5c] font-medium">{name}</span>
            </nav>
          </div>

          <div className="px-4 sm:px-8 lg:px-16 py-8">
            <div className="flex flex-col lg:flex-row gap-10">

              {/* ── LEFT: IMAGE ── */}
              <div className="lg:w-[55%] flex flex-col gap-4">
                <div className="relative rounded-2xl overflow-hidden bg-gray-50">
                  {sold && (
                    <div className="absolute top-4 left-4 z-10 bg-[#0a1f5c] text-white
                                    text-xs font-bold uppercase tracking-wider
                                    px-3 py-1.5 rounded-lg">
                      Certified Pre-Owned
                    </div>
                  )}
                  <button className="absolute top-4 right-4 z-10 w-9 h-9 bg-white rounded-full
                                     shadow-md flex items-center justify-center hover:scale-110 transition">
                    <FaHeart className="text-gray-300 hover:text-red-500 transition" />
                  </button>
                  <img src={`http://localhost:6500/${image}`} alt={name}
                    className="w-full aspect-[4/3] object-cover" />
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-xl overflow-hidden border-2 border-transparent
                                            hover:border-blue-500 cursor-pointer transition aspect-square bg-gray-100">
                      <img src={`http://localhost:6500/${image}`} alt=""
                        className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: DETAILS ── */}
              <div className="lg:w-[45%] flex flex-col gap-5">

                {/* Name + Price + Stars */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-[#0a1f5c]">{name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FaStar key={s}
                          className={`text-sm ${s <= 4 ? "text-yellow-400" : "text-gray-200"}`} />
                      ))}
                      <span className="text-gray-400 text-xs ml-1">4.8 (124 reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["Coupe", "2023", "Automatic", color].filter(Boolean).map((tag) => (
                        <span key={tag}
                          className="text-xs border border-gray-200 text-gray-600 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-3xl font-bold text-[#0a1f5c]">${price}</p>
                    <p className="text-gray-400 text-sm">/day</p>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {specs.map((spec) => (
                    <div key={spec.label}
                      className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 border border-gray-100">
                      <span className="text-gray-400 text-lg">{spec.icon}</span>
                      <div>
                        <p className="text-gray-400 text-[10px] uppercase tracking-wider">{spec.label}</p>
                        <p className="text-[#0a1f5c] font-semibold text-sm">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-[#0a1f5c] font-bold text-base mb-2">Description</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </div>

                {/* Contact Buttons — SAME logic as your original */}
                <div className="flex gap-3">
                  {ContactNumber && (
                    <ReactWhatsapp number={ContactNumber} message="Hello how are you!!!"
                      className="flex-1">
                      <div className="w-full flex items-center justify-center gap-2
                                      bg-green-500 hover:bg-green-600 text-white font-semibold
                                      py-3 rounded-xl text-sm transition cursor-pointer">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Chat on WhatsApp
                      </div>
                    </ReactWhatsapp>
                  )}
                  {/* SAME as your original: mailto: ${email} */}
                  <a href={`mailto: ${email}`} className="flex-1">
                    <button className="w-full flex items-center justify-center gap-2
                                       bg-[#0a1f5c] hover:bg-blue-800 text-white font-semibold
                                       py-3 rounded-xl text-sm transition active:scale-95">
                      <IoMail className="text-lg" />
                      Send Email
                    </button>
                  </a>
                </div>

                {/* Owner only — SAME button condition as your original */}
                {button && (
                  <div className="flex flex-col gap-4">

                    {/* Stats — SAME data: click, like from getclick API */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#e8f7f8] border border-[#b2e4e8] rounded-xl p-4 text-center">
                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Click</p>
                        <div className="flex items-center justify-center gap-2">
                          <GiClick className="text-[#0a1f5c] text-2xl" />
                          <span className="text-[#0a1f5c] font-bold text-3xl">{click}</span>
                        </div>
                      </div>
                      <div className="bg-[#e8f7f8] border border-[#b2e4e8] rounded-xl p-4 text-center">
                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Likes</p>
                        <div className="flex items-center justify-center gap-2">
                          <FaHeart className="text-red-400 text-xl" />
                          <span className="text-[#0a1f5c] font-bold text-3xl">{like}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons — SAME functions: editproduct, deleteproduct, updateproduct */}
                    <div className="grid grid-cols-3 gap-3">
                      <button onClick={editproduct}
                        className="flex flex-col items-center gap-1.5 bg-amber-50 hover:bg-amber-100
                                   border border-amber-200 text-amber-600 font-semibold
                                   py-3 rounded-xl text-xs transition active:scale-95">
                        <FaPencilAlt className="text-base" />
                        Edit Product
                      </button>
                      <button onClick={deleteproduct}
                        className="flex flex-col items-center gap-1.5 bg-red-50 hover:bg-red-100
                                   border border-red-200 text-red-500 font-semibold
                                   py-3 rounded-xl text-xs transition active:scale-95">
                        <FaTrash className="text-base" />
                        Delete Product
                      </button>
                      {/* SAME as your original: sold ? "Available Vehicle" : "Sell Out" */}
                      <button onClick={updateproduct}
                        className="flex flex-col items-center gap-1.5 bg-[#0a1f5c] hover:bg-blue-800
                                   text-white font-semibold py-3 rounded-xl text-xs
                                   transition active:scale-95">
                        <FaCheckCircle className="text-base" />
                        {sold ? "Available Vehicle" : "Sell Out"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Chat Button — SAME logic as your original */}
                <NavLink to={chat ? `/chat/${params._id}` : "/signin"}>
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#0a1f5c]
                                     font-bold py-3.5 rounded-xl text-sm transition active:scale-95">
                    💬 Chating.....
                  </button>
                </NavLink>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Products — SAME as your original */}
      <div className="px-4 sm:px-8 lg:px-16 py-10 bg-gray-50">
        <Relatedproduct Category={brand} productId={params} />
      </div>
    </>
  );
};

export default Productdetail;




