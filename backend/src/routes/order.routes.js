import { Router } from 'express';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createOrderSchema, updateOrderStatusSchema, orderQuerySchema } from '../validators/order.validator.js';
import * as orderController from '../controllers/order.controller.js';

const router = Router();

router.use(verifyToken);

// CUSTOMER
router.post('/', checkRole('CUSTOMER'), validate(createOrderSchema), orderController.createOrder);
router.get('/my-orders', checkRole('CUSTOMER'), validate(orderQuerySchema, 'query'), orderController.getMyOrders);

// ADMIN / CASHIER / DELIVERER
router.get('/', checkRole('ADMIN', 'CASHIER', 'DELIVERER'), validate(orderQuerySchema, 'query'), orderController.getAllOrders);
router.patch('/:id/status', checkRole('ADMIN', 'CASHIER', 'DELIVERER'), validate(updateOrderStatusSchema), orderController.updateOrderStatus);

export default router;