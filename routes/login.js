const express = require('express');
const router = express.Router();
const axios = require('axios');

// Ruta de la API del backend para el login
const apiUrl = 'http://localhost:8000/api/usuario/login/';


// Middleware para verificar si el usuario ya está autenticado
function checkAuthenticated(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        return res.redirect('/'); // Redirige a la página principal si ya está autenticado
    }
    next(); // Continúa con la siguiente función de middleware o ruta
}

// Ruta: GET /login
router.get('/', checkAuthenticated, (req, res) => {
    res.render('login');  // Renderiza la vista de login (login.ejs)
});

// Ruta: POST /login
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const response = await axios.post(apiUrl, {
            username: username,
            password: password
        });
        const token = response.data.access;
        // Guarda el token JWT en una cookie
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');  // Redirige a la página de usuarios después del login exitoso
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
        res.status(401).send('Login failed. Check username and password.');
    }
});

module.exports = router;
