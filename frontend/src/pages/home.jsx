import React from 'react'
import Navbar from '../Componentss/Navbars'
import Herosection from '../Componentss/HeroSections'
import Product from '../Componentss/Products'
import SearchFilter from '../Componentss/SearchFilters'
import Category from '../Componentss/Categorys'
import PricingSection from '../Componentss/PricingSections'
import Testimonials from '../Componentss/Testimoialss'
import HowItWorks from '../Componentss/HowItWorkss'
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
