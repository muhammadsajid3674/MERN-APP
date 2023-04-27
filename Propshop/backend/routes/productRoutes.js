import express from 'express'
import { createProduct, deleteProductById, getProductById, getProducts, updateProduct } from '../Controller/productController.js';
import { admin, protectedRoute } from '../middleware/authMiddleware.js';


const productRouter = express.Router();


productRouter.route('/').get(getProducts).post(productRouter, admin, createProduct);
productRouter.route('/:id').get(getProductById).delete(protectedRoute, admin, deleteProductById).put(productRouter, admin, updateProduct);

export default productRouter;