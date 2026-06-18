import React from 'react'
import Navbar from '../components/Navbar'
import Herosection from '../components/Herosection'
import Product from '../components/Product'
import SearchFilter from '../components/SearchFilter'
import Category from '../components/Category'
import PricingSection from '../components/PricingSection'
import Testimonials from '../components/Testimoials'
import HowItWorks from '../components/HowItWorks'
const Home = () => {
  return (
    <div>
   
      <Herosection></Herosection>
      <SearchFilter />
      <Product />
      <HowItWorks/>
      <Category />
      <PricingSection/>
      <Testimonials/>
    </div>
  )
}

export default Home
