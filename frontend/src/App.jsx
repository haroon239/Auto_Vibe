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

function App() {
  return (
 <BrowserRouter>
 <Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/signin" element={<Signin/>}></Route>
  <Route path="/signup" element={<Signup/>}></Route>
  <Route path="/seller" element={<Seller/>}></Route>
  <Route path="/product/detail/:_id" element={<Productdetail/>}></Route>
  <Route path="/profile" element={<Profile/>}></Route>
  <Route path="/likedproduct" element={<Likeproduct/>}></Route>
  <Route path="/home/category/product/:name" element={<Product/>}></Route>
  <Route path="/chat/:productid" element={<Chat/>}></Route>
  <Route path="/search" element={<SearchProduct/>}></Route>
  <Route path="/seller/payments" element={<Payment/>}></Route>
  <Route path="/success/:packagename" element={<Success/>}></Route>
  <Route path="/failed" element={<Failed/>}></Route>
  <Route path="/About" element={<About/>}></Route>
  <Route path="/Dashboard" element={<Dashboard/>}></Route>






  

 </Routes>
 </BrowserRouter>
  )
}

export default App
