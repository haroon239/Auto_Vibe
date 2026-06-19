import React, { useEffect, useState } from "react";
import noavailable from "../assets/not-available.png";
import { NavLink, useParams } from "react-router-dom";
import notfound from '../assets/not found.png'
import Cards from "./Cardss";
import api from '../utils/axios'


const Product = () => {
  const userId = localStorage.getItem("id");
  const { name } = useParams();
  console.log(name);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  console.log(product);

  useEffect(() => {
    const fetchData = async () => {
      const data = { product: name }
      try {
        const response = await api.get("/products/getproducts");


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

  // for liked product

  const whishlistfun = async (productId) => {
    const data = { userid: userId, Product: productId };
    await api.post("/users/likedproduct", data).then((res) => {
      console.log(res, 38);
    });
  };
  // for product click behaviour
  const productclick = async (id, behave) => {
    const body = { userId, product: id, behaviour: behave };
    await api.post('/productclick', body).then((res) => {
      console.log(res, "click product");
    });
  };


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
                    onWishlist={() => {
                      whishlistfun(items._id)
                      productclick(items._id, "like")
                    }} // You can replace this with actual logic to determine if the product is liked
                  />
                );
              }) :
              <img src={notfound} alt="product not found" />

            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
