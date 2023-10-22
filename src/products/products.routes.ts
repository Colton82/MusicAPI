import { Router } from "express";
import * as ProductsController from './products.controller';

const router = Router();
router.route('/products').get(ProductsController.readProducts);
router.route('/products').post(ProductsController.createProduct);
router.route('/products').put(ProductsController.updateProduct);
router.route('/products').delete(ProductsController.deleteProduct);

export default router;