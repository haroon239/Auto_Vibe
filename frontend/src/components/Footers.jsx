import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>    
    <footer className="bg-[#1c1c2e] text-gray-400">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-2xl font-bold text-white mb-3">
            Auto<span className="text-red-500">Vibe</span>
          </h2>
          <p className="text-sm leading-relaxed mb-4">
            Car Auto Parts Shop and our commitment to quality and customer satisfaction.
          </p>
          <p className="text-sm font-semibold text-gray-300 mb-3">
            Follow us on social media for the latest updates, promotions, and automotive tips!
          </p>
          <div className="flex gap-3">
            {['f', '𝕏', '▶'].map((icon, i) => (
              <a key={i} href="#"
                className="w-9 h-9 bg-[#2a2a3e] rounded-md flex items-center justify-center text-white text-sm hover:bg-red-500 transition-colors">
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {['Home', 'Shop', 'Categories', 'About Us', 'Contact Us'].map(link => (
              <li key={link}>
                <Link to="#" className="hover:text-red-500 transition-colors">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            {['FAQ', 'Returns', 'Shipping Info', 'Link', 'Privacy Policy'].map(link => (
              <li key={link}>
                <Link to="#" className="hover:text-red-500 transition-colors">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Contact Information</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><span className="text-red-500">✉</span> mail@webmail.com</li>
            <li className="flex gap-3"><span className="text-red-500">📞</span> +1 (800) 123-4567</li>
            <li className="flex gap-3"><span className="text-red-500">🕐</span> Mon–Fri: 9am – 6pm (PST)</li>
            <li className="flex gap-3"><span className="text-red-500">📍</span> 1234 Car Street, Auto City, UAE</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2e2e42]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-gray-500">Copyright © 2026 AutoVibe. All rights reserved.</p>
          <div className="flex gap-2 flex-wrap">
            {['VISA', 'MC', 'Skrill', 'PayPal', '₿itcoin'].map(p => (
              <span key={p} className="bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded">{p}</span>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-red-500">Terms of Service</a>
            <a href="#" className="hover:text-red-500">Sitemap</a>
          </div>
        </div>
      </div>

    </footer>
    </>

  )
}

export default Footer