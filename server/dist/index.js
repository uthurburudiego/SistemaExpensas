"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const loteRoutes_1 = __importDefault(require("./routes/loteRoutes")); // Importa las rutas
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Configurar CORS para permitir que Vite (puerto 5173) se comunique con el servidor
app.use((0, cors_1.default)({
    origin: '*', // Permite solo a tu frontend de Vite
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
// Conectar a la DB
(0, db_1.default)();
// Rutas
app.use('/api/lotes', loteRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
// Servir archivos estáticos en producción
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '/client/dist')));
    app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, 'client/dist/index.html')));
}
