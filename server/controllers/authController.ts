import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
        { id: user._id, role: user.role }, 
        'SECRET_KEY_SUPER_SEGURA', // Usa una variable de entorno en producción
        { expiresIn: '1d' }
        );
        res.json({ token, role: user.role, username: user.username });
    } else {
        res.status(401).json({ message: "Credenciales inválidas" });
    }
};