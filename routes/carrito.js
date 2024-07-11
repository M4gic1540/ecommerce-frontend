const express = require('express');
const router = express.Router();
const axios = require('axios');

// Middleware para verificar el token de autenticación
function authenticateToken(req, res, next) {
    const token = req.cookies.token; // Obtén el token de las cookies
    if (!token) {
        return res.redirect('/login'); // Redirige al login si no hay token
    }

    req.token = token; // Adjunta el token al objeto de solicitud
    next(); // Continúa con la siguiente función de middleware o ruta
}

// Ruta para obtener los carritos
router.get('/', authenticateToken, async (req, res) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/carrito/carritos/', {
            headers: {
                Authorization: `Bearer ${req.token}` // Incluye el token en el encabezado de la solicitud
            }
        });
        const carritos = response.data;
        res.render('carritos', { carritos });
    } catch (error) {
        console.error('Error fetching carritos:', error.response.data);
        res.status(500).send('Error al obtener los carritos');
    }
});

module.exports = router;
