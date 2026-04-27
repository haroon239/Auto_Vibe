import React, { useEffect, useState } from "react";
import noavailable from "../assets/not-available.png";
import { NavLink, useParams } from "react-router-dom";
import notfound from '../assets/not found.png'
import Cards from "./cards";
import axios from "axios";

const Product = () => {
  const { name } = useParams();
  console.log(name);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  console.log(product);

  useEffect(() => {
    const fetchData = async () => {
      const data={product:name}
      try {
        const response = await axios.get("http://localhost:6500/getproducts");
       
        
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (name) {
      setProduct(data.filter((item) => item.vehicleCategory === name));
    } else {
      setProduct(data);
    }
  }, [name, data]);

  // const whishlistfun = async (productId) => {
  //   const userId = localStorage.getItem("id");
  //   const productid = productId;
  //   console.log("whishlistt....", productId, "userid", userId);
  //   const data = {
  //     userid: userId,
  //     Product: productid,
  //   };
  //   console.log("whishlistt....", data);
  //   await axios.post("http://localhost:6500/likedproduct", data).then((res) => {
  //     console.log(res, 38);
  //   });
  // };

  // Check if data is not yet initialized
  if (!product) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message
  }

  // Now data is guaranteed to be defined
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {name
              ? `Collection of ${name} category`
              : "Customers also purchased"}
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {product.length > 0 ?
              product.map((items) => {
                return (
                  <Cards
                    key={items._id} // Assuming _id is unique for each product
                    id={items._id}
                    name={items.vehicleName}
                    color={items.vehicleColor}
                    price={items.vehiclePrice}
                    image={items.image}
                    sold={items.sold}
                    // wishlist={whishlistfun}
                  />
                );
              }):
              <img src={notfound} alt="product not found"  />
              
              }
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
