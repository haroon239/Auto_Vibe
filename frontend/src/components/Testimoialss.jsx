import React from "react"
import testimonia1 from "../assets/testimonial1.jfif"
import testimonia2 from "../assets/testimonial2.jfif"
import testimonia3 from "../assets/testimonial3.jfif"
import { useState } from "react"

const testimonials = [
  {
    stars: 4,
    quote:
      "AdLimit changed how we think about time-sensitive product launches. The ability to hard-stop ads exactly at midnight saved our margin.",
    name: "Sarah Chen",
    role: "Marketing Lead, Global Retail",
    avatar: testimonia1,
  },
  {
    stars: 5,
    quote:
      "The interface is incredibly clean. We integrated their API in less than a day, and the dashboard provides clarity we haven't found elsewhere.",
    name: "Marcus Thorne",
    role: "CTO, AdStream Tech",
    avatar: testimonia2,
  },
  {
    stars: 4,
    quote:
      "Precision scheduling is no longer a luxury for us. AdLimit handles our $2M monthly spend with absolute reliability and performance.",
    name: "Elena Rodriguez",
    role: "VP of Ads, NeoCommerce",
    avatar: testimonia3,
  },
]

const StarRating = ({ count }) => (
  <div className="flex gap-1 mb-4">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-4 h-4 ${star <= count ? "text-yellow-400" : "text-yellow-200"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

export default function Testimonials() {
  return (
    <section className="bg-[#0f2a6b] py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Trusted by Industry Leaders
        </h2>
        <p className="text-blue-300 text-base">
          Marketing managers rely on AdLimit for data-driven precision.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-[#1a3a7a] rounded-2xl p-7 flex flex-col justify-between
                       border border-blue-700/40 hover:border-blue-400/50
                       transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <StarRating count={t.stars} />
              <p className="text-blue-100 text-sm leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/40 border border-blue-400/50
                              flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{t.name}</p>
                <p className="text-blue-300 text-xs">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}