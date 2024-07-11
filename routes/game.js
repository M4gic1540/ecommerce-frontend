// routes/game.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Middleware para verificar el token de autenticación
function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }

    req.token = token;
    next();
}

// Ruta para obtener los detalles del producto
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const productoId = req.params.id;
        const response = await axios.get(`http://localhost:8000/api/productos/productos/${productoId}/`, {
            headers: {
                Authorization: `Bearer ${req.token}`
            }
        });
        const producto = response.data;
        res.render('games/game', { producto });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Error al obtener los detalles del producto');
    }
});

module.exports = router;
