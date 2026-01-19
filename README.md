# Sistema de Gestión de Expensas - Full Stack
## Este es un sistema integral desarrollado para la administración de lotes y el control de expensas en condominios o barrios cerrados. Permite llevar un registro detallado de propietarios, cobros mensuales y saldos acumulados.


<img width="1375" height="1252" alt="Captura de pantalla" src="https://github.com/user-attachments/assets/6da4c4b8-c3ef-44bb-8bac-f119480d7cb3" />

### 🚀 Características
Autenticación Segura: Sistema de login basado en JWT (JSON Web Tokens) con manejo de roles (Admin/Viewer).

- Gestión de Lotes: CRUD completo (Crear, Leer, Actualizar y Borrar) de lotes y sus respectivos propietarios.

- Control de Expensas: Registro de pagos mes a mes con validación de montos.

- Lógica de Saldos: Cálculo automático de saldos acumulados y gestión de consumos para cada lote.

- Interfaz Responsiva: Diseño moderno y minimalista que se adapta a dispositivos móviles y escritorio.

- Notificaciones en tiempo real: Feedback visual mediante react-hot-toast para cada acción.

### 🛠️ Tecnologías Utilizadas
**Frontend**
- React + TypeScript: Interfaz de usuario robusta y tipado estático.

- Zustand: Gestión de estado global ligera.

- Tailwind CSS: Estilos modernos y utilitarios.

- Axios: Consumo de API REST.

- Backend
- Node.js & Express: Servidor de aplicaciones y enrutamiento.

- MongoDB Atlas: Base de datos NoSQL para almacenamiento flexible.

- Mongoose: Modelado de objetos para la base de datos.

- JWT: Autenticación y protección de rutas.

### 💻 Instalación y Configuración
Si deseas clonar este proyecto y ejecutarlo localmente, sigue estos pasos:

Clonar el repositorio:

Bash

git clone [Sistema Expensas](https://github.com/uthurburudiego/SistemaExpensas)
Configurar el Backend:

Navega a la carpeta server.

Instala las dependencias: npm install.

Crea un archivo .env con las siguientes variables:

Fragmento de código

MONGO_URI=tu_url_de_mongodb
JWT_SECRET=tu_clave_secreta
PORT=5000
Inicia el servidor: npm run dev.

Configurar el Frontend:

Navega a la carpeta client.

Instala las dependencias: npm install.

Crea un archivo .env con la URL de tu API local:

Fragmento de código

VITE_API_URL=http://localhost:5000/api
Inicia la aplicación: npm run dev.

📦 Despliegue (Deployment)
La aplicación se encuentra actualmente desplegada en la nube utilizando:

Netlify: Para el alojamiento del Frontend.

Render: Para el alojamiento del Backend (API).

MongoDB Atlas: Base de datos en la nube.

✒️ Autor
Diego Uthurburu - Desarrollo Full Stack - [Tu LinkedIn](https://www.linkedin.com/in/diego-uthurburu/)
