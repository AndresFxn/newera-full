/**
 * Auth Routes — /api/auth
 *
 * @module routes/auth
 */

import { Router } from 'express';
import { 
  register, 
  login, 
  getMe, 
  forgotPassword, 
  resetPassword 
} from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { 
  registerSchema, 
  loginSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema 
} from '../validators/auth.validator.js';

const router = Router();

// Rutas públicas
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

// Rutas protegidas
router.get('/me', verifyToken, getMe);

export default router;
