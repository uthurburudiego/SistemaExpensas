"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Carga las variables de entorno del archivo .env
dotenv_1.default.config();
const connectDB = async () => {
    try {
        // Tomamos la URI desde el archivo .env
        const conn = await mongoose_1.default.connect(process.env.MONGO_URI || '');
        console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`❌ Error en la conexión: ${error}`);
        process.exit(1); // Detiene la app si no hay conexión
    }
};
exports.default = connectDB;
