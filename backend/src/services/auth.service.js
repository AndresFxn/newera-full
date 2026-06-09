/**
 * Auth Service — New Era Supermercado
 *
 * Lógica de registro, login y generación de tokens JWT.
 *
 * @module services/auth
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { AppError } from '../middlewares/error.middleware.js';

const SALT_ROUNDS = 12;

/** Registra un usuario nuevo y devuelve token JWT */
export const registerUser = async ({ name, email, password, phone }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new AppError('Ya existe una cuenta con ese email.', 409);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone: phone || null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  const token = signToken({ sub: newUser.id, role: newUser.role });

  return { user: newUser, token };
};

/** Autentica credenciales y devuelve token JWT */
export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
      isActive: true,
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Credenciales incorrectas.', 401);
  }

  if (!user.isActive) {
    throw new AppError('Tu cuenta ha sido desactivada. Contacta al soporte.', 403);
  }

  const token = signToken({ sub: user.id, role: user.role });
  const { password: _removed, ...safeUser } = user;

  return { user: safeUser, token };
};

/** Firma un token JWT con la clave del entorno */
const signToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno.');
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};
