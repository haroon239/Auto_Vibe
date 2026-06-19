import { NavLink } from 'react-router-dom'
import { IoIosHeart } from 'react-icons/io'
import api from '../utils/axios'
import sold2 from '../assets/sold2.png' // keep your existing import

const Cards = ({ id, name, color, price, image, sold, mileage, transmission, year, onWishlist, isLiked }) => {




  return (
    <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm
                    hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                    overflow-hidden flex flex-col">

      {/* ── IMAGE AREA ── */}
      <div className="relative">

        {/* Badge — Sold / Certified */}
        {sold && (
          <div className="absolute top-3 left-3 z-10 bg-[#0a1f5c] text-white
                          text-[10px] font-bold uppercase tracking-wider
                          px-2.5 py-1 rounded-md">
            Certified Pre-Owned
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={onWishlist}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow-md
                 flex items-center justify-center
                 hover:scale-110 transition-transform duration-200"
        >
          <IoIosHeart className={`text-lg transition-colors
        ${isLiked ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}
          />
        </button>

        {/* Car Image */}
        <NavLink to={`/product/detail/${id}`}>
          <div className="w-full h-48 bg-gray-50 overflow-hidden">
            <img
              src={image || 'https://via.placeholder.com/400x220?text=No+Image'}
              alt={name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </NavLink>
      </div>

      {/* ── CARD BODY ── */}
      <div className="p-4 flex flex-col gap-3 flex-1">

        {/* Name + Price */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <NavLink to={`/product/detail/${id}`}>
              <h3 className="text-[#0a1f5c] font-bold text-base hover:text-blue-600 transition-colors">
                {name}
              </h3>
            </NavLink>
            <p className="text-gray-400 text-[11px] uppercase tracking-wider mt-0.5">
              {color}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[#0a1f5c] font-bold text-lg leading-none">${price}</p>
            <p className="text-gray-400 text-xs mt-0.5">/day</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-100" />

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase tracking-wider">Color</span>
            <span className="text-gray-700 text-xs font-medium mt-0.5">{color}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase tracking-wider">Mileage</span>
            <span className="text-gray-700 text-xs font-medium mt-0.5">
              {mileage ? `${mileage} mi` : 'N/A'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase tracking-wider">Transmission</span>
            <span className="text-gray-700 text-xs font-medium mt-0.5">
              {transmission || 'Automatic'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase tracking-wider">Year</span>
            <span className="text-gray-700 text-xs font-medium mt-0.5">
              {year || '2024'}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-1">
          <NavLink
            to={`/product/detail/${id}`}

            className="flex-1"
          >
            <button className="w-full bg-[#0a1f5c] hover:bg-blue-700 text-white
                               text-sm font-semibold py-2.5 rounded-xl
                               transition-all duration-200 active:scale-95">
              View Details
            </button>
          </NavLink>

          {/* Compare Button */}
          <button
            className="w-10 h-10 border border-gray-200 rounded-xl flex items-center
                       justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500
                       transition-all duration-200 flex-shrink-0"
            title="Compare"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Cards
