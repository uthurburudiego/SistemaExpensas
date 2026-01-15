import express from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

// Esta ruta se convertirá en /api/auth/login
router.post('/login', login);

export default router;