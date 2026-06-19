import React from 'react'
import Navbar from '../components/Navbars'
import Herosection from '../components/HeroSections'
import Product from '../components/Products'
import SearchFilter from '../components/SearchFilters'
import Category from '../components/Categorys'
import PricingSection from '../components/PricingSections'
import Testimonials from '../components/Testimoialss'
import HowItWorks from '../components/HowItWorkss'
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
