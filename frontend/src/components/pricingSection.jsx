import { useState } from "react"
import { loadStripe } from '@stripe/stripe-js'
import api from '../utils/axios'


const plans = [
  {
    name: "Basic",
    price: 49,
    id: "basic",
    badge: null,
    features: [
      { text: "24-hour limit", active: true },
      { text: "Standard support", active: true },
      { text: "Priority support", active: false },
    ],
    btnLabel: "Choose Basic",
    btnStyle: "outline",
  },
  {
    name: "Professional",
    price: 199,
    id: "professional",
    badge: "RECOMMENDED",
    features: [
      { text: "Custom date limits", active: true },
      { text: "Priority support", active: true },
      { text: "Advanced Analytics", active: true },
    ],
    btnLabel: "Go Pro",
    btnStyle: "solid",
  },
  {
    name: "Premium",
    price: 499,
    id: "premium",
    badge: null,
    features: [
      { text: "Unlimited time limits", active: true },
      { text: "Dedicated manager", active: true },
      { text: "Full API access", active: true },
    ],
    btnLabel: "Choose Premium",
    btnStyle: "outline",
  },
]

const CheckIcon = ({ active }) => (
  <svg
    className={`w-4 h-4 flex-shrink-0 ${active ? "text-blue-600" : "text-gray-300"}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const PricingSection = () => {
  const [hovered, setHovered] = useState(null)
  const [loading, setLoading] = useState(null)
  // const userId=localStorage.getItem('id');
  const makepayment = async (plan) => {
    try {
        setLoading(plan.id);

        const userId = localStorage.getItem('id');

        if (!userId) {
            alert("Please login first to purchase a package.");
            return;
        }

        const stripe = await loadStripe('pk_test_51TE5txEMa7mF7ueXlCdg26N8immo3PI2lWrvHYwRyQOlEFjBHflhnwn8lZk2AKd7SS5m58VDcmGroh7hYVFZUF8y00B0txAzOc');

        const response = await api.post("/payments/create-checkout-session", {
            userId:      userId,
            packageName: plan.name,
            Price:       plan.price
        });

        // ✅ correct key name
        const { sessionId } = response.data;

        const result = await stripe.redirectToCheckout({ sessionId });

        if (result.error) {
            console.error(result.error.message);
        }

    } catch (error) {
        console.error("Payment error:", error);
    } finally {
        setLoading(null);
    }
};

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1f5c] mb-3 tracking-tight">
          Enterprise Pricing
        </h2>
        <p className="text-gray-500 text-base sm:text-lg">
          Scale your advertising with transparent monthly plans.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {plans.map((plan, i) => {
          const isPopular = plan.badge === "RECOMMENDED"
          const isHovered = hovered === i
          const isLoading = loading === plan.id

          return (
            <div
              key={plan.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`
                relative rounded-2xl p-7 flex flex-col gap-6
                transition-all duration-300
                ${isPopular
                  ? "border-2 border-blue-600 shadow-xl shadow-blue-100 scale-[1.03]"
                  : isHovered
                    ? "border border-gray-300 shadow-lg"
                    : "border border-gray-200 shadow-sm"
                }
                bg-white
              `}
            >
              {/* Recommended Badge */}
              {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full uppercase">
                    Recommended
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <div>
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">
                  {plan.name}
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-extrabold text-[#0a1f5c] leading-none">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 text-sm mb-1">/mo</span>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-100" />

              {/* Features */}
              <ul className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li
                    key={f.text}
                    className={`flex items-center gap-2.5 text-sm ${f.active ? "text-gray-700" : "text-gray-300"
                      }`}
                  >
                    <CheckIcon active={f.active} />
                    {f.text}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => makepayment(plan)}
                disabled={isLoading}
                className={`
                  w-full py-3 rounded-xl text-sm font-semibold
                  transition-all duration-200
                  ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
                  ${isPopular
                    ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                    : "border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 active:scale-95"
                  }
                `}
              >
                {isLoading ? "Processing..." : plan.btnLabel}
              </button>
            </div>
          )
        })}
      </div>

      {/* Bottom note */}
      <p className="text-center text-gray-400 text-sm mt-10">
        No hidden fees · Cancel anytime · Instant activation
      </p>
    </section>
  )
}

export default PricingSection