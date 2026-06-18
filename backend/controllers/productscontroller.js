const { default: mongoose } = require('mongoose');
const product = require('../models/products');

// ── Create Product ───────────────────────────────────────────
module.exports.products = async (req, res) => {
    try {
        console.log('Incoming request body:', req.body);
        console.log('File information:', req.file);

        if (!req.file) {
            return res.status(400).json({ message: 'Vehicle image is required' });
        }

        const path = req.file.filename;
        const {
            name, color, category, price, registered, engine,
            number, description, id,
            // ✅ new fields from updated Sellingform
            condition, year, fuel, transmission, mileage
        } = req.body;

        const productData = {
            image: path,
            vehicleName: name,
            vehicleColor: color,
            vehicleBrand: category,        // "category" field in form = Brand dropdown
            vehicleCategory: category,     // kept in sync for backward compatibility
            vehiclePrice: price,
            registeredCity: registered,
            engineCapacity: engine,
            ContactNumber: number,
            Description: description,
            condition,
            year,
            fuel,
            transmission,
            mileage,
            user: id
        };

        console.log('Parsed product data:', productData);

        const newProduct = new product(productData);
        const savedProduct = await newProduct.save();

        if (savedProduct) {
            res.status(201).json({ message: 'Product data stored successfully', data: savedProduct });
        } else {
            res.status(500).json({ message: 'Failed to store product data' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ── Get All Products ─────────────────────────────────────────
module.exports.getproducts = async (req, res) => {
    try {
        const products = await product.find({}).sort({ createdAt: -1 }).exec();

        // ✅ always return an array under "data", even if empty
        res.status(200).json({ message: "Products found successfully", data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ── Get Single Product Detail ────────────────────────────────
module.exports.detailproduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        if (!productId) {
            return res.status(400).send({ message: "Product ID is required in the URL" });
        }

        const detailproduct = await product.findOne({ _id: productId }).populate('user');

        if (detailproduct) {
            res.send({ message: "Product is available", data: detailproduct });
        } else {
            res.status(404).send({ message: "Product not available" });
        }

    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// ── Get Products By User ─────────────────────────────────────
module.exports.userproducts = async (req, res) => {
    try {
        const userId = req.params.userid;
        const userproducts = await product.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).send({ message: "Find product", data: userproducts });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// ── Update Product ───────────────────────────────────────────
module.exports.updateproduct = async (req, res) => {
    const productId = req.params.userid;

    try {
        const findoldimg = await product.findOne({ _id: productId });

        if (!findoldimg) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const dynamicImg = findoldimg.image;
        const path = req.file ? req.file.filename : dynamicImg;

        const {
            name, color, category, price, registered, engine,
            ContactNumber, description, id, sold,
            condition, year, fuel, transmission, mileage
        } = req.body;

        // ✅ only update fields that were actually sent (avoid wiping data with undefined)
        const productData = {};
        if (path)            productData.image = path;
        if (name)            productData.vehicleName = name;
        if (color)           productData.vehicleColor = color;
        if (category)        { productData.vehicleBrand = category; productData.vehicleCategory = category; }
        if (price)           productData.vehiclePrice = price;
        if (registered)      productData.registeredCity = registered;
        if (engine)          productData.engineCapacity = engine;
        if (ContactNumber)   productData.ContactNumber = ContactNumber;
        if (description)     productData.Description = description;
        if (condition)       productData.condition = condition;
        if (year)            productData.year = year;
        if (fuel)            productData.fuel = fuel;
        if (transmission)    productData.transmission = transmission;
        if (mileage)         productData.mileage = mileage;
        if (sold !== undefined) productData.sold = sold;
        if (id)              productData.user = id;

        const updateproduct = await product.findByIdAndUpdate(
            productId,
            { $set: productData },
            { new: true }
        );

        if (!updateproduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated', data: updateproduct });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ── Delete Product ───────────────────────────────────────────
module.exports.deleteproduct = async (req, res) => {
    const userid = req.params.userid;

    try {
        const delproduct = await product.findByIdAndDelete(userid);

        if (delproduct) {
            res.status(200).send({ message: 'Product deleted successfully', data: delproduct });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// ── Search / Filter Products ─────────────────────────────────
module.exports.searchfilter = async (req, res) => {
    const name     = req.query.name;
    const City     = req.query.city;
    const minPrice = req.query.minprice;
    const maxPrice = req.query.maxprice;
    const filter   = {};

    if (typeof name !== 'undefined' && name !== 'undefined' && name.trim() !== '') {
        filter.vehicleName = new RegExp(name, 'i');
    }
    if (typeof City !== 'undefined' && City !== 'undefined' && City.trim() !== '') {
        filter.registeredCity = new RegExp(City, 'i');
    }
    if (
        typeof minPrice !== 'undefined' && minPrice !== 'undefined' && minPrice.trim() !== '' &&
        typeof maxPrice !== 'undefined' && maxPrice !== '' && maxPrice.trim() !== ''
    ) {
        filter.vehiclePrice = { $gte: minPrice, $lte: maxPrice };
    } else if (typeof minPrice !== 'undefined' && minPrice !== 'undefined' && minPrice.trim() !== '') {
        filter.vehiclePrice = { $gte: minPrice };
    } else if (typeof maxPrice !== 'undefined' && maxPrice !== 'undefined' && maxPrice.trim() !== '') {
        filter.vehiclePrice = { $lte: maxPrice };
    }

    try {
        const searchResult = await product.find(filter).lean();
        res.json(searchResult);
    } catch (error) {
        console.error("Error searching:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// ── Click Counts (placeholder) ───────────────────────────────
module.exports.clickcounts = async (req, res) => {
    try {
        // not implemented yet
    } catch (error) {
        console.error(error);
    }
};