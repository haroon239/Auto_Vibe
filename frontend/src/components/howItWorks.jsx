const steps = [
  {
    number: 1,
    title: "Pick a package",
    description:
      "Choose Basic, Pro, or Premium based on duration and ad slots.",
  },
  {
    number: 2,
    title: "Submit your ad",
    description:
      "Upload image, add title, target URL and set your date range.",
  },
  {
    number: 3,
    title: "Go live",
    description:
      "After quick approval your ad runs and auto-expires on schedule.",
  },
]

const HowItWorks = () => {
  return (
    <section className="bg-white py-14 px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          How it works
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Three simple steps to launch your ad
        </p>
      </div>

      {/* Steps Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-gray-50 border border-gray-100 rounded-2xl p-6
                       hover:shadow-md transition-shadow duration-300"
          >
            {/* Circle Number */}
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white
                            flex items-center justify-center font-bold text-base mb-4">
              {step.number}
            </div>

            <h3 className="text-gray-900 font-bold text-base mb-2">
              {step.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}

export default HowItWorks;