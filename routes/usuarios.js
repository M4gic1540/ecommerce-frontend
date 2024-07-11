const express = require('express');
const router = express.Router();
const axios = require('axios');

// Ruta de la API del backend para los usuarios
const apiUrl = 'http://127.0.0.1:8000/api/usuario/usuarios/';

// Middleware para verificar el token de autenticación
function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');  // Redirige al login si no hay token
    }
    
    // Verifica el token JWT aquí (puedes usar alguna librería como jsonwebtoken)
    next();  // Continúa con la siguiente función de middleware o ruta
}

// Ruta: GET /usuarios
router.get('/', authenticateToken, async (req, res) => {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${req.cookies.token}`
            }
        });
        const usuarios = response.data;
        res.render('usuarios', { usuarios });
    } catch (error) {
        console.error('Error fetching usuarios:', error);
        res.status(500).send('Error al obtener los usuarios');
    }
});

// Ruta: GET /usuarios/crear
router.get('/crear', authenticateToken, (req, res) => {
    res.render('crear_usuarios');
});

// Ruta: POST /usuarios
router.post('/', authenticateToken, async (req, res) => {
    try {
        const response = await axios.post(apiUrl, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.cookies.token}`
            }
        });
        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error creating usuario:', error.response.data);
        res.status(400).send('Error al crear usuario');
    }
});

// Ruta: PUT /usuarios/:id
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.put(`${apiUrl}${id}/`, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.cookies.token}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(`Error updating usuario ${id}:`, error);
        res.status(500).send(`Error al actualizar usuario ${id}`);
    }
});

// Ruta: DELETE /usuarios/:id
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await axios.delete(`${apiUrl}${id}/`, {
            headers: {
                'Authorization': `Bearer ${req.cookies.token}`
            }
        });
        res.status(204).send();
    } catch (error) {
        console.error(`Error deleting usuario ${id}:`, error);
        res.status(500).send(`Error al eliminar usuario ${id}`);
    }
});

// Ruta: GET /usuarios/:id/edit
router.get('/:id/edit', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${apiUrl}${id}/`, {
            headers: {
                'Authorization': `Bearer ${req.cookies.token}`
            }
        });
        const usuario = response.data;
        res.render('editarUsuario', { usuario });
    } catch (error) {
        console.error(`Error fetching usuario ${id}:`, error);
        res.status(500).send(`Error al obtener usuario ${id}`);
    }
});

router.post('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.put(`${apiUrl}${id}/`, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.cookies.token}`
            }
        });
        res.redirect('/usuarios');  // Redirecciona después de actualizar
    } catch (error) {
        console.error(`Error updating usuario ${id}:`, error);
        res.status(500).send(`Error al actualizar usuario ${id}`);
    }
});

module.exports = router;
