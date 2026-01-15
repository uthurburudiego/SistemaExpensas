import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import loteRoutes from './routes/loteRoutes'; // Importa las rutas
import authRoutes from './routes/authRoutes';
import path from 'path';

const app = express();
app.use(express.json());

// Configurar CORS para permitir que Vite (puerto 5173) se comunique con el servidor
app.use(cors({
  origin: '*', // Permite solo a tu frontend de Vite
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

// Servir archivos estáticos en producción

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client/dist/index.html'))
  );
}