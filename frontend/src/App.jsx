import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signin from "./pages/signin.jsx";
import Signup from "./pages/signup.jsx";
import Home from "./pages/home.jsx";
import SellingForm from './Componentss/SellingForms.jsx'
import Productdetail from "./pages/productdetail.jsx";
import Profile from "./pages/profile.jsx";
import Likeproduct from "./Componentss/LikeProducts.js";
import Product from "./Componentss/Products.js";
import Chat from "./pages/chat.jsx";
import SearchProduct from "./pages/SearchProduct.jsx";
import Payment from "./pages/payment.jsx";
import Success from "./Componentss/Successs.js"; 
import Failed from "./Componentss/Faileds.js";
import About from "./pages/about.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Layout from "./Componentss/Layouts.jsx";

function App() {
  return (
 <BrowserRouter>
  <Routes>

    {/* Pages WITH Navbar & Footer */}
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/seller" element={<SellingForm />} />
      <Route path="/product/detail/:_id" element={<Productdetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/likedproduct" element={<Likeproduct />} />
      <Route path="/home/category/product/:name" element={<Product />} />
      <Route path="/search" element={<SearchProduct />} />
      <Route path="/About" element={<About />} />
    </Route>

    {/* Pages WITHOUT Navbar & Footer */}
    <Route path="/signin" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/chat/:productid" element={<Chat />} />
    <Route path="/seller/payments" element={<Payment />} />
<Route path="/success/:packageName/:userId" element={<Success />} />
    <Route path="/failed" element={<Failed />} />
    <Route path="/Dashboard" element={<Dashboard />} />

  </Routes>
</BrowserRouter>
  )
}

export default App
