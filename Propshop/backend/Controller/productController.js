import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route /api/product
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
    const model = await Product.find({});
    res.json(model);
})

// @desc Fetch single product
// @route /api/product/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
    const singleProduct = await Product.findById(req.params.id)
    if (singleProduct) {
        res.json(singleProduct);
    } else {
        res.status(404);
        throw new Error('Data not found');
    }
})

// @desc Delete single product
// @route DELETE /api/product/:id
// @access Private/admin
export const deleteProductById = asyncHandler(async (req, res) => {
    const deletedProduct = await Product.deleteOne({ _id: req.params.id })
    if (deletedProduct) {
        res.json(deletedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
})

// @desc create product
// @route POST /api/product
// @access Private/admin
export const createProduct = asyncHandler(async (req, res) => {
    // const product = new Product({
    //     name: 'Sample Product',
    //     price: 0,
    //     user: req.user._id,
    //     image: '/images/sample.jpg',
    //     brand: 'Sample Brand',
    //     countInStock: 0,
    //     numReview: 0,
    //     description: 'Sample Description'
    // });

    // const createProduct = await product.save();
    // res.status(201).json(createProduct);
})

// @desc update product
// @route PUT /api/product/:id
// @access Private/admin
export const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body
    const product = await Product.findById(req.param.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updateProduct = await product.save()
        res.status(201).json(updateProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})
