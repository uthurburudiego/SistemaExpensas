import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import loteRoutes from './routes/loteRoutes'; 
import authRoutes from './routes/authRoutes';
// Ya no necesitas 'path' si no vas a servir el frontend desde aquí

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Conectar a la DB
connectDB();

// Rutas
app.use('/api/lotes', loteRoutes);
app.use('/api/auth', authRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});