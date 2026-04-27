const { default: mongoose } = require('mongoose');
const product = require('../models/products');
const { json } = require('body-parser');

module.exports.products = async (req, res) => {
    try {
        console.log('Incoming request body:', req.body);
        console.log('File information:', req.file);

        const path = req.file.filename;
        const { name, color,category, price, registered, engine, number, description, id } = req.body;

        const productData = {
            image: path,
            vehicleName: name,
            vehicleColor: color,
            vehicleCategory: category,
            vehiclePrice: price,
            registeredCity: registered,
            engineCapacity: engine,
            ContactNumber: number,
            Description: description,
            user: id
        };

        console.log('Parsed request body:', productData);

        const newProduct = new product(productData);
        const savedProduct = await newProduct.save();

        if (savedProduct) {
            res.status(201).json({ message: 'Product data stored successfully' });
        } else {
            res.status(500).json({ message: 'Failed to store product data' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getproducts = async (req, res) => {
  try {
      const products = await product.find({}).exec();

      if (products && products.length > 0) {
          res.send({ message: "Products found successfully", data: products });
      } else {
          res.send({ message: "No products found" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.detailproduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        console.log(productId);

        if (!productId) {
            return res.status(400).send({ message: "Product ID is required in the URL" });
        }

        const detailproduct = await product.findOne({ _id: productId }).populate('user');
          
        if (detailproduct) {
            // detailproduct.clicks+=1
            // await detailproduct.save();
            res.send({ message: "Product is available", data: detailproduct });
        } else {
            res.send({ message: "Product not available" });
        }

    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};


module.exports.userproducts=async (req,res)=>{
console.log(req.params);
const userId = req.params.userid;
    const userproducts=await product.find({user:userId});
if (userproducts){
    res.send({"message":"find product",
    data:userproducts});
}
}

module.exports.updateproduct=async (req,res)=>{
    const productId = req.params.userid;
    const updatedFields = req.body;

    try {
    
        const findoldimg=await product.findOne({_id:productId});
        // console.log(findoldimg.image,  2544);
        const dynamicImg=findoldimg.image; 


       console.log("the product id", productId);
       console.log("update field", updatedFields); 


      const path = req.file ? req.file.filename : dynamicImg;
        const { name, color, brand, price, registered, engine, ContactNumber, description, id, sold } = req.body;

        const productData = {
            image: path,
            vehicleName: name,
            vehicleColor: color,
            vehicleBrand: brand,
            vehiclePrice: price,
            registeredCity: registered,
            engineCapacity: engine,
            ContactNumber: ContactNumber,
            Description: description,
            sold:sold,
            user: id
        };
         
        const updateproduct=await product.findByIdAndUpdate(
            productId,
            {$set:productData},
            {new:true}
        )

        if (!updateproduct) {
            return res.status(404).json({ message: 'Product not found' });
          }
      
          // Log the updated product details
          console.log('Product updated:', updateproduct);
      
          res.status(200).json({ message: 'Product updated', data: updateproduct });

    } catch (error) {
        console.log(error);
    }

}

module.exports.deleteproduct=async (req,res)=>{
    const userid=req.params.userid;
    console.log(userid);
    try {
       const delproduct=await product.findByIdAndDelete({ _id: userid});
       if (delproduct){
        console.log(delproduct);
        res.send({ message: 'Product deleted successfully', data: delproduct })
       } else{
    res.status(404).json({ message: 'Product not found' });
}

    } catch (error) {
    res.send(error); 
    }
}



module.exports.searchfilter = async (req, res) => {
    const name = req.query.name;
    const City = req.query.city;
    const minPrice = req.query.minprice;
    const maxPrice = req.query.maxprice;
    const filter = {};
    console.log(name)
    if (typeof name !== 'undefined' && name !== 'undefined' && name.trim() !== '') {
        filter.vehicleName = new RegExp(name, 'i');
    }
    // if (name!== undefined) filter.vehicleName = new RegExp(name, 'i');
    if (typeof City !== 'undefined' && City !== 'undefined' && City.trim() !== '') {
         filter.registeredCity = new RegExp(City, 'i');
    }
    if (typeof minPrice!== 'undefined' && minPrice!== 'undefined' && minPrice.trim() !== '' && typeof maxPrice !=='undefined' && maxPrice!=='' && maxPrice.trim()!=='') {
      filter.vehiclePrice = { $gte: minPrice, $lte: maxPrice };
    } else if ( typeof minPrice!=='undefined' && minPrice!=='undefined' && minPrice.trim()!=='') {
      filter.vehiclePrice = { $gte: minPrice };
    } else if ( typeof maxPrice!=='undefined' && maxPrice!=='undefined' && maxPrice.trim()!=='') {
      filter.vehiclePrice = { $lte: maxPrice };
    }
  
    console.log("Filter:", filter); // Log only the filter object
  
    try {
      const searchResult = await product.find(filter).lean(); // Use .lean() to ensure plain JavaScript objects are returned
      res.json(searchResult);
    } catch (error) {
      console.error("Error searching:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };



  module.exports.clickcounts=async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
  }
  