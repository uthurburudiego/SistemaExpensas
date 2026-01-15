import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carga las variables de entorno del archivo .env
dotenv.config();

const connectDB = async () => {
    try {
        // Tomamos la URI desde el archivo .env
        const conn = await mongoose.connect(process.env.MONGO_URI || '');
        
        console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error en la conexión: ${error}`);
        process.exit(1); // Detiene la app si no hay conexión
    }
};

export default connectDB;