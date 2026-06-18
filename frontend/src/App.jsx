import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Seller from './components/sellingform'
import Productdetail from "./pages/productdetail";
import Profile from "./pages/profile";
import Likeproduct from "./components/likeproduct";
import Product from "./components/product";
import Chat from "./pages/chat";
import SearchProduct from "./pages/searchProduct";
import Payment from "./pages/payment";
import Success from "./components/success"; 
import Failed from "./components/failed";
import About from "./pages/about";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout";

function App() {
  return (
 <BrowserRouter>
  <Routes>

    {/* Pages WITH Navbar & Footer */}
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/seller" element={<Seller />} />
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
