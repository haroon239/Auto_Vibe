import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../utils/axios';

const CURRENT_YEAR = new Date().getFullYear();
const MIN_PRICE = 10000;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const SellingForm = () => {
  const navigate = useNavigate();

  const [image, setimage] = useState('');
  const [preview, setPreview] = useState(null);
  const [name, setname] = useState('');
  const [color, setcolor] = useState('');
  const [category, setcategory] = useState('');
  const [price, setprice] = useState('');
  const [registered, setregistered] = useState('');
  const [engine, setengine] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setdescription] = useState('');
  const [condition, setcondition] = useState('');
  const [year, setyear] = useState('');
  const [fuel, setfuel] = useState('');
  const [transmission, settransmission] = useState('');
  const [mileage, setmileage] = useState('');
  const [loading, setloading] = useState(false);
  const [errors, setErrors] = useState({});

  const fileRef = useRef();
  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (!localStorage.getItem('Token')) {
      navigate('/signin');
    }
  }, [navigate]);

  const clearError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateImageFile = (file) => {
    if (!file) return 'Vehicle image is required.';
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return 'Only JPG, PNG, or WEBP images are allowed.';
    }
    if (file.size > MAX_IMAGE_SIZE) return 'Image must be smaller than 5MB.';
    return '';
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Vehicle name is required.';
    } else if (!/^[A-Za-z0-9\s\-]{2,80}$/.test(name.trim())) {
      newErrors.name = 'Use 2–80 characters: letters, numbers, spaces, or hyphens only.';
    }

    if (!category) {
      newErrors.category = 'Please select a brand.';
    }

    if (color.trim() && !/^[A-Za-z\s]{2,30}$/.test(color.trim())) {
      newErrors.color = 'Color must contain letters and spaces only (2–30 characters).';
    }

    if (!condition) {
      newErrors.condition = 'Please select vehicle condition.';
    }

    const yearNum = Number(year);
    if (!year) {
      newErrors.year = 'Year is required.';
    } else if (!/^\d{4}$/.test(year) || yearNum < 1980 || yearNum > CURRENT_YEAR + 1) {
      newErrors.year = `Enter a valid year between 1980 and ${CURRENT_YEAR + 1}.`;
    }

    if (engine.trim() && !/^[0-9]+(\.[0-9]+)?\s?(CC|cc|L|l)?$/.test(engine.trim())) {
      newErrors.engine = 'Engine format: e.g. 1800CC, 2.0L, or 1500.';
    }

    if (!fuel) {
      newErrors.fuel = 'Please select fuel type.';
    }

    if (!transmission) {
      newErrors.transmission = 'Please select transmission type.';
    }

    const desc = description.trim();
    if (!desc) {
      newErrors.description = 'Description is required.';
    } else if (desc.length < 20) {
      newErrors.description = 'Description must be at least 20 characters.';
    } else if (desc.length > 2000) {
      newErrors.description = 'Description must not exceed 2000 characters.';
    }

    const imageError = validateImageFile(image);
    if (imageError) newErrors.image = imageError;

    const priceNum = Number(price);
    if (!price) {
      newErrors.price = 'Price is required.';
    } else if (!/^\d+$/.test(String(price)) || priceNum < MIN_PRICE) {
      newErrors.price = `Price must be a whole number of at least PKR ${MIN_PRICE.toLocaleString()}.`;
    }

    if (mileage) {
      const mileageNum = Number(mileage);
      if (!/^\d+$/.test(String(mileage)) || mileageNum <= 0 || mileageNum > 10000000) {
        newErrors.mileage = 'Mileage must be a positive whole number (max 10,000,000 KM).';
      }
    }

    if (!registered.trim()) {
      newErrors.registered = 'Registered city is required.';
    } else if (!/^[A-Za-z\s]{2,50}$/.test(registered.trim())) {
      newErrors.registered = 'City must contain letters and spaces only (2–50 characters).';
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (!phone || phoneDigits.length < 10) {
      newErrors.phone = 'Enter a valid phone number with at least 10 digits.';
    }

    return newErrors;
  };

  const processImageFile = (file) => {
    const imageError = validateImageFile(file);
    if (imageError) {
      setErrors((prev) => ({ ...prev, image: imageError }));
      toast.error(imageError);
      return;
    }
    clearError('image');
    setimage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) processImageFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processImageFile(file);
  };

  const formvalidation = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the highlighted errors before submitting.');
      return;
    }

    setloading(true);

    try {
      const paymentverified = await api.get(`/payments/getpayments/${userId}`);
      const status = paymentverified.data.status;

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
          formdata.append('condition', condition);
          formdata.append('year', year);
          formdata.append('fuel', fuel);
          formdata.append('transmission', transmission);
          formdata.append('mileage', mileage);
          formdata.append('id', userId);

          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };

          const product = await api.post('/products', formdata, config);

          if (product.status === 201) {
            const updateProduct = await api.patch(
              `/products/updateproduct/${userId}`
            );

            if (updateProduct.status === 200) {
              navigate('/');
            }
          }
        } else {
          navigate('/signin');
        }
      } else {
        navigate('/seller/payments');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  const inputClass = `
    w-full border border-gray-200 rounded-2xl px-4 py-2.5
    text-sm text-gray-700 placeholder-gray-400 bg-white
    focus:outline-none focus:ring-2 focus:ring-blue-500
    focus:border-transparent transition-all duration-200
  `;

  const inputErrorClass = `
    w-full border border-red-400 rounded-2xl px-4 py-2.5
    text-sm text-gray-700 placeholder-gray-400 bg-white
    focus:outline-none focus:ring-2 focus:ring-red-400
    focus:border-transparent transition-all duration-200
  `;

  const selectClass = `
    w-full border border-gray-200 rounded-2xl px-4 py-2.5
    text-sm text-gray-700 bg-white appearance-none
    focus:outline-none focus:ring-2 focus:ring-blue-500
    focus:border-transparent transition-all duration-200
  `;

  const selectErrorClass = `
    w-full border border-red-400 rounded-2xl px-4 py-2.5
    text-sm text-gray-700 bg-white appearance-none
    focus:outline-none focus:ring-2 focus:ring-red-400
    focus:border-transparent transition-all duration-200
  `;

  const labelClass = `
    block text-xs font-medium text-gray-500 mb-1.5
  `;

  const errorTextClass = 'text-xs text-red-500 mt-1';

  const fieldClass = (field) => (errors[field] ? inputErrorClass : inputClass);
  const dropdownClass = (field) => (errors[field] ? selectErrorClass : selectClass);

  const sectionTitle = `
    flex items-center gap-2 text-sm font-semibold
    text-[#0a1f5c] mb-5
  `;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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
                        value={name}
                        placeholder="Honda Civic RS Turbo"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^A-Za-z0-9\s\-]/g, '');
                          setname(value);
                          clearError('name');
                        }}
                        className={fieldClass('name')}
                      />
                      {errors.name && <p className={errorTextClass}>{errors.name}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Brand</label>

                      <div className="relative">

                        <select
                          value={category}
                          onChange={(e) => {
                            setcategory(e.target.value);
                            clearError('category');
                          }}
                          className={dropdownClass('category')}
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
                      {errors.category && <p className={errorTextClass}>{errors.category}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Color</label>

                      <input
                        type="text"
                        value={color}
                        placeholder="Crystal Black"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^A-Za-z\s]/g, '');
                          setcolor(value);
                          clearError('color');
                        }}
                        className={fieldClass('color')}
                      />
                      {errors.color && <p className={errorTextClass}>{errors.color}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Condition</label>

                      <select
                        value={condition}
                        onChange={(e) => {
                          setcondition(e.target.value);
                          clearError('condition');
                        }}
                        className={dropdownClass('condition')}
                      >
                        <option value="">Select</option>
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                        <option value="Certified">Certified</option>
                      </select>
                      {errors.condition && <p className={errorTextClass}>{errors.condition}</p>}
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
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={year}
                        placeholder="2024"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                          setyear(value);
                          clearError('year');
                        }}
                        className={fieldClass('year')}
                      />
                      {errors.year && <p className={errorTextClass}>{errors.year}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Engine</label>

                      <input
                        type="text"
                        value={engine}
                        placeholder="1800CC"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9.CCcLl\s]/g, '');
                          setengine(value);
                          clearError('engine');
                        }}
                        className={fieldClass('engine')}
                      />
                      {errors.engine && <p className={errorTextClass}>{errors.engine}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Fuel</label>

                      <select
                        value={fuel}
                        onChange={(e) => {
                          setfuel(e.target.value);
                          clearError('fuel');
                        }}
                        className={dropdownClass('fuel')}
                      >
                        <option value="">Select</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Electric">Electric</option>
                      </select>
                      {errors.fuel && <p className={errorTextClass}>{errors.fuel}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Transmission</label>

                      <select
                        value={transmission}
                        onChange={(e) => {
                          settransmission(e.target.value);
                          clearError('transmission');
                        }}
                        className={dropdownClass('transmission')}
                      >
                        <option value="">Select</option>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                      </select>
                      {errors.transmission && <p className={errorTextClass}>{errors.transmission}</p>}
                    </div>

                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">

                  <h2 className={sectionTitle}>
                    📝 Description
                  </h2>

                  <textarea
                    rows={6}
                    value={description}
                    placeholder="Describe vehicle condition, features, maintenance history, reason for selling..."
                    onChange={(e) => {
                      setdescription(e.target.value.slice(0, 2000));
                      clearError('description');
                    }}
                    className={`${fieldClass('description')} resize-none`}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.description ? (
                      <p className={errorTextClass}>{errors.description}</p>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs text-gray-400">{description.length}/2000</span>
                  </div>

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
                    ${errors.image
                        ? 'border-red-400 bg-red-50'
                        : preview
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
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImage}
                    className="hidden"
                  />
                  {errors.image && <p className={`${errorTextClass} mt-2`}>{errors.image}</p>}

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
                          type="text"
                          inputMode="numeric"
                          value={price}
                          placeholder="2,500,000"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setprice(value);
                            clearError('price');
                          }}
                          className={`${fieldClass('price')} pl-14`}
                        />

                      </div>
                      {errors.price && <p className={errorTextClass}>{errors.price}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Mileage</label>

                      <input
                        type="text"
                        inputMode="numeric"
                        value={mileage}
                        placeholder="45000 KM"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setmileage(value);
                          clearError('mileage');
                        }}
                        className={fieldClass('mileage')}
                      />
                      {errors.mileage && <p className={errorTextClass}>{errors.mileage}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Registered City</label>

                      <input
                        type="text"
                        value={registered}
                        placeholder="Lahore"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^A-Za-z\s]/g, '');
                          setregistered(value);
                          clearError('registered');
                        }}
                        className={fieldClass('registered')}
                      />
                      {errors.registered && <p className={errorTextClass}>{errors.registered}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>WhatsApp Number</label>

                      <PhoneInput
                        defaultCountry="pk"
                        value={phone}
                        onChange={(value) => {
                          setPhone(value);
                          clearError('phone');
                        }}
                        style={{ width: '100%' }}
                        className="custom-phone-input"
                        inputStyle={{
                          width: '100%',
                          border: errors.phone ? '1px solid #f87171' : '1px solid #e5e7eb',
                          borderRadius: '1rem',
                          fontSize: '14px',
                          padding: '12px 16px',
                          height: '46px',
                        }}
                      />
                      {errors.phone && <p className={errorTextClass}>{errors.phone}</p>}
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
};

export default SellingForm;