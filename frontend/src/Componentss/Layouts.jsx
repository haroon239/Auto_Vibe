import React from 'react'
import Navbar from './Navbars'
import Footer from './Footers'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Navbar />
      
       <Outlet/>
    
      <Footer />
    </>
  )
}

export default Layout