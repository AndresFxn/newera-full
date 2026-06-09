/**
 * Order Controller — New Era Supermercado
 *
 * Creación y gestión de pedidos.
 * Los permisos de cambio de estado varían según el rol del usuario.
 *
 * @module controllers/order
 */

import * as orderService from '../services/order.service.js';
import { AppError } from '../middlewares/error.middleware.js';

/** Estados que puede actualizar un repartidor */
const DELIVERER_ALLOWED = ['DISPATCHED', 'DELIVERED'];

/** Estados que puede actualizar personal de tienda */
const STAFF_ALLOWED = ['PAID', 'PREPARING', 'CANCELLED'];

/** POST /api/orders — Crear pedido (usuario autenticado) */
export const createOrder = async (req, res, next) => {
  try {
    const result = await orderService.createOrder(req.user.id, req.body);

    res.status(201).json({
      success: true,
      message: '¡Pedido creado exitosamente!',
      data: result.order,
      summary: result.summary,
    });
  } catch (error) {
    next(error);
  }
};

/** GET /api/orders/mine — Pedidos del usuario autenticado */
export const getMyOrders = async (req, res, next) => {
  try {
    const result = await orderService.getMyOrders(req.user.id, req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

/** GET /api/orders — Todos los pedidos (ADMIN / CASHIER / DELIVERER) */
export const getAllOrders = async (req, res, next) => {
  try {
    // Si es DELIVERER, solo mostrar órdenes asignadas o disponibles para tomar
    if (req.user.role === 'DELIVERER') {
      const result = await orderService.getDelivererOrders(req.user.id, req.query);
      return res.status(200).json({ success: true, ...result });
    }
    
    // Para ADMIN y CASHIER, mostrar todas las órdenes
    const result = await orderService.getAllOrders(req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

/** PATCH /api/orders/:id/status — Cambiar estado del pedido */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (req.user.role === 'DELIVERER' && !DELIVERER_ALLOWED.includes(status)) {
      throw new AppError(`Como repartidor, solo puedes actualizar a: ${DELIVERER_ALLOWED.join(', ')}.`, 403);
    }

    if (['ADMIN', 'CASHIER'].includes(req.user.role) && !STAFF_ALLOWED.includes(status)) {
      throw new AppError(`Tu rol operativo solo puede actualizar a: ${STAFF_ALLOWED.join(', ')}.`, 403);
    }

    const updatedOrder = await orderService.updateOrderStatus(id, status, req.user.id);

    res.status(200).json({
      success: true,
      message: `Estado de la orden actualizado a ${status}.`,
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};
