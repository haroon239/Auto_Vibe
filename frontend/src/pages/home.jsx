import React from 'react'
import Navbar from '../components/navbar'
import Herosection from '../components/herosection'
import Product from '../components/product'
import SearchFilter from '../components/searchFilter'
import Category from '../components/category'
const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
<Herosection></Herosection>
<SearchFilter/>
<Product/>
<Category/>
    </div>
  )
}

export default Home
