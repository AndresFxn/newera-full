/**
 * Auth Controller — New Era Supermercado
 *
 * Maneja registro, login y perfil del usuario autenticado.
 *
 * @module controllers/auth
 */

import * as authService from '../services/auth.service.js';

/** POST /api/auth/register — Crear cuenta nueva */
export const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente.',
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

/** POST /api/auth/login — Iniciar sesión */
export const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso.',
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

/** GET /api/auth/me — Obtener usuario autenticado (requiere JWT) */
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: { user: req.user },
  });
};
