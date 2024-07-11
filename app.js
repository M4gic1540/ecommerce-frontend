const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');
const app = express();

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
const apiBaseUrl = 'http://127.0.0.1:8000/api/usuario/usuarios/';
const apiBaseUrl2 = 'http://127.0.0.1:8000/api/productos/productos/';
const apiBaseUrl3 = 'http://127.0.0.1:8000/api/productos/categorias/';
const apiBaseUrl4 = 'http://127.0.0.1:8000/api/carrito/carritos/';
const apiBaseUrl5 = 'http://127.0.0.1:8000/api/usuario/login';


// Rutas frontend
const frontendBaseUrl = 'http://localhost:3000/usuarios/';
const frontendBaseUrl2 = 'http://localhost:3000/productos/';
const frontendBaseUrl3 = 'http://localhost:3000/categorias/';
const frontendBaseUrl4 = 'http://localhost:3000/carrito/';
const frontendBaseUrl5 = 'http://localhost:3000/login/';


app.listen(3000, () => {
    console.log('\n Servidor ejecutándose Frontend en http://localhost:3000');
    console.log(`Ruta Frontend de usuarios: ${frontendBaseUrl}`);
    console.log(`Ruta Frontend de productos: ${frontendBaseUrl2}`);
    console.log(`Ruta Frontend de categorias: ${frontendBaseUrl3}`);
    console.log(`Ruta Frontend de carritos: ${frontendBaseUrl4}`);
    console.log(`Ruta Frontend de login: ${frontendBaseUrl5}`);
    console.log('\n Servidor ejecutándose Backend en http://127.0.0.1:8000');
    console.log(`Ruta Backend de API de usuarios: ${apiBaseUrl}`);
    console.log(`Ruta Backend de API de productos: ${apiBaseUrl2}`);
    console.log(`Ruta Backend de API de categorias: ${apiBaseUrl3}`);
    console.log(`Ruta Backend de API de carritos: ${apiBaseUrl4}`);
    console.log(`Ruta Backend de API de login: ${apiBaseUrl5}`);
});
