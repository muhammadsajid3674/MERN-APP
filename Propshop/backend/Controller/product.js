import Product from '../models/productModel.js';
import asyncErrorHandler from '../util/asyncErrorHandler.js';
import constants from '../util/constants.js';
import ErrorHandler from '../util/errorHandler.js';
import ApiFeatures from '../util/apiFeatures.js';

/**
 * Fetch All Product
 *
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
export const getProducts = asyncErrorHandler(async (req, res, next) => {
    const resPerPage = 4;
    const apiFeatures = new ApiFeatures(Product.find(), req.query, req).search().filter().pagination(resPerPage)
    let products = await apiFeatures.query;
    res.status(constants.OK).json({ data: products, success: true });
})

/**
 * Fetch Single Product
 * 
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
export const getProductById = asyncErrorHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.status(constants.OK).json({ data: product, success: true });
    } else {
        throw new ErrorHandler({ message: 'Product not found', status: constants.NOT_FOUND });
    }
})

/**
 * Delete Single Product
 *
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
export const deleteProductById = asyncErrorHandler(async (req, res) => {
    const product = await Product.deleteOne({ _id: req.params.id })
    if (product) {
        res.json({ data: product, success: true });
    } else {
        throw new ErrorHandler({ message: 'Product not found', status: constants.NOT_FOUND });
    }
})

/**
 * Create Product
 *
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
export const createProduct = asyncErrorHandler(async (req, res) => {
    const product = new Product(req.body);
    const createProduct = await product.save();
    res.status(constants.CREATED).json({ data: createProduct, success: true });
})

// @desc 

/**
 * Update Product
 *
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
export const updateProduct = asyncErrorHandler(async (req, res) => {
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
        res.status(constants.OK).json({ data: updateProduct, success: true });
    } else {
        throw new ErrorHandler({ message: 'Product not found', status: constants.NOT_FOUND });
    }
})
