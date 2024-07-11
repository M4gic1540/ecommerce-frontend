// routes/xbox.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Ruta de la API del backend para los productos Xbox
const apiUrl = 'http://localhost:8000/api/productos/productos/?categoria=XBOX';

// Middleware para verificar el token de autenticación
function authenticateToken(req, res, next) {
    const token = req.cookies.token; // Obtén el token de las cookies
    if (!token) {
        return res.redirect('/login'); // Redirige al login si no hay token
    }

    req.token = token; // Adjunta el token al objeto de solicitud
    next(); // Continúa con la siguiente función de middleware o ruta
}

// Ruta: GET /xbox
router.get('/', authenticateToken, async (req, res) => {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${req.token}` // Incluye el token en el encabezado de la solicitud
            }
        });
        console.log(response.data); // Imprime la respuesta de la API
        const productosXbox = response.data.results || response.data; // Ajusta según la estructura real de la respuesta
        res.render('xbox', { productosXbox });
    } catch (error) {
        console.error('Error fetching Xbox products:', error);
        res.status(500).send('Error al obtener los productos de Xbox');
    }
});

module.exports = router;
