import express from 'express'
import authMiddleware from '../middleware/auth.js';
import { createProduct, deleteProductById, getProductById, getProducts, updateProduct } from '../controller/product.js';


const productRouter = express.Router();

productRouter.route('/').get(getProducts).post(authMiddleware.authenticate, authMiddleware.authenticateAdmin, createProduct);
productRouter.route('/:id').get(getProductById).delete(authMiddleware.authenticate, authMiddleware.authenticateAdmin, deleteProductById).put(authMiddleware.authenticate, authMiddleware.authenticateAdmin, updateProduct);

export default productRouter;