"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User_1.User.findOne({ username });
    if (user && (await bcryptjs_1.default.compare(password, user.password))) {
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, 'SECRET_KEY_SUPER_SEGURA', // Usa una variable de entorno en producción
        { expiresIn: '1d' });
        res.json({ token, role: user.role, username: user.username });
    }
    else {
        res.status(401).json({ message: "Credenciales inválidas" });
    }
};
exports.login = login;
