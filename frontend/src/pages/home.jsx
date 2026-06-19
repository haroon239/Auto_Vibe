import React from 'react'
import Navbar from '../Components/Navbar'
import Herosection from '../Components/HeroSection'
import Product from '../Components/Product'
import SearchFilter from '../Components/SearchFilter'
import Category from '../Components/Category'
import PricingSection from '../Components/PricingSection'
import Testimonials from '../Components/Testimoials'
import HowItWorks from '../Components/HowItWorks'
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
