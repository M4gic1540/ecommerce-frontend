const express = require('express');
const router = express.Router();
const axios = require('axios');

// Función para configurar Axios con el token JWT
const axiosWithJWT = axios.create();

axiosWithJWT.interceptors.request.use(
    config => {
        const token = req.cookies.token; // Obtén el token de las cookies (debe ser ajustado según donde se encuentre token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Ruta para obtener productos y categorías
router.get('/productos', async (req, res) => {
    try {
        const [productosResponse, categoriasResponse] = await Promise.all([
            axiosWithJWT.get('http://127.0.0.1:8000/api/productos/productos/'),
            axiosWithJWT.get('http://127.0.0.1:8000/api/productos/categorias/')
        ]);
        
        const productos = productosResponse.data;
        const categorias = categoriasResponse.data;
        
        res.render('productos', { productos, categorias });
    } catch (error) {
        console.error('Error fetching productos y categorias:', error);
        res.status(500).send('Error al obtener los productos y categorías');
    }
});

module.exports = router;
