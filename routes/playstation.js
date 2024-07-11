// routes/xbox.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Ruta de la API del backend para los productos Xbox
const apiUrl = 'http://localhost:8000/api/productos/productos/?categoria=PLAYSTATION';

// Middleware para verificar el token de autenticación
function authenticateToken(req, res, next) {
    const token = req.cookies.token; // Obtén el token de las cookies
    if (!token) {
        return res.redirect('/login'); // Redirige al login si no hay token
    }

    req.token = token; // Adjunta el token al objeto de solicitud
    next(); // Continúa con la siguiente función de middleware o ruta
}

// Ruta: GET /playstation
router.get('/', authenticateToken, async (req, res) => {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${req.token}`
            }
        });
        const productosPlayStation = response.data.results || response.data;
        res.render('playstation', { productosPlayStation }); // Asegúrate de pasar la lista de productos
    } catch (error) {
        console.error('Error fetching PlayStation products:', error);
        res.status(500).send('Error al obtener los productos de PlayStation');
    }
});

module.exports = router;
