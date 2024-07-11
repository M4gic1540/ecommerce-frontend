const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/productos/categorias/');
        const categorias = response.data;
        res.render('categorias', { categorias });
    } catch (error) {
        console.error('Error fetching categorias:', error);
        res.status(500).send('Error al obtener las categorias');
    }
});

module.exports = router;