import React from 'react'
import Navbar from '../components/navbar'
import Herosection from '../components/herosection'
import Product from '../components/product'
import SearchFilter from '../components/searchFilter'
import Category from '../components/category'
import PricingSection from '../components/pricingSection'
import Testimonials from '../components/testimoials'
import HowItWorks from '../components/howItWorks'
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
