const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json()); // Para manejar solicitudes JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para manejar solicitudes de formularios
app.use(methodOverride('_method'));
app.use(cookieParser()); // Para manejar cookies

// Configuración del motor de plantillas EJS y la carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Importar rutas
const HomeRouter = require('./routes/home');
const productosRouter = require('./routes/productos');
const usuariosRouter = require('./routes/usuarios');
const carritoRouter = require('./routes/carrito');
const categoriasRouter = require('./routes/categorias');
const loginRouter = require('./routes/login');
const xboxRouter = require('./routes/xbox');
const playstationRouter = require('./routes/playstation');
const pcRouter = require('./routes/pc');
const gameRouter = require('./routes/game');

// Usar rutas
app.use('/', HomeRouter);
app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/carrito', carritoRouter);
app.use('/categorias', categoriasRouter);
app.use('/login', loginRouter);
app.use('/xbox', xboxRouter);
app.use('/playstation', playstationRouter);
app.use('/pc', pcRouter);
app.use('/game', gameRouter);

// Rutas Backend de las APIs
const apiBaseUrl = process.env.BACKEND_API_URL || 'http://127.0.0.1:8000/api';
const apiUrls = {
    usuarios: `${apiBaseUrl}/usuario/usuarios/`,
    productos: `${apiBaseUrl}/productos/productos/`,
    categorias: `${apiBaseUrl}/productos/categorias/`,
    carritos: `${apiBaseUrl}/carrito/carritos/`,
    login: `${apiBaseUrl}/usuario/login`
};

// Rutas frontend
const frontendBaseUrl = process.env.FRONTEND_BASE_URL || 'http://localhost:3000';
const frontendUrls = {
    usuarios: `${frontendBaseUrl}/usuarios/`,
    productos: `${frontendBaseUrl}/productos/`,
    categorias: `${frontendBaseUrl}/categorias/`,
    carritos: `${frontendBaseUrl}/carrito/`,
    login: `${frontendBaseUrl}/login/`
};

app.listen(port, () => {
    console.log(`\n Servidor ejecutándose Frontend en ${frontendBaseUrl}`);
    console.log(`Ruta Frontend de usuarios: ${frontendUrls.usuarios}`);
    console.log(`Ruta Frontend de productos: ${frontendUrls.productos}`);
    console.log(`Ruta Frontend de categorías: ${frontendUrls.categorias}`);
    console.log(`Ruta Frontend de carritos: ${frontendUrls.carritos}`);
    console.log(`Ruta Frontend de login: ${frontendUrls.login}`);
    console.log(`\n Servidor ejecutándose Backend en ${apiBaseUrl}`);
    console.log(`Ruta Backend de API de usuarios: ${apiUrls.usuarios}`);
    console.log(`Ruta Backend de API de productos: ${apiUrls.productos}`);
    console.log(`Ruta Backend de API de categorías: ${apiUrls.categorias}`);
    console.log(`Ruta Backend de API de carritos: ${apiUrls.carritos}`);
    console.log(`Ruta Backend de API de login: ${apiUrls.login}`);
});
